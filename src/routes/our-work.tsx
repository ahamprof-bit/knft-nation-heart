import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { programmes } from "@/data/programmes";
import { ImagePlaceholder } from "@/components/placeholders";
import { Stagger, StaggerItem } from "@/components/motion-primitives";
import { BtnLink, PageHero, Section, SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/our-work")({
  head: () => ({
    meta: [
      { title: "Our Work — Programmes of Kalam Nation First Trust" },
      {
        name: "description",
        content:
          "Water restoration, environment, disaster relief, blood donation, education, youth, sports and community development programmes by KNFT.",
      },
      { property: "og:title", content: "Our Work — KNFT Programmes" },
      {
        property: "og:description",
        content: "Nine areas of community action led by KNFT volunteers.",
      },
    ],
  }),
  component: OurWork,
});

function OurWork() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Programmes that put communities first"
        subtitle="Nine focus areas, one purpose — stronger people, healthier nature."
      />

      <Section>
        <SectionHeading
          title="Focus areas"
          subtitle="Detailed programme content will be published from KNFT's official documents."
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
                  <div className="mt-5">
                    <BtnLink to="/projects" variant="outline" size="sm">
                      Explore <ArrowRight className="h-4 w-4" />
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
