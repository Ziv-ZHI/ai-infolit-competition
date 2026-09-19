// 单文件题库检索页 · 无浏览器冒烟测试
// 用最小 DOM stub 真实执行页面内嵌 JS，验证：脚本无运行时异常、检索命中正确、
// 答案字母能正确映射到选项内容。
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const FILE = path.join(__dirname, '题库检索.html');
const html = fs.readFileSync(FILE, 'utf8');

let fail = 0;
const ok = (cond, msg) => { console.log((cond ? '  PASS  ' : '  FAIL  ') + msg); if (!cond) fail++; };

// ---------- 1. 结构抽取 ----------
const m = html.match(/<script>([\s\S]*?)<\/script>/);
ok(!!m, '页面含内联 <script>');
const js = m[1];

// 内嵌 JSON 不得提前闭合 script 标签
ok(!/<\/script/i.test(js), '内嵌数据中无 </script 破坏标签');

// ---------- 2. 最小 DOM stub ----------
function makeEl(id) {
  const el = {
    id, value: '', innerHTML: '', textContent: '',
    _lis: {}, addEventListener(ev, fn) { (this._lis[ev] ||= []).push(fn); },
    fire(ev) { (this._lis[ev] || []).forEach(f => f()); },
  };
  return el;
}
const IDS = ['q', 'fPool', 'fType', 'fSrc', 'count', 'list'];
const els = Object.fromEntries(IDS.map(i => [i, makeEl(i)]));
els.fPool.value = '';
els.fType.value = '';
els.fSrc.value = '';

const sandbox = {
  document: { getElementById: id => els[id] || null },
  console,
  Math, JSON, Array, Object, String, Number, Set, Map, Date,
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

// ---------- 3. 执行 ----------
let threw = null;
try { vm.runInContext(js, sandbox, { filename: 'inline.js' }); }
catch (e) { threw = e; }
ok(!threw, '内联 JS 执行无异常' + (threw ? `（${threw.message}）` : ''));

// ---------- 4. 数据完整性 ----------
let BANK = null;
try { BANK = vm.runInContext('BANK', sandbox); } catch (e) {}
ok(Array.isArray(BANK) && BANK.length === 201, `BANK 题量 = ${BANK ? BANK.length : 'n/a'}（应为 201 = 150 平台 + 53 官方 − 2 重合）`);
if (Array.isArray(BANK)) {
  const bad = BANK.filter(q => !q.stem || !q.answer || !q.id);
  ok(bad.length === 0, `无空题干/空答案条目（异常 ${bad.length} 条）`);
  const pools = [...new Set(BANK.map(q => q.pool))].sort().join('');
  ok(pools === 'ABCMO', `题库分组 = ${pools}（应为 ABCMO）`);
  const multiNoAns = BANK.filter(q => q.type === 'multi' && q.answer.length < 2);
  ok(multiNoAns.length === 0, `多选题均含 ≥2 个正确项（异常 ${multiNoAns.length} 条）`);
  const c = BANK.reduce((a, q) => (a[q.src] = (a[q.src] || 0) + 1, a), {});
  ok(c.platform === 148 && c.official === 51 && c.both === 2,
    `来源分布 platform=${c.platform} official=${c.official} both=${c.both}（应为 148/51/2）`);
  const opts4 = BANK.filter(q => q.type !== 'judge' && q.options.length !== 4);
  ok(opts4.length === 0, `非判断题均 4 个选项（异常 ${opts4.length} 条）`);
}

// ---------- 5. 首屏渲染 ----------
ok(els.list.innerHTML.length > 500, `首屏渲染出内容（${els.list.innerHTML.length} 字符）`);
ok(/竞赛平台|官方样题|两边重合/.test(els.list.innerHTML), '首屏含来源标签');
ok(els.count.textContent.includes('201'), `计数文案 = "${els.count.textContent}"`);

// ---------- 6. 检索正确性 ----------
// first:true → 整题粘贴，必须首位命中；first:false → 短关键词，出现在前 3 条即可
const cases = [
  // 平台题
  { q: '在国家药品监督管理局网站中查询可知，境外生产药品"国药准字HJ20140386"的药品本位码的第四至第六位是', expect: 'B10', ans: 'A', content: '789', first: true },
  { q: '在PubMed中，若想搜索题名中完全包含短语"heart failure"，应使用以下哪种表达', expect: 'B07', ans: 'B', content: 'Title', first: true },
  { q: '在Excel中，单元格A1包含数字123456789，你想在B1中显示123-456-789', expect: 'B37', ans: 'ABC', content: 'CONCATENATE', first: true },
  { q: '在雨课堂课件中可以插入慕课视频，包括哪些', expect: 'B22', ans: 'BCD', content: '会计学原理', first: true },
  { q: '下列选项中哪个是中国古典文献资源导航系统(奎章阁) 数字人文类目下的二级类目', expect: 'B06', ans: 'C', content: '地理系统', first: true },
  // 官方题
  { q: '在联合国教科文组织的官网上可以找到 2024年发布的英文版《学生人工智能能力框架》', expect: 'O01', ans: 'A', content: 'Competency blocks', first: true },
  { q: '下列行为，属于"一稿多投"的是', expect: 'O45', ans: 'BC', content: '一稿多投', first: true },
  { q: '在 EXCEL 中提取身份证号码中的出生年月日，最合适的函数是', expect: 'O51', ans: 'C', content: '函数', first: true },
  // 重合题
  { q: '在云展网 PDF 在线工具页面中，可以使用多种 PDF 处理功能', expect: 'M01', ans: 'ABCD', content: 'PDF 转 Word', first: true },
  // 短关键词
  { q: '雨课堂', expect: 'B22', ans: 'BCD', content: '会计学原理', first: false },
  { q: 'VLOOKUP', expect: 'A07', ans: 'C', content: 'A:C', first: false },
];
for (const c of cases) {
  els.q.value = c.q;
  els.list.innerHTML = '';
  try { vm.runInContext('run()', sandbox); } catch (e) { ok(false, `run() 抛错：${e.message}`); continue; }
  const cards = els.list.innerHTML.split('<div class="card">').slice(1);
  const scope = c.first ? cards.slice(0, 1) : cards.slice(0, 3);
  const hit = scope.find(cd => cd.includes('>' + c.expect + '<') || cd.includes(c.expect + ' · '));
  const okAll = !!hit && hit.includes('>' + c.ans + '<') && hit.includes(c.content);
  ok(okAll, `「${c.q.slice(0, 16)}…」${c.first ? '首位' : '前3条内'}命中 ${c.expect}（答案 ${c.ans}）`);
}

// ---------- 7. 重合题应展示平台版差异 ----------
els.q.value = '在云展网 PDF 在线工具页面中，可以使用多种 PDF 处理功能';
els.list.innerHTML = '';
vm.runInContext('run()', sandbox);
const m01 = els.list.innerHTML.split('<div class="card">')[1] || '';
ok(m01.includes('平台版') && m01.includes('BCD'), '重合题 M01 展示了平台版选项与答案 BCD');
ok(m01.includes('PDF去水印') && m01.includes('PDF 转 Word'), '重合题 M01 同时展示了两个版本的选项 A');

// ---------- 8. 过滤器 ----------
els.q.value = ''; els.fPool.value = 'B'; els.fType.value = 'judge';
try { vm.runInContext('run()', sandbox); } catch (e) { ok(false, `筛选抛错：${e.message}`); }
ok(els.count.textContent.includes('10'), `题库B + 判断题 计数 = "${els.count.textContent}"`);
els.fPool.value = ''; els.fType.value = '';

els.fSrc.value = 'official';
try { vm.runInContext('run()', sandbox); } catch (e) { ok(false, `来源筛选抛错：${e.message}`); }
// 官方 51 + 重合 2 = 53（重合题同时属于两边，故两个来源筛选都会包含它）
ok(els.count.textContent.includes('53'), `来源=官方 计数 = "${els.count.textContent}"（应为 53 = 51 + 2 重合）`);
els.fSrc.value = 'platform';
vm.runInContext('run()', sandbox);
ok(els.count.textContent.includes('150'), `来源=竞赛平台 计数 = "${els.count.textContent}"（应为 150 = 148 + 2 重合）`);
els.fSrc.value = 'both';
vm.runInContext('run()', sandbox);
ok(els.count.textContent.includes('2'), `来源=仅两边重合 计数 = "${els.count.textContent}"（应为 2）`);
els.fSrc.value = '';

// ---------- 9. 无意义查询应返回空而非乱猜 ----------
for (const junk of ['zzzz绝不存在的问题zzzz', '完全不相关的一段文字啊啊啊', '今天天气不错', 'qwertyuiop']) {
  els.q.value = junk;
  try { vm.runInContext('run()', sandbox); } catch (e) { ok(false, `未命中路径抛错：${e.message}`); }
  ok(els.list.innerHTML.includes('没有命中'), `「${junk}」→ 给出未命中提示而非乱猜`);
}

console.log(fail === 0 ? '\n全部通过 ✅' : `\n${fail} 项未通过 ❌`);
process.exit(fail === 0 ? 0 : 1);
