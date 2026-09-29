import { Link } from "@tanstack/react-router";
import { Facebook, Mail } from "lucide-react";
import { siteConfig, navLinks } from "@/data/siteConfig";
import logo from "@/assets/knft-logo.png.jpg";

const quickLinks = navLinks.filter(
  (link) => link.to !== "/contact"
);

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
      {/* Main Footer */}
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-4">

        {/* Organisation */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-3"
          >
            <img
              src={logo}
              alt="Kalam Nation First Trust Logo"
              className="h-14 w-14 shrink-0 rounded-lg object-contain"
            />

            <div className="flex flex-col leading-tight">
              <span className="font-display text-sm font-bold tracking-wide text-white sm:text-base">
                KALAM NATION FIRST
              </span>

              <span className="text-[10px] font-semibold tracking-[0.28em] text-white/70 sm:text-xs">
                TRUST
              </span>
            </div>
          </Link>

          <p className="mt-5 text-sm leading-6 text-white/80">
            {siteConfig.tagline}
          </p>

          {/* Email */}
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-5 inline-flex items-center gap-2 text-sm text-white/90 underline-offset-4 hover:underline"
          >
            <Mail
              className="h-4 w-4"
              aria-hidden
            />

            {siteConfig.email}
          </a>

          {/* Facebook */}
          {siteConfig.social?.facebook && (
            <div className="mt-5">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Kalam Nation First Trust on Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 transition-colors hover:bg-white/20"
              >
                <Facebook
                  className="h-4 w-4"
                  aria-hidden
                />
              </a>
            </div>
          )}
        </div>

        {/* Explore */}
        <FooterCol
          title="Explore"
          links={quickLinks}
        />

        {/* Take Action */}
        <FooterCol
          title="Take Action"
          links={actionLinks}
        />

        {/* Legal */}
        <FooterCol
          title="Legal"
          links={legalLinks}
        />
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>

          <p>
            {siteConfig.tagline}
          </p>
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
  links: readonly {
    label: string;
    to: string;
  }[];
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/70">
        {title}
      </p>

      <ul className="mt-4 space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}