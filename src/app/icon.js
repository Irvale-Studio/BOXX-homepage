import sharp from 'sharp';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default async function Icon() {
  const logoPath = join(process.cwd(), 'public/images/brand/logo-secondary-bw.png');
  const logoBuffer = await readFile(logoPath);

  // Create dark background, composite the full logo on top
  const bg = Buffer.from(
    `<svg width="64" height="64"><rect width="64" height="64" fill="#0a0a0a"/></svg>`
  );

  const icon = await sharp(bg)
    .composite([
      {
        input: await sharp(logoBuffer)
          .resize({ width: 56, fit: 'inside' })
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
