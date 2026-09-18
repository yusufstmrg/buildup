"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/ai.ts
var ai_exports = {};
__export(ai_exports, {
  generateHealthCheckAnalysis: () => generateHealthCheckAnalysis,
  generateStrategicAnalysis: () => generateStrategicAnalysis,
  getAIClient: () => getAIClient
});
function getAIClient() {
  if (!aiClient) {
    const projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT || process.env.GCP_PROJECT || "gen-lang-client-0028648175";
    const location = process.env.GOOGLE_CLOUD_LOCATION || "asia-southeast1";
    if (process.env.GEMINI_API_KEY) {
      console.log("Initializing BuildUp AI Gateway via API Key.");
      aiClient = new import_genai.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } else {
      console.log(`Initializing BuildUp AI Gateway via Vertex AI on project: ${projectId}`);
      aiClient = new import_genai.GoogleGenAI({
        vertexai: {
          project: projectId,
          location
        }
      });
    }
  }
  return aiClient;
}
async function generateStrategicAnalysis(scenario, companyContext) {
  const ai = getAIClient();
  const prompt = `
You are the elite "BuildUp AI Executive", an uncompromising, razor-sharp Business Intelligence engine for a mid-market conglomerate.
Analyze the following business scenario and provide a highly structured, actionable strategic response.
Focus ruthlessly on EBITDA expansion, working capital optimization, cash flow protection, and compliance.
Do not use fluff or generic advice. Be specific, mathematical, and decisive.

Company Context:
Industry: ${companyContext.industry || "Unknown"}
Revenue: ${companyContext.revenue || "Unknown"}
Employees: ${companyContext.employeeCount || "Unknown"}

User Scenario / Query:
"${scenario}"
`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            executiveSummary: {
              type: import_genai.Type.STRING,
              description: "A 2-3 sentence ruthless summary of the situation and the required strategic posture."
            },
            financialImpact: {
              type: import_genai.Type.OBJECT,
              properties: {
                ebitdaImpact: { type: import_genai.Type.STRING, description: "Estimated impact on EBITDA (e.g., 'Risk of 2.4% contraction' or 'Potential $1.2M gain')" },
                cashflowImpact: { type: import_genai.Type.STRING, description: "Estimated impact on Cash Flow and Working Capital" }
              },
              required: ["ebitdaImpact", "cashflowImpact"]
            },
            recommendedActions: {
              type: import_genai.Type.ARRAY,
              items: {
                type: import_genai.Type.OBJECT,
                properties: {
                  department: { type: import_genai.Type.STRING, description: "e.g., Procurement, Finance, Operations" },
                  action: { type: import_genai.Type.STRING, description: "The specific, immediate action to take" },
                  priority: { type: import_genai.Type.STRING, description: "CRITICAL, HIGH, or MEDIUM" }
                },
                required: ["department", "action", "priority"]
              },
              description: "3-5 immediate operational directives."
            },
            riskAssessment: {
              type: import_genai.Type.ARRAY,
              items: {
                type: import_genai.Type.OBJECT,
                properties: {
                  risk: { type: import_genai.Type.STRING },
                  severity: { type: import_genai.Type.STRING, description: "HIGH, MEDIUM, LOW" }
                },
                required: ["risk", "severity"]
              }
            }
          },
          required: ["executiveSummary", "financialImpact", "recommendedActions", "riskAssessment"]
        }
      }
    });
    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("Failed to generate strategic analysis.");
  } catch (error) {
    console.error("AI Gateway Execution Error:", error);
    throw error;
  }
}
async function generateHealthCheckAnalysis(fileData) {
  const ai = getAIClient();
  const prompt = `
You are the elite "BuildUp AI Executive", an uncompromising Business Intelligence engine.
A prospective client has uploaded their financial data or context file for a 'Health Check'.
Here is the extracted text from their file:
---
${fileData.substring(0, 5e3)}
---
Analyze this data ruthlessly. Estimate a 'Business Health Score' from 0 to 100 based on standard metrics (liquidity, profitability, efficiency).
If the data is unclear or insufficient, make a highly educated, aggressive guess assuming typical SME inefficiencies, and give a score between 45 and 75.
Also, provide 3 key findings (value leakages) and 1 immediate recommendation.

Return ONLY a JSON object with this exact structure (no markdown formatting around it, just raw JSON):
{
  "score": 68,
  "findings": ["Finding 1", "Finding 2", "Finding 3"],
  "recommendation": "Recommendation text here"
}
`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.1,
        responseMimeType: "application/json"
      }
    });
    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("Failed to generate health check analysis.");
  } catch (error) {
    console.error("AI Health Check Error:", error);
    throw error;
  }
}
var import_genai, aiClient;
var init_ai = __esm({
  "src/services/ai.ts"() {
    "use strict";
    import_genai = require("@google/genai");
    aiClient = null;
  }
});

// server.ts
var server_exports = {};
__export(server_exports, {
  buildup_api: () => buildup_api
});
module.exports = __toCommonJS(server_exports);
var import_express = __toESM(require("express"), 1);

// src/lib/firebase-admin.ts
var import_app = require("firebase-admin/app");
var import_auth = require("firebase-admin/auth");

// firebase-applet-config.json
var firebase_applet_config_default = {
  projectId: "gen-lang-client-0028648175",
  appId: "1:490067374105:web:8e301c121f04817f603a88",
  apiKey: "AIzaSyDaLMtBGwq4XkFBQkd-n_qif98lpj6v1IQ",
  authDomain: "gen-lang-client-0028648175.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-buildup-17db4bc9-297c-40db-a893-24ea684ff654",
  storageBucket: "gen-lang-client-0028648175.firebasestorage.app",
  messagingSenderId: "490067374105",
  measurementId: "",
  oAuthClientId: "490067374105-ohfeu30hce2b2gi6uaav1m2cp4i3dknv.apps.googleusercontent.com",
  recaptchaSiteKey: ""
};

// src/lib/firebase-admin.ts
if (!(0, import_app.getApps)().length) {
  (0, import_app.initializeApp)({
    projectId: firebase_applet_config_default.projectId
  });
}
var adminAuth = (0, import_auth.getAuth)();

// src/middleware/auth.ts
var requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }
  const token = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

// src/db/index.ts
var import_node_postgres = require("drizzle-orm/node-postgres");
var import_pg = require("pg");

// src/db/schema.ts
var schema_exports = {};
__export(schema_exports, {
  healthChecks: () => healthChecks,
  organizations: () => organizations,
  users: () => users
});
var import_pg_core = require("drizzle-orm/pg-core");
var users = (0, import_pg_core.pgTable)("users", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  uid: (0, import_pg_core.text)("uid").notNull().unique(),
  // Firebase Auth UID
  email: (0, import_pg_core.text)("email").notNull(),
  name: (0, import_pg_core.text)("name"),
  companyName: (0, import_pg_core.text)("company_name"),
  role: (0, import_pg_core.text)("role").default("user"),
  // 'user', 'admin'
  plan: (0, import_pg_core.text)("plan").default("Free"),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
});
var organizations = (0, import_pg_core.pgTable)("organizations", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  name: (0, import_pg_core.text)("name").notNull(),
  industry: (0, import_pg_core.text)("industry"),
  revenue: (0, import_pg_core.text)("revenue"),
  employeeCount: (0, import_pg_core.integer)("employee_count"),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
});
var healthChecks = (0, import_pg_core.pgTable)("health_checks", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  userId: (0, import_pg_core.integer)("user_id").references(() => users.id).notNull(),
  score: (0, import_pg_core.integer)("score").notNull(),
  dsoDays: (0, import_pg_core.integer)("dso_days"),
  revenueLeakage: (0, import_pg_core.text)("revenue_leakage"),
  status: (0, import_pg_core.text)("status").default("completed"),
  // completed, pending
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow()
});

// src/db/index.ts
var createPool = () => {
  if (!global._postgresPool) {
    global._postgresPool = new import_pg.Pool({
      host: process.env.SQL_HOST,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DB_NAME,
      max: 10,
      connectionTimeoutMillis: 15e3
    });
    global._postgresPool.on("error", (err) => {
      console.error("Unexpected error on idle SQL pool client:", err);
    });
  }
  return global._postgresPool;
};
var pool = createPool();
var db = (0, import_node_postgres.drizzle)(pool, { schema: schema_exports });

// src/db/users.ts
async function getOrCreateUser(uid, email, name) {
  try {
    const result = await db.insert(users).values({ uid, email, name: name || "BuildUp User" }).onConflictDoUpdate({
      target: users.uid,
      set: { email }
    }).returning();
    return result[0];
  } catch (error) {
    console.error("Database query failed:", error);
    throw new Error(`Database query failed. Please try again later. ${error?.message || ""}`);
  }
}
async function getAllUsers() {
  try {
    return await db.select().from(users);
  } catch (error) {
    console.error("Database query failed:", error);
    throw new Error(`Database query failed. ${error?.message || ""}`);
  }
}

// server.ts
var import_https = require("firebase-functions/v2/https");
var app = (0, import_express.default)();
app.use(import_express.default.json());
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "BuildUp OS Backend Running" });
});
app.post("/api/auth/sync", requireAuth, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const user = await getOrCreateUser(req.user.uid, req.user.email || "", req.user.name);
    res.json({ success: true, user });
  } catch (error) {
    console.error("User sync error:", error);
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/admin/users", requireAuth, async (req, res) => {
  try {
    const users2 = await getAllUsers();
    res.json({ users: users2 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/ai/strategic-analysis", async (req, res) => {
  try {
    const { scenario, companyContext } = req.body;
    if (!scenario) {
      return res.status(400).json({ error: "Scenario is required." });
    }
    const { generateStrategicAnalysis: generateStrategicAnalysis2 } = await Promise.resolve().then(() => (init_ai(), ai_exports));
    const analysis = await generateStrategicAnalysis2(scenario, companyContext || {});
    res.json({ success: true, analysis });
  } catch (error) {
    console.error("AI Generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI analysis." });
  }
});
app.post("/api/ai/health-check", async (req, res) => {
  try {
    const { fileData } = req.body;
    if (!fileData) {
      return res.status(400).json({ error: "File data is required." });
    }
    const { generateHealthCheckAnalysis: generateHealthCheckAnalysis2 } = await Promise.resolve().then(() => (init_ai(), ai_exports));
    const analysis = await generateHealthCheckAnalysis2(fileData);
    res.json({ success: true, analysis });
  } catch (error) {
    console.error("AI Generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI analysis." });
  }
});
var buildup_api = (0, import_https.onRequest)({ region: "asia-southeast1", memory: "1GiB" }, app);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildup_api
});
//# sourceMappingURL=server.cjs.map
