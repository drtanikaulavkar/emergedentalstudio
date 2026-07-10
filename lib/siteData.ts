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
  imageSrc: string;
  imageAlt: string;
  highlights: string[];
  benefits: string[];
  process: Array<{
    title: string;
    body: string;
  }>;
  aftercare: string[];
  brands?: Array<{
    name: string;
    logoSrc: string;
    logoAlt: string;
  }>;
  beforeAfter?: Array<{
    title: string;
    beforeImageSrc: string;
    beforeImageAlt: string;
    afterImageSrc: string;
    afterImageAlt: string;
    caption: string;
  }>;
  sections: Array<{
    title: string;
    intro?: string;
    items: string[];
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedServices: string[];
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
  serviceAreas: ["Indiranagar", "Koramangala", "Domlur", "Ulsoor", "Cambridge layout"],
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
    heroTitle: "Smile and implant care, made personal",
    heroText:
      "Modern prosthodontic, implant, and cosmetic dental care in Indiranagar with clear guidance from consultation to confident smile.",
    sections: [
      {
        title: "Care for every stage of your smile",
        body:
          "From implants and smile design to routine care, every plan is built around comfort, clarity, and long-term oral health."
      },
      {
        title: "Ready to talk through your options?",
        body: "Send a WhatsApp message with your concern and the team will help you choose the right next step."
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
    seoTitle: "Dental Services in Indiranagar Bengaluru",
    seoDescription:
      "Explore dental implants, crowns and bridges, cosmetic dentistry, braces, aligners, pediatric dentistry, root canal treatment, dentures, full mouth rehabilitation, extractions, cleaning, and whitening.",
    heroTitle: "Dental services for every stage of your smile",
    heroText:
      "Explore treatment guides for general, cosmetic, restorative, orthodontic, pediatric, implant, and full-mouth care at Emerge Dental Studio.",
    sections: [
      {
        title: "Choose the care you need",
        body: "Each service page explains the benefits, process, aftercare, and next step for that treatment."
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
    heroText: "",
    sections: []
  }
};

const beforeAfterPlaceholder = {
  beforeImageSrc: "/images/before-after/smile-before.svg",
  beforeImageAlt: "Before treatment smile placeholder",
  afterImageSrc: "/images/before-after/smile-after.svg",
  afterImageAlt: "After treatment smile placeholder"
};

export const services: Service[] = [
  {
    title: "Dental Implants",
    slug: "dental-implants",
    eyebrow: "Tooth replacement",
    summary: "Permanent replacement options for missing teeth using carefully planned implant treatment.",
    description:
      "Dental implants are artificial tooth roots used to replace missing teeth. They are surgically placed into the jawbone and provide a stable base for a crown or bridge, helping restore appearance, chewing comfort, and confidence.",
    imageSrc: "/images/service-dental-implants.jpg",
    imageAlt: "Dental implant consultation at Emerge Dental Studio",
    highlights: ["Improved appearance", "Durability", "Improved functionality", "Improved oral health", "Convenience"],
    benefits: ["Improved appearance", "Durability", "Improved functionality", "Improved oral health", "Convenience"],
    process: [
      {
        title: "Consultation",
        body:
          "Your oral health is evaluated to determine whether implants are suitable. Regular and 3D X-rays may be used for better planning and prognosis."
      },
      {
        title: "Preparation",
        body:
          "If required, damaged teeth or gum tissue are treated first. Bone grafting or sinus lift procedures may be planned depending on bone condition."
      },
      {title: "Implant placement", body: "The dental implant is surgically placed into the jawbone."},
      {
        title: "Healing",
        body: "The implant is allowed to fuse with the jawbone and heal properly, often over approximately three months."
      },
      {
        title: "Abutment placement",
        body:
          "Once healed, an abutment is attached to hold the crown or bridge. This can include second-stage surgery and mouth impressions."
      },
      {title: "Crown or bridge placement", body: "The final crown or bridge is attached to complete the implant treatment."}
    ],
    aftercare: [
      "Brush and floss regularly around the implant.",
      "Schedule routine dental check-ups and professional cleanings.",
      "Follow the dentist's instructions during healing to support long-term implant health."
    ],
    brands: [
      {name: "Dio Implants", logoSrc: "/images/brands/dio-implants.svg", logoAlt: "Dio Implants logo"},
      {name: "Osstem", logoSrc: "/images/brands/osstem.svg", logoAlt: "Osstem logo"},
      {name: "Nobel Biocare", logoSrc: "/images/brands/nobel-biocare.svg", logoAlt: "Nobel Biocare logo"},
      {name: "Neodent", logoSrc: "/images/brands/neodent.svg", logoAlt: "Neodent logo"}
    ],
    beforeAfter: [
      {
        title: "Single tooth replacement",
        caption: "A missing tooth restored with an implant-supported crown.",
        ...beforeAfterPlaceholder
      },
      {
        title: "Implant bridge",
        caption: "Multiple missing teeth restored for chewing and smile support.",
        ...beforeAfterPlaceholder
      },
      {
        title: "Full arch planning",
        caption: "Complex tooth replacement can be planned as part of a wider full-mouth rehabilitation.",
        ...beforeAfterPlaceholder
      }
    ],
    sections: [
      {
        title: "What dental implants can help with",
        items: ["One missing tooth", "Several missing teeth", "Loose or uncomfortable dentures", "Missing teeth caused by injury, decay, or other dental issues"]
      }
    ],
    faqs: [
      {
        question: "Am I a candidate for dental implants?",
        answer: "A consultation and X-rays help determine whether implants are suitable for your oral health and bone condition."
      },
      {
        question: "Will I need bone grafting?",
        answer: "Some cases need bone grafting or sinus lift procedures before implant placement, depending on available bone."
      },
      {
        question: "How long does implant healing take?",
        answer: "Healing can take several weeks, with approximately three months often allowed for the implant to fuse with the jawbone."
      },
      {
        question: "How do I care for dental implants?",
        answer: "Regular brushing, flossing, dental check-ups, and professional cleanings help support implant longevity."
      }
    ],
    relatedServices: ["crowns-bridges", "dentures", "full-mouth-rehabilitation"]
  },
  {
    title: "Cosmetic Dentistry",
    slug: "cosmetic-dentistry",
    eyebrow: "Smile aesthetics",
    summary: "Smile-focused treatments including whitening, veneers, bonding, reshaping, and smile design.",
    description:
      "Cosmetic dentistry includes procedures that improve the appearance of teeth, gums, and bite. It can help create a brighter, more confident smile while supporting individual goals and oral health.",
    imageSrc: "/images/service-cosmetic-dentistry.jpg",
    imageAlt: "Cosmetic dentistry smile consultation",
    highlights: ["Improved appearance", "Increased self-confidence", "Improved oral health", "Long-lasting results"],
    benefits: ["Improved appearance", "Increased self-confidence", "Improved oral health", "Long-lasting results"],
    process: [
      {title: "Smile consultation", body: "Discuss what you want to change about tooth colour, shape, gaps, chips, cracks, or alignment."},
      {title: "Treatment selection", body: "Choose from whitening, veneers, dental bonding, implants, aligners, or a planned smile makeover."},
      {title: "Design and preparation", body: "The treatment is planned around your teeth, gums, bite, face, and desired result."},
      {title: "Treatment and maintenance", body: "The selected procedure is completed, followed by guidance to maintain the result."}
    ],
    aftercare: [
      "Maintain daily brushing and flossing.",
      "Attend regular dental check-ups and cleanings.",
      "Follow treatment-specific instructions for veneers, bonding, whitening, or aligners."
    ],
    beforeAfter: [
      {title: "Smile makeover", caption: "Shape, shade, and smile balance improved with a customized plan.", ...beforeAfterPlaceholder},
      {title: "Veneer correction", caption: "Veneers can address chips, gaps, cracks, size, shape, and colour concerns.", ...beforeAfterPlaceholder},
      {title: "Bonding and contouring", caption: "Minor chips or tooth-shape concerns corrected conservatively.", ...beforeAfterPlaceholder}
    ],
    sections: [
      {
        title: "Types of cosmetic dentistry",
        items: [
          "Teeth whitening to reduce stains and discoloration.",
          "Veneers placed over the front surface of teeth to improve appearance.",
          "Dental implants to improve the appearance and function of missing teeth.",
          "Dental bonding using tooth-coloured resin to reshape and repair chipped, cracked, or decayed teeth.",
          "Invisalign to straighten teeth and correct bite issues with removable clear aligners."
        ]
      }
    ],
    faqs: [
      {question: "Which cosmetic treatment is right for me?", answer: "The best option depends on your tooth colour, shape, bite, oral health, and smile goals."},
      {question: "Are cosmetic results long-lasting?", answer: "Many cosmetic treatments can last for years with proper care, maintenance, and regular dental visits."},
      {question: "Can cosmetic dentistry improve oral health too?", answer: "Some cosmetic procedures can also support tooth structure, bite balance, and better hygiene access."}
    ],
    relatedServices: ["teeth-cleaning-whitening", "braces-aligners", "crowns-bridges"]
  },
  {
    title: "Braces & Aligners",
    slug: "braces-aligners",
    eyebrow: "Orthodontics",
    summary: "Traditional braces and clear aligners for straighter teeth and improved bite alignment.",
    description:
      "Braces and aligners are orthodontic treatments used to straighten teeth, correct bite issues, and improve the alignment of teeth and jaws.",
    imageSrc: "/images/service-braces-aligners.jpg",
    imageAlt: "Clear aligner and braces consultation",
    highlights: ["Improved oral health", "Cost-effective braces", "Long-lasting results", "Customizable treatment"],
    benefits: ["Improved oral health", "Cost-effective correction", "Long-lasting results", "Customizable treatment", "Discreet aligner options", "Removable aligners"],
    process: [
      {title: "Orthodontic consultation", body: "Your teeth, bite, jaw alignment, and treatment goals are evaluated."},
      {title: "Treatment choice", body: "Braces may suit more complex concerns, while aligners may suit mild to moderate concerns."},
      {title: "Appliance or aligner start", body: "Brackets and wires are fitted, or custom clear trays are issued to begin planned tooth movement."},
      {title: "Review and adjustment", body: "Progress is checked and braces or aligners are adjusted through the treatment process."},
      {title: "Retention", body: "After alignment is complete, retainers help maintain the result."}
    ],
    aftercare: [
      "Clean carefully around brackets, wires, or aligners every day.",
      "Remove aligners for eating and cleaning if prescribed.",
      "Attend scheduled reviews so tooth movement stays on plan."
    ],
    brands: [
      {name: "Invisalign", logoSrc: "/images/brands/invisalign.svg", logoAlt: "Invisalign logo"},
      {name: "Damon", logoSrc: "/images/brands/damon.svg", logoAlt: "Damon braces logo"},
      {name: "Illusion Aligners", logoSrc: "/images/brands/illusion-aligners.svg", logoAlt: "Illusion Aligners logo"}
    ],
    beforeAfter: [
      {title: "Crowding correction", caption: "Alignment improved through planned tooth movement.", ...beforeAfterPlaceholder},
      {title: "Spacing correction", caption: "Visible gaps reduced as teeth move into better positions.", ...beforeAfterPlaceholder},
      {title: "Bite improvement", caption: "Bite relationship and smile alignment refined over time.", ...beforeAfterPlaceholder}
    ],
    sections: [
      {title: "Types of braces available", items: ["Metal braces", "Ceramic braces", "Self-ligating braces in metal or ceramic"]},
      {
        title: "Aligners",
        intro:
          "Aligners, such as Invisalign, are clear plastic trays custom-made to fit over the teeth and gradually move them into position.",
        items: ["Discreet appearance", "Removable for eating and cleaning", "Smooth and comfortable trays", "Customised to individual treatment goals"]
      }
    ],
    faqs: [
      {question: "Are aligners better than braces?", answer: "Aligners are discreet and removable, while braces can be better for more complex bite or alignment concerns."},
      {question: "What types of braces are available?", answer: "Emerge Dental Studio offers metal braces, ceramic braces, and self-ligating braces."},
      {question: "Can adults get braces or aligners?", answer: "Yes. Orthodontic treatment can be considered for children, teens, and adults after evaluation."}
    ],
    relatedServices: ["cosmetic-dentistry", "pediatric-dentistry", "teeth-cleaning-whitening"]
  },
  {
    title: "Pediatric Dentistry",
    slug: "pediatric-dentistry",
    eyebrow: "Children's dental care",
    summary: "Gentle preventive and restorative dental care for children from infancy through adolescence.",
    description:
      "Pediatric dentistry focuses on the oral health of children from infancy through adolescence, with prevention, early detection, treatment, and child-friendly dental education.",
    imageSrc: "/images/service-pediatric-dentistry.jpg",
    imageAlt: "Pediatric dental care for children",
    highlights: ["Preventive care", "Early detection and treatment", "Patient education", "Restorative care"],
    benefits: ["Preventive care", "Early detection and treatment", "Patient education", "Age-appropriate care"],
    process: [
      {title: "Child-friendly examination", body: "Regular oral exams check for cavities, gum concerns, growth, and other dental issues."},
      {title: "Preventive care", body: "Professional cleanings, fluoride treatments, and sealants help reduce the risk of tooth decay."},
      {title: "Treatment if needed", body: "Fillings, crowns, root canal treatment, or other care may be recommended when dental issues are present."},
      {title: "Guidance for parents and children", body: "The visit includes education on oral hygiene, healthy eating habits, and routines that support oral health."}
    ],
    aftercare: [
      "Build a consistent brushing and flossing routine at home.",
      "Schedule regular check-ups and cleanings.",
      "Follow food habit and fluoride guidance given during the visit."
    ],
    sections: [
      {
        title: "Services offered",
        items: [
          "Oral examination",
          "Professional cleanings",
          "Fluoride treatments",
          "Dental sealants",
          "Restorative treatments including fillings, crowns, and root canals",
          "Early orthodontic treatment guidance"
        ]
      }
    ],
    faqs: [
      {question: "When should my child visit the dentist?", answer: "Children benefit from early dental visits so prevention, habits, and development can be monitored."},
      {question: "What preventive treatments are available?", answer: "Cleanings, fluoride treatments, and sealants can help prevent tooth decay."},
      {question: "Can children need root canal treatment?", answer: "Restorative treatments, including root canal treatment, may be recommended when needed to manage dental issues."}
    ],
    relatedServices: ["braces-aligners", "root-canal-treatment", "teeth-cleaning-whitening"]
  },
  {
    title: "Root Canal Treatment",
    slug: "root-canal-treatment",
    eyebrow: "Tooth-saving care",
    summary: "Endodontic treatment to save infected or damaged teeth and relieve pain.",
    description:
      "Root canal treatment, also known as endodontic therapy, is performed to save a damaged or infected tooth and help prevent the need for extraction.",
    imageSrc: "/images/service-root-canal.jpg",
    imageAlt: "Root canal treatment planning",
    highlights: ["Saves the natural tooth", "Relieves pain", "Prevents further damage", "Restores function"],
    benefits: ["Saves the natural tooth", "Relieves pain", "Prevents further damage", "Restores function"],
    process: [
      {title: "Numbing the area", body: "Local anesthesia is administered to numb the area around the tooth."},
      {title: "Removing the pulp", body: "An opening is made in the top of the tooth and infected pulp is removed using specialized tools."},
      {title: "Cleaning the canals", body: "The root canals are cleaned and shaped to prepare them for filling."},
      {title: "Filling the space", body: "The canals are filled with a biocompatible material to prevent further infection and decay."},
      {title: "Sealing the tooth", body: "The tooth is sealed with a filling or crown to restore function and appearance."}
    ],
    aftercare: [
      "Mild soreness for a few days can often be managed with over-the-counter pain relievers as advised.",
      "Brush twice a day and floss daily.",
      "Attend regular dental check-ups to maintain the treated tooth."
    ],
    sections: [
      {
        title: "When root canal treatment may be needed",
        items: ["Severe toothache", "Swelling in the gums or face", "Sensitivity to hot and cold temperatures", "Discoloration of the tooth", "Tenderness when chewing or biting"]
      }
    ],
    faqs: [
      {question: "Why is root canal treatment needed?", answer: "It may be needed when tooth pulp becomes inflamed or infected due to deep decay, repeated procedures, or trauma."},
      {question: "Does root canal treatment save the tooth?", answer: "Yes. It can save a damaged or infected tooth and help prevent extraction."},
      {question: "What restores the tooth after treatment?", answer: "The tooth may be restored with a filling or crown to return function and appearance."}
    ],
    relatedServices: ["crowns-bridges", "extractions-impactions", "full-mouth-rehabilitation"]
  },
  {
    title: "Dentures",
    slug: "dentures",
    eyebrow: "Removable prosthetics",
    summary: "Complete, partial, and implant-supported dentures to restore missing teeth.",
    description:
      "Dentures are removable prosthetic devices used to replace missing teeth and surrounding tissues. They are custom-made to fit the mouth and support appearance, chewing, speech, and confidence.",
    imageSrc: "/images/service-dentures.jpg",
    imageAlt: "Denture consultation",
    highlights: ["Improved appearance", "Improved chewing function", "Improved speech", "Improved self-confidence"],
    benefits: ["Improved appearance", "Improved chewing function", "Improved speech", "Improved self-confidence"],
    process: [
      {title: "Consultation", body: "The number of missing teeth, gum condition, bite, and comfort needs are assessed."},
      {title: "Denture type selection", body: "Complete, partial, or implant-supported dentures are discussed based on how many natural teeth remain."},
      {title: "Impressions and design", body: "Impressions and measurements guide the custom denture fit."},
      {title: "Trial and fit", body: "The denture is checked for appearance, bite, comfort, and speech."},
      {title: "Review and adjustment", body: "Follow-up adjustments help improve comfort and function."}
    ],
    aftercare: [
      "Clean dentures daily with a soft-bristled brush and denture cleaner.",
      "Soak dentures overnight to prevent drying and warping.",
      "Handle dentures with care and attend regular dental check-ups."
    ],
    beforeAfter: [
      {title: "Complete denture", caption: "Full upper or lower missing teeth restored with a custom denture.", ...beforeAfterPlaceholder},
      {title: "Partial denture", caption: "Missing teeth replaced while preserving remaining natural teeth.", ...beforeAfterPlaceholder},
      {title: "Implant-supported denture", caption: "A more secure fit can improve chewing function.", ...beforeAfterPlaceholder}
    ],
    sections: [
      {
        title: "Types of dentures",
        items: [
          "Complete dentures for patients missing all upper or lower teeth.",
          "Partial dentures when some natural teeth remain.",
          "Implant-supported dentures attached to implants for a more secure fit and improved chewing."
        ]
      }
    ],
    faqs: [
      {question: "What are complete dentures?", answer: "Complete dentures are used when all teeth in the upper or lower jaw are missing."},
      {question: "What are partial dentures?", answer: "Partial dentures replace missing teeth when some natural teeth remain."},
      {question: "How should dentures be cleaned?", answer: "Clean daily with a soft brush and denture cleaner, and soak overnight as advised."}
    ],
    relatedServices: ["dental-implants", "full-mouth-rehabilitation", "crowns-bridges"]
  },
  {
    title: "Full Mouth Rehabilitation",
    slug: "full-mouth-rehabilitation",
    eyebrow: "Comprehensive restoration",
    summary: "A complete treatment plan to restore oral health, function, comfort, and smile appearance.",
    description:
      "Full mouth rehabilitation, also known as full mouth reconstruction, is a comprehensive plan used to restore the health, function, and appearance of the entire mouth.",
    imageSrc: "/images/service-full-mouth-rehab.svg",
    imageAlt: "Full mouth rehabilitation treatment planning",
    highlights: ["Improved oral health", "Improved appearance", "Improved function", "Personalized treatment plan"],
    benefits: ["Improved oral health", "Improved appearance", "Improved function", "Personalized treatment plan"],
    process: [
      {title: "Comprehensive evaluation", body: "The evaluation may include dental X-rays, impressions, and examination of teeth, gums, jaw muscles, and jaw joints."},
      {title: "Treatment planning", body: "A customized treatment plan is developed around the individual's needs and goals."},
      {title: "Treatment sequence", body: "Treatment may include implants, crowns, bridges, restorative fillings, orthodontics, or periodontal care."},
      {title: "Follow-up care", body: "After rehabilitation, regular oral hygiene and check-ups help keep results long-lasting."}
    ],
    aftercare: [
      "Maintain careful daily oral hygiene.",
      "Attend scheduled reviews throughout the treatment sequence.",
      "Continue regular dental check-ups after rehabilitation is complete."
    ],
    beforeAfter: [
      {title: "Severe wear rehabilitation", caption: "Worn teeth rebuilt for comfort, function, and smile support.", ...beforeAfterPlaceholder},
      {title: "Missing teeth and bite planning", caption: "Tooth loss, bite, and appearance addressed in one plan.", ...beforeAfterPlaceholder},
      {title: "Complex smile restoration", caption: "Multiple procedures sequenced for a complete mouth outcome.", ...beforeAfterPlaceholder}
    ],
    sections: [
      {
        title: "When full mouth rehabilitation may be needed",
        items: [
          "Severe tooth decay",
          "Severe wearing off of teeth",
          "Generalised sensitivity",
          "Teeth clenching or grinding",
          "Gum disease",
          "Tooth loss",
          "Bite problems",
          "Misaligned teeth",
          "TMJ disorders and pain",
          "Facial trauma"
        ]
      }
    ],
    faqs: [
      {question: "How long does full mouth rehabilitation take?", answer: "It may take several months depending on the complexity of the case and number of procedures needed."},
      {question: "Which treatments can be included?", answer: "The plan may include implants, crowns, bridges, fillings, orthodontics, periodontal care, or other restorative treatments."},
      {question: "Is the plan personalized?", answer: "Yes. Full mouth rehabilitation is customized to individual needs, goals, oral health, and bite condition."}
    ],
    relatedServices: ["dental-implants", "crowns-bridges", "dentures"]
  },
  {
    title: "Extractions & Impactions",
    slug: "extractions-impactions",
    eyebrow: "Wisdom tooth removal",
    summary: "Simple and surgical tooth extractions, including impacted wisdom teeth.",
    description:
      "Tooth extraction removes a tooth from the mouth when needed for severe decay, gum disease, trauma, or impacted teeth that cannot fully emerge.",
    imageSrc: "/images/service-extractions.svg",
    imageAlt: "Wisdom tooth extraction consultation",
    highlights: ["Pain and discomfort relief", "Prevention of further complications", "Improved oral health", "Improved alignment"],
    benefits: ["Relief from pain and discomfort", "Prevention of further complications", "Improved oral health", "Improved alignment"],
    process: [
      {title: "Consultation and diagnosis", body: "The tooth, gum, pain, swelling, infection, and X-ray findings are assessed."},
      {title: "Numbing", body: "The area is numbed with local anesthetic before extraction."},
      {title: "Simple or surgical extraction", body: "Visible teeth may be removed routinely, while impacted or hidden teeth may need surgical access."},
      {title: "Site protection", body: "Gauze and instructions are given to support clot formation and early healing."},
      {title: "Follow-up if needed", body: "Healing is reviewed if symptoms, swelling, or discomfort require attention."}
    ],
    aftercare: [
      "Bite gently on gauze for 30 to 45 minutes after extraction.",
      "Apply ice to reduce swelling and pain.",
      "Avoid hard, hot, and spicy foods for the first 24 hours.",
      "Avoid smoking for at least 24 hours to reduce dry socket risk.",
      "Avoid drinking beverages through a straw.",
      "Follow all specific instructions given for your extraction site."
    ],
    sections: [
      {title: "Types of extractions", items: ["Simple extraction for teeth visible above the gumline.", "Surgical extraction for teeth impacted or hidden beneath the gumline."]},
      {
        title: "Common impacted teeth",
        items: [
          "Wisdom teeth, which are the most commonly impacted teeth.",
          "Canines, which may cause crowding and misalignment.",
          "Premolars, which may contribute to crowding and require orthodontic planning."
        ]
      }
    ],
    faqs: [
      {question: "Why might a tooth need extraction?", answer: "Extraction may be needed for severe decay, gum disease, trauma, infection, or impacted teeth."},
      {question: "What is a surgical extraction?", answer: "Surgical extraction is used for teeth hidden beneath the gumline or impacted, sometimes requiring an incision."},
      {question: "What should I avoid after extraction?", answer: "Avoid hard, hot, and spicy foods, smoking, and drinking through a straw during early healing."}
    ],
    relatedServices: ["root-canal-treatment", "dental-implants", "full-mouth-rehabilitation"]
  },
  {
    title: "Teeth Cleaning & Whitening",
    slug: "teeth-cleaning-whitening",
    eyebrow: "Preventive and cosmetic care",
    summary: "Professional cleaning to support oral health and whitening options for a brighter smile.",
    description:
      "Teeth cleaning removes plaque, tartar, and stains from the teeth. Teeth whitening reduces stains and discoloration for a brighter, more vibrant smile.",
    imageSrc: "/images/service-cleaning-whitening.svg",
    imageAlt: "Teeth cleaning and whitening appointment",
    highlights: ["Improved oral health", "Fresher breath", "Early detection", "Brighter appearance"],
    benefits: ["Improved oral health", "Fresher breath", "Early detection of dental problems", "Improved appearance", "Boosted confidence", "Non-invasive procedure"],
    process: [
      {title: "Scaling", body: "Plaque and tartar are removed from the teeth and gumline using specialized tools."},
      {title: "Polishing", body: "The tooth surface is smoothened to help reduce future tartar build-up."},
      {title: "Flossing", body: "Flossing is done between the teeth to remove remaining debris."},
      {title: "Whitening consultation", body: "If whitening is planned, tooth shade, stain type, and suitability are evaluated."},
      {title: "Whitening treatment", body: "In-office whitening or custom at-home whitening may be recommended based on the case."}
    ],
    aftercare: [
      "Brush and floss regularly to remove plaque and prevent new stains.",
      "Avoid staining foods and drinks such as coffee, tea, red wine, and dark-coloured foods when maintaining whitening results.",
      "Schedule regular cleanings to maintain oral health and appearance."
    ],
    beforeAfter: [
      {title: "Professional cleaning", caption: "Plaque, tartar, and surface stains reduced with scaling and polishing.", ...beforeAfterPlaceholder},
      {title: "Whitening refresh", caption: "Discoloration improved for a brighter smile.", ...beforeAfterPlaceholder},
      {title: "Maintenance clean", caption: "Routine cleaning helps maintain gum health and fresher breath.", ...beforeAfterPlaceholder}
    ],
    sections: [
      {
        title: "Types of teeth whitening",
        items: [
          "In-office whitening performed by a dentist in the dental office.",
          "At-home whitening using a custom-made tray filled with whitening solution.",
          "Over-the-counter whitening products such as toothpaste, strips, and gels."
        ]
      }
    ],
    faqs: [
      {question: "How often should I schedule cleaning?", answer: "The right cleaning frequency depends on your dental history, oral hygiene, and gum health."},
      {question: "What does cleaning include?", answer: "Cleaning includes scaling, polishing, and flossing to remove plaque, tartar, stains, and debris."},
      {question: "Which whitening option is best?", answer: "A consultation helps determine whether in-office or at-home whitening is suitable for you."}
    ],
    relatedServices: ["cosmetic-dentistry", "braces-aligners", "pediatric-dentistry"]
  },
  {
    title: "Crowns & Bridges",
    slug: "crowns-bridges",
    eyebrow: "Restorative dentistry",
    summary: "Custom crowns and bridges to restore damaged, root-canal-treated, or missing teeth.",
    description:
      "Crowns and bridges are custom restorations used to rebuild damaged teeth, protect root-canal-treated teeth, and replace missing teeth. They support chewing, appearance, bite stability, and long-term oral function.",
    imageSrc: "/images/service-cosmetic-dentistry.jpg",
    imageAlt: "Crowns and bridges consultation at Emerge Dental Studio",
    highlights: ["Tooth protection", "Missing tooth replacement", "Improved chewing", "Natural-looking restoration"],
    benefits: ["Tooth protection", "Missing tooth replacement", "Improved chewing", "Natural-looking restoration", "Bite support"],
    process: [
      {title: "Consultation and examination", body: "The tooth, bite, gums, X-rays, and replacement needs are evaluated."},
      {title: "Treatment planning", body: "A crown or bridge is selected based on tooth strength, missing teeth, smile goals, and function."},
      {title: "Tooth preparation", body: "The tooth or supporting teeth are shaped as needed, and impressions or scans are taken."},
      {title: "Temporary restoration", body: "A temporary crown or bridge may be placed while the final restoration is made."},
      {title: "Final placement", body: "The final crown or bridge is checked for fit, bite, appearance, and comfort before cementation."}
    ],
    aftercare: [
      "Brush and floss daily around crowns and bridges.",
      "Avoid biting very hard objects on restored teeth.",
      "Schedule regular check-ups to monitor the restoration, gums, and bite."
    ],
    sections: [
      {
        title: "When crowns and bridges may help",
        items: [
          "A tooth is cracked, weakened, or heavily restored.",
          "A tooth needs protection after root canal treatment.",
          "One or more missing teeth need replacement.",
          "Chewing, speech, bite support, or smile appearance needs restoration."
        ]
      },
      {
        title: "How crowns and bridges fit into advanced care",
        items: [
          "Crowns may be used with root canal treatment.",
          "Bridges may replace missing teeth when suitable.",
          "Crowns and bridges can be part of full mouth rehabilitation.",
          "They connect closely with prosthodontic and cosmetic treatment planning."
        ]
      }
    ],
    faqs: [
      {question: "What is a dental crown?", answer: "A crown covers and protects a damaged or weakened tooth while restoring shape, appearance, and function."},
      {question: "What is a dental bridge?", answer: "A bridge replaces one or more missing teeth by using nearby teeth or implants for support."},
      {question: "Do crowns and bridges need special care?", answer: "They need good brushing, flossing, check-ups, and care around the gumline to stay healthy."}
    ],
    relatedServices: ["root-canal-treatment", "dental-implants", "full-mouth-rehabilitation"]
  }
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function formatAddress(settings: SiteSettings = siteSettings) {
  const {address} = settings;
  return `${address.street}, ${address.locality}, ${address.city}, ${address.region} ${address.postalCode}`;
}
