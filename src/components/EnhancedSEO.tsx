import { Helmet } from 'react-helmet-async';
import { baseSEOConfig, pageConfigs, generateStructuredData, type SEOConfig } from '@/lib/seo-config';

interface EnhancedSEOProps extends Partial<SEOConfig> {
  page: string;
  customStructuredData?: object;
  publishedTime?: string;
  modifiedTime?: string;
  locales?: { lang: string; url: string }[];
}

const EnhancedSEO = ({
  page,
  title,
  description,
  keywords,
  image,
  url,
  type,
  customStructuredData,
  breadcrumbs,
  publishedTime,
  modifiedTime,
  locales,
}: EnhancedSEOProps) => {
  const config = pageConfigs[page] || {};

  const finalTitle = title || config.title || baseSEOConfig.siteName;
  const finalDescription = description || config.description || '';
  const finalKeywords = keywords || config.keywords || '';
  const finalImage = image || config.image || baseSEOConfig.defaultImage;
  const finalUrl = url || config.url || baseSEOConfig.siteUrl;
  const finalType = type || config.type || 'website';

  const structuredData = generateStructuredData(page, customStructuredData) || {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: finalTitle,
    url: finalUrl,
    description: finalDescription,
  };

  const breadcrumbStructuredData =
    breadcrumbs && breadcrumbs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: `${baseSEOConfig.siteUrl}${crumb.url}`,
          })),
        }
      : null;

  // Core Web Identity Schema
  const websiteIdentityStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: baseSEOConfig.siteUrl,
    name: baseSEOConfig.siteName,
    alternateName: baseSEOConfig.author,
  };

  return (
    <Helmet>
      {/* Essential Head Metadata */}
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
      />

      {/* Primary Meta */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={baseSEOConfig.author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="3 days" />
      <meta name="theme-color" content="#0d1117" />

      {/* Geo */}
      <meta name="geo.region" content="KE" />
      <meta name="geo.placename" content="Nairobi" />
      <meta name="geo.position" content="-1.286389;36.817223" />
      <meta name="ICBM" content="-1.286389,36.817223" />

      {/* Canonical */}
      <link rel="canonical" href={finalUrl} />

      {/* Locale-specific Alternate */}
      {locales &&
        locales.map(({ lang, url }) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
      <link rel="alternate" hrefLang="x-default" href={finalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={finalType} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:secure_url" content={finalImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${baseSEOConfig.author} - IoT & AI Developer`} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={baseSEOConfig.siteName} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:image:alt" content={`${baseSEOConfig.author} Portfolio`} />
      <meta name="twitter:creator" content={baseSEOConfig.twitterHandle} />
      <meta name="twitter:site" content={baseSEOConfig.twitterHandle} />
      <meta name="twitter:label1" content="Expertise" />
      <meta name="twitter:data1" content="IoT, AI, React, TypeScript" />
      <meta name="twitter:label2" content="Location" />
      <meta name="twitter:data2" content="Nairobi, Kenya" />

      {/* PWA & App Meta */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Peter Muraya" />
      <meta name="application-name" content="Peter Muraya Portfolio" />

      {/* Security */}
      <meta
        httpEquiv="Content-Security-Policy"
        content="upgrade-insecure-requests; default-src https: data: 'self' 'unsafe-inline'; object-src 'none'"
      />
      <meta name="referrer" content="strict-origin-when-cross-origin" />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteIdentityStructuredData)}</script>
      {breadcrumbStructuredData && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbStructuredData)}</script>
      )}

      {/* Preconnect & Preload */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://i.postimg.cc" />
      <link rel="preload" as="image" href={finalImage} type="image/jpeg" />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//i.postimg.cc" />
    </Helmet>
  );
};

export default EnhancedSEO;
