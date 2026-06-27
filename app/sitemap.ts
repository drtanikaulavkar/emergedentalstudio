import type {MetadataRoute} from "next";
import {getServices, getSiteSettings} from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);
  const baseUrl = settings.siteUrl.replace(/\/$/, "");
  const staticRoutes = ["", "/about", "/services", "/contact"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75
    }))
  ];
}
