"use client";

import Image from "next/image";
import type {CSSProperties, FocusEvent} from "react";
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
  const [isPointerPaused, setIsPointerPaused] = useState(false);
  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [isRotationPaused, setIsRotationPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isPaused = prefersReducedMotion || isPointerPaused || isFocusPaused || isRotationPaused;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
    }, 6000);

    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion, slides.length]);

  const resumeWhenFocusLeaves = (event: FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }

    setIsFocusPaused(false);
  };

  return (
    <div
      className="hero-carousel"
      aria-roledescription="carousel"
      aria-label="Emerge Dental Studio homepage images"
      data-paused={isPaused}
      onBlur={resumeWhenFocusLeaves}
      onFocus={() => setIsFocusPaused(true)}
      onMouseEnter={() => setIsPointerPaused(true)}
      onMouseLeave={() => setIsPointerPaused(false)}
    >
      <button
        className="carousel-toggle"
        type="button"
        aria-pressed={prefersReducedMotion || isRotationPaused}
        disabled={prefersReducedMotion}
        onClick={() => setIsRotationPaused((current) => !current)}
      >
        {prefersReducedMotion ? "Slides paused" : isRotationPaused ? "Play slides" : "Pause slides"}
      </button>
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
      <span className="carousel-progress" key={`${activeIndex}-${isPaused ? "paused" : "running"}`} aria-hidden="true" />
      <div className="carousel-dots" aria-label="Choose carousel slide">
        {slides.map((slide, index) => (
          <button
            type="button"
            aria-label={`Show slide ${index + 1}: ${slide.caption}`}
            aria-current={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            key={slide.caption}
          >
            <span aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}
