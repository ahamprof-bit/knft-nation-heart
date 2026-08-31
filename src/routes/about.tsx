import { createFileRoute } from "@tanstack/react-router";
import { organisation } from "@/data/organisation";
import { AvatarPlaceholder, ImagePlaceholder } from "@/components/placeholders";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";
import { BtnLink, ComingSoon, PageHero, Section, SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About KNFT — Our Story, Vision & Values" },
      {
        name: "description",
        content:
          "The story, journey, vision, mission and core values of Kalam Nation First Trust, a volunteer-led community organisation.",
      },
      { property: "og:title", content: "About Kalam Nation First Trust" },
      {
        property: "og:description",
        content: "Volunteer-led since 2012 — our story, vision, mission and values.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A volunteer movement for people and nature"
        subtitle="Nation First. Humanity Always."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <SectionHeading eyebrow="Our Story" title="How KNFT began" />
            <div className="mt-6 space-y-4 text-muted-foreground">
              {organisation.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ImagePlaceholder ratio="aspect-[4/3]" />
          </Reveal>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Our Journey" title="Milestones over the years" />
        <div className="relative mt-10 border-l border-border pl-6 sm:pl-10">
          <Stagger className="space-y-8">
            {organisation.journey.map((j, i) => (
              <StaggerItem key={i} className="relative">
                <span className="absolute top-2 -left-[31px] h-3 w-3 rounded-full bg-emerald ring-4 ring-offwhite sm:-left-[47px]" />
                <div className="surface-card p-6">
                  {j.year ? (
                    <p className="font-display text-2xl font-semibold text-primary">{j.year}</p>
                  ) : null}
                  <h3 className="mt-1 text-lg font-semibold">{j.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{j.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal className="surface-card p-8">
            <h3 className="font-display text-2xl font-semibold">Vision</h3>
            <p className="mt-3 text-muted-foreground">{organisation.vision}</p>
          </Reveal>
          <Reveal delay={0.08} className="surface-card p-8">
            <h3 className="font-display text-2xl font-semibold">Mission</h3>
            <p className="mt-3 text-muted-foreground">{organisation.mission}</p>
          </Reveal>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Core Values" title="What guides our work" />
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {organisation.values.map((v) => (
            <StaggerItem key={v.title} className="surface-card p-6">
              <h3 className="text-lg font-semibold text-primary">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <SectionHeading eyebrow="Leadership" title="The people behind KNFT" />
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {organisation.leadership.map((l) => (
            <StaggerItem key={l.name} className="surface-card flex flex-col items-center p-8 text-center">
              <AvatarPlaceholder />
              <h3 className="mt-5 text-lg font-semibold">{l.name}</h3>
              <p className="text-sm text-muted-foreground">{l.role}</p>
              <div className="mt-3">
                <ComingSoon />
              </div>
              <div className="mt-5">
                <BtnLink to="/team" variant="outline" size="sm">
                  Read Profile
                </BtnLink>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
