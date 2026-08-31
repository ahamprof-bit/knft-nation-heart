import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Quote } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { organisation } from "@/data/organisation";
import { programmes } from "@/data/programmes";
import { projects } from "@/data/projects";
import { impactStats } from "@/data/impact";
import { ImagePlaceholder } from "@/components/placeholders";
import { Counter, Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";
import {
  BtnLink,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui-kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kalam Nation First Trust — Nation First. Humanity Always." },
      {
        name: "description",
        content:
          "KNFT restores water bodies, protects nature and empowers communities across Tamil Nadu. Volunteer, partner or donate today.",
      },
      { property: "og:title", content: "Kalam Nation First Trust (KNFT)" },
      {
        property: "og:description",
        content: "Community-driven action for people, nature and a stronger future.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground">
        <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase">
              Est. Volunteer-led · 2012
            </span>
            <h1 className="mt-5 text-4xl leading-[1.03] font-semibold sm:text-6xl">
              {siteConfig.name}
            </h1>
            <p className="mt-4 font-display text-xl text-primary-foreground/90 sm:text-2xl">
              {siteConfig.tagline}
            </p>
            <p className="mt-5 max-w-xl text-base text-primary-foreground/80">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BtnLink to="/donate" variant="emerald" size="lg">
                Donate Now
              </BtnLink>
              <BtnLink to="/our-work" variant="ghostLight" size="lg">
                Explore Our Work <ArrowRight className="h-4 w-4" />
              </BtnLink>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ImagePlaceholder
              label="LARGE CLIENT IMAGE / VIDEO PLACEHOLDER"
              ratio="aspect-[4/3]"
              className="w-full"
            />
          </Reveal>
        </Container>
      </section>

      {/* TRUST INTRO */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-4 text-3xl leading-tight font-semibold sm:text-4xl">
              Building Communities. Restoring Nature. Empowering People.
            </h2>
            <p className="mt-5 text-muted-foreground">{organisation.intro}</p>
            <div className="mt-7">
              <BtnLink to="/about" variant="primary">
                Discover Our Story <ArrowRight className="h-4 w-4" />
              </BtnLink>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
            <ImagePlaceholder ratio="aspect-[3/4]" />
            <ImagePlaceholder ratio="aspect-[3/4]" className="mt-8" />
          </Reveal>
        </div>
      </Section>

      {/* IMPACT COUNTERS */}
      <Section tone="forest">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">Impact so far</h2>
          <p className="mt-3 text-primary-foreground/75">
            Verified figures from KNFT's ongoing community work.
          </p>
        </Reveal>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((s) => (
            <StaggerItem
              key={s.label}
              className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm"
            >
              <p className="font-display text-4xl font-semibold">
                {s.value === null ? "—" : <Counter value={s.value} suffix={s.suffix ?? ""} />}
              </p>
              <p className="mt-2 text-sm text-primary-foreground/80">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* OUR WORK */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Our Work"
          title="Nine areas of community action"
          subtitle="From lake restoration to youth leadership, our volunteers work where communities need support most."
        />
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((p) => (
            <StaggerItem key={p.slug}>
              <article className="surface-card flex h-full flex-col overflow-hidden hover:-translate-y-1 hover:shadow-lift">
                <ImagePlaceholder ratio="aspect-[16/9]" className="rounded-none rounded-t-xl" />
                <div className="flex flex-1 flex-col p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                    <p.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
                  <Link
                    to="/our-work"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5"
                  >
                    Explore <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* FEATURED PROJECTS */}
      <Section>
        <SectionHeading
          eyebrow="Featured Projects"
          title="Restoration work on the ground"
          subtitle="Project details are being finalised from KNFT's official documents."
        />
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2">
          {projects.map((p) => (
            <StaggerItem key={p.slug}>
              <article className="surface-card flex h-full flex-col overflow-hidden hover:-translate-y-1 hover:shadow-lift">
                <ImagePlaceholder
                  label="PROJECT IMAGE PLACEHOLDER"
                  ratio="aspect-[16/9]"
                  className="rounded-none rounded-t-xl"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.highlights.map((h) => (
                      <li
                        key={h}
                        className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <BtnLink
                      to="/projects/$slug"
                      params={{ slug: p.slug }}
                      variant="outline"
                      size="sm"
                    >
                      View Project <ArrowRight className="h-4 w-4" />
                    </BtnLink>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* LEADERSHIP QUOTE / CTA */}
      <Section tone="muted">
        <div className="surface-card grid gap-8 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <Reveal>
            <Quote className="h-8 w-8 text-emerald" aria-hidden />
            <p className="mt-4 font-display text-2xl leading-snug font-semibold sm:text-3xl">
              Every restored lake, every sapling and every trained child begins with one volunteer
              choosing to show up.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Join KNFT as a volunteer, CSR partner or supporter.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-3">
            <BtnLink to="/get-involved" variant="primary" size="lg">
              Get Involved
            </BtnLink>
            <BtnLink to="/donate" variant="emerald" size="lg">
              Donate Now
            </BtnLink>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
