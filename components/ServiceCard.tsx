import Image from "next/image";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import type {CSSProperties} from "react";
import type {Service} from "@/lib/siteData";

export function ServiceCard({service, index, style}: {service: Service; index: number; style?: CSSProperties}) {
  return (
    <Link
      className="service-card"
      href={`/services/${service.slug}`}
      style={style}
      aria-label={`View ${service.title}`}
    >
      <Image className="service-card-image" src={service.imageSrc} alt={service.imageAlt} width={720} height={420} />
      <div className="service-card-content">
        <div className="service-card-meta">
          <span className="service-card-index">{String(index + 1).padStart(2, "0")}</span>
          <p className="eyebrow">{service.eyebrow}</p>
        </div>
        <h3>{service.title}</h3>
        <p className="service-card-summary">{service.summary}</p>
        <span className="service-card-affordance" aria-hidden="true">
          Explore
          <ArrowUpRight />
        </span>
      </div>
    </Link>
  );
}
