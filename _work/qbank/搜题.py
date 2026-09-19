# -*- coding: utf-8 -*-
"""
题库检索工具 —— 把题目（或题干片段）贴进来，立刻返回答案与官方解析路径。

用法：
  python 搜题.py "在PubMed中，若想搜索题名中完全包含短语heart failure"
  python 搜题.py "本位码第四至第六位"
  python 搜题.py "VLOOKUP" --type multi
  python 搜题.py "IEEE" --pool B --top 3

设计要点：
  - 用字符二元组（bigram）+ IDF 加权检索，对中文短查询效果好
  - 输出「正确答案」时会同时给出该字母对应的**选项内容**，
    因为同一题库每次进入选项顺序会被打乱，只报字母没有意义
"""
import re, json, math, sys, os
from collections import Counter

sys.stdout.reconfigure(encoding='utf-8')
BASE = os.path.dirname(os.path.abspath(__file__))
BANK = json.load(open(os.path.join(BASE, 'bank.json'), encoding='utf-8'))
QS = BANK['questions']

TYPE_CN = {'single': '单选', 'multi': '多选', 'judge': '判断'}


def clean(s):
    return re.sub(r'[\s\u3000]+', '', s or '')


def bigrams(s):
    s = clean(s)
    return [s[i:i + 2] for i in range(len(s) - 1)] if len(s) > 1 else [s]


def haystack(q):
    """一道题的可检索文本：题干 + 选项 + 解析"""
    return q['stem'] + ' ' + ' '.join(o['v'] for o in q['options']) + ' ' + (q.get('expl') or '')


# ---------- 建索引 ----------
DOCS = [bigrams(haystack(q)) for q in QS]
DF = Counter()
for d in DOCS:
    for g in set(d):          # 统计文档频率
        DF[g] += 1
N = len(QS)
IDF = {g: math.log(1 + N / (1 + df)) for g, df in DF.items()}


def vec(tokens):
    """TF-IDF 加权 + 余弦归一（自动抵消文档长度差异）。"""
    tf = Counter(tokens)
    v, norm = {}, 0.0
    for g, c in tf.items():
        w = IDF.get(g, 0) * (1 + math.log(c))
        v[g] = w
        norm += w * w
    return v, math.sqrt(norm) or 1.0


DVEC = [vec(d) for d in DOCS]


def lcs(a, b):
    """最长公共子串长度。真实查询会与题目有连续重合片段，乱码只会零散命中。"""
    a, b = clean(a), clean(b)
    if not a or not b:
        return 0
    b = b[:1500]
    prev = [0] * (len(b) + 1)
    best = 0
    for ca in a:
        cur = [0] * (len(b) + 1)
        for j, cb in enumerate(b, 1):
            if ca == cb:
                cur[j] = prev[j - 1] + 1
                if cur[j] > best:
                    best = cur[j]
        prev = cur
    return best


def search(query, pool=None, qtype=None, src=None, top=3):
    cand = [(i, q) for i, q in enumerate(QS)
            if (not pool or q['pool'] == pool)
            and (not qtype or q['type'] == qtype)
            and (not src or q['src'] == src or (src == 'platform' and q['src'] == 'both'))]
    if not cand:
        return []
    qv, qn = vec(bigrams(query))
    raw = clean(query)
    scored = []
    for i, q in cand:
        dv, dn = DVEC[i]
        dot = sum(w * dv[g] for g, w in qv.items() if g in dv)
        s = dot / (qn * dn) * 100
        # 整串命中单独设档：题干命中 > 任一处命中 > 纯相似度
        if len(raw) >= 6:
            if raw in clean(q['stem']):
                s = max(s, 60.0)
            elif raw in clean(haystack(q)):
                s = max(s, 35.0)
        if s > 2:
            scored.append((s, i))
    scored.sort(reverse=True)
    if not raw:
        return [(s, QS[i]) for s, i in scored[:top]]
    # 余弦前 60 名再过「连续片段」校验
    need = min(len(raw), 4)
    gated = [(s, i) for s, i in scored[:60] if lcs(raw, haystack(QS[i])) >= need]
    if not gated:
        return []
    best = gated[0][0]
    if best < 12:
        return []
    floor = max(12, best * 0.35)
    return [(s, QS[i]) for s, i in gated if s >= floor][:top]


def render(score, q, show_opts=True):
    lines = []
    lines.append('─' * 68)
    if q['src'] == 'both':
        where = f"重合题 · 官方模块{q['module'][0]:02d} ＋ 平台"
    elif q['src'] == 'official':
        where = f"官方样题 · 模块{q['module'][0]:02d} {q['module'][1]}"
    else:
        where = f"平台题库 {q['pool']} · 第{q['no']}题（卷 {'/'.join(q.get('vols', []))}）"
    lines.append(f"[{q['id']}] {where}")
    lines.append(f"      {TYPE_CN[q['type']]}　匹配度 {score:.1f}")
    lines.append(f"题干：{q['stem']}")
    if show_opts and q['options']:
        for o in q['options']:
            mark = '✔' if o['k'] in q['answer'] else ' '
            lines.append(f"   {mark} {o['k']}. {o['v']}")
    ans = q['answer']
    # 关键：把字母翻译成选项内容
    if q['type'] == 'judge':
        content = '正确' if ans == 'A' else '错误'
        lines.append(f"正确答案：{ans} → 「{content}」")
    else:
        picks = [f"{o['k']}「{o['v']}」" for o in q['options'] if o['k'] in ans]
        if picks:
            lines.append(f"正确答案：{ans} → " + ' + '.join(picks))
        else:
            lines.append(f"正确答案：{ans}")
    if q.get('expl'):
        lines.append(f"解析路径：{q['expl']}")
    # 重合题：额外给出另一版本的选项与答案
    if q['src'] == 'both':
        pv = [v for v in q['variants'] if v['kind'] == 'platform'][0]
        lines.append(f"⚠ 平台版（{pv['ref']}）选项不同，答案 {pv['answer']}：")
        for o in pv['options']:
            mark = '✔' if o['k'] in pv['answer'] else ' '
            lines.append(f"   {mark} {o['k']}. {o['v']}")
        if q.get('merge_note'):
            lines.append(f"说明：{q['merge_note']}")
    return '\n'.join(lines)


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        return
    pool = qtype = src = None
    top = 3
    words = []
    i = 0
    while i < len(args):
        a = args[i]
        if a == '--pool' and i + 1 < len(args):
            pool = args[i + 1].upper(); i += 2; continue
        if a == '--type' and i + 1 < len(args):
            qtype = args[i + 1]; i += 2; continue
        if a == '--src' and i + 1 < len(args):
            src = args[i + 1]; i += 2; continue
        if a == '--top' and i + 1 < len(args):
            top = int(args[i + 1]); i += 2; continue
        words.append(a); i += 1
    query = ' '.join(words)
    if not query.strip():
        print(__doc__)
        return
    hits = search(query, pool=pool, qtype=qtype, src=src, top=top)
    if not hits:
        print('未命中。')
        return
    print(f'查询：{query}')
    for s, q in hits:
        print(render(s, q))
    print('─' * 68)


if __name__ == '__main__':
    main()
