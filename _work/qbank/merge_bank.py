# -*- coding: utf-8 -*-
"""
合并「官方命题范围文件的样题」与「竞赛平台题库」，生成统一题库。

合并原则（用户明确要求）：
  - 同一道题 → 合并为一条，同时保留官方与平台两个版本
  - 不同的题 → 全部保留，一道都不能少

去重判定经人工逐组过目：题干余弦 > 0.40 的候选共 12 组，
其中仅 2 组同时满足「题干像 + 选项重合 > 0.62」，确认为同一道题；
其余 10 组只是「同一个平台/工具」，实为不同题目，全部保留。

产物：
  bank.json      统一题库（平台 150 + 官方 53 − 重合 2 = 201 题）
  题库总表.md     人可读总表
"""
import re, json, sys, os
from collections import Counter

sys.stdout.reconfigure(encoding='utf-8')
BASE = os.path.dirname(os.path.abspath(__file__))

platform = json.load(open(os.path.join(BASE, '_platform.json'), encoding='utf-8'))['questions']
official = json.load(open(os.path.join(BASE, '_official_raw.json'), encoding='utf-8'))

# ---------- 人工确认的重合题（官方序号 1-based ↔ 平台 id） ----------
MERGES = [
    {
        'official_no': 43, 'platform_id': 'B21', 'id': 'M01',
        'topic': '云展网 PDF 工具提供的功能',
        'note': ('两卷的选项 A 内容不同：官方卷 A 为「PDF 转 Word」且判为正确（答案 ABCD）；'
                 '平台卷 A 为「PDF 去水印」且判为错误（答案 BCD）。'
                 '两者对「PDF 合并 / 拆分 / 压缩」三项均为正确项，实质结论一致，'
                 '差异仅源于选项替换 —— 这正是「必须按选项内容而非字母作答」的典型例证。'),
    },
    {
        'official_no': 39, 'platform_id': 'C37', 'id': 'M02',
        'topic': '百度高级检索中「关键词位置」的可选项',
        'note': ('字母看似冲突（官方 ABC vs 平台 ACD），按内容核对后完全一致：'
                 '两组答案都指向「网页任何地方 + 仅网页标题中 + 仅 URL 中」这三项。'
                 '字母不同纯粹因为选项顺序被打乱。'),
    },
]

official_by_no = {i + 1: o for i, o in enumerate(official)}
platform_by_id = {p['id']: p for p in platform}

merged_ids = {m['platform_id'] for m in MERGES}
merged_nos = {m['official_no'] for m in MERGES}

questions = []

# ---------- 1. 重合题 ----------
for m in MERGES:
    o = official_by_no[m['official_no']]
    p = platform_by_id[m['platform_id']]
    questions.append({
        'id': m['id'],
        'src': 'both',
        'pool': 'M',
        'no': len(questions) + 1,
        'module': o['module'],
        'type': o['type'],
        'stem': o['stem'],
        'options': o['options'],
        'answer': o['answer'],
        'expl': o['expl'],
        'topic': m['topic'],
        'merge_note': m['note'],
        'variants': [
            {'kind': 'official', 'ref': f"官方第 {m['official_no']} 题",
             'module': o['module'], 'stem': o['stem'],
             'options': o['options'], 'answer': o['answer'], 'expl': o['expl']},
            {'kind': 'platform', 'ref': f"平台 {p['id']}",
             'pool': p['pool'], 'vols': p['vols'], 'stem': p['stem'],
             'options': p['options'], 'answer': p['answer'], 'expl': p['expl']},
        ],
    })

# ---------- 2. 平台独有 ----------
n_p = 0
for p in platform:
    if p['id'] in merged_ids:
        continue
    n_p += 1
    questions.append({
        'id': p['id'], 'src': 'platform', 'pool': p['pool'], 'no': p['no'],
        'vols': p['vols'], 'type': p['type'], 'stem': p['stem'],
        'options': p['options'], 'answer': p['answer'], 'expl': p['expl'],
    })

# ---------- 3. 官方独有 ----------
n_o = 0
for i, o in enumerate(official, 1):
    if i in merged_nos:
        continue
    n_o += 1
    questions.append({
        'id': f'O{i:02d}', 'src': 'official', 'pool': 'O', 'no': i,
        'module': o['module'], 'type': o['type'], 'stem': o['stem'],
        'options': o['options'], 'answer': o['answer'], 'expl': o['expl'],
    })

print(f'重合题 {len(MERGES)} · 平台独有 {n_p} · 官方独有 {n_o} · 合计 {len(questions)}')
print(f'校验：150 + 53 − 2 = {150 + 53 - 2}  {"✔" if len(questions) == 201 else "✘"}')
print()

# ---------- 质量检查 ----------
bad = 0
for q in questions:
    issues = []
    if not q['stem']:
        issues.append('无题干')
    if not q['answer']:
        issues.append('无答案')
    if q['type'] != 'judge' and len(q['options']) != 4:
        issues.append(f"选项{len(q['options'])}个")
    if q['type'] == 'multi' and len(q['answer']) < 2:
        issues.append('多选答案不足2项')
    if issues:
        bad += 1
        print(f"  ⚠ [{q['id']}] {'，'.join(issues)}：{q['stem'][:50]}")
print(f'质量检查：{bad} 条异常 / {len(questions)} 条')
print()
print('题型分布:', dict(Counter(q['type'] for q in questions)))
print('来源分布:', dict(Counter(q['src'] for q in questions)))

out = {
    'meta': {
        'name': '2026 大学生「AI+信息素养」大赛 · 统一题库',
        'sources': [
            '官方《客观题命题范围及备赛建议（2026.9.10 修订版）》样题 53 道',
            '竞赛平台（js.zhixinst.com）答题报告 150 道（来自 12 份记录、3 套题库）',
        ],
        'total': len(questions),
        'breakdown': {'both': len(MERGES), 'platform': n_p, 'official': n_o},
        'note': ('同一套题库每次进入，题目顺序与选项顺序都会重排；'
                 '作答必须按选项内容判定，禁止只报字母。'),
    },
    'questions': questions,
}
with open(os.path.join(BASE, 'bank.json'), 'w', encoding='utf-8') as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
print(f'\n已写出 bank.json（{len(questions)} 题）')

# ================= 生成人可读总表 =================
TYPE_CN = {'single': '单选', 'multi': '多选', 'judge': '判断'}
SRC_CN = {'both': '重合', 'platform': '平台', 'official': '官方'}
L = []
A = L.append

A('# 统一题库总表（201 题）\n')
A('> **来源一**：官方《2026 年大学生「AI+信息素养」大赛客观题命题范围及备赛建议（2026.9.10 修订版）》'
  '—— 50 个知识模块的样题 **53 道**')
A('> **来源二**：竞赛平台 `js.zhixinst.com` 答题报告 —— 12 份记录去重后 **150 道**（3 套题库）')
A('> **去重**：两边重合 **2 道**（已合并，见第一部分）　→　**唯一题目 201 道**\n')
A('## 使用须知\n')
A('1. **同一套题库每次进入，题目顺序与选项顺序都会重新打乱。**')
A('   所以不要记「第 3 题选 A」——必须按**题干内容**记答案。')
A('2. 下表答案同时给出**字母**与**选项内容**，以内容为准。')
A('3. 官方样题与平台真题**考核模块一致，但具体检索式不同**——')
A('   官方样题偏演示、平台真题偏实操，两者都要练。\n')
A('| 部分 | 题量 | 说明 |')
A('|---|---|---|')
A('| 一、官方与平台重合题 | 2 | 两边都出现，已合并为一条 |')
A('| 二、竞赛平台题库（独有） | 148 | 题库 A / B / C |')
A('| 三、官方样题（独有） | 51 | 按知识模块 01–50 排列 |')
A('| **合计** | **201** | |')
A('\n---\n')


def dump(q, head='####'):
    A(f"{head} {q['id']}　{q['stem']}\n")
    if q['options']:
        for o in q['options']:
            mark = '**✔**' if o['k'] in q['answer'] else ''
            A(f"- {mark} {o['k']}. {o['v']}")
        A('')
    if q['type'] == 'judge':
        A(f"**答案：{q['answer']}（{'正确' if q['answer'] == 'A' else '错误'}）**\n")
    else:
        picks = [f"{o['k']}「{o['v']}」" for o in q['options'] if o['k'] in q['answer']]
        A(f"**答案：{q['answer']}**" + (f"　→　{' ＋ '.join(picks)}" if picks else '') + '\n')
    if q.get('expl'):
        A(f"*解析*：{q['expl']}\n")


# 第一部分：重合题
A('## 一、官方与平台重合题（2 题）\n')
A('这 2 道题在官方样题与平台真题中都出现，已合并。**注意两边选项排布不同**，详见各题的说明。\n')
for q in [x for x in questions if x['src'] == 'both']:
    A(f"### {q['id']}　{q['topic']}\n")
    A(f"**题干**：{q['stem']}\n")
    for o in q['options']:
        mark = '**✔**' if o['k'] in q['answer'] else ''
        A(f"- {mark} {o['k']}. {o['v']}")
    A('')
    picks = [f"{o['k']}「{o['v']}」" for o in q['options'] if o['k'] in q['answer']]
    A(f"**官方版答案：{q['answer']}**　→　{' ＋ '.join(picks)}\n")
    pv = [v for v in q['variants'] if v['kind'] == 'platform'][0]
    A(f"**平台版（{pv['ref']}）选项与答案**：")
    for o in pv['options']:
        mark = '**✔**' if o['k'] in pv['answer'] else ''
        A(f"- {mark} {o['k']}. {o['v']}")
    A('')
    pp = [f"{o['k']}「{o['v']}」" for o in pv['options'] if o['k'] in pv['answer']]
    A(f"**平台版答案：{pv['answer']}**　→　{' ＋ '.join(pp)}\n")
    A(f"> **差异说明**：{q['merge_note']}\n")
    if q.get('expl'):
        A(f"*官方解析*：{q['expl']}\n")
    if pv.get('expl'):
        A(f"*平台解析*：{pv['expl']}\n")
A('---\n')

# 第二部分：平台独有
A('## 二、竞赛平台题库（148 题）\n')
A('| 题库 | 对应卷号 | 首次答题成绩 |')
A('|---|---|---|')
A('| A | 001、002、007、011 | 001：14 分（28′32″）；002：14 分（46′15″） |')
A('| B | 003、008、009、012 | 均为 0 分（3–8 秒，未作答） |')
A('| C | 004、005、010、013 | 均为 0 分（2–7 秒，未作答） |')
A('')
for pool in ('A', 'B', 'C'):
    sub = [q for q in questions if q['src'] == 'platform' and q['pool'] == pool]
    vols = sub[0]['vols'] if sub else []
    A(f'### 题库 {pool}（卷 {"、".join(vols)}，{len(sub)} 题）\n')
    for grp, label in (('single', '单选题'), ('multi', '多选题'), ('judge', '判断题')):
        g = [q for q in sub if q['type'] == grp]
        if not g:
            continue
        A(f'#### {label}（{len(g)} 题）\n')
        for q in g:
            dump(q, head='#####')
    A('')
A('---\n')

# 第三部分：官方独有
A('## 三、官方样题（51 题）\n')
A('> 出自官方文件《客观题命题范围及备赛建议（2026.9.10 修订版）》50 个知识模块的「样题」小节。')
A('> 括号内为原文件的模块编号与模块名。\n')
by_mod = {}
for q in [x for x in questions if x['src'] == 'official']:
    by_mod.setdefault(q['module'][0], []).append(q)
for no in sorted(by_mod):
    mod_name = by_mod[no][0]['module'][1]
    A(f'### 知识模块 {no:02d}：{mod_name}（{len(by_mod[no])} 题）\n')
    for q in by_mod[no]:
        dump(q, head='####')
    A('')
A('---\n')

A('## 附：统计\n')
A('| 题型 | 平台 | 官方 | 重合 | 合计 |')
A('|---|---|---|---|---|')
for t, cn in (('single', '单选'), ('multi', '多选'), ('judge', '判断')):
    a = sum(1 for q in questions if q['type'] == t and q['src'] == 'platform')
    b = sum(1 for q in questions if q['type'] == t and q['src'] == 'official')
    c = sum(1 for q in questions if q['type'] == t and q['src'] == 'both')
    A(f'| {cn} | {a} | {b} | {c} | {a + b + c} |')
A(f"| **合计** | **{n_p}** | **{n_o}** | **{len(MERGES)}** | **{len(questions)}** |")

open(os.path.join(BASE, '题库总表.md'), 'w', encoding='utf-8').write('\n'.join(L))
print(f'已写出 题库总表.md（{len(L)} 行）')
