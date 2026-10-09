import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested does not exist. Visit the home page to see projects and contact information.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="wrap py-32">
      <p className="text-sm text-mute">404</p>
      <h1 className="display mt-3">That page does not exist.</h1>
      <p className="lead mt-5">The link may be old or mistyped. Projects and the contact form are on the home page.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
        <Link href="/#projects" className="btn btn-ghost">
          See projects
        </Link>
      </div>
    </section>
  );
}
