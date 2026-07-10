import {defineField, defineType} from "sanity";

export const service = defineType({
  name: "service",
  title: "Services",
  type: "document",
  fields: [
    defineField({name: "title", title: "Title", type: "string", validation: (rule) => rule.required()}),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {source: "title"},
      validation: (rule) => rule.required()
    }),
    defineField({name: "orderRank", title: "Display Order", type: "number"}),
    defineField({name: "eyebrow", title: "Small Label", type: "string"}),
    defineField({name: "summary", title: "Card Summary", type: "text", rows: 3}),
    defineField({name: "description", title: "Page Intro", type: "text", rows: 5}),
    defineField({name: "imageSrc", title: "Local Image Source", type: "string"}),
    defineField({name: "image", title: "Service Image", type: "image", options: {hotspot: true}}),
    defineField({name: "imageAlt", title: "Image Alt Text", type: "string"}),
    defineField({name: "highlights", title: "Highlights", type: "array", of: [{type: "string"}]}),
    defineField({name: "benefits", title: "Compact Benefits", type: "array", of: [{type: "string"}]}),
    defineField({
      name: "process",
      title: "Treatment Process",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({name: "title", title: "Step Title", type: "string"}),
            defineField({name: "body", title: "Step Body", type: "text", rows: 3})
          ]
        }
      ]
    }),
    defineField({name: "aftercare", title: "Aftercare", type: "array", of: [{type: "string"}]}),
    defineField({
      name: "brands",
      title: "Dental Brands Used",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({name: "name", title: "Brand Name", type: "string"}),
            defineField({name: "logoSrc", title: "Logo Source", type: "string"}),
            defineField({name: "logoAlt", title: "Logo Alt Text", type: "string"})
          ]
        }
      ]
    }),
    defineField({
      name: "beforeAfter",
      title: "Before and After Cases",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({name: "title", title: "Case Title", type: "string"}),
            defineField({name: "beforeImageSrc", title: "Before Image Source", type: "string"}),
            defineField({name: "beforeImageAlt", title: "Before Image Alt Text", type: "string"}),
            defineField({name: "afterImageSrc", title: "After Image Source", type: "string"}),
            defineField({name: "afterImageAlt", title: "After Image Alt Text", type: "string"}),
            defineField({name: "caption", title: "Caption", type: "text", rows: 3})
          ]
        }
      ]
    }),
    defineField({
      name: "sections",
      title: "Content Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({name: "title", title: "Title", type: "string"}),
            defineField({name: "intro", title: "Intro", type: "text", rows: 3}),
            defineField({name: "items", title: "Items", type: "array", of: [{type: "string"}]})
          ]
        }
      ]
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({name: "question", title: "Question", type: "string"}),
            defineField({name: "answer", title: "Answer", type: "text", rows: 3})
          ]
        }
      ]
    }),
    defineField({name: "relatedServices", title: "Related Service Slugs", type: "array", of: [{type: "string"}]})
  ],
  preview: {
    select: {title: "title", subtitle: "eyebrow", media: "image"}
  }
});
