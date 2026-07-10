import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {getPageBySlug, getServices} from "@/lib/sanity/queries";
import styles from "./services.module.css";

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
        <div className={`container ${styles.servicesHeroInner}`}>
          <div>
            <p className="eyebrow">Services</p>
            <h1>{page.heroTitle}</h1>
            <p>{page.heroText}</p>
          </div>
          <div className={styles.servicesHeroCard}>
            <strong>{services.length}</strong>
            <p>Complete treatment guides with benefits, process, aftercare, FAQs, and a direct WhatsApp enquiry path.</p>
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-header">
          <p className="eyebrow">Services</p>
          <h2>{intro?.title || "Choose the care you need"}</h2>
          {intro?.body ? <p>{intro.body}</p> : null}
        </div>
        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <article className={styles.serviceCard} key={service.slug}>
              <Image src={service.imageSrc} alt={service.imageAlt} width={720} height={420} />
              <div className={styles.serviceCardBody}>
                <p className="eyebrow">{service.eyebrow}</p>
                <h2>{service.title}</h2>
                <p>{service.summary}</p>
                <Link href={`/services/${service.slug}`} aria-label={`Read more about ${service.title}`}>
                  View treatment guide
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
