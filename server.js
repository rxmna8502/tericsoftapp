'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const page = fs.readFileSync(path.join(__dirname, 'public', 'index.html'));
const port = 8081;
const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Method not allowed\n');
  }
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(req.method === 'HEAD' ? undefined : JSON.stringify({ status: 'ok' }));
  }
  if (pathname !== '/' && pathname !== '/index.html') {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Not found\n');
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(req.method === 'HEAD' ? undefined : page);
});
server.listen(port, '0.0.0.0', () => console.log(`Server listening on port ${port}`));
process.on('SIGTERM', () => server.close(() => process.exit(0)));
