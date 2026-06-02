/**
 * Image Optimization Script
 * Converts PNG/JPG images to WebP using sharp
 * - Profile/avatar images: downscale to display size + compress
 * - Project screenshots/case study: full resolution, 85% quality
 * - Unused images: deleted
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

// ── Unused files to delete ──────────────────────────────────────────────────
const UNUSED = [
  'images/profile/gb.ven_1.png',   // 22.5 MB
  'images/profile/gb.backg.png',   // 19.7 MB
  'images/projects/Vod-3.png',     //  4.2 MB
  'images/projects/Vod-4.png',     //  3.2 MB
  'images/projects/Vod-oldHomewith.png', // 2.4 MB
  'images/projects/DJ.png',        //  75 KB
  'images/profile/cover_bg_1.jpg', //  1.1 MB
];

// ── Small display images: resize to 2x their rendered size ─────────────────
// These are shown as avatars/thumbnails with fixed small dimensions
const SMALL_DISPLAY = [
  // Testimonial profile photos - displayed at 64x64 (carousel) / 96x96 (modal)
  // Resize to 192px wide (3x for retina on worst case 96px display)
  { src: 'images/profile/1756901959970.jpg', width: 192, height: 192 },
  { src: 'images/profile/1710886367232.jpg', width: 192, height: 192 },
  { src: 'images/profile/1685965339196.jpg', width: 192, height: 192 },
  { src: 'images/profile/1685897244209.jpg', width: 192, height: 192 },
  { src: 'images/profile/1517687171761.jpg', width: 192, height: 192 },
];

// ── Profile portrait: displayed at 480x640 in Home, resize to 2x ───────────
const PORTRAIT = [
  { src: 'images/profile/gb.ven_2.png', width: 960, height: 1280 },
];

// ── Full-resolution project images (screenshots, case study, galleries) ─────
// Only compress, never downscale
const PROJECT_IMAGES = [
  // Dow Jones
  'images/projects/DJ1.png',
  'images/projects/brand-ds.png',
  'images/projects/token1-ds.png',
  'images/projects/token2-ds.png',
  'images/projects/token3-ds.png',
  // VOD Platform
  'images/projects/Vod.png',
  'images/projects/Vod-01.png',
  'images/projects/Vod-1_New _LiveTV.png',
  'images/projects/Vod-2-New_Vod_Page.png',
  'images/projects/Vod-3- Nwe_Catch-up.png',
  'images/projects/Vod-3_old_new_gamePage.png',
  'images/projects/Vod-4_old_new_learnigPage.png',
  'images/projects/Vod-NewGamePage.png',
  'images/projects/Vod-Old_Home_nav.png',
  'images/projects/Vod-Old_Welcom.png',
  'images/projects/Vod-Old_ex_a11y.png',
  'images/projects/Vod_Redesing_Nav_Graf_Reason.png',
  'images/projects/Vod_old_navigation.png',
  'images/projects/Vod_New_navigarion.png',
  // XP0
  'images/projects/XP0.png',
  'images/projects/XP0-old_new.png',
  'images/projects/XP0_Home_OldVsNew.png',
  'images/projects/XP0_CorePageProd_OldVsNew.png',
  'images/projects/XP0_ProductCards_OldVsNew.png',
  'images/projects/XP0_Pwa.png',
  'images/projects/XP0-SaaS_Platform_Analysis.png',
  'images/projects/XP0-ux_Issues_Stem_from_Deeper_Problems..png',
  'images/projects/XP0-ux_laptop_mobile.png',
  'images/projects/XP0-logo-colors-icons.png',
  'images/projects/XP0-Custom_isometric_illustration.png',
  // SGPV
  'images/projects/sgpv.png',
  'images/projects/sgpv-evo.png',
  'images/projects/SGPV_V6_Old_New.png',
  'images/projects/SGPV_V6_New_Diag.png',
  'images/projects/SGPV_V6_New_01.png',
  'images/projects/SGPV_V6_New_02.png',
  'images/projects/SGPV_V6_New_03.png',
  'images/projects/SGPV_Research_01.png',
  'images/projects/sgpv_7_01_mobile.png',
  'images/projects/sgpv_7_02_mobile.png',
  'images/projects/sgpv_7_03_tablet_shopdashboard_imgRec.png',
  'images/projects/sgpv_7_03_tablet_form.png',
  'images/projects/sgpv_7_AI_flow_to colect_data.png',
  'images/projects/sgpv_7_AI_Diagram_benefit.png',
  // Tu Plan Redondo
  'images/projects/mc-1.png',
  'images/projects/mc-2.png',
  'images/projects/mc-3.png',
  'images/projects/mc-4.png',
  'images/projects/mc-painPoints.png',
  'images/projects/mc-iconsVisualElements.png',
  'images/projects/mc-userflowEvol-restaurantManager.png',
  'images/projects/mc-userflowEvol_Difprofiles.png',
  'images/projects/mc-PerformanceEvaluation.png',
  // Back Office
  'images/projects/OnlineBackOffice-1.png',
  'images/projects/OnlineBackOffice-2.png',
  'images/projects/OnlineBackOffice-3.png',
  'images/projects/OnlineBackOffice-4.png',
  // University
  'images/univerity/Product_D_GB.png',
  'images/univerity/CCM.png',
  'images/univerity/AI_tools.png',
];

function getWebpPath(srcRelative) {
  const parsed = path.parse(srcRelative);
  return path.join(parsed.dir, parsed.name + '.webp');
}

function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  return (bytes / 1024).toFixed(0) + ' KB';
}

let totalBefore = 0;
let totalAfter = 0;
const results = [];

// ── Step 1: Delete unused images ────────────────────────────────────────────
console.log('\n═══════════════════════════════════════════════════');
console.log('  STEP 1: Removing unused images');
console.log('═══════════════════════════════════════════════════');

let deletedSize = 0;
for (const rel of UNUSED) {
  const full = path.join(publicDir, rel);
  if (fs.existsSync(full)) {
    const size = fs.statSync(full).size;
    deletedSize += size;
    fs.unlinkSync(full);
    console.log(`  ✓ Deleted ${rel} (${formatSize(size)})`);
  } else {
    console.log(`  – Skipped ${rel} (not found)`);
  }
}
console.log(`\n  Total freed by deletion: ${formatSize(deletedSize)}`);

// ── Step 2: Convert small/avatar images with resize ─────────────────────────
console.log('\n═══════════════════════════════════════════════════');
console.log('  STEP 2: Profile/avatar images (resize + WebP)');
console.log('═══════════════════════════════════════════════════');

async function convertResized(list, quality = 85) {
  for (const item of list) {
    const srcFull = path.join(publicDir, item.src);
    if (!fs.existsSync(srcFull)) {
      console.log(`  – Skipped ${item.src} (not found)`);
      continue;
    }
    const before = fs.statSync(srcFull).size;
    totalBefore += before;

    const destRel = getWebpPath(item.src);
    const destFull = path.join(publicDir, destRel);

    await sharp(srcFull)
      .resize(item.width, item.height, { fit: 'cover', withoutEnlargement: true })
      .webp({ quality })
      .toFile(destFull);

    const after = fs.statSync(destFull).size;
    totalAfter += after;
    const saving = ((before - after) / before * 100).toFixed(0);
    console.log(`  ✓ ${path.basename(item.src)}: ${formatSize(before)} → ${formatSize(after)} (-${saving}%)`);
    results.push({ src: item.src, dest: destRel, before, after });

    // Remove original
    fs.unlinkSync(srcFull);
  }
}

await convertResized(SMALL_DISPLAY, 85);
await convertResized(PORTRAIT, 85);

// ── Step 3: Convert full-resolution project images ──────────────────────────
console.log('\n═══════════════════════════════════════════════════');
console.log('  STEP 3: Project images (compress-only → WebP)');
console.log('═══════════════════════════════════════════════════');

for (const rel of PROJECT_IMAGES) {
  const srcFull = path.join(publicDir, rel);
  if (!fs.existsSync(srcFull)) {
    console.log(`  – Skipped ${rel} (not found)`);
    continue;
  }

  const before = fs.statSync(srcFull).size;
  totalBefore += before;

  const destRel = getWebpPath(rel);
  const destFull = path.join(publicDir, destRel);

  // Detect if image has transparency (PNG with alpha)
  const meta = await sharp(srcFull).metadata();
  const hasAlpha = meta.channels === 4;

  if (hasAlpha) {
    // Lossless for images with transparency (logos, icons)
    await sharp(srcFull).webp({ lossless: true }).toFile(destFull);
  } else {
    await sharp(srcFull).webp({ quality: 85 }).toFile(destFull);
  }

  const after = fs.statSync(destFull).size;
  totalAfter += after;
  const saving = ((before - after) / before * 100).toFixed(0);
  const mode = hasAlpha ? 'lossless' : '85%';
  console.log(`  ✓ ${path.basename(rel)}: ${formatSize(before)} → ${formatSize(after)} (-${saving}%) [${mode}]`);
  results.push({ src: rel, dest: destRel, before, after });

  // Remove original
  fs.unlinkSync(srcFull);
}

// ── Final report ─────────────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════════════════════');
console.log('  SUMMARY');
console.log('═══════════════════════════════════════════════════');
console.log(`  Images deleted (unused):    ${formatSize(deletedSize)}`);
console.log(`  Images converted (before):  ${formatSize(totalBefore)}`);
console.log(`  Images converted (after):   ${formatSize(totalAfter)}`);
const conversionSaving = totalBefore - totalAfter;
console.log(`  Saved by WebP conversion:   ${formatSize(conversionSaving)} (${((conversionSaving/totalBefore)*100).toFixed(0)}%)`);
console.log(`  Total size reduction:       ${formatSize(deletedSize + conversionSaving)}`);
console.log('\n  Done! Now update image references in the codebase.');
