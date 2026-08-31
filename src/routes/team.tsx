import { createFileRoute } from "@tanstack/react-router";
import { teamCategories } from "@/data/team";
import { AvatarPlaceholder } from "@/components/placeholders";
import { Stagger, StaggerItem } from "@/components/motion-primitives";
import { ComingSoon, PageHero, Section, SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — Volunteers & Coordinators | KNFT" },
      {
        name: "description",
        content:
          "Trust leadership, field coordinators, volunteer coordinators, youth leaders and advisors who drive KNFT's community work.",
      },
      { property: "og:title", content: "The KNFT Team" },
      { property: "og:description", content: "The volunteers and coordinators behind KNFT." },
    ],
  }),
  component: Team,
});

function Team() {
  return (
    <>
      <PageHero
        eyebrow="Team"
        title="Volunteers make this work possible"
        subtitle="Names and photographs will be added as the client shares them."
      />

      <Section>
        <SectionHeading title="Team structure" />
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {teamCategories.map((c) => (
            <StaggerItem key={c.title} className="surface-card p-7">
              <h3 className="text-lg font-semibold text-primary">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
              {c.members.length ? (
                <ul className="mt-5 space-y-4">
                  {c.members.map((m) => (
                    <li key={m.name} className="flex items-center gap-3">
                      <AvatarPlaceholder className="h-12 w-12" />
                      <span>
                        <span className="block text-sm font-semibold">{m.name}</span>
                        <span className="block text-xs text-muted-foreground">{m.role}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-5 flex items-center gap-3">
                  <AvatarPlaceholder className="h-12 w-12" />
                  <ComingSoon />
                </div>
              )}
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
