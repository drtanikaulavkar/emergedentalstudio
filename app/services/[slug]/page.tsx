import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {getServiceBySlug, getServices, getSiteSettings} from "@/lib/sanity/queries";
import styles from "../services.module.css";

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
  const [service, services, settings] = await Promise.all([getServiceBySlug(slug), getServices(), getSiteSettings()]);

  if (!service) {
    notFound();
  }

  const whatsappHref = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    `I want to know more about ${service.title}`
  )}`;
  const relatedServices = services.filter((item) => service.relatedServices.includes(item.slug));
  const guideItems = [
    ["benefits", "Benefits"],
    ["process", "Treatment process"],
    ["aftercare", "Aftercare"],
    ...(service.brands?.length ? [["brands", service.slug === "braces-aligners" ? "Brands used" : "Implant brands"]] : []),
    ...(service.beforeAfter?.length ? [["before-after", "Before / after"]] : []),
    ...(service.sections.length ? [["details", "More details"]] : []),
    ["faqs", "FAQs"]
  ];

  return (
    <main>
      <section className={styles.serviceHero}>
        <div className={`container ${styles.serviceHeroGrid}`}>
          <div>
            <p className="eyebrow">{service.eyebrow}</p>
            <h1>{service.title}</h1>
            <p className={styles.serviceIntro}>{service.description}</p>
            <a className={styles.heroAction} href={whatsappHref} target="_blank" rel="noreferrer">
              Enquire on WhatsApp
            </a>
          </div>
          <Image className={styles.heroImage} src={service.imageSrc} alt={service.imageAlt} width={960} height={720} priority />
        </div>
      </section>

      <section className={`container ${styles.serviceLayout}`}>
        <aside className={styles.pageGuide}>
          <strong>On this page</strong>
          {guideItems.map(([id, label]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </aside>

        <div className={styles.serviceContent}>
          <section className={styles.serviceSection} id="benefits">
            <h2>Benefits</h2>
            <ul className={styles.benefitsList}>
              {service.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </section>

          <section className={styles.serviceSection} id="process">
            <h2>{service.title === "Dental Implants" ? "The Dental Implant Process" : "Treatment Process"}</h2>
            <div className={styles.processList}>
              {service.process.map((step, index) => (
                <article className={styles.processStep} key={step.title}>
                  <span className={styles.stepNumber}>{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.serviceSection} id="aftercare">
            <h2>Aftercare</h2>
            <ul className={styles.aftercareList}>
              {service.aftercare.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {service.brands?.length ? (
            <section className={styles.serviceSection} id="brands">
              <h2>{service.slug === "braces-aligners" ? "Brands Used" : "Implant Brands Used"}</h2>
              <div className={styles.brandGrid}>
                {service.brands.map((brand) => (
                  <article className={styles.brandCard} key={brand.name}>
                    <Image src={brand.logoSrc} alt={brand.logoAlt} width={240} height={90} />
                    <span>{brand.name}</span>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {service.beforeAfter?.length ? (
            <section className={styles.serviceSection} id="before-after">
              <h2>Before / After</h2>
              <p className={styles.sectionIntro}>
                Published cases can be managed in Sanity with consent-safe images and captions for each treatment.
              </p>
              <div className={styles.beforeAfterGrid}>
                {service.beforeAfter.map((item) => (
                  <article className={styles.caseCard} key={item.title}>
                    <div className={styles.caseImages}>
                      <div className={styles.caseImagePanel}>
                        <Image src={item.beforeImageSrc} alt={item.beforeImageAlt} width={640} height={420} />
                        <span className={styles.caseLabel}>Before</span>
                      </div>
                      <div className={styles.caseImagePanel}>
                        <Image src={item.afterImageSrc} alt={item.afterImageAlt} width={640} height={420} />
                        <span className={styles.caseLabel}>After</span>
                      </div>
                    </div>
                    <div className={styles.caseBody}>
                      <h3>{item.title}</h3>
                      <p className={styles.caseCaption}>{item.caption}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {service.sections.length ? (
            <section className={styles.serviceSection} id="details">
              <h2>More Details</h2>
              <div className={styles.sectionCards}>
                {service.sections.map((section) => (
                  <article className={styles.sectionCard} key={section.title}>
                    <h3>{section.title}</h3>
                    {section.intro ? <p>{section.intro}</p> : null}
                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <section className={styles.serviceSection} id="faqs">
            <h2>Frequently Asked Questions</h2>
            <div className={styles.faqGrid}>
              {service.faqs.map((faq) => (
                <article className={styles.faqCard} key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          {relatedServices.length ? (
            <section className={styles.serviceSection}>
              <h2>Related Services</h2>
              <div className={styles.relatedGrid}>
                {relatedServices.map((item) => (
                  <Link className={styles.relatedPill} href={`/services/${item.slug}`} key={item.slug}>
                    {item.title}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>

      <section className={`container section`}>
        <div className={styles.finalCta}>
          <div>
            <h2>Want to know if {service.title.toLowerCase()} is right for you?</h2>
            <p>Send a quick WhatsApp enquiry and the clinic can guide you to the right next step.</p>
          </div>
          <a className={styles.heroAction} href={whatsappHref} target="_blank" rel="noreferrer">
            Enquire on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
