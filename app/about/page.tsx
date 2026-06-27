import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {doctor} from "@/lib/siteData";
import {getPageBySlug} from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("about");
  return {
    title: page.seoTitle,
    description: page.seoDescription
  };
}

export default async function AboutPage() {
  const page = await getPageBySlug("about");

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">About</p>
          <h1>{page.heroTitle}</h1>
          <p>{page.heroText}</p>
        </div>
      </section>
      <section className="container section split">
        <Image
          className="doctor-photo"
          src="/images/dr-tanisha-kaulavkar.jpg"
          alt="Dr. Tanisha Kaulavkar at Emerge Dental Studio"
          width={600}
          height={800}
          priority
        />
        <div className="rich-text">
          <h2>{doctor.qualifications}</h2>
          <p>{doctor.intro}</p>
          {doctor.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul className="credential-list">
            <li>Chief Dentist at Emerge Dental Studio</li>
            <li>Maxillofacial Prosthodontist and Implantologist</li>
            <li>Member of the Indian Prosthodontics Society</li>
          </ul>
          <div className="actions">
            <Link className="button" href="/contact">
              Book an appointment
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
