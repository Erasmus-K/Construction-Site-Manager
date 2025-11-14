import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());

const generateSentinelInsights = () => {
  // Simulate realistic construction site analytics
  const baseMetrics = {
    revenueGrowth: Math.random() * 20 - 5, // -5% to 15%
    profitMargin: 15 + Math.random() * 20, // 15% to 35%
    expensesTrend: Math.random() * 10 - 8, // -8% to 2%
    costOverruns: Math.random() * 30, // 0% to 30%
    equipmentDowntimeRisk: Math.floor(Math.random() * 100), // 0 to 100
    projectDelayProbability: Math.floor(Math.random() * 60) // 0% to 60%
  };

  const anomalies = [];
  
  // Generate realistic anomalies based on metrics
  if (baseMetrics.costOverruns > 20) {
    anomalies.push({
      type: 'budget',
      severity: 'high',
      description: 'Multiple projects exceeding budget thresholds',
      impact: `$${Math.floor(baseMetrics.costOverruns * 1000)} potential overrun`
    });
  }

  if (baseMetrics.equipmentDowntimeRisk > 70) {
    anomalies.push({
      type: 'equipment',
      severity: 'medium',
      description: 'High equipment failure risk detected',
      impact: 'Potential 2-3 day project delays'
    });
  }

  if (baseMetrics.expensesTrend > 5) {
    anomalies.push({
      type: 'budget',
      severity: 'medium',
      description: 'Expenses trending above normal levels',
      impact: 'Monthly budget variance of 8-12%'
    });
  }

  const predictions = {
    nextMonthExpenses: 25000 + Math.floor(Math.random() * 15000),
    equipmentMaintenanceNeeded: ['Concrete Mixer', 'Excavator CAT 320'].slice(0, Math.floor(Math.random() * 2) + 1),
    projectsAtRisk: ['Foundation Work', 'Structural Framework'].slice(0, Math.floor(Math.random() * 2)),
    labourShortage: Math.random() > 0.7
  };

  return {
    ...baseMetrics,
    anomalies,
    predictions,
    lastUpdated: new Date().toISOString()
  };
};

app.post('/ai/analysis', (req, res) => {
  try {
    // Simulate processing delay
    setTimeout(() => {
      const insights = generateSentinelInsights();
      res.json(insights);
    }, 1500);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'Sentinel Agent Online', timestamp: new Date().toISOString() });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Sentinel Agent Mock Server running on http://localhost:${PORT}`);
});