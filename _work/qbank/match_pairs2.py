# -*- coding: utf-8 -*-
"""
二次筛选：用「选项文本重合度」判定是否真的同一道题。

理由：仅凭题干相似会大量误判（例如「深圳大学图书馆的生成式AI专题」与
「四川大学图书馆的生成式AI专题」题干极像，但是两道不同的题）。
真正的同一道题，**选项集合也会高度重合**。
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


def cos(a, b):
    ba, bb = Counter(bigrams(a)), Counter(bigrams(b))
    if not ba or not bb:
        return 0.0
    dot = sum(ba[g] * bb[g] for g in set(ba) & set(bb))
    return dot / (math.sqrt(sum(v * v for v in ba.values())) * math.sqrt(sum(v * v for v in bb.values())))


def optset(q):
    return [o['v'] for o in q['options']]


def opt_overlap(qa, qb):
    """选项两两取最大余弦，返回平均最高匹配度。"""
    A, B = optset(qa), optset(qb)
    if not A or not B:
        return 0.0
    best = [max(cos(a, b) for b in B) for a in A]
    return sum(best) / len(best)


rows = []
for i, o in enumerate(official):
    for j, p in enumerate(platform):
        cs = cos(o['stem'], p['stem'])
        co = opt_overlap(o, p)
        rows.append((cs, co, i, j))

# 判据：题干像 且 选项也像
strict = [r for r in rows if r[1] > 0.62]
strict.sort(key=lambda r: -r[1])

print(f'选项重合度 > 0.62 的题对：{len(strict)} 组\n')
print('=' * 80)
for cs, co, i, j in strict:
    o, p = official[i], platform[j]
    conflict = (o['answer'] != p['answer'])
    print(f"\n题干余弦={cs:.3f}  选项重合={co:.3f}  {'★答案冲突★' if conflict else '答案一致 ✔'}")
    print(f"  官方[{i+1:02d}] 模块{o['module'][0]:02d} {o['type']:6s} 答案={o['answer']}")
    print(f"     {o['stem'][:88]}")
    for x in o['options']:
        print(f"       {x['k']}. {x['v'][:70]}")
    print(f"  平台[{p['id']}] {p['type']:6s} 答案={p['answer']}")
    print(f"     {p['stem'][:88]}")
    for x in p['options']:
        print(f"       {x['k']}. {x['v'][:70]}")

print()
print('=' * 80)
print('选项重合度 0.45–0.62 的灰色地带（人工判断）：')
print('=' * 80)
gray = [r for r in rows if 0.45 < r[1] <= 0.62]
gray.sort(key=lambda r: -r[1])
for cs, co, i, j in gray:
    o, p = official[i], platform[j]
    print(f"\n题干余弦={cs:.3f} 选项重合={co:.3f}")
    print(f"  官方[{i+1:02d}] 答案={o['answer']:4s} {o['stem'][:80]}")
    print(f"     选项: {' | '.join(x['v'][:26] for x in o['options'])}")
    print(f"  平台[{p['id']}] 答案={p['answer']:4s} {p['stem'][:80]}")
    print(f"     选项: {' | '.join(x['v'][:26] for x in p['options'])}")
