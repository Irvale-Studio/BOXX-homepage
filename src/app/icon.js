import sharp from 'sharp';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default async function Icon() {
  const logoPath = join(process.cwd(), 'public/images/brand/logo-primary-white.png');
  const logoBuffer = await readFile(logoPath);

  // Get logo dimensions and crop just the icon (left ~28% of the image)
  const meta = await sharp(logoBuffer).metadata();
  const iconWidth = Math.round(meta.width * 0.28);
  const cropped = await sharp(logoBuffer)
    .extract({ left: 0, top: 0, width: iconWidth, height: meta.height })
    .toBuffer();

  // Create dark background, composite the icon on top
  const bg = Buffer.from(
    `<svg width="64" height="64"><rect width="64" height="64" rx="12" ry="12" fill="#0a0a0a"/></svg>`
  );

  const icon = await sharp(bg)
    .composite([
      {
        input: await sharp(cropped)
          .resize({ height: 52, fit: 'inside' })
          .toBuffer(),
        gravity: 'centre',
      },
    ])
    .png()
    .toBuffer();

  return new Response(icon, {
    headers: { 'Content-Type': 'image/png' },
  });
}
