import { createFileRoute } from "@tanstack/react-router";

import { organisation } from "@/data/organisation";

import { AvatarPlaceholder } from "@/components/placeholders";

import {
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/motion-primitives";

import {
  BtnLink,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/ui-kit";

/* =========================================================
   ROUTE
   ========================================================= */

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About KNFT — Our Story, Vision & Values",
      },
      {
        name: "description",
        content:
          "Learn about Kalam Nation First Trust, its volunteer-led journey since 2012, vision, mission, values, leadership, team and collaborative approach.",
      },
      {
        property: "og:title",
        content: "About Kalam Nation First Trust",
      },
      {
        property: "og:description",
        content:
          "Volunteer-led since 2012 — our story, vision, mission, values and journey towards meaningful social impact.",
      },
    ],
  }),

  component: About,
});

/* =========================================================
   ABOUT PAGE
   ========================================================= */

function About() {
  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}

      <PageHero
        eyebrow="About KNFT"
        title="A volunteer movement for people, communities and nature."
        subtitle={organisation.tagline}
      />

      {/* =====================================================
          OUR STORY
      ===================================================== */}

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* Story */}

          <Reveal>
            <SectionHeading
              eyebrow="Our Story"
              title="From a volunteer movement to a growing force for community action."
            />

            <div className="mt-7 space-y-5 text-muted-foreground">
              {organisation.story.map((paragraph) => (
                <p
                  key={paragraph}
                  className="leading-8"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Core Belief */}

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-muted p-8 sm:p-10">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-emerald/10 blur-3xl" />

              <p className="relative text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Our Core Belief
              </p>

              <p className="relative mt-6 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                {organisation.coreBelief.english}
              </p>

              <div className="relative mt-6 h-px w-16 bg-emerald" />

              <p className="relative mt-5 text-xl leading-8 text-muted-foreground">
                {organisation.coreBelief.tamil}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* =====================================================
          OUR JOURNEY
      ===================================================== */}

      <Section tone="muted">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionHeading
              eyebrow="Our Journey"
              title="Milestones that shaped KNFT."
            />

            <p className="mt-5 leading-7 text-muted-foreground">
              Every initiative, volunteer and community interaction has
              contributed to the journey of Kalam Nation First Trust.
            </p>
          </Reveal>
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl">
          {/* Timeline line */}

          <div className="absolute left-4 top-0 h-full w-px bg-border sm:left-1/2 sm:-translate-x-1/2" />

          <Stagger className="space-y-10">
            {organisation.journey.map((journeyItem, index) => (
              <StaggerItem
                key={`${journeyItem.title}-${index}`}
                className="relative"
              >
                <div
                  className={`grid gap-6 sm:grid-cols-2 sm:gap-12 ${
                    index % 2 === 0
                      ? ""
                      : "sm:[&>div:first-child]:order-2"
                  }`}
                >
                  {/* Timeline heading */}

                  <div className="pl-10 sm:pl-0 sm:text-right">
                    {"year" in journeyItem &&
                    journeyItem.year ? (
                      <p className="font-display text-3xl font-bold text-primary">
                        {journeyItem.year}
                      </p>
                    ) : null}

                    <h3 className="mt-2 text-xl font-semibold">
                      {journeyItem.title}
                    </h3>
                  </div>

                  {/* Timeline content */}

                  <div className="surface-card relative rounded-2xl p-6">
                    <span className="absolute -left-[2.1rem] top-7 h-3 w-3 rounded-full bg-emerald ring-4 ring-offwhite sm:left-auto sm:right-auto" />

                    <p className="text-sm leading-7 text-muted-foreground">
                      {journeyItem.body}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* =====================================================
          VISION & MISSION
      ===================================================== */}

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionHeading
              eyebrow="Vision & Mission"
              title="What we strive to achieve."
            />
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Vision */}

          <Reveal className="surface-card rounded-3xl p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Our Vision
            </p>

            <h3 className="mt-5 font-display text-3xl font-semibold leading-tight">
              A stronger, compassionate and sustainable society.
            </h3>

            <p className="mt-6 leading-8 text-muted-foreground">
              {organisation.vision}
            </p>
          </Reveal>

          {/* Mission */}

          <Reveal
            delay={0.08}
            className="surface-card rounded-3xl p-8 sm:p-10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Our Mission
            </p>

            <h3 className="mt-5 font-display text-3xl font-semibold leading-tight">
              Turning collective action into meaningful impact.
            </h3>

            <ul className="mt-7 space-y-4">
              {organisation.mission.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 text-sm leading-7 text-muted-foreground"
                >
                  <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-emerald" />

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* =====================================================
          CORE PHILOSOPHY
      ===================================================== */}

      <Section tone="muted">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Our Core Philosophy
            </p>

            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-5xl">
              {organisation.philosophy.statement}
            </h2>

            <p className="mt-5 text-xl text-muted-foreground">
              {organisation.philosophy.tamil}
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 max-w-4xl space-y-6">
          {organisation.philosophy.body.map(
            (paragraph, index) => (
              <Reveal
                key={paragraph}
                delay={index * 0.05}
              >
                <p className="text-center leading-8 text-muted-foreground">
                  {paragraph}
                </p>
              </Reveal>
            ),
          )}
        </div>
      </Section>

      {/* =====================================================
          VALUES
      ===================================================== */}

      <Section>
        <SectionHeading
          eyebrow="Our Values"
          title="The principles behind our work."
        />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {organisation.values.map((value, index) => (
            <StaggerItem
              key={value.title}
              className="surface-card group rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="text-sm font-semibold text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-6 text-xl font-semibold">
                {value.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {value.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* =====================================================
          OUR WORK
      ===================================================== */}

      <Section tone="muted">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <SectionHeading
              eyebrow="Our Work"
              title="Action that can be seen, felt and remembered."
            />

            <p className="mt-6 leading-8 text-muted-foreground">
              From environmental restoration to disaster response,
              blood donation, education, sports and traditional
              activities, our volunteers contribute their time and
              effort where communities need it most.
            </p>
          </Reveal>

          {/* Gallery CTA */}

          <Reveal
            delay={0.08}
            className="mt-10"
          >
            <div className="relative overflow-hidden rounded-3xl border bg-background p-8 shadow-sm sm:p-10">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/5" />

              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                  Explore Our Activities
                </p>

                <h3 className="mt-4 font-display text-3xl font-semibold">
                  See our work in action.
                </h3>

                <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
                  Explore moments from KNFT&apos;s environmental,
                  humanitarian, educational, sports and community
                  initiatives.
                </p>

                <div className="mt-7">
                  <BtnLink
                    to="/gallery"
                    variant="primary"
                    size="lg"
                  >
                    Explore Gallery
                  </BtnLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* =====================================================
          LEADERSHIP
      ===================================================== */}

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionHeading
              eyebrow="Leadership"
              title="The people behind KNFT."
            />
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-6">
          {organisation.leadership.map((leader) => (
            <StaggerItem
              key={leader.name}
              className="surface-card rounded-3xl p-8 sm:p-10"
            >
              <div className="grid gap-10 md:grid-cols-[220px_1fr]">
                {/* Leader */}

                <div className="flex flex-col items-center text-center">
                  <AvatarPlaceholder />

                  <h3 className="mt-5 text-xl font-semibold">
                    {leader.name}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {leader.role}
                  </p>
                </div>

                {/* Profile */}

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                    Leadership
                  </p>

                  <div className="mt-5 space-y-4">
                    {leader.profile.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-8 text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Philosophy */}

                  <div className="mt-7 border-l-2 border-emerald pl-5">
                    <p className="text-sm font-semibold">
                      Leadership Philosophy
                    </p>

                    <p className="mt-2 text-sm italic leading-7 text-muted-foreground">
                      “{leader.philosophy}”
                    </p>
                  </div>

                  {/* Profile link */}

                  <div className="mt-7">
                    <BtnLink
                      to="/team"
                      variant="outline"
                      size="sm"
                    >
                      View Team
                    </BtnLink>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* =====================================================
          OUR TEAM
      ===================================================== */}

      <Section tone="muted">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionHeading
              eyebrow="Our Team"
              title="Strengthened by collective action."
            />

            <div className="mt-6 space-y-4 text-muted-foreground">
              {organisation.teamDescription.map(
                (paragraph) => (
                  <p
                    key={paragraph}
                    className="leading-7"
                  >
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {organisation.team.map((role) => (
            <StaggerItem
              key={role}
              className="surface-card rounded-2xl p-6"
            >
              <h3 className="font-semibold text-primary">
                {role}
              </h3>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Team link */}

        <Reveal
          className="mt-10 text-center"
        >
          <BtnLink
            to="/team"
            variant="outline"
            size="lg"
          >
            Meet Our Team
          </BtnLink>
        </Reveal>

        <Reveal className="mt-12 text-center">
          <p className="font-display text-2xl font-semibold">
            {organisation.strengthStatement}
          </p>
        </Reveal>
      </Section>

      {/* =====================================================
          HOW WE WORK
      ===================================================== */}

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionHeading
              eyebrow="How We Work"
              title="Working together for practical and sustainable solutions."
            />

            <p className="mt-6 leading-8 text-muted-foreground">
              {organisation.howWeWorkDescription}
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {organisation.howWeWork.map((group, index) => (
            <StaggerItem
              key={group}
              className="surface-card rounded-2xl p-6"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-4 font-semibold">
                {group}
              </h3>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-14 text-center">
          <p className="font-display text-2xl font-semibold text-primary">
            {organisation.strengthStatement}
          </p>
        </Reveal>
      </Section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-primary px-7 py-14 text-center text-primary-foreground sm:px-12 sm:py-20">
            {/* Decorative circles */}

            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] opacity-80">
                Be Part of the Journey
              </p>

              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-5xl">
                Meaningful change begins with collective action.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-7 opacity-80">
                Whether you volunteer, support an initiative or
                collaborate with us, every contribution can become
                part of something larger.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <BtnLink
                  to="/get-involved"
                  variant="secondary"
                >
                  Get Involved
                </BtnLink>

                <BtnLink
                  to="/contact"
                  variant="outline"
                >
                  Contact KNFT
                </BtnLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}