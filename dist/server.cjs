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

// firebase-applet-config.json
var firebase_applet_config_default;
var init_firebase_applet_config = __esm({
  "firebase-applet-config.json"() {
    firebase_applet_config_default = {
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
  }
});

// src/lib/firebase-admin.ts
var firebase_admin_exports = {};
__export(firebase_admin_exports, {
  adminAuth: () => adminAuth,
  adminDb: () => adminDb
});
var import_app, import_auth, import_firestore, adminAuth, adminDb;
var init_firebase_admin = __esm({
  "src/lib/firebase-admin.ts"() {
    "use strict";
    import_app = require("firebase-admin/app");
    import_auth = require("firebase-admin/auth");
    import_firestore = require("firebase-admin/firestore");
    init_firebase_applet_config();
    if (!(0, import_app.getApps)().length) {
      (0, import_app.initializeApp)({
        projectId: firebase_applet_config_default.projectId
      });
    }
    adminAuth = (0, import_auth.getAuth)();
    adminDb = (0, import_firestore.getFirestore)();
  }
});

// src/db/users.ts
var users_exports = {};
__export(users_exports, {
  createOrganization: () => createOrganization,
  getAllUsers: () => getAllUsers,
  getOrCreateUser: () => getOrCreateUser,
  getOrganizationsForUser: () => getOrganizationsForUser
});
async function getOrCreateUser(uid, email, name) {
  const userRef = adminDb.collection("users").doc(uid);
  const userSnap = await userRef.get();
  if (!userSnap.exists) {
    const newUser = {
      id: uid,
      email,
      name,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    await userRef.set(newUser);
    return newUser;
  }
  return userSnap.data();
}
async function getAllUsers() {
  const snapshot = await adminDb.collection("users").get();
  return snapshot.docs.map((doc) => doc.data());
}
async function createOrganization(orgId, name, ownerUid) {
  const orgRef = adminDb.collection("organizations").doc(orgId);
  const orgData = {
    id: orgId,
    name,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  await orgRef.set(orgData);
  const membershipRef = adminDb.collection("memberships").doc(`${ownerUid}_${orgId}`);
  await membershipRef.set({
    userId: ownerUid,
    orgId,
    role: "owner",
    joinedAt: (/* @__PURE__ */ new Date()).toISOString()
  });
  return orgData;
}
async function getOrganizationsForUser(uid) {
  const membershipsSnap = await adminDb.collection("memberships").where("userId", "==", uid).get();
  if (membershipsSnap.empty) return [];
  const orgIds = membershipsSnap.docs.map((doc) => doc.data().orgId);
  const orgs = await Promise.all(
    orgIds.map(async (orgId) => {
      const orgDoc = await adminDb.collection("organizations").doc(orgId).get();
      return orgDoc.data();
    })
  );
  return orgs.filter(Boolean);
}
var init_users = __esm({
  "src/db/users.ts"() {
    "use strict";
    init_firebase_admin();
  }
});

// src/db/genome.ts
var genome_exports = {};
__export(genome_exports, {
  getBusinessGenome: () => getBusinessGenome,
  updateBusinessGenome: () => updateBusinessGenome
});
async function getBusinessGenome(orgId) {
  const snapshot = await adminDb.collection("organizations").doc(orgId).collection("genomes").orderBy("version", "desc").limit(1).get();
  if (snapshot.empty) return null;
  return snapshot.docs[0].data();
}
async function updateBusinessGenome(orgId, updates) {
  const current = await getBusinessGenome(orgId);
  const newVersion = current ? current.version + 1 : 1;
  const newGenome = {
    orgId,
    version: newVersion,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    businessModel: updates.businessModel || current?.businessModel || "",
    coreWorkflows: updates.coreWorkflows || current?.coreWorkflows || [],
    keyRisks: updates.keyRisks || current?.keyRisks || [],
    strategicObjectives: updates.strategicObjectives || current?.strategicObjectives || [],
    supplyChainStructure: updates.supplyChainStructure || current?.supplyChainStructure,
    competitors: updates.competitors || current?.competitors,
    marketPosition: updates.marketPosition || current?.marketPosition
  };
  await adminDb.collection("organizations").doc(orgId).collection("genomes").doc(`v${newVersion}`).set(newGenome);
  return newGenome;
}
var init_genome = __esm({
  "src/db/genome.ts"() {
    "use strict";
    init_firebase_admin();
  }
});

// src/db/commercial.ts
var commercial_exports = {};
__export(commercial_exports, {
  getEntitlement: () => getEntitlement,
  logMetering: () => logMetering
});
async function getEntitlement(orgId) {
  const snapshot = await adminDb.collection("organizations").doc(orgId).collection("entitlements").limit(1).get();
  if (snapshot.empty) return null;
  return snapshot.docs[0].data();
}
async function logMetering(orgId, resourceType, quantity, costEstimate) {
  const log = {
    id: `log_${crypto.randomUUID()}`,
    orgId,
    resourceType,
    quantity,
    costEstimate,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
  await adminDb.collection("organizations").doc(orgId).collection("metering_logs").doc(log.id).set(log);
}
var crypto;
var init_commercial = __esm({
  "src/db/commercial.ts"() {
    "use strict";
    init_firebase_admin();
    crypto = __toESM(require("crypto"), 1);
  }
});

// src/services/gateway.ts
var gateway_exports = {};
__export(gateway_exports, {
  getAIClient: () => getAIClient,
  runAITask: () => runAITask
});
function getAIClient() {
  if (!aiClient) {
    const projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT || process.env.GCP_PROJECT || "gen-lang-client-0028648175";
    const location = process.env.GOOGLE_CLOUD_LOCATION || "asia-southeast1";
    if (process.env.GEMINI_API_KEY) {
      aiClient = new import_genai.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } else {
      aiClient = new import_genai.GoogleGenAI({
        vertexai: true,
        project: projectId,
        location
      });
    }
  }
  return aiClient;
}
async function runAITask(orgId, taskType, payload) {
  const startTime = Date.now();
  const ai = getAIClient();
  const genome = await getBusinessGenome(orgId);
  const model = taskType === "strategic_analysis" || taskType === "decision_proposal" ? "gemini-2.5-pro" : "gemini-2.5-flash";
  const systemContext = `
You are the elite "BuildUp AI Executive".
Company Context (from Business Genome):
Business Model: ${genome?.businessModel || "Unknown"}
Core Workflows: ${genome?.coreWorkflows?.join(", ") || "Unknown"}
Strategic Objectives: ${genome?.strategicObjectives?.join(", ") || "Unknown"}
Key Risks: ${genome?.keyRisks?.join(", ") || "Unknown"}
`;
  let prompt = "";
  let responseSchema = null;
  if (taskType === "strategic_analysis") {
    prompt = `${systemContext}
Analyze scenario: ${payload.scenario}`;
    responseSchema = {
      type: import_genai.Type.OBJECT,
      properties: {
        executiveSummary: { type: import_genai.Type.STRING },
        financialImpact: {
          type: import_genai.Type.OBJECT,
          properties: {
            ebitdaImpact: { type: import_genai.Type.STRING },
            cashflowImpact: { type: import_genai.Type.STRING }
          }
        },
        recommendedActions: {
          type: import_genai.Type.ARRAY,
          items: {
            type: import_genai.Type.OBJECT,
            properties: {
              department: { type: import_genai.Type.STRING },
              action: { type: import_genai.Type.STRING },
              priority: { type: import_genai.Type.STRING }
            }
          }
        }
      }
    };
  } else if (taskType === "health_check") {
    prompt = `${systemContext}
Perform health check on this data:
${payload.fileData}`;
    responseSchema = {
      type: import_genai.Type.OBJECT,
      properties: {
        score: { type: import_genai.Type.INTEGER },
        findings: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
        rootCauses: {
          type: import_genai.Type.ARRAY,
          items: {
            type: import_genai.Type.OBJECT,
            properties: {
              symptom: { type: import_genai.Type.STRING },
              cause: { type: import_genai.Type.STRING },
              driver: { type: import_genai.Type.STRING },
              confidence: { type: import_genai.Type.NUMBER }
            }
          }
        }
      }
    };
  } else if (taskType === "decision_proposal") {
    prompt = `${systemContext}
Propose structured decision for: ${payload.problem}`;
    responseSchema = {
      type: import_genai.Type.OBJECT,
      properties: {
        title: { type: import_genai.Type.STRING },
        domain: { type: import_genai.Type.STRING },
        problemContext: { type: import_genai.Type.STRING },
        recommendation: { type: import_genai.Type.STRING },
        confidence: { type: import_genai.Type.NUMBER },
        approvalAuthority: { type: import_genai.Type.STRING },
        options: {
          type: import_genai.Type.ARRAY,
          items: {
            type: import_genai.Type.OBJECT,
            properties: {
              label: { type: import_genai.Type.STRING },
              financialImpact: { type: import_genai.Type.STRING },
              risk: { type: import_genai.Type.STRING },
              effort: { type: import_genai.Type.STRING }
            }
          }
        }
      }
    };
  }
  let result = null;
  let status = "success";
  let usage = { promptTokens: 0, completionTokens: 0 };
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema
      }
    });
    if (response.text) {
      result = JSON.parse(response.text);
      if (response.usageMetadata) {
        usage.promptTokens = response.usageMetadata.promptTokenCount || 0;
        usage.completionTokens = response.usageMetadata.candidatesTokenCount || 0;
      }
    } else {
      throw new Error("Empty response from model");
    }
  } catch (error) {
    status = "error";
    console.error("Gateway AI Error:", error);
    throw error;
  } finally {
    const runId = `run_${crypto2.randomUUID()}`;
    const agentRun = {
      id: runId,
      orgId,
      taskType,
      modelUsed: model,
      promptTokens: usage.promptTokens,
      completionTokens: usage.completionTokens,
      costEstimate: 0,
      // In production, calculate based on model pricing
      durationMs: Date.now() - startTime,
      status,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    adminDb.collection("organizations").doc(orgId).collection("agent_runs").doc(runId).set(agentRun).catch(console.error);
    const { logMetering: logMetering2 } = await Promise.resolve().then(() => (init_commercial(), commercial_exports));
    logMetering2(orgId, "AI_Tokens", usage.promptTokens + usage.completionTokens, 0).catch(console.error);
  }
  return result;
}
var import_genai, crypto2, aiClient;
var init_gateway = __esm({
  "src/services/gateway.ts"() {
    "use strict";
    import_genai = require("@google/genai");
    init_genome();
    init_firebase_admin();
    crypto2 = __toESM(require("crypto"), 1);
    aiClient = null;
  }
});

// src/db/diagnostics.ts
var diagnostics_exports = {};
__export(diagnostics_exports, {
  getDiagnostics: () => getDiagnostics,
  saveDiagnostic: () => saveDiagnostic
});
async function saveDiagnostic(orgId, data) {
  const id = `diag_${crypto3.randomUUID()}`;
  const diagnostic = {
    ...data,
    id,
    orgId,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  await adminDb.collection("organizations").doc(orgId).collection("diagnostics").doc(id).set(diagnostic);
  return diagnostic;
}
async function getDiagnostics(orgId) {
  const snapshot = await adminDb.collection("organizations").doc(orgId).collection("diagnostics").orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc) => doc.data());
}
var crypto3;
var init_diagnostics = __esm({
  "src/db/diagnostics.ts"() {
    "use strict";
    init_firebase_admin();
    crypto3 = __toESM(require("crypto"), 1);
  }
});

// src/db/metrics.ts
var metrics_exports = {};
__export(metrics_exports, {
  getMetric: () => getMetric,
  getMetrics: () => getMetrics,
  upsertMetric: () => upsertMetric
});
async function upsertMetric(orgId, metric) {
  const fullMetric = {
    ...metric,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  await adminDb.collection("organizations").doc(orgId).collection("metrics").doc(metric.id).set(fullMetric);
  return fullMetric;
}
async function getMetrics(orgId) {
  const snapshot = await adminDb.collection("organizations").doc(orgId).collection("metrics").get();
  return snapshot.docs.map((doc) => doc.data());
}
async function getMetric(orgId, metricId) {
  const doc = await adminDb.collection("organizations").doc(orgId).collection("metrics").doc(metricId).get();
  if (!doc.exists) return null;
  return doc.data();
}
var init_metrics = __esm({
  "src/db/metrics.ts"() {
    "use strict";
    init_firebase_admin();
  }
});

// src/db/evidence.ts
var evidence_exports = {};
__export(evidence_exports, {
  getAllEvidence: () => getAllEvidence,
  getEvidenceRecord: () => getEvidenceRecord,
  uploadEvidenceRecord: () => uploadEvidenceRecord
});
async function uploadEvidenceRecord(orgId, evidence) {
  const id = `evd_${crypto4.randomUUID()}`;
  const fullEvidence = {
    ...evidence,
    id,
    orgId,
    uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  await adminDb.collection("organizations").doc(orgId).collection("evidence").doc(id).set(fullEvidence);
  return fullEvidence;
}
async function getEvidenceRecord(orgId, evidenceId) {
  const doc = await adminDb.collection("organizations").doc(orgId).collection("evidence").doc(evidenceId).get();
  if (!doc.exists) return null;
  return doc.data();
}
async function getAllEvidence(orgId) {
  const snapshot = await adminDb.collection("organizations").doc(orgId).collection("evidence").get();
  return snapshot.docs.map((doc) => doc.data());
}
var crypto4;
var init_evidence = __esm({
  "src/db/evidence.ts"() {
    "use strict";
    init_firebase_admin();
    crypto4 = __toESM(require("crypto"), 1);
  }
});

// src/db/decisions.ts
var decisions_exports = {};
__export(decisions_exports, {
  createDecision: () => createDecision,
  getDecisions: () => getDecisions,
  updateDecisionStatus: () => updateDecisionStatus
});
async function createDecision(orgId, data) {
  const id = `dec_${crypto5.randomUUID()}`;
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const decision = {
    ...data,
    id,
    orgId,
    status: "Pending",
    createdAt: now,
    updatedAt: now
  };
  await adminDb.collection("organizations").doc(orgId).collection("decisions").doc(id).set(decision);
  return decision;
}
async function updateDecisionStatus(orgId, decisionId, status) {
  await adminDb.collection("organizations").doc(orgId).collection("decisions").doc(decisionId).update({
    status,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  });
}
async function getDecisions(orgId) {
  const snapshot = await adminDb.collection("organizations").doc(orgId).collection("decisions").orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc) => doc.data());
}
var crypto5;
var init_decisions = __esm({
  "src/db/decisions.ts"() {
    "use strict";
    init_firebase_admin();
    crypto5 = __toESM(require("crypto"), 1);
  }
});

// src/db/initiatives.ts
var initiatives_exports = {};
__export(initiatives_exports, {
  createInitiative: () => createInitiative,
  getInitiatives: () => getInitiatives
});
async function createInitiative(orgId, data) {
  const id = `init_${crypto6.randomUUID()}`;
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const initiative = {
    ...data,
    id,
    orgId,
    status: "Planning",
    tasks: [],
    createdAt: now,
    updatedAt: now
  };
  await adminDb.collection("organizations").doc(orgId).collection("initiatives").doc(id).set(initiative);
  return initiative;
}
async function getInitiatives(orgId) {
  const snapshot = await adminDb.collection("organizations").doc(orgId).collection("initiatives").orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc) => doc.data());
}
var crypto6;
var init_initiatives = __esm({
  "src/db/initiatives.ts"() {
    "use strict";
    init_firebase_admin();
    crypto6 = __toESM(require("crypto"), 1);
  }
});

// src/db/outcomes.ts
var outcomes_exports = {};
__export(outcomes_exports, {
  getOutcomes: () => getOutcomes,
  recordOutcome: () => recordOutcome
});
async function recordOutcome(orgId, data) {
  const id = `out_${crypto7.randomUUID()}`;
  const outcome = {
    ...data,
    id,
    orgId,
    recordedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  await adminDb.collection("organizations").doc(orgId).collection("outcomes").doc(id).set(outcome);
  return outcome;
}
async function getOutcomes(orgId) {
  const snapshot = await adminDb.collection("organizations").doc(orgId).collection("outcomes").orderBy("recordedAt", "desc").get();
  return snapshot.docs.map((doc) => doc.data());
}
var crypto7;
var init_outcomes = __esm({
  "src/db/outcomes.ts"() {
    "use strict";
    init_firebase_admin();
    crypto7 = __toESM(require("crypto"), 1);
  }
});

// src/db/knowledge.ts
var knowledge_exports = {};
__export(knowledge_exports, {
  getBenchmarks: () => getBenchmarks,
  getKnowledgeGraph: () => getKnowledgeGraph
});
async function getKnowledgeGraph() {
  const nodesSnap = await adminDb.collection("knowledge_nodes").get();
  const edgesSnap = await adminDb.collection("knowledge_edges").get();
  return {
    nodes: nodesSnap.docs.map((d) => d.data()),
    edges: edgesSnap.docs.map((d) => d.data())
  };
}
async function getBenchmarks(industry) {
  const snapshot = await adminDb.collection("benchmarks").where("industry", "==", industry).get();
  return snapshot.docs.map((doc) => doc.data());
}
var init_knowledge = __esm({
  "src/db/knowledge.ts"() {
    "use strict";
    init_firebase_admin();
  }
});

// server.ts
var server_exports = {};
__export(server_exports, {
  buildup_api: () => buildup_api
});
module.exports = __toCommonJS(server_exports);
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);

// src/middleware/auth.ts
init_firebase_admin();
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

// server.ts
init_users();
var import_https = require("firebase-functions/v2/https");
var app = (0, import_express.default)();
app.use(import_express.default.json());
var port = Number(process.env.PORT || 3e3);
var clientDist = import_path.default.resolve(process.cwd(), "dist");
app.use(import_express.default.static(clientDist));
app.get("/{*splat}", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(import_path.default.join(clientDist, "index.html"), (error) => {
    if (error) next(error);
  });
});
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "BuildUp OS Backend Running" });
});
app.post("/api/auth/sync", requireAuth, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const user = await getOrCreateUser(req.user.uid, req.user.email || "", req.user.name || "");
    res.json({ success: true, user });
  } catch (error) {
    console.error("User sync error:", error);
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/ai/strategic-analysis", requireAuth, async (req, res) => {
  try {
    const orgId = await getOrgIdForRequest(req.user.uid);
    if (!orgId) return res.status(404).json({ error: "No organization found for user" });
    const { scenario } = req.body;
    if (!scenario) {
      return res.status(400).json({ error: "Scenario is required." });
    }
    const { runAITask: runAITask2 } = await Promise.resolve().then(() => (init_gateway(), gateway_exports));
    const analysis = await runAITask2(orgId, "strategic_analysis", { scenario });
    res.json({ success: true, analysis });
  } catch (error) {
    console.error("AI Generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI analysis." });
  }
});
app.post("/api/ai/health-check", requireAuth, async (req, res) => {
  try {
    const orgId = await getOrgIdForRequest(req.user.uid);
    if (!orgId) return res.status(404).json({ error: "No organization found for user" });
    const { fileData } = req.body;
    if (!fileData) {
      return res.status(400).json({ error: "File data is required." });
    }
    const { runAITask: runAITask2 } = await Promise.resolve().then(() => (init_gateway(), gateway_exports));
    const analysis = await runAITask2(orgId, "health_check", { fileData });
    const { saveDiagnostic: saveDiagnostic2 } = await Promise.resolve().then(() => (init_diagnostics(), diagnostics_exports));
    await saveDiagnostic2(orgId, {
      type: "health_check",
      score: analysis.score,
      findings: analysis.findings,
      rootCauses: analysis.rootCauses || []
    });
    res.json({ success: true, analysis });
  } catch (error) {
    console.error("AI Generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI analysis." });
  }
});
var buildup_api = (0, import_https.onRequest)({ region: "asia-southeast1", memory: "1GiB" }, app);
async function getOrgIdForRequest(uid) {
  const { getOrganizationsForUser: getOrganizationsForUser2 } = await Promise.resolve().then(() => (init_users(), users_exports));
  const orgs = await getOrganizationsForUser2(uid);
  return orgs.length > 0 ? orgs[0].id : null;
}
app.get("/api/genome", requireAuth, async (req, res) => {
  try {
    const orgId = await getOrgIdForRequest(req.user.uid);
    if (!orgId) return res.status(404).json({ error: "No organization found for user" });
    const { getBusinessGenome: getBusinessGenome2 } = await Promise.resolve().then(() => (init_genome(), genome_exports));
    const genome = await getBusinessGenome2(orgId);
    res.json({ genome });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/metrics", requireAuth, async (req, res) => {
  try {
    const orgId = await getOrgIdForRequest(req.user.uid);
    if (!orgId) return res.status(404).json({ error: "No organization found for user" });
    const { getMetrics: getMetrics2 } = await Promise.resolve().then(() => (init_metrics(), metrics_exports));
    const metrics = await getMetrics2(orgId);
    res.json({ metrics });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/connectors", requireAuth, async (req, res) => {
  try {
    const orgId = await getOrgIdForRequest(req.user.uid);
    if (!orgId) return res.status(404).json({ error: "No organization found for user" });
    const { adminDb: adminDb2 } = await Promise.resolve().then(() => (init_firebase_admin(), firebase_admin_exports));
    const snapshot = await adminDb2.collection("organizations").doc(orgId).collection("connectors").get();
    const connectors = snapshot.docs.map((doc) => doc.data());
    res.json({ connectors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/evidence", requireAuth, async (req, res) => {
  try {
    const orgId = await getOrgIdForRequest(req.user.uid);
    if (!orgId) return res.status(404).json({ error: "No organization found for user" });
    const { uploadEvidenceRecord: uploadEvidenceRecord2 } = await Promise.resolve().then(() => (init_evidence(), evidence_exports));
    const evidence = await uploadEvidenceRecord2(orgId, req.body);
    res.json({ evidence });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/diagnostics", requireAuth, async (req, res) => {
  try {
    const orgId = await getOrgIdForRequest(req.user.uid);
    if (!orgId) return res.status(404).json({ error: "No organization found for user" });
    const { getDiagnostics: getDiagnostics2 } = await Promise.resolve().then(() => (init_diagnostics(), diagnostics_exports));
    const diagnostics = await getDiagnostics2(orgId);
    res.json({ diagnostics });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/decisions/propose", requireAuth, async (req, res) => {
  try {
    const orgId = await getOrgIdForRequest(req.user.uid);
    if (!orgId) return res.status(404).json({ error: "No organization found for user" });
    const { problem } = req.body;
    if (!problem) return res.status(400).json({ error: "Problem context is required" });
    const { runAITask: runAITask2 } = await Promise.resolve().then(() => (init_gateway(), gateway_exports));
    const proposal = await runAITask2(orgId, "decision_proposal", { problem });
    const { createDecision: createDecision2 } = await Promise.resolve().then(() => (init_decisions(), decisions_exports));
    const decision = await createDecision2(orgId, proposal);
    res.json({ success: true, decision });
  } catch (error) {
    console.error("Decision proposal error:", error);
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/decisions", requireAuth, async (req, res) => {
  try {
    const orgId = await getOrgIdForRequest(req.user.uid);
    if (!orgId) return res.status(404).json({ error: "No organization found for user" });
    const { getDecisions: getDecisions2 } = await Promise.resolve().then(() => (init_decisions(), decisions_exports));
    const decisions = await getDecisions2(orgId);
    res.json({ decisions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/initiatives", requireAuth, async (req, res) => {
  try {
    const orgId = await getOrgIdForRequest(req.user.uid);
    if (!orgId) return res.status(404).json({ error: "No organization found for user" });
    const { createInitiative: createInitiative2 } = await Promise.resolve().then(() => (init_initiatives(), initiatives_exports));
    const initiative = await createInitiative2(orgId, req.body);
    res.json({ success: true, initiative });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/initiatives", requireAuth, async (req, res) => {
  try {
    const orgId = await getOrgIdForRequest(req.user.uid);
    if (!orgId) return res.status(404).json({ error: "No organization found for user" });
    const { getInitiatives: getInitiatives2 } = await Promise.resolve().then(() => (init_initiatives(), initiatives_exports));
    const initiatives = await getInitiatives2(orgId);
    res.json({ initiatives });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/outcomes/record", requireAuth, async (req, res) => {
  try {
    const orgId = await getOrgIdForRequest(req.user.uid);
    if (!orgId) return res.status(404).json({ error: "No organization found for user" });
    const { recordOutcome: recordOutcome2 } = await Promise.resolve().then(() => (init_outcomes(), outcomes_exports));
    const outcome = await recordOutcome2(orgId, req.body);
    res.json({ success: true, outcome });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/outcomes", requireAuth, async (req, res) => {
  try {
    const orgId = await getOrgIdForRequest(req.user.uid);
    if (!orgId) return res.status(404).json({ error: "No organization found for user" });
    const { getOutcomes: getOutcomes2 } = await Promise.resolve().then(() => (init_outcomes(), outcomes_exports));
    const outcomes = await getOutcomes2(orgId);
    res.json({ outcomes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/knowledge", requireAuth, async (req, res) => {
  try {
    const { getKnowledgeGraph: getKnowledgeGraph2 } = await Promise.resolve().then(() => (init_knowledge(), knowledge_exports));
    const graph = await getKnowledgeGraph2();
    res.json({ graph });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/benchmarks", requireAuth, async (req, res) => {
  try {
    const industry = req.query.industry;
    if (!industry) return res.status(400).json({ error: "Industry query param required" });
    const { getBenchmarks: getBenchmarks2 } = await Promise.resolve().then(() => (init_knowledge(), knowledge_exports));
    const benchmarks = await getBenchmarks2(industry);
    res.json({ benchmarks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/billing/entitlement", requireAuth, async (req, res) => {
  try {
    const orgId = await getOrgIdForRequest(req.user.uid);
    if (!orgId) return res.status(404).json({ error: "No organization found for user" });
    const { getEntitlement: getEntitlement2 } = await Promise.resolve().then(() => (init_commercial(), commercial_exports));
    const entitlement = await getEntitlement2(orgId);
    res.json({ entitlement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
if (process.env.NODE_ENV !== "production" || process.env.PREVIEW_SERVER === "true") {
  app.listen(port, "0.0.0.0", () => {
    console.log(`[BuildUp] preview server listening on ${port}`);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildup_api
});
//# sourceMappingURL=server.cjs.map
