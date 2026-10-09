import { Link } from "@tanstack/react-router";
import { Facebook, Mail, Youtube } from "lucide-react";
import { navLinks } from "@/data/siteConfig";

const LOGO_URL = "/knft-logo.png.webp";
const EMAIL = "kalamnationtrust@gmail.com";

const FACEBOOK_URL = "https://www.facebook.com/share/1DTjEmMbH6/";
const YOUTUBE_URL = "https://www.youtube.com/@Kalamtrust-g4d";

const quickLinks = navLinks.filter(
(link) => link.href !== "/contact"
);

const actionLinks = [
{ label: "Donate", href: "/donate" },
{ label: "Volunteer", href: "/volunteer" },
{ label: "CSR Partnerships", href: "/csr" },
];

const legalLinks = [
{ label: "Privacy Policy", href: "/privacy-policy" },
{ label: "Terms & Conditions", href: "/terms-and-conditions" },
];

type FooterLink = {
label: string;
href: string;
};

function FooterCol({
title,
links,
}: {
title: string;
links: FooterLink[];
}) {
return (
<div>
<h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
{title}
</h3>

  <ul className="space-y-3">
    {links.map((link) => (
      <li key={link.href}>
        <Link
          to={link.href as "/"}
          className="text-sm text-white/70 transition-colors hover:text-white"
        >
          {link.label}
        </Link>
      </li>
    ))}
  </ul>
</div>

);
}

export default function Footer() {
return (
<footer className="bg-[#0b3d25] text-white">
<div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
{/* Organisation */}
<div>
<Link to="/" aria-label="Kalam Nation First Trust home" className="mb-5 inline-flex items-center gap-3" >
<img
src={LOGO_URL}
alt="Kalam Nation First Trust logo"
className="h-14 w-14 shrink-0 rounded-xl bg-white object-contain p-1"
loading="eager"
decoding="async"
onError={(event) => {
console.error(
"KNFT logo failed to load:",
LOGO_URL
);

              event.currentTarget.style.display = "none";

              const fallback =
                event.currentTarget.nextElementSibling as HTMLElement | null;

              if (fallback) {
                fallback.style.display = "flex";
              }
            }}
          />

          {/* Fallback if the logo image cannot load */}
          <span
            className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold text-[#0b3d25]"
            aria-hidden="true"
          >
            KNFT
          </span>

          <span className="flex flex-col">
            <span className="font-serif text-lg font-bold leading-tight tracking-wide">
              KALAM NATION FIRST
            </span>

            <span className="text-xs font-semibold tracking-[0.3em] text-white/70">
              TRUST
            </span>
          </span>
        </Link>

        <p className="mb-5 max-w-xs text-sm leading-6 text-white/75">
          Nation First. Humanity Always.
        </p>

        {/* Social media and contact links */}
        <div className="flex gap-3">
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Kalam Nation First Trust on Facebook"
            title="Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
          >
            <Facebook size={18} />
          </a>

          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Kalam Nation First Trust on YouTube"
            title="YouTube"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
          >
            <Youtube size={18} />
          </a>

          <a
            href={"mailto:" + EMAIL}
            aria-label="Email Kalam Nation First Trust"
            title="Email"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>

      {/* Footer navigation */}
      <FooterCol
        title="Explore"
        links={quickLinks}
      />

      <FooterCol
        title="Get Involved"
        links={actionLinks}
      />

      <FooterCol
        title="Information"
        links={legalLinks}
      />
    </div>

    {/* Copyright */}
    <div className="mt-10 border-t border-white/15 pt-6">
      <p className="text-center text-xs leading-5 text-white/60">
        © {new Date().getFullYear()} Kalam Nation First Trust. All rights reserved.
      </p>
    </div>
  </div>
</footer>

);
}