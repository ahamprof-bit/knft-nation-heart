import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Leaf, Quote, Users } from "lucide-react";

import {
  environmentalImpact,
  impactAreas,
  impactStats,
  impactStories,
  socialImpact,
  type Stat,
} from "@/data/impact";

import {
  Counter,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/motion-primitives";

import {
  BtnLink,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui-kit";

/* ============================================================
   SUBASREE IMAGES
============================================================ */

import subasreeImage1 from "@/assets/SPORTS/RUNNING/WhatsApp Image 2026-09-25 at 22.12.16.jpeg";
import subasreeImage2 from "@/assets/SPORTS/RUNNING/WhatsApp Image 2026-09-25 at 22.12.16 (1).jpeg";
import subasreeImage3 from "@/assets/SPORTS/RUNNING/WhatsApp Image 2026-09-25 at 22.12.16 (2).jpeg";
import subasreeImage4 from "@/assets/SPORTS/RUNNING/WhatsApp Image 2026-09-25 at 22.12.17.jpeg";
import subasreeImage5 from "@/assets/SPORTS/RUNNING/WhatsApp Image 2026-09-25 at 22.12.17 (1).jpeg";
import subasreeImage6 from "@/assets/SPORTS/RUNNING/WhatsApp Image 2026-09-25 at 22.12.18.jpeg";

/* ============================================================
   ROUTE
============================================================ */

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      {
        title: "Impact — Kalam Nation First Trust",
      },
      {
        name: "description",
        content:
          "Explore the environmental, social and community impact created through the work of Kalam Nation First Trust.",
      },
      {
        property: "og:title",
        content: "Impact — Kalam Nation First Trust",
      },
      {
        property: "og:description",
        content:
          "See the measurable impact and community stories behind KNFT's work.",
      },
    ],
  }),

  component: Impact,
});

/* ============================================================
   CATEGORY ROUTES
============================================================ */

const impactCategoryRoutes: Record<string, string> = {
  "Water Restoration": "/projects/water-restoration",
  "Environment & Biodiversity": "/projects/environment-biodiversity",
  "Disaster Relief & Humanitarian Support":
    "/projects/disaster-relief-humanitarian-support",
  "Blood Donation": "/projects/blood-donation",
  "Poverty & Hunger Support": "/projects/poverty-hunger-support",
  "Youth Empowerment": "/projects/youth-empowerment",
  Education: "/projects/education",
  "Sports & Traditional Arts": "/projects/sports-traditional-arts",
  "Community Development": "/projects/community-development",
};

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  stat,
  dark = false,
}: {
  stat: Stat;
  dark?: boolean;
}) {
  return (
    <div
      className={
        dark
          ? "rounded-2xl border border-white/15 bg-white/10 p-7 backdrop-blur-sm"
          : "surface-card rounded-2xl p-7"
      }
    >
      <p
        className={
          dark
            ? "font-display text-4xl font-semibold text-white"
            : "font-display text-4xl font-semibold text-foreground"
        }
      >
        <Counter
          value={stat.value ?? 0}
          suffix={stat.suffix ?? ""}
        />
      </p>

      <p
        className={
          dark
            ? "mt-3 text-sm leading-6 text-primary-foreground/75"
            : "mt-3 text-sm leading-6 text-muted-foreground"
        }
      >
        {stat.label}
      </p>
    </div>
  );
}

/* ============================================================
   IMPACT PAGE
============================================================ */

function Impact() {
  /* ==========================================================
     SUBASREE GALLERY
  ========================================================== */

  const subasreeImages = [
    {
      src: subasreeImage1,
      alt: "Subasree running achievement",
    },
    {
      src: subasreeImage2,
      alt: "Subasree running achievement",
    },
    {
      src: subasreeImage3,
      alt: "Subasree running achievement",
    },
    {
      src: subasreeImage4,
      alt: "Subasree running achievement",
    },
    {
      src: subasreeImage5,
      alt: "Subasree running achievement",
    },
    {
      src: subasreeImage6,
      alt: "Subasree running achievement",
    },
  ];

  return (
    <>
      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-forest py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20" />

        <Container className="relative">
          <Reveal className="max-w-4xl">
            <Eyebrow>Our Impact</Eyebrow>

            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-white sm:text-6xl">
              Turning collective action into meaningful impact.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Every project, volunteer and community partnership contributes
              to a larger journey of environmental protection, social support
              and community development.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ======================================================
          OUR IMPACT
      ====================================================== */}

      <Section>
        <SectionHeading
          eyebrow="Our Impact"
          title="The numbers behind our work."
          subtitle="Together, our initiatives create measurable environmental and social impact across communities."
        />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat) => (
            <StaggerItem key={stat.label}>
              <StatCard stat={stat} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ======================================================
          ENVIRONMENTAL IMPACT
      ====================================================== */}

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal>
            <Eyebrow>Environmental Impact</Eyebrow>

            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-5xl">
              Restoring nature for future generations.
            </h2>

            <p className="mt-5 leading-8 text-muted-foreground">
              KNFT works with volunteers and communities to restore water
              bodies, protect natural resources, support biodiversity and
              strengthen environmental awareness.
            </p>

            <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Leaf className="h-7 w-7" />
            </div>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {environmentalImpact.map((stat) => (
              <StaggerItem key={stat.label}>
                <StatCard stat={stat} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* ======================================================
          SOCIAL IMPACT
      ====================================================== */}

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {socialImpact.map((stat) => (
              <StaggerItem key={stat.label}>
                <StatCard stat={stat} />
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <Eyebrow>Social Impact</Eyebrow>

            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-5xl">
              People, opportunity and community.
            </h2>

            <p className="mt-5 leading-8 text-muted-foreground">
              Our social initiatives focus on education, youth development,
              humanitarian support, sports, traditional arts, blood donation
              and community participation.
            </p>

            <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Users className="h-7 w-7" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ======================================================
          IMPACT AREAS
      ====================================================== */}

      <Section tone="muted">
        <SectionHeading
          eyebrow="Impact Areas"
          title="Where KNFT creates action."
          subtitle="Our work connects environmental protection, humanitarian support, education, youth and community participation."
        />

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {impactAreas.map((area, index) => {
            const categoryRoute = impactCategoryRoutes[area.title];

            return (
              <StaggerItem key={area.title}>
                <article className="surface-card group h-full rounded-[1.75rem] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {index % 3 === 0 ? (
                      <Leaf className="h-5 w-5" />
                    ) : index % 3 === 1 ? (
                      <Heart className="h-5 w-5" />
                    ) : (
                      <Users className="h-5 w-5" />
                    )}
                  </div>

                  <h3 className="mt-6 text-xl font-semibold">
                    {area.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {area.description}
                  </p>

                  {categoryRoute && (
                    <Link
                      to={categoryRoute as never}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                      KNFT Impact

                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  )}
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* ======================================================
          IMPACT STORIES
      ====================================================== */}

      <Section>
        <SectionHeading
          eyebrow="Impact Stories"
          title="Real journeys behind the numbers."
          subtitle="Impact is also about people, opportunities and individual journeys."
        />

        <div className="mt-12 space-y-16">
          {impactStories.map((story) => (
            <Reveal key={story.slug}>
              <article className="overflow-hidden rounded-[2rem] border border-border bg-card">
                <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
                  {/* STORY CONTENT */}

                  <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Quote className="h-6 w-6" />
                    </div>

                    <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      Impact Story
                    </p>

                    <h3 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                      {story.title}
                    </h3>

                    <p className="mt-4 text-sm font-semibold text-primary">
                      {story.journey}
                    </p>

                    <p className="mt-6 leading-8 text-muted-foreground">
                      {story.summary}
                    </p>

                    <div className="mt-8">
                      <BtnLink
                        to="/our-work"
                        variant="outline"
                        size="sm"
                      >
                        Explore Our Work
                        <ArrowRight className="h-4 w-4" />
                      </BtnLink>
                    </div>
                  </div>

                  {/* STORY IMAGES */}

                  <div className="grid grid-cols-2 gap-1 bg-muted p-1 sm:grid-cols-3">
                    {subasreeImages.map((image, index) => (
                      <div
                        key={`${story.slug}-${index}`}
                        className="group relative aspect-square overflow-hidden bg-muted"
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ======================================================
          BEYOND NUMBERS
      ====================================================== */}

      <Section tone="forest">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>Beyond Numbers</Eyebrow>

            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
              Impact is created when people come together.
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/70">
              From restoring water bodies and protecting nature to supporting
              education, youth, humanitarian initiatives and community
              participation, every contribution becomes part of a larger
              movement.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <BtnLink
                to="/our-work"
                variant="secondary"
              >
                Explore Our Work
                <ArrowRight className="h-4 w-4" />
              </BtnLink>

              <BtnLink
                to="/get-involved"
                variant="outline"
              >
                Get Involved
                <Heart className="h-4 w-4" />
              </BtnLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}