#!/usr/bin/env node
import sharp from 'sharp';
import {readdir, stat, unlink} from 'fs/promises';
import {join, parse} from 'path';

const SCREENSHOTS_DIR = 'docs/screenshots';

async function convertToWebP(filePath) {
  const stats = await stat(filePath);
  const sizeBefore = stats.size;
  const {dir, name} = parse(filePath);
  const webpPath = join(dir, `${name}.webp`);

  try {
    await sharp(filePath)
      .webp({
        quality: 85,
        effort: 6  // 0-6, higher = better compression but slower
      })
      .toFile(webpPath);

    const statsAfter = await stat(webpPath);
    const sizeAfter = statsAfter.size;
    const saved = sizeBefore - sizeAfter;
    const percent = ((saved / sizeBefore) * 100).toFixed(1);

    console.log(`✓ ${name}.png → ${name}.webp: ${(sizeBefore/1024).toFixed(0)}KB → ${(sizeAfter/1024).toFixed(0)}KB (saved ${percent}%)`);

    // Remove original PNG
    await unlink(filePath);

    return {sizeBefore, sizeAfter, filename: name};
  } catch (error) {
    console.error(`✗ Failed to convert ${filePath}:`, error.message);
    return {sizeBefore, sizeAfter: sizeBefore, filename: name};
  }
}

async function updateMarkdownReferences(conversions) {
  const {readFile, writeFile} = await import('fs/promises');
  const {glob} = await import('glob');

  // Find all markdown files in docs/
  const mdFiles = await glob('docs/**/*.md');

  let totalReplacements = 0;

  for (const mdFile of mdFiles) {
    let content = await readFile(mdFile, 'utf-8');
    let fileChanged = false;

    for (const {filename} of conversions) {
      const pngPattern = new RegExp(`${filename}\\.png`, 'g');
      const matches = content.match(pngPattern);

      if (matches) {
        content = content.replace(pngPattern, `${filename}.webp`);
        fileChanged = true;
        totalReplacements += matches.length;
      }
    }

    if (fileChanged) {
      await writeFile(mdFile, content, 'utf-8');
      console.log(`  Updated references in ${mdFile}`);
    }
  }

  return totalReplacements;
}

async function main() {
  console.log('🖼️  Converting screenshots to WebP...\n');

  const files = await readdir(SCREENSHOTS_DIR);
  const pngFiles = files.filter(f => f.endsWith('.png'));

  if (pngFiles.length === 0) {
    console.log('No PNG files found to convert.');
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  const conversions = [];

  for (const file of pngFiles) {
    const filePath = join(SCREENSHOTS_DIR, file);
    const {sizeBefore, sizeAfter, filename} = await convertToWebP(filePath);
    totalBefore += sizeBefore;
    totalAfter += sizeAfter;
    if (filename) {
      conversions.push({filename});
    }
  }

  const totalSaved = totalBefore - totalAfter;
  const totalPercent = ((totalSaved / totalBefore) * 100).toFixed(1);

  console.log('\n' + '='.repeat(60));
  console.log('📊 Conversion Summary');
  console.log('='.repeat(60));
  console.log(`Total files: ${pngFiles.length}`);
  console.log(`Before: ${(totalBefore/1024/1024).toFixed(2)} MB`);
  console.log(`After: ${(totalAfter/1024/1024).toFixed(2)} MB`);
  console.log(`Saved: ${(totalSaved/1024/1024).toFixed(2)} MB (${totalPercent}%)`);
  console.log('='.repeat(60));

  console.log('\n🔍 Updating markdown references...\n');
  const replacements = await updateMarkdownReferences(conversions);

  console.log('\n' + '='.repeat(60));
  console.log('✅ Done!');
  console.log('='.repeat(60));
  console.log(`Updated ${replacements} image references in markdown files`);
  console.log('All PNG files have been replaced with WebP versions.');
  console.log('='.repeat(60));
}

main().catch(console.error);
