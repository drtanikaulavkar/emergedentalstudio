import Link from "next/link";
import type {Metadata} from "next";
import {buildPageMetadata} from "@/lib/seo";

const blogPosts = [
  {
    title: "How to plan a smile makeover",
    summary: "A simple guide to the consultation, design, trial, and treatment steps behind cosmetic dentistry.",
    tag: "Cosmetic dentistry"
  },
  {
    title: "Dental implants: what to expect",
    summary: "A patient-friendly overview of implant planning, healing, crowns, and long-term maintenance.",
    tag: "Implant dentistry"
  }
];

export const metadata: Metadata = buildPageMetadata({
  title: "Dental Blogs",
  description: "Patient-friendly dental guides from Emerge Dental Studio in Indiranagar, Bengaluru, with new articles coming soon.",
  path: "/blogs"
});

export default function BlogsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Blogs</p>
          <h1>Dental notes for clearer decisions</h1>
          <p>Placeholder articles for future guides on smile design, implants, prevention, and everyday dental care.</p>
        </div>
      </section>

      <section className="container section">
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article className="blog-card" key={post.title}>
              <p className="eyebrow">{post.tag}</p>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
              <Link className="button ghost" href="/contact">
                Ask us about this
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
