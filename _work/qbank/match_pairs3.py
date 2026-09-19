# -*- coding: utf-8 -*-
"""列出题干余弦 > 0.40 的全部官方↔平台题对，附选项重合度，供逐组人工判定。"""
import re, json, math, sys, os
from collections import Counter

sys.stdout.reconfigure(encoding='utf-8')
BASE = os.path.dirname(os.path.abspath(__file__))
official = json.load(open(os.path.join(BASE, '_official_raw.json'), encoding='utf-8'))
platform = json.load(open(os.path.join(BASE, 'bank.json'), encoding='utf-8'))['questions']


def norm(s):
    return re.sub(r'[\s\u3000，。、；：（）()《》⟨⟩【】\[\]“”"\'？！?！.,:;·\-—_/\\|]+', '', s or '')


def bigrams(s):
    s = norm(s)
    return [s[i:i + 2] for i in range(len(s) - 1)] if len(s) > 1 else ([s] if s else [])


def cos(a, b):
    ba, bb = Counter(bigrams(a)), Counter(bigrams(b))
    if not ba or not bb:
        return 0.0
    dot = sum(ba[g] * bb[g] for g in set(ba) & set(bb))
    return dot / (math.sqrt(sum(v * v for v in ba.values())) * math.sqrt(sum(v * v for v in bb.values())))


def opt_overlap(qa, qb):
    A, B = [o['v'] for o in qa['options']], [o['v'] for o in qb['options']]
    if not A or not B:
        return 0.0
    return sum(max(cos(a, b) for b in B) for a in A) / len(A)


rows = []
for i, o in enumerate(official):
    for j, p in enumerate(platform):
        cs = cos(o['stem'], p['stem'])
        if cs > 0.40:
            rows.append((cs, opt_overlap(o, p), i, j))
rows.sort(reverse=True)

print(f'题干余弦 > 0.40 的题对：{len(rows)} 组\n')
for n, (cs, co, i, j) in enumerate(rows, 1):
    o, p = official[i], platform[j]
    verdict = '同一题' if (cs > 0.45 and co > 0.62) else '不同题'
    print(f"[{n:02d}] 题干={cs:.3f} 选项={co:.3f} → {verdict}"
          f"{'  ★答案冲突★' if (o['answer'] != p['answer'] and verdict == '同一题') else ''}")
    print(f"      官方[{i+1:02d}] {o['answer']:4s} {o['stem'][:74]}")
    print(f"      平台[{p['id']}] {p['answer']:4s} {p['stem'][:74]}")
    print(f"      官方选项: {' | '.join(x['v'][:24] for x in o['options'])}")
    print(f"      平台选项: {' | '.join(x['v'][:24] for x in p['options'])}")
    print()
