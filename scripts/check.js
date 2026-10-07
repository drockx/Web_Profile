import { readdir, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
async function collect(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || ['node_modules', 'tmp'].includes(entry.name)) continue;
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collect(file));
    else if (entry.name.endsWith('.js')) files.push(file);
  }
  return files;
}

const files = await collect(root);
let failed = false;
for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) { console.error(result.stderr); failed = true; }
  const source = await readFile(file, 'utf8');
  const imports = [...source.matchAll(/(?:import|export)\s+(?:[^'";]+?\s+from\s+)?['"](\.[^'"]+)['"]/g)];
  for (const [, specifier] of imports) {
    try { await readFile(path.resolve(path.dirname(file), specifier)); }
    catch { console.error(`Unresolved import: ${path.relative(root, file)} -> ${specifier}`); failed = true; }
  }
  if (file.includes(`${path.sep}domain${path.sep}`) && /\b(document|window|navigator)\b/.test(source.replace(/\/\/[^\n]*/g, ''))) {
    console.error(`Domain code must stay independent of browser globals: ${file}`); failed = true;
  }
}
if (failed) process.exitCode = 1;
else console.log(`Checked syntax and relative imports in ${files.length} JavaScript files; domain modules are browser-independent.`);
