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
    caption: "Personalised smile and implant care",
    src: "/images/home-carousel-1.jpg",
    alt: "Dental care in progress at Emerge Dental Studio"
  },
  {
    caption: "Advanced. Gentle. Trusted.",
    src: "/images/home-carousel-2.jpg",
    alt: "Modern dental treatment room at Emerge Dental Studio"
  },
  {
    caption: "Expert dentistry for your smile.",
    src: "/images/home-carousel-3.jpg",
    alt: "Emerge Dental Studio team and clinic care"
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
        <SectionHeader eyebrow="Services" title={servicesIntro?.title || "Care for every stage of your smile"}>
          {servicesIntro?.body}
        </SectionHeader>
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
