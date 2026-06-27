import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Not found</p>
          <h1>This page is not available</h1>
          <p>The page may have moved, or the address may be incorrect.</p>
          <div className="actions">
            <Link className="button" href="/">
              Return home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
