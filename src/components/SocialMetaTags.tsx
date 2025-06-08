
import { Helmet } from 'react-helmet-async';

interface SocialMetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SocialMetaTags = ({
  title = "Peter Muraya | Muraya Tech Solutions | IoT & AI Innovation Kenya",
  description = "Peter Muraya (Muraya) transforming Africa through intelligent IoT & AI solutions for healthcare, smart cities, and agriculture. Leading Kenya's tech innovation.",
  image = "https://i.postimg.cc/902NmQLh/IMG-20240709-105245-53.jpg",
  url = "https://petermuraya.github.io/muraya/"
}: SocialMetaTagsProps) => {
  return (
    <Helmet>
      {/* Enhanced Open Graph with Muraya branding */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="profile" />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Peter Muraya - Muraya Tech Solutions" />

      {/* Business Contact Data */}
      <meta property="place:location:latitude" content="-1.286389" />
      <meta property="place:location:longitude" content="36.817223" />
      <meta property="business:contact_data:street_address" content="Nairobi, Kenya" />
      <meta property="business:contact_data:locality" content="Nairobi" />
      <meta property="business:contact_data:country_name" content="Kenya" />
      <meta property="business:contact_data:email" content="sammypeter1944@gmail.com" />
      <meta property="business:contact_data:phone_number" content="+254700471113" />

      {/* Enhanced Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@sammie1604" />
      <meta name="twitter:title" content="Peter Muraya | Muraya - IoT & AI Developer Kenya" />
      <meta name="twitter:description" content="Peter Muraya (Muraya) - Award-winning IoT & AI developer building transformative tech solutions across Kenya and Africa." />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SocialMetaTags;
