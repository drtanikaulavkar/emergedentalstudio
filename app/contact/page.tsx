import type {Metadata} from "next";
import {ArrowUpRight, ExternalLink, Mail, MapPin, Phone} from "lucide-react";
import {BookingForm} from "@/components/BookingForm";
import {formatAddress} from "@/lib/siteData";
import {getPageBySlug, getSiteSettings} from "@/lib/sanity/queries";

const contactServiceAreas = ["Indiranagar", "Koramangala", "Domlur", "Ulsoor", "Cambridge layout"];
const contactEmail = "emergedentalstudio@gmail.com";
const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Emerge%20Dental%20Studio%20Indiranagar%20Bengaluru";
const mapsUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0059496583885!2d77.63272917520163!3d12.971470887343878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17258ff3f73d%3A0xa4f9b26340b29668!2sEmerge%20Dental%20Studio%20%7C%20Dentist%2C%20Prosthodontist%20%7C%207th%20Main%2C%20Indiranagar!5e0!3m2!1sen!2sin!4v1682962797284!5m2!1sen!2sin";
const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/emergedentalstudio/"
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100085397533519"
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/emerge-dental-studio-multispeciality-dental-clinic/?viewAsMember=true"
  }
];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("contact");
  return {
    title: page.seoTitle,
    description: page.seoDescription
  };
}

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <main>
      <section className="page-hero contact-hero">
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1>Book an appointment with us</h1>
        </div>
      </section>
      <section className="container section contact-grid">
        <div className="info-card">
          <div className="contact-detail">
            <h2>Phone</h2>
            <a className="contact-detail-link" href={`tel:${settings.phone}`}>
              <Phone aria-hidden="true" />
              <span>{settings.phone}</span>
            </a>
          </div>
          <div className="contact-detail">
            <h2>Email</h2>
            <a className="contact-detail-link" href="mailto:emergedentalstudio@gmail.com">
              <Mail aria-hidden="true" />
              <span>{contactEmail}</span>
            </a>
          </div>
          <div className="contact-detail">
            <h2>Follow us</h2>
            <div className="social-links">
              {socialLinks.map(({label, href}) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`Follow Emerge Dental Studio on ${label}`}>
                  <ExternalLink aria-hidden="true" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="contact-detail">
            <h2>Address</h2>
            <a className="contact-detail-link address-link" href={directionsUrl} target="_blank" rel="noreferrer">
              <MapPin aria-hidden="true" />
              <span>{formatAddress(settings)}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="booking-card">
          <h2>Get in touch</h2>
          <BookingForm settings={settings} />
          <ul className="service-area-list" aria-label="Nearby service areas">
            {contactServiceAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section contact-directions">
        <div className="container contact-directions-heading">
          <p className="eyebrow">Plan your visit</p>
          <h2>Directions to the Clinic</h2>
        </div>
        <div className="contact-map-shell">
          <iframe
            className="map-embed"
            src={mapsUrl}
            title="Directions to Emerge Dental Studio"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            tabIndex={-1}
          />
          <a
            className="contact-map-link"
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Get directions to Emerge Dental Studio on Google Maps"
          >
            <span>
              <MapPin aria-hidden="true" />
              Get directions
              <ArrowUpRight aria-hidden="true" />
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}
