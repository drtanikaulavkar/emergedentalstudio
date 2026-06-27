import {defineField, defineType} from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({name: "title", title: "Default SEO Title", type: "string"}),
    defineField({name: "description", title: "Default Meta Description", type: "text", rows: 3}),
    defineField({name: "siteUrl", title: "Site URL", type: "url"}),
    defineField({name: "clinicName", title: "Clinic Name", type: "string"}),
    defineField({name: "logo", title: "Logo", type: "image", options: {hotspot: true}}),
    defineField({name: "phone", title: "Phone", type: "string"}),
    defineField({name: "whatsappNumber", title: "WhatsApp Number", type: "string"}),
    defineField({name: "email", title: "Email", type: "string"}),
    defineField({name: "bookingUrl", title: "Booking URL", type: "url"}),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        defineField({name: "street", title: "Street", type: "string"}),
        defineField({name: "locality", title: "Locality", type: "string"}),
        defineField({name: "city", title: "City", type: "string"}),
        defineField({name: "region", title: "Region", type: "string"}),
        defineField({name: "postalCode", title: "Postal Code", type: "string"}),
        defineField({name: "country", title: "Country Code", type: "string"})
      ]
    }),
    defineField({
      name: "hours",
      title: "Opening Hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({name: "days", title: "Days", type: "string"}),
            defineField({name: "opens", title: "Opens", type: "string"}),
            defineField({name: "closes", title: "Closes", type: "string"}),
            defineField({name: "label", title: "Display Label", type: "string"})
          ]
        }
      ]
    }),
    defineField({name: "closedDays", title: "Closed Days", type: "array", of: [{type: "string"}]}),
    defineField({name: "serviceAreas", title: "Service Areas", type: "array", of: [{type: "string"}]}),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({name: "name", title: "Name", type: "string"}),
            defineField({name: "rating", title: "Rating", type: "number"}),
            defineField({name: "quote", title: "Quote", type: "text", rows: 3})
          ]
        }
      ]
    })
  ],
  preview: {
    select: {title: "clinicName", subtitle: "phone"}
  }
});
