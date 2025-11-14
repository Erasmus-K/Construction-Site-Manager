import React, { useEffect } from 'react';
import { useSentinelAgent } from '../hooks/useSentinelAgent';

const AIInsightsPanel = () => {
  const { loading, insights, lastUpdated, runAnalysis } = useSentinelAgent();

  useEffect(() => {
    runAnalysis();
  }, [runAnalysis]);

  const formatPercentage = (value, isPositive = true) => {
    const sign = value > 0 ? (isPositive ? '↑' : '↓') : (isPositive ? '↓' : '↑');
    const color = value > 0 ? (isPositive ? 'text-green-600' : 'text-red-600') : (isPositive ? 'text-red-600' : 'text-green-600');
    return (
      <span className={`${color} font-semibold`}>
        {sign}{Math.abs(value)}%
      </span>
    );
  };

  const getTimeAgo = (date) => {
    if (!date) return 'Never';
    const minutes = Math.floor((new Date() - date) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hours ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">AI Intelligence Console</h2>
            <p className="text-sm text-gray-600">Advanced analytics powered by Sentinel Agent</p>
          </div>
        </div>
        <button
          onClick={runAnalysis}
          disabled={loading}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 flex items-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Analyzing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Run AI Analysis
            </>
          )}
        </button>
      </div>

      <div className="p-6">
        {loading && !insights ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Sentinel Agent analyzing site data...</p>
          </div>
        ) : insights ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-800">Revenue Growth</p>
                    <p className="text-2xl font-bold text-green-900">
                      {formatPercentage(insights.revenueGrowth, true)}
                    </p>
                  </div>
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-800">Profit Margin</p>
                    <p className="text-2xl font-bold text-blue-900">
                      {formatPercentage(insights.profitMargin, true)}
                    </p>
                  </div>
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-800">Expenses Trend</p>
                    <p className="text-2xl font-bold text-purple-900">
                      {formatPercentage(insights.expensesTrend, false)}
                    </p>
                  </div>
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm font-medium text-yellow-800">Cost Overruns</p>
                <p className="text-xl font-bold text-yellow-900">{insights.costOverruns}%</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <p className="text-sm font-medium text-orange-800">Equipment Risk</p>
                <p className="text-xl font-bold text-orange-900">{insights.equipmentDowntimeRisk}/100</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-sm font-medium text-red-800">Delay Probability</p>
                <p className="text-xl font-bold text-red-900">{insights.projectDelayProbability}%</p>
              </div>
            </div>

            {insights.anomalies && insights.anomalies.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Detected Anomalies</h3>
                <div className="space-y-2">
                  {insights.anomalies.map((anomaly, idx) => (
                    <div key={idx} className="flex items-start p-3 bg-red-50 border border-red-200 rounded-lg">
                      <svg className="w-5 h-5 text-red-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <div>
                        <p className="font-medium text-red-800">{anomaly.description}</p>
                        <p className="text-sm text-red-600">{anomaly.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center text-sm text-gray-500">
              Last updated: {getTimeAgo(lastUpdated)}
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-gray-600">Click "Run AI Analysis" to get insights</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsightsPanel;