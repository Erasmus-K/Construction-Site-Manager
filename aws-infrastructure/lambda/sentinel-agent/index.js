import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const bedrock = new BedrockRuntimeClient({ region: process.env.AWS_REGION });

export const handler = async (event) => {
  try {
    const siteData = await fetchSiteData();
    const insights = await analyzeBySentinelAgent(siteData);
    
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        ...insights,
        lastUpdated: new Date().toISOString()
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: error.message })
    };
  }
};

async function fetchSiteData() {
  // Mock data fetch - replace with actual DB queries
  return {
    works: [{ id: 1, estimatedValue: 50000, actualExpenses: 45000 }],
    finances: [
      { type: 'expense', amount: 320, date: '2024-01-16' },
      { type: 'income', amount: 25000, date: '2024-01-15' }
    ],
    equipment: [{ status: 'available' }, { status: 'assigned' }],
    labour: [{ totalCost: 320, hoursWorked: 16 }]
  };
}

async function analyzeBySentinelAgent(siteData) {
  const prompt = `You are Sentinel Agent for construction site intelligence.

Analyze this data and return JSON:
${JSON.stringify(siteData, null, 2)}

Return only this JSON structure:
{
  "revenueGrowth": 12.5,
  "profitMargin": 24.8,
  "expensesTrend": -5.1,
  "costOverruns": 15.0,
  "equipmentDowntimeRisk": 25,
  "projectDelayProbability": 30,
  "anomalies": [
    {
      "type": "budget",
      "severity": "medium",
      "description": "Foundation work approaching budget limit",
      "impact": "$5,000 potential overrun"
    }
  ],
  "predictions": {
    "nextMonthExpenses": 28000,
    "equipmentMaintenanceNeeded": ["Concrete Mixer"],
    "projectsAtRisk": ["Foundation Work"],
    "labourShortage": false
  }
}`;

  const command = new InvokeModelCommand({
    modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
    body: JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }]
    }),
    contentType: "application/json"
  });

  const response = await bedrock.send(command);
  const result = JSON.parse(new TextDecoder().decode(response.body));
  
  try {
    return JSON.parse(result.content[0].text);
  } catch {
    return generateFallbackInsights(siteData);
  }
}

function generateFallbackInsights(siteData) {
  return {
    revenueGrowth: 12.5,
    profitMargin: 24.8,
    expensesTrend: -5.1,
    costOverruns: 15.0,
    equipmentDowntimeRisk: 25,
    projectDelayProbability: 30,
    anomalies: [],
    predictions: {
      nextMonthExpenses: 28000,
      equipmentMaintenanceNeeded: [],
      projectsAtRisk: [],
      labourShortage: false
    }
  };
}