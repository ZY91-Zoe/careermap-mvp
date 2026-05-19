import { assessmentQuestions, buildCareerMap, getDefaultInput, roleOptions } from "./planner.js";

const state = {
  result: null,
  loading: false,
  dataMode: "local",
  educationRows: []
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
const backendStatus = document.querySelector("#backend-status");
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
const activeTarget = document.querySelector("#active-target");
const verticalNote = document.querySelector("#vertical-note");
const verticalPath = document.querySelector("#vertical-path");
const horizontalPaths = document.querySelector("#horizontal-paths");
const gapReport = document.querySelector("#gap-report");
const timelineLabel = document.querySelector("#timeline-label");
const jobsList = document.querySelector("#jobs-list");
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
  generatePlan();
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
    if (!state.educationRows.length) state.educationRows.push({ degree: "", school: "", major: "", period: "" });
    renderEducationRows();
  });

  educationList.addEventListener("input", syncEducationRowsFromDom);

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-target-role]");
    if (!button) return;
    targetRoleInput.value = button.dataset.targetRole;
    switchView("planner-view");
    generatePlan({ targetRole: button.dataset.targetRole });
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
  state.educationRows = input.educationHistory?.length ? structuredClone(input.educationHistory) : [{ degree: "", school: "", major: "", period: "" }];
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
    state.dataMode = "local-fallback";
  } finally {
    setLoading(false);
    renderPlanner();
  }
}

function runAssessment() {
  const assessment = collectAssessment();
  const result = buildCareerMap(collectInput({ targetRole: "", assessment }));
  renderAssessmentOutput(result.assessment);
}

function setLoading(isLoading) {
  state.loading = isLoading;
  submitButton.disabled = isLoading;
  submitLabel.textContent = isLoading ? "生成中..." : "生成路径";
}

function renderPlanner() {
  if (!state.result) return;
  renderSummary();
  renderPaths();
  renderGapReport();
  renderJobFilters();
  renderJobs();
  backendStatus.textContent = state.dataMode === "simulated-ai" ? "结构化模拟 AI" : "本地生成器";
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

  horizontalPaths.innerHTML = state.result.horizontalPaths.map((path) => `
    <article class="role-card">
      <div class="role-card-top">
        <div>
          <p class="stage-label">迁移难度：${h(path.difficulty)}</p>
          <h4>${h(path.role)}</h4>
        </div>
        <span class="difficulty ${difficultyClass(path.difficulty)}">${h(path.difficulty)}</span>
      </div>
      <p>${h(path.fitReason)}</p>
      <p class="muted">${h(path.salaryRange)} · ${h(path.companyTypes.slice(0, 2).join(" / "))}</p>
      <div class="mini-tags">
        ${path.transferSignals.map((item) => `<span>${h(item)}</span>`).join("")}
      </div>
      <button type="button" class="secondary-button" data-target-role="${h(path.role)}">分析差距</button>
    </article>
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

function renderJobs() {
  if (!state.result) return;
  const city = filterCity.value || "all";
  const minSalary = Number(filterSalary.value || 0);
  const size = filterSize.value || "all";
  const jobs = state.result.jobs.filter((job) => {
    const cityMatch = city === "all" || job.city === city;
    const salaryMatch = !minSalary || job.salaryMax >= minSalary;
    const sizeMatch = size === "all" || job.companySize === size;
    return cityMatch && salaryMatch && sizeMatch;
  });

  jobsList.innerHTML = jobs.length ? jobs.map((job) => `
    <article class="job-card">
      <div>
        <p class="stage-label">${h(job.city)} · ${h(job.companySize)}</p>
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

function switchView(viewId) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("is-hidden", view.id !== viewId);
  });
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === viewId);
  });
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
