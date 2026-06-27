export type SiteSettings = {
  title: string;
  description: string;
  siteUrl: string;
  clinicName: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  bookingUrl: string;
  address: {
    street: string;
    locality: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  hours: Array<{
    days: string;
    opens: string;
    closes: string;
    label: string;
  }>;
  closedDays: string[];
  serviceAreas: string[];
  testimonials: Array<{
    name: string;
    rating: number;
    quote: string;
  }>;
};

export type Service = {
  title: string;
  slug: string;
  eyebrow: string;
  summary: string;
  description: string;
  imageAlt: string;
  highlights: string[];
  sections: Array<{
    title: string;
    items: string[];
  }>;
};

export type PageContent = {
  title: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  heroText: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
};

export const siteSettings: SiteSettings = {
  title: "Best Dentist Near Me in Bengaluru | Emerge Dental Studio",
  description:
    "Emerge Dental Studio offers general, cosmetic, implant, orthodontic, pediatric, and restorative dental care in Bengaluru.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.emergedentalstudio.com",
  clinicName: "Emerge Dental Studio",
  phone: "+91 82968 01240",
  whatsappNumber: "918296801240",
  email: "hello@emergedentalstudio.com",
  bookingUrl: "https://clinicia.com/calendar/book?u=tanishakaulavkar",
  address: {
    street: "3138, First Floor, Sai Baba Mandir Road, 7th Main Road, HAL 2nd Stage",
    locality: "Indiranagar",
    city: "Bengaluru",
    region: "Karnataka",
    postalCode: "560038",
    country: "IN"
  },
  hours: [
    {
      days: "Monday to Saturday",
      opens: "10:00",
      closes: "13:00",
      label: "10:00 AM - 1:00 PM"
    },
    {
      days: "Monday to Saturday",
      opens: "16:00",
      closes: "20:00",
      label: "4:00 PM - 8:00 PM"
    }
  ],
  closedDays: ["Sunday"],
  serviceAreas: ["Indiranagar", "Koramangala", "Jayanagar", "Whitefield", "Domlur", "Ulsoor"],
  testimonials: [
    {
      name: "Ananya R.",
      rating: 5,
      quote: "The team at Emerge Dental Studio was professional, reassuring, and made the treatment feel painless."
    },
    {
      name: "Vikram S.",
      rating: 5,
      quote: "A reliable dental clinic with a calm environment and clear treatment guidance."
    },
    {
      name: "Clinic Patient",
      rating: 5,
      quote: "Friendly care, transparent advice, and a comfortable appointment from start to finish."
    }
  ]
};

export const doctor = {
  name: "Dr. Tanisha Kaulavkar",
  role: "Chief Dentist, Maxillofacial Prosthodontist & Implantologist",
  qualifications: "BDS, MDS",
  intro:
    "Dr. Tanisha completed her BDS and MDS in Prosthodontics from SDM College of Dental Sciences and Hospital, Dharwad, and received several gold medals throughout her educational career.",
  body: [
    "Her expertise spans cosmetic dentistry, crowns and bridges, dentures, full mouth rehabilitation, multiple implant placements, digital smile designing, TMJ disorders, and headaches.",
    "She is a member of the Indian Prosthodontics Society and continues to stay current with advances in dental technology and techniques.",
    "Her approach combines exceptional dental care with a friendly, comfortable environment for every patient."
  ]
};

export const pages: Record<string, PageContent> = {
  home: {
    title: "Home",
    slug: "home",
    seoTitle: "Best Dentist Near Me in Bengaluru | Emerge Dental Studio",
    seoDescription:
      "Looking for a trusted dentist in Bengaluru? Emerge Dental Studio offers preventive, cosmetic, implant, orthodontic, pediatric, and restorative dental care.",
    heroTitle: "Trusted dental care near you in Bengaluru",
    heroText:
      "Welcome to Emerge Dental Studio, a clean, friendly dental clinic offering preventive, cosmetic, implant, orthodontic, and restorative care with a patient-first approach.",
    sections: [
      {
        title: "Dental care for every stage of your smile",
        body:
          "From routine cleanings to full mouth rehabilitation, every plan is built around comfort, clarity, and long-term oral health."
      },
      {
        title: "Ready to book your visit?",
        body: "Send a WhatsApp message or book online for a convenient appointment at Emerge Dental Studio."
      }
    ]
  },
  about: {
    title: "About",
    slug: "about",
    seoTitle: "About Dr. Tanisha Kaulavkar",
    seoDescription:
      "Meet Dr. Tanisha Kaulavkar, Chief Dentist, Maxillofacial Prosthodontist and Implantologist at Emerge Dental Studio in Bengaluru.",
    heroTitle: "Meet Dr. Tanisha Kaulavkar",
    heroText: "Chief Dentist, Maxillofacial Prosthodontist & Implantologist",
    sections: []
  },
  services: {
    title: "Services",
    slug: "services",
    seoTitle: "Dental Services",
    seoDescription:
      "Explore dental implants, cosmetic dentistry, braces, aligners, pediatric dentistry, root canal treatment, dentures, full mouth rehabilitation, extractions, cleaning, and whitening.",
    heroTitle: "Comprehensive dental services in Bengaluru",
    heroText:
      "Explore general, cosmetic, restorative, orthodontic, pediatric, implant, and full-mouth care at Emerge Dental Studio.",
    sections: [
      {
        title: "Choose the care you need",
        body: "Each service page explains what the treatment involves and when it may help."
      }
    ]
  },
  contact: {
    title: "Contact",
    slug: "contact",
    seoTitle: "Contact and Book Appointment",
    seoDescription:
      "Contact Emerge Dental Studio in Indiranagar, Bengaluru. Book a dental appointment by WhatsApp, phone, or online booking.",
    heroTitle: "Book an appointment at Emerge Dental Studio",
    heroText:
      "Share your name and treatment need, and the form will open a prefilled WhatsApp message to the clinic.",
    sections: []
  }
};

export const services: Service[] = [
  {
    title: "Dental Implants",
    slug: "dental-implants",
    eyebrow: "Tooth replacement",
    summary: "Permanent replacement options for missing teeth using carefully planned implant treatment.",
    description:
      "Dental implants are artificial tooth roots placed in the jawbone to support a crown, bridge, or denture. They are designed to restore appearance, chewing confidence, and long-term oral function.",
    imageAlt: "Dental implant consultation at Emerge Dental Studio",
    highlights: [
      "Natural-looking replacement for one or more missing teeth",
      "Stable chewing and speaking function",
      "3D X-ray planning when needed",
      "Long-lasting solution with regular care"
    ],
    sections: [
      {
        title: "Benefits",
        items: [
          "Improved appearance because implants look and feel close to natural teeth.",
          "Durability with proper brushing, flossing, and dental check-ups.",
          "Improved function for eating and speaking with confidence.",
          "Protection against shifting of nearby teeth."
        ]
      },
      {
        title: "Treatment process",
        items: [
          "Consultation and oral health evaluation with regular and 3D X-rays when required.",
          "Preparation, including damaged tooth removal, bone grafting, or sinus lift if needed.",
          "Implant placement, healing, abutment placement, and crown or bridge placement."
        ]
      }
    ]
  },
  {
    title: "Cosmetic Dentistry",
    slug: "cosmetic-dentistry",
    eyebrow: "Smile aesthetics",
    summary: "Smile-focused treatments including whitening, veneers, bonding, reshaping, and smile design.",
    description:
      "Cosmetic dentistry improves the appearance of teeth, gums, and bite while supporting confident, healthy smiles.",
    imageAlt: "Cosmetic dentistry smile consultation",
    highlights: [
      "Teeth whitening for a brighter smile",
      "Veneers for chips, cracks, gaps, shape, and color correction",
      "Dental bonding for minor reshaping and repairs",
      "Smile makeover planning tailored to your goals"
    ],
    sections: [
      {
        title: "Common options",
        items: [
          "Teeth whitening to reduce stains and discoloration.",
          "Veneers placed over the front surface of teeth to improve shape, size, and color.",
          "Dental bonding using tooth-colored resin for chipped, cracked, or decayed teeth.",
          "Clear aligners when alignment changes are part of the smile plan."
        ]
      },
      {
        title: "Benefits",
        items: [
          "Improved smile appearance and confidence.",
          "Many cosmetic treatments can also support better oral health.",
          "Results can be long-lasting with good care and maintenance."
        ]
      }
    ]
  },
  {
    title: "Braces & Aligners",
    slug: "braces-aligners",
    eyebrow: "Orthodontics",
    summary: "Traditional braces and clear aligners for straighter teeth and improved bite alignment.",
    description:
      "Braces and aligners help correct misaligned teeth, bite concerns, and jaw alignment issues for children, teens, and adults.",
    imageAlt: "Clear aligner and braces consultation",
    highlights: [
      "Metal braces",
      "Ceramic braces",
      "Self-ligating braces",
      "Clear aligners including Invisalign"
    ],
    sections: [
      {
        title: "Braces",
        items: [
          "Traditional braces use brackets and wires to gradually move teeth into position.",
          "They may be recommended for more complex bite or alignment concerns.",
          "Braces are adjustable through the treatment process for planned results."
        ]
      },
      {
        title: "Aligners",
        items: [
          "Clear trays are custom-made to gradually move teeth.",
          "They are discreet and removable for eating and cleaning.",
          "They may suit mild to moderate bite or alignment concerns."
        ]
      }
    ]
  },
  {
    title: "Pediatric Dentistry",
    slug: "pediatric-dentistry",
    eyebrow: "Children's dental care",
    summary: "Gentle preventive and restorative dental care for children from infancy through adolescence.",
    description:
      "Pediatric dentistry focuses on children's oral health, early prevention, calm education, and age-appropriate treatment.",
    imageAlt: "Pediatric dental care for children",
    highlights: [
      "Regular oral examinations",
      "Professional cleanings",
      "Fluoride treatments",
      "Sealants and restorative care"
    ],
    sections: [
      {
        title: "Why early care matters",
        items: [
          "Preventive care can reduce dental problems before they start.",
          "Early detection can prevent more extensive treatment later.",
          "Parents and children receive guidance on hygiene, food habits, and oral health routines."
        ]
      },
      {
        title: "Services offered",
        items: [
          "Oral exams, cleanings, fluoride treatments, and sealants.",
          "Fillings, crowns, and root canal treatments when needed.",
          "Early orthodontic guidance for bite issues and misaligned teeth."
        ]
      }
    ]
  },
  {
    title: "Root Canal Treatment",
    slug: "root-canal-treatment",
    eyebrow: "Tooth-saving care",
    summary: "Endodontic treatment to save infected or damaged teeth and relieve pain.",
    description:
      "Root canal treatment removes infected pulp from inside the tooth, cleans the canals, and seals the space to help preserve the natural tooth.",
    imageAlt: "Root canal treatment planning",
    highlights: [
      "Relieves tooth pain caused by infection",
      "Helps save the natural tooth",
      "Prevents spread of infection",
      "Restores function with a filling or crown"
    ],
    sections: [
      {
        title: "When it may be needed",
        items: [
          "Severe toothache or tenderness while chewing.",
          "Swelling in the gums or face.",
          "Sensitivity to hot and cold temperatures.",
          "Tooth discoloration after infection or trauma."
        ]
      },
      {
        title: "Procedure",
        items: [
          "The area is numbed with local anesthesia.",
          "The infected pulp is removed and the root canals are cleaned and shaped.",
          "The canals are filled, then the tooth is sealed and restored."
        ]
      }
    ]
  },
  {
    title: "Dentures",
    slug: "dentures",
    eyebrow: "Removable prosthetics",
    summary: "Complete, partial, and implant-supported dentures to restore missing teeth.",
    description:
      "Dentures are custom-made removable prosthetic devices that replace missing teeth and surrounding tissues.",
    imageAlt: "Denture consultation",
    highlights: [
      "Complete dentures",
      "Partial dentures",
      "Implant-supported dentures",
      "Improved appearance, chewing, and speech"
    ],
    sections: [
      {
        title: "Types",
        items: [
          "Complete dentures for patients missing all upper or lower teeth.",
          "Partial dentures when some natural teeth remain.",
          "Implant-supported dentures for a more secure fit and improved chewing."
        ]
      },
      {
        title: "Care",
        items: [
          "Clean dentures daily with a soft brush and denture cleaner.",
          "Soak overnight to prevent drying and warping.",
          "Handle with care and schedule regular dental check-ups."
        ]
      }
    ]
  },
  {
    title: "Full Mouth Rehabilitation",
    slug: "full-mouth-rehabilitation",
    eyebrow: "Comprehensive restoration",
    summary: "A complete treatment plan to restore oral health, function, comfort, and smile appearance.",
    description:
      "Full mouth rehabilitation addresses complex concerns across the teeth, gums, jaw muscles, and jaw joints through a customized sequence of treatments.",
    imageAlt: "Full mouth rehabilitation treatment planning",
    highlights: [
      "Complex bite and tooth wear concerns",
      "TMJ disorders and headaches",
      "Missing teeth and tooth loss",
      "Customized multi-step treatment plans"
    ],
    sections: [
      {
        title: "When it may help",
        items: [
          "Severe tooth decay, tooth wear, or generalized sensitivity.",
          "Teeth clenching or grinding.",
          "Gum disease, tooth loss, bite problems, or misaligned teeth.",
          "TMJ disorders, pain, and facial trauma."
        ]
      },
      {
        title: "Process",
        items: [
          "Comprehensive evaluation with X-rays, impressions, and clinical examination.",
          "Customized treatment planning based on individual needs and goals.",
          "Treatment may include implants, crowns, bridges, fillings, orthodontics, and periodontal care."
        ]
      }
    ]
  },
  {
    title: "Extractions & Impactions",
    slug: "extractions-impactions",
    eyebrow: "Wisdom tooth removal",
    summary: "Simple and surgical tooth extractions, including impacted wisdom teeth.",
    description:
      "Extractions may be needed for severe decay, gum disease, trauma, or impacted teeth that cannot fully emerge into the mouth.",
    imageAlt: "Wisdom tooth extraction consultation",
    highlights: [
      "Simple tooth extraction",
      "Surgical extraction",
      "Wisdom tooth removal",
      "Aftercare guidance for smooth healing"
    ],
    sections: [
      {
        title: "Types",
        items: [
          "Simple extraction for teeth visible above the gumline.",
          "Surgical extraction for teeth hidden beneath the gumline or impacted.",
          "Impacted wisdom teeth may need removal if they cause pain, infection, or crowding."
        ]
      },
      {
        title: "Aftercare",
        items: [
          "Bite gently on gauze for 30 to 45 minutes after extraction.",
          "Use ice to reduce swelling and pain.",
          "Avoid solid, hot, and spicy food for the first 24 hours.",
          "Avoid smoking and drinking through a straw after the procedure."
        ]
      }
    ]
  },
  {
    title: "Teeth Cleaning & Whitening",
    slug: "teeth-cleaning-whitening",
    eyebrow: "Preventive and cosmetic care",
    summary: "Professional cleaning to support oral health and whitening options for a brighter smile.",
    description:
      "Teeth cleaning removes plaque, tartar, and stains. Teeth whitening helps reduce discoloration for a brighter smile.",
    imageAlt: "Teeth cleaning and whitening appointment",
    highlights: [
      "Scaling and polishing",
      "Flossing and plaque removal",
      "In-office whitening",
      "Custom at-home whitening guidance"
    ],
    sections: [
      {
        title: "Cleaning",
        items: [
          "Scaling removes plaque and tartar from teeth and gumline.",
          "Polishing smoothens the tooth surface to help reduce future tartar build-up.",
          "Professional cleaning supports gum health, fresher breath, and early detection of dental concerns."
        ]
      },
      {
        title: "Whitening",
        items: [
          "In-office whitening is performed at the dental clinic.",
          "At-home whitening can use a custom tray filled with whitening solution.",
          "Good hygiene and avoiding staining foods and drinks helps maintain results."
        ]
      }
    ]
  }
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function formatAddress(settings: SiteSettings = siteSettings) {
  const {address} = settings;
  return `${address.street}, ${address.locality}, ${address.city}, ${address.region} ${address.postalCode}`;
}
