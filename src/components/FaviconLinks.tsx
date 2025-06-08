
import { Helmet } from 'react-helmet-async';

const FaviconLinks = () => {
  return (
    <Helmet>
      {/* Favicon and Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0d1117" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="msapplication-TileColor" content="#0d1117" />
      <meta name="theme-color" content="#0d1117" />
    </Helmet>
  );
};

export default FaviconLinks;
