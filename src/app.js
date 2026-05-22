import { assessmentQuestions, buildCareerMap, getDefaultInput, roleOptions } from "./planner.js";

const state = {
  result: null,
  loading: false,
  dataMode: "simulated-ai",
  educationRows: [],
  activeResultStep: "path"
};

const careerForm = document.querySelector("#career-form");
const assessmentForm = document.querySelector("#assessment-form");
const currentRoleInput = document.querySelector("#current-role");
const yearsInput = document.querySelector("#years");
const cityInput = document.querySelector("#city");
const experienceInput = document.querySelector("#experience");
const directionInput = document.querySelector("#direction");
const targetRoleInput = document.querySelector("#target-role");
const submitButton = careerForm.querySelector("button[type='submit']");
const submitLabel = document.querySelector("#submit-label");
const roleOptionsList = document.querySelector("#role-options");
const educationList = document.querySelector("#education-list");
const addEducationButton = document.querySelector("#add-education");
const assessmentQuestionsContainer = document.querySelector("#assessment-questions");
const assessmentProgress = document.querySelector("#assessment-progress");
const assessmentOutput = document.querySelector("#assessment-output");
const summaryTitle = document.querySelector("#summary-title");
const summaryCopy = document.querySelector("#summary-copy");
const profileSignals = document.querySelector("#profile-signals");
const scoreValue = document.querySelector("#score-value");
const scoreLabel = document.querySelector("#score-label");
const resultFlow = document.querySelector("#result-flow");
const flowEmpty = document.querySelector("#flow-empty");
const flowContent = document.querySelector("#flow-content");
const flowGuideItems = [...document.querySelectorAll("[data-flow-step]")];
const stepTabs = [...document.querySelectorAll(".step-tab[data-result-step]")];
const stepPanels = [...document.querySelectorAll("[data-step-panel]")];
const activeTarget = document.querySelector("#active-target");
const verticalNote = document.querySelector("#vertical-note");
const verticalPath = document.querySelector("#vertical-path");
const horizontalPaths = document.querySelector("#horizontal-paths");
const gapReport = document.querySelector("#gap-report");
const timelineLabel = document.querySelector("#timeline-label");
const jobsList = document.querySelector("#jobs-list");
const jobSourceSummary = document.querySelector("#job-source-summary");
const filterCity = document.querySelector("#filter-city");
const filterSalary = document.querySelector("#filter-salary");
const filterSize = document.querySelector("#filter-size");

init();

function init() {
  const defaults = getDefaultInput();
  renderRoleOptions();
  renderAssessmentQuestions();
  fillForm(defaults);
  bindEvents();
  renderPlanner();
}

function bindEvents() {
  careerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    generatePlan();
  });

  assessmentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    runAssessment();
  });

  assessmentQuestionsContainer.addEventListener("change", () => {
    renderAssessmentProgress();
  });

  addEducationButton.addEventListener("click", () => {
    state.educationRows.push({ degree: "", school: "", major: "", period: "" });
    renderEducationRows();
  });

  educationList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-education]");
    if (!button) return;
    const index = Number(button.dataset.removeEducation);
    state.educationRows.splice(index, 1);
    if (!state.educationRows.length) {
      state.educationRows.push({ degree: "", school: "", major: "", period: "" });
    }
    renderEducationRows();
  });

  educationList.addEventListener("input", syncEducationRowsFromDom);

  document.addEventListener("click", (event) => {
    const roleButton = event.target.closest("[data-target-role]");
    if (roleButton) {
      targetRoleInput.value = roleButton.dataset.targetRole;
      generatePlan({ targetRole: roleButton.dataset.targetRole });
      return;
    }

    const stepButton = event.target.closest("[data-result-step]");
    if (!stepButton || !state.result) return;
    setActiveResultStep(stepButton.dataset.resultStep, true);
  });

  [filterCity, filterSalary, filterSize].forEach((control) => {
    control.addEventListener("change", renderJobs);
  });
}

function fillForm(input) {
  currentRoleInput.value = input.currentRole;
  yearsInput.value = input.years;
  cityInput.value = input.city;
  experienceInput.value = input.experience;
  directionInput.value = input.direction;
  targetRoleInput.value = input.targetRole;
  state.educationRows = input.educationHistory?.length
    ? structuredClone(input.educationHistory)
    : [{ degree: "", school: "", major: "", period: "" }];
  renderEducationRows();
  renderAssessmentProgress();
}

function collectInput(extra = {}) {
  return {
    currentRole: currentRoleInput.value,
    years: yearsInput.value,
    city: cityInput.value,
    educationHistory: collectEducationHistory(),
    experience: experienceInput.value,
    direction: directionInput.value,
    targetRole: targetRoleInput.value,
    ...extra
  };
}

function collectEducationHistory() {
  syncEducationRowsFromDom();
  return state.educationRows
    .map((row) => ({
      degree: row.degree.trim(),
      school: row.school.trim(),
      major: row.major.trim(),
      period: row.period.trim()
    }))
    .filter((row) => row.degree || row.school || row.major || row.period);
}

function collectAssessment() {
  return Object.fromEntries(assessmentQuestions.map((question) => {
    const selected = assessmentForm.querySelector(`input[name="assessment-${question.id}"]:checked`);
    return [question.id, selected?.value || ""];
  }));
}

async function generatePlan(overrides = {}) {
  const input = collectInput(overrides);
  setLoading(true);

  try {
    const response = await fetch("./api/career-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input)
    });

    if (!response.ok) throw new Error("API unavailable");
    const payload = await response.json();
    state.result = payload.result;
    state.dataMode = payload.dataMode || "simulated-ai";
  } catch {
    state.result = buildCareerMap(input);
    state.dataMode = "simulated-ai";
  } finally {
    state.activeResultStep = "path";
    setLoading(false);
    renderPlanner();
    resultFlow.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function runAssessment() {
  const assessment = collectAssessment();
  const result = buildCareerMap(collectInput({ targetRole: "", assessment }));
  renderFlowGuide("assessment");
  renderAssessmentOutput(result.assessment);
}

function setLoading(isLoading) {
  state.loading = isLoading;
  submitButton.disabled = isLoading;
  submitLabel.textContent = isLoading ? "生成中..." : "生成";
}

function renderPlanner() {
  if (!state.result) {
    renderInitialPlanner();
    renderResultFlow(false);
    return;
  }

  renderSummary();
  renderPaths();
  renderGapReport();
  renderJobFilters();
  renderJobSourceSummary();
  renderJobs();
  renderResultFlow(true);
}

function renderInitialPlanner() {
  summaryTitle.textContent = "填写档案后点击生成";
  summaryCopy.textContent = "生成后会先展示路径地图，再继续查看差距分析和在招职位。";
  scoreValue.textContent = "--";
  scoreLabel.textContent = "匹配度";
  profileSignals.innerHTML = `<span>目标岗位、学历和工作经历都可以选填</span>`;
}

function renderResultFlow(hasContent) {
  resultFlow.classList.toggle("is-empty", !hasContent);
  flowEmpty.classList.toggle("is-hidden", hasContent);
  flowContent.classList.toggle("is-hidden", !hasContent);
  renderFlowGuide(hasContent ? state.activeResultStep : "profile");
  if (!hasContent) return;

  stepTabs.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.resultStep === state.activeResultStep);
  });
  stepPanels.forEach((panel) => {
    const isActive = panel.dataset.stepPanel === state.activeResultStep;
    panel.classList.toggle("is-active", isActive);
    panel.classList.toggle("is-hidden", !isActive);
  });
}

function renderFlowGuide(activeStep) {
  flowGuideItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.flowStep === activeStep);
  });
}

function setActiveResultStep(step, shouldScroll = false) {
  if (!["path", "gap", "jobs"].includes(step)) return;
  state.activeResultStep = step;
  renderResultFlow(Boolean(state.result));
  if (shouldScroll) {
    document.querySelector(`[data-step-panel="${step}"]`)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function renderSummary() {
  const { summary, gapAnalysis } = state.result;
  const targetPrefix = summary.targetSource === "user" ? "目标岗位" : "路径建议";

  summaryTitle.textContent = `${summary.currentRole} -> ${summary.targetRole}`;
  summaryCopy.textContent = summary.headline;
  scoreValue.textContent = `${gapAnalysis.readinessScore}`;
  scoreLabel.textContent = gapAnalysis.scoreLabel;
  activeTarget.textContent = `${targetPrefix}：${summary.targetRole}`;
  timelineLabel.textContent = `正常周期：${gapAnalysis.timeline.normal}`;
  profileSignals.innerHTML = summary.profileSignals.length
    ? summary.profileSignals.map((item) => `<span>${h(item)}</span>`).join("")
    : `<span>未填写教育/经历时，系统先按岗位和年限判断</span>`;
}

function renderEducationRows() {
  educationList.innerHTML = state.educationRows.map((row, index) => `
    <div class="education-row" data-education-row="${index}">
      <label>
        学历/项目
        <input data-education-field="degree" value="${h(row.degree)}" placeholder="本科 / 硕士 / MBA">
      </label>
      <label>
        学校/机构
        <input data-education-field="school" value="${h(row.school)}" placeholder="学校或培训机构">
      </label>
      <label>
        专业/方向
        <input data-education-field="major" value="${h(row.major)}" placeholder="行政管理 / 金融 / 中文">
      </label>
      <label>
        时间
        <input data-education-field="period" value="${h(row.period)}" placeholder="2016-2020">
      </label>
      <button class="icon-button" type="button" data-remove-education="${index}" aria-label="删除教育经历">×</button>
    </div>
  `).join("");
}

function syncEducationRowsFromDom() {
  state.educationRows = [...educationList.querySelectorAll("[data-education-row]")].map((row) => {
    const get = (field) => row.querySelector(`[data-education-field="${field}"]`)?.value || "";
    return {
      degree: get("degree"),
      school: get("school"),
      major: get("major"),
      period: get("period")
    };
  });
}

function renderAssessmentQuestions() {
  assessmentQuestionsContainer.innerHTML = assessmentQuestions.map((question, index) => `
    <fieldset class="question-card">
      <legend>${index + 1}. ${h(question.text)}</legend>
      <div class="answer-options">
        ${question.options.map(([value, label]) => `
          <label class="answer-option">
            <input type="radio" name="assessment-${h(question.id)}" value="${h(value)}">
            <span>${h(label)}</span>
          </label>
        `).join("")}
      </div>
    </fieldset>
  `).join("");
}

function renderAssessmentProgress() {
  const answered = Object.values(collectAssessment()).filter(Boolean).length;
  assessmentProgress.textContent = `${answered}/${assessmentQuestions.length}`;
}

function renderAssessmentOutput(assessment) {
  if (!assessment.ready) {
    const missing = assessment.total - assessment.completed;
    assessmentOutput.innerHTML = `
      <div class="empty-assessment">
        <h3>还差 ${missing} 题</h3>
        <p>测评是可选功能。完成全部题目后，会生成职业倾向类型和岗位推荐。</p>
      </div>
    `;
    return;
  }

  assessmentOutput.innerHTML = `
    <section class="type-result">
      <div>
        <p class="section-kicker">Type Code</p>
        <h2>${h(assessment.typeName)}</h2>
        <p>${h(assessment.typeSummary)}</p>
      </div>
      <strong>${h(assessment.typeCode)}</strong>
    </section>
    <section class="dimension-grid">
      ${assessment.dimensions.map((item) => `
        <article>
          <span>${h(item.label)}</span>
          <strong>${h(item.winner.label)}</strong>
          <small>${h(item.winner.code)}</small>
        </article>
      `).join("")}
    </section>
    <section class="recommendation-list">
      ${assessment.recommendations.map((item, index) => `
        <article class="recommendation-card ${index === 0 ? "is-primary" : ""}">
          <div>
            <p class="stage-label">${h(item.fitType)}</p>
            <h3>${h(item.role)}</h3>
          </div>
          <strong>${h(item.score)}%</strong>
          <ul>
            ${item.reasons.map((reason) => `<li>${h(reason)}</li>`).join("")}
          </ul>
          <button type="button" class="secondary-button" data-target-role="${h(item.role)}">带回路径规划</button>
        </article>
      `).join("")}
    </section>
  `;
}

function renderPaths() {
  verticalNote.textContent = state.result.verticalNote || "纵向路径会根据当前岗位和组织类型推演，不再只给通用主管/经理模板。";
  verticalPath.innerHTML = state.result.verticalPath.map((step, index) => `
    <article class="stage-card ${index === 0 ? "is-current" : ""}">
      <div class="stage-index">${index + 1}</div>
      <div>
        <p class="stage-label">${h(step.stage)}</p>
        <h4>${h(step.title)}</h4>
        <p class="muted">${h(step.salaryRange)} · ${h(step.companyTypes.slice(0, 2).join(" / "))}</p>
        <div class="mini-tags">
          ${step.focus.map((item) => `<span>${h(item)}</span>`).join("")}
        </div>
      </div>
      ${index === 0 ? "" : `<button type="button" class="ghost-button" data-target-role="${h(step.title.split(" / ")[0])}">设为目标</button>`}
    </article>
  `).join("");

  const tiers = state.result.horizontalPathTiers?.length
    ? state.result.horizontalPathTiers
    : [{
        id: "near",
        label: "近迁移",
        horizon: "1年内可转",
        summary: "技能重叠度高。",
        roles: state.result.horizontalPaths
      }];

  horizontalPaths.innerHTML = tiers.map((tier) => `
    <section class="migration-tier ${h(tier.id)}">
      <div class="migration-tier-heading">
        <span class="tier-dot ${h(tier.dotClass || `is-${tier.id}`)}"></span>
        <div>
          <h4>${h(tier.label)} · ${h(tier.horizon)}</h4>
          <p>${h(tier.summary)}</p>
        </div>
      </div>
      <div class="migration-role-grid">
        ${tier.roles.map((path) => `
          <article class="role-card migration-card">
            <div class="role-card-top">
              <div>
                <p class="stage-label">${h(path.tierLabel || tier.label)}</p>
                <h4>${h(path.role)}</h4>
              </div>
              <span class="fit-score">${h(path.fitScore || "")}</span>
            </div>
            <p class="muted">${h(path.salaryRange)} · ${h(path.companyTypes.slice(0, 2).join(" / "))}</p>
            <p>${h(path.fitReason)}</p>
            <div class="signal-row">
              <strong>可迁移</strong>
              <div class="mini-tags">
                ${path.transferSignals.map((item) => `<span>${h(item)}</span>`).join("")}
              </div>
            </div>
            <div class="signal-row is-gap">
              <strong>需补</strong>
              <div class="mini-tags">
                ${path.missingSignals.map((item) => `<span>${h(item)}</span>`).join("")}
              </div>
            </div>
            <p class="case-signal">${h(path.caseSignal || "")}</p>
            <button type="button" class="secondary-button" data-target-role="${h(path.role)}">分析差距</button>
          </article>
        `).join("")}
      </div>
    </section>
  `).join("");
}

function renderGapReport() {
  const report = state.result.gapAnalysis;
  gapReport.innerHTML = `
    <div class="strengths-grid">
      ${report.strengths.map((item) => `
        <article class="strength-card">
          <span class="dot"></span>
          <h4>${h(item.name)}</h4>
          <p>${h(item.reason)}</p>
        </article>
      `).join("")}
    </div>

    <div class="gap-list">
      ${report.gaps.map((gap, index) => `
        <article class="gap-item">
          <div class="gap-rank">${index + 1}</div>
          <div class="gap-body">
            <div class="gap-title-row">
              <h4>${h(gap.name)}</h4>
              <span class="importance">${h(gap.importance)}</span>
            </div>
            <p>${h(gap.reason)}</p>
            <div class="action-grid">
              ${gap.actions.map((action) => `
                <div class="action-box">
                  <strong>${h(action.type)}：${h(action.title)}</strong>
                  <span>${h(action.detail)}</span>
                </div>
              `).join("")}
            </div>
          </div>
        </article>
      `).join("")}
    </div>

    <div class="timeline">
      <div>
        <span>乐观</span>
        <strong>${h(report.timeline.optimistic)}</strong>
      </div>
      <div>
        <span>正常</span>
        <strong>${h(report.timeline.normal)}</strong>
      </div>
      <ul>
        ${report.timeline.checkpoints.map((item) => `<li>${h(item)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderJobFilters() {
  const jobs = state.result.jobs;
  const currentCity = filterCity.value || "all";
  const currentSize = filterSize.value || "all";
  const cities = ["all", ...new Set(jobs.map((job) => job.city))];
  const sizes = ["all", ...new Set(jobs.map((job) => job.companySize))];

  filterCity.innerHTML = cities.map((city) => `
    <option value="${h(city)}">${city === "all" ? "全部城市" : h(city)}</option>
  `).join("");
  filterSize.innerHTML = sizes.map((size) => `
    <option value="${h(size)}">${size === "all" ? "全部规模" : h(size)}</option>
  `).join("");

  filterCity.value = cities.includes(currentCity) ? currentCity : "all";
  filterSize.value = sizes.includes(currentSize) ? currentSize : "all";
}

function renderJobSourceSummary() {
  const meta = state.result.jobsMeta || {
    mode: "mock",
    note: "当前展示职位推荐，并提供平台搜索入口。",
    configuredProviders: [],
    successfulProviders: [],
    failedProviders: [],
    searchLinks: []
  };
  const statusLabel = meta.mode === "live" ? "已接入授权职位" : "职位推荐";
  const configured = meta.configuredProviders?.length ? `已配置：${meta.configuredProviders.join("、")}` : "可配置授权职位 API 后替换";
  const successful = meta.successfulProviders?.length ? `已返回：${meta.successfulProviders.join("、")}` : "";
  const failed = meta.failedProviders?.length ? `异常：${meta.failedProviders.map((item) => item.provider).join("、")}` : "";
  const sourceNote = meta.mode === "live"
    ? meta.note
    : "当前先展示与目标岗位匹配的职位推荐，同时保留 Boss直聘、猎聘、51job、LinkedIn 的搜索入口。";

  jobSourceSummary.innerHTML = `
    <div>
      <strong>${h(statusLabel)}</strong>
      <p>${h(sourceNote || "")}</p>
      <small>${h([configured, successful, failed].filter(Boolean).join(" · "))}</small>
    </div>
    <div class="source-links">
      ${(meta.searchLinks || []).map((link) => `
        <a href="${h(link.url)}" target="_blank" rel="noreferrer">${h(link.name)}</a>
      `).join("")}
    </div>
  `;
}

function renderJobs() {
  if (!state.result) return;
  const city = filterCity.value || "all";
  const minSalary = Number(filterSalary.value || 0);
  const size = filterSize.value || "all";
  const jobs = state.result.jobs.filter((job) => {
    const cityMatch = city === "all" || job.city === city;
    const salaryMatch = !minSalary || job.salaryMax >= minSalary || !job.salaryMax;
    const sizeMatch = size === "all" || job.companySize === size;
    return cityMatch && salaryMatch && sizeMatch;
  });

  jobsList.innerHTML = jobs.length ? jobs.map((job) => `
    <article class="job-card">
      <div>
        <p class="stage-label">${h(getJobMetaLine(job))}</p>
        <h4>${h(job.title)}</h4>
        <p>${h(job.company)}</p>
      </div>
      <div class="job-meta">
        <strong>${h(job.salaryRange)}</strong>
        <span>截止 ${h(job.deadline)}</span>
      </div>
      <div class="mini-tags">
        ${job.tags.map((tag) => `<span>${h(tag)}</span>`).join("")}
      </div>
      <a class="secondary-button" href="${h(job.applyUrl)}" target="_blank" rel="noreferrer">查看职位</a>
    </article>
  `).join("") : `<p class="empty-note">当前筛选下没有职位，调整城市、薪资或公司规模后再看。</p>`;
}

function getJobMetaLine(job) {
  const parts = [job.city, job.companySize].filter(Boolean);
  if (job.isLive && job.sourceName) parts.push(job.sourceName);
  return parts.join(" · ");
}

function renderRoleOptions() {
  roleOptionsList.innerHTML = roleOptions.map((role) => `<option value="${h(role)}"></option>`).join("");
}

function difficultyClass(value) {
  if (value === "低") return "is-low";
  if (value === "中") return "is-mid";
  return "is-high";
}

function h(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
