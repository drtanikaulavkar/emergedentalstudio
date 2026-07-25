"use client";

import {useEffect, useRef, useState} from "react";
import type {CSSProperties} from "react";
import type {Service} from "@/lib/siteData";
import {ServiceCard} from "@/components/ServiceCard";

export function ServicesCarousel({services}: {services: Service[]}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const updateArrowState = () => {
      setCanGoBack(rail.scrollLeft > 8);
    };

    updateArrowState();
    rail.addEventListener("scroll", updateArrowState, {passive: true});
    window.addEventListener("resize", updateArrowState);

    return () => {
      rail.removeEventListener("scroll", updateArrowState);
      window.removeEventListener("resize", updateArrowState);
    };
  }, []);

  const scrollRail = (direction: -1 | 1) => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    rail.scrollBy({
      left: direction * rail.clientWidth * 0.82,
      behavior: "smooth"
    });
  };

  return (
    <div className="services-carousel">
      <button
        className="services-carousel-arrow services-carousel-arrow-prev"
        type="button"
        aria-label="Previous services"
        aria-hidden={!canGoBack}
        disabled={!canGoBack}
        data-visible={canGoBack}
        onClick={() => scrollRail(-1)}
      >
        <span aria-hidden="true">&lt;</span>
      </button>
      <div className="services-carousel-viewport">
        <div className="services-carousel-rail motion-sequence" ref={railRef}>
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} style={{"--i": index} as CSSProperties} />
          ))}
        </div>
      </div>
      <button
        className="services-carousel-arrow services-carousel-arrow-next"
        type="button"
        aria-label="Next services"
        onClick={() => scrollRail(1)}
      >
        <span aria-hidden="true">&gt;</span>
      </button>
    </div>
  );
}
