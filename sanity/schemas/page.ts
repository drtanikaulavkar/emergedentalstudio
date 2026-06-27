import {defineField, defineType} from "sanity";

export const page = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    defineField({name: "title", title: "Page Title", type: "string", validation: (rule) => rule.required()}),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {source: "title"},
      validation: (rule) => rule.required()
    }),
    defineField({name: "seoTitle", title: "SEO Title", type: "string"}),
    defineField({name: "seoDescription", title: "Meta Description", type: "text", rows: 3}),
    defineField({name: "heroTitle", title: "Hero Title", type: "string"}),
    defineField({name: "heroText", title: "Hero Text", type: "text", rows: 4}),
    defineField({name: "image", title: "Page Image", type: "image", options: {hotspot: true}}),
    defineField({
      name: "sections",
      title: "Page Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({name: "title", title: "Title", type: "string"}),
            defineField({name: "body", title: "Body", type: "text", rows: 5})
          ]
        }
      ]
    })
  ]
});
