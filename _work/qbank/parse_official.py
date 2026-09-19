# -*- coding: utf-8 -*-
"""
从官方文件转换稿 full.md 中抽取全部样题（2026.9.10 修订版）。

文档结构（每道样题）：
    [##] 样题[ 1]（单选题）：        ← 标题层级与编号不固定，必须容错
    <题干，可能夹图注> A、xx B、xx C、xx D、xx
    [##] 正确答案：X               ← 判断题答案为「正确/错误」
    答案解析：...                   ← 题块结束标志

三处关键容错（初版曾因此出错）：
  1. 模块标题有 `#` 与 `##` 两种层级 → 正则必须用 `#{1,3}`
  2. 样题标题有「样题（多选）」与「样题 1（判断）」两种写法 → 编号要可选
  3. 题块起点应取「上一题解析的结束位置」，而不是「上一题『答案解析』标签的结束位置」，
     否则会把上一题的解析正文并进下一题的题干
"""
import re, json, sys, os
from collections import Counter

sys.stdout.reconfigure(encoding='utf-8')
SRC = r'D:\29876\Documents\wuddy\比赛\full.md'
OUT = os.path.dirname(os.path.abspath(__file__))

text = open(SRC, encoding='utf-8').read()
text = text[text.find('## 知识模块 01'):]          # 丢掉封面与目录

ANS = re.compile(r'正确答案[：:]\s*([A-D]+|正确|错误)')
EXP = re.compile(r'答案解析[：:]')
MOD = re.compile(r'^#{1,3}\s*知识模块\s*(\d+)[：:]\s*(.+?)\s*$', re.M)
SAMPLE = re.compile(r'样题\s*\d*\s*[（(]([^）)]*)[）)]')
OPT = re.compile(r'([A-D])\s*[、.．]\s*')
NOISE = re.compile(r'^(#{1,4}\s*)?(具体要求|学习指导及备赛建议|备赛建议|参考资源)\s*[：:]?\s*$')

MODULES = [(m.start(), int(m.group(1)), m.group(2)) for m in MOD.finditer(text)]


def module_of(pos):
    last = None
    for st, no, name in MODULES:
        if st <= pos:
            last = (no, name)
        else:
            break
    return last


def clean_body(s):
    """剥掉图片引用、章节标题、行首 # 号。"""
    out = []
    for ln in s.split('\n'):
        t = ln.strip()
        if not t or t.startswith('!['):
            continue
        if NOISE.match(t) or re.match(r'^#{1,4}\s*(知识模块|样题)', t):
            continue
        out.append(re.sub(r'^#{1,4}\s*', '', t))
    return '\n'.join(out)


def split_options(s):
    """按 A、/ B. / C． 等标记切出选项，返回 (题干, [选项])。"""
    marks = list(OPT.finditer(s))
    # 只保留从 A 开始、字母严格递增的一组（防止题干里的字母误判）
    picked, want = [], 'A'
    for m in marks:
        if m.group(1) == want:
            picked.append(m)
            want = chr(ord(want) + 1)
    if not picked:
        return s.strip(), []
    stem = s[:picked[0].start()].strip()
    opts = []
    for i, m in enumerate(picked):
        end = picked[i + 1].start() if i + 1 < len(picked) else len(s)
        opts.append({'k': m.group(1), 'v': s[m.end():end].strip()})
    return stem, opts


# ---------- 抽取 ----------
items = []
prev_end = 0
for m in ANS.finditer(text):
    e = EXP.search(text, m.end())
    if not e:
        continue
    # 解析正文止于「下一个样题标题」或「下一个模块标题」，避免把后续章节并进来
    stops = [x.start() for x in (SAMPLE.search(text, e.end()), MOD.search(text, e.end())) if x]
    expl = ' '.join(text[e.end():min(stops) if stops else len(text)].split())

    # 题块起点 = 上一题「答案解析」标签的结束处；
    # 块内含有上一题解析正文与本章节说明，靠「取最后一个样题标题之后」剥掉。
    # 注意：必须在**未清洗的原始文本**上定位标题，否则标题会被 clean_body 删掉。
    raw_block = text[prev_end:m.start()]
    prev_end = e.end()

    qtype = None
    heads = list(SAMPLE.finditer(raw_block))
    if heads:
        h = heads[-1]
        raw = h.group(1)
        if '单选' in raw:
            qtype = 'single'
        elif '多选' in raw:
            qtype = 'multi'
        elif '判断' in raw:
            qtype = 'judge'
        body = clean_body(raw_block[h.end():])
    else:
        body = clean_body(raw_block)

    stem, opts = split_options(body)
    stem = ' '.join(stem.split()).lstrip('：:，,、 ')
    if not stem:
        continue

    ans = m.group(1)
    if ans in ('正确', '错误'):
        qtype = qtype or 'judge'
    elif len(ans) > 1:
        qtype = qtype or 'multi'
    else:
        qtype = qtype or 'single'

    items.append({
        'module': module_of(m.start()),
        'type': qtype, 'stem': stem, 'options': opts,
        'answer': ans, 'expl': expl, 'pos': m.start(),
    })

print(f'共抽取 {len(items)} 道官方样题\n')
print('题型分布:', dict(Counter(it['type'] for it in items)))
print('答案分布:', dict(sorted(Counter(it['answer'] for it in items).items())))
print()

# 质量检查
warn = 0
for n, it in enumerate(items, 1):
    mo = it['module']
    issues = []
    if it['type'] != 'judge' and len(it['options']) != 4:
        issues.append(f"选项数={len(it['options'])}")
    if not it['expl']:
        issues.append('无解析')
    if not it['stem'] or len(it['stem']) < 8:
        issues.append('题干过短')
    if issues:
        warn += 1
    flag = ('  ⚠ ' + '，'.join(issues)) if issues else ''
    print(f"[{n:02d}] 模块{mo[0]:02d} {it['type']:6s} 答案={it['answer']:4s} {it['stem'][:58]}{flag}")
print()
print(f'有问题的题：{warn} / {len(items)}')

json.dump(items, open(os.path.join(OUT, '_official_raw.json'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)
print('已存 _official_raw.json')
