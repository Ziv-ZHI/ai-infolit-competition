# -*- coding: utf-8 -*-
"""把 bank.json 打包成单文件可检索 HTML。"""
import json, os, sys

sys.stdout.reconfigure(encoding='utf-8')
BASE = os.path.dirname(os.path.abspath(__file__))
bank = json.load(open(os.path.join(BASE, 'bank.json'), encoding='utf-8'))

HTML = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AI+信息素养大赛 · 统一题库（__TOTAL__ 题）</title>
<style>
  :root{
    --bg:#f6f7f9; --panel:#fff; --line:#e3e6ea; --line2:#eef1f4;
    --ink:#1a1d21; --ink2:#5a6169; --ink3:#8b939c;
    --brand:#1f5fbf; --brand-soft:#eaf1fc;
    --ok:#c0392b; --ok-soft:#fdf0ee;
    --warn:#b8860b; --warn-soft:#fdf8e8;
    --mono:"Cascadia Mono",Consolas,"SF Mono",Menlo,monospace;
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);
    font:15px/1.7 -apple-system,"Segoe UI","Microsoft YaHei","PingFang SC",sans-serif;}
  .wrap{max-width:940px;margin:0 auto;padding:28px 20px 80px}
  header h1{font-size:21px;margin:0 0 6px;letter-spacing:.2px}
  header p{margin:0;color:var(--ink2);font-size:13.5px}
  .stats{display:flex;gap:8px;flex-wrap:wrap;margin:16px 0 0}
  .chip{background:var(--panel);border:1px solid var(--line);border-radius:999px;
    padding:4px 12px;font-size:12.5px;color:var(--ink2)}
  .chip b{color:var(--ink);font-weight:600}

  .searchbox{position:sticky;top:0;z-index:10;background:var(--bg);
    padding:18px 0 14px;margin-top:12px;border-bottom:1px solid var(--line)}
  #q{width:100%;padding:14px 16px;font-size:16px;border:1.5px solid var(--line);
    border-radius:10px;background:var(--panel);color:var(--ink);outline:none;
    font-family:inherit;transition:border-color .15s}
  #q:focus{border-color:var(--brand);box-shadow:0 0 0 3px var(--brand-soft)}
  .filters{display:flex;gap:14px;align-items:center;margin-top:10px;flex-wrap:wrap;
    font-size:13px;color:var(--ink2)}
  .filters label{display:flex;align-items:center;gap:6px;cursor:pointer;user-select:none}
  select{font-family:inherit;font-size:13px;padding:3px 8px;border:1px solid var(--line);
    border-radius:6px;background:var(--panel);color:var(--ink)}
  #count{margin-left:auto;color:var(--ink3);font-size:12.5px}

  .card{background:var(--panel);border:1px solid var(--line);border-radius:12px;
    padding:18px 20px;margin-top:14px}
  .card .top{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px}
  .tag{font-size:11.5px;font-weight:600;padding:2px 9px;border-radius:5px;letter-spacing:.3px}
  .tag.src-platform{background:var(--brand-soft);color:var(--brand)}
  .tag.src-official{background:#f3eefb;color:#6b4bb5}
  .tag.src-both{background:#fdeceb;color:var(--ok)}
  .tag.single{background:#eef6ee;color:#2f7d32}
  .tag.multi{background:#fdf8e8;color:var(--warn)}
  .tag.judge{background:#f1f0fb;color:#4a4b8f}
  .tag.score{background:#f2f4f6;color:var(--ink3);font-weight:400}
  .variant{margin-top:12px;border-top:1px dashed var(--line);padding-top:10px}
  .vtitle{font-size:13px;color:var(--warn);font-weight:600;margin-bottom:4px}
  .vtitle b{color:var(--ok)}
  .stem{font-size:15.5px;line-height:1.75;margin:0 0 12px;font-weight:600}
  .opts{list-style:none;margin:0 0 12px;padding:0}
  .opts li{padding:5px 10px;border-radius:6px;margin:3px 0;color:var(--ink2);
    display:flex;gap:9px;font-size:14.5px;line-height:1.65}
  .opts li.hit{background:var(--ok-soft);color:var(--ink);font-weight:600}
  .opts li .k{flex:0 0 auto;font-family:var(--mono);font-weight:700;color:var(--ink3)}
  .opts li.hit .k{color:var(--ok)}
  .ans{border-top:1px dashed var(--line);padding-top:11px;font-size:14.5px}
  .ans .lbl{color:var(--ink3);font-size:12.5px;margin-right:6px}
  .ans .val{color:var(--ok);font-weight:700}
  .expl{margin-top:8px;font-size:13.5px;color:var(--ink2);line-height:1.75;
    background:#fafbfc;border-left:3px solid var(--line);padding:8px 12px;border-radius:0 6px 6px 0}
  .expl .lbl{color:var(--ink3);font-size:12.5px}
  .empty{text-align:center;color:var(--ink3);padding:60px 0;font-size:14px}
  .hint{margin-top:26px;font-size:13px;color:var(--ink2);background:var(--panel);
    border:1px solid var(--line);border-radius:10px;padding:14px 18px;line-height:1.8}
  .hint b{color:var(--ink)}
  mark{background:#fff2a8;color:inherit;border-radius:2px;padding:0 1px}
</style>
</head>
<body>
<div class="wrap">
  <header>
    <h1>2026 大学生「AI+信息素养」大赛 · 统一题库</h1>
    <p>官方《客观题命题范围及备赛建议（2026.9.10 修订版）》样题 ＋ 竞赛平台 <span style="font-family:var(--mono)">js.zhixinst.com</span> 答题报告真题</p>
    <div class="stats">
      <span class="chip">唯一题目 <b>__TOTAL__</b> 道</span>
      <span class="chip">平台题库 <b>148</b>（卷 001–005、007–013）</span>
      <span class="chip">官方样题 <b>51</b>（模块 01–50）</span>
      <span class="chip">两边重合 <b>2</b>（已合并）</span>
    </div>
  </header>

  <div class="searchbox">
    <input id="q" type="search" placeholder="粘贴题目、题干片段或关键词…（如：本位码 / VLOOKUP / 奎章阁 / 一稿多投）" autocomplete="off" autofocus>
    <div class="filters">
      <label>来源
        <select id="fSrc">
          <option value="">全部</option>
          <option value="platform">竞赛平台（含重合）</option>
          <option value="official">官方样题（含重合）</option>
          <option value="both">仅两边重合</option>
        </select>
      </label>
      <label>题库
        <select id="fPool">
          <option value="">全部</option>
          <option value="A">平台 A</option><option value="B">平台 B</option>
          <option value="C">平台 C</option><option value="O">官方</option>
        </select>
      </label>
      <label>题型
        <select id="fType">
          <option value="">全部</option><option value="single">单选</option>
          <option value="multi">多选</option><option value="judge">判断</option>
        </select>
      </label>
      <span id="count"></span>
    </div>
  </div>

  <div id="list"></div>

  <div class="hint">
    <b>注意：同一套题库每次进入，题目顺序和选项顺序都会被重新打乱。</b>
    所以不要记「第 3 题选 A」——要记题干内容。上面的答案里，选项前标红的即为正确项。<br>
    <b>官方样题与平台真题考核模块一致，但具体检索式不同</b>：官方样题偏演示，平台真题偏实操，两者都要练。
  </div>
</div>

<script>
const BANK = __DATA__;
const TYPE_CN = {single:'单选', multi:'多选', judge:'判断'};
const SRC_CN = {platform:'竞赛平台', official:'官方样题', both:'两边重合'};

const clean = s => (s||'').replace(/[\\s\\u3000]+/g,'');
function bigrams(s){
  s = clean(s);
  if(s.length < 2) return s ? [s] : [];
  const out = [];
  for(let i=0;i<s.length-1;i++) out.push(s.slice(i,i+2));
  return out;
}
const hay = q => q.stem + ' ' + q.options.map(o=>o.v).join(' ') + ' ' + (q.expl||'');

const DOCS = BANK.map(q => bigrams(hay(q)));
const DF = new Map();
DOCS.forEach(d=>{ new Set(d).forEach(g=> DF.set(g,(DF.get(g)||0)+1)); });
const N = BANK.length;
const IDF = new Map();
DF.forEach((df,g)=> IDF.set(g, Math.log(1 + N/(1+df))));

// 向量化：TF-IDF 权重 + 余弦归一（自动抵消文档长度差异）
function vec(tokens){
  const tf = new Map();
  for(const g of tokens) tf.set(g,(tf.get(g)||0)+1);
  const v = new Map(); let n = 0;
  tf.forEach((c,g)=>{
    const w = (IDF.get(g)||0) * (1 + Math.log(c));
    v.set(g,w); n += w*w;
  });
  return {v, n: Math.sqrt(n) || 1};
}
const DVEC = DOCS.map(vec);

// 最长公共子串长度：真实查询会与题目有连续重合片段，乱码只会零散命中
function lcs(a, b){
  a = clean(a); b = clean(b);
  if(!a || !b) return 0;
  const n = a.length, m = Math.min(b.length, 1500);
  let prev = new Int32Array(m + 1), cur = new Int32Array(m + 1), best = 0;
  for(let i = 1; i <= n; i++){
    for(let j = 1; j <= m; j++){
      cur[j] = (a.charCodeAt(i - 1) === b.charCodeAt(j - 1)) ? prev[j - 1] + 1 : 0;
      if(cur[j] > best) best = cur[j];
    }
    const t = prev; prev = cur; cur = t; cur.fill(0);
  }
  return best;
}

function search(query, pool, type, src){
  const qv = vec(bigrams(query));
  const raw = clean(query);
  const res = [];
  for(let i=0;i<BANK.length;i++){
    const q = BANK[i];
    if(pool && q.pool !== pool) continue;
    if(type && q.type !== type) continue;
    if(src === 'platform' && q.src === 'official') continue;
    if(src === 'official' && q.src === 'platform') continue;
    if(src === 'both' && q.src !== 'both') continue;
    if(!raw){ res.push({i, score:0}); continue; }
    const d = DVEC[i];
    let dot = 0;
    qv.v.forEach((w,g)=>{ const dw = d.v.get(g); if(dw) dot += w*dw; });
    let s = dot / (qv.n * d.n) * 100;
    // 整串命中单独设档：题干命中 > 任一处命中 > 纯相似度
    if(raw.length >= 6){
      if(clean(q.stem).includes(raw)) s = Math.max(s, 60);
      else if(clean(hay(q)).includes(raw)) s = Math.max(s, 35);
    }
    if(s > 2) res.push({i, score:s});
  }
  res.sort((a,b)=>b.score-a.score);
  if(!raw) return res;
  // 余弦前 60 名再过「连续片段」校验：至少要有 min(查询长度, 4) 个连续字符重合
  const need = Math.min(raw.length, 4);
  const gated = res.slice(0, 60).filter(r => lcs(raw, hay(BANK[r.i])) >= need);
  if(!gated.length) return [];
  const best = gated[0].score;
  if(best < 12) return [];
  const floor = Math.max(12, best * 0.35);
  return gated.filter(r => r.score >= floor);
}

const esc = s => (s||'').replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

const optsHtml = q => q.options.map(o=>{
  const hit = q.answer.includes(o.k);
  return `<li class="${hit?'hit':''}"><span class="k">${hit?'✔':'&nbsp;&nbsp;'} ${o.k}</span><span>${esc(o.v)}</span></li>`;
}).join('');

function ansHtml(q){
  if(q.type === 'judge')
    return `<span class="val">${q.answer}　${q.answer==='A'?'正确':'错误'}</span>`;
  const picks = q.options.filter(o=>q.answer.includes(o.k))
    .map(o=>`${o.k}「${esc(o.v)}」`).join(' ＋ ');
  return `<span class="val">${q.answer}</span>${picks?'　→　'+picks:''}`;
}

function whereText(q){
  const pad = n => String(n).padStart(2,'0');
  if(q.src === 'both') return `重合题 · 官方模块 ${pad(q.module[0])} ＋ 平台`;
  if(q.src === 'official') return `官方样题 · 模块 ${pad(q.module[0])}　${esc(q.module[1])}`;
  return `平台题库 ${q.pool} · 原卷第 ${q.no} 题`;
}

function render(hits){
  const list = document.getElementById('list');
  if(!hits.length){
    list.innerHTML = '<div class="empty">没有命中。换个关键词试试，或放宽筛选条件。</div>';
    return;
  }
  list.innerHTML = hits.slice(0, 40).map(h=>{
    const q = BANK[h.i];
    let extra = '';
    if(q.src === 'both' && q.variants){
      const pv = q.variants.find(v=>v.kind==='platform');
      if(pv){
        extra = `<div class="variant">
          <div class="vtitle">⚠ 平台版（${esc(pv.ref)}）选项不同，答案 <b>${pv.answer}</b></div>
          <ul class="opts">${pv.options.map(o=>{
            const hit = pv.answer.includes(o.k);
            return `<li class="${hit?'hit':''}"><span class="k">${hit?'✔':'&nbsp;&nbsp;'} ${o.k}</span><span>${esc(o.v)}</span></li>`;
          }).join('')}</ul>
          ${q.merge_note?`<div class="expl"><span class="lbl">差异说明</span>　${esc(q.merge_note)}</div>`:''}
        </div>`;
      }
    }
    return `<div class="card">
      <div class="top">
        <span class="tag src-${q.src}">${SRC_CN[q.src]}</span>
        <span class="tag ${q.type}">${TYPE_CN[q.type]}</span>
        <span class="tag score">${q.id} · ${whereText(q)}${h.score?` · 匹配度 ${h.score.toFixed(1)}`:''}</span>
      </div>
      <p class="stem">${esc(q.stem)}</p>
      ${q.options.length?`<ul class="opts">${optsHtml(q)}</ul>`:''}
      <div class="ans"><span class="lbl">正确答案</span>${ansHtml(q)}</div>
      ${q.expl?`<div class="expl"><span class="lbl">解析路径</span>　${esc(q.expl)}</div>`:''}
      ${extra}
    </div>`;
  }).join('');
}

function run(){
  const query = document.getElementById('q').value.trim();
  const pool = document.getElementById('fPool').value;
  const type = document.getElementById('fType').value;
  const src = document.getElementById('fSrc').value;
  const hits = search(query, pool, type, src);
  const filtered = query || pool || type || src;
  document.getElementById('count').textContent = filtered
    ? `命中 ${hits.length} 题` : `共 ${BANK.length} 题`;
  render(hits);
}

['q','fPool','fType','fSrc'].forEach(id=>{
  const el = document.getElementById(id);
  el.addEventListener(id==='q' ? 'input' : 'change', run);
});
run();
</script>
</body>
</html>
"""

out = HTML.replace('__DATA__', json.dumps(bank['questions'], ensure_ascii=False, separators=(',', ':')))
out = out.replace('__TOTAL__', str(len(bank['questions'])))
path = os.path.join(BASE, '题库检索.html')
open(path, 'w', encoding='utf-8').write(out)
print(f'已写出 {path}  （{len(out)/1024:.0f} KB，{len(bank["questions"])} 题）')
