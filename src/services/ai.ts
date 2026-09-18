import { GoogleGenAI, Type } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

export function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT || process.env.GCP_PROJECT || 'gen-lang-client-0028648175';
    const location = process.env.GOOGLE_CLOUD_LOCATION || 'asia-southeast1';
    
    // Gunakan apiKey jika ada, jika tidak, gunakan ADC Vertex AI
    if (process.env.GEMINI_API_KEY) {
      console.log('Initializing BuildUp AI Gateway via API Key.');
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } else {
      console.log(`Initializing BuildUp AI Gateway via Vertex AI on project: ${projectId}`);
      aiClient = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
      });
    }
  }
  return aiClient;
}

export async function generateStrategicAnalysis(scenario: string, companyContext: any) {
  const ai = getAIClient();
  
  const prompt = `
You are the elite "BuildUp AI Executive", an uncompromising, razor-sharp Business Intelligence engine for a mid-market conglomerate.
Analyze the following business scenario and provide a highly structured, actionable strategic response.
Focus ruthlessly on EBITDA expansion, working capital optimization, cash flow protection, and compliance.
Do not use fluff or generic advice. Be specific, mathematical, and decisive.

Company Context:
Industry: ${companyContext.industry || 'Unknown'}
Revenue: ${companyContext.revenue || 'Unknown'}
Employees: ${companyContext.employeeCount || 'Unknown'}

User Scenario / Query:
"${scenario}"
`;

  try {
    // We use gemini-2.5-flash via Vertex AI endpoint
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            executiveSummary: {
              type: Type.STRING,
              description: "A 2-3 sentence ruthless summary of the situation and the required strategic posture."
            },
            financialImpact: {
              type: Type.OBJECT,
              properties: {
                ebitdaImpact: { type: Type.STRING, description: "Estimated impact on EBITDA (e.g., 'Risk of 2.4% contraction' or 'Potential $1.2M gain')" },
                cashflowImpact: { type: Type.STRING, description: "Estimated impact on Cash Flow and Working Capital" }
              },
              required: ["ebitdaImpact", "cashflowImpact"]
            },
            recommendedActions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  department: { type: Type.STRING, description: "e.g., Procurement, Finance, Operations" },
                  action: { type: Type.STRING, description: "The specific, immediate action to take" },
                  priority: { type: Type.STRING, description: "CRITICAL, HIGH, or MEDIUM" }
                },
                required: ["department", "action", "priority"]
              },
              description: "3-5 immediate operational directives."
            },
            riskAssessment: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  risk: { type: Type.STRING },
                  severity: { type: Type.STRING, description: "HIGH, MEDIUM, LOW" }
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


export async function generateHealthCheckAnalysis(fileData: string) {
  const ai = getAIClient();
  
  const prompt = `
You are the elite "BuildUp AI Executive", an uncompromising Business Intelligence engine.
A prospective client has uploaded their financial data or context file for a 'Health Check'.
Here is the extracted text from their file:
---
${fileData.substring(0, 5000)}
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
