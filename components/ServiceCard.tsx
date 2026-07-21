import Image from "next/image";
import Link from "next/link";
import type {CSSProperties} from "react";
import type {Service} from "@/lib/siteData";

export function ServiceCard({service, style}: {service: Service; style?: CSSProperties}) {
  return (
    <Link
      className="service-card"
      href={`/services/${service.slug}`}
      style={style}
      aria-label={`View ${service.title}`}
    >
      <Image className="service-card-image" src={service.imageSrc} alt={service.imageAlt} width={720} height={420} />
      <p className="eyebrow">{service.eyebrow}</p>
      <h3>{service.title}</h3>
      <p>{service.summary}</p>
    </Link>
  );
}
