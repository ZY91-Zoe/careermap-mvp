const providerConfigs = [
  {
    id: "boss",
    name: "Boss直聘",
    endpointEnv: "BOSS_JOBS_ENDPOINT",
    tokenEnv: "BOSS_API_KEY",
    searchUrl: ({ keyword }) => `https://www.zhipin.com/web/geek/job?query=${encodeURIComponent(keyword)}`
  },
  {
    id: "liepin",
    name: "猎聘",
    endpointEnv: "LIEPIN_JOBS_ENDPOINT",
    tokenEnv: "LIEPIN_API_KEY",
    searchUrl: ({ keyword }) => `https://www.liepin.com/zhaopin/?key=${encodeURIComponent(keyword)}`
  },
  {
    id: "job51",
    name: "前程无忧/51job",
    endpointEnv: "JOB51_JOBS_ENDPOINT",
    tokenEnv: "JOB51_API_KEY",
    searchUrl: ({ keyword }) => `https://we.51job.com/pc/search?keyword=${encodeURIComponent(keyword)}&searchType=2&sortType=0`
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    endpointEnv: "LINKEDIN_JOBS_ENDPOINT",
    tokenEnv: "LINKEDIN_API_KEY",
    searchUrl: ({ keyword, city }) => {
      const params = new URLSearchParams({ keywords: keyword, location: city || "China" });
      return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
    }
  }
];

const requestTimeoutMs = 7000;

export function getJobSourceHealth() {
  const providers = providerConfigs.map((provider) => ({
    id: provider.id,
    name: provider.name,
    configured: Boolean(process.env[provider.endpointEnv]),
    endpointEnv: provider.endpointEnv
  }));

  return {
    mode: process.env.JOB_SOURCE_MODE || "mock",
    configuredCount: providers.filter((provider) => provider.configured).length,
    providers
  };
}

export async function attachJobData(result, input) {
  const targetRole = result.summary?.targetRole || input.targetRole || input.currentRole;
  const city = input.city || "全国";
  const searchLinks = buildPlatformSearchLinks(targetRole, city);
  const configuredProviders = providerConfigs.filter((provider) => Boolean(process.env[provider.endpointEnv]));
  const sourceMeta = {
    mode: "mock",
    targetRole,
    city,
    configuredProviders: configuredProviders.map((provider) => provider.name),
    successfulProviders: [],
    failedProviders: [],
    searchLinks,
    note: "未配置授权职位数据源，当前展示职位推荐和平台搜索入口。"
  };

  if (!configuredProviders.length || process.env.JOB_SOURCE_MODE === "mock") {
    result.jobs = markFallbackJobs(result.jobs);
    result.jobsMeta = sourceMeta;
    return {
      result,
      warnings: ["No authorized job API endpoints configured; using structured mock jobs."]
    };
  }

  const settled = await Promise.allSettled(
    configuredProviders.map((provider) => fetchProviderJobs(provider, targetRole, city))
  );

  const liveJobs = [];
  settled.forEach((item, index) => {
    const provider = configuredProviders[index];
    if (item.status === "fulfilled" && item.value.jobs.length) {
      sourceMeta.successfulProviders.push(provider.name);
      liveJobs.push(...item.value.jobs);
      return;
    }

    sourceMeta.failedProviders.push({
      provider: provider.name,
      reason: item.status === "fulfilled" ? "No jobs returned" : sanitizeError(item.reason)
    });
  });

  if (!liveJobs.length) {
    result.jobs = markFallbackJobs(result.jobs);
    result.jobsMeta = {
      ...sourceMeta,
      note: "授权职位接口未返回可用数据，当前展示职位推荐和平台搜索入口。"
    };
    return {
      result,
      warnings: ["Configured job APIs returned no usable jobs; using structured mock jobs."]
    };
  }

  result.jobs = dedupeJobs(liveJobs)
    .slice(0, 24)
    .concat(markFallbackJobs(result.jobs).slice(0, Math.max(0, 8 - liveJobs.length)));
  result.jobsMeta = {
    ...sourceMeta,
    mode: "live",
    note: sourceMeta.failedProviders.length
      ? "已展示授权接口返回的真实职位；部分平台未返回数据。"
      : "已展示授权接口返回的真实职位。"
  };

  return { result, warnings: [] };
}

function buildPlatformSearchLinks(keyword, city) {
  return providerConfigs.map((provider) => ({
    id: provider.id,
    name: provider.name,
    url: provider.searchUrl({ keyword, city })
  }));
}

async function fetchProviderJobs(provider, keyword, city) {
  const endpoint = process.env[provider.endpointEnv];
  const token = process.env[provider.tokenEnv] || process.env.JOBS_API_KEY || "";
  const url = new URL(endpoint);
  url.searchParams.set("keyword", keyword);
  url.searchParams.set("city", city);
  url.searchParams.set("platform", provider.id);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    const response = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    const rawJobs = extractJobsArray(payload);
    return {
      provider: provider.name,
      jobs: rawJobs
        .map((job, index) => normalizeJob(job, provider, index))
        .filter(Boolean)
    };
  } finally {
    clearTimeout(timeout);
  }
}

function extractJobsArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.jobs)) return payload.jobs;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

function normalizeJob(raw, provider, index) {
  const title = pickText(raw, ["title", "jobTitle", "name", "positionName", "job_name"]);
  const company = pickText(raw, ["company", "companyName", "company_name", "employer"]);
  const city = pickText(raw, ["city", "location", "workCity", "work_city"], "未标注");
  const applyUrl = pickText(raw, ["applyUrl", "url", "link", "jobUrl", "job_url"]);

  if (!title || !company || !applyUrl) return null;

  const salaryRange = pickText(raw, ["salaryRange", "salary", "salaryText", "compensation"], "面议");
  const companySize = pickText(raw, ["companySize", "size", "companyScale", "scale"], "未标注");
  const deadline = pickText(raw, ["deadline", "expireDate", "endDate", "updatedAt"], "滚动招聘");
  const tags = Array.isArray(raw.tags) ? raw.tags : [];

  return {
    id: `${provider.id}-${index}-${hashText(`${title}-${company}-${applyUrl}`)}`,
    company,
    title,
    salaryMin: Number(raw.salaryMin || raw.salary_min || 0),
    salaryMax: Number(raw.salaryMax || raw.salary_max || 0),
    salaryRange,
    city,
    companySize,
    deadline,
    applyUrl,
    tags: [...tags.slice(0, 2), provider.name, "真实数据"],
    source: provider.id,
    sourceName: provider.name,
    isLive: true
  };
}

function markFallbackJobs(jobs = []) {
  return jobs.map((job) => ({
    ...job,
    source: "mock",
    isLive: false
  }));
}

function dedupeJobs(jobs) {
  const seen = new Set();
  return jobs.filter((job) => {
    const key = `${job.company}-${job.title}-${job.city}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function pickText(source, keys, fallback = "") {
  for (const key of keys) {
    const value = source?.[key];
    if (value !== undefined && value !== null && String(value).trim()) {
      return String(value).trim();
    }
  }
  return fallback;
}

function hashText(text) {
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}

function sanitizeError(error) {
  const message = error?.name === "AbortError" ? "Request timeout" : String(error?.message || error || "Unknown error");
  return message.slice(0, 120);
}
