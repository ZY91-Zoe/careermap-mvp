const roleProfiles = {
  办公室主任: {
    aliases: ["办公室主任", "主任", "综合办公室主任", "党委办公室主任", "总经办主任"],
    domain: "综合管理",
    coreSkills: ["综合协调", "公文写作", "会议组织", "流程优化", "上传下达", "资源协调", "保密意识"],
    companyTypes: ["集团总部", "国企/事业单位", "制造业总部", "综合管理部门"],
    vertical: [
      ["当前", "办公室主任", [12, 22], ["综合协调", "会议与公文体系"]],
      ["进阶", "综合管理部经理 / 总经办主任", [18, 32], ["制度建设", "跨部门资源统筹"]],
      ["高级", "总经理助理 / 董事会秘书 / 幕僚长", [28, 52], ["经营支持", "高层决策辅助"]],
      ["管理/专家", "副总经理 / 总经理", [45, 90], ["组织经营", "战略落地与管理结果"]]
    ],
    verticalNote: "办公室主任的晋升不只是在行政序列里往上走，常见分支会进入总经办、董秘、幕僚长、综合管理负责人，是否能走到副总/总经理取决于行业、组织层级和是否承担经营结果。",
    adjacent: ["总经理助理", "董事会秘书", "项目经理", "行政经理", "人力资源经理"]
  },
  行政专员: {
    aliases: ["行政", "行政助理", "行政专员", "综合行政"],
    domain: "职能支持",
    coreSkills: ["流程执行", "沟通协调", "文档整理", "供应商沟通", "会议组织", "费用报销"],
    companyTypes: ["中小企业", "服务业公司", "综合职能团队"],
    vertical: [
      ["当前", "行政专员", [6, 10], ["行政流程执行", "办公资产与会议支持"]],
      ["进阶", "行政主管 / 办公室副主任", [9, 16], ["跨部门事务统筹", "供应商与预算管理"]],
      ["高级", "行政经理 / 办公室主任", [15, 28], ["制度建设", "办公室运营效率"]],
      ["管理/专家", "综合管理部负责人 / 总经办主任", [25, 45], ["组织运营", "经营支持"]]
    ],
    verticalNote: "行政岗纵向晋升通常有两条线：一条是行政/综合管理负责人，另一条是在总经办承担经营协调和高层支持，继续向总经理助理、幕僚长等岗位延伸。",
    adjacent: ["办公室主任", "人力资源专员", "项目助理", "运营专员", "采购专员"]
  },
  内容运营: {
    aliases: ["内容", "新媒体", "内容运营", "编辑", "文案"],
    domain: "业务运营",
    coreSkills: ["内容策划", "用户洞察", "数据复盘", "活动执行", "文案表达", "渠道运营"],
    companyTypes: ["互联网平台", "消费品牌", "内容社区"],
    vertical: [
      ["当前", "内容运营", [8, 14], ["选题策划", "内容发布与复盘"]],
      ["进阶", "高级内容运营", [12, 20], ["内容栏目策略", "增长型内容实验"]],
      ["高级", "内容运营经理", [18, 32], ["内容矩阵管理", "团队协作与指标负责"]],
      ["管理/专家", "内容策略负责人", [28, 48], ["品牌内容体系", "增长与商业化联动"]]
    ],
    adjacent: ["用户运营", "产品经理", "品牌策划", "增长运营", "社群运营"]
  },
  产品经理: {
    aliases: ["产品", "产品经理", "产品助理", "PM"],
    domain: "产品研发",
    coreSkills: ["需求分析", "用户研究", "原型设计", "数据分析", "项目推进", "商业判断"],
    companyTypes: ["互联网公司", "SaaS 公司", "数字化团队"],
    vertical: [
      ["当前", "产品经理", [14, 24], ["需求分析", "跨团队推动"]],
      ["进阶", "高级产品经理", [22, 36], ["复杂业务拆解", "指标负责"]],
      ["高级", "产品负责人", [35, 60], ["产品线规划", "团队协同"]],
      ["管理/专家", "产品总监", [55, 90], ["业务战略", "组织与商业结果"]]
    ],
    adjacent: ["用户研究员", "项目经理", "数据产品经理", "增长运营", "解决方案顾问"]
  },
  运营专员: {
    aliases: ["运营", "运营专员", "平台运营", "业务运营"],
    domain: "业务运营",
    coreSkills: ["活动执行", "数据复盘", "流程协同", "用户沟通", "规则配置", "问题排查"],
    companyTypes: ["互联网平台", "本地生活", "电商公司"],
    vertical: [
      ["当前", "运营专员", [7, 13], ["日常运营", "活动与数据跟进"]],
      ["进阶", "高级运营", [11, 19], ["专项运营策略", "指标拆解"]],
      ["高级", "运营经理", [17, 30], ["团队管理", "业务策略落地"]],
      ["管理/专家", "运营负责人", [28, 52], ["业务增长", "跨部门资源整合"]]
    ],
    adjacent: ["用户运营", "产品经理", "客户成功经理", "数据分析师", "增长运营"]
  },
  客服专员: {
    aliases: ["客服", "客服专员", "售后", "客户支持"],
    domain: "客户服务",
    coreSkills: ["客户沟通", "问题排查", "服务流程", "情绪管理", "工单分析", "知识库维护"],
    companyTypes: ["SaaS 公司", "电商公司", "服务型企业"],
    vertical: [
      ["当前", "客服专员", [6, 11], ["客户咨询处理", "工单闭环"]],
      ["进阶", "客服组长", [9, 16], ["服务质检", "班组管理"]],
      ["高级", "客服经理", [15, 26], ["服务流程优化", "满意度指标负责"]],
      ["管理/专家", "客户体验负责人", [25, 45], ["体验体系", "跨部门问题治理"]]
    ],
    adjacent: ["客户成功专员", "用户运营", "售前顾问", "产品运营", "培训专员"]
  },
  销售运营: {
    aliases: ["销售运营", "销售支持", "商务运营", "销售助理"],
    domain: "销售效率",
    coreSkills: ["销售流程", "数据报表", "CRM 管理", "合同协同", "跨部门沟通", "业绩分析"],
    companyTypes: ["B2B 公司", "SaaS 公司", "渠道销售团队"],
    vertical: [
      ["当前", "销售运营", [8, 15], ["销售支持", "CRM 与报表维护"]],
      ["进阶", "高级销售运营", [13, 23], ["销售流程优化", "目标拆解"]],
      ["高级", "销售运营经理", [22, 38], ["销售效率体系", "团队协同"]],
      ["管理/专家", "Revenue Operations 负责人", [35, 65], ["收入流程", "业务分析与管理驾驶舱"]]
    ],
    adjacent: ["商务分析师", "客户成功经理", "渠道运营", "解决方案顾问", "数据分析师"]
  },
  人力资源专员: {
    aliases: ["HR", "人力", "人事", "招聘", "人力资源专员"],
    domain: "组织人才",
    coreSkills: ["候选人沟通", "面试协调", "组织流程", "员工关系", "数据台账", "制度执行"],
    companyTypes: ["成长型企业", "集团职能部门", "外包服务机构"],
    vertical: [
      ["当前", "人力资源专员", [7, 13], ["招聘与员工流程", "基础人事支持"]],
      ["进阶", "HRBP/招聘主管", [12, 22], ["业务沟通", "人才策略执行"]],
      ["高级", "人力资源经理", [20, 35], ["组织诊断", "团队管理"]],
      ["管理/专家", "组织发展负责人", [32, 58], ["组织效能", "人才体系建设"]]
    ],
    adjacent: ["行政主管", "培训专员", "组织发展专员", "员工体验运营", "项目助理"]
  },
  数据分析师: {
    aliases: ["数据", "数据分析", "商业分析", "BI"],
    domain: "数据智能",
    coreSkills: ["数据分析", "SQL", "指标体系", "可视化表达", "业务理解", "实验评估"],
    companyTypes: ["互联网公司", "金融科技", "消费品牌数据团队"],
    vertical: [
      ["当前", "数据分析师", [12, 22], ["取数分析", "报表与结论输出"]],
      ["进阶", "高级数据分析师", [20, 35], ["专题分析", "指标体系建设"]],
      ["高级", "商业分析经理", [32, 55], ["业务策略建议", "分析团队管理"]],
      ["管理/专家", "数据策略负责人", [50, 85], ["经营分析体系", "数据驱动决策"]]
    ],
    adjacent: ["数据产品经理", "增长运营", "商业分析师", "产品经理", "风控策略分析师"]
  },
  市场专员: {
    aliases: ["市场", "市场专员", "品牌", "营销"],
    domain: "市场营销",
    coreSkills: ["活动策划", "渠道投放", "内容表达", "数据复盘", "供应商协同", "品牌理解"],
    companyTypes: ["消费品牌", "B2B 市场部", "线下连锁品牌"],
    vertical: [
      ["当前", "市场专员", [7, 13], ["活动执行", "渠道与物料协同"]],
      ["进阶", "高级市场专员", [12, 22], ["整合营销项目", "投放复盘"]],
      ["高级", "市场经理", [20, 36], ["市场策略", "预算与团队管理"]],
      ["管理/专家", "品牌增长负责人", [35, 65], ["品牌定位", "市场增长体系"]]
    ],
    adjacent: ["品牌策划", "内容运营", "增长运营", "用户运营", "商务拓展"]
  }
};

const roleRequirements = {
  办公室主任: ["综合协调", "公文写作", "会议组织", "流程优化", "资源协调", "保密意识"],
  总经理助理: ["综合协调", "经营分析", "公文写作", "高层沟通", "项目推进", "商业判断"],
  董事会秘书: ["公司治理", "信息披露", "公文写作", "合规意识", "高层沟通", "资本市场理解"],
  幕僚长: ["经营分析", "战略拆解", "高层沟通", "跨部门协同", "项目推进", "商业判断"],
  产品经理: ["需求分析", "用户研究", "原型设计", "数据分析", "项目推进", "商业判断"],
  用户运营: ["用户分层", "活动策划", "数据复盘", "社群运营", "生命周期运营", "沟通协调"],
  增长运营: ["数据分析", "实验设计", "渠道策略", "用户洞察", "项目推进", "转化优化"],
  品牌策划: ["品牌理解", "内容策划", "市场洞察", "创意表达", "项目管理", "效果复盘"],
  数据分析师: ["SQL", "数据分析", "指标体系", "可视化表达", "业务理解", "实验评估"],
  客户成功经理: ["客户沟通", "需求理解", "解决方案设计", "续约意识", "项目推进", "服务流程"],
  人力资源专员: ["候选人沟通", "面试协调", "组织流程", "数据台账", "制度执行", "沟通协调"],
  项目经理: ["项目计划", "风险管理", "跨部门沟通", "进度推进", "资源协调", "复盘沉淀"],
  行政主管: ["流程优化", "供应商管理", "预算管理", "跨部门协同", "制度建设", "团队管理"],
  商务分析师: ["数据分析", "销售流程", "业务理解", "报告表达", "指标体系", "沟通协调"]
};

const capabilityLibrary = {
  综合协调: ["高", "综合管理岗位需要在多个部门、多个层级之间推动事情闭环。", "学习 RACI、会议机制和跨部门推进方法", "复盘一个跨部门事项，整理目标、角色、节点、风险和结果"],
  公文写作: ["高", "办公室主任、总经办和董秘路线都非常看重正式表达与材料质量。", "系统练习通知、纪要、请示、汇报材料和领导讲话稿结构", "整理一套常用公文模板，并完成 3 份高质量样稿"],
  会议组织: ["中", "会议不是订房间，而是议题管理、决策记录和后续跟进。", "学习会议议程设计、纪要结构和待办追踪", "把一次例会改造成有议题、有结论、有责任人的闭环机制"],
  资源协调: ["高", "越往上走越需要调动资源，而不只是执行任务。", "学习资源盘点、冲突协调和利益相关方管理", "完成一个资源协调案例复盘，说明你如何处理冲突和优先级"],
  保密意识: ["中", "总经办、董秘和幕僚型岗位会接触敏感信息。", "学习公司治理、合同流转和信息分级基础", "整理一份敏感材料流转与权限管理清单"],
  经营分析: ["高", "从办公室主任走向幕僚长/总经理助理，需要能读懂经营目标和管理问题。", "学习经营指标、预算、利润表和管理驾驶舱", "完成一份月度经营分析简报"],
  高层沟通: ["高", "高层支持岗位需要把复杂问题压缩成清晰判断和可选方案。", "练习结论先行、风险提示和方案对比表达", "写一页管理层决策备忘录"],
  公司治理: ["高", "董秘路线需要理解董事会、股东会和治理流程。", "学习公司法、治理结构和三会运作基础", "整理一份董事会会议流程与材料清单"],
  信息披露: ["中", "上市公司董秘岗位需要对披露规则和合规边界敏感。", "学习信息披露规则、公告类型和常见风险", "拆解 3 份上市公司公告并总结结构"],
  合规意识: ["中", "综合管理和董秘路线都需要避免流程和信息风险。", "学习合同、印章、档案和权限管理基础", "做一份合规风险检查清单"],
  资本市场理解: ["中", "董秘路线会连接公司治理、投资者关系和资本市场沟通。", "学习上市规则、IR 和财务基础", "完成一份公司资本市场事件观察"],
  战略拆解: ["高", "幕僚型岗位要能把战略目标拆成项目、责任和节奏。", "学习 OKR、战略地图和年度经营计划", "把一个公司级目标拆成季度推进计划"],
  需求分析: ["高", "把业务目标拆成用户问题、功能边界和验收标准。", "系统学习 PRD 写作与需求优先级方法", "选择一个熟悉业务流程，输出需求文档、流程图和验收清单"],
  用户研究: ["中", "目标岗位需要从真实用户行为中提炼问题，而不是只接收需求。", "学习访谈提纲、问卷设计和用户旅程图", "完成 5 位目标用户访谈并沉淀洞察摘要"],
  原型设计: ["高", "产品/运营转型常需要用低保真原型表达方案。", "练习 Figma 或即时设计的页面流与交互说明", "做一个 6-8 页核心流程原型并配套说明"],
  数据分析: ["高", "多数目标岗位会用数据判断问题优先级和结果。", "补齐指标拆解、漏斗分析和基础 SQL", "用公开数据或历史业务数据完成一份复盘报告"],
  项目推进: ["中", "从执行岗转向目标岗，需要证明能协调多角色完成结果。", "学习项目拆解、排期、风险记录和复盘机制", "主导一次小型跨职能项目并沉淀项目复盘"],
  商业判断: ["中", "高级岗位会关注方案对收入、效率或成本的影响。", "阅读行业案例，练习商业模式与成本收益分析", "为一个功能或活动写一页商业影响评估"],
  SQL: ["高", "数据岗位和增长岗位经常需要独立取数验证假设。", "学习 SELECT、JOIN、聚合、窗口函数的实战用法", "完成 10 个业务口径查询题并整理 SQL 笔记"],
  指标体系: ["高", "目标岗位需要知道看哪些指标，以及指标变化意味着什么。", "学习北极星指标、过程指标和护栏指标", "为一个产品/业务搭一套指标树"],
  可视化表达: ["中", "分析结论需要被业务方快速理解并行动。", "学习图表选择、仪表盘结构和结论表达", "做一页经营看板并写出 3 条可行动建议"],
  活动策划: ["中", "运营类岗位需要把目标、机制、资源和复盘串起来。", "拆解 3 个同类活动案例，学习活动 SOP", "设计一次拉新/促活活动并写出预算和目标"],
  用户分层: ["高", "用户运营需要按价值、行为和生命周期制定动作。", "学习 RFM、生命周期分层和触达策略", "用样例用户数据完成一份分层运营方案"],
  渠道策略: ["中", "增长与市场岗位需要选择渠道并控制获客成本。", "学习主流渠道定位、投放漏斗和素材测试", "设计一个 4 周渠道测试计划"],
  沟通协调: ["中", "目标岗位会面对更多跨团队沟通和资源推进。", "练习会议纪要、决策记录和推进节奏管理", "沉淀一份跨部门项目周报模板"],
  流程优化: ["高", "主管类岗位需要从执行走向制度化和效率提升。", "学习流程图、RACI 和标准作业流程", "把当前岗位的一项重复事务改造成 SOP"],
  团队管理: ["中", "管理路线需要体现任务分配、反馈和结果复盘能力。", "学习一对一沟通、目标拆解和绩效反馈", "带教新人或小组项目并记录管理复盘"],
  解决方案设计: ["高", "客户成功/售前岗位要把客户问题转成可落地方案。", "学习客户场景诊断和方案书结构", "写一份客户问题诊断与解决方案"],
  续约意识: ["中", "客户成功经理需要关注客户价值实现和续约风险。", "学习健康分模型、价值回顾和风险预警", "做一份客户健康度评分表"],
  候选人沟通: ["中", "HR 岗位需要高质量沟通和候选人体验管理。", "学习结构化面试和候选人维护", "设计一套岗位沟通话术与面试反馈模板"],
  面试协调: ["低", "招聘流程的稳定执行是 HR 转型的基础能力。", "梳理招聘漏斗和协作节点", "做一份招聘流程看板"],
  业务理解: ["高", "越靠近策略岗位，越需要理解业务模式和关键约束。", "跟踪一个行业的商业模式、成本结构和用户链路", "写一份行业/竞品简报"],
  市场洞察: ["中", "市场与品牌岗位需要从用户、竞品和趋势中找到机会。", "学习竞品分析和消费者洞察方法", "完成一份目标人群与竞品观察"],
  创意表达: ["中", "策划岗位需要把策略转成清晰、有记忆点的表达。", "练习 campaign brief 和创意提案结构", "做 3 个主题创意方向和样稿"],
  供应商管理: ["中", "行政/市场管理岗位经常需要控制供应商质量与成本。", "学习询价、验收和 SLA 管理", "建立一份供应商评估表"],
  预算管理: ["中", "管理岗位需要能规划预算并解释投入产出。", "学习预算拆分、成本科目和月度追踪", "为一个项目做预算表和复盘"],
  项目计划: ["高", "项目经理要把模糊目标拆成路径、里程碑和责任人。", "学习 WBS、关键路径和风险登记表", "为一个真实项目写完整计划"],
  风险管理: ["中", "项目推进不只追进度，也要提前识别阻塞。", "学习风险概率、影响分级和预案设计", "维护一份项目风险清单并做周更新"],
  报告表达: ["中", "分析岗位需要用报告推动共识和决策。", "学习结论先行、证据链和页面结构", "完成一份 5 页以内的业务分析报告"]
};

const companyNames = ["星河科技", "启点咨询", "云舟互动", "观澜数据", "青橙生活", "北辰智造", "远山 SaaS", "棱镜增长"];
const companySizes = ["50-150人", "150-500人", "500-2000人", "2000人以上"];
const directionLabels = {
  vertical: "纵向晋升",
  horizontal: "横向转型",
  unsure: "还不确定"
};

export const roleOptions = Object.keys(roleProfiles);

export const assessmentQuestions = [
  {
    id: "orientation1",
    dimension: "orientation",
    text: "遇到一个新任务时，你更自然的切入点是？",
    options: [
      ["people", "先找关键人对齐信息"],
      ["system", "先画流程和结构"]
    ]
  },
  {
    id: "orientation2",
    dimension: "orientation",
    text: "你更容易从哪类成果里获得成就感？",
    options: [
      ["people", "推动一群人达成共识"],
      ["system", "把复杂问题整理成清晰系统"]
    ]
  },
  {
    id: "mode1",
    dimension: "mode",
    text: "你更适应哪种工作节奏？",
    options: [
      ["structure", "目标清楚、流程明确"],
      ["explore", "问题开放、快速试错"]
    ]
  },
  {
    id: "mode2",
    dimension: "mode",
    text: "面对不确定任务时，你通常会？",
    options: [
      ["structure", "先建立规则、排期和责任人"],
      ["explore", "先试一个小方案再迭代"]
    ]
  },
  {
    id: "decision1",
    dimension: "decision",
    text: "做判断时，你更依赖什么？",
    options: [
      ["data", "数据、证据、指标"],
      ["context", "人、场景、组织关系"]
    ]
  },
  {
    id: "decision2",
    dimension: "decision",
    text: "你更擅长哪种表达？",
    options: [
      ["data", "用事实和逻辑证明结论"],
      ["context", "把多方诉求翻译成可接受方案"]
    ]
  },
  {
    id: "impact1",
    dimension: "impact",
    text: "你希望自己在团队里更像？",
    options: [
      ["influence", "推动资源和决策的人"],
      ["expert", "提供专业判断的人"]
    ]
  },
  {
    id: "impact2",
    dimension: "impact",
    text: "你更想把下一阶段能力练到哪里？",
    options: [
      ["influence", "管理、沟通、拿结果"],
      ["expert", "方法、工具、专业深度"]
    ]
  }
];

export function getDefaultInput() {
  return {
    currentRole: "办公室主任",
    years: 3,
    city: "上海",
    educationHistory: [
      { degree: "", school: "", major: "", period: "" }
    ],
    experience: "",
    direction: "unsure",
    targetRole: "",
    assessment: {}
  };
}

export function normalizeCareerInput(raw = {}) {
  return {
    currentRole: sanitizeText(raw.currentRole, "内容运营", 30),
    years: clamp(Number(raw.years ?? 3), 0, 30),
    city: sanitizeText(raw.city, "上海", 18),
    educationHistory: normalizeEducationHistory(raw),
    experience: sanitizeText(raw.experience, "", 300),
    direction: ["vertical", "horizontal", "unsure"].includes(raw.direction) ? raw.direction : "horizontal",
    targetRole: sanitizeText(raw.targetRole, "", 30),
    assessment: normalizeAssessment(raw.assessment)
  };
}

export function buildCareerMap(rawInput = {}) {
  const input = normalizeCareerInput(rawInput);
  const currentProfile = inferRoleProfile(input.currentRole);
  const evidence = buildUserEvidence(input);
  const verticalPath = buildVerticalPath(currentProfile, input.city, evidence);
  const horizontalPaths = buildHorizontalPaths(currentProfile, input.city, evidence);
  const assessment = buildAssessmentResult(input, currentProfile);
  const targetRole = chooseTargetRole(input, verticalPath, horizontalPaths);
  const targetProfile = inferRoleProfile(targetRole);
  const gapAnalysis = buildGapAnalysis(input, currentProfile, targetRole, targetProfile, evidence);
  const jobs = buildMockJobs(targetRole, input.city, targetProfile);

  return {
    input,
    dataMode: "simulated-ai",
    summary: {
      currentRole: input.currentRole,
      city: input.city,
      direction: directionLabels[input.direction],
      yearsLabel: `${input.years} 年经验`,
      profileSignals: evidence.profileSignals,
      headline: buildHeadline(input, currentProfile, targetRole, gapAnalysis.readinessScore),
      targetRole,
      targetSource: input.targetRole ? "user" : "path"
    },
    verticalPath,
    verticalNote: currentProfile.verticalNote || "",
    horizontalPaths,
    assessment,
    gapAnalysis,
    jobs,
    nextModules: ["职业适配测评", "账号系统", "进度追踪"]
  };
}

function inferRoleProfile(roleName) {
  const normalized = String(roleName || "").toLowerCase();
  const direct = Object.entries(roleProfiles).find(([name, profile]) => {
    return name === roleName || profile.aliases.some((alias) => normalized.includes(alias.toLowerCase()));
  });

  if (direct) return { name: direct[0], ...direct[1] };
  if (/办公室主任|总经办主任|综合办公室/.test(roleName)) return { name: "办公室主任", ...roleProfiles.办公室主任 };
  if (/数据|分析|bi/.test(roleName)) return { name: "数据分析师", ...roleProfiles.数据分析师 };
  if (/产品|pm/i.test(roleName)) return { name: "产品经理", ...roleProfiles.产品经理 };
  if (/市场|品牌|营销/.test(roleName)) return { name: "市场专员", ...roleProfiles.市场专员 };
  if (/人力|人事|hr|招聘/i.test(roleName)) return { name: "人力资源专员", ...roleProfiles.人力资源专员 };
  if (/客服|客户/.test(roleName)) return { name: "客服专员", ...roleProfiles.客服专员 };
  if (/行政|综合/.test(roleName)) return { name: "行政专员", ...roleProfiles.行政专员 };

  return {
    name: roleName || "通用岗位",
    domain: "通用职能",
    coreSkills: ["沟通协调", "流程执行", "文档整理", "数据复盘", "项目推进", "业务理解"],
    companyTypes: ["成长型企业", "综合业务团队", "数字化团队"],
    vertical: [
      ["当前", roleName || "当前岗位", [7, 12], ["岗位基本职责", "稳定交付"]],
      ["进阶", `高级${roleName || "专员"}`, [12, 20], ["专项负责", "跨团队协作"]],
      ["高级", `${roleName || "业务"}经理`, [20, 35], ["策略制定", "团队协同"]],
      ["管理/专家", `${roleName || "业务"}负责人`, [32, 58], ["体系建设", "业务结果负责"]]
    ],
    adjacent: ["项目经理", "运营专员", "数据分析师", "客户成功经理", "产品经理"]
  };
}

function buildVerticalPath(profile, city, evidence) {
  return profile.vertical.map(([stage, title, salary, focus], index) => ({
    id: `v-${index}`,
    stage,
    title,
    salaryRange: formatSalaryRange(adjustSalary(salary, city, index)),
    companyTypes: profile.companyTypes,
    focus: enrichFocusWithEvidence(focus, evidence, index),
    signal: index === 0 ? "当前能力锚点" : `${index + 1} 个关键能力台阶`
  }));
}

function buildHorizontalPaths(profile, city, evidence) {
  return profile.adjacent.slice(0, 5).map((role, index) => {
    const requirements = getRequirements(role);
    const shared = getSharedSkills([...profile.coreSkills, ...evidence.skills], requirements);
    const difficulty = getDifficulty(shared.length, index);
    const targetProfile = inferRoleProfile(role);

    return {
      id: `h-${index}`,
      role,
      difficulty,
      salaryRange: formatSalaryRange(adjustSalary(getBaseSalary(targetProfile, role), city, index)),
      companyTypes: targetProfile.companyTypes || profile.companyTypes,
      fitReason: buildFitReason(profile, role, shared, difficulty),
      transferSignals: shared.length ? shared.slice(0, 3) : profile.coreSkills.slice(0, 3),
      missingSignals: requirements.filter((skill) => !isSkillCovered(skill, [...profile.coreSkills, ...evidence.skills])).slice(0, 3)
    };
  });
}

function chooseTargetRole(input, verticalPath, horizontalPaths) {
  if (input.targetRole) return input.targetRole;
  if (input.direction === "vertical") return verticalPath[1]?.title || verticalPath[0]?.title || input.currentRole;
  return horizontalPaths[0]?.role || verticalPath[1]?.title || input.currentRole;
}

function buildGapAnalysis(input, currentProfile, targetRole, targetProfile, evidence) {
  const currentSkills = enrichCurrentSkills([...currentProfile.coreSkills, ...evidence.skills], input.years);
  const requirements = getRequirements(targetRole, targetProfile);
  const strengths = requirements
    .filter((skill) => isSkillCovered(skill, currentSkills))
    .slice(0, 4)
    .map((skill) => ({
      name: skill,
      reason: `${input.currentRole} 的经历已经覆盖了 ${skill} 的一部分实际场景。`
    }));

  while (strengths.length < 3) {
    const fallback = currentSkills[strengths.length] || "沟通协调";
    strengths.push({
      name: fallback,
      reason: `这是从 ${input.currentRole} 迁移到 ${targetRole} 时可以直接复用的基础能力。`
    });
  }

  const gaps = requirements
    .filter((skill) => !strengths.some((item) => item.name === skill))
    .slice(0, 5)
    .map((skill, index) => buildGapItem(skill, targetRole, index));

  const readinessScore = clamp(46 + strengths.length * 8 + input.years * 3 + evidence.scoreBonus - gaps.length * 2, 50, 91);
  const timeline = buildTimeline(readinessScore, gaps.length, targetRole);

  return {
    targetRole,
    readinessScore,
    scoreLabel: readinessScore >= 78 ? "匹配度较高" : readinessScore >= 65 ? "可转型" : "需要补齐关键能力",
    strengths,
    gaps,
    timeline
  };
}

function buildGapItem(skill, targetRole, index) {
  const detail = capabilityLibrary[skill] || [
    index < 2 ? "高" : "中",
    `${targetRole} 通常需要更系统的 ${skill} 能力。`,
    `围绕 ${skill} 找一门实战型课程或行业案例拆解`,
    `完成一个能证明 ${skill} 的小项目并写成作品集条目`
  ];

  return {
    name: skill,
    importance: detail[0],
    reason: detail[1],
    actions: [
      { type: "课程", title: detail[2], detail: "优先选择能产出文档、原型、分析报告或复盘材料的训练。" },
      { type: "项目", title: detail[3], detail: "项目成果要能在面试中直接展示你的思考过程和交付质量。" }
    ],
    portfolioSuggestion: detail[3]
  };
}

function buildTimeline(score, gapCount, targetRole) {
  const fast = score >= 78 ? "2-3 个月" : score >= 66 ? "3-5 个月" : "4-6 个月";
  const normal = score >= 78 ? "4-6 个月" : score >= 66 ? "6-9 个月" : "9-12 个月";

  return {
    optimistic: fast,
    normal,
    checkpoints: [
      `第 1 阶段：补齐 ${Math.min(gapCount, 2)} 个最高优先级能力，并输出可展示材料。`,
      `第 2 阶段：完成 1 个贴近 ${targetRole} 的完整项目案例。`,
      "第 3 阶段：用目标岗位 JD 反查简历素材，开始小范围投递。"
    ]
  };
}

function buildMockJobs(targetRole, preferredCity, targetProfile) {
  const cityPool = unique([preferredCity, "上海", "北京", "深圳", "杭州", "广州"]).slice(0, 6);
  const base = getBaseSalary(targetProfile, targetRole);
  const titlePool = buildJobTitles(targetRole);

  return Array.from({ length: 8 }, (_, index) => {
    const city = cityPool[index % cityPool.length];
    const salary = adjustSalary([base[0] + index % 3, base[1] + (index % 4) * 2], city, index);
    const deadline = addDays(new Date(), 10 + index * 4);

    return {
      id: `job-${index + 1}`,
      company: companyNames[index % companyNames.length],
      title: titlePool[index % titlePool.length],
      salaryMin: salary[0],
      salaryMax: salary[1],
      salaryRange: formatSalaryRange(salary),
      city,
      companySize: companySizes[index % companySizes.length],
      deadline,
      applyUrl: `https://example.com/careermap/jobs/${encodeURIComponent(targetRole)}-${index + 1}`,
      tags: [targetProfile.domain || "目标岗位", index % 2 === 0 ? "成长型团队" : "成熟业务线", "模拟数据"]
    };
  });
}

function buildJobTitles(targetRole) {
  const titles = [targetRole];
  if (!/^高级/.test(targetRole)) titles.push(`高级${targetRole}`);
  if (/专员$/.test(targetRole)) titles.push(targetRole.replace(/专员$/, "主管"));
  if (/运营$/.test(targetRole)) titles.push(`${targetRole}经理`);
  if (/经理$/.test(targetRole)) titles.push(targetRole.replace(/经理$/, "负责人"));
  return unique(titles).slice(0, 4);
}

function buildHeadline(input, profile, targetRole, score) {
  const direction = directionLabels[input.direction];
  const scoreText = score >= 78 ? "可以优先冲刺" : score >= 65 ? "适合用项目作品补强" : "建议先补齐关键能力";
  const targetText = input.targetRole ? `到 ${targetRole}` : `先看 ${targetRole}`;
  return `${input.city} ${input.years} 年 ${input.currentRole}，${direction}${targetText}：${scoreText}。`;
}

function getRequirements(role, profile = inferRoleProfile(role)) {
  const matched = Object.entries(roleRequirements).find(([name]) => role.includes(name) || name.includes(role));
  if (matched) return matched[1];
  return unique([
    ...(profile.coreSkills || []),
    "数据分析",
    "项目推进",
    "业务理解"
  ]).slice(0, 6);
}

function getBaseSalary(profile, role) {
  const known = profile.vertical?.[1]?.[2] || profile.vertical?.[0]?.[2];
  if (known) return known;
  if (/总监|负责人/.test(role)) return [32, 60];
  if (/经理/.test(role)) return [18, 35];
  return [9, 18];
}

function adjustSalary([min, max], city, offset = 0) {
  const factor = /北京|上海|深圳/.test(city) ? 1.12 : /杭州|广州/.test(city) ? 1.05 : 0.96;
  return [
    Math.max(4, Math.round(min * factor + offset * 0.4)),
    Math.max(7, Math.round(max * factor + offset * 0.6))
  ];
}

function formatSalaryRange([min, max]) {
  return `${min}-${max}k/月`;
}

function getSharedSkills(source, target) {
  return target.filter((skill) => isSkillCovered(skill, source));
}

function isSkillCovered(skill, sourceSkills) {
  const families = {
    数据分析: ["数据复盘", "数据报表", "业绩分析", "工单分析", "实验评估"],
    项目推进: ["活动执行", "流程协同", "会议组织", "跨部门沟通", "项目管理", "沟通协调"],
    用户研究: ["用户洞察", "客户沟通", "需求理解"],
    需求分析: ["业务理解", "用户洞察", "问题排查", "客户沟通"],
    沟通协调: ["客户沟通", "跨部门沟通", "供应商沟通", "候选人沟通"],
    业务理解: ["商业判断", "销售流程", "服务流程", "品牌理解"],
    活动策划: ["活动执行", "内容策划", "渠道运营"],
    流程优化: ["流程执行", "服务流程", "组织流程", "销售流程"],
    报告表达: ["文案表达", "可视化表达", "文档整理"]
  };
  const related = families[skill] || [];
  return sourceSkills.some((owned) => owned === skill || related.includes(owned) || owned.includes(skill) || skill.includes(owned));
}

function enrichCurrentSkills(skills, years) {
  const extra = years >= 5 ? ["项目推进", "业务理解", "流程优化"] : years >= 2 ? ["项目推进", "数据分析"] : ["沟通协调"];
  return unique([...skills, ...extra]);
}

function getDifficulty(sharedCount, index) {
  if (sharedCount >= 3 || index === 0) return "低";
  if (sharedCount >= 2 || index <= 2) return "中";
  return "高";
}

function buildFitReason(profile, role, shared, difficulty) {
  const base = shared[0] || profile.coreSkills[0] || "岗位经验";
  const effort = difficulty === "低" ? "迁移成本较低" : difficulty === "中" ? "需要补一个作品项目" : "需要系统补课和项目验证";
  return `${profile.name} 的 ${base} 可迁移到 ${role}，${effort}。`;
}

function normalizeAssessment(raw = {}) {
  return Object.fromEntries(assessmentQuestions.map((question) => {
    const allowed = question.options.map(([value]) => value);
    const answer = allowed.includes(raw?.[question.id]) ? raw[question.id] : "";
    return [question.id, answer];
  }));
}

function buildUserEvidence(input) {
  const educationSkills = input.educationHistory.flatMap((item) => inferEducationSkills(item));
  const experienceSkills = inferExperienceSkills(input.experience);
  const skills = unique([...educationSkills, ...experienceSkills]);
  const profileSignals = [];
  const educationLabels = input.educationHistory
    .map((item) => [item.degree, item.school, item.major].filter(Boolean).join(" / "))
    .filter(Boolean);

  if (educationLabels.length) profileSignals.push(`教育经历：${educationLabels.slice(0, 2).join("；")}`);
  if (experienceSkills.length) profileSignals.push(`经历信号：${experienceSkills.slice(0, 3).join(" / ")}`);

  const educationText = educationLabels.join(" ");
  const educationBonus = /硕士|研究生|博士|MBA|EMBA/i.test(educationText) ? 4 : /本科/.test(educationText) ? 2 : 0;
  const experienceBonus = Math.min(6, experienceSkills.length * 2);

  return {
    skills,
    profileSignals,
    scoreBonus: educationBonus + experienceBonus
  };
}

function normalizeEducationHistory(raw) {
  const list = Array.isArray(raw.educationHistory) ? raw.educationHistory : [];
  const normalized = list.map((item) => ({
    degree: sanitizeText(item?.degree, "", 24),
    school: sanitizeText(item?.school, "", 40),
    major: sanitizeText(item?.major, "", 40),
    period: sanitizeText(item?.period, "", 30)
  })).filter((item) => item.degree || item.school || item.major || item.period);

  const legacyDegree = sanitizeText(raw.education, "", 24);
  const legacyMajor = sanitizeText(raw.major, "", 40);
  if (!normalized.length && (legacyDegree || legacyMajor)) {
    normalized.push({ degree: legacyDegree, school: "", major: legacyMajor, period: "" });
  }

  return normalized;
}

function inferEducationSkills(educationItem) {
  const text = `${educationItem.degree} ${educationItem.school} ${educationItem.major}`;
  const skills = [];
  if (/管理|工商|行政|公共|MPA|MBA|EMBA/i.test(text)) skills.push("组织流程", "流程优化", "管理基础", "商业判断");
  if (/中文|新闻|传播|文秘|法律|法学/.test(text)) skills.push("公文写作", "报告表达", "合规意识");
  if (/计算机|软件|信息|自动化|电子/.test(text)) skills.push("系统思维", "数据分析", "工具能力");
  if (/统计|数学|金融|经济|财务|会计/.test(text)) skills.push("数据分析", "经营分析", "预算管理");
  if (/心理|社会|教育|人力/.test(text)) skills.push("用户研究", "沟通协调", "组织理解");
  return unique(skills);
}

function inferExperienceSkills(experience) {
  const text = String(experience || "");
  const skills = [];
  const keywordMap = [
    [/会议|纪要|议题|会务/, ["会议组织", "公文写作"]],
    [/公文|材料|汇报|讲话稿|报告/, ["公文写作", "报告表达"]],
    [/领导|高层|董事会|总经理|总经办/, ["高层沟通", "经营分析"]],
    [/预算|费用|成本|采购|供应商/, ["预算管理", "供应商管理"]],
    [/流程|制度|SOP|规范|内控/, ["流程优化", "合规意识"]],
    [/项目|推进|协调|跨部门/, ["项目推进", "综合协调", "资源协调"]],
    [/数据|报表|分析|指标/, ["数据分析", "经营分析"]],
    [/客户|用户|服务|满意度/, ["客户沟通", "需求理解"]],
    [/招聘|培训|绩效|员工/, ["候选人沟通", "组织流程"]],
    [/产品|需求|原型|PRD/, ["需求分析", "原型设计"]]
  ];

  for (const [pattern, inferred] of keywordMap) {
    if (pattern.test(text)) skills.push(...inferred);
  }

  return unique(skills);
}

function enrichFocusWithEvidence(focus, evidence, index) {
  if (!evidence.skills.length || index === 0) return focus;
  const relevant = evidence.skills.filter((skill) => !focus.includes(skill)).slice(0, 1);
  return unique([...focus, ...relevant]).slice(0, 3);
}

function buildAssessmentResult(input, currentProfile) {
  const answers = input.assessment || {};
  const completed = Object.values(answers).filter(Boolean).length;
  const dimensions = scoreAssessmentDimensions(answers);

  if (completed < assessmentQuestions.length) {
    return {
      completed,
      total: assessmentQuestions.length,
      ready: false,
      typeCode: "",
      typeName: "",
      typeSummary: "完成测评后，会生成职业倾向类型和岗位推荐。路径规划不会强制依赖测评结果。",
      dimensions,
      recommendations: []
    };
  }

  const typeCode = dimensions.map((item) => item.winner.code).join("-");
  const typeProfile = inferAssessmentType(dimensions);
  const recommendations = buildAssessmentRecommendations(typeCode, dimensions, currentProfile.name);

  return {
    completed,
    total: assessmentQuestions.length,
    ready: true,
    typeCode,
    typeName: typeProfile.name,
    typeSummary: typeProfile.summary,
    dimensions,
    recommendations
  };
}

function scoreAssessmentDimensions(answers) {
  const config = {
    orientation: {
      label: "关注对象",
      poles: {
        people: { code: "P", label: "人际协同" },
        system: { code: "S", label: "系统结构" }
      }
    },
    mode: {
      label: "工作模式",
      poles: {
        structure: { code: "T", label: "秩序推进" },
        explore: { code: "X", label: "探索试错" }
      }
    },
    decision: {
      label: "判断方式",
      poles: {
        data: { code: "D", label: "数据理性" },
        context: { code: "C", label: "情境洞察" }
      }
    },
    impact: {
      label: "影响方式",
      poles: {
        influence: { code: "I", label: "影响推动" },
        expert: { code: "E", label: "专业深耕" }
      }
    }
  };

  const scores = Object.fromEntries(Object.keys(config).map((dimension) => [dimension, {}]));
  for (const question of assessmentQuestions) {
    const answer = answers[question.id];
    if (!answer) continue;
    scores[question.dimension][answer] = (scores[question.dimension][answer] || 0) + 1;
  }

  return Object.entries(config).map(([id, item]) => {
    const poleEntries = Object.entries(item.poles).map(([key, pole]) => ({
      key,
      ...pole,
      score: scores[id][key] || 0
    }));
    const winner = [...poleEntries].sort((a, b) => b.score - a.score)[0] || poleEntries[0];
    return {
      id,
      label: item.label,
      winner,
      poles: poleEntries
    };
  });
}

function inferAssessmentType(dimensions) {
  const winners = Object.fromEntries(dimensions.map((item) => [item.id, item.winner.key]));
  const people = winners.orientation === "people";
  const structure = winners.mode === "structure";
  const data = winners.decision === "data";
  const influence = winners.impact === "influence";

  if (people && structure && influence) {
    return {
      name: "组织协调型",
      summary: "适合在多方关系、组织流程和管理支持中推动结果，典型岗位包括办公室主任、总经理助理、项目经理。"
    };
  }
  if (!people && !structure && data) {
    return {
      name: "产品分析型",
      summary: "适合在开放问题中用数据和系统方法找答案，典型岗位包括产品经理、数据分析师、增长运营。"
    };
  }
  if (people && !data) {
    return {
      name: "用户经营型",
      summary: "适合理解人和场景，通过沟通、服务和体验改善创造价值，典型岗位包括客户成功、用户运营、人力资源。"
    };
  }
  if (!people && structure && !influence) {
    return {
      name: "专业控制型",
      summary: "适合在规则、数据、系统和专业标准中稳定产出，典型岗位包括数据分析、董秘、风控/合规、运营管理。"
    };
  }
  return {
    name: "复合发展型",
    summary: "适合在专业能力和跨团队推动之间形成组合优势，可以优先比较产品、项目、运营和综合管理方向。"
  };
}

function buildAssessmentRecommendations(typeCode, dimensions, currentRole) {
  const winners = Object.fromEntries(dimensions.map((item) => [item.id, item.winner.key]));
  const scores = new Map();
  const reasons = new Map();

  const add = (role, points, reason) => {
    scores.set(role, (scores.get(role) || 0) + points);
    if (!reasons.has(role)) reasons.set(role, []);
    reasons.get(role).push(reason);
  };

  if (winners.orientation === "people") {
    add("总经理助理", 5, "你更偏向通过人和关系推动结果");
    add("客户成功经理", 4, "适合把沟通转化为客户价值");
    add("人力资源专员", 3, "适合连接组织和人");
  } else {
    add("产品经理", 5, "你更偏向用系统方式拆解问题");
    add("数据分析师", 4, "适合结构化分析和模型化表达");
    add("数据产品经理", 3, "适合把分析能力产品化");
  }

  if (winners.mode === "structure") {
    add("办公室主任", 5, "你更适合清晰规则和稳定流程");
    add("项目经理", 4, "适合拆任务、排节奏、控风险");
    add("董事会秘书", 3, "适合严谨流程和正式材料");
  } else {
    add("增长运营", 5, "你能接受试错和不确定性");
    add("产品经理", 4, "适合在模糊需求中找方案");
    add("品牌策划", 3, "适合开放创意和快速验证");
  }

  if (winners.decision === "data") {
    add("数据分析师", 5, "你更依赖证据、指标和逻辑判断");
    add("商务分析师", 4, "适合把业务问题变成分析结论");
    add("增长运营", 3, "适合用指标优化转化");
  } else {
    add("总经理助理", 5, "你擅长理解组织情境和多方诉求");
    add("用户运营", 4, "适合把用户场景转成运营动作");
    add("客户成功经理", 3, "适合做需求翻译和价值交付");
  }

  if (winners.impact === "influence") {
    add("项目经理", 5, "你希望通过影响他人推动结果");
    add("办公室主任", 4, "适合多方协调和组织推进");
    add("总经理助理", 4, "适合靠近决策和资源调动");
  } else {
    add("数据分析师", 5, "你更愿意沉淀专业判断");
    add("董事会秘书", 4, "适合专业规则和严谨表达");
    add("产品经理", 3, "适合方法体系与专业输出");
  }

  if (/办公室|行政|综合|总经办/.test(currentRole)) {
    add("总经理助理", 2, "当前经历可连接综合管理和经营支持");
    add("办公室主任", 2, "当前经历可沿综合管理线深化");
  }

  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([role, score]) => ({
      role,
      score: clamp(Math.round(score * 5.5), 58, 96),
      fitType: inferFitTypeFromRole(role),
      reasons: unique(reasons.get(role) || []).slice(0, 3),
      typeCode
    }));
}

function inferFitTypeFromRole(role) {
  if (/办公室|总经理助理|幕僚|董事会秘书/.test(role)) return "综合管理";
  if (/产品|数据|分析/.test(role)) return "系统分析";
  if (/运营|增长|品牌|内容/.test(role)) return "业务增长";
  if (/客户|人力|HR/.test(role)) return "人际服务";
  return "复合发展";
}

function addDays(dateInput, days) {
  const date = new Date(dateInput);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function sanitizeText(value, fallback, maxLength) {
  const text = String(value || "").trim().replace(/[<>]/g, "");
  return text.slice(0, maxLength) || fallback;
}

function clamp(value, min, max) {
  if (Number.isNaN(value)) return min;
  return Math.max(min, Math.min(max, Math.round(value)));
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}
