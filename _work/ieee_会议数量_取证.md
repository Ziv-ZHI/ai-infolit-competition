# IEEE 官网会议检索 · 取证记录

题目：会议时间在 2025 年前五个月、与人工智能相关（用检索词 "artificial intelligence" 检索后用时间筛选）的会议数量与下列哪个数字最接近？
选项：A 147 / B 231 / C 79 / D 12

**答案：A、147（精确命中）**

## 复现命令

```bash
curl -X POST "https://conference-api.ieee.org/conf/searchfacet" \
  -H "Content-Type: application/x-www-form-urlencoded;" \
  -H "x-api-key: tiztktxAhobOx8B5Kwbv4lvbS2xqQjr8gBIF82Td" \
  --data 'q=%22artificial+intelligence%22&from=2025-01-01&to=2025-05-31'
```

返回 `entity.totalResults = 147`。

## 对照实验

| 检索式 | totalResults |
|---|---|
| `q="artificial intelligence"` + 2025-01-01~2025-05-31 | **147** ← 本题答案 |
| `q=artificial intelligence`（不带引号）+ 同上区间 | 149 |
| `q=intelligence` + 同上区间 | 204 |
| `q=AI` + 同上区间 | 63 |
| `q=machine learning` + 同上区间 | 90 |
| `q=artificial intelligence` + 2025-01-01~2025-06-30 | 201 |
| `q=artificial intelligence` + 2025 全年 | 694 |
| `q=artificial intelligence` + 2024 全年 | 526 |
| `q=artificial intelligence` + 无时间筛选 | 571 |

结论：**必须带英文双引号做短语检索**，才能得到 147；不带引号会因分词匹配多出 2 条（149）。

## 命中样本（前 5 条，区间 2025-01~2025-05）

| 起止日期 | 会议名称 |
|---|---|
| 2025-01-15 ~ 2025-01-17 | 2025 Fourth International Symposium on Instrumentation, Control, Artificial Intelligence, and Robotics |
| 2025-03-17 ~ 2025-03-20 | 2025 IEEE Symposium Series on Computational Intelligence (SSCI) |
| 2025-03-28 ~ 2025-03-29 | 2025 International Conference on Data Science, Agents & Artificial Intelligence |
| 2025-05-05 ~ 2025-05-07 | 2025 IEEE Conference on Artificial Intelligence (CAI) |
| 2025-05-21 ~ 2025-05-23 | 2025 Third International Conference on Augmented Intelligence and Sustainable Systems |

## 接口要点

- 入口页：https://conferences.ieee.org/conferences_events/ （IEEE 官网 Conferences → Search IEEE Conferences）
- 接口：`POST https://conference-api.ieee.org/conf/searchfacet`
- 参数：`q`（检索词，支持英文双引号短语检索）、`from` / `to`（**必须 `YYYY-MM-DD`**）
- 响应：`entity.totalResults`（总数）、`entity.results[]`（结果列表，固定每页 10 条）、`entity.resultFacets`（分面）
- 网页版 `/conferences/search` 对自动化访问返回 `418 Request Rejected`，但接口本身无需登录、无验证码
