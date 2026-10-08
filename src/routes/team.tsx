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
  }),

  component: Team,
});

function Team() {
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
          DISTRICT COLLECTOR / LEADERSHIP
      ========================================================= */}
      <Section>
        <div className="mx-auto max-w-7xl">
          <section className="relative overflow-hidden rounded-3xl border bg-background shadow-sm">
            {/* Left Accent */}
            <div className="absolute inset-y-0 left-0 w-1 bg-primary" />

            {/* Decorative Background */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/5" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/5" />

            <div className="relative p-7 sm:p-10 lg:p-12">
              {/* Eyebrow */}
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                District Leadership
              </div>

              {/* Main Content */}
              <div className="mt-7 max-w-4xl">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                  District Collector, Villupuram
                </h2>

                <div className="mt-5">
                  <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                    Thiru. S. Sheik Abdul Rahaman, I.A.S.
                  </h3>

                  <p className="mt-2 text-sm font-medium text-primary sm:text-base">
                    District Collector, Villupuram
                  </p>
                </div>

                {/* Mission Highlight */}
                <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    District-Led Water Restoration
                  </p>

                  <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                    9 Lakes. One Day. One Collective Mission.
                  </h3>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                    Under the guidance and leadership of the District Collector,
                    Villupuram District, a collective water-restoration effort
                    brought together district administration, municipalities,
                    volunteers and local communities to work towards restoring
                    water bodies and strengthening environmental stewardship.
                  </p>
                </div>

                {/* Leadership Statement */}
                <div className="mt-7 border-l-2 border-primary/40 pl-5">
                  <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                    This initiative reflects the power of collaborative
                    leadership, where government administration, volunteers and
                    communities come together with a shared commitment to
                    protecting and restoring local water resources.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Section>

      {/* =========================================================
          TEAM SECTIONS
      ========================================================= */}
      <Section>
        <div className="mx-auto max-w-7xl">
          <div className="space-y-8">
            {teamCategories.map((category, index) => {
              const isProgrammeTeam =
                category.title === "Programme & Community Teams";

              const hasMembers = category.members.length > 0;

              return (
                <section
                  key={category.title}
                  className="group relative overflow-hidden rounded-3xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
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
                              {isProgrammeTeam ? "Teams" : "Members"}
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
                      EMPTY STATE
                  ================================================= */}
                  {!hasMembers && (
                    <div className="p-8 text-center sm:p-12">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl font-light text-primary">
                        +
                      </div>

                      <h3 className="mt-4 text-lg font-semibold">
                        Profiles Coming Soon
                      </h3>

                      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  )}

                  {/* =================================================
                      PEOPLE CARDS
                  ================================================= */}
                  {hasMembers && !isProgrammeTeam && (
                    <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
                      {category.members.map((member) => (
                        <article
                          key={`${category.title}-${member.name}`}
                          className="group/member relative overflow-hidden rounded-2xl border bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                        >
                          <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <span className="text-lg font-bold">
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
                          className="group/team relative overflow-hidden rounded-2xl border bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                        >
                          <div className="flex items-start gap-4">
                            {/* Team Number */}
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary transition-transform duration-300 group-hover/team:scale-105">
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
                Our strength comes from people working together across social
                service, education, sports, environment, agriculture, disaster
                relief and community development.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}