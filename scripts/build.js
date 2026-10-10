// Package only the browser files for static hosting. No dependencies required.
import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.resolve(root, 'dist');
const publicFiles = ['index.html', 'styles.css', 'script.js', 'src', 'assets'];

// Confine cleanup to this project's generated output directory.
if (path.relative(root, output) !== 'dist') throw new Error('Invalid build output directory');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of publicFiles) {
  await cp(path.join(root, file), path.join(output, file), { recursive: true });
}
console.log('Static portfolio built in dist/');
