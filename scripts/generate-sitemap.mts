
import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';

// Enhanced SEO configuration
const BASE_URL = 'https://petermuraya.github.io/muraya/';
const OUTPUT_FILE = path.join(__dirname, '../public/sitemap.xml');

// Get current date in ISO format
const today = new Date().toISOString().split('T')[0];

// Enhanced URL configuration with SEO priorities and frequencies
const urlConfig = {
  '/': { priority: '1.0', changefreq: 'weekly', lastmod: today },
  '/about': { priority: '0.9', changefreq: 'monthly', lastmod: today },
  '/projects': { priority: '0.95', changefreq: 'weekly', lastmod: today },
  '/blog': { priority: '0.85', changefreq: 'daily', lastmod: today },
  '/contact': { priority: '0.75', changefreq: 'monthly', lastmod: today }
};

// Image sitemap data
const imageData = {
  '/': {
    images: [{
      loc: 'https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg',
      title: 'Peter Muraya Ndungu - IoT & AI Expert in Kenya',
      caption: 'Leading IoT & AI Developer, mentor and innovator in Nairobi\'s tech ecosystem.'
    }]
  },
  '/about': {
    images: [{
      loc: 'https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg',
      title: 'About Peter Muraya - Software Engineer & Innovator',
      caption: 'Learn about Peter Muraya\'s story, career milestones, and Kenya youth tech leadership.'
    }]
  }
};

// Function to generate enhanced XML entries
const createUrlEntry = (loc: string, config: any, images?: any[]) => {
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

// Generate comprehensive sitemap
(async () => {
  console.log('🚀 Generating enhanced SEO sitemap...');

  // Generate URL entries from configuration
  const urls = Object.entries(urlConfig).map(([path, config]) => {
    const fullUrl = BASE_URL + (path === '/' ? '' : path.substring(1));
    const images = imageData[path]?.images;
    return createUrlEntry(fullUrl, config, images);
  });

  // Enhanced sitemap with multiple namespaces
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.join('')}
</urlset>`;

  // Write sitemap file
  fs.writeFileSync(OUTPUT_FILE, sitemap.trim());
  
  // Generate robots.txt enhancement
  const robotsContent = `# 📄 Enhanced Robots.txt for Peter Muraya Portfolio
# Purpose: Maximize SEO performance & crawl efficiency

User-agent: *
Allow: /

# Enhanced crawling for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1

User-agent: DuckDuckBot
Allow: /
Crawl-delay: 1

# Social media bots
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# Sitemap location
Sitemap: ${BASE_URL}sitemap.xml

# Host preference
Host: ${BASE_URL}

# Clean URLs
Clean-param: utm_source&utm_medium&utm_campaign&utm_term&utm_content
`;

  fs.writeFileSync(path.join(__dirname, '../public/robots.txt'), robotsContent);

  console.log(`✅ Enhanced sitemap generated with ${urls.length} entries`);
  console.log(`📍 Sitemap location: ${BASE_URL}sitemap.xml`);
  console.log(`🤖 Robots.txt updated with enhanced directives`);
})();
