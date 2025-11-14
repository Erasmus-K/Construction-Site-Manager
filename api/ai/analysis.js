const generateSentinelInsights = () => {
  const baseMetrics = {
    revenueGrowth: Math.random() * 20 - 5,
    profitMargin: 15 + Math.random() * 20,
    expensesTrend: Math.random() * 10 - 8,
    costOverruns: Math.random() * 30,
    equipmentDowntimeRisk: Math.floor(Math.random() * 100),
    projectDelayProbability: Math.floor(Math.random() * 60)
  };

  const anomalies = [];
  
  if (baseMetrics.costOverruns > 20) {
    anomalies.push({
      type: 'budget',
      severity: 'high',
      description: 'Multiple projects exceeding budget thresholds',
      impact: `$${Math.floor(baseMetrics.costOverruns * 1000)} potential overrun`
    });
  }

  const predictions = {
    nextMonthExpenses: 25000 + Math.floor(Math.random() * 15000),
    equipmentMaintenanceNeeded: ['Concrete Mixer'],
    projectsAtRisk: ['Foundation Work'],
    labourShortage: Math.random() > 0.7
  };

  return {
    ...baseMetrics,
    anomalies,
    predictions,
    lastUpdated: new Date().toISOString()
  };
};

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const insights = generateSentinelInsights();
    res.json(insights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}