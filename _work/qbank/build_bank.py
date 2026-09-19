# -*- coding: utf-8 -*-
"""
合并三套题库的逐题转录，生成统一题库（bank.json + 题库总表.md）。

题库归属（经首屏内容与页高双重核实）：
  题库 A ← 卷002（与 001/007/011 同池，题目顺序被重排）
  题库 B ← 卷008（与 003/009/012 同池）
  题库 C ← 卷004（与 005/010/013 同池）
"""
import re, json, os, sys

sys.stdout.reconfigure(encoding='utf-8')
BASE = os.path.dirname(os.path.abspath(__file__))

SOURCES = [
    ('A', '卷002_答案与解析.md', ['001', '002', '007', '011']),
    ('B', '卷008_答案与解析.md', ['003', '008', '009', '012']),
    ('C', '卷004_答案与解析.md', ['004', '005', '010', '013']),
]

TYPE_MAP = {'单选': 'single', '多选': 'multi', '判断': 'judge'}


def parse(path):
    """解析一份逐题转录的 Markdown，返回题目列表。"""
    text = open(path, encoding='utf-8').read()
    # 切掉正文之前的说明，从第一个题块开始
    parts = re.split(r'^### 第 (\d+) 题[　\s]*\[(单选|多选|判断)\]', text, flags=re.M)
    # parts[0] 是头部，之后每 3 个为一组：题号、题型、正文
    items = []
    for i in range(1, len(parts), 3):
        no = int(parts[i])
        qtype = TYPE_MAP[parts[i + 1]]
        body = parts[i + 2]

        # 题干：从 **题干**： 到第一个空行或第一个选项行
        m = re.search(r'\*\*题干\*\*[：:]\s*(.+?)(?=\n\s*\n|\n\s*-\s*[A-D][.、])', body, re.S)
        stem = ' '.join(m.group(1).split()) if m else ''
        stem = stem.strip().rstrip('（）() ').strip()

        # 选项
        opts = []
        for om in re.finditer(r'^\s*-\s*([A-D])[.、]\s*(.+?)\s*$', body, re.M):
            opts.append({'k': om.group(1), 'v': om.group(2).strip()})

        # 正确答案 / 我的答案
        am = re.search(r'\*\*正确答案\*\*[：:]\s*([A-D]+)', body)
        answer = am.group(1) if am else ''
        mm = re.search(r'\*\*我的答案\*\*[：:]\s*(.+)', body)
        mine = mm.group(1).strip() if mm else ''

        # 解析：从 **解析**： 到题块结束（下一个 --- 或文件尾）
        em = re.search(r'\*\*解析\*\*[：:]\s*(.+?)(?=\n\s*---|\Z)', body, re.S)
        expl = ' '.join(em.group(1).split()) if em else ''

        items.append({
            'no': no, 'type': qtype, 'stem': stem,
            'options': opts, 'answer': answer, 'mine': mine, 'expl': expl,
        })
    return items


def main():
    bank = []
    for pool, fname, vols in SOURCES:
        path = os.path.join(BASE, fname)
        items = parse(path)
        for it in items:
            it['pool'] = pool
            it['vols'] = vols
            it['src'] = fname
        bank.append((pool, items, vols, fname))
        types = {}
        for it in items:
            types[it['type']] = types.get(it['type'], 0) + 1
        print(f'题库 {pool}  ← {fname}: {len(items)} 题  {types}')

    flat = []
    qid = 0
    for pool, items, vols, fname in bank:
        for it in items:
            qid += 1
            it['id'] = f'{pool}{it["no"]:02d}'
            flat.append(it)

    # 质量检查
    print()
    print('=== 质量检查 ===')
    for it in flat:
        if not it['stem']:
            print(f'  [警告] {it["id"]} 题干为空')
        if not it['answer']:
            print(f'  [警告] {it["id"]} 无答案')
        if it['type'] != 'judge' and len(it['options']) < 4:
            print(f'  [警告] {it["id"]} 选项仅 {len(it["options"])} 个')
    print(f'  合计 {len(flat)} 题')
    # 答案分布
    from collections import Counter
    for pool, items, vols, fname in bank:
        c = Counter(it['answer'] for it in items if it['type'] == 'single')
        print(f'  题库 {pool} 单选答案分布: {dict(sorted(c.items()))}')
        c = Counter(it['answer'] for it in items if it['type'] == 'judge')
        print(f'  题库 {pool} 判断答案分布: {dict(sorted(c.items()))}')

    out = {
        'meta': {
            'name': '竞赛平台题库（平台部分）',
            'platform': 'js.zhixinst.com（智信数图 知识竞赛平台）',
            'pools': {p: {'vols': v, 'src': f, 'count': len(i)} for p, i, v, f in bank},
            'total': len(flat),
            'note': '同一题库每次进入题目顺序会重排，必须按题干内容检索，不能按题号记答案。',
        },
        'questions': flat,
    }
    with open(os.path.join(BASE, '_platform.json'), 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print(f'\n已写出 _platform.json（{len(flat)} 题）')
    print('（统一题库与总表由 merge_bank.py 生成）')


if __name__ == '__main__':
    main()
