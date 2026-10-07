// Local static preview. No dependencies; run: node server.js
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.pdf': 'application/pdf', '.vcf': 'text/vcard; charset=utf-8' };
const server = http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400).end('Bad request'); return; }
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  const allowed = ['index.html', 'styles.css', 'script.js'];
  const relative = path.relative(root, file);
  const publicDirectory = ['assets', 'src'].some(directory => relative.startsWith(`${directory}${path.sep}`));
  if (relative.startsWith('..') || path.isAbsolute(relative) || (!allowed.includes(relative) && !publicDirectory)) {
    res.writeHead(404).end('Not found'); return;
  }
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }).end(); return; }
  fs.stat(file, (error, stat) => {
    if (error || !stat.isFile()) { res.writeHead(404).end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Content-Length': stat.size, 'X-Content-Type-Options': 'nosniff' });
    if (req.method === 'HEAD') res.end();
    else fs.createReadStream(file).pipe(res);
  });
});
server.listen(4173, '127.0.0.1', () => console.log('Profile preview: http://127.0.0.1:4173'));
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
