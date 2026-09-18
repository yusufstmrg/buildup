import { GoogleGenAI, Type } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

export function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY environment variable is missing. AI features will fail.");
    }
    aiClient = new GoogleGenAI({ apiKey: key || '' });
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

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      temperature: 0.2, // Low temp for analytical precision
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
}
