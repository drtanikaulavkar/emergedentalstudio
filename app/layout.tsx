import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import {Footer} from "@/components/Footer";
import {Header} from "@/components/Header";
import {JsonLd} from "@/components/JsonLd";
import {formatAddress} from "@/lib/siteData";
import {getSiteSettings} from "@/lib/sanity/queries";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap"
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
  const settings = await getSiteSettings();
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
      <body className={poppins.className}>
        <Header settings={settings} />
        <JsonLd data={jsonLd} />
        {children}
        <Footer settings={settings} />
      </body>
    </html>
  );
}
