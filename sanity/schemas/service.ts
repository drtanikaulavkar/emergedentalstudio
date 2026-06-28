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
    defineField({
      name: "sections",
      title: "Content Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({name: "title", title: "Title", type: "string"}),
            defineField({name: "items", title: "Items", type: "array", of: [{type: "string"}]})
          ]
        }
      ]
    })
  ],
  preview: {
    select: {title: "title", subtitle: "eyebrow", media: "image"}
  }
});
