import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const bedrock = new BedrockRuntimeClient({ region: process.env.AWS_REGION });

export const handler = async (event) => {
  try {
    const { action, query, siteData } = JSON.parse(event.body);
    
    switch (action) {
      case 'analyze':
        return await analyzeData(siteData);
      case 'chat':
        return await chatWithAI(query, siteData);
      case 'insights':
        return await generateInsights(siteData);
      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: error.message })
    };
  }
};

async function analyzeData(siteData) {
  const prompt = `Analyze construction site data and provide insights:
${JSON.stringify(siteData, null, 2)}

Focus on: delays, cost overruns, equipment failures, labour trends, missing visits.
Return JSON with recommendations.`;

  const response = await invokeModel(prompt);
  
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ analysis: response })
  };
}

async function chatWithAI(query, siteData) {
  const prompt = `You are SiteSupervisor AI for construction management.
Data: ${JSON.stringify(siteData, null, 2)}
Question: ${query}
Provide specific, actionable response.`;

  const response = await invokeModel(prompt);
  
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ response })
  };
}

async function generateInsights(siteData) {
  const { works, finances, equipment } = siteData;
  const insights = [];
  
  works.forEach(work => {
    const expenses = finances.filter(f => f.workId === work.id && f.type === 'expense')
      .reduce((sum, f) => sum + f.amount, 0);
    if (expenses > work.estimatedValue * 0.9) {
      insights.push({
        type: 'warning',
        message: `Work "${work.title}" approaching budget limit`,
        severity: 'high'
      });
    }
  });
  
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ insights })
  };
}

async function invokeModel(prompt) {
  const command = new InvokeModelCommand({
    modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
    body: JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }]
    }),
    contentType: "application/json"
  });
  
  const response = await bedrock.send(command);
  const result = JSON.parse(new TextDecoder().decode(response.body));
  return result.content[0].text;
}