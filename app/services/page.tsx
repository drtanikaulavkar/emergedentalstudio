import type {Metadata} from "next";
import {SectionHeader} from "@/components/SectionHeader";
import {ServiceCard} from "@/components/ServiceCard";
import {getPageBySlug, getServices} from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("services");
  return {
    title: page.seoTitle,
    description: page.seoDescription
  };
}

export default async function ServicesPage() {
  const [services, page] = await Promise.all([getServices(), getPageBySlug("services")]);
  const intro = page.sections[0];

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Services</p>
          <h1>{page.heroTitle}</h1>
          <p>{page.heroText}</p>
        </div>
      </section>
      <section className="container section">
        <SectionHeader title={intro?.title || "Choose the care you need"}>{intro?.body}</SectionHeader>
        <div className="grid service-grid">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
    </main>
  );
}
