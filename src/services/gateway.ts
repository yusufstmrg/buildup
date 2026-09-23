import { GoogleGenAI, Type } from "@google/genai";
import { getBusinessGenome } from '../db/genome.ts';
import { adminDb } from '../lib/firebase-admin.ts';
import * as crypto from 'crypto';
import { AgentRun } from '../db/schema.ts';

let aiClient: GoogleGenAI | null = null;

export function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT || process.env.GCP_PROJECT || 'gen-lang-client-0028648175';
    const location = process.env.GOOGLE_CLOUD_LOCATION || 'asia-southeast1';
    
    if (process.env.GEMINI_API_KEY) {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } else {
      aiClient = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
      });
    }
  }
  return aiClient;
}

export async function runAITask(
  orgId: string, 
  taskType: 'strategic_analysis' | 'health_check' | 'decision_proposal', 
  payload: any
) {
  const startTime = Date.now();
  const ai = getAIClient();
  const genome = await getBusinessGenome(orgId);
  
  // Model Routing
  const model = taskType === 'strategic_analysis' || taskType === 'decision_proposal' 
    ? 'gemini-3.6-pro' 
    : 'gemini-3.6-flash';

  // Context Builder
  const systemContext = `
You are the elite "BuildUp AI Executive".
Company Context (from Business Genome):
Business Model: ${genome?.businessModel || 'Unknown'}
Core Workflows: ${genome?.coreWorkflows?.join(', ') || 'Unknown'}
Strategic Objectives: ${genome?.strategicObjectives?.join(', ') || 'Unknown'}
Key Risks: ${genome?.keyRisks?.join(', ') || 'Unknown'}
`;

  let prompt = '';
  let responseSchema: any = null;

  if (taskType === 'strategic_analysis') {
    prompt = `${systemContext}\nAnalyze scenario: ${payload.scenario}`;
    responseSchema = {
      type: Type.OBJECT,
      properties: {
        executiveSummary: { type: Type.STRING },
        financialImpact: {
          type: Type.OBJECT,
          properties: {
            ebitdaImpact: { type: Type.STRING },
            cashflowImpact: { type: Type.STRING }
          }
        },
        recommendedActions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              department: { type: Type.STRING },
              action: { type: Type.STRING },
              priority: { type: Type.STRING }
            }
          }
        }
      }
    };
  } else if (taskType === 'health_check') {
    prompt = `${systemContext}\nPerform health check on this data:\n${payload.fileData}`;
    responseSchema = {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.INTEGER },
        findings: { type: Type.ARRAY, items: { type: Type.STRING } },
        rootCauses: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              symptom: { type: Type.STRING },
              cause: { type: Type.STRING },
              driver: { type: Type.STRING },
              confidence: { type: Type.NUMBER }
            }
          }
        }
      }
    };
  } else if (taskType === 'decision_proposal') {
    prompt = `${systemContext}\nPropose structured decision for: ${payload.problem}`;
    responseSchema = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        domain: { type: Type.STRING },
        problemContext: { type: Type.STRING },
        recommendation: { type: Type.STRING },
        confidence: { type: Type.NUMBER },
        approvalAuthority: { type: Type.STRING },
        options: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              label: { type: Type.STRING },
              financialImpact: { type: Type.STRING },
              risk: { type: Type.STRING },
              effort: { type: Type.STRING }
            }
          }
        }
      }
    };
  }

  let result: any = null;
  let status: AgentRun['status'] = 'success';
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
    status = 'error';
    console.error("Gateway AI Error:", error);
    throw error;
  } finally {
    const runId = `run_${crypto.randomUUID()}`;
    const agentRun: AgentRun = {
      id: runId,
      orgId,
      taskType,
      modelUsed: model,
      promptTokens: usage.promptTokens,
      completionTokens: usage.completionTokens,
      costEstimate: 0, // In production, calculate based on model pricing
      durationMs: Date.now() - startTime,
      status,
      timestamp: new Date().toISOString()
    };
    
    // Fire and forget audit log
    adminDb.collection('organizations').doc(orgId).collection('agent_runs').doc(runId).set(agentRun).catch(console.error);

    // P5 Commercial: Log metering for billing
    const { logMetering } = await import('../db/commercial.ts');
    logMetering(orgId, 'AI_Tokens', usage.promptTokens + usage.completionTokens, 0).catch(console.error);
  }

  return result;
}
