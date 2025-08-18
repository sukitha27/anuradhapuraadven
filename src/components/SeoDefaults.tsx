import { Helmet } from 'react-helmet-async';

interface SeoDefaultsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SeoDefaults = ({
  title = 'Anuradhapura Homestay - Best Homestay in Anuradhapura',
  description = 'Discover authentic Sri Lankan tours, cultural experiences, and luxury accommodations in the ancient city of Anuradhapura.',
  image = 'https://www.anuradhapurahomestay.com/images/og-default.jpg',
  url = typeof window !== 'undefined' ? window.location.href : 'https://www.anuradhapurahomestay.com',
  type = 'website'
}: SeoDefaultsProps) => {
  const siteName = 'Anuradhapura Homestay';
  const twitterHandle = '@AnuradhapuraHomestay'; // Replace with your actual handle

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Sri Lanka, Anuradhapura, tours, travel, culture, heritage, vacation" />
      <meta name="author" content="Anuradhapura Homestay" />
      <meta name="robots" content="index, follow" />
      <meta name="revisit-after" content="7 days" />
      <meta name="language" content="English" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Dublin Core Metadata */}
      <meta name="DC.title" content={title} />
      <meta name="DC.description" content={description} />
      <meta name="DC.identifier" content={url} />
      
      {/* Apple/Safari specific */}
      <meta name="apple-mobile-web-app-title" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Microsoft specific */}
      <meta name="application-name" content={siteName} />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* PWA */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};