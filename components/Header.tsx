"use client";

import Image from "next/image";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import type {Service, SiteSettings} from "@/lib/siteData";
import styles from "./Header.module.css";

export function Header({settings, services}: {settings: SiteSettings; services: Pick<Service, "title" | "slug">[]}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrame = 0;
    let lastScrolledState = false;

    const updateScrolledState = () => {
      animationFrame = 0;
      const nextScrolledState = window.scrollY > 12;

      if (nextScrolledState !== lastScrolledState) {
        lastScrolledState = nextScrolledState;
        setIsScrolled(nextScrolledState);
      }
    };

    const requestScrolledState = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateScrolledState);
    };

    window.addEventListener("scroll", requestScrolledState, {passive: true});
    requestScrolledState();

    return () => {
      window.removeEventListener("scroll", requestScrolledState);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  useEffect(() => {
    const closeFromOutsidePointer = (event: PointerEvent) => {
      const dropdown = servicesDropdownRef.current;

      if (dropdown && event.target instanceof Node && !dropdown.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    const closeFromEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeFromOutsidePointer);
    document.addEventListener("keydown", closeFromEscape);

    return () => {
      document.removeEventListener("pointerdown", closeFromOutsidePointer);
      document.removeEventListener("keydown", closeFromEscape);
    };
  }, []);

  return (
    <header className="site-header" data-scrolled={isScrolled}>
      <Link className="brand" href="/" aria-label={`${settings.clinicName} home`}>
        <Image src="/images/emerge-logo.png" alt={settings.clinicName} width={180} height={45} priority />
      </Link>
      <nav className="nav-links" aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <div
          className={styles.serviceDropdown}
          ref={servicesDropdownRef}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsServicesOpen(false);
            }
          }}
        >
          <button
            className={styles.serviceTrigger}
            type="button"
            aria-expanded={isServicesOpen}
            aria-haspopup="menu"
            onClick={() => setIsServicesOpen((current) => !current)}
          >
            Services
          </button>
          <div className={styles.serviceMenu} role="menu" data-open={isServicesOpen}>
            {services.map((service) => (
              <Link
                href={`/services/${service.slug}`}
                key={service.slug}
                role="menuitem"
                onClick={() => setIsServicesOpen(false)}
                onPointerDown={() => setIsServicesOpen(false)}
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>
        <Link href="/contact">Contact</Link>
      </nav>
      <a className="header-cta" href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noreferrer">
        WhatsApp
      </a>
    </header>
  );
}
