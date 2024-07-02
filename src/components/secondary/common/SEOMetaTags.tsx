import React from 'react';
import Head from 'next/head';

interface SEOMetaTagsProps {
  title: string;
  ogType?: string;
  twitterUsername?: string
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEOMetaTags: React.FC<SEOMetaTagsProps> = ({
  title,
  url = '',
  image = '',
  ogType = '',
  keywords = '',
  description = '',
  twitterUsername = '',
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      {keywords && <meta name="keywords" content={keywords} />}
      {description && <meta name="description" content={description} />}

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={ogType || "website"} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {image && <meta name="twitter:image" content={image} />}
      {description && <meta name="twitter:description" content={description} />}
      {twitterUsername && <meta name="twitter:site" content={twitterUsername} />}

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
    </Head>
  );
};

export default SEOMetaTags;