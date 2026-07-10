import type {Metadata} from "next";
import Link from "next/link";
import {BookingForm} from "@/components/BookingForm";
import {formatAddress} from "@/lib/siteData";
import {getPageBySlug, getSiteSettings} from "@/lib/sanity/queries";

const contactServiceAreas = ["Indiranagar", "Koramangala", "Domlur", "Ulsoor", "Cambridge layout"];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("contact");
  return {
    title: page.seoTitle,
    description: page.seoDescription
  };
}

export default async function ContactPage() {
  const [settings, page] = await Promise.all([getSiteSettings(), getPageBySlug("contact")]);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${settings.clinicName} ${formatAddress(settings)}`
  )}`;

  return (
    <main>
      <section className="page-hero contact-hero">
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1>{page.heroTitle}</h1>
        </div>
      </section>
      <section className="container section contact-grid">
        <div className="info-card">
          <div>
            <h2>Address</h2>
            <p>{formatAddress(settings)}</p>
          </div>
          <div>
            <h2>Phone</h2>
            <p>{settings.phone}</p>
          </div>
          <div>
            <h2>Hours</h2>
            {settings.hours.map((hour) => (
              <p key={`${hour.days}-${hour.label}`}>
                {hour.days}: {hour.label}
              </p>
            ))}
            <p>Sunday: Closed</p>
          </div>
          <div className="actions">
            <a className="button secondary" href={directionsUrl} target="_blank" rel="noreferrer">
              Get directions
            </a>
            <Link className="button ghost" href={settings.bookingUrl} target="_blank">
              Book online
            </Link>
          </div>
        </div>
        <div>
          <BookingForm settings={settings} />
          <ul className="service-area-list" aria-label="Nearby service areas">
            {contactServiceAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
