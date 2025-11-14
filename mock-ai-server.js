import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());

const mockAnalyzeData = (siteData) => {
  const { works, finances, equipment } = siteData;
  const insights = [];
  
  works.forEach(work => {
    const expenses = finances.filter(f => f.workId === work.id && f.type === 'expense')
      .reduce((sum, f) => sum + f.amount, 0);
    
    if (expenses > work.estimatedValue * 0.8) {
      insights.push(`Work "${work.title}" is at ${Math.round(expenses/work.estimatedValue*100)}% of budget`);
    }
  });
  
  const availableEquipment = equipment.filter(e => e.status === 'available').length;
  if (availableEquipment > equipment.length * 0.5) {
    insights.push(`${availableEquipment} equipment items are underutilized`);
  }
  
  return insights.join('. ') || 'All projects are on track with no major issues detected.';
};

const mockChatResponse = (query, siteData) => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('budget') || lowerQuery.includes('cost')) {
    const totalExpenses = siteData.finances
      .filter(f => f.type === 'expense')
      .reduce((sum, f) => sum + f.amount, 0);
    return `Total project expenses are $${totalExpenses.toLocaleString()}. Foundation Work has spent $520 so far.`;
  }
  
  if (lowerQuery.includes('equipment')) {
    const available = siteData.equipment.filter(e => e.status === 'available').length;
    return `You have ${available} equipment items available. Concrete Mixer is currently assigned to Foundation Work.`;
  }
  
  if (lowerQuery.includes('delay') || lowerQuery.includes('timeline')) {
    return 'Foundation Work is progressing on schedule. Last site visit noted minor workmanship issues that should be addressed.';
  }
  
  return 'I can help you analyze budgets, equipment utilization, project timelines, and site visit reports. What specific aspect would you like to know about?';
};

app.post('/ai', (req, res) => {
  const { action, query, siteData } = req.body;
  
  try {
    switch (action) {
      case 'analyze':
        const analysis = mockAnalyzeData(siteData);
        res.json({ analysis });
        break;
        
      case 'chat':
        const response = mockChatResponse(query, siteData);
        res.json({ response });
        break;
        
      case 'insights':
        const insights = [];
        siteData.works.forEach(work => {
          const expenses = siteData.finances
            .filter(f => f.workId === work.id && f.type === 'expense')
            .reduce((sum, f) => sum + f.amount, 0);
          
          if (expenses > work.estimatedValue * 0.9) {
            insights.push({
              type: 'warning',
              category: 'budget',
              message: `Work "${work.title}" approaching budget limit`,
              severity: 'high'
            });
          }
        });
        
        const assignedEquipment = siteData.equipment.filter(e => e.status === 'assigned').length;
        if (assignedEquipment / siteData.equipment.length < 0.7) {
          insights.push({
            type: 'info',
            category: 'equipment',
            message: `Low equipment utilization: ${Math.round(assignedEquipment/siteData.equipment.length*100)}%`,
            severity: 'medium'
          });
        }
        
        res.json({ insights });
        break;
        
      default:
        res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Mock AI server running on http://localhost:${PORT}`);
});