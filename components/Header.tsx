import Image from "next/image";
import Link from "next/link";
import type {SiteSettings} from "@/lib/siteData";

const navItems = [
  {href: "/", label: "Home"},
  {href: "/about", label: "About"},
  {href: "/services", label: "Services"},
  {href: "/contact", label: "Contact"}
];

export function Header({settings}: {settings: SiteSettings}) {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label={`${settings.clinicName} home`}>
        <Image src="/images/emerge-logo.png" alt={settings.clinicName} width={180} height={45} priority />
      </Link>
      <nav className="nav-links" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <a className="header-cta" href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noreferrer">
        WhatsApp
      </a>
    </header>
  );
}
