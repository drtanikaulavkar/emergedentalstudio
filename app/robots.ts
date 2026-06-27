import type {MetadataRoute} from "next";
import {siteSettings} from "@/lib/siteData";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteSettings.siteUrl.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio"
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
