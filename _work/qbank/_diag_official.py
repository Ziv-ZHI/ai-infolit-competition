# -*- coding: utf-8 -*-
"""诊断官方 PDF 转换稿 full.md 的样题结构，找出所有题目边界。"""
import re, sys
sys.stdout.reconfigure(encoding='utf-8')

s = open(r'D:\29876\Documents\wuddy\比赛\full.md', encoding='utf-8').read()
lines = s.split('\n')

print('总行数', len(lines))
print()

# 找出所有 "答案解析" 所在行，回看前 12 行，判断题目是怎么起头的
hits = [i for i, l in enumerate(lines) if '答案解析' in l]
print(f'答案解析 共 {len(hits)} 处\n')

for n, i in enumerate(hits, 1):
    # 回看找题目起点：向上找最近的一个 "样题" 标题，或最近的 "正确答案"
    start = None
    for j in range(i, max(0, i - 14), -1):
        if '样题' in lines[j]:
            start = j
            break
    tag = '有样题标题' if start is not None else '★无样题标题★'
    # 题目文本：从 start(或 i-4) 到 正确答案
    ansline = None
    for j in range(i, max(0, i - 12), -1):
        if '正确答案' in lines[j]:
            ansline = j
            break
    a = lines[ansline] if ansline is not None else '(未找到答案行)'
    print(f'[{n:02d}] {tag}  行{i}')
    print(f'     答案行({ansline}): {a[:90]}')
    if start is None:
        # 打印它前面 6 行，看是什么
        for j in range(max(0, i - 8), i + 1):
            t = lines[j].strip()
            if t:
                print(f'       {j}: {t[:100]}')
    print()
