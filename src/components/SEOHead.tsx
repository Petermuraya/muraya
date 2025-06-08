
import MetaTags from './MetaTags';
import SocialMetaTags from './SocialMetaTags';
import StructuredDataScript from './StructuredDataScript';
import VerificationMetas from './VerificationMetas';
import FaviconLinks from './FaviconLinks';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEOHead = (props: SEOHeadProps) => {
  return (
    <>
      <VerificationMetas />
      <MetaTags {...props} />
      <SocialMetaTags {...props} />
      <FaviconLinks />
      <StructuredDataScript />
    </>
  );
};

export default SEOHead;
