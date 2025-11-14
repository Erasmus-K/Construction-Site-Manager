// Simple test for Sentinel Agent
const testSentinel = async () => {
  try {
    console.log('Testing Sentinel Agent...');
    
    const response = await fetch('http://localhost:3003/ai/analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Sentinel Agent working!');
    console.log('Sample data:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('❌ Sentinel Agent failed:', error.message);
  }
};

testSentinel();