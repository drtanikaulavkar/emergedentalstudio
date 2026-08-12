import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {ArrowRight, ArrowUpRight, BadgeCheck, CalendarDays, Clock3, MapPin, MessageCircle, Phone} from "lucide-react";
import type {Metadata} from "next";
import {FaqAccordion} from "@/components/FaqAccordion";
import {HeroCaptionReveal} from "@/components/HeroCaptionReveal";
import {HeroCarousel} from "@/components/HeroCarousel";
import {SectionHeader} from "@/components/SectionHeader";
import {ServicesCarousel} from "@/components/ServicesCarousel";
import {WhyChooseIcon, type WhyChooseIconName} from "@/components/WhyChooseIcon";
import {doctor, formatAddress} from "@/lib/siteData";
import {buildPageMetadata} from "@/lib/seo";
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
] satisfies {title: string; icon: WhyChooseIconName}[];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("home");
  return buildPageMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: "/"
  });
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
            <HeroCaptionReveal>
              <div className="hero-caption-copy">
                <h1>
                  <span className="hero-title-line">Beautiful Smiles.</span>
                  <span className="hero-title-line">Built on Precision.</span>
                </h1>
                <p>
                  <span className="hero-subtitle-line">Specialist-led cosmetic & implant dentistry in Indiranagar, Bengaluru.</span>
                  <span className="hero-subtitle-line">From smile makeovers to routine care, designed around you.</span>
                </p>
                <a className="button secondary hero-booking" href={whatsappBookingUrl} target="_blank" rel="noreferrer">
                  <CalendarDays aria-hidden="true" />
                  Book a Consultation
                </a>
              </div>
            </HeroCaptionReveal>
          </div>
        </aside>
      </section>

      <section className="section services-section homepage-deferred-section">
        <div className="container services-content">
          <SectionHeader eyebrow="Services" title={servicesIntro?.title || "Care for every stage of your smile"}>
          </SectionHeader>
          <ServicesCarousel services={featuredServices} />
          <div className="actions">
            <Link className="button ghost" href="/services">
              View all services
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section doctor-section homepage-deferred-section">
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
            <p className="doctor-credential">
              <BadgeCheck aria-hidden="true" />
              {doctor.role} - {doctor.qualifications}
            </p>
            <p>{doctor.intro}</p>
            <Link className="button ghost doctor-link" href="/about">
              Meet Dr. Tanisha
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section why-choose-section homepage-deferred-section">
        <div className="container why-choose-layout">
          <div className="why-choose-heading">
            <p className="section-kicker">Facilities</p>
            <h2>Why choose us?</h2>
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

      <section className="section reviews-section homepage-deferred-section">
        <div className="container">
          <SectionHeader eyebrow="Hear what our patients have to say about us" title="Patients reviews" />
          <Script src="https://apps.elfsight.com/p/platform.js" strategy="lazyOnload" />
          <div className="reviews-widget">
            <div className="elfsight-app-ff647765-4f7b-4dc5-bd88-b5235109b9ca" />
          </div>
        </div>
      </section>

      <section className="section gallery-section homepage-deferred-section">
        <div className="container gallery-content">
          <SectionHeader eyebrow="Smile gallery" title="Results that speak" />
          <div className="gallery-grid">
            <article className="gallery-card">
              <div className="before-after-preview">
                <Image src="/images/before-after/smile-before.svg" alt="Before-treatment gallery preview illustration" width={360} height={240} />
                <Image src="/images/before-after/smile-after.svg" alt="After-treatment gallery preview illustration" width={360} height={240} />
              </div>
              <h3>Before-after smile transformations</h3>
              <p>New cosmetic, implant, and restorative treatment cases will be added soon.</p>
            </article>
            <article className="gallery-card video-placeholder">
              <span className="video-play" aria-hidden="true" />
              <h3>Patient testimonial videos</h3>
              <p>Short patient stories and treatment experience videos will be added soon.</p>
            </article>
            <article className="gallery-card video-placeholder">
              <span className="video-play" aria-hidden="true" />
              <h3>Smile makeover walkthroughs</h3>
              <p>Planning, design, and final-smile walkthroughs will be added soon.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section faq-section homepage-deferred-section">
        <div className="container faq-layout">
          <Image className="faq-image" src="/images/home-faq.jpg" alt="Emerge Dental Studio consultation space" width={1004} height={1318} />
          <div>
            <p className="section-kicker">Before you visit</p>
            <h2>Frequently asked questions</h2>
            <FaqAccordion items={faqs} defaultOpenFirst />
          </div>
        </div>
      </section>

      <section className="section contact-section homepage-deferred-section">
        <div className="container contact-home">
          <div className="contact-card">
            <p className="section-kicker">Contact us</p>
            <h2>Visit us</h2>
            <a className="home-address-link" href={directionsUrl} target="_blank" rel="noreferrer">
              <MapPin aria-hidden="true" />
              <span>{formatAddress(settings)}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <div className="contact-actions" aria-label="Contact options">
              <a className="contact-text-link" href={`tel:${settings.phone}`}>
                <Phone aria-hidden="true" />
                {settings.phone}
              </a>
              <a className="contact-text-link" href={whatsappBookingUrl} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" />
                WhatsApp booking
              </a>
            </div>
            <div className="hours-list clinic-hours">
              <p className="clinic-hours-heading">
                <strong className="hours-day">
                  <Clock3 aria-hidden="true" />
                  <span>Timings</span>
                </strong>
              </p>
              <p>
                <strong className="hours-day">Monday to Saturday</strong>
                <span className="hours-time">10:00 AM to 1:00 PM</span>
                <span className="hours-time">4:00 PM to 8:00 PM</span>
              </p>
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
