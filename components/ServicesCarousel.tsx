"use client";

import {ChevronLeft, ChevronRight} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import type {CSSProperties} from "react";
import type {Service} from "@/lib/siteData";
import {ServiceCard} from "@/components/ServiceCard";

export function ServicesCarousel({services}: {services: Service[]}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [carouselState, setCarouselState] = useState({
    activePage: 0,
    canGoBack: false,
    canGoForward: services.length > 1,
    pageCount: 1,
    visibleCount: 1
  });

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const updateCarouselState = () => {
      const firstCard = rail.firstElementChild as HTMLElement | null;

      if (!firstCard) {
        return;
      }

      const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 0;
      const cardStep = firstCard.getBoundingClientRect().width + gap;
      const visibleCount = Math.max(1, Math.floor((rail.clientWidth + gap) / cardStep + 0.01));
      const pageCount = Math.max(1, Math.ceil(services.length / visibleCount));
      const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth);
      const isAtEnd = rail.scrollLeft >= maxScroll - 8;
      const activePage = isAtEnd
        ? pageCount - 1
        : Math.min(pageCount - 1, Math.max(0, Math.round(rail.scrollLeft / (cardStep * visibleCount))));

      setCarouselState((current) => {
        const next = {
          activePage,
          canGoBack: rail.scrollLeft > 8,
          canGoForward: !isAtEnd,
          pageCount,
          visibleCount
        };

        return Object.entries(next).every(([key, value]) => current[key as keyof typeof current] === value)
          ? current
          : next;
      });
    };

    const resizeObserver = new ResizeObserver(updateCarouselState);

    updateCarouselState();
    resizeObserver.observe(rail);
    resizeObserver.observe(rail.firstElementChild as Element);
    rail.addEventListener("scroll", updateCarouselState, {passive: true});

    return () => {
      resizeObserver.disconnect();
      rail.removeEventListener("scroll", updateCarouselState);
    };
  }, [services.length]);

  const scrollRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    const firstCard = rail?.firstElementChild as HTMLElement | null;

    if (!rail || !firstCard) {
      return;
    }

    const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 0;
    const cardStep = firstCard.getBoundingClientRect().width + gap;
    const targetPage = Math.min(
      carouselState.pageCount - 1,
      Math.max(0, carouselState.activePage + direction)
    );

    rail.scrollTo({
      left: targetPage * carouselState.visibleCount * cardStep,
      behavior: "smooth"
    });
  };

  const {activePage, canGoBack, canGoForward, pageCount} = carouselState;

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
        <ChevronLeft aria-hidden="true" />
      </button>
      <div className="services-carousel-viewport">
        <div className="services-carousel-rail motion-sequence" ref={railRef}>
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} style={{"--i": index} as CSSProperties} />
          ))}
        </div>
      </div>
      <button
        className="services-carousel-arrow services-carousel-arrow-next"
        type="button"
        aria-label="Next services"
        aria-hidden={!canGoForward}
        disabled={!canGoForward}
        data-visible={canGoForward}
        onClick={() => scrollRail(1)}
      >
        <ChevronRight aria-hidden="true" />
      </button>
      <div
        className="services-carousel-indicator"
        role="img"
        aria-label={`Service page ${activePage + 1} of ${pageCount}`}
      >
        {Array.from({length: pageCount}, (_, index) => (
          <span
            className={`services-carousel-segment${index === activePage ? " is-active" : ""}`}
            key={index}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
