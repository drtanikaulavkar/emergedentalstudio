"use client";

import Image from "next/image";
import Link from "next/link";
import {MessageCircle} from "lucide-react";
import {useCallback, useEffect, useRef, useState} from "react";
import type {Service, SiteSettings} from "@/lib/siteData";
import styles from "./Header.module.css";

export function Header({settings, services}: {settings: SiteSettings; services: Pick<Service, "title" | "slug">[]}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);

  const closeServicesDropdown = useCallback(() => {
    setIsServicesOpen(false);
  }, []);

  const openServicesDropdown = useCallback(() => {
    setIsServicesOpen(true);
  }, []);

  const toggleServicesDropdown = useCallback(() => {
    setIsServicesOpen((isOpen) => !isOpen);
  }, []);

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
    const header = headerRef.current;

    if (!header) {
      return;
    }

    const updateScrollPadding = () => {
      const headerHeight = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--site-header-height", `${headerHeight}px`);
    };

    updateScrollPadding();

    const resizeObserver = new ResizeObserver(updateScrollPadding);
    resizeObserver.observe(header);

    return () => {
      resizeObserver.disconnect();
      document.documentElement.style.removeProperty("--site-header-height");
    };
  }, []);

  useEffect(() => {
    const closeFromOutsidePointer = (event: PointerEvent) => {
      const dropdown = servicesDropdownRef.current;

      if (dropdown && event.target instanceof Node && !dropdown.contains(event.target as Node)) {
        closeServicesDropdown();
      }
    };

    const closeFromEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isServicesOpen) {
        closeServicesDropdown();
        servicesTriggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeFromOutsidePointer);
    document.addEventListener("keydown", closeFromEscape);

    return () => {
      document.removeEventListener("pointerdown", closeFromOutsidePointer);
      document.removeEventListener("keydown", closeFromEscape);
    };
  }, [closeServicesDropdown, isServicesOpen]);

  return (
    <header className="site-header" data-scrolled={isScrolled} ref={headerRef}>
      <Link className="brand" href="/" aria-label={`${settings.clinicName} home`}>
        <Image src="/images/emerge-logo.png" alt={settings.clinicName} width={180} height={45} priority />
      </Link>
      <nav className="nav-links" aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <div
          className={styles.serviceDropdown}
          ref={servicesDropdownRef}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") {
              openServicesDropdown();
            }
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") {
              closeServicesDropdown();
            }
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              closeServicesDropdown();
            }
          }}
        >
          <button
            className={styles.serviceTrigger}
            ref={servicesTriggerRef}
            type="button"
            aria-expanded={isServicesOpen}
            aria-controls="services-menu"
            onClick={toggleServicesDropdown}
          >
            Services
          </button>
          <div
            className={styles.serviceMenu}
            id="services-menu"
            data-open={isServicesOpen}
            inert={!isServicesOpen}
            aria-hidden={!isServicesOpen}
          >
            {services.map((service) => (
              <Link
                href={`/services/${service.slug}`}
                key={service.slug}
                onClick={closeServicesDropdown}
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>
        <Link href="/blogs">Blogs</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <a className="header-cta" href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noreferrer">
        <MessageCircle aria-hidden="true" />
        WhatsApp
      </a>
    </header>
  );
}
