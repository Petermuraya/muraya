import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';

// Base config
const BASE_URL = 'https://petermuraya.github.io/muraya/';
const OUTPUT_FILE = path.join(__dirname, '../public/sitemap.xml');

// Get current date
const today = new Date().toISOString().split('T')[0];

// Function to generate XML entries
const createUrlEntry = (loc: string, lastmod: string, priority: string) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;

// Run generator
(async () => {
  const files = await fg(['public/**/*.html'], { dot: true });

  const urls = files.map((file) => {
    const relativePath = file.replace(/^public\/|index\.html$/g, '').replace(/\/$/, '');
    const loc = BASE_URL + relativePath;
    const priority = loc.endsWith('/') ? '1.0' : '0.85';
    return createUrlEntry(loc, today, priority);
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join('')}
  </urlset>`;

  fs.writeFileSync(OUTPUT_FILE, sitemap.trim());
  console.log(`✅ Sitemap generated with ${urls.length} entries.`);
})();
