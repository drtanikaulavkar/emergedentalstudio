"use client";

import {useState} from "react";
import type {SiteSettings} from "@/lib/siteData";

export function BookingForm({settings}: {settings: SiteSettings}) {
  const [name, setName] = useState("");
  const [treatment, setTreatment] = useState("");

  const message = encodeURIComponent(
    `Hello Dr. Tanisha, my name is ${name || "[Name]"}. I would like to book an appointment at Emerge Dental Studio for ${treatment || "[Treatment]"}.`
  );

  return (
    <form
      className="booking-form"
      onSubmit={(event) => {
        event.preventDefault();
        window.open(`https://wa.me/${settings.whatsappNumber}?text=${message}`, "_blank", "noopener,noreferrer");
      }}
    >
      <label>
        Patient name
        <input value={name} onChange={(event) => setName(event.target.value)} name="name" autoComplete="name" required />
      </label>
      <label>
        Treatment you are looking for
        <textarea value={treatment} onChange={(event) => setTreatment(event.target.value)} name="treatment" rows={4} required />
      </label>
      <button type="submit">Continue on WhatsApp</button>
    </form>
  );
}
