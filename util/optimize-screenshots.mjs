#!/usr/bin/env node
import sharp from 'sharp';
import {readdir, stat} from 'fs/promises';
import {join} from 'path';

const SCREENSHOTS_DIR = 'docs/screenshots';

async function optimizeImage(filePath) {
  const stats = await stat(filePath);
  const sizeBefore = stats.size;

  try {
    await sharp(filePath)
      .png({
        quality: 85,
        compressionLevel: 9,
        adaptiveFiltering: true,
        palette: true
      })
      .toFile(filePath + '.tmp');

    // Replace original with optimized
    const {rename} = await import('fs/promises');
    await rename(filePath + '.tmp', filePath);

    const statsAfter = await stat(filePath);
    const sizeAfter = statsAfter.size;
    const saved = sizeBefore - sizeAfter;
    const percent = ((saved / sizeBefore) * 100).toFixed(1);

    console.log(`✓ ${filePath.split('/').pop()}: ${(sizeBefore/1024).toFixed(0)}KB → ${(sizeAfter/1024).toFixed(0)}KB (saved ${percent}%)`);

    return {sizeBefore, sizeAfter};
  } catch (error) {
    console.error(`✗ Failed to optimize ${filePath}:`, error.message);
    return {sizeBefore, sizeAfter: sizeBefore};
  }
}

async function main() {
  console.log('🖼️  Optimizing screenshots...\n');

  const files = await readdir(SCREENSHOTS_DIR);
  const pngFiles = files.filter(f => f.endsWith('.png'));

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of pngFiles) {
    const filePath = join(SCREENSHOTS_DIR, file);
    const {sizeBefore, sizeAfter} = await optimizeImage(filePath);
    totalBefore += sizeBefore;
    totalAfter += sizeAfter;
  }

  const totalSaved = totalBefore - totalAfter;
  const totalPercent = ((totalSaved / totalBefore) * 100).toFixed(1);

  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary');
  console.log('='.repeat(60));
  console.log(`Total files: ${pngFiles.length}`);
  console.log(`Before: ${(totalBefore/1024/1024).toFixed(2)} MB`);
  console.log(`After: ${(totalAfter/1024/1024).toFixed(2)} MB`);
  console.log(`Saved: ${(totalSaved/1024/1024).toFixed(2)} MB (${totalPercent}%)`);
  console.log('='.repeat(60));
}

main().catch(console.error);
