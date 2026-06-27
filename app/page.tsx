import Image from "next/image";
import Link from "next/link";
import type {Metadata} from "next";
import {SectionHeader} from "@/components/SectionHeader";
import {ServiceCard} from "@/components/ServiceCard";
import {doctor, formatAddress} from "@/lib/siteData";
import {getPageBySlug, getServices, getSiteSettings} from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("home");
  return {
    title: page.seoTitle,
    description: page.seoDescription
  };
}

export default async function HomePage() {
  const [settings, services, page] = await Promise.all([getSiteSettings(), getServices(), getPageBySlug("home")]);
  const servicesIntro = page.sections[0];
  const cta = page.sections[1];

  return (
    <main>
      <section className="container hero">
        <div className="hero-copy">
          <p className="eyebrow">Dentist in Bengaluru</p>
          <h1>{page.heroTitle}</h1>
          <p>{page.heroText}</p>
          <div className="actions">
            <Link className="button" href="/contact">
              Book appointment
            </Link>
            <a className="button secondary" href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noreferrer">
              WhatsApp us
            </a>
            <a className="button ghost" href={settings.bookingUrl} target="_blank" rel="noreferrer">
              Book online
            </a>
          </div>
        </div>
        <aside className="hero-panel" aria-label="Clinic highlights">
          <Image src="/images/emerge-logo.png" alt="Emerge Dental Studio logo" width={420} height={105} priority />
          <div className="stat-grid">
            <div className="stat">
              <strong>5-star</strong>
              <p>Patient-focused dental care</p>
            </div>
            <div className="stat">
              <strong>BDS, MDS</strong>
              <p>Prosthodontics expertise</p>
            </div>
            <div className="stat">
              <strong>9</strong>
              <p>Core dental services</p>
            </div>
            <div className="stat">
              <strong>Indiranagar</strong>
              <p>{formatAddress(settings)}</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="section alt">
        <div className="container split">
          <Image
            className="doctor-photo"
            src="/images/dr-tanisha-kaulavkar.jpg"
            alt="Dr. Tanisha Kaulavkar"
            width={600}
            height={800}
          />
          <div className="rich-text">
            <p className="eyebrow">Meet the doctor</p>
            <h2>{doctor.name}</h2>
            <p>
              {doctor.role} - {doctor.qualifications}
            </p>
            <p>{doctor.intro}</p>
            <Link className="button ghost" href="/about">
              Read more
            </Link>
          </div>
        </div>
      </section>

      <section className="container section">
        <SectionHeader eyebrow="Services" title={servicesIntro?.title || "Dental care for every stage of your smile"}>
          {servicesIntro?.body}
        </SectionHeader>
        <div className="grid service-grid">
          {services.slice(0, 6).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <div className="actions">
          <Link className="button" href="/services">
            View all services
          </Link>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHeader eyebrow="Testimonials" title="Kind words from patients" />
          <div className="grid testimonial-grid">
            {settings.testimonials.map((testimonial) => (
              <blockquote className="testimonial" key={testimonial.name}>
                <p>{testimonial.quote}</p>
                <strong>
                  {testimonial.name} - {testimonial.rating}/5
                </strong>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="cta-band">
          <div>
            <h2>{cta?.title || "Ready to book your visit?"}</h2>
            <p>{cta?.body || "Send a WhatsApp message or book online for a convenient appointment at Emerge Dental Studio."}</p>
          </div>
          <Link className="button" href="/contact">
            Book now
          </Link>
        </div>
      </section>
    </main>
  );
}
