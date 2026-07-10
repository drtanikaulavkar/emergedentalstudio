import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {getServiceBySlug, getServices} from "@/lib/sanity/queries";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({slug: service.slug}));
}

type ServicePageProps = {
  params: Promise<{slug: string}>;
};

export async function generateMetadata({params}: ServicePageProps): Promise<Metadata> {
  const {slug} = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.summary
  };
}

export default async function ServiceDetailPage({params}: ServicePageProps) {
  const {slug} = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">{service.eyebrow}</p>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
          <div className="actions">
            <Link className="button" href="/contact">
              Book appointment
            </Link>
            <Link className="button ghost" href="/services">
              All services
            </Link>
          </div>
        </div>
      </section>
      <section className="container section service-detail">
        <aside className="detail-block">
          <h2>Highlights</h2>
          <ul className="check-list">
            {service.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </aside>
        <div className="grid">
          {service.sections.map((section) => (
            <section className="detail-block" key={section.title}>
              <h2>{section.title}</h2>
              <ul className="check-list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
