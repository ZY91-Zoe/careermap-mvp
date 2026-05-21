# CareerMap

CareerMap 是一个可部署的职业路径规划 MVP。用户输入当前岗位、年限、城市、教育经历和工作经历后，系统生成纵向晋升路线、横向迁移岗位、能力差距报告，以及与目标岗位匹配的模拟在招职位。目标岗位可以留空；职业测评是单独的可选功能。

## 快速开始

```bash
npm run start
```

打开：

```text
http://127.0.0.1:5173
```

## 当前版本

- 前端：原生 HTML/CSS/JavaScript，沿用 TripWise 的无依赖交付方式
- 后端：Node.js 原生 HTTP 服务
- API：`POST /api/career-plan`、`GET /api/health`
- 数据：MVP 阶段使用结构化模拟 AI 生成器，职位数据为可替换 JSON 结构
- 已做：用户信息录入、多段教育经历、经历摘要、目标岗位选填、独立职业倾向测评、职业路径地图、能力差距分析、模拟职位聚合与筛选
- 职业测评：独立入口，输出类似 MBTI 的职业倾向类型码和岗位推荐，不强制影响路径规划
- 职位数据：支持配置授权 API/代理接口接入 Boss、猎聘、前程无忧/51job、LinkedIn；未配置时展示模拟职位和平台搜索入口
- 纵向晋升：针对办公室主任等岗位加入总经办、总经理助理、董事会秘书、幕僚长、副总/总经理等分支判断
- 未做：简历生成、实时招聘爬虫、社区、复杂账号系统

## 常用命令

```bash
npm run start
npm run check
npm run smoke
```

## 真实职位数据接入

当前不会直接爬取招聘网站页面。要接入真实职位，请配置授权 API 或你自己的合规代理接口：

```bash
cp .env.example .env
```

然后在 `.env` 或 Render 环境变量中配置：

```text
JOB_SOURCE_MODE=api
BOSS_JOBS_ENDPOINT=
LIEPIN_JOBS_ENDPOINT=
JOB51_JOBS_ENDPOINT=
LINKEDIN_JOBS_ENDPOINT=
JOBS_API_KEY=
```

CareerMap 会向每个 endpoint 发起：

```text
GET <endpoint>?keyword=<目标岗位>&city=<城市>&platform=<平台>
Authorization: Bearer <token>
```

返回格式支持数组，或：

```json
{
  "jobs": [
    {
      "title": "总经理助理",
      "company": "某公司",
      "city": "北京",
      "salaryRange": "18-28k/月",
      "companySize": "500-2000人",
      "deadline": "滚动招聘",
      "applyUrl": "https://example.com/job/1",
      "tags": ["真实数据"]
    }
  ]
}
```

## API 示例

```bash
curl -X POST http://127.0.0.1:5173/api/career-plan \
  -H "Content-Type: application/json" \
  -d '{"currentRole":"办公室主任","years":6,"city":"北京","educationHistory":[{"degree":"本科","school":"某大学","major":"行政管理","period":"2014-2018"},{"degree":"MBA","school":"商学院","major":"工商管理","period":"2022-2024"}],"experience":"负责总经办会议纪要、公文材料、跨部门项目协调、预算采购和领导汇报","direction":"unsure","targetRole":""}'
```

## 项目结构

```text
.
├── index.html
├── package.json
├── docs/
│   └── product-spec.md
├── scripts/
│   └── smoke-test.mjs
├── server/
│   └── index.js
└── src/
    ├── app.js
    ├── planner.js
    └── styles.css
```
