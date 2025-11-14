// API Configuration - Automatically switches between dev and production
const getApiBaseUrl = () => {
  // Check if we're in development mode
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
  }
  
  // Production mode - use your deployed JSON server
  return import.meta.env.VITE_PRODUCTION_API_URL || 'https://json-server-vercel-taq2.vercel.app';
};

export const API_BASE_URL = getApiBaseUrl();

console.log(`🌐 API Mode: ${import.meta.env.DEV ? 'Development' : 'Production'}`);
console.log(`📡 API Base URL: ${API_BASE_URL}`);