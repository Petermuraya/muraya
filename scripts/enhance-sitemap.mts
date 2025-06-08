
import fs from 'fs';
import path from 'path';

// Enhanced sitemap configuration for better Google recognition
const BASE_URL = 'https://petermuraya.github.io/muraya';
const today = new Date().toISOString().split('T')[0];

// Priority pages for "Peter Muraya" and "Muraya" brand recognition
const enhancedUrlConfig = {
  '/': { 
    priority: '1.0', 
    changefreq: 'weekly', 
    lastmod: today,
    title: 'Peter Muraya - Muraya Tech Solutions'
  },
  '/about': { 
    priority: '0.9', 
    changefreq: 'monthly', 
    lastmod: today,
    title: 'About Peter Muraya - Muraya'
  },
  '/projects': { 
    priority: '0.95', 
    changefreq: 'weekly', 
    lastmod: today,
    title: 'Peter Muraya Projects - Muraya Portfolio'
  },
  '/blog': { 
    priority: '0.85', 
    changefreq: 'daily', 
    lastmod: today,
    title: 'Peter Muraya Blog - Muraya Tech Insights'
  },
  '/contact': { 
    priority: '0.8', 
    changefreq: 'monthly', 
    lastmod: today,
    title: 'Contact Peter Muraya - Muraya'
  }
};

// Enhanced image data with Muraya branding
const enhancedImageData = {
  '/': {
    images: [{
      loc: 'https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg',
      title: 'Peter Muraya - Muraya Tech Solutions - IoT & AI Developer Kenya',
      caption: 'Peter Muraya (Muraya) - Leading IoT & AI developer and tech innovator in Kenya'
    }]
  },
  '/about': {
    images: [{
      loc: 'https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg',
      title: 'About Peter Muraya - Muraya - Tech Leader Kenya',
      caption: 'Learn about Peter Muraya (Muraya) - Kenya tech innovation leader and IoT specialist'
    }]
  }
};

const createEnhancedUrlEntry = (loc: string, config: any, images?: any[]) => {
  const imageEntries = images ? images.map(img => `
    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${img.title}</image:title>
      <image:caption>${img.caption}</image:caption>
    </image:image>`).join('') : '';

  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${config.lastmod}</lastmod>
    <changefreq>${config.changefreq}</changefreq>
    <priority>${config.priority}</priority>${imageEntries}
  </url>`;
};

// Generate enhanced sitemap
(async () => {
  console.log('🚀 Generating enhanced sitemap for Peter Muraya (Muraya) brand recognition...');

  const urls = Object.entries(enhancedUrlConfig).map(([path, config]) => {
    const fullUrl = path === '/' ? BASE_URL : `${BASE_URL}${path}`;
    const images = enhancedImageData[path]?.images;
    return createEnhancedUrlEntry(fullUrl, config, images);
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.join('')}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap.trim());
  console.log('✅ Enhanced sitemap generated successfully');
})();
