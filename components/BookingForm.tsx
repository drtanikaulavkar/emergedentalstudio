"use client";

import {useState} from "react";
import type {SiteSettings} from "@/lib/siteData";

export function BookingForm({settings}: {settings: SiteSettings}) {
  const [name, setName] = useState("");
  const [treatment, setTreatment] = useState("");
  const [message, setMessage] = useState("");

  return (
    <form
      className="booking-form"
      onSubmit={(event) => {
        event.preventDefault();
        const messageLines = [
          "Hello Dr. Tanisha, I would like to enquire about an appointment at Emerge Dental Studio.",
          `Full name: ${name.trim()}`,
          `Treatment: ${treatment.trim()}`,
          ...(message.trim() ? [`Message: ${message.trim()}`] : [])
        ];
        const encodedMessage = encodeURIComponent(messageLines.join("\n"));

        window.open(
          `https://wa.me/${settings.whatsappNumber}?text=${encodedMessage}`,
          "_blank",
          "noopener,noreferrer"
        );
      }}
    >
      <label>
        Full name
        <input value={name} onChange={(event) => setName(event.target.value)} name="name" autoComplete="name" required />
      </label>
      <label>
        Treatment you are looking for
        <textarea value={treatment} onChange={(event) => setTreatment(event.target.value)} name="treatment" rows={3} required />
      </label>
      <label>
        Message for us (optional)
        <textarea value={message} onChange={(event) => setMessage(event.target.value)} name="message" rows={4} />
      </label>
      <button type="submit">Continue on WhatsApp</button>
    </form>
  );
}
