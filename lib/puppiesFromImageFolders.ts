/**
 * Reads puppy data from public/images folder structure.
 * Each subfolder = one puppy. Folder name = "Name Gender Age Price" (e.g. "Kate Female 9 weeks 1000").
 * If a file is named "main" (main.jpg, main.png, etc.) it is used as the profile photo; otherwise the first image is used.
 * These images live in the repo (public/images) so they are never lost.
 */

import fs from 'fs';
import path from 'path';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);
const SKIP_FOLDERS = new Set(['parents and past litters', 'reserved', 'reserved 1']);

export interface PuppyFromFolder {
  _id: string;
  name: string;
  gender: string;
  age: string;
  price: number;
  status: 'available' | 'reserved' | 'sold';
  mainImage: string;
  images: string[];
}

function isImageFile(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

/** Parse folder name like "Kate Female 9 weeks 1000" or "Jake male 9 weeks 800" */
function parseFolderName(folderName: string): { name: string; gender: string; age: string; price: number } | null {
  const parts = folderName.trim().split(/\s+/);
  if (parts.length < 4) return null;
  const price = parseInt(parts[parts.length - 1], 10);
  if (isNaN(price) || price <= 0) return null;
  const genderIdx = parts.findIndex((p) => /^male|female$/i.test(p));
  if (genderIdx === -1) return null;
  const name = parts[0];
  const gender = parts[genderIdx].toLowerCase();
  const age = parts
    .slice(genderIdx + 1, parts.length - 1)
    .join(' ')
    .trim();
  if (!age) return null;
  return { name, gender, age, price };
}

/** Try multiple possible roots so we find public/images in dev and production (e.g. Vercel). */
function getImagesDir(): string | null {
  const candidates = [
    path.join(process.cwd(), 'public', 'images'),
    path.join(process.cwd(), '..', 'public', 'images'),
  ];
  for (const dir of candidates) {
    try {
      if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) return dir;
    } catch {
      continue;
    }
  }
  return null;
}

/**
 * Get all puppies from public/images subfolders.
 * Returns [] if the images directory doesn't exist or can't be read (e.g. in edge runtime).
 */
export function getPuppiesFromImageFolders(): PuppyFromFolder[] {
  try {
    const imagesDir = getImagesDir();
    if (!imagesDir) return [];
    const entries = fs.readdirSync(imagesDir, { withFileTypes: true });
    const puppies: PuppyFromFolder[] = [];

    for (const ent of entries) {
      if (!ent.isDirectory()) continue;
      const folderName = ent.name;
      if (SKIP_FOLDERS.has(folderName.toLowerCase())) continue;

      const parsed = parseFolderName(folderName);
      if (!parsed) continue;

      const folderPath = path.join(imagesDir, folderName);
      const files = fs.readdirSync(folderPath).filter((f) => {
        const full = path.join(folderPath, f);
        return fs.statSync(full).isFile() && isImageFile(f);
      });

      if (files.length === 0) continue;

      // Use raw path (no encoding) so static server finds folders with spaces (e.g. "Kate Female 9 weeks 1000")
      const basePath = '/images/' + folderName;
      const imageUrls = files.map((f) => `${basePath}/${f}`);

      const mainFile = files.find((f) => path.basename(f, path.extname(f)).toLowerCase() === 'main');
      const mainImage = mainFile ? `${basePath}/${mainFile}` : imageUrls[0];

      puppies.push({
        _id: 'folder-' + folderName.replace(/\s+/g, '-').toLowerCase(),
        name: parsed.name,
        gender: parsed.gender,
        age: parsed.age,
        price: parsed.price,
        status: 'available',
        mainImage,
        images: imageUrls,
      });
    }

    return puppies.sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}
