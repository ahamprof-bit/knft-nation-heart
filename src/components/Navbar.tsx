import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/siteConfig";
import { BtnLink } from "./ui-kit";
import logo from "@/assets/knft-logo.png.jpg";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const visibleNavLinks = navLinks.filter(
    (link) => link.to !== "/contact"
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-border bg-background/90 shadow-sm backdrop-blur-md"
          : "border-transparent bg-background"
      }`}
    >
      <div className="mx-auto flex h-[76px] w-full max-w-7xl items-center gap-4 px-5 sm:px-8">
        
        {/* Logo + Organization Name */}
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <img
            src={logo}
            alt="Kalam Nation First Trust Logo"
            className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
          />

          <div className="flex flex-col leading-tight">
            <span className="font-display text-sm font-bold tracking-wide text-primary sm:text-base">
              KALAM NATION FIRST
            </span>

            <span className="text-[10px] font-semibold tracking-[0.28em] text-muted-foreground sm:text-xs">
              TRUST
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden items-center gap-1 xl:flex">
          {visibleNavLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-secondary hover:text-primary"
              activeProps={{
                className: "bg-secondary text-primary",
              }}
              activeOptions={{
                exact: l.to === "/",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Donate + Mobile Menu */}
        <div className="ml-auto flex items-center gap-2 xl:ml-3">
          <BtnLink
            to="/donate"
            variant="emerald"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Donate Now
          </BtnLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-primary transition-colors hover:bg-secondary xl:hidden"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden border-t border-border bg-background xl:hidden"
          >
            <nav className="mx-auto grid max-w-7xl gap-1 px-5 py-4 sm:px-8">
              {visibleNavLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                  activeProps={{
                    className: "bg-secondary text-primary",
                  }}
                  activeOptions={{
                    exact: l.to === "/",
                  }}
                >
                  {l.label}
                </Link>
              ))}

              <BtnLink
                to="/donate"
                variant="emerald"
                className="mt-2"
                onClick={() => setOpen(false)}
              >
                Donate Now
              </BtnLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}