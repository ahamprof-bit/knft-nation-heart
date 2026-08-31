import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  environmentalImpact,
  impactStats,
  impactStories,
  socialImpact,
  type Stat,
} from "@/data/impact";
import { ImagePlaceholder } from "@/components/placeholders";
import { Counter, Stagger, StaggerItem } from "@/components/motion-primitives";
import { BtnLink, PageHero, Section, SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Our Impact — Verified Results | KNFT" },
      {
        name: "description",
        content:
          "Water bodies restored, palm seeds sown, saplings planted and children trained — verified impact figures from Kalam Nation First Trust.",
      },
      { property: "og:title", content: "KNFT Impact Dashboard" },
      { property: "og:description", content: "Environmental and social impact of KNFT's work." },
    ],
  }),
  component: Impact,
});

function StatCard({ stat, tone = "light" }: { stat: Stat; tone?: "light" | "dark" }) {
  return (
    <div
      className={
        tone === "dark"
          ? "rounded-2xl border border-white/15 bg-white/10 p-6"
          : "surface-card p-6"
      }
    >
      <p className="font-display text-3xl font-semibold sm:text-4xl">
        {stat.value === null ? (
          <span className="text-base font-medium text-muted-foreground">Data Coming Soon</span>
        ) : (
          <Counter value={stat.value} suffix={stat.suffix ?? ""} />
        )}
      </p>
      <p className={`mt-2 text-sm ${tone === "dark" ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
        {stat.label}
      </p>
    </div>
  );
}

function Impact() {
  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="Measured, verified, community-owned"
        subtitle="We publish only figures we can verify. Everything else is marked Data Coming Soon."
      />

      <Section tone="forest">
        <SectionHeading title="Our Impact" />
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((s) => (
            <StaggerItem key={s.label}>
              <StatCard stat={s} tone="dark" />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <SectionHeading eyebrow="Environment" title="Environmental Impact" />
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {environmentalImpact.map((s) => (
            <StaggerItem key={s.label}>
              <StatCard stat={s} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Community" title="Social Impact" />
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {socialImpact.map((s) => (
            <StaggerItem key={s.label}>
              <StatCard stat={s} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Impact Stories"
          title="People behind the numbers"
          subtitle="Full stories will be published with the client's approved content."
        />
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {impactStories.map((s) => (
            <StaggerItem key={s.slug}>
              <article className="surface-card h-full overflow-hidden">
                <ImagePlaceholder ratio="aspect-[16/9]" className="rounded-none rounded-t-xl" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm font-medium text-emerald">{s.journey}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
                  <div className="mt-5">
                    <BtnLink to="/gallery" variant="outline" size="sm">
                      Read Story <ArrowRight className="h-4 w-4" />
                    </BtnLink>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
