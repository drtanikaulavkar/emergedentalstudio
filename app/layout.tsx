import type {Metadata} from "next";
import {Manrope} from "next/font/google";
import {Analytics} from "@vercel/analytics/next";
import {SpeedInsights} from "@vercel/speed-insights/next";
import "./globals.css";
import {Footer} from "@/components/Footer";
import {Header} from "@/components/Header";
import {JsonLd} from "@/components/JsonLd";
import {formatAddress} from "@/lib/siteData";
import {getServices, getSiteSettings} from "@/lib/sanity/queries";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope"
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    metadataBase: new URL(settings.siteUrl),
    title: {
      default: settings.title,
      template: `%s | ${settings.clinicName}`
    },
    description: settings.description,
    openGraph: {
      title: settings.title,
      description: settings.description,
      url: settings.siteUrl,
      siteName: settings.clinicName,
      images: [{url: "/images/emerge-logo.png", width: 671, height: 168}],
      locale: "en_IN",
      type: "website"
    }
  };
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);
  const whatsappMessage = "Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%21";
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${whatsappMessage}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: settings.clinicName,
    image: `${settings.siteUrl}/images/emerge-logo.png`,
    url: settings.siteUrl,
    telephone: settings.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address.street,
      addressLocality: `${settings.address.locality}, ${settings.address.city}`,
      addressRegion: settings.address.region,
      postalCode: settings.address.postalCode,
      addressCountry: settings.address.country
    },
    openingHoursSpecification: settings.hours.map((hour) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: hour.opens,
      closes: hour.closes
    })),
    areaServed: settings.serviceAreas,
    description: settings.description
  };

  return (
    <html lang="en">
      <body className={manrope.variable}>
        <Header settings={settings} services={services} />
        <JsonLd data={jsonLd} />
        {children}
        <Footer settings={settings} />
        <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
          <svg aria-hidden="true" viewBox="0 0 32 32" focusable="false">
            <path
              fill="currentColor"
              d="M16.02 3.2c-7.06 0-12.8 5.72-12.8 12.76 0 2.26.6 4.47 1.74 6.42L3.1 29.2l6.99-1.83a12.8 12.8 0 0 0 5.93 1.5c7.06 0 12.8-5.72 12.8-12.76S23.08 3.2 16.02 3.2Zm0 23.52c-1.9 0-3.76-.5-5.39-1.45l-.39-.23-4.15 1.09 1.11-4.04-.26-.42a10.57 10.57 0 0 1-1.62-5.71c0-5.86 4.8-10.63 10.7-10.63s10.7 4.77 10.7 10.63-4.8 10.76-10.7 10.76Zm5.87-7.96c-.32-.16-1.9-.94-2.2-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.22-.37.24-.69.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.52 1.83.67.77.24 1.46.21 2.01.13.61-.09 1.9-.78 2.17-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z"
            />
          </svg>
          <span className="floating-whatsapp-label">WhatsApp</span>
        </a>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
