import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://www.anuradhapurahomestay.com";

interface SeoDefaultsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SeoDefaults = ({
  title = "Anuradhapura Homestay - Best Homestay in Anuradhapura",
  description = "Discover authentic Sri Lankan tours, cultural experiences, and luxury accommodations in the ancient city of Anuradhapura.",
  image = `${SITE_URL}/images/og-default.jpg`,
  url,
  type = "website",
}: SeoDefaultsProps) => {
  const location = useLocation();
  const siteName = "Anuradhapura Homestay";
  const twitterHandle = "@AnuradhapuraHomestay";

  // Always build canonical URL from the production domain + current path.
  // Falls back to SITE_URL if useLocation is not available for any reason.
  const canonicalUrl = url ?? `${SITE_URL}${location?.pathname ?? ""}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Sri Lanka, Anuradhapura, tours, travel, culture, heritage, vacation" />
      <meta name="author" content="Anuradhapura Homestay" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
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
      <meta name="DC.identifier" content={canonicalUrl} />

      {/* Apple/Safari specific */}
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Microsoft specific */}
      <meta name="application-name" content={siteName} />
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* PWA */}
      <link rel="manifest" href="/manifest.json" />
    </Helmet>
  );
};
