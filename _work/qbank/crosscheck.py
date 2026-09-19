# -*- coding: utf-8 -*-
"""
交叉校验：用 001 卷的表格（我本人转录）比对 002 卷（子代理转录），
两者同属题库 A，若答案一致则互为佐证。
"""
import re, json, math, sys, os
from collections import Counter

sys.stdout.reconfigure(encoding='utf-8')
BASE = os.path.dirname(os.path.abspath(__file__))
BANK = json.load(open(os.path.join(BASE, 'bank.json'), encoding='utf-8'))
A = [q for q in BANK['questions'] if q['pool'] == 'A']

text = open(os.path.join(BASE, '题库50题_答案与解析.md'), encoding='utf-8').read()

# 解析 001 表格行：| n | 题干要点 | **X ...** | 你的答案 | 路径 |
rows = []
for m in re.finditer(r'^\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*\*\*(.+?)\*\*\s*\|\s*(.+?)\s*\|', text, re.M):
    no, stem, ans, mine = m.group(1), m.group(2), m.group(3), m.group(4)
    a = re.match(r'([A-D]+)', ans.strip())
    if not a:
        continue
    rows.append({'no': int(no), 'stem': stem, 'ans': a.group(1), 'mine': mine})

print(f'从 001 表解析出 {len(rows)} 行')

def clean(s):
    return re.sub(r'[\s\u3000`*（）()，。、“”"\'：:；;？?！!《》〈〉【】\[\]]+', '', s)

def bigrams(s):
    s = clean(s)
    return [s[i:i+2] for i in range(len(s) - 1)] if len(s) > 1 else [s]

DOCS = [bigrams(q['stem'] + ' ' + ' '.join(o['v'] for o in q['options'])) for q in A]
DF = Counter()
for d in DOCS:
    for g in set(d):
        DF[g] += 1
IDF = {g: math.log(1 + len(A) / (1 + df)) for g, df in DF.items()}

same = diff = unmatched = 0
problems = []
for r in rows:
    qs = set(bigrams(r['stem']))
    best, bi = -1, -1
    for i, d in enumerate(DOCS):
        dc = Counter(d)
        s = sum(IDF.get(g, 0) * min(dc.get(g, 0), 3) for g in qs) / math.sqrt(max(len(qs), 1))
        if s > best:
            best, bi = s, i
    if best < 3:
        unmatched += 1
        problems.append(('未匹配', r['no'], r['stem'][:40], r['ans'], '-'))
        continue
    q = A[bi]
    if q['answer'] == r['ans']:
        same += 1
    else:
        diff += 1
        problems.append(('答案不一致', r['no'], q['stem'][:44], f"001={r['ans']}", f"002={q['answer']}"))

print(f'\n一致 {same} · 不一致 {diff} · 未匹配 {unmatched}')
if problems:
    print('\n需人工确认：')
    for p in problems:
        print('  ', p)
else:
    print('\n✅ 001 与 002 的题库 A 答案完全一致，互为佐证。')
