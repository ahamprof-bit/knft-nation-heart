import { Link } from "@tanstack/react-router";
import { Facebook, Leaf, Mail } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

const quickLinks = [
  { label: "About", to: "/about" },
  { label: "Our Work", to: "/our-work" },
  { label: "Projects", to: "/projects" },
  { label: "Impact", to: "/impact" },
  { label: "Gallery", to: "/gallery" },
] as const;

const actionLinks = [
  { label: "Volunteer", to: "/volunteer" },
  { label: "CSR", to: "/csr" },
  { label: "Donate", to: "/donate" },
  { label: "Contact", to: "/contact" },
  { label: "Documents", to: "/documents" },
] as const;

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms", to: "/terms" },
  { label: "Donation Policy", to: "/terms" },
  { label: "Disclaimer", to: "/terms" },
] as const;

export function Footer() {
  return (
    <footer className="bg-forest text-primary-foreground">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-dashed border-white/40 bg-white/10">
              <Leaf className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-70">
              [ KNFT Logo ]
            </span>
          </div>
          <p className="mt-5 font-display text-xl font-semibold">{siteConfig.name}</p>
          <p className="mt-1 text-sm opacity-80">{siteConfig.tagline}</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-5 inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {siteConfig.email}
          </a>
          <div className="mt-5">
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="KNFT on Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 transition-colors hover:bg-white/20"
            >
              <Facebook className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        <FooterCol title="Explore" links={quickLinks} />
        <FooterCol title="Take Action" links={actionLinks} />
        <FooterCol title="Legal" links={legalLinks} />
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-6 text-xs opacity-70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; to: string }[];
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.2em] uppercase opacity-70">{title}</p>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="opacity-85 underline-offset-4 hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
