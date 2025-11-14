import { spawn } from 'child_process';

const servers = [
  { name: 'JSON Server', cmd: 'json-server', args: ['--watch', 'db.json', '--port', '3001'] },
  { name: 'AI Server', cmd: 'node', args: ['mock-ai-server.js'] },
  { name: 'Sentinel Server', cmd: 'node', args: ['mock-sentinel-server.js'] },
  { name: 'Auth Server', cmd: 'node', args: ['server/auth-server.js'] }
];

console.log('Starting all servers...\n');

servers.forEach(server => {
  const process = spawn(server.cmd, server.args, { stdio: 'inherit' });
  console.log(`✅ ${server.name} starting...`);
  
  process.on('error', (err) => {
    console.error(`❌ ${server.name} error:`, err.message);
  });
});

// Start Vite after a delay
setTimeout(() => {
  console.log('\n🚀 Starting frontend...');
  const vite = spawn('npm', ['run', 'dev'], { stdio: 'inherit' });
  
  vite.on('error', (err) => {
    console.error('❌ Frontend error:', err.message);
  });
}, 3000);