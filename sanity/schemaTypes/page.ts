/**
 * Page document schema for Sanity Studio.
 *
 * Plain documents for site pages (Homepage, Explore, Contact, or any new page).
 * The editable `title` drives the Studio header; `slug` is generated from it for
 * routing. SEO + social share fields come from `definePageSeoFields`.
 */

import { defineField, defineType } from "sanity";
import { FileText } from "lucide-react";
import { definePageSeoFields, definePageSeoFieldset } from "./page-seo-fields";

/** Sanity document type for site pages (`page`). */
export const page = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  icon: FileText,
  fieldsets: [definePageSeoFieldset()],
  fields: [
    defineField({
      name: "title",
      title: "Page name",
      type: "string",
      description: "Shown in Studio lists and the document header.",
      validation: (rule) => rule.required().error("Add a page name"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "URL path for this page. Generate from the page name; must be unique.",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) =>
        rule.required().error("Generate a unique slug from the page name"),
    }),
    ...definePageSeoFields(),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
