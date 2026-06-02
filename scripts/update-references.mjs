/**
 * Update all image path references from .png/.jpg → .webp
 * Targets only strings that look like image paths to avoid false positives
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

// Files to process
const EXTENSIONS = ['.tsx', '.ts', '.js', '.mjs', '.css'];

// Directories to scan
const DIRS = ['app'];

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.next') {
      files.push(...walk(full));
    } else if (entry.isFile() && EXTENSIONS.includes(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

// Regex: matches .png or .jpg/.jpeg inside a string (surrounded by quotes or backticks)
// Replaces only when it's part of a path string (contains '/' or starts with a filename)
const IMAGE_EXT_RE = /\.(png|jpg|jpeg)(?=['"`])/gi;

let totalFiles = 0;
let totalReplacements = 0;

for (const dir of DIRS) {
  const files = walk(path.join(root, dir));
  for (const file of files) {
    const original = fs.readFileSync(file, 'utf8');
    const updated = original.replace(IMAGE_EXT_RE, '.webp');
    if (updated !== original) {
      fs.writeFileSync(file, updated, 'utf8');
      const count = (original.match(IMAGE_EXT_RE) || []).length;
      totalReplacements += count;
      totalFiles++;
      console.log(`  ✓ ${path.relative(root, file)} (${count} replacement${count > 1 ? 's' : ''})`);
    }
  }
}

console.log(`\nDone: ${totalReplacements} replacements across ${totalFiles} files.`);
