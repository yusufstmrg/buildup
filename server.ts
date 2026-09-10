import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { requireAuth, AuthRequest } from './src/middleware/auth.ts';
import { getOrCreateUser, getAllUsers } from './src/db/users.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "BuildUp OS Backend Running" });
  });

  // Authenticate user and sync to Postgres
  app.post("/api/auth/sync", requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
      const user = await getOrCreateUser(req.user.uid, req.user.email || '', req.user.name);
      res.json({ success: true, user });
    } catch (error: any) {
      console.error("User sync error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Admin Route for Command Center
  app.get("/api/admin/users", requireAuth, async (req: AuthRequest, res) => {
    try {
      const users = await getAllUsers();
      res.json({ users });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // AI Strategic Analysis Route
  app.post("/api/ai/strategic-analysis", async (req, res) => {
    try {
      const { scenario, companyContext } = req.body;
      if (!scenario) {
        return res.status(400).json({ error: "Scenario is required." });
      }
      
      const { generateStrategicAnalysis } = await import('./src/services/ai.ts');
      const analysis = await generateStrategicAnalysis(scenario, companyContext || {});
      res.json({ success: true, analysis });
    } catch (error: any) {
      console.error("AI Generation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate AI analysis." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // For Express 5.x use *all, for 4.x use *
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
