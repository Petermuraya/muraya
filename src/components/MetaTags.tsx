
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
}

const MetaTags = ({ 
  title = "Peter Muraya (@sammie1604) | Muraya Tech Solutions | IoT & AI Developer Kenya | Leading Tech Innovation",
  description = "Peter Muraya (Muraya): Award-winning IoT & AI developer from Kenya building transformative tech solutions. Leading youth innovation in Africa with expertise in React, TypeScript, Python, and cloud architecture. Muraya Tech Solutions serves healthcare, agriculture, and smart cities. Contact: sammypeter1944@gmail.com | +254 700 471113",
  keywords = "Peter Muraya, Muraya, Muraya Tech Solutions, Peter Muraya Kenya, Muraya developer, IoT developer Kenya, AI specialist Africa, sammie1604, React expert Kenya, TypeScript developer Nairobi, Python developer Kenya, tech innovation Kenya, youth tech leader, smart agriculture Kenya, healthcare tech Africa, GitHub petermuraya, LinkedIn peter-muraya-ndungu, sammypeter1944@gmail.com",
  canonicalUrl = "https://petermuraya.github.io/muraya/"
}: MetaTagsProps) => {
  return (
    <Helmet>
      {/* Character Encoding & Viewport */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Peter Muraya" />
      <meta name="profile:first_name" content="Peter" />
      <meta name="profile:last_name" content="Muraya" />
      <meta name="profile:username" content="sammie1604" />
      <meta name="robots" content="index, follow" />

      {/* Contact & Location Information */}
      <meta name="email" content="sammypeter1944@gmail.com" />
      <meta name="telephone" content="+254700471113" />
      <meta name="geo.region" content="KE" />
      <meta name="geo.placename" content="Nairobi, Kenya" />
      <meta name="geo.position" content="-1.286389;36.817223" />
      <meta name="ICBM" content="-1.286389,36.817223" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* Additional SEO Meta */}
      <meta name="subject" content="Peter Muraya | Muraya Tech Solutions - IoT & AI Portfolio" />
      <meta name="classification" content="Professional Technology Portfolio" />
      <meta name="rating" content="General" />
      <meta name="audience" content="Global" />
      <meta name="coverage" content="Worldwide" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="date" content="2025-06-08" />
      <meta name="copyright" content="© 2025 Peter Muraya - Muraya Tech Solutions" />
      <meta name="owner" content="Peter Muraya" />
      <meta name="url" content="https://petermuraya.github.io/muraya" />
      <meta name="identifier-URL" content="https://petermuraya.github.io/muraya" />
      <meta name="directory" content="submission" />
      <meta name="category" content="Peter Muraya, Muraya, IoT, AI, Software Engineering, Kenya Technology" />
      <meta name="theme-color" content="#0F172A" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
    </Helmet>
  );
};

export default MetaTags;
