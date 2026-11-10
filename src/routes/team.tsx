import { createFileRoute } from "@tanstack/react-router";
import { teamCategories } from "@/data/team";
import { PageHero, Section } from "@/components/ui-kit";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      {
        title: "Our Team | Kalam Nation First Trust",
      },
      {
        name: "description",
        content:
          "Meet the leadership, coordinators, volunteers, advisors and programme teams of Kalam Nation First Trust.",
      },
      {
        property: "og:title",
        content: "Our Team | Kalam Nation First Trust",
      },
      {
        property: "og:description",
        content:
          "Meet the people and programme teams working together across KNFT's community initiatives.",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://kalamnationfirsttrust.com/team",
      },
    ],
  }),

  component: Team,
});

function Team() {
  // Hide categories that have no published profiles yet
  // (no "Profiles Coming Soon" placeholders on the public page).
  const visibleCategories = teamCategories.filter(
    (category) => category.members.length > 0,
  );

  return (
    <>
      {/* =========================================================
          HERO
      ========================================================= */}
      <PageHero
        eyebrow="Our Team"
        title="The People Behind KNFT"
        subtitle="Meet the leaders, coordinators, volunteers, advisors and programme teams working together to create meaningful community impact."
      />

      {/* =========================================================
          TEAM SECTIONS
      ========================================================= */}
      <Section>
        <div className="mx-auto max-w-7xl">
          <div className="space-y-8">
            {visibleCategories.map((category, index) => {
              const isProgrammeTeam =
                category.title === "Programme & Community Teams";

              const hasMembers = category.members.length > 0;

              return (
                <section
                  key={category.title}
                  className="group relative overflow-hidden rounded-3xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0 motion-reduce:transition-none hover:shadow-lg"
                >
                  {/* Left Accent */}
                  <div className="absolute inset-y-0 left-0 w-1 bg-primary" />

                  {/* =================================================
                      CATEGORY HEADER
                  ================================================= */}
                  <div className="border-b bg-muted/20 p-6 sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                      {/* Number */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {/* Title + Description */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            {category.title}
                          </h2>

                          {hasMembers && (
                            <span className="w-fit shrink-0 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                              {category.members.length}{" "}
                              {isProgrammeTeam
                                ? category.members.length === 1
                                  ? "Team"
                                  : "Teams"
                                : category.members.length === 1
                                  ? "Member"
                                  : "Members"}
                            </span>
                          )}
                        </div>

                        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      PEOPLE CARDS
                  ================================================= */}
                  {hasMembers && !isProgrammeTeam && (
                    <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
                      {category.members.map((member) => (
                        <article
                          key={`${category.title}-${member.name}`}
                          className="group/member relative overflow-hidden rounded-2xl border bg-background p-5 transition-all duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0 motion-reduce:transition-none hover:border-primary/40 hover:shadow-md"
                        >
                          <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <span className="text-lg font-bold" aria-hidden="true">
                                {member.name.charAt(0)}
                              </span>
                            </div>

                            {/* Person Details */}
                            <div className="min-w-0">
                              <h3 className="font-semibold leading-6 text-foreground">
                                {member.name}
                              </h3>

                              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                                {member.role}
                              </p>
                            </div>
                          </div>

                          {/* Bottom Hover Accent */}
                          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover/member:w-full" />
                        </article>
                      ))}
                    </div>
                  )}

                  {/* =================================================
                      PROGRAMME & COMMUNITY TEAMS
                  ================================================= */}
                  {hasMembers && isProgrammeTeam && (
                    <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
                      {category.members.map((member, teamIndex) => (
                        <article
                          key={`${category.title}-${member.name}`}
                          className="group/team relative overflow-hidden rounded-2xl border bg-background p-5 transition-all duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0 motion-reduce:transition-none hover:border-primary/40 hover:shadow-md"
                        >
                          <div className="flex items-start gap-4">
                            {/* Team Number */}
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary transition-transform duration-300 group-hover/team:scale-105 motion-reduce:transition-none motion-reduce:group-hover/team:scale-100">
                              {String(teamIndex + 1).padStart(2, "0")}
                            </div>

                            {/* Team Details */}
                            <div className="min-w-0">
                              <h3 className="font-semibold leading-6 text-foreground">
                                {member.name}
                              </h3>

                              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-primary/70">
                                Programme & Community Team
                              </p>
                            </div>
                          </div>

                          {/* Bottom Hover Accent */}
                          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover/team:w-full" />
                        </article>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </Section>

      {/* =========================================================
          PUBLIC OFFICIALS — kept separate from the KNFT team.
          Government officials are not KNFT governance or members.
          Remove or edit only with documentary support / permission.
      ========================================================= */}
      <Section tone="muted">
        <div className="mx-auto max-w-7xl">
          <section
            aria-labelledby="official-participation"
            className="relative overflow-hidden rounded-3xl border bg-background p-7 shadow-sm sm:p-10 lg:p-12"
          >
            <div className="absolute inset-y-0 left-0 w-1 bg-border" />

            <p className="inline-flex rounded-full bg-secondary px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-secondary-foreground">
              Public officials · Not part of the KNFT team
            </p>

            <h2
              id="official-participation"
              className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Official participation in KNFT initiatives
            </h2>

            <div className="mt-5 max-w-3xl">
              <p className="text-lg font-semibold text-foreground">
                Thiru. S. Sheik Abdul Rahaman, I.A.S.
              </p>

              <p className="mt-1 text-sm font-medium text-primary sm:text-base">
                District Collector, Villupuram
              </p>

              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                The District Collector, Villupuram, took part in KNFT&apos;s
                water restoration initiative in Villupuram district, in which
                work was initiated at nine lakes on a single day together
                with district administration, municipal staff, volunteers and
                local communities.
              </p>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                This describes participation only. It does not indicate
                funding, endorsement, approval or a formal partnership, and
                the District Collector is not a member of KNFT.
              </p>
            </div>
          </section>
        </div>
      </Section>

      {/* =========================================================
          BOTTOM CTA
      ========================================================= */}
      <Section tone="muted">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border bg-background p-8 text-center shadow-sm sm:p-12">
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/5" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-primary/5" />

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground">
                KNFT
              </div>

              <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                Together, We Create Impact
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                Our strength comes from people working together across
                environment and water restoration, education, sports, blood
                donation, disaster relief and community development.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}