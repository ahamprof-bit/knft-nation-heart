import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { projects } from "@/data/projects";
import { ImagePlaceholder } from "@/components/placeholders";
import { Stagger, StaggerItem } from "@/components/motion-primitives";
import { BtnLink, PageHero, Section, SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Lake Restoration & Environment Work | KNFT" },
      {
        name: "description",
        content:
          "Explore KNFT projects including Muthambalayam and Koliyanur lake restoration, plastic waste transformation and nursery development.",
      },
      { property: "og:title", content: "KNFT Projects" },
      {
        property: "og:description",
        content: "Lake restoration, waste transformation and nursery development projects.",
      },
    ],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Work that changes landscapes and lives"
        subtitle="Each project is delivered with local communities and volunteers."
      />

      <Section>
        <SectionHeading
          title="All projects"
          subtitle="Project write-ups are being finalised from client-provided documents."
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
                  <p className="text-xs font-semibold tracking-widest uppercase text-emerald">
                    {p.category}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" aria-hidden /> {p.location}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
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
                    <BtnLink to="/projects/$slug" params={{ slug: p.slug }} variant="outline" size="sm">
                      View Project <ArrowRight className="h-4 w-4" />
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
