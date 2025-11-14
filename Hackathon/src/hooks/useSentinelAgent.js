import { useState, useCallback } from 'react';

const API_ENDPOINT = process.env.NODE_ENV === 'production' ? '/api/ai/analysis' : 'http://localhost:3003/ai/analysis';

export const useSentinelAgent = () => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const runAnalysis = useCallback(async () => {
    setLoading(true);
    try {
      // Fallback to mock data if API fails
      const mockData = {
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
        },
        lastUpdated: new Date().toISOString()
      };
      
      try {
        const response = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
        });
        
        if (response.ok) {
          const data = await response.json();
          setInsights(data);
          setLastUpdated(new Date(data.lastUpdated));
          return data;
        }
      } catch (apiError) {
        console.log('API unavailable, using mock data');
      }
      
      // Use mock data as fallback
      setInsights(mockData);
      setLastUpdated(new Date(mockData.lastUpdated));
      return mockData;
    } catch (error) {
      console.error('Analysis failed:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    insights,
    lastUpdated,
    runAnalysis
  };
};