import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./motion-primitives";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  tone = "white",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "muted" | "forest";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-24",
        tone === "white" && "bg-background",
        tone === "muted" && "bg-offwhite",
        tone === "forest" && "bg-forest text-primary-foreground",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-secondary px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase text-secondary-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-4 text-3xl leading-tight font-semibold sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-base text-muted-foreground">{subtitle}</p> : null}
    </Reveal>
  );
}

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-forest hover:shadow-lift",
  emerald: "bg-emerald text-primary-foreground hover:brightness-95 hover:shadow-lift",
  outline: "border border-primary/25 bg-transparent text-primary hover:bg-secondary",
  ghostLight: "border border-white/40 bg-white/10 text-primary-foreground hover:bg-white/20",
  soft: "bg-secondary text-secondary-foreground hover:bg-muted",
} as const;

const sizes = {
  sm: "h-9 px-4",
  md: "h-11 px-6",
  lg: "h-12 px-7 text-[15px]",
} as const;

type BtnProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function Btn({
  variant = "primary",
  size = "md",
  className,
  ...props
}: BtnProps & ComponentProps<"button">) {
  return <button className={cn(btnBase, variants[variant], sizes[size], className)} {...props} />;
}

export function BtnLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: BtnProps & ComponentProps<typeof Link>) {
  return <Link className={cn(btnBase, variants[variant], sizes[size], className)} {...props} />;
}

export function BtnAnchor({
  variant = "primary",
  size = "md",
  className,
  ...props
}: BtnProps & ComponentProps<"a">) {
  return <a className={cn(btnBase, variants[variant], sizes[size], className)} {...props} />;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="bg-hero-gradient text-primary-foreground">
      <Container className="py-16 sm:py-24">
        <Reveal className="max-w-3xl">
          {eyebrow ? (
            <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="mt-4 text-4xl leading-[1.05] font-semibold sm:text-5xl">{title}</h1>
          {subtitle ? (
            <p className="mt-4 max-w-2xl text-base text-primary-foreground/80">{subtitle}</p>
          ) : null}
        </Reveal>
      </Container>
    </header>
  );
}

export function ComingSoon({ children = "Content Coming Soon" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
      {children}
    </span>
  );
}
