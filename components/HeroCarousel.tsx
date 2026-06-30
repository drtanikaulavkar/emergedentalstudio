"use client";

import Image from "next/image";
import type {CSSProperties} from "react";
import {useEffect, useState} from "react";

export type HeroCarouselSlide = {
  caption: string;
  src: string;
  alt: string;
  focalPoint: string;
  mobileFocalPoint: string;
};

export function HeroCarousel({slides}: {slides: HeroCarouselSlide[]}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
    }, 6000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const showPrevious = () => {
    setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  };

  const showNext = () => {
    setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="hero-carousel" aria-roledescription="carousel" aria-label="Emerge Dental Studio homepage images">
      {slides.map((slide, index) => (
        <figure
          className="carousel-slide"
          data-active={index === activeIndex}
          aria-hidden={index !== activeIndex}
          key={slide.caption}
          style={
            {
              "--slide-focal-point": slide.focalPoint,
              "--slide-mobile-focal-point": slide.mobileFocalPoint
            } as CSSProperties
          }
        >
          <Image src={slide.src} alt={slide.alt} width={1600} height={1000} priority={index === 0} sizes="(max-width: 920px) 100vw, 1180px" />
          <figcaption>{slide.caption}</figcaption>
        </figure>
      ))}
      <div className="carousel-controls" aria-label="Carousel controls">
        <button type="button" aria-label="Previous slide" onClick={showPrevious}>
          <span aria-hidden="true">&lt;</span>
        </button>
        <button type="button" aria-label="Next slide" onClick={showNext}>
          <span aria-hidden="true">&gt;</span>
        </button>
      </div>
      <div className="carousel-dots" aria-label="Choose carousel slide">
        {slides.map((slide, index) => (
          <button
            type="button"
            aria-label={`Show slide ${index + 1}: ${slide.caption}`}
            aria-current={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            key={slide.caption}
          >
            <span>{index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
