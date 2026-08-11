import type {Metadata} from "next";
import {CalendarDays} from "lucide-react";
import {ServiceCard} from "@/components/ServiceCard";
import {Button} from "@/components/ui/button";
import {buildPageMetadata} from "@/lib/seo";
import {getPageBySlug, getServices} from "@/lib/sanity/queries";
import styles from "./services.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("services");
  return buildPageMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: "/services"
  });
}

export default async function ServicesPage() {
  const [services, page] = await Promise.all([getServices(), getPageBySlug("services")]);
  const intro = page.sections[0];

  return (
    <main>
      <section className={styles.servicesHero}>
        <div className={`container ${styles.servicesHeroInner}`}>
          <div className={styles.servicesHeroCopy}>
            <p className="eyebrow">Treatment library</p>
            <h1>{page.heroTitle}</h1>
            <p>{page.heroText}</p>
            <Button asChild size="lg" className={styles.servicesHeroAction}>
              <a href="#treatments">
                <CalendarDays aria-hidden="true" />
                Explore treatments
              </a>
            </Button>
          </div>
          <div className={styles.servicesHeroIndex} aria-label={`${services.length} treatment guides`}>
            <strong>{String(services.length).padStart(2, "0")}</strong>
            <span>Treatment guides</span>
            <p>Benefits, process, aftercare, answers, and a clear next step.</p>
          </div>
        </div>
      </section>
      <section className={`container section ${styles.servicesDirectory}`} id="treatments">
        <div className={`section-header ${styles.servicesDirectoryHeader}`}>
          <p className="eyebrow">Find your treatment</p>
          <h2>{intro?.title || "Choose the care you need"}</h2>
          {intro?.body ? <p>{intro.body}</p> : null}
        </div>
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <ServiceCard service={service} index={index} key={service.slug} />
          ))}
        </div>
      </section>
    </main>
  );
}
