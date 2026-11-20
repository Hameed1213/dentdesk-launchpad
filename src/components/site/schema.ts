/*
 * Structured data (schema.org JSON-LD) shared across pages (SEO audit, 20 Nov 2026).
 *
 * One Organization with a stable @id, sent on every page from __root.tsx; other blocks (WebSite,
 * SoftwareApplication, Article) point at it by @id instead of repeating a bare copy. Every fact here
 * is already public on the site: the legal name, company number and registered office are in
 * /terms and the footer, the ICO number in the footer and /features/security.
 * Never add aggregateRating or review here until real practices have reviewed DentDock.
 */

export const SITE = "https://dentdock.co.uk";
export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "DentDock",
  legalName: "Paradigm Network Limited",
  url: SITE,
  logo: {
    "@type": "ImageObject",
    url: `${SITE}/icon-512.png`,
    width: 512,
    height: 512,
  },
  email: "hello@dentdock.co.uk",
  areaServed: "GB",
  address: {
    "@type": "PostalAddress",
    streetAddress: "11 Dronfield Road",
    addressLocality: "Salford",
    postalCode: "M6 7FN",
    addressCountry: "GB",
  },
  identifier: {
    "@type": "PropertyValue",
    propertyID: "Companies House company number",
    value: "16903048",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "hello@dentdock.co.uk",
    areaServed: "GB",
    availableLanguage: "en-GB",
  },
  sameAs: [
    "https://find-and-update.company-information.service.gov.uk/company/16903048",
    "https://ico.org.uk/ESDWebPages/Entry/ZC132966",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "DentDock",
  url: SITE,
  inLanguage: "en-GB",
  publisher: { "@id": ORG_ID },
};

/** Guide author (Hariss, 20 Nov 2026: a named author on every guide, with Person schema). */
export const AUTHOR = {
  name: "Hariss Hameed",
  jobTitle: "Founder, DentDock",
  url: `${SITE}/about`,
};

export const authorSchema = {
  "@type": "Person",
  name: AUTHOR.name,
  jobTitle: AUTHOR.jobTitle,
  url: AUTHOR.url,
  worksFor: { "@id": ORG_ID },
};
