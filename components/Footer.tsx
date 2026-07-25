import Image from "next/image";
import Link from "next/link";
import {formatAddress, type SiteSettings} from "@/lib/siteData";

export function Footer({settings}: {settings: SiteSettings}) {
  return (
    <footer className="site-footer">
      <div>
        <Image src="/images/emerge-logo.png" alt={settings.clinicName} width={172} height={43} />
        <p>{settings.description}</p>
      </div>
      <div>
        <h2>Visit</h2>
        <p>{formatAddress(settings)}</p>
        <p>{settings.phone}</p>
      </div>
      <div>
        <h2>Hours</h2>
        <p className="footer-hour">
          <strong className="hours-day">Monday to Saturday</strong>
          <span className="hours-time">10:00 AM to 1:00 PM</span>
          <span className="hours-time">4:00 PM to 8:00 PM</span>
        </p>
        <p className="footer-hour">
          <strong className="hours-day">Sunday</strong>
          <span className="hours-time">By appointment only</span>
        </p>
      </div>
      <div>
        <h2>Explore</h2>
        <Link href="/services">Services</Link>
        <Link href="/blogs">Blogs</Link>
        <Link href="/about">About Dr. Tanisha</Link>
        <Link href="/contact">Book an appointment</Link>
      </div>
    </footer>
  );
}
