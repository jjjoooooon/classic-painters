import React from 'react';
import { Helmet } from 'react-helmet';
import { useContent } from '../context/ContentContext';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    keywords?: string;
}

export const SEO: React.FC<SEOProps> = ({
    title,
    description,
    image,
    url,
    type = 'website',
    keywords
}) => {
    const { settings } = useContent();

    // Build dynamic values with fallbacks
    const siteTitle = settings?.siteName || 'Classic Painters';
    const pageTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | Professional Painting Services New Zealand`;
    const pageDescription = description || settings?.siteDescription || 'Professional residential and commercial painters in New Zealand. Get a free quote today for quality interior and exterior painting.';
    const pageImage = image || settings?.logo || settings?.ogImage || 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1200';
    const pageUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://classic-painters.co.nz');
    const pageKeywords = keywords || settings?.seoKeywords || 'painters NZ, house painting, commercial painters, roof painting, exterior painting, interior painting';

    // Get site phone and email for organization schema
    const phone = settings?.contactPhone || '';
    const email = settings?.contactEmail || '';
    const address = settings?.contactAddress || '';

    // JSON-LD Structured Data for Organization
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: siteTitle,
        description: pageDescription,
        url: pageUrl,
        logo: pageImage,
        telephone: phone,
        email: email,
        address: {
            '@type': 'PostalAddress',
            addressLocality: address
        },
        sameAs: settings?.socialLinks ? Object.values(settings.socialLinks) : []
    };

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{pageTitle}</title>
            <meta name="title" content={pageTitle} />
            <meta name="description" content={pageDescription} />
            <meta name="keywords" content={pageKeywords} />
            <link rel="canonical" href={pageUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={pageUrl} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:image" content={pageImage} />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:locale" content="en_NZ" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={pageUrl} />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDescription} />
            <meta name="twitter:image" content={pageImage} />

            {/* Additional SEO Tags */}
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="author" content={siteTitle} />

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(organizationSchema)}
            </script>
        </Helmet>
    );
};
