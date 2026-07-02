import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type {Metadata} from "next";
import {HeroCarousel} from "@/components/HeroCarousel";
import {SectionHeader} from "@/components/SectionHeader";
import {ServiceCard} from "@/components/ServiceCard";
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
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment through WhatsApp, the online booking link, or by calling us directly on +91 82968 01240."
  },
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
  },
  {
    question: "What are the timings of the dental clinic?",
    answer:
      "The clinic is open from 10 AM to 1 PM and 4 PM to 8 PM, Monday through Saturday. The clinic is closed on Sundays."
  }
];

const whyChooseItems = [
  {
    title: "Individualized & Family Dental Care",
    icon: "family"
  },
  {
    title: "Certified Dentists & Advanced Equipment",
    icon: "certified"
  },
  {
    title: "Digital X-rays & Digital Impressions",
    icon: "digital"
  },
  {
    title: "Affordable & Transparent Pricing",
    icon: "pricing"
  },
  {
    title: "Hygienic & Comfortable Environment",
    icon: "hygiene"
  },
  {
    title: "Lift access & Gender neutral restroom",
    icon: "access"
  }
] as const;

type WhyChooseIconName = (typeof whyChooseItems)[number]["icon"];

function WhyChooseIcon({name}: {name: WhyChooseIconName}) {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label="" focusable="false">
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
      {name === "pricing" ? (
        <>
          <path d="M10 14h28v20H10z" />
          <path d="M16 24h16" />
          <path d="M16 29h10" />
          <circle cx="33" cy="19" r="3" />
        </>
      ) : null}
      {name === "hygiene" ? (
        <>
          <path d="M24 8l3.2 8.8L36 20l-8.8 3.2L24 32l-3.2-8.8L12 20l8.8-3.2L24 8z" />
          <path d="M36 30l1.5 4.5L42 36l-4.5 1.5L36 42l-1.5-4.5L30 36l4.5-1.5L36 30z" />
        </>
      ) : null}
      {name === "access" ? (
        <>
          <path d="M17 34V16" />
          <path d="M11 22l6-6 6 6" />
          <circle cx="32" cy="15" r="4" />
          <path d="M26 38v-8c0-4 12-4 12 0v8" />
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
  const bookingMessage = "Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%21";
  const whatsappBookingUrl = `https://wa.me/${settings.whatsappNumber}?text=${bookingMessage}`;
  const mapsUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0059496583885!2d77.63272917520163!3d12.971470887343878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17258ff3f73d%3A0xa4f9b26340b29668!2sEmerge%20Dental%20Studio%20%7C%20Dentist%2C%20Prosthodontist%20%7C%207th%20Main%2C%20Indiranagar!5e0!3m2!1sen!2sin!4v1682962797284!5m2!1sen!2sin";

  return (
    <main>
      <section className="container hero">
        <div className="hero-copy">
          <p className="section-kicker">Dental implants, cosmetic dentistry, and prosthodontic care in Indiranagar, Bengaluru</p>
        </div>
        <aside className="hero-media" aria-label="Emerge Dental Studio highlights">
          <HeroCarousel slides={carouselSlides} />
          <a className="button secondary hero-booking" href={whatsappBookingUrl} target="_blank" rel="noreferrer">
            Book online
          </a>
        </aside>
      </section>

      <section className="container section services-section">
        <SectionHeader eyebrow="Services" title={servicesIntro?.title || "Care for every stage of your smile"} />
        <div className="grid service-grid">
          {services.slice(0, 6).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
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
            <p className="section-kicker">Why choose us</p>
            <h2>Why Choose Our Dental Clinic in Bengaluru?</h2>
          </div>
          <div className="why-choose-grid" aria-label="Reasons to choose Emerge Dental Studio">
            {whyChooseItems.map((item) => (
              <article className="why-choose-item" key={item.title}>
                <span className="why-choose-icon" aria-hidden="true">
                  <WhyChooseIcon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section reviews-section">
        <div className="container">
          <SectionHeader title="Google reviews">Hear what our patients have to say about us</SectionHeader>
          <Script src="https://apps.elfsight.com/p/platform.js" strategy="lazyOnload" />
          <div className="reviews-widget">
            <div className="elfsight-app-ff647765-4f7b-4dc5-bd88-b5235109b9ca" />
          </div>
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
            <h2>Visit Emerge Dental Studio</h2>
            <p>{formatAddress(settings)}</p>
            <div className="contact-actions">
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
              {settings.closedDays.map((day) => (
                <p key={day}>
                  <strong className="hours-day">{day}</strong>
                  <span className="hours-time">Closed</span>
                </p>
              ))}
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
