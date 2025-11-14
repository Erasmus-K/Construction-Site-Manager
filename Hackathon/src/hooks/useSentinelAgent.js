import { useState, useCallback } from 'react';

const API_ENDPOINT = import.meta.env.VITE_SENTINEL_API_ENDPOINT || 'http://localhost:3003/ai/analysis';

export const useSentinelAgent = () => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const runAnalysis = useCallback(async () => {
    console.log('Starting AI Analysis...', API_ENDPOINT);
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Analysis failed: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Analysis data received:', data);
      setInsights(data);
      setLastUpdated(new Date(data.lastUpdated));
      return data;
    } catch (error) {
      console.error('Sentinel Agent analysis failed:', error);
      alert('AI Analysis failed: ' + error.message);
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