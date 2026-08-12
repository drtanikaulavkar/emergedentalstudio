import {groq} from "next-sanity";
import {client} from "./client";
import {pages, services, siteSettings, type PageContent, type Service, type SiteSettings} from "@/lib/siteData";
import {
  mergePageContent,
  mergeServiceContent,
  mergeSiteSettings,
  type CmsPageContent,
  type CmsService,
  type CmsSiteSettings
} from "./contentMerge";

const localServiceBySlug = new Map(services.map((service) => [service.slug, service]));

function withLocalServiceContent(service: CmsService): Service {
  return mergeServiceContent(service, localServiceBySlug.get(service.slug));
}

const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  title,
  description,
  siteUrl,
  clinicName,
  phone,
  whatsappNumber,
  email,
  bookingUrl,
  address,
  hours,
  closedDays,
  serviceAreas,
  testimonials
}`;

const servicesQuery = groq`*[_type == "service"] | order(orderRank asc, title asc){
  title,
  "slug": slug.current,
  eyebrow,
  summary,
  description,
  imageSrc,
  imageAlt,
  highlights,
  benefits,
  process[]{title, body},
  aftercare,
  brands[]{name, logoSrc, logoAlt},
  beforeAfter[]{title, beforeImageSrc, beforeImageAlt, afterImageSrc, afterImageAlt, caption},
  sections[]{title, intro, items},
  faqs[]{question, answer},
  relatedServices,
  image
}`;

const serviceQuery = groq`*[_type == "service" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  eyebrow,
  summary,
  description,
  imageSrc,
  imageAlt,
  highlights,
  benefits,
  process[]{title, body},
  aftercare,
  brands[]{name, logoSrc, logoAlt},
  beforeAfter[]{title, beforeImageSrc, beforeImageAlt, afterImageSrc, afterImageAlt, caption},
  sections[]{title, intro, items},
  faqs[]{question, answer},
  relatedServices,
  image
}`;

const pageQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  seoTitle,
  seoDescription,
  heroTitle,
  heroText,
  sections[]{title, body},
  image
}`;

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const data = await client.fetch<CmsSiteSettings | null>(siteSettingsQuery, {}, {next: {revalidate: 60}});
    return data?.clinicName
      ? mergeSiteSettings(siteSettings, data)
      : siteSettings;
  } catch {
    return siteSettings;
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const data = await client.fetch<CmsService[] | null>(servicesQuery, {}, {next: {revalidate: 60}});
    return data?.length ? data.map(withLocalServiceContent) : services;
  } catch {
    return services;
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  try {
    const data = await client.fetch<CmsService | null>(serviceQuery, {slug}, {next: {revalidate: 60}});
    return data ? withLocalServiceContent(data) : services.find((service) => service.slug === slug);
  } catch {
    return services.find((service) => service.slug === slug);
  }
}

export async function getPageBySlug(slug: keyof typeof pages | string): Promise<PageContent> {
  try {
    const data = await client.fetch<CmsPageContent | null>(pageQuery, {slug}, {next: {revalidate: 60}});
    const fallback = pages[slug] || pages.home;
    return data?.title
      ? mergePageContent(fallback, data)
      : fallback;
  } catch {
    return pages[slug] || pages.home;
  }
}
