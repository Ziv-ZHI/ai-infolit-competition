# -*- coding: utf-8 -*-
"""
比对「官方样题」与「竞赛平台题库」，列出可能重复的题对供人工确认。
只报候选，不做自动合并 —— 合并决策必须人工过目，避免误合并。
"""
import re, json, math, sys, os
from collections import Counter

sys.stdout.reconfigure(encoding='utf-8')
BASE = os.path.dirname(os.path.abspath(__file__))

official = json.load(open(os.path.join(BASE, '_official_raw.json'), encoding='utf-8'))
platform = json.load(open(os.path.join(BASE, 'bank.json'), encoding='utf-8'))['questions']


def norm(s):
    return re.sub(r'[\s\u3000，。、；：（）()《》〈〉【】\[\]“”"\'？！?！.,:;·\-—_/\\|]+', '', s or '')


def bigrams(s):
    s = norm(s)
    return [s[i:i + 2] for i in range(len(s) - 1)] if len(s) > 1 else ([s] if s else [])


def cosine(a, b):
    ba, bb = Counter(bigrams(a)), Counter(bigrams(b))
    if not ba or not bb:
        return 0.0
    common = set(ba) & set(bb)
    dot = sum(ba[g] * bb[g] for g in common)
    na = math.sqrt(sum(v * v for v in ba.values()))
    nb = math.sqrt(sum(v * v for v in bb.values()))
    return dot / (na * nb)


def jaccard(a, b):
    sa, sb = set(norm(a)), set(norm(b))
    if not sa or not sb:
        return 0.0
    return len(sa & sb) / len(sa | sb)


print(f'官方样题 {len(official)} 道 × 平台题库 {len(platform)} 道 = {len(official)*len(platform)} 对\n')

cands = []
for i, o in enumerate(official):
    for j, p in enumerate(platform):
        c = cosine(o['stem'], p['stem'])
        jc = jaccard(o['stem'], p['stem'])
        if c > 0.30 or jc > 0.55:
            cands.append((c, jc, i, j))

cands.sort(reverse=True)
print(f'候选重复对 {len(cands)} 组（按相似度降序）\n')
print('=' * 78)
for c, jc, i, j in cands:
    o, p = official[i], platform[j]
    same_ans = (o['answer'] == p['answer'])
    print(f"\n余弦={c:.3f}  字符Jaccard={jc:.3f}  答案{'一致 ✔' if same_ans else '★不一致★'}")
    print(f"  官方[{i+1:02d}] 模块{o['module'][0]:02d} {o['type']:6s} 答案={o['answer']:4s} {o['stem'][:76]}")
    print(f"  平台[{p['id']}] {p['type']:6s} 答案={p['answer']:4s} {p['stem'][:76]}")

print()
print('=' * 78)
# 官方样题内部查重
print('\n官方样题内部重复检查：')
dups = 0
for i in range(len(official)):
    for j in range(i + 1, len(official)):
        c = cosine(official[i]['stem'], official[j]['stem'])
        if c > 0.55:
            dups += 1
            print(f'  [{i+1}] vs [{j+1}] 余弦={c:.3f}')
            print(f'     {official[i]["stem"][:70]}')
            print(f'     {official[j]["stem"][:70]}')
print(f'  → 官方内部重复 {dups} 组')
