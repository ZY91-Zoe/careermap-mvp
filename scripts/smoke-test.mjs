import { buildCareerMap } from "../src/planner.js";
import { attachJobData } from "../server/services/jobs.js";

const input = {
  currentRole: "办公室主任",
  years: 6,
  city: "北京",
  educationHistory: [
    { degree: "本科", school: "某大学", major: "行政管理", period: "2014-2018" },
    { degree: "MBA", school: "商学院", major: "工商管理", period: "2022-2024" }
  ],
  experience: "负责总经办会议纪要、公文材料、跨部门项目协调、预算采购和领导汇报",
  direction: "unsure",
  targetRole: ""
};

const result = buildCareerMap(input);
const jobEnhanced = await attachJobData(result, input);
const enhancedResult = jobEnhanced.result;

if (result.dataMode !== "simulated-ai") {
  throw new Error("Expected simulated-ai data mode.");
}

if (result.verticalPath.length < 4) {
  throw new Error("Expected a complete vertical path.");
}

if (!result.verticalPath.some((step) => /幕僚长|总经理助理|总经理/.test(step.title))) {
  throw new Error("Expected office-director vertical branches.");
}

if (result.horizontalPaths.length < 3) {
  throw new Error("Expected at least three horizontal paths.");
}

if (result.summary.targetSource !== "path") {
  throw new Error("Expected target role to be selected from path when user leaves it blank.");
}

if (!result.gapAnalysis.gaps.length || !result.gapAnalysis.strengths.length) {
  throw new Error("Expected gap analysis with strengths and gaps.");
}

if (enhancedResult.jobs.length < 6 || enhancedResult.jobs.some((job) => !job.applyUrl || !job.salaryRange)) {
  throw new Error("Expected structured mock jobs.");
}

if (!enhancedResult.jobsMeta || !enhancedResult.jobsMeta.searchLinks.length) {
  throw new Error("Expected job source metadata and platform search links.");
}

const assessmentResult = buildCareerMap({
  ...input,
  assessment: {
    orientation1: "people",
    orientation2: "people",
    mode1: "structure",
    mode2: "structure",
    decision1: "context",
    decision2: "context",
    impact1: "influence",
    impact2: "influence"
  }
}).assessment;

if (!assessmentResult.ready || !assessmentResult.typeCode || assessmentResult.recommendations.length < 3) {
  throw new Error("Expected complete standalone assessment result.");
}

console.log(JSON.stringify({
  ok: true,
  targetRole: result.gapAnalysis.targetRole,
  targetSource: result.summary.targetSource,
  assessmentType: assessmentResult.typeCode,
  recommendations: assessmentResult.recommendations.map((item) => item.role).slice(0, 3),
  readinessScore: result.gapAnalysis.readinessScore,
  verticalStages: result.verticalPath.length,
  horizontalPaths: result.horizontalPaths.length,
  jobs: enhancedResult.jobs.length,
  jobMode: enhancedResult.jobsMeta.mode,
  jobSearchLinks: enhancedResult.jobsMeta.searchLinks.map((item) => item.name)
}, null, 2));
