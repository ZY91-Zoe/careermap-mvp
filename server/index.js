import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { buildCareerMap, normalizeCareerInput } from "../src/planner.js";
import { attachJobData, getJobSourceHealth } from "./services/jobs.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = resolve(__dirname, "..");
const port = Number(process.env.PORT || 5173);
const host = process.env.HOST || "127.0.0.1";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".md": "text/markdown; charset=utf-8"
};

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host || `${host}:${port}`}`);

    if (request.method === "GET" && url.pathname === "/api/health") {
      return sendJson(response, 200, {
        ok: true,
        service: "careermap-mvp",
        version: "0.5.0",
        aiProviderConfigured: Boolean(process.env.OPENAI_API_KEY || process.env.CLAUDE_API_KEY),
        jobSources: getJobSourceHealth(),
        dataMode: "simulated-ai",
        timestamp: new Date().toISOString()
      });
    }

    if (request.method === "POST" && url.pathname === "/api/career-plan") {
      const body = await readJsonBody(request, response);
      if (!body) return;

      const input = normalizeCareerInput(body);
      const result = buildCareerMap(input);
      const jobData = await attachJobData(result, input);

      return sendJson(response, 200, {
        ok: true,
        generatedAt: new Date().toISOString(),
        dataMode: "simulated-ai",
        warnings: [
          "MVP uses deterministic structured career generation. The API shape is ready for a real LLM provider.",
          ...jobData.warnings
        ],
        result: jobData.result
      });
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return sendJson(response, 405, { ok: false, error: "Method not allowed" });
    }

    return serveStatic(url.pathname, request, response);
  } catch (error) {
    console.error(error);
    return sendJson(response, 500, {
      ok: false,
      error: "Internal server error"
    });
  }
});

server.listen(port, host, () => {
  console.log(`CareerMap is running at http://${host}:${port}`);
});

async function readJsonBody(request, response) {
  let body = "";
  try {
    for await (const chunk of request) {
      body += chunk;
      if (body.length > 64 * 1024) {
        sendJson(response, 413, { ok: false, error: "Request body too large" });
        return null;
      }
    }
    return body ? JSON.parse(body) : {};
  } catch {
    sendJson(response, 400, { ok: false, error: "Invalid JSON body" });
    return null;
  }
}

async function serveStatic(pathname, request, response) {
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const safePath = normalize(decodeURIComponent(requestedPath)).replace(/^(\.\.[/\\])+/, "");
  const filePath = resolve(join(projectRoot, safePath));

  if (!filePath.startsWith(projectRoot)) {
    return sendJson(response, 403, { ok: false, error: "Forbidden" });
  }

  try {
    const fileStats = await stat(filePath);
    if (!fileStats.isFile()) {
      return sendJson(response, 404, { ok: false, error: "Not found" });
    }

    const data = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream",
      "Content-Length": data.length,
      "Cache-Control": "no-store"
    });
    if (request.method === "HEAD") return response.end();
    return response.end(data);
  } catch {
    return sendJson(response, 404, { ok: false, error: "Not found" });
  }
}

function sendJson(response, statusCode, payload) {
  const data = JSON.stringify(payload);
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(data),
    "Cache-Control": "no-store"
  });
  response.end(data);
}
