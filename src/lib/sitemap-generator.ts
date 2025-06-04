
export interface SitemapEntry {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (baseUrl: string, entries: SitemapEntry[]): string => {
  const xmlEntries = entries.map(entry => `
  <url>
    <loc>${baseUrl}${entry.url}</loc>
    ${entry.lastModified ? `<lastmod>${entry.lastModified}</lastmod>` : ''}
    ${entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : ''}
    ${entry.priority ? `<priority>${entry.priority}</priority>` : ''}
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${xmlEntries}
</urlset>`;
};

export const generateRobotsTxt = (baseUrl: string): string => {
  return `# Robots.txt for ${baseUrl}
# Generated automatically - Peter Muraya Portfolio

User-agent: *
Allow: /

# Allow all major search engine crawlers
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

User-agent: Baiduspider
Allow: /
Crawl-delay: 2

User-agent: YandexBot
Allow: /
Crawl-delay: 2

# Social media crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

# Disallow admin areas
User-agent: *
Disallow: /admin/

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay for general bots
Crawl-delay: 1

# Host directive
Host: ${baseUrl}`;
};

export const defaultSitemapEntries: SitemapEntry[] = [
  {
    url: '/',
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 1.0
  },
  {
    url: '/about',
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.9
  },
  {
    url: '/projects',
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9
  },
  {
    url: '/blog',
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.8
  },
  {
    url: '/contact',
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7
  }
];
