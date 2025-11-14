import React, { useState, useEffect } from 'react';
import { useAI } from '../hooks/useAI';
import { api } from '../utils/api';

const AIInsights = () => {
  const [siteData, setSiteData] = useState({});
  const { loading, insights, generateInsights } = useAI();

  useEffect(() => {
    fetchDataAndGenerateInsights();
  }, []);

  const fetchDataAndGenerateInsights = async () => {
    try {
      const [works, siteVisits, equipment, labourLogs, finances] = await Promise.all([
        api.getWorks(),
        fetch('http://localhost:3001/siteVisits').then(r => r.json()),
        api.getEquipment(),
        fetch('http://localhost:3001/labourLogs').then(r => r.json()),
        api.getFinances()
      ]);
      
      const data = { works, siteVisits, equipment, labourLogs, finances };
      setSiteData(data);
      await generateInsights(data);
    } catch (error) {
      console.error('Failed to generate insights:', error);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>;
      case 'medium':
        return <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>;
      default:
        return <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          AI Insights
        </h2>
        <button
          onClick={fetchDataAndGenerateInsights}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Refresh'}
        </button>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Analyzing site data...</p>
          </div>
        ) : insights.length === 0 ? (
          <div className="text-center py-8">
            <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-600">All systems running smoothly!</p>
            <p className="text-gray-500 text-sm mt-1">No critical issues detected</p>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight, idx) => (
              <div key={idx} className={`p-4 rounded-lg border-l-4 ${getSeverityColor(insight.severity)}`}>
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    {getSeverityIcon(insight.severity)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{insight.message}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <span className="capitalize bg-gray-200 px-2 py-1 rounded text-xs">
                        {insight.category}
                      </span>
                      <span className="ml-2 capitalize">
                        {insight.severity} priority
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;