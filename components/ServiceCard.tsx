import Image from "next/image";
import Link from "next/link";
import type {Service} from "@/lib/siteData";

export function ServiceCard({service}: {service: Service}) {
  return (
    <article className="service-card">
      <Image className="service-card-image" src={service.imageSrc} alt={service.imageAlt} width={720} height={420} />
      <p className="eyebrow">{service.eyebrow}</p>
      <h3>{service.title}</h3>
      <p>{service.summary}</p>
      <Link href={`/services/${service.slug}`} aria-label={`Read more about ${service.title}`}>
        Learn more
      </Link>
    </article>
  );
}
