import type {PageContent, Service, SiteSettings} from "../siteData";

type NullableText = string | null | undefined;

export type CmsPageContent = Partial<Omit<PageContent, "seoTitle" | "seoDescription">> & {
  seoTitle?: NullableText;
  seoDescription?: NullableText;
};

export type CmsSiteSettings = Partial<Omit<SiteSettings, "title" | "description">> & {
  title?: NullableText;
  description?: NullableText;
};

export type CmsService = Omit<Service, "summary" | "description"> & {
  summary?: NullableText;
  description?: NullableText;
};

function firstNonBlank(...values: NullableText[]): string | undefined {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
}

export function mergePageContent(fallback: PageContent, data: CmsPageContent): PageContent {
  return {
    ...fallback,
    ...data,
    slug: firstNonBlank(data.slug, fallback.slug) ?? fallback.slug,
    seoTitle: firstNonBlank(data.seoTitle, fallback.seoTitle) ?? fallback.seoTitle,
    seoDescription: firstNonBlank(data.seoDescription, fallback.seoDescription) ?? fallback.seoDescription,
    sections: data.sections?.length ? data.sections : fallback.sections
  };
}

export function mergeSiteSettings(fallback: SiteSettings, data: CmsSiteSettings): SiteSettings {
  return {
    ...fallback,
    ...data,
    title: firstNonBlank(data.title, fallback.title) ?? fallback.title,
    description: firstNonBlank(data.description, fallback.description) ?? fallback.description,
    address: data.address || fallback.address,
    hours: data.hours?.length ? data.hours : fallback.hours,
    closedDays: data.closedDays?.length ? data.closedDays : fallback.closedDays,
    serviceAreas: data.serviceAreas?.length ? data.serviceAreas : fallback.serviceAreas,
    testimonials: data.testimonials?.length ? data.testimonials : fallback.testimonials
  };
}

export function mergeServiceContent(service: CmsService, localService?: Service): Service {
  const genericDescription = `Learn more about ${service.title} at Emerge Dental Studio.`;
  const summary = firstNonBlank(service.summary, localService?.summary, service.description, localService?.description) ?? genericDescription;
  const description = firstNonBlank(service.description, localService?.description, service.summary, localService?.summary) ?? summary;

  if (!localService) {
    return {...service, summary, description};
  }

  return {
    ...localService,
    ...service,
    summary,
    description,
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
  };
}
