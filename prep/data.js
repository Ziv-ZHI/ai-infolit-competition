/* 2026 大学生“AI+信息素养”大赛 · 备赛台数据
   数据来源：官方《客观题命题范围及备赛建议（2026.9.10修订）》
   全部网址、考点、样题均逐条摘自原文件，未做臆测补充。
   9.10 相对 7.13 的 4 处变化见文末 CHANGES 数组。 */

const CATS = [
  { id: 'ai',    name: 'AI 素养',        from: 1,  to: 7  },
  { id: 'gov',   name: '政府开放信息',   from: 8,  to: 16 },
  { id: 'learn', name: '实用学习资源',   from: 17, to: 20 },
  { id: 'acad',  name: '学术信息资源',   from: 21, to: 25 },
  { id: 'sys',   name: '信息检索系统',   from: 26, to: 30 },
  { id: 'tech',  name: '检索理论与技术', from: 31, to: 37 },
  { id: 'km',    name: '知识管理工具',   from: 38, to: 41 },
  { id: 'write', name: '学术写作',       from: 42, to: 45 },
  { id: 'res',   name: '科研工具',       from: 46, to: 50 }
];

const MODULES = [
{
  id:1, cat:'ai', name:'AI 基础知识与伦理规范',
  links:[
    {n:'UNESCO《学生人工智能能力框架》(AI competency framework for students)', u:'https://unesdoc.unesco.org/ark:/48223/pf0000391105'},
    {n:'UNESCO 文献库 unesdoc（检索其他 AI 文件）', u:'https://unesdoc.unesco.org'}
  ],
  key:[
    '必背 9 类文件：①《生成式人工智能服务管理暂行办法》（网信办等7部委）②《生成式人工智能服务安全基本要求》（全国网安标委）③《人工智能拟人化互动服务管理暂行办法》（网信办等五部门）④《四川大学本科教育教学人工智能工具应用规范（试行）》⑤中科院《关于在科研活动中规范使用人工智能技术的诚信提醒》⑥《上海交通大学关于在教育教学中使用AI的规范》⑦《学术出版中AIGC使用边界指南3.0》（中信所等）⑧UNESCO《人工智能伦理问题建议书》《生成式AI教育与研究应用指南》《学生AI能力框架》《教师AI能力框架》⑨欧盟《人工智能法》（全文中译本）',
    '《生成式人工智能服务安全基本要求》的四条主线：语料安全、模型安全、安全措施、安全评估',
    '《人工智能拟人化互动服务管理暂行办法》要会判断适用范围：智能客服、知识问答、工作助手、学习教育、科学研究等在什么情况下不适用'
  ],
  todo:'把 9 个文件全文都下载到本地备用；重点练习「从全文里找指定细节」'
},
{
  id:2, cat:'ai', name:'AI 学习资源的获取与利用',
  links:[
    {n:'阿里云开发者社区 · 人工智能学习路线', u:'https://developer.aliyun.com'},
    {n:'科大讯飞 AI 大学堂', u:'https://www.xfyun.cn/doc/ai-university.html'},
    {n:'华为云开发者学堂 · 昇腾 AI 专区', u:'https://edu.huaweicloud.com'},
    {n:'动手学深度学习（开源学习项目）', u:'https://zh.d2l.ai'},
    {n:'Elements of AI', u:'https://www.elementsofai.com'},
    {n:'深圳大学图书馆 生成式AI专题页（官方样题出处）', u:'https://www.lib.szu.edu.cn/learning/ai'}
  ],
  key:[
    'B站、小红书、CSDN、知乎都算 AI 学习资源渠道',
    '各高校图书馆的「人工智能专题网页」是常考点，要会找栏目构成'
  ],
  todo:'打开 2-3 所高校图书馆的 AI 专题页，记住它们各自有哪些栏目'
},
{
  id:3, cat:'ai', name:'通用 AI 工具认知与应用',
  links:[
    {n:'DeepSeek', u:'https://chat.deepseek.com'},
    {n:'豆包', u:'https://www.doubao.com'},
    {n:'腾讯元宝（首页可切换大模型）', u:'https://yuanbao.tencent.com'},
    {n:'智谱清言', u:'https://chatglm.cn'},
    {n:'通义 / 千问', u:'https://www.qianwen.com'},
    {n:'Kimi', u:'https://www.kimi.com'},
    {n:'讯飞星火', u:'https://xinghuo.xfyun.cn'},
    {n:'文心一言', u:'https://yiyan.baidu.com'},
    {n:'纳米AI', u:'https://www.n.cn'}
  ],
  key:[
    '腾讯元宝首页可选择的模型包括 DeepSeek、Hunyuan（官方样题答案 AB）',
    '每个工具都要知道四端：网页版 / APP / 微信小程序 / 浏览器插件'
  ],
  todo:'全部注册一遍，装好 APP 与浏览器插件，塞进收藏夹'
},
{
  id:4, cat:'ai', name:'办公场景下的 AI 工具',
  links:[
    {n:'Kimi（PPT 助手）', u:'https://www.kimi.com'},
    {n:'通义 / 千问（PPT 创作）', u:'https://www.qianwen.com'},
    {n:'豆包（PPT 生成 / 数据分析）', u:'https://www.doubao.com'},
    {n:'智谱清言（PPT 制作）', u:'https://chatglm.cn'},
    {n:'文心一言', u:'https://yiyan.baidu.com'},
    {n:'讯飞星火', u:'https://xinghuo.xfyun.cn'}
  ],
  key:[
    '⚠️ 9.10 修订：豆包入口已改为「PPT 生成」（不再是「AI PPT」），可同时选择篇幅和风格。风格选项改为：学术风、简约风、创意风（没有喜庆风），样题答案 ABD',
    '豆包生成 PPT 的操作路径：官网登录 → 对话框下方「PPT 生成」→ 可见「篇幅」「风格」两项 → 点击风格看模板',
    '通义（网页版+APP）可做会议记录并整理',
    '只关注免费功能，付费功能不命题'
  ],
  todo:'进豆包点一次「PPT 生成」，把篇幅和风格的完整菜单各看一遍'
},
{
  id:5, cat:'ai', name:'科研场景下的 AI 工具',
  links:[
    {n:'LeapSpace（爱思唯尔科研级 AI 平台）', u:'https://www.sciencedirect.com/leapspace/'},
    {n:'LeapSpace 官方培训教程', u:'https://eci.elsevier.cn/resource/LeapSpace.html?fid=165&menuid=358&infoid=2004'},
    {n:'CNKI AI', u:'https://ai.cnki.net'},
    {n:'星火科研助手', u:'https://paper.iflytek.com'},
    {n:'秘塔 AI 搜索', u:'https://metaso.cn'},
    {n:'AMiner', u:'https://www.aminer.cn'}
  ],
  key:[
    'LeapSpace 四大核心功能：Trust Card、Claim Radar、Deep Research、Writing Coach',
    'Claim Radar = 展示已有文献与某陈述的关联及匹配程度（支持/中立/相悖）→ 官方样题答案',
    'CNKI AI 的「观点网络全景分析」在 知识问答-Deep Research 模式下 → 官方样题答案 A',
    '星火科研助手「学术写作」栏目包含：学术翻译、英文润色、全文审校（没有中文润色，答案 ABD）'
  ],
  todo:'LeapSpace 9月1日已开通，务必注册并逐个点开四个核心功能'
},
{
  id:6, cat:'ai', name:'多模态 AI 工具',
  links:[
    {n:'豆包（图像/视频/音乐生成）', u:'https://www.doubao.com'},
    {n:'智谱清言', u:'https://chatglm.cn'},
    {n:'通义万相', u:'https://tongyi.aliyun.com/wanxiang'},
    {n:'可灵 AI', u:'https://klingai.com'},
    {n:'文心一言（图像生成）', u:'https://yiyan.baidu.com'},
    {n:'讯飞星火（图像生成）', u:'https://xinghuo.xfyun.cn'},
    {n:'闪剪（数字人）', u:'https://www.shanjian.tv'},
    {n:'蝉镜（数字人）', u:'https://www.chanjing.cc'}
  ],
  key:[
    '豆包音乐生成的音乐风格可选：DJ、民谣、朋克（没有「戏曲」，官方样题答案 ABD）',
    '数字人工具要记住名字：闪剪、蝉镜'
  ],
  todo:'进豆包点一次「音乐生成」，把风格下拉菜单完整看一遍'
},
{
  id:7, cat:'ai', name:'AI 开源与开放数据资源',
  links:[
    {n:'GitHub', u:'https://github.com'},
    {n:'GitHub 中文官方文档', u:'https://docs.github.com/zh'},
    {n:'魔搭社区 ModelScope', u:'https://modelscope.cn'},
    {n:'百度 AI Studio 飞桨星河社区', u:'https://aistudio.baidu.com'},
    {n:'和鲸社区 HeyWhale', u:'https://www.heywhale.com'},
    {n:'阿里云天池', u:'https://tianchi.aliyun.com'},
    {n:'DataFountain', u:'https://www.datafountain.cn'},
    {n:'OpenDataLab', u:'https://opendatalab.com'},
    {n:'OpenML', u:'https://www.openml.org'},
    {n:'UCI Machine Learning Repository（Classic 版）', u:'https://archive.ics.uci.edu'},
    {n:'UCI Machine Learning Repository（Beta 版）', u:'https://archive-beta.ics.uci.edu'}
  ],
  key:[
    'GitHub 必须会看：项目名称、作者/机构、README、项目简介、更新时间、License 许可证、Release 或下载入口',
    '模型/数据集平台要看：名称、任务类型、资源简介、使用方式、许可证、下载入口',
    '开放数据集要看：名称、数据类型、文件格式、字段说明、样本数量、下载方式、使用限制'
  ],
  todo:'在 GitHub、ModelScope、AI Studio 各找一个开源项目，把 LICENSE 和 Release 页面翻一遍'
},
{
  id:8, cat:'gov', name:'思政信息资源',
  links:[
    {n:'习近平系列重要讲话数据库', u:'http://jhsjk.people.cn'},
    {n:'共产党员网', u:'https://www.12371.cn'},
    {n:'全国高校课程思政教学资源服务平台', u:'https://xhsz.news.cn'}
  ],
  key:[
    '讲话数据库支持以「全文」为检索点做关键词检索，常用于考「首次提到某词」类判断题',
    '共产党员网、课程思政平台都要能找到指定的学习资源（含可下载 mp4）'
  ],
  todo:'在讲话数据库里检索「数字素养与技能」，看能命中哪些场合'
},
{
  id:9, cat:'gov', name:'开放数据资源',
  links:[
    {n:'国家统计局 · 数据查询系统', u:'https://data.stats.gov.cn/dg/website/page.html#/pc/national/home'},
    {n:'国家统计局（找统计年鉴）', u:'https://www.stats.gov.cn'},
    {n:'国家科学数据中心', u:'https://www.escience.org.cn/data-center'},
    {n:'科学数据银行 ScienceDB', u:'https://www.scidb.cn'},
    {n:'世界银行开放数据', u:'https://data.worldbank.org'},
    {n:'AI 知数（需登录）', u:'https://aid.cnki.net'}
  ],
  key:[
    '国家统计局数据查询：输入关键词 → 找到数据项 → 点「相关报表」→ 右上角选「最近10年」',
    '各省会城市、副省级城市的政府公共数据开放平台要会找，并下载 xlsx / csv / rdf / xml 数据集',
    'AI 知数用前注意：指标名称、数据来源、统计口径、年份范围、地区范围',
    '国家科学数据中心旗下有 20 个学科科学数据中心'
  ],
  todo:'注册 AI 知数；找一个地方开放数据平台下载一份数据集'
},
{
  id:10, cat:'gov', name:'法律信息资源',
  links:[
    {n:'国家法律法规数据库（重点：高级检索）', u:'https://flk.npc.gov.cn'},
    {n:'国家行政法规库（国务院）', u:'http://www.gov.cn/zhengce/xzfgk/'},
    {n:'国家行政法规库（司法部）', u:'http://xzfg.moj.gov.cn/search2.html'},
    {n:'国家规章库（国务院）', u:'https://www.gov.cn/zhengce/xxgk/gjgzk/index.htm'},
    {n:'国家规章库（司法部）', u:'https://www.moj.gov.cn/pub/sfbgw/gwygzk/index.html'},
    {n:'人民法院案例库', u:'https://rmfyalk.court.gov.cn'},
    {n:'最高人民法院公报检索系统', u:'http://gongbao.court.gov.cn'},
    {n:'中国执行信息网', u:'http://zxgk.court.gov.cn'},
    {n:'中国庭审公开网', u:'http://tingshen.court.gov.cn'},
    {n:'中国裁判文书网', u:'https://wenshu.court.gov.cn'},
    {n:'中国法律知识资源总库（CNKI）', u:'https://lawpro.cnki.net/'}
  ],
  key:[
    '中国执行信息网可查：被执行人、失信被执行人、限制消费人员、终本案件',
    '中国法律知识资源总库查案例的入口有四个：案例库、业务助手、类案推送、一框式检索（全选）'
  ],
  todo:'把 11 个网址全部收藏；在裁判文书网里搜一次本校名称，看能否读到全文'
},
{
  id:11, cat:'gov', name:'标准与商标信息资源',
  links:[
    {n:'国家标准全文公开系统', u:'https://openstd.samr.gov.cn'},
    {n:'全国标准信息公共服务平台', u:'http://std.samr.gov.cn/gb'},
    {n:'食品安全国家标准（检索）', u:'https://sppt.cfsa.net.cn:8086/db'},
    {n:'食品安全国家标准（另一入口）', u:'http://gb2760.cfsa.net.cn'},
    {n:'生态环境标准', u:'https://www.mee.gov.cn/ywgz/fgbz/bz/'},
    {n:'工程建设标准（住建部）', u:'https://www.mohurd.gov.cn/gongkai/fdzdgknr/bzgg/index.html'},
    {n:'商标查询系统（国家知识产权局商标局）', u:'https://sbj.cnipa.gov.cn/sbj/sbcx'},
    {n:'CNKI（检索标准）', u:'https://www.cnki.net'},
    {n:'万方（检索标准）', u:'https://www.wanfangdata.com.cn'},
    {n:'维普（检索标准）', u:'https://www.cqvip.com'}
  ],
  key:[
    '⚠️ 食品安全、生态环境、工程建设这三类国标「国家标准全文公开系统」不收录，必须去对应部委网站',
    '标准题常考：给标准号找全文 → 看「本标准主要起草人」、某页最后一个字'
  ],
  todo:'用 GB/T 38880-2020 练手，找到全文第2页的起草人名单'
},
{
  id:12, cat:'gov', name:'专利和地理标志',
  links:[
    {n:'中国专利公布公告系统', u:'http://epub.cnipa.gov.cn/'},
    {n:'专利检索及分析系统（需免费注册）', u:'https://pss-system.cponline.cnipa.gov.cn/'},
    {n:'USPTO Patent Public Search（PPUBS）', u:'https://www.uspto.gov/patents/search/patent-public-search'},
    {n:'Espacenet（欧洲专利局）', u:'https://ie.espacenet.com'},
    {n:'PATENTSCOPE（WIPO）', u:'https://patentscope2.wipo.int/search/en/search.jsf'},
    {n:'地理标志产品检索', u:'https://ggfw.cnipa.gov.cn/dlbzsq/dbQuery'},
    {n:'国家知识产权局', u:'https://www.cnipa.gov.cn'}
  ],
  key:[
    '「专利检索及分析」系统要提前免费注册登录',
    '专利题常考：读说明书原文 → 判断技术领域、附图页数',
    '地理标志入口：国知局首页 → 政务服务 → 地理标志'
  ],
  todo:'注册「专利检索及分析」账号；在中外 3 个库里各找一篇华为近年专利'
},
{
  id:13, cat:'gov', name:'反诈防骗信息资源',
  links:[
    {n:'中国互联网联合辟谣平台', u:'http://www.piyao.org.cn'},
    {n:'辟谣信息查证栏目', u:'https://www.piyao.org.cn/pysjk/frontsql.htm'}
  ],
  key:[
    '「辟谣信息查证」按分类筛选项：科学常识、时事政治、公共政策、公共安全（四个全有）',
    '辟谣渠道要记：中国互联网联合辟谣平台、公众号（全民较真、科学辟谣）、小程序（微信辟谣助手、腾讯较真辟谣）、微博辟谣',
    '国家反诈中心 APP 要真的装上'
  ],
  todo:'装国家反诈中心 APP，把主要功能点一遍'
},
{
  id:14, cat:'gov', name:'医卫信息查询',
  links:[
    {n:'国家卫健委官网（首页左侧服务栏目）', u:'http://www.nhc.gov.cn'},
    {n:'国家药监局数据查询（药品/化妆品/医疗器械）', u:'https://www.nmpa.gov.cn/datasearch/home-index.html'},
    {n:'CHKD AI', u:'https://chkd.cnki.net/ai/'}
  ],
  key:[
    'CHKD AI 中用于结构化临床问题、精准定位证据的功能是 PICO 分析（在知识问答 → 知识扩展下）',
    '药监局查询走「高级检索 → 注册证查询」路线'
  ],
  todo:'分别查一项药品、化妆品、医疗器械；体验一次 CHKD AI 智能伴读'
},
{
  id:15, cat:'gov', name:'文教信息查询',
  links:[
    {n:'中国教育考试网', u:'https://www.neea.edu.cn'},
    {n:'研招网', u:'https://yz.chsi.com.cn'},
    {n:'国家大学生就业服务平台', u:'https://www.ncss.cn'},
    {n:'高校毕业生到国际组织实习任职信息服务平台', u:'https://gj.ncss.cn'},
    {n:'全国大学生创业服务网', u:'https://cy.ncss.cn'}
  ],
  key:[
    '研招网硕士专业目录支持按「是否接收退役大学生士兵专项计划」筛选，再勾「双一流」',
    '教育考试网覆盖：四六级、全国计算机等级考试、中小学教师资格考试'
  ],
  todo:'在研招网完整走一遍：专业名称 + 专项计划筛选 + 开设院校 + 双一流勾选'
},
{
  id:16, cat:'gov', name:'证书资格查询',
  links:[
    {n:'学信网（学历/学位查询）', u:'https://www.chsi.com.cn'},
    {n:'中国证券业协会从业人员查询', u:'https://gs.sac.net.cn/pages/registration/new-sac-publicity-org.html'},
    {n:'中国证券投资基金业协会从业人员查询', u:'https://www.amac.org.cn/fwdt/wyc/jgcprycx/rycx'},
    {n:'中国银行业协会查询系统', u:'https://www.china-cba.net/Index/lists/catid/31.html'},
    {n:'中国注册会计师协会（会计师/事务所）', u:'https://cmis.cicpa.org.cn'},
    {n:'全国律师执业诚信信息公示平台', u:'https://credit.acla.org.cn'},
    {n:'中国记者网（记者证查询）', u:'https://press.nppa.gov.cn'}
  ],
  key:[
    '学信网验真伪走：学历查询 → 零散查询 → 输入证书编号 + 姓名',
    '七类查询对象要能对号入座：学历学位 / 证券 / 基金 / 银行 / 注册会计师 / 律师 / 记者'
  ],
  todo:'拿自己的学历在学信网实测一次零散查询'
},
{
  id:17, cat:'learn', name:'在线开放课程资源',
  links:[
    {n:'中国大学 MOOC', u:'https://www.icourse163.org'},
    {n:'学堂在线', u:'https://www.xuetangx.com'},
    {n:'智慧树', u:'https://www.zhihuishu.com'},
    {n:'学银在线', u:'https://www.xueyinonline.com'},
    {n:'国家高等教育智慧教育平台', u:'https://higher.smartedu.cn'},
    {n:'国家职业教育智慧教育平台', u:'https://vocational.smartedu.cn'},
    {n:'国家终身教育智慧教育平台', u:'https://lifelong.smartedu.cn'},
    {n:'国家中小学智慧教育平台', u:'https://basic.smartedu.cn'},
    {n:'国家虚拟仿真实验教学课程共享平台', u:'http://www.ilab-x.com'},
    {n:'爱课程（视频公开课/资源共享课）', u:'https://www.icourses.cn'},
    {n:'网易公开课', u:'https://open.163.com'}
  ],
  key:[
    '课程题常考：某平台的某门课第 X 节讲什么、第几分钟画面是什么 → 必须能快进定位',
    '国家智慧教育平台有四个：高等 / 职业 / 终身 / 中小学'
  ],
  todo:'在 MOOC 上找一门课，练「按小节定位内容」'
},
{
  id:18, cat:'learn', name:'开放平台中的学习资源',
  links:[
    {n:'高校信息素养教育数据库 · 直播讲座（完全免费）', u:'https://suyang.zxhnzq.com/lecture'},
    {n:'知网学术大讲堂', u:'https://k.cnki.net/home'},
    {n:'万方视频', u:'https://video.wanfangdata.com.cn'},
    {n:'学习强国', u:'https://www.xuexi.cn'},
    {n:'一席', u:'https://www.yixi.tv'},
    {n:'TED', u:'https://www.ted.com'},
    {n:'小红书', u:'https://www.xiaohongshu.com'},
    {n:'哔哩哔哩', u:'https://www.bilibili.com'},
    {n:'知乎', u:'https://www.zhihu.com'},
    {n:'知乎直答（AI 搜索）', u:'https://zhida.zhihu.com'},
    {n:'和鲸社区 HeyWhale', u:'https://www.heywhale.com'},
    {n:'百度 AI Studio 飞桨星河社区', u:'https://aistudio.baidu.com'},
    {n:'阿里云天池', u:'https://tianchi.aliyun.com'},
    {n:'DataFountain', u:'https://www.datafountain.cn'}
  ],
  key:[
    '高校信息素养教育数据库的直播讲座栏目完全免费，不在校园网时选「不登录」即可',
    '知乎直答是官方点名的 AI 搜索工具',
    '只考免费内容：不考付费课程、付费算力、商业服务'
  ],
  todo:'去直播讲座栏目找一个视频，看进度条读时长'
},
{
  id:19, cat:'learn', name:'免费电子书',
  links:[
    {n:'剑桥大学出版社 Cambridge Core', u:'https://www.cambridge.org/core'},
    {n:'牛津学术 Oxford Academic（Books）', u:'https://academic.oup.com/books'},
    {n:'NCBI Bookshelf', u:'https://www.ncbi.nlm.nih.gov/books/'}
  ],
  key:[
    '⚠️ 9.10 修订：HathiTrust 已因限制国内 IP 访问整体移出命题范围，不用再准备',
    '命题范围只剩三个：剑桥 Cambridge Core、牛津学术 Oxford Academic、NCBI Bookshelf',
    '电子书题套路固定：给书名 → 找全书 PDF → 翻到正文第 N 页（注意 PDF 页码 ≠ 正文页码）数图/数表',
    '剑桥库的入口叫 Open full book PDF'
  ],
  todo:'在剑桥库找一本 OA 书，练「正文页码 vs PDF 页码」换算'
},
{
  id:20, cat:'learn', name:'国家图书馆免费数字资源',
  links:[
    {n:'中国国家图书馆', u:'http://www.nlc.cn'},
    {n:'中华古籍资源库', u:'http://read.nlc.cn/thematDataSearch/toGujiIndex'},
    {n:'民国时期文献库', u:'http://read.nlc.cn/specialResourse/minguoIndex'},
    {n:'美国国会图书馆', u:'https://www.loc.gov'}
  ],
  key:[
    '国图注册免费（走「读者门户登录注册」入口），登录后资源更多',
    '美国国会图书馆重点看电子书和地图；首页右上角可选文献类型再输入关键词'
  ],
  todo:'注册国图账号；在民国时期文献库找一本书做在线阅览'
},
{
  id:21, cat:'acad', name:'期刊论文的检索',
  links:[
    {n:'CNKI', u:'https://www.cnki.net'},
    {n:'万方数据知识服务平台', u:'https://www.wanfangdata.com.cn'},
    {n:'维普网', u:'https://www.cqvip.com'},
    {n:'LeapSpace', u:'https://www.sciencedirect.com/leapspace/'},
    {n:'ScienceDirect', u:'https://www.sciencedirect.com'},
    {n:'Wiley Online Library', u:'https://onlinelibrary.wiley.com'},
    {n:'Taylor & Francis Online', u:'https://www.tandfonline.com'},
    {n:'ACM Digital Library', u:'https://dl.acm.org'},
    {n:'ASME Digital Collection', u:'https://asmedigitalcollection.asme.org'},
    {n:'Nature', u:'https://www.nature.com'},
    {n:'Cell', u:'https://www.cell.com'},
    {n:'Science', u:'https://www.science.org'}
  ],
  key:[
    '除 LeapSpace 外，这些外文系统检索免费，且能拿到部分 OA 全文',
    'CNS 三大刊官网既能检索现刊，也能检索过刊（常考「2000 年 6 月的过刊论文」）'
  ],
  todo:'在 Nature / Cell / Science 各找一篇 2000 年 6 月的过刊'
},
{
  id:22, cat:'acad', name:'学术会议论文及会议信息检索',
  links:[
    {n:'IEEE 官网（会议栏目 Upcoming Conferences）', u:'https://www.ieee.org'},
    {n:'IEEE Xplore', u:'https://ieeexplore.ieee.org'},
    {n:'CNKI 中国学术会议网', u:'https://conf.cnki.net'},
    {n:'CNKI', u:'https://www.cnki.net'},
    {n:'万方', u:'https://www.wanfangdata.com.cn'},
    {n:'维普', u:'https://www.cqvip.com'}
  ],
  key:[
    'IEEE 会议信息路线：官网 → 会议菜单 → Upcoming conferences → 搜索 → 看论文提交截止时间',
    'CNKI、万方的会议论文数据库检索免费'
  ],
  todo:'在 IEEE 官网查一次「人工智能」相关 upcoming conference'
},
{
  id:23, cat:'acad', name:'学位论文及资源获取',
  links:[
    {n:'CNKI 学位论文库', u:'https://www.cnki.net'},
    {n:'万方', u:'https://www.wanfangdata.com.cn'},
    {n:'维普', u:'https://www.cqvip.com'},
    {n:'国家图书馆博士论文数据库', u:'http://www.nlc.cn'},
    {n:'MIT Theses', u:'https://dspace.mit.edu'}
  ],
  key:[
    'CNKI / 万方 / 维普的学位论文库查询都免费，不依赖学校是否购买',
    '学位论文题常考「导师是谁」→ 进入详情页看导师字段'
  ],
  todo:'在 MIT Theses 找一篇题名含 education 的论文并下载全文'
},
{
  id:24, cat:'acad', name:'OA、预印本及其他免费资源',
  links:[
    {n:'DOAJ', u:'https://doaj.org'},
    {n:'OALib', u:'https://www.oalib.com'},
    {n:'arXiv', u:'https://arxiv.org'},
    {n:'ChinaXiv', u:'https://chinaxiv.org'},
    {n:'medRxiv', u:'https://www.medrxiv.org'},
    {n:'IOPscience', u:'https://iopscience.iop.org'},
    {n:'JSTOR', u:'https://www.jstor.org'},
    {n:'BioOne', u:'https://bioone.org'},
    {n:'抗日战争与近代中日关系文献数据平台', u:'https://www.modernhistory.org.cn'},
    {n:'国家哲学社会科学文献中心', u:'http://www.ncpssd.org'}
  ],
  key:[
    'arXiv 检索点里有个专门的「arXiv identifier」，直接输编号即可定位（官方样题考点）',
    '预印本三件套：arXiv、ChinaXiv、medRxiv',
    '报纸题会让你找「某年某月某日某版」→ 走数字报纸'
  ],
  todo:'在 arXiv 用 identifier 2108.09800 定位一篇，数一下 PDF 页数'
},
{
  id:25, cat:'acad', name:'科研项目数据库',
  links:[
    {n:'国家社科基金项目数据库', u:'http://fz.people.com.cn/skygb/sk/index.php/index/index/4541'},
    {n:'国家自然科学基金大数据知识管理服务门户', u:'https://kd.nsfc.gov.cn'}
  ],
  key:[
    '国家社科库：项目名称检索 → 结果中点右箭头可展开更多字段（如负责人单位）',
    '自科基金门户可查：立项项目、结题项目、科研成果'
  ],
  todo:'查一下本校近 4 年的国家社科立项与结项情况'
},
{
  id:26, cat:'sys', name:'学术搜索',
  links:[
    {n:'百度学术', u:'https://xueshu.baidu.com'},
    {n:'PubMed', u:'https://pubmed.ncbi.nlm.nih.gov'},
    {n:'PubScholar', u:'https://pubscholar.cn'},
    {n:'NSTL 国家科技图书文献中心', u:'https://www.nstl.gov.cn'},
    {n:'AMiner', u:'https://www.aminer.cn'}
  ],
  key:[
    'PubScholar 是中科院推出的公益学术平台，可看全文获取渠道（如 OXFORD ACADEMIC）',
    'PubMed 结果页有 Create RSS / Create alert（需提前注册）',
    'AMiner 常考被引量'
  ],
  todo:'在 PubMed 注册账号；在 PubScholar 检索一次并看来源链接'
},
{
  id:27, cat:'sys', name:'图片搜索',
  links:[
    {n:'百度图片', u:'https://image.baidu.com'},
    {n:'搜狗图片', u:'https://pic.sogou.com'},
    {n:'360 图片', u:'https://image.so.com'},
    {n:'Bing 图片', u:'https://www.bing.com/images'},
    {n:'iconfont', u:'https://www.iconfont.cn'},
    {n:'Unsplash', u:'https://unsplash.com'},
    {n:'Pixabay', u:'https://pixabay.com'},
    {n:'CNKI 学术图片库（需登录）', u:'https://image.cnki.net/AI'},
    {n:'SciDraw（科研绘图素材）', u:'https://scidraw.io'},
    {n:'SMART（医学矢量素材）', u:'https://smart.servier.com'}
  ],
  key:[
    '以图识图：百度、搜狗、360、CNKI 学术图片库 全部支持（四个全选）',
    'CNKI 学术图片库需提前注册认证，有图片对比、图片解析功能',
    '要关注图片版权问题'
  ],
  todo:'注册 CNKI 学术图片库；用一次以图识图'
},
{
  id:28, cat:'sys', name:'网址导航',
  links:[
    {n:'优设导航', u:'https://hao.uisdc.com'},
    {n:'HIPPTER', u:'http://www.hippter.com'},
    {n:'中国古典文献资源导航系统（奎章阁）', u:'https://www.wenxianxue.cn'},
    {n:'AI 工具集', u:'https://ai-bot.cn'}
  ],
  key:[
    '奎章阁「古籍全文」栏目下可找到：安徽基本古籍库、登楼古籍检索、湖南省古籍智慧化平台、尚古汇典',
    'AI 工具集里有「AI 智能体」栏目'
  ],
  todo:'把四个导航站各翻一遍，记住主要栏目'
},
{
  id:29, cat:'sys', name:'网络指数',
  links:[
    {n:'百度指数（需登录）', u:'https://index.baidu.com/v2/index.html'},
    {n:'抖音指数（原巨量算数，需登录）', u:'https://trendinsight.oceanengine.com'}
  ],
  key:[
    '微信指数：在微信里直接搜「微信指数」即可',
    '百度指数做地域题的套路：搜索关键词 → 人群画像 → 限定时间范围 → 看地域分布',
    '⚠️ 百度账号、抖音账号都要提前注册，赛前先登录好'
  ],
  todo:'注册百度账号和抖音账号，赛前登录一次'
},
{
  id:30, cat:'sys', name:'馆藏查询系统',
  links:[
    {n:'中国国家图书馆', u:'http://www.nlc.cn'},
    {n:'中国高等教育文献保障系统 CALIS', u:'http://opac.calis.edu.cn'},
    {n:'MIT Libraries', u:'https://libraries.mit.edu'}
  ],
  key:[
    '馆藏查询系统英文叫 OPAC（Online Public Access Catalog），中文名可能是：馆藏查询、馆藏目录、书目查询、馆藏书目',
    '入口通常有三个：图书馆官网、微信公众号、移动图书馆 APP',
    '要会看：索书号、馆藏地、在馆情况；要懂中图分类号',
    '⚠️ 外文著作要用英文名检索（如《白银资本》→ ReORIENT: Global Economy in the Asian Age）'
  ],
  todo:'任选 3 个图书馆（985、省级公共馆、国外名校）各找到 OPAC 入口'
},
{
  id:31, cat:'tech', name:'高级检索',
  links:[
    {n:'CNKI', u:'https://www.cnki.net'},
    {n:'万方', u:'https://www.wanfangdata.com.cn'},
    {n:'维普', u:'https://www.cqvip.com'},
    {n:'ScienceDirect', u:'https://www.sciencedirect.com'},
    {n:'Wiley', u:'https://onlinelibrary.wiley.com'},
    {n:'Taylor & Francis', u:'https://www.tandfonline.com'},
    {n:'PubMed', u:'https://pubmed.ncbi.nlm.nih.gov'},
    {n:'IEEE Xplore', u:'https://ieeexplore.ieee.org'},
    {n:'SPIE Digital Library', u:'https://www.spiedigitallibrary.org'}
  ],
  key:[
    '⚠️ 9.10 修订：ACM 已从本模块移出（其高级检索需更高权限）。但 ACM 在模块33 截词检索里仍然要考，别一刀切地放弃',
    '本模块命题数据库：CNKI、万方、维普、ScienceDirect、Wiley、Taylor & Francis、PubMed、IEEE Xplore、SPIE',
    '高级检索入口一般在数据库首页有链接',
    'CNKI 高级检索能同时限定：篇名、时间范围（出版年度）、来源类别（CSSCI 等）、并按被引排序',
    '不同文献类型下，CNKI/万方/维普的高级检索界面可能不一样'
  ],
  todo:'在 CNKI 高级检索里限定篇名+出版年度+CSSCI，按被引排序练一遍'
},
{
  id:32, cat:'tech', name:'布尔逻辑检索',
  links:[
    {n:'万方（布尔检索练习）', u:'https://www.wanfangdata.com.cn'},
    {n:'CNKI', u:'https://www.cnki.net'},
    {n:'维普', u:'https://www.cqvip.com'},
    {n:'ScienceDirect', u:'https://www.sciencedirect.com'},
    {n:'Wiley', u:'https://onlinelibrary.wiley.com'},
    {n:'PubMed', u:'https://pubmed.ncbi.nlm.nih.gov'},
    {n:'IEEE Xplore', u:'https://ieeexplore.ieee.org'},
    {n:'ACM Digital Library', u:'https://dl.acm.org'}
  ],
  key:[
    '三种布尔逻辑：AND（与，缩小）、OR（或，扩大）、NOT（非，排除）',
    '⚠️ 各数据库表达方式不同：有的用 AND/OR/NOT，有的用 * / + / -，有的界面是下拉框选「并且/或者/不包含」',
    '万方高级检索里，不同字段之间前面还有「与/或/非」的联动选择，别漏'
  ],
  todo:'在万方做一次多字段布尔组合：题名 OR + 关键词 AND + 摘要 NOT'
},
{
  id:33, cat:'tech', name:'截词检索',
  links:[
    {n:'PubMed（试 comput*[title]）', u:'https://pubmed.ncbi.nlm.nih.gov'},
    {n:'Wiley', u:'https://onlinelibrary.wiley.com'},
    {n:'ACM Digital Library', u:'https://dl.acm.org'},
    {n:'中国专利公布公告系统', u:'http://epub.cnipa.gov.cn/'}
  ],
  key:[
    '通用规则：* 表示多个字符，? 表示一个字符（不是绝对的，看系统说明）',
    '⚠️ ACM 里 analys?e 匹配 analyse / analyze → 填问号（官方样题答案 B）',
    '中国专利公布公告系统的高级查询里，申请人字段可用 % 和 ? 做扩展（如 中国%大学）'
  ],
  todo:'在 PubMed 输入 comput*[title] 看结果；在专利系统试 中国%大学'
},
{
  id:34, cat:'tech', name:'精确与模糊匹配',
  links:[
    {n:'CNKI', u:'https://www.cnki.net'},
    {n:'维普', u:'https://www.cqvip.com'},
    {n:'万方', u:'https://www.wanfangdata.com.cn'}
  ],
  key:[
    '⚠️ CNKI 最易错：同样一个「精确」，在不同字段含义不同',
    '「篇名」字段：精确 = 不拆分；模糊 = 可拆分',
    '「第一作者」字段：精确 = 完全一致；模糊 = 包含',
    '外文数据库一般用半角双引号实现精确匹配（词组/短语不被拆分）'
  ],
  todo:'在 CNKI 用同一组条件分别选精确/模糊，对比结果条数'
},
{
  id:35, cat:'tech', name:'结果筛选',
  links:[
    {n:'CNKI', u:'https://www.cnki.net'},
    {n:'万方', u:'https://www.wanfangdata.com.cn'},
    {n:'维普', u:'https://www.cqvip.com'},
    {n:'ScienceDirect', u:'https://www.sciencedirect.com'},
    {n:'Wiley', u:'https://onlinelibrary.wiley.com'},
    {n:'Taylor & Francis', u:'https://www.tandfonline.com'},
    {n:'PubMed', u:'https://pubmed.ncbi.nlm.nih.gov'},
    {n:'IEEE Xplore', u:'https://ieeexplore.ieee.org'}
  ],
  key:[
    '结果筛选区一般在检索结果页面左侧，重点看有哪些筛选字段',
    'Wiley 的筛选项包括 Publication Type、Publication Date、Subjects，没有 title（官方样题答案 D）',
    '很多系统的筛选区自带分组统计，可以直接用来做简单分析'
  ],
  todo:'在 Wiley 搜 AIGC，把左侧筛选区字段记下来'
},
{
  id:36, cat:'tech', name:'字段限制检索',
  links:[
    {n:'CNKI', u:'https://www.cnki.net'},
    {n:'万方', u:'https://www.wanfangdata.com.cn'},
    {n:'维普', u:'https://www.cqvip.com'},
    {n:'PubMed（检索表达式字段限制）', u:'https://pubmed.ncbi.nlm.nih.gov'},
    {n:'ScienceDirect', u:'https://www.sciencedirect.com'},
    {n:'IEEE Xplore', u:'https://ieeexplore.ieee.org'},
    {n:'ACM Digital Library', u:'https://dl.acm.org'}
  ],
  key:[
    '⚠️ CNKI 学术期刊的可选检索字段：关键词、篇名、作者单位、期刊名称 —— 没有「题名」（官方样题答案 B）',
    'PubMed 用检索表达式做字段限制，如 comput*[title]',
    'CNKI 独有「第一单位」（第一作者单位）这个检索点'
  ],
  todo:'把 CNKI 高级检索里所有可选字段抄一遍'
},
{
  id:37, cat:'tech', name:'搜索引擎的检索语法和高级搜索',
  links:[
    {n:'百度高级搜索页', u:'https://www.baidu.com/gaoji/advanced.html'},
    {n:'百度（设置 → 高级搜索）', u:'https://www.baidu.com'},
    {n:'搜狗', u:'https://www.sogou.com'},
    {n:'360 搜索', u:'https://www.so.com'}
  ],
  key:[
    '必背语法：filetype:（限定文件类型）、site:（限定网站）、inurl:（限定 URL）、intitle:（限定标题）',
    '百度高级搜索「关键词位置」可选：网页任何地方、仅网页标题中、仅URL中 —— 没有「仅网页图片中」（官方样题答案 ABC）',
    '百度高级检索界面有两个入口：首页右上角设置 → 高级搜索；或直接访问 gaoji/advanced.html'
  ],
  todo:'用 site: 和 filetype: 各搜一次，体会语法'
},
{
  id:38, cat:'km', name:'思维导图、笔记软件、问卷调查',
  links:[
    {n:'腾讯文档（思维导图）', u:'https://docs.qq.com'},
    {n:'WPS（思维导图）', u:'https://www.wps.cn'},
    {n:'有道云笔记（脑图）', u:'https://note.youdao.com'},
    {n:'豆包（实时记录）', u:'https://www.doubao.com'},
    {n:'通义 / 千问（实时记录）', u:'https://www.qianwen.com'},
    {n:'问卷星', u:'https://www.wjx.cn'}
  ],
  key:[
    '有思维导图功能的：腾讯文档、WPS、有道云笔记；问卷星不是（官方样题答案 ABC）',
    '豆包/通义的实时记录：录音转文字、课堂笔记整理、会议纪要生成、重点提炼、待办事项提取',
    '思维导图要会：创建、节点编辑、层级调整、导出、分享'
  ],
  todo:'装豆包 APP 和通义 APP，录一段话测转写'
},
{
  id:39, cat:'km', name:'OFFICE 插件和浏览器插件',
  links:[
    {n:'小恐龙公文排版助手（WORD/WPS 插件）', u:'https://gw.xkonglong.com'},
    {n:'雨课堂（PPT 插件）', u:'https://www.yuketang.cn'},
    {n:'OfficeAI 助手（WORD/EXCEL/WPS 插件）', u:'https://www.office-ai.cn'},
    {n:'智谱清言（浏览器插件）', u:'https://chatglm.cn'},
    {n:'Microsoft Edge 扩展商店', u:'https://microsoftedge.microsoft.com/addons'},
    {n:'360 浏览器扩展中心', u:'https://ext.chrome.360.cn'}
  ],
  key:[
    '雨课堂是 PPT 插件，免费，支持弹幕，支持单选/多选/填空/主观题，有分组功能（判断题答案：正确）',
    '三个插件名称要对应准确：小恐龙→公文排版；雨课堂→PPT；OfficeAI→WORD/EXCEL/WPS',
    '浏览器插件也叫浏览器扩展'
  ],
  todo:'把三个 Office 插件和智谱清言插件都装上并各用一次'
},
{
  id:40, cat:'km', name:'截图与录屏',
  links:[
    {n:'LICEcap（屏幕录制成 GIF）', u:'https://www.cockos.com/licecap/'}
  ],
  key:[
    'QQ 截图后弹出的工具条里，图钉状图标 = 贴图（可贴多张到桌面，双击销毁）→ 官方样题答案 C',
    'QQ 的截图、贴图、录屏都有快捷键，工具条上每个按钮都要认识',
    'LICEcap 把屏幕操作录成 GIF 动图'
  ],
  todo:'按一遍 QQ 截图工具条上的每个按钮；用 LICEcap 录一个动图'
},
{
  id:41, cat:'km', name:'PDF 文件处理',
  links:[
    {n:'云展网 PDF 在线工具', u:'https://www.yunzhan365.com/tools/pdf-to-word'}
  ],
  key:[
    '云展网提供：PDF 转 Word、PDF 合并、PDF 拆分、PDF 压缩、PDF 加密、PDF 添加页面、PDF 文件转换（官方样题全选 ABCD）',
    'WORD / EXCEL / PPT 转 PDF：用「另存为」即可'
  ],
  todo:'用云展网做一次 PDF 合并和压缩'
},
{
  id:42, cat:'write', name:'学术评价与投稿选刊',
  links:[
    {n:'国家新闻出版署 · 期刊查询系统（验真伪）', u:'https://www.nppa.gov.cn/bsfw/cyjghcpcx'},
    {n:'CNKI 写作投稿服务平台', u:'https://xztg.cnki.net'},
    {n:'LeapSpace（投稿期刊匹配）', u:'https://www.sciencedirect.com/leapspace/'},
    {n:'CNKI', u:'https://www.cnki.net'},
    {n:'万方', u:'https://www.wanfangdata.com.cn'},
    {n:'维普', u:'https://www.cqvip.com'}
  ],
  key:[
    '影响因子：某刊前两年发表论文在统计当年的总被引次数 ÷ 该刊前两年发文总量，必须会算',
    'H 指数：某作者有 h 篇论文每篇至少被引 h 次',
    '判断收录范围的办法：在 CNKI/万方/维普输入期刊名或文章名，勾选 CSSCI / 北大核心 / CSCD / AMI，看能否命中；期刊主页也能看',
    'CNKI 写作投稿服务平台只考：追踪学术热点、选题分析、智能选刊（其他商用功能不命题）'
  ],
  todo:'查《会计之友》是不是正规期刊、是不是北大核心/CSSCI/AMI/CSCD，并读它的复合影响因子'
},
{
  id:43, cat:'write', name:'学术伦理',
  links:[
    {n:'万方数据科研诚信培训系统', u:'https://cx.wanfangdata.com.cn/e-training'}
  ],
  key:[
    '必记文件：行业标准 CY/T 174—2019《学术出版规范 期刊学术不端行为界定》、教育部《高等学校预防与处理学术不端行为办法》、科技部监督司《负责任研究行为规范指引（2023）》',
    '《负责任研究行为规范指引（2023）》里生成式人工智能内容的引用规则要重点看',
    '⚠️ 一稿多投的界定（官方样题答案 BC）：主要数据和图表相同的两篇论文分别投不同期刊；同一篇论文同时投多家期刊',
    '不算一稿多投：同一种期刊国际版本再次发表；会议论文充实 50% 以上数据后再投稿并引用说明'
  ],
  todo:'把 CY/T 174—2019 下载到本地，比赛时可直接翻'
},
{
  id:44, cat:'write', name:'参考文献著录格式',
  links:[
    {n:'CNKI', u:'https://www.cnki.net'},
    {n:'万方', u:'https://www.wanfangdata.com.cn'},
    {n:'维普', u:'https://www.cqvip.com'}
  ],
  key:[
    'GB/T 7714-2025 类型标识必背：M 图书、J 期刊、D 学位论文、C 会议录、S 标准、P 专利、N 报纸、R 报告、EB 网站/网页、DS 数据集、PP 预印本',
    '正确范式：作者. 题名[文献类型标识]. 刊名, 年(期): 起止页码.（刊名不加书名号，题名后紧接[J]）',
    '还要了解 APA、MLA 格式，并能从 CNKI/万方/维普按指定格式导出题录'
  ],
  todo:'在 CNKI 里对期刊论文、学位论文、会议论文、标准、专利各导出一条 GB/T 7714-2025 题录'
},
{
  id:45, cat:'write', name:'论文排版',
  links:[],
  key:[
    '必会 WORD/WPS 功能：脚注尾注、分节、页码页眉页脚、自动生成目录、标题样式、文件批量合并',
    '⚠️ 自动生成目录前必须先设置标题样式（判断题答案：正确）',
    '替换里的特殊符号：^p = 段落标记，^m = 分页符/分栏符；把 ^p^p 换成 ^p = 删除空行',
    '替换还能批量设置字体颜色、批量套用样式（配合「使用通配符」）'
  ],
  todo:'练一遍：^p^p → ^p；把「正确答案」替换成「^m 正确答案」看效果'
},
{
  id:46, cat:'res', name:'文献管理工具',
  links:[
    {n:'Mendeley', u:'https://www.mendeley.com'},
    {n:'Zotero', u:'https://www.zotero.org'},
    {n:'知网研学 E-study', u:'https://x.cnki.net/web/search/#/down'},
    {n:'EndNote（不命题）', u:'https://endnote.com'},
    {n:'NoteExpress（不命题）', u:'http://www.inoteexpress.com'}
  ],
  key:[
    '命题范围只有三个：Mendeley、Zotero、知网研学 E-study；EndNote 和 NoteExpress 不命题',
    'Mendeley 网页版和客户端都可以根据 DOI 搜索添加文献（判断题答案：正确）',
    '知网研学桌面端添加文献方式全选：内置数据库 / DOI / 学术搜索网站检索 / 导入第三方题录或本地上传'
  ],
  todo:'装上 Zotero 或 Mendeley，用 DOI 添加一篇文献'
},
{
  id:47, cat:'res', name:'文献追踪工具',
  links:[
    {n:'CNKI 期刊导航（找 RSS）', u:'https://navi.cnki.net'},
    {n:'CNKI', u:'https://www.cnki.net'},
    {n:'PubMed（Create RSS / Create alert）', u:'https://pubmed.ncbi.nlm.nih.gov'},
    {n:'万方（学习中心 → 我的订阅）', u:'https://www.wanfangdata.com.cn'}
  ],
  key:[
    '三种追踪方式：邮箱订阅、主题订阅、RSS',
    'CNKI：检索结果页点「主题定制」追踪主题，在「我的 CNKI」查看；期刊详情页点 RSS 订阅看地址',
    'CNKI 期刊 RSS 地址格式：https://navi.cnki.net/knavi/RSS/xxxx（如《马克思主义研究》= STUD）',
    '万方：登录后右上角「学习中心」→「我的订阅」（期刊订阅、关键词订阅、RSS 订阅）'
  ],
  todo:'在 CNKI 期刊导航找一个期刊，复制它的 RSS 地址'
},
{
  id:48, cat:'res', name:'数据处理工具',
  links:[
    {n:'百度 AI Studio（数据集）', u:'https://aistudio.baidu.com'},
    {n:'阿里云天池（数据集）', u:'https://tianchi.aliyun.com'},
    {n:'OpenDataLab', u:'https://opendatalab.com'},
    {n:'OpenML', u:'https://www.openml.org'},
    {n:'UCI（Classic）', u:'https://archive.ics.uci.edu'},
    {n:'UCI（Beta）', u:'https://archive-beta.ics.uci.edu'}
  ],
  key:[
    '必背函数：LEFT、RIGHT、MID、FIND、TRIM、REPLACE、SUBSTITUTE、CONCAT、&、CLEAN、VLOOKUP、COUNTIF、COUNTIFS、SUMIF、SUMIFS、IF、INDEX、MATCH',
    '⚠️ 提取身份证出生日期用 MID：=MID(A1,7,8)（官方样题答案 C）',
    'LEFT 取左边 n 位，RIGHT 取右边 n 位，TRIM 去空格，CLEAN 去不可见字符',
    'VLOOKUP 竖向查找；INDEX + MATCH 组合更灵活'
  ],
  todo:'下载一个 CSV 数据集，用 COUNTIFS / VLOOKUP 各做一次统计'
},
{
  id:49, cat:'res', name:'数据可视化工具',
  links:[
    {n:'Apache ECharts', u:'https://echarts.apache.org/zh/index.html'},
    {n:'微词云', u:'https://www.weiciyun.com'},
    {n:'豆包（数据分析）', u:'https://www.doubao.com'}
  ],
  key:[
    '⚠️ 微词云非会员每日只能免费使用三次词频统计 —— 考试当天务必省着用！',
    'ECharts 要能在官网上找到图表类型、看到代码和效果',
    '会用 AI 工具结合 ECharts 生成带 JS 代码的 HTML 网页',
    '要能判断「图表类型与数据类型是否匹配」'
  ],
  todo:'在 ECharts 官网找三种图表，各看一遍示例代码'
},
{
  id:50, cat:'res', name:'文献可视化工具',
  links:[
    {n:'赛特新思 Citexs（重点）', u:'https://www.citexs.com/Paperpicky'},
    {n:'CNKI AI', u:'https://ai.cnki.net'},
    {n:'CNKI', u:'https://www.cnki.net'},
    {n:'万方', u:'https://www.wanfangdata.com.cn'},
    {n:'维普', u:'https://www.cqvip.com'},
    {n:'CiteSpace', u:'https://citespace.podia.com'},
    {n:'VOSviewer', u:'https://www.vosviewer.com'}
  ],
  key:[
    'CiteSpace、VOSViewer 只需知道是干什么的；赛特新思 Citexs 的文献调研分析要熟练掌握',
    '⚠️ CNKI 是三个中文库里唯一有「第一单位」检索点的（官方样题考点）',
    'CNKI 可视化分析路线：高级检索 → 检索结果 → 导出与分析 → 可视化分析 → 全部检索结果分析 → 中国作者分布'
  ],
  todo:'在 CNKI 用「第一单位」检索某高校，做一次可视化分析看作者分布'
}
];

/* 纯记忆考点卡（不需要联网操作也能拿分） */
const FACTS = [
  { t:'分值结构', q:'校内选拔赛的题型与分值？', a:'单选 20 题 × 2 分 = 40 分；多选 20 题 × 2.5 分 = 50 分；判断 10 题 × 1 分 = 10 分。共 50 题 100 分。' },
  { t:'多选铁律', q:'多选题的扣分规则是什么？', a:'4 个选项、2—4 个正确答案；错选、多选、少选、不选均不得分。也就是必须全对才得分，宁缺毋滥在这里不成立。' },
  { t:'GB/T 7714', q:'GB/T 7714-2025 的文献类型标识有哪些？', a:'M 图书、J 期刊、D 学位论文、C 会议录、S 标准、P 专利、N 报纸、R 报告、EB 网站/网页、DS 数据集、PP 预印本。' },
  { t:'GB/T 7714', q:'一条符合国标的期刊论文著录长什么样？', a:'朱晓灿.新时代科普类图书出版趋势探析[J].传播与版权,2021(9):29-31+41. —— 刊名不加书名号，题名后紧跟 [J]。' },
  { t:'CNKI 字段', q:'CNKI 学术期刊的检索字段里，下面哪个不是？', a:'「题名」不是。CNKI 用的是「篇名」。可选项包括：关键词、篇名、作者单位、期刊名称等。' },
  { t:'CNKI 字段', q:'哪个中文库独有「第一单位」检索点？', a:'只有 CNKI 有「第一单位」（第一作者单位）。万方、维普没有。' },
  { t:'精确与模糊', q:'CNKI 里「精确」在篇名字段和第一作者字段的含义一样吗？', a:'不一样。「篇名」：精确 = 不拆分，模糊 = 可拆分。「第一作者」：精确 = 完全一致，模糊 = 包含。' },
  { t:'精确匹配', q:'外文数据库怎么做精确匹配？', a:'用半角双引号把检索词包起来，系统把它当词组/短语处理，不拆分。' },
  { t:'截词符', q:'截词检索里 * 和 ? 分别代表什么？', a:'大多数系统：* = 任意多个字符，? = 一个字符。ACM 里同理 —— analys?e 才能同时匹配 analyse 和 analyze。' },
  { t:'截词符', q:'中国专利公布公告系统用什么符号扩展检索词？', a:'用问号 ? 和百分号 %。例如在申请人字段输入「中国%大学」。严格说不算截词检索，但作用类似。' },
  { t:'布尔逻辑', q:'布尔逻辑三种关系的作用？', a:'AND/与 = 同时满足，缩小结果；OR/或 = 满足其一，扩大结果；NOT/非 = 排除，缩小结果。' },
  { t:'检索语法', q:'搜索引擎必背的检索语法有哪些？', a:'filetype: 限定文件类型；site: 限定网站；inurl: 限定 URL；intitle: 限定标题。' },
  { t:'百度高级搜索', q:'百度高级搜索的「关键词位置」可选哪些？', a:'网页任何地方、仅网页标题中、仅URL中。没有「仅网页图片中」。' },
  { t:'结果筛选', q:'Wiley 的检索结果筛选区有哪些字段？', a:'Publication Type、Publication Date、Subjects 等；没有 title。' },
  { t:'影响因子', q:'影响因子怎么算？', a:'某刊前两年发表的论文在统计当年的总被引次数 ÷ 该刊前两年发表的论文总数。' },
  { t:'H 指数', q:'H 指数是什么？', a:'某作者有 h 篇论文，每篇至少被引 h 次，h 就是其 H 指数。它同时衡量论文数量与影响力。' },
  { t:'核心期刊', q:'常见收录体系缩写怎么认？', a:'CSSCI 中文社会科学引文索引（南大核心）、北大核心（中文核心期刊要目总览）、CSCD 中国科学引文数据库、AMI 中国人文社会科学期刊综合评价指标体系、SCI / SSCI。' },
  { t:'一稿多投', q:'哪些行为算「一稿多投」？', a:'算：主要数据和图表相同的两篇论文分别投不同期刊；同一篇论文同时投多家期刊。不算：在同一种期刊的国际版本再次发表；会议论文充实 50% 以上数据后再投稿并引用说明。' },
  { t:'学术伦理', q:'学术不端相关必记文件有哪些？', a:'CY/T 174—2019《学术出版规范 期刊学术不端行为界定》、教育部《高等学校预防与处理学术不端行为办法》、科技部监督司《负责任研究行为规范指引（2023）》。' },
  { t:'AI 法规', q:'AI 相关的法规文件清单（模块01）？', a:'9 类：网信办7部委《生成式人工智能服务管理暂行办法》、全国网安标委《生成式人工智能服务安全基本要求》、网信办5部门《人工智能拟人化互动服务管理暂行办法》、《四川大学本科教育教学人工智能工具应用规范（试行）》、中科院《关于在科研活动中规范使用人工智能技术的诚信提醒》、《上海交通大学关于在教育教学中使用AI的规范》、《学术出版中AIGC使用边界指南3.0》、UNESCO 四份文件、欧盟《人工智能法》（全文中译本）。' },
  { t:'LeapSpace', q:'LeapSpace 的四个核心功能分别干什么？', a:'Trust Card（可信度卡）、Claim Radar（展示已有文献与某陈述的关联及匹配程度：支持/中立/相悖）、Deep Research（深度研究）、Writing Coach（写作指导）。' },
  { t:'CNKI AI', q:'CNKI AI 的「观点网络全景分析」在哪个模块下？', a:'在「知识问答 - Deep Research 模式」下，生成的回答支持观点网络全景分析，梳理契合、互补、多元三大观点集合。' },
  { t:'星火科研', q:'星火科研助手「学术写作」栏目有哪些功能？', a:'学术翻译、英文润色、全文审校。注意没有「中文润色」。' },
  { t:'豆包', q:'豆包音乐生成的风格选项、PPT 生成的风格选项？', a:'音乐风格：DJ、民谣、朋克（没有戏曲）。PPT 生成风格：学术风、简约风、创意风（没有喜庆风）。9.10 修订：入口已改为「PPT 生成」，还能选「篇幅」；不再叫「AI PPT」。' },
  { t:'腾讯元宝', q:'腾讯元宝首页可选哪些大模型？', a:'DeepSeek、Hunyuan。' },
  { t:'思维导图', q:'哪些工具带思维导图功能？', a:'腾讯文档、WPS、有道云笔记都有；问卷星没有。' },
  { t:'QQ 截图', q:'QQ 截图工具条上的图钉图标是什么功能？', a:'贴图。可以把多张图贴到桌面上，双击销毁。' },
  { t:'雨课堂', q:'雨课堂是什么、能干什么？', a:'PPT 插件，免费安装，支持弹幕，支持单选/多选/填空/主观题等多种题型，有分组功能。' },
  { t:'云展网', q:'云展网提供哪些 PDF 功能？', a:'PDF 转 Word、PDF 合并、PDF 拆分、PDF 压缩、PDF 加密、PDF 添加页面、PDF 文件转换。' },
  { t:'以图识图', q:'哪些图片检索系统支持以图识图？', a:'百度图片、搜狗图片、360 图片、CNKI 学术图片库 —— 四个都支持。' },
  { t:'微词云', q:'微词云有什么使用限制？', a:'非会员每日只能免费使用三次词频统计。官方明确提醒考试当天谨慎使用。' },
  { t:'文献管理', q:'命题范围内的文献管理工具有哪些？', a:'Mendeley、Zotero、知网研学 E-study。EndNote 和 NoteExpress 不作命题。' },
  { t:'文献追踪', q:'文献追踪的三种方式？', a:'邮箱订阅、主题订阅、RSS。CNKI 期刊 RSS 地址格式：https://navi.cnki.net/knavi/RSS/xxxx' },
  { t:'Excel 函数', q:'常用的 Excel 数据处理函数有哪些？', a:'LEFT、RIGHT、MID、FIND、TRIM、REPLACE、SUBSTITUTE、CONCAT、&、CLEAN、VLOOKUP、COUNTIF、COUNTIFS、SUMIF、SUMIFS、IF、INDEX、MATCH。' },
  { t:'Excel 函数', q:'提取身份证号里的出生日期用哪个函数？', a:'MID。若身份证在 A1，则 =MID(A1,7,8)，从第 7 位开始取 8 位。' },
  { t:'OPAC', q:'馆藏查询系统的英文名叫什么？', a:'OPAC（Online Public Access Catalog，联机公共目录检索系统）。中文可能叫馆藏查询、馆藏目录、书目查询、馆藏书目。' },
  { t:'arXiv', q:'arXiv 里怎么按编号精确定位文献？', a:'在页面右上角搜索区选择检索点「arXiv identifier」，输入编号即可。' },
  { t:'CNS', q:'CNS 三大刊指什么？官网能查过刊吗？', a:'Nature、Cell、Science。三家官网既能检索现刊，也能检索过刊。' },
  { t:'标准查询', q:'哪三类国标在「国家标准全文公开系统」里查不到？', a:'食品安全、生态环境、工程建设。分别要去卫健委/食品评估中心、生态环境部、住建部网站查。' },
  { t:'可视化', q:'文献可视化工具要掌握到什么程度？', a:'CiteSpace、VOSViewer 知道是做知识图谱的即可；赛特新思 Citexs 的文献调研分析要熟练掌握；CNKI/万方/维普的可视化分析要实机用过。' }
];

/* 官方样题（全部摘自原文件，含答案解析） */
const QUESTIONS = [
  { m:1, type:'single', q:'在联合国教科文组织的官网上可以找到2024年发布的英文版《学生人工智能能力框架》（AI competency framework for students），这个文件正文第29页有一个表格，这个表格的标题是（ ）。', o:['Competency blocks for level 1: Understand','Human-centred mindset','Ethics of AI','AI techniques and applications'], a:[0], e:'在 UNESCO 官网找到该文件，翻到正文第29页查看。文件地址：https://unesdoc.unesco.org/ark:/48223/pf0000391105' },
  { m:2, type:'multi', q:'深圳大学图书馆网站中有一个生成式人工智能专题网页。这个专题网页中的内容包括（ ）。', o:['生成式AI简介','最新AI政策','Gen AI工具导航','AI数据库'], a:[0,1,2], e:'找到该专题页即可判断。网址：https://www.lib.szu.edu.cn/learning/ai' },
  { m:3, type:'multi', q:'在AI工具腾讯元宝（网页版）首页可以选择AI大模型，其中包括（ ）。', o:['DeepSeek','Hunyuan','Qwen','文心'], a:[0,1], e:'进入腾讯元宝官网首页，在对话框中选择即可看到。' },
  { m:4, type:'multi', q:'使用豆包的PPT生成功能可以快速生成PPT（登录豆包后），在生成时可以选择篇幅和风格，其中可选的风格包括（ ）。', o:['学术风','简约风','喜庆风','创意风'], a:[0,1,3], e:'9.10 修订版样题。在浏览器中进入豆包官网并登录，在对话框下方选择「PPT 生成」，可以看到篇幅和风格，点击风格即可看到可供选择的风格模板。' },
  { m:5, type:'multi', q:'星火科研助手中有一个学术写作的栏目，这个栏目下的具体功能包括（ ）。', o:['学术翻译','英文润色','中文润色','全文审校'], a:[0,1,3], e:'注册登录 https://paper.iflytek.com ，进入「学术写作」栏目即可看到。' },
  { m:5, type:'single', q:'在爱思唯尔的科研级AI平台LeapSpace中，哪项功能能够帮助学者高效、便捷地识别AI所生成的陈述观点与现有文献之间的关联及其匹配程度？（ ）', o:['实验对比','深度研究','Claim Radar','私有文档上传'], a:[2], e:'Claim Radar 可直观展示已有文献中与某陈述的关联及匹配程度：哪些支持、哪些中立、哪些相悖。' },
  { m:5, type:'single', q:'CNKI AI有一个观点网络全景分析功能，具体是在哪个模块下？（ ）', o:['知识问答-Deep Research模式','学术趋势分析','智能研读-专题简报','智能研读－知识卡片'], a:[0], e:'在知识问答页面开启 Deep Research 模式，生成的回答内容支持观点网络全景分析。' },
  { m:6, type:'multi', q:'使用AI工具豆包可以生成音乐，入口在官网首页对话框下方。系统会给出提示词模板，其中可以选择音乐风格，其中包括（ ）。', o:['DJ','民谣','戏曲','朋克'], a:[0,1,3], e:'访问 https://www.doubao.com，点对话框下方「音乐生成」，打开提示词模板中的音乐风格下拉菜单。' },
  { m:7, type:'multi', q:'在GitHub中有一个名为"ONNX"的项目，进入该项目的 LICENSES/Apache-2.0.txt 文件页面，该文件的Last commit message是什么？Last commit date是多久？', o:['update license to Apache License v2.0 (#3159)','Introduce Reuse Infra (#5028)','3 years ago','5 years ago'], a:[1,2], e:'在 https://github.com/onnx/onnx/tree/main/LICENSES 页面可查看。' },
  { m:8, type:'judge', q:'在"习近平系列重要讲话数据库"中可以查到习近平总书记在二十国集团领导人第十五次峰会第一阶段会议上的讲话，其中提到了"数字货币"，这是习近平总书记在正式发言或署名文章中第一次提到数字货币。', o:['正确','错误'], a:[1], e:'以全文为检索点检索「数字货币」，可发现 2020 年 10 月 31 日《求是》发表的《国家中长期经济社会发展战略若干重大问题》署名文章中已提到，故表述错误。' },
  { m:9, type:'single', q:'在国家统计局官网的数据查询系统中查找我国普通本专科生毕业人数。请问：2018年我国普通本专科毕业生人数是多少万？（ ）', o:['801.2213','797.1991','758.5298','753.3087'], a:[3], e:'登录国家统计局网站 → 统计数据 → 数据查询，输入关键词，点「相关报表」，右上角选「最近10年」。' },
  { m:9, type:'single', q:'根据AI知数分析数据，2025年，我国哪个省份城镇居民人均可支配收入最高？（ ）', o:['北京','上海','浙江','天津'], a:[1], e:'通过 AI 知数搜索「2025年全国各省城镇居民人均可支配收入」，在结果页点击数据运算的按列计算最大值。' },
  { m:10, type:'single', q:'星河互联集团有限公司被列为失信被执行人，请问立案时间为2018年10月31日的法律判决需偿还申请执行人多少金额？（ ）', o:['87065','92245','88910','83640'], a:[1], e:'中国执行信息公开网搜索该公司，找到对应日期案号（2018）京0108执17244号，点开详情。' },
  { m:10, type:'multi', q:'在中国法律知识资源总库中查找案例有哪些入口？', o:['案例库','业务助手','类案推送','一框式检索'], a:[0,1,2,3], e:'登录后可见「案例」「业务助手」「一框式检索」入口；点进案例库还可点「类案推送」。' },
  { m:11, type:'single', q:'2020年5月6日，国家标准《儿童口罩技术规范》（GB/T 38880-2020）发布并实施。以下所列哪一位不是该标准的起草人？（ ）', o:['高尚荣','李桂梅','许伟民','李建全'], a:[2], e:'国家标准全文公开系统里用标准号查到全文，第2页「本标准主要起草人」中查询即得。' },
  { m:12, type:'single', q:'小米公司持有一项名为"一种用于耳机插头的连接部件、耳机插孔及终端"的发明专利。在文献的说明书部分，该专利的技术领域为（ ），附图共有（ ）页。', o:['电子工程，3','物联网，4','电子技术，5','制造技术，6'], a:[2], e:'在国家知识产权局专利库中查找专利原文，阅读文献即可查到技术领域和附图。' },
  { m:13, type:'multi', q:'在中国互联网联合辟谣平台官网有一个"辟谣信息查证"的栏目，提供搜索和筛选功能。筛选中的"按分类分"，系统提供的筛选项包括以下哪些？（ ）', o:['科学常识','时事政治','公共政策','公共安全'], a:[0,1,2,3], e:'进入 https://www.piyao.org.cn/pysjk/frontsql.htm 查询即可。' },
  { m:14, type:'judge', q:'某一款注册证编号为"辽械注准20202140101"的医疗器械，它的产品名称是一次性手术隔离服。', o:['正确','错误'], a:[1], e:'通过国家药监局官网 → 医疗器械 → 医疗器械查询 → 高级检索 → 注册证查询，输入关键词查看结果。' },
  { m:14, type:'single', q:'CHKD AI有一个功能可用于结构化临床问题，帮助医生精准定位证据、提升决策科学性，请问是哪一个？', o:['机制研究','PICO分析','疾病鉴别','基因分析'], a:[1], e:'在知识问答功能界面，【知识扩展】下的【PICO 分析】可用于结构化临床问题。' },
  { m:15, type:'single', q:'通过研招网查询可知，招天体物理专业硕士研究生并且接受退役大学生士兵专项计划考试报考的"双一流"建设高校是（ ）。', o:['北京大学','中国科学院大学','天津师范大学','云南大学'], a:[1], e:'研招网硕士专业目录输入专业名称「天体物理」，专项计划筛选选「是」，点「开设院校」，勾选「双一流」。' },
  { m:16, type:'single', q:'请在学信网上查询这个毕业证书信息（证书编号：106101201301000019，姓名：周建芳）。请问这个毕业证书上载明的专业是什么？（ ）', o:['图书馆学','情报学','宏观经济学','信息管理学'], a:[2], e:'学信网 → 学历查询 → 零散查询，输入证号和姓名查询。' },
  { m:17, type:'single', q:'在中国大学MOOC中有一门四川大学王红老师主讲的课程《中国诗歌艺术》，其中第2.2节讲述的内容是（ ）。', o:['诗之声：选音与读音','诗的语词及构句特点','不循常规的语序','诗的节奏与韵律'], a:[2], e:'在中国大学MOOC找到这门课，在课程大纲中找到这一节。' },
  { m:18, type:'single', q:'在高校信息素养教育数据库中可以找到第三期四川师范大学王一老师主讲的《数字数据可视化——快速搞定炫酷图表》，请问这个在线视频讲座的时长与下列哪个选项最接近？（ ）', o:['45分35秒','55分55秒','60分09秒','65分43秒'], a:[1], e:'官网 →「直播讲座」栏目（不在校园网选「不登录」）→「公益大讲堂」→ 找到课程播放，看进度条。' },
  { m:19, type:'single', q:'在剑桥数据库中找到名为《Big Data and Global Trade Law》的电子书。请问这本电子书的正文第50页（pdf文档第82页）有几张图？（ ）', o:['0','1','2','3'], a:[2], e:'进入 Cambridge Core 检索书名 → 进入图书题录页 → 点 Open full book PDF 打开全文 → 查看对应页码。' },
  { m:20, type:'judge', q:'在国家图书馆旗下的民国时期文献库中可以找到图书《代数难题详解》（俞树德编）并查看全文，"二 简易方程式"这一节在正文的第10页。', o:['正确','错误'], a:[0], e:'进入国家图书馆网站 → 数字资源 →「民国时期文献」→ 搜索书名 → 在线阅览。' },
  { m:21, type:'single', q:'在Taylor&Francis数据库中找到名为《Labour market mismatch among master\'s graduates in the humanities from 1995 to 2015 in Norway》的论文。请问这篇论文PDF全文的页数与下列哪个数字最接近？（ ）', o:['5','12','20','37'], a:[2], e:'在官网首页直接搜索，找到后点击 PDF 图标即可打开全文。' },
  { m:22, type:'single', q:'2026 IEEE IAS Petroleum and Chemical Industry Committee Technical Conference（PCIC）将于2026年9月在美国费城召开。这次会议的论文提交截止时间是（ ）。', o:['2025年8月1日','2025年11月20日','2025年10月20日','2025年11月30日'], a:[0], e:'通过搜索引擎找到 IEEE 官网，在会议菜单中选择 Upcoming conferences，搜索后查看详情。' },
  { m:23, type:'single', q:'请问下列哪篇学位论文的指导老师不是西南交通大学的何川老师。（ ）', o:['高地应力层状软岩隧道围岩变形机理与支护结构体系力学行为研究','高海拔寒区特长公路隧道冻胀特性及防冻研究','施工期盾构隧道管片结构受力特性及裂损现象分析','薄层破碎硬质岩隧道（群）施工方法及支护方式研究'], a:[3], e:'进入 CNKI 学位论文数据库，找到这几篇论文，点开详情看导师。' },
  { m:24, type:'single', q:'请在arXiv中找到arXiv identifier为"2108.09800"的文献并打开全文。请问这篇PDF全文共有（ ）页。', o:['9','14','18','23'], a:[2], e:'进入 https://arxiv.org，右上角搜索区选择检索点「arXiv identifier」，输入编号，点右侧 View PDF。' },
  { m:25, type:'judge', q:'题为"西南地区族际通婚促进民族文化交融机制研究"的2020年国家社科立项项目，负责人是重庆大学的王瑞静。', o:['正确','错误'], a:[0], e:'登录国家社科基金项目数据库，在「项目名称」下输入题名搜索，点击右箭头展开更多字段查看单位。' },
  { m:26, type:'single', q:'在pubscholar中可以找到《Long-term pulse pressure trajectories and risk of incident atrial fibrillation: the Tromsø Study》这篇文献，请问系统给出的全文获取渠道是下面的哪一个？（ ）', o:['OXFORD ACADEMIC','science','arXiv','PubMed'], a:[0], e:'在 pubscholar 中找到这篇文献，点开来源，即可跳转到 OXFORD ACADEMIC。' },
  { m:27, type:'multi', q:'下列检索系统，可以以图识图的有（ ）。', o:['百度的图片搜索','搜狗的图片搜索','360的图片搜索','CNKI学术图片库'], a:[0,1,2,3], e:'登录各网站探索一下，即可发现哪些支持以图识图。四个都支持。' },
  { m:28, type:'multi', q:'在中国古典文献资源导航系统的"古籍全文"栏目下，可以找到下列哪些网站？（ ）', o:['安徽基本古籍库','登楼古籍检索','湖南省古籍智慧化平台','尚古汇典'], a:[0,1,2,3], e:'登录中国古典文献资源导航系统，进入「古籍全文」栏目即可看到。' },
  { m:29, type:'single', q:'根据百度搜索数据，2021年，网民对火锅的关注量最多的省份是？（ ）', o:['四川','河南','江苏','广东'], a:[3], e:'百度指数搜索「火锅」→ 人群画像 → 限定时间 2021.1.1 至 2021.12.31 → 通过地域分布分析各省份搜索指数。' },
  { m:30, type:'multi', q:'下列哪些图书馆有贡德·弗兰克所著的《白银资本》这本书？（ ）（提醒：中英文、各版本都要考虑）', o:['重庆大学图书馆','山东省图书馆','麻省理工学院图书馆','兰州大学图书馆'], a:[0,1,2,3], e:'找到各图书馆馆藏书目查询入口，检索字段选「标题」，输入「白银资本」或「ReORIENT: Global Economy in the Asian Age」，验证作者。' },
  { m:31, type:'single', q:'在CNKI或者万方数据知识服务平台中检索2015到2021年间发表的篇名中含有"信息素养"的期刊论文，其中被引次数最高的CSSCI论文是发表在哪个期刊上的？（ ）', o:['情报科学','大学图书馆学报','图书情报知识','图书馆学研究'], a:[2], e:'CNKI 学术期刊库高级检索：篇名含「信息素养」，出版年度 2015-2021，来源类别 CSSCI，按被引排序。' },
  { m:32, type:'single', q:'在万方中查找2025年以前发表的，篇名中出现"乙肝"或"乙型肝炎"，关键词中出现"治疗"和"评估"，摘要中出现"慢性"但不能出现"模型"的学位论文。找到的结果数量与下列哪个数字最接近？（ ）', o:['1','6','24','47'], a:[1], e:'万方高级检索：文献类型选学位论文，题目输入「乙肝 OR 乙型肝炎」，关键词输入「治疗 AND 评估」，摘要输入「慢性 NOT 模型」。' },
  { m:33, type:'single', q:'在有些外文数据库中，可以"analy( )e"匹配"analyse"（英式）和"analyze"（美式）。在ACM数据库中，搜索范围限定在 The ACM Full-Text collection，检索标题中包含这个单词，摘要中包含一个以"comput"开头的单词，时间限定在2020—2023年之间。括号中应填的字母是？找到的结果数量与哪个最接近？（ ）', o:['*, 1325','？, 1325','*, 3412','？, 3412'], a:[1], e:'ACM 中星号代表一个或多个字母，问号代表一个字母，所以填问号；按条件设置后结果约 1327 条。' },
  { m:34, type:'multi', q:'在CNKI的高级检索中，文献类型选择"学术期刊"，"篇名"和"作者"检索字段进行设置，其他条件默认。下列哪些论文可能出现在检索结果中？（ ）', o:['张建. 住宅楼项目全过程造价控制方法的研究[J]. 居舍, 2023(35): 169-172.','张建红. 控制接触网施工误差的方法探讨[J]. 科技与企业, 2012(23): 188.','张建彬. 水泥混凝土路面施工质量控制方法[J]. 交通世界, 2017(15): 76-77.','张建. PID控制参数优化方法及基于MATLAB的仿真[J]. 信息通信, 2013(02): 40.'], a:[0,3], e:'CNKI 中「篇名」字段精确 = 不拆分、模糊 = 可拆分；「第一作者」字段精确 = 完全一致、模糊 = 包含。' },
  { m:35, type:'single', q:'在Wiley数据库首页的检索框中输入检索词"AIGC"，回车后的检索结果中可以选择的筛选字段不包括（ ）。', o:['Publication Type','Publication Date','Subjects','title'], a:[3], e:'按条件检索，查看检索结果左侧的筛选区即可。' },
  { m:36, type:'single', q:'在CNKI期刊全文数据库中（或高级检索中文献类型选择"学术期刊"），可选的检索字段不包括（ ）。', o:['关键词','题名','作者单位','期刊名称'], a:[1], e:'进入系统打开核对即可。CNKI 用的是「篇名」而不是「题名」。' },
  { m:37, type:'multi', q:'在百度的高级检索界面中有一个"关键词位置"的限定，其中可以选择（ ）。', o:['网页任何地方','仅网页标题中','仅URL中','仅网页图片中'], a:[0,1,2], e:'百度页面右上角点「设置」→「高级检索」，仔细看「关键词位置」选项。' },
  { m:38, type:'multi', q:'下列哪些工具具有思维导图功能？（ ）', o:['腾讯文档','WPS','有道云笔记','问卷星'], a:[0,1,2], e:'腾讯文档和 WPS 提供思维导图，有道云笔记提供脑图；问卷星用于问卷调查，不属于思维导图工具。' },
  { m:39, type:'judge', q:'雨课堂是一个PPT插件，可以免费安装使用，可以弹幕，支持单选、多选、填空、主观题等多种题型，有分组功能。', o:['正确','错误'], a:[0], e:'装上插件深度使用即可知道。' },
  { m:40, type:'single', q:'用QQ的截图功能，框选截图区域后，系统会弹出一个工具条，工具条中有一个图钉状图标。请问这个图钉状图标的功能是什么？（ ）', o:['打马赛克','添加文字','把图片贴在桌面上','识别截图区域的文字'], a:[2], e:'图钉状图标功能是贴图，可以贴多张图片到桌面上，双击即可销毁。' },
  { m:41, type:'multi', q:'在云展网PDF在线工具页面中，下列哪些属于该平台提供的PDF相关功能？（ ）', o:['PDF转Word','PDF合并','PDF拆分','PDF压缩'], a:[0,1,2,3], e:'进入 https://www.yunzhan365.com/tools/pdf-to-word 即可看到这些功能。' },
  { m:42, type:'single', q:'【外部模拟题】CNKI写作投稿服务平台选题分析功能可从多个维度分析选题可行性，以下哪项不属于其分析维度？', o:['热度分析','期刊影响因子','收录分析','学科渗透'], a:[1], e:'官方使用指南原文：选题分析中的「基于主题词的选题数据分析」——只需输入选题关键词，系统就从「学术热度趋势、学科间渗透情况、期刊收录情况」三方面进行数据分析。A/C/D 分别对应这三项。B 期刊影响因子是期刊层面的评价指标（显示在平台首页「热门期刊」卡片与期刊详情页，用于选刊判断），不属于选题分析维度。注意区分：平台上有这个数据 ≠ 它是选题分析的维度。', path:'登录 CNKI 写作投稿服务平台（https://xztg.cnki.net，或中国知网首页 → 写作投稿）→ 进入「选题分析」→ 选「基于主题词的选题数据分析」→ 输入选题关键词 → 结果页按「学术热度趋势 / 学科间渗透情况 / 期刊收录情况」三个维度呈现。再回平台首页看「热门期刊」卡片（显示影响因子、WJCI分区、出版周期、总下载/总被引频次），即可确认影响因子属期刊评价指标、属选刊环节，而非选题分析维度。' },
  { m:42, type:'multi', q:'刊发学术论文《基于认捐模式的图书馆受赠研究》的期刊属于（ ）期刊。', o:['CSSCI','SSCI','北大核心','CSCD'], a:[0,2], e:'在 CNKI（或万方、维普）中找到该论文，确定所在期刊，进入期刊主页查看收录情况。' },
  { m:43, type:'multi', q:'下列行为，属于"一稿多投"的是（ ）。', o:['论文以不同或同一种文字在同一种期刊的国际版本上再次发表','将主要数据和图表相同的两篇论文分别投稿不同期刊','将同一篇论文同时投稿多家期刊','将发表过的会议论文充实50%以上数据后再次向期刊投稿，引用上次发表的论文并向编辑部说明'], a:[1,2], e:'A 和 D 不属于一稿多投。' },
  { m:44, type:'single', q:'以下哪一种符合GB/T 7714-2025参考文献著录标准？（ ）', o:['朱晓灿.新时代科普类图书出版趋势探析.传播与版权[J],2021(9):29-31+41.','朱晓灿."新时代科普类图书出版趋势探析."传播与版权,2021(9):29-31+41.','朱晓灿.新时代科普类图书出版趋势探析[J].《传播与版权》,2021(9):29-31+41.','朱晓灿.新时代科普类图书出版趋势探析[J].传播与版权,2021(9):29-31+41.'], a:[3], e:'对照国标著录：题名后紧跟[J]，刊名不加书名号。也可从 CNKI、万方导出比对。' },
  { m:45, type:'judge', q:'用word进行论文排版，自动生成目录前要先设置标题样式。', o:['正确','错误'], a:[0], e:'找段文字试着做一下即可明白。' },
  { m:46, type:'judge', q:'在mendeley网页版和客户端中，都可以根据DOI搜索添加文献。', o:['正确','错误'], a:[0], e:'在 Mendeley 网页版或客户端点击 add new → Add entry manually 可以看到提示。' },
  { m:46, type:'multi', q:'使用知网研学桌面端查找、下载、添加中外文文献时，可以采用下列哪些方式？（ ）', o:['通过内置的数据库添加文献','通过DOI添加文献','从常用学术搜索网站检索添加文献','导入第三方题录或本地上传'], a:[0,1,2,3], e:'知网研学桌面端支持多种添加方式，四项全选。' },
  { m:47, type:'single', q:'中文期刊《马克思主义研究》在CNKI中的RSS订阅地址是（ ）。', o:['https://navi.cnki.net/knavi/RSS/STUD','https://navi.cnki.net/knavi/RSS/RST','https://navi.cnki.net/knavi/RSS/STYU','https://navi.cnki.net/knavi/RSS/STEU'], a:[0], e:'在 CNKI 期刊导航找到该期刊详情页，页面中有 RSS 订阅图标，点击即可获取 URL。' },
  { m:48, type:'single', q:'在EXCEL中提取身份证号码中的出生年月日，最合适的函数是（ ）。', o:['left()','right()','mid()','trim()'], a:[2], e:'MID 可在指定字符串中从指定位置开始提取指定数量字符。身份证在 A1 时：=MID(A1,7,8)。' },
  { m:49, type:'judge', q:'在微词云中统计2021年总理所做的政府工作报告。可以发现，"经济"这个词出现的次数高于"发展"。', o:['正确','错误'], a:[1], e:'找到 2021 年政府工作报告全文复制，在微词云选「在线分词」粘贴后查看结果：「发展」词频高于「经济」。' },
  { m:50, type:'single', q:'请问2011年至2020年间以"四川师范大学"为第一作者单位发表CSSCI论文最多的作者是（ ）。', o:['谭光辉','汪洪亮','唐代兴','蔡方鹿'], a:[2], e:'三个中文库中只有 CNKI 有「第一单位」检索点。CNKI 高级检索：学术期刊 + 第一单位 = 四川师范大学 + 模糊 + 2011-2020 + CSSCI，检索结果选「导出与分析」→「可视化分析」→「全部检索结果分析」→「中国作者分布」。' },
  { m:19, type:'single', q:'【外部模拟题】在 NCBI 的 Bookshelf 数据库中找到名为《The Ethics of Human Enhancement: Understanding the Debate》的电子书，请问这本书的出版社是（ ）。', o:['Wiley','Oxford University Press','Elsevier','Cambridge University Press'], a:[1], e:'进入 NCBI Bookshelf（https://www.ncbi.nlm.nih.gov/books/NBK401921）查看题录页：显示「Oxford (UK): Oxford University Press; 2016 Dec.」。ISBN-13: 9780198754855。答案 B。', path:'打开 NCBI Bookshelf（https://www.ncbi.nlm.nih.gov/books）→ 在搜索框输入书名 *The Ethics of Human Enhancement: Understanding the Debate* → 进入该书题录页（NBK401921）→ 在书名/编者下方查看出版信息行「Oxford (UK): Oxford University Press; 2016 Dec.」，该行即出版社。' },
  { m:21, type:'single', q:'【外部模拟题】在 CNKI（中国知网）高级检索中，检索主题为"数字经济"与"税收"的文献，2015年-2025年，发文量最多的作者是（ ）。', o:['马海涛','李香菊','刘奇超','孙正'], a:[2], e:'CNKI 高级检索：主题 = "数字经济" AND "税收"，时间 2015-2025。根据 CNKI 作者页面与文献计量证据，刘奇超在该交叉领域发文量最高（其 CNKI 学者页显示总发文 110 篇，研究关键词包含数字经济、税收、国际税收、数字服务税等；CiteSpace 对「数字经济背景下财政税收」研究的共现分析也显示刘奇超为发表重要文章最多的作者，达 11 篇）。李香菊虽总发文量 114 篇且研究领域含「数字经济税收治理」，但 intersection 命中数次于刘奇超。答案 C。', path:'登录 CNKI（中国知网）→ 高级检索 → 主题输入 "数字经济" 并含 "税收"（主题字段 = 篇名+关键词+摘要）→ 时间范围 2015-2025 → 检索 → 结果页点「导出与分析 / 可视化分析 → 作者分布（或分组浏览：作者）」查看各作者发文量排序，刘奇超居首。作者分组统计需登录后可见；亦可打开 CNKI 学者页核对刘奇超的研究领域关键词（含数字经济、税收、数字服务税）。' }
  ,
  { m:21, type:'single', q:'【外部模拟题】在万方数据库（万方数据知识服务平台，简称：万方）中检索到的文献《电气工程中的人工智能与大数据分析应用研究》，根据国标 GB/T 7714-2025，其文献类型标识为（ ）。', o:['D','B','C','J'], a:[2], e:'正确答案 C（选项内容即字母「C」）。该文献为会议论文，GB/T 7714-2025 文献类型标识中「C」代表会议录/会议论文。注意：此题不能仅凭题名中的"应用研究"推断为期刊[J]；该题记录实际来源于万方会议库（或万方检索结果中文献类型字段显示为会议论文），因此应选 C。其他标识：M=图书、J=期刊、N=报纸、D=学位论文、R=报告、S=标准、P=专利、EB=网站网页等。教训：文献类型题必须看来源库/万方「文献类型」字段，不能只看题名相似度。', path:'① 打开 万方数据知识服务平台（https://www.wanfangdata.com.cn）→ ② 检索框输入题名《电气工程中的人工智能与大数据分析应用研究》→ ③ 在结果列表中找到该条记录 → ④ 最快判据：看浏览器地址栏的路径段，该记录为 d.wanfangdata.com.cn/conference/…，路径段 /conference/ 即「会议论文」（万方路径段对照：/periodical/=期刊、/thesis/=学位、/conference/=会议、/patent/=专利、/standard/=标准；看 URL 不需要登录）→ ⑤ 进详情页后也可在题录区核对「文献类型」字段 → ⑥ 对照 GB/T 7714-2025：会议录/会议论文 = C。' }
];

/* 9.10 修订版相对 7.13 版的变更（群通知 + 全文逐页比对得出） */
const CHANGES = [
  { m:'模块 04', t:'豆包样题整体改版', d:'入口由「AI PPT」改为「PPT 生成」，生成时新增「篇幅」选项；风格选项由 商务/简约/喜庆/复古 改为 学术风/简约风/喜庆风/创意风，答案仍为 ABD（没有喜庆风）。' },
  { m:'模块 19', t:'删除 HathiTrust', d:'HathiTrust 的全部内容删除（该网站已限制国内 IP 访问）。命题范围只剩三个：剑桥 Cambridge Core、牛津学术 Oxford Academic、NCBI Bookshelf。' },
  { m:'模块 31', t:'删除 ACM 相关内容', d:'模块31 高级检索中 ACM 全部移除（其高级检索需更高权限）。⚠️ 但模块33 截词检索的 ACM 样题仍然保留，别误删复习内容。' },
  { m:'模块 01', t:'细则微调', d:'第（9）项改为「欧盟《人工智能法》（全文中译本）」。' }
];

/* 考场高频直达 */
const HOTLINKS = [
  { n:'CNKI', u:'https://www.cnki.net' },
  { n:'CNKI AI', u:'https://ai.cnki.net' },
  { n:'万方', u:'https://www.wanfangdata.com.cn' },
  { n:'维普', u:'https://www.cqvip.com' },
  { n:'百度学术', u:'https://xueshu.baidu.com' },
  { n:'PubMed', u:'https://pubmed.ncbi.nlm.nih.gov' },
  { n:'arXiv', u:'https://arxiv.org' },
  { n:'国家统计局数据', u:'https://data.stats.gov.cn/dg/website/page.html#/pc/national/home' },
  { n:'国家法律法规数据库', u:'https://flk.npc.gov.cn' },
  { n:'专利检索及分析', u:'https://pss-system.cponline.cnipa.gov.cn/' },
  { n:'专利公布公告', u:'http://epub.cnipa.gov.cn/' },
  { n:'国家标准全文公开', u:'https://openstd.samr.gov.cn' },
  { n:'学信网', u:'https://www.chsi.com.cn' },
  { n:'IEEE 会议', u:'https://www.ieee.org/conferences/' },
  { n:'中国裁判文书网', u:'https://wenshu.court.gov.cn' },
  { n:'药监局数据查询', u:'https://www.nmpa.gov.cn/datasearch/home-index.html' },
  { n:'国家社科基金库', u:'http://fz.people.com.cn/skygb/sk/index.php/index/index/4541' },
  { n:'DOAJ', u:'https://doaj.org' },
  { n:'Cambridge Core', u:'https://www.cambridge.org/core' },
  { n:'国家图书馆', u:'http://www.nlc.cn' }
];

/* 赛前必做清单 */
const CHECKLIST = [
  { g:'账号注册（务必赛前完成）', items:[
    'CNKI / CNKI AI 账号（7月10日已开通）并完成认证',
    'LeapSpace 账号（9月1日已开通）',
    'AI 知数 账号',
    'CNKI 学术图片库 账号',
    '知网研学 E-study（可考虑装客户端）',
    '国家知识产权局「专利检索及分析」系统（免费注册）',
    '国家图书馆读者门户（注册免费）',
    '百度账号（百度指数要用）',
    '抖音账号（抖音指数要用）',
    'PubMed 账号（Create alert / RSS 要用）',
    '万方账号（我的订阅、科研诚信培训系统）',
    'Mendeley / Zotero 账号并安装'
  ]},
  { g:'收藏夹与本地资料', items:[
    '把本页「模块速查台」设为浏览器首页 / 加入书签栏',
    '把 9 大类常用平台按模块分组存入收藏夹并做明确标识',
    '下载 CY/T 174—2019《学术出版规范 期刊学术不端行为界定》到本地',
    '下载模块01的 9 份 AI 法规与规范文件全文到本地'
  ]},
  { g:'考试当天策略', items:[
    '先通读一遍题目，标记「纯记忆题」秒答，把时间留给探索性题',
    '多选题必须全对才得分，宁可多花 30 秒逐个验证选项',
    '微词云非会员每天只有 3 次免费词频统计，用之前先想清楚',
    '遇到「找某页某处细节」的题，优先用 Ctrl+F 或 PDF 页码换算',
    '外文著作检索记得同时试英文名（如《白银资本》→ ReORIENT）'
  ]}
];
