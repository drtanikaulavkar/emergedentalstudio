import {groq} from "next-sanity";
import {client} from "./client";
import {pages, services, siteSettings, type PageContent, type Service, type SiteSettings} from "@/lib/siteData";

const localServiceBySlug = new Map(services.map((service) => [service.slug, service]));

function withLocalServiceContent(service: Service): Service {
  const localService = localServiceBySlug.get(service.slug);

  return localService
    ? {
        ...localService,
        ...service,
        imageSrc: service.imageSrc || localService.imageSrc,
        imageAlt: service.imageAlt || localService.imageAlt,
        highlights: service.highlights?.length ? service.highlights : localService.highlights,
        benefits: service.benefits?.length ? service.benefits : localService.benefits,
        process: service.process?.length ? service.process : localService.process,
        aftercare: service.aftercare?.length ? service.aftercare : localService.aftercare,
        brands: service.brands?.length ? service.brands : localService.brands,
        beforeAfter: service.beforeAfter?.length ? service.beforeAfter : localService.beforeAfter,
        sections: service.sections?.length ? service.sections : localService.sections,
        faqs: service.faqs?.length ? service.faqs : localService.faqs,
        relatedServices: service.relatedServices?.length ? service.relatedServices : localService.relatedServices
      }
    : service;
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
    const data = await client.fetch<Partial<SiteSettings> | null>(siteSettingsQuery, {}, {next: {revalidate: 60}});
    return data?.clinicName
      ? {
          ...siteSettings,
          ...data,
          address: data.address || siteSettings.address,
          hours: data.hours?.length ? data.hours : siteSettings.hours,
          closedDays: data.closedDays?.length ? data.closedDays : siteSettings.closedDays,
          serviceAreas: data.serviceAreas?.length ? data.serviceAreas : siteSettings.serviceAreas,
          testimonials: data.testimonials?.length ? data.testimonials : siteSettings.testimonials
        }
      : siteSettings;
  } catch {
    return siteSettings;
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const data = await client.fetch<Service[] | null>(servicesQuery, {}, {next: {revalidate: 60}});
    return data?.length ? data.map(withLocalServiceContent) : services;
  } catch {
    return services;
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  try {
    const data = await client.fetch<Service | null>(serviceQuery, {slug}, {next: {revalidate: 60}});
    return data ? withLocalServiceContent(data) : services.find((service) => service.slug === slug);
  } catch {
    return services.find((service) => service.slug === slug);
  }
}

export async function getPageBySlug(slug: keyof typeof pages | string): Promise<PageContent> {
  try {
    const data = await client.fetch<Partial<PageContent> | null>(pageQuery, {slug}, {next: {revalidate: 60}});
    const fallback = pages[slug] || pages.home;
    return data?.title
      ? {
          ...fallback,
          ...data,
          slug: data.slug || fallback.slug,
          sections: data.sections?.length ? data.sections : fallback.sections
        }
      : fallback;
  } catch {
    return pages[slug] || pages.home;
  }
}
