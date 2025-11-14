import { useState, useCallback } from 'react';

const API_ENDPOINT = import.meta.env.VITE_AI_API_ENDPOINT || 'http://localhost:3002/ai';

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState([]);

  const analyzeData = useCallback(async (siteData) => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'analyze', siteData })
      });
      const result = await response.json();
      return result.analysis;
    } catch (error) {
      console.error('AI analysis failed:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const chatWithAI = useCallback(async (query, siteData) => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'chat', query, siteData })
      });
      const result = await response.json();
      return result.response;
    } catch (error) {
      console.error('AI chat failed:', error);
      return 'Sorry, I cannot process your request right now.';
    } finally {
      setLoading(false);
    }
  }, []);

  const generateInsights = useCallback(async (siteData) => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'insights', siteData })
      });
      const result = await response.json();
      setInsights(result.insights);
      return result.insights;
    } catch (error) {
      console.error('Insights generation failed:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    insights,
    analyzeData,
    chatWithAI,
    generateInsights
  };
};