import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type {Metadata} from "next";
import type {CSSProperties} from "react";
import {HeroCarousel} from "@/components/HeroCarousel";
import {SectionHeader} from "@/components/SectionHeader";
import {ServicesCarousel} from "@/components/ServicesCarousel";
import {doctor, formatAddress} from "@/lib/siteData";
import {getPageBySlug, getServices, getSiteSettings} from "@/lib/sanity/queries";

const carouselSlides = [
  {
    caption: "Personalized Smile & Implant care",
    src: "/images/home-carousel-1.jpg",
    alt: "Dental care in progress at Emerge Dental Studio",
    focalPoint: "50% 58%",
    mobileFocalPoint: "54% 58%"
  },
  {
    caption: "Advanced. Gentle. Trusted.",
    src: "/images/home-carousel-2.jpg",
    alt: "Modern dental treatment room at Emerge Dental Studio",
    focalPoint: "50% 60%",
    mobileFocalPoint: "48% 58%"
  },
  {
    caption: "Expert care for every smile",
    src: "/images/home-carousel-3.jpg",
    alt: "Emerge Dental Studio team and clinic care",
    focalPoint: "54% 56%",
    mobileFocalPoint: "52% 58%"
  }
];

const faqs = [
  {
    question: "Do you offer emergency dental services?",
    answer:
      "Yes. Emerge Dental Studio provides same-day emergency appointments for issues like tooth trauma, broken teeth, and extreme toothaches."
  },
  {
    question: "How often should I visit the dentist?",
    answer: "Dental check-ups are recommended every 6 months to maintain healthy teeth and gums and catch issues early."
  },
  {
    question: "Are dental treatments painful?",
    answer:
      "Patient comfort is a priority. We use advanced, minimally invasive techniques and local anesthesia to support a pain-free experience."
  },
  {
    question: "Is the dental clinic kid-friendly?",
    answer:
      "Yes. Emerge Dental Studio offers pediatric dental care in a friendly, calming environment to make your child's visit stress-free."
  },
  {
    question: "What should I expect during my first visit?",
    answer:
      "Your first visit includes a full-mouth examination, digital X-rays if needed, a consultation, and a customized treatment plan with charge estimates."
  },
  {
    question: "What payment options do you offer?",
    answer:
      "We accept cash, credit card, debit card, Paytm, Google Pay, PhonePe, CRED, and other UPI payment methods."
  }
];

const featuredServiceSlugs = [
  "dental-implants",
  "cosmetic-dentistry",
  "braces-aligners",
  "root-canal-treatment",
  "pediatric-dentistry",
  "teeth-cleaning-whitening",
  "crowns-bridges"
];

const whyChooseItems = [
  {
    metric: "24+",
    title: "Years Of Experience",
    icon: "certified"
  },
  {
    metric: "15000+",
    title: "Happy Patients",
    icon: "family"
  },
  {
    metric: "Advanced",
    title: "Digital Dentistry",
    icon: "digital"
  },
  {
    metric: "International",
    title: "Sterilization Protocols",
    icon: "hygiene"
  }
] as const;

type WhyChooseIconName = (typeof whyChooseItems)[number]["icon"];

function WhyChooseIcon({name}: {name: WhyChooseIconName}) {
  return (
    <svg className="why-choose-icon-path" viewBox="0 0 48 48" role="img" aria-label="" focusable="false">
      {name === "family" ? (
        <>
          <circle cx="19" cy="18" r="5" />
          <circle cx="31" cy="18" r="5" />
          <path d="M11 35c2.2-6 13.8-6 16 0" />
          <path d="M21 35c2.2-6 13.8-6 16 0" />
        </>
      ) : null}
      {name === "certified" ? (
        <>
          <path d="M24 7l14 6v10c0 9-5.8 15.2-14 18-8.2-2.8-14-9-14-18V13l14-6z" />
          <path d="M17 24l5 5 10-11" />
        </>
      ) : null}
      {name === "digital" ? (
        <>
          <rect x="12" y="12" width="24" height="20" rx="3" />
          <path d="M17 26l6-8 5 7 3-4" />
          <path d="M18 38h12" />
          <path d="M24 32v6" />
        </>
      ) : null}
      {name === "hygiene" ? (
        <>
          <path d="M24 8l3.2 8.8L36 20l-8.8 3.2L24 32l-3.2-8.8L12 20l8.8-3.2L24 8z" />
          <path d="M36 30l1.5 4.5L42 36l-4.5 1.5L36 42l-1.5-4.5L30 36l4.5-1.5L36 30z" />
        </>
      ) : null}
    </svg>
  );
}

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
  const featuredServices = featuredServiceSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is (typeof services)[number] => Boolean(service));
  const bookingMessage = "Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%21";
  const whatsappBookingUrl = `https://wa.me/${settings.whatsappNumber}?text=${bookingMessage}`;
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Emerge%20Dental%20Studio%20Indiranagar%20Bengaluru";
  const mapsUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0059496583885!2d77.63272917520163!3d12.971470887343878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17258ff3f73d%3A0xa4f9b26340b29668!2sEmerge%20Dental%20Studio%20%7C%20Dentist%2C%20Prosthodontist%20%7C%207th%20Main%2C%20Indiranagar!5e0!3m2!1sen!2sin!4v1682962797284!5m2!1sen!2sin";

  return (
    <main>
      <section className="hero" aria-label="Emerge Dental Studio highlights">
        <HeroCarousel slides={carouselSlides} />
        <aside className="container hero-copy">
          <div className="hero-caption">
            <div>
              <h1>Beautiful Smiles. Built on Precision.</h1>
              <p>Specialist-led cosmetic & implant dentistry in Indiranagar, Bengaluru. From smile makeovers to routine care, every treatment is designed around you.</p>
            </div>
            <a className="button secondary hero-booking" href={whatsappBookingUrl} target="_blank" rel="noreferrer">
              Book online
            </a>
          </div>
        </aside>
      </section>

      <section className="container section services-section">
        <SectionHeader eyebrow="Services" title={servicesIntro?.title || "Care for every stage of your smile"} />
        <ServicesCarousel services={featuredServices} />
        <div className="actions">
          <Link className="button ghost" href="/services">
            View all services
          </Link>
        </div>
      </section>

      <section className="section doctor-section">
        <div className="container split">
          <Image
            className="doctor-photo"
            src="/images/dr-tanisha-home.jpg"
            alt="Dr. Tanisha Kaulavkar"
            width={918}
            height={1224}
          />
          <div className="rich-text">
            <p className="section-kicker">Meet the doctor</p>
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

      <section className="section why-choose-section">
        <div className="container why-choose-layout">
          <div className="why-choose-heading">
            <p className="section-kicker">Facilities</p>
            <h2>Why choose us?</h2>
          </div>
          <div className="why-choose-grid motion-sequence" aria-label="Reasons to choose Emerge Dental Studio">
            {whyChooseItems.map((item, index) => (
              <article className="why-choose-item" key={item.title} style={{"--i": index} as CSSProperties}>
                <span className="why-choose-icon" aria-hidden="true">
                  <WhyChooseIcon name={item.icon} />
                </span>
                <div>
                  <h3>{item.metric}</h3>
                  <p>{item.title}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section reviews-section">
        <div className="container">
          <SectionHeader eyebrow="Hear what our patients have to say about us" title="Patients reviews" />
          <Script src="https://apps.elfsight.com/p/platform.js" strategy="lazyOnload" />
          <div className="reviews-widget">
            <div className="elfsight-app-ff647765-4f7b-4dc5-bd88-b5235109b9ca" />
          </div>
        </div>
      </section>

      <section className="container section gallery-section">
        <SectionHeader eyebrow="Smile gallery" title="Results that speak" />
        <div className="gallery-grid">
          <article className="gallery-card">
            <div className="before-after-preview">
              <Image src="/images/before-after/smile-before.svg" alt="Before smile makeover placeholder" width={360} height={240} />
              <Image src="/images/before-after/smile-after.svg" alt="After smile makeover placeholder" width={360} height={240} />
            </div>
            <h3>Before-after smile transformations</h3>
            <p>Placeholders for cosmetic, implant, and restorative treatment results.</p>
          </article>
          <article className="gallery-card video-placeholder">
            <span className="video-play" aria-hidden="true" />
            <h3>Patient testimonial videos</h3>
            <p>Space reserved for short patient stories and treatment experience videos.</p>
          </article>
          <article className="gallery-card video-placeholder">
            <span className="video-play" aria-hidden="true" />
            <h3>Smile makeover walkthroughs</h3>
            <p>Placeholders for future reels showing planning, design, and final smiles.</p>
          </article>
        </div>
      </section>

      <section className="container section faq-section">
        <div className="faq-layout">
          <Image className="faq-image" src="/images/home-faq.jpg" alt="Emerge Dental Studio consultation space" width={1004} height={1318} />
          <div>
            <p className="section-kicker">Before you visit</p>
            <h2>Frequently asked questions</h2>
            <div className="faq-list">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container contact-home">
          <div className="contact-card">
            <p className="section-kicker">Contact us</p>
            <h2>Visit us at</h2>
            <p>{formatAddress(settings)}</p>
            <div className="contact-actions">
              <a href={directionsUrl} target="_blank" rel="noreferrer">
                Get directions
              </a>
              <a href={`tel:${settings.phone}`}>{settings.phone}</a>
              <a href={whatsappBookingUrl} target="_blank" rel="noreferrer">
                WhatsApp booking
              </a>
            </div>
            <div className="hours-list">
              {settings.hours.map((hour) => (
                <p key={`${hour.days}-${hour.label}`}>
                  <strong className="hours-day">{hour.days}</strong>
                  <span className="hours-time">{hour.label}</span>
                </p>
              ))}
              {settings.closedDays.filter((day) => day !== "Sunday").map((day) => (
                <p key={day}>
                  <strong className="hours-day">{day}</strong>
                  <span className="hours-time">Closed</span>
                </p>
              ))}
              <p>
                <strong className="hours-day">Sunday</strong>
                <span className="hours-time">By appointment only</span>
              </p>
            </div>
          </div>
          <iframe
            className="map-embed"
            src={mapsUrl}
            title="Directions to Emerge Dental Studio"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
