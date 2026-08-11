import type {Metadata} from "next";

const clinicName = "Emerge Dental Studio";
const defaultImage = {url: "/images/emerge-logo.png", width: 671, height: 168};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function buildPageMetadata({title, description, path}: PageMetadataInput): Metadata {
  const brandedTitle = title.includes(clinicName) ? title : `${title} | ${clinicName}`;

  return {
    title: {absolute: brandedTitle},
    description,
    alternates: {canonical: path},
    openGraph: {
      title: brandedTitle,
      description,
      url: path,
      siteName: clinicName,
      images: [defaultImage],
      locale: "en_IN",
      type: "website"
    }
  };
}

export function buildServiceMetadata({title, summary, slug}: {title: string; summary: string; slug: string}): Metadata {
  return buildPageMetadata({
    title: `${title} in Indiranagar, Bengaluru`,
    description: `${summary} Available at Emerge Dental Studio in Indiranagar, Bengaluru.`,
    path: `/services/${slug}`
  });
}
