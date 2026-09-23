import express from "express";
import path from "path";
import { requireAuth, requireAdmin, AuthRequest } from './src/middleware/auth.ts';
import { getOrCreateUser, getAllUsers } from './src/db/users.ts';
import { onRequest } from "firebase-functions/v2/https";

const app = express();
app.use(express.json());

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "BuildUp OS Backend Running" });
});

// Authenticate user and sync — also auto-provisions organization on first login
app.post("/api/auth/sync", requireAuth, async (req: AuthRequest, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const user = await getOrCreateUser(req.user.uid, req.user.email || '', req.user.name || '');
    // Auto-create org silently on first sync
    await getOrCreateOrgForUser(req.user.uid, req.user.email, req.user.name);
    res.json({ success: true, user });
  } catch (error: any) {
    console.error("User sync error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Admin Route for Command Center
app.get("/api/admin/users", requireAdmin, async (req: AuthRequest, res) => {
  try {
    const users = await getAllUsers();
    res.json({ users });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// AI Strategic Analysis Route (Protected)
app.post("/api/ai/strategic-analysis", requireAuth, async (req: AuthRequest, res) => {
  try {
    const orgId = await getOrCreateOrgForUser(req.user!.uid, req.user!.email, req.user!.name);

    const { scenario } = req.body;
    if (!scenario) {
      return res.status(400).json({ error: "Scenario is required." });
    }
    
    const { runAITask } = await import('./src/services/gateway.ts');
    const analysis = await runAITask(orgId, 'strategic_analysis', { scenario });
    res.json({ success: true, analysis });
  } catch (error: any) {
    console.error("AI Generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI analysis." });
  }
});

// AI Health Check Route (Protected)
app.post("/api/ai/health-check", requireAuth, async (req: AuthRequest, res) => {
  try {
    const orgId = await getOrCreateOrgForUser(req.user!.uid, req.user!.email, req.user!.name);

    const { fileData } = req.body;
    if (!fileData) {
      return res.status(400).json({ error: "File data is required." });
    }
    
    const { runAITask } = await import('./src/services/gateway.ts');
    const analysis = await runAITask(orgId, 'health_check', { fileData });
    
    // Save to diagnostic store
    const { saveDiagnostic } = await import('./src/db/diagnostics.ts');
    await saveDiagnostic(orgId, {
      type: 'health_check',
      score: analysis.score,
      findings: analysis.findings,
      rootCauses: analysis.rootCauses || []
    });

    res.json({ success: true, analysis });
  } catch (error: any) {
    console.error("AI Generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI analysis." });
  }
});


// Export the app as a Firebase Cloud Function (v2)
export const buildup_api = onRequest({ region: "asia-southeast1", memory: "1GiB" }, app);

// Helper: get existing org OR auto-create one for the user on first use
async function getOrCreateOrgForUser(uid: string, email?: string, name?: string): Promise<string> {
  const { getOrganizationsForUser, createOrganization } = await import('./src/db/users.ts');
  const orgs = await getOrganizationsForUser(uid);
  if (orgs.length > 0) return orgs[0]!.id;

  // Auto-provision a personal organization for this user
  const orgName = name ? `${name}'s Organization` : (email ? email.split('@')[0] : 'My Organization');
  const newOrg = await createOrganization(uid, orgName, uid);
  console.log(`Auto-created organization ${newOrg.id} for user ${uid}`);
  return newOrg.id;
}


// ---------------------------------------------------------
// P1: Canonical Data Platform Endpoints
// ---------------------------------------------------------

app.get("/api/genome", requireAuth, async (req: AuthRequest, res) => {
  try {
    const orgId = await getOrCreateOrgForUser(req.user!.uid, req.user!.email, req.user!.name);
    const { getBusinessGenome } = await import('./src/db/genome.ts');
    const genome = await getBusinessGenome(orgId);
    res.json({ genome });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/metrics", requireAuth, async (req: AuthRequest, res) => {
  try {
    const orgId = await getOrCreateOrgForUser(req.user!.uid, req.user!.email, req.user!.name);
    const { getMetrics } = await import('./src/db/metrics.ts');
    const metrics = await getMetrics(orgId);
    res.json({ metrics });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/connectors", requireAuth, async (req: AuthRequest, res) => {
  try {
    const orgId = await getOrCreateOrgForUser(req.user!.uid, req.user!.email, req.user!.name);
    const { adminDb } = await import('./src/lib/firebase-admin.ts');
    const snapshot = await adminDb.collection('organizations').doc(orgId).collection('connectors').get();
    const connectors = snapshot.docs.map(doc => doc.data());
    res.json({ connectors });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/evidence", requireAuth, async (req: AuthRequest, res) => {
  try {
    const orgId = await getOrCreateOrgForUser(req.user!.uid, req.user!.email, req.user!.name);
    const { uploadEvidenceRecord } = await import('./src/db/evidence.ts');
    const evidence = await uploadEvidenceRecord(orgId, req.body);
    res.json({ evidence });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ---------------------------------------------------------
// P2: AI Intelligence & Diagnostics Endpoints
// ---------------------------------------------------------

app.get("/api/diagnostics", requireAuth, async (req: AuthRequest, res) => {
  try {
    const orgId = await getOrCreateOrgForUser(req.user!.uid, req.user!.email, req.user!.name);
    const { getDiagnostics } = await import('./src/db/diagnostics.ts');
    const diagnostics = await getDiagnostics(orgId);
    res.json({ diagnostics });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/decisions/propose", requireAuth, async (req: AuthRequest, res) => {
  try {
    const orgId = await getOrCreateOrgForUser(req.user!.uid, req.user!.email, req.user!.name);

    const { problem } = req.body;
    if (!problem) return res.status(400).json({ error: "Problem context is required" });

    const { runAITask } = await import('./src/services/gateway.ts');
    const proposal = await runAITask(orgId, 'decision_proposal', { problem });

    const { createDecision } = await import('./src/db/decisions.ts');
    const decision = await createDecision(orgId, proposal);

    res.json({ success: true, decision });
  } catch (error: any) {
    console.error("Decision proposal error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/decisions", requireAuth, async (req: AuthRequest, res) => {
  try {
    const orgId = await getOrCreateOrgForUser(req.user!.uid, req.user!.email, req.user!.name);
    const { getDecisions } = await import('./src/db/decisions.ts');
    const decisions = await getDecisions(orgId);
    res.json({ decisions });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ---------------------------------------------------------
// P3: Transformation OS & Outcome Ledger Endpoints
// ---------------------------------------------------------

app.post("/api/initiatives", requireAuth, async (req: AuthRequest, res) => {
  try {
    const orgId = await getOrCreateOrgForUser(req.user!.uid, req.user!.email, req.user!.name);
    const { createInitiative } = await import('./src/db/initiatives.ts');
    const initiative = await createInitiative(orgId, req.body);
    res.json({ success: true, initiative });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/initiatives", requireAuth, async (req: AuthRequest, res) => {
  try {
    const orgId = await getOrCreateOrgForUser(req.user!.uid, req.user!.email, req.user!.name);
    const { getInitiatives } = await import('./src/db/initiatives.ts');
    const initiatives = await getInitiatives(orgId);
    res.json({ initiatives });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/outcomes/record", requireAuth, async (req: AuthRequest, res) => {
  try {
    const orgId = await getOrCreateOrgForUser(req.user!.uid, req.user!.email, req.user!.name);
    const { recordOutcome } = await import('./src/db/outcomes.ts');
    const outcome = await recordOutcome(orgId, req.body);
    res.json({ success: true, outcome });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/outcomes", requireAuth, async (req: AuthRequest, res) => {
  try {
    const orgId = await getOrCreateOrgForUser(req.user!.uid, req.user!.email, req.user!.name);
    const { getOutcomes } = await import('./src/db/outcomes.ts');
    const outcomes = await getOutcomes(orgId);
    res.json({ outcomes });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


// ---------------------------------------------------------
// P4 & P5: Knowledge, Benchmark & Commercial Endpoints
// ---------------------------------------------------------

app.get("/api/knowledge", requireAuth, async (req: AuthRequest, res) => {
  try {
    const { getKnowledgeGraph } = await import('./src/db/knowledge.ts');
    const graph = await getKnowledgeGraph();
    res.json({ graph });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/benchmarks", requireAuth, async (req: AuthRequest, res) => {
  try {
    const industry = req.query.industry as string;
    if (!industry) return res.status(400).json({ error: "Industry query param required" });
    const { getBenchmarks } = await import('./src/db/knowledge.ts');
    const benchmarks = await getBenchmarks(industry);
    res.json({ benchmarks });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/billing/entitlement", requireAuth, async (req: AuthRequest, res) => {
  try {
    const orgId = await getOrCreateOrgForUser(req.user!.uid, req.user!.email, req.user!.name);
    const { getEntitlement } = await import('./src/db/commercial.ts');
    const entitlement = await getEntitlement(orgId);
    res.json({ entitlement });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

