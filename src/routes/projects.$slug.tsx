import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, MapPin, Tag, Activity } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { ImagePlaceholder, VideoPlaceholder } from "@/components/placeholders";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";
import { BtnLink, Container, Section, SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project not found — KNFT" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.title} — KNFT Project` },
        {
          name: "description",
          content: `${project.title}: ${project.highlights.join(", ")}. A ${project.category} project by Kalam Nation First Trust.`,
        },
        { property: "og:title", content: `${project.title} — KNFT` },
        { property: "og:description", content: project.highlights.join(" · ") },
      ],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const blocks = [
    { title: "Project Overview", body: project.overview },
    { title: "The Challenge", body: project.challenge },
    { title: "KNFT's Action", body: project.action },
    { title: "Community Participation", body: project.participation },
    { title: "Impact", body: project.impact },
  ];

  return (
    <>
      <header className="bg-hero-gradient text-primary-foreground">
        <Container className="grid gap-8 py-14 sm:py-20 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase">
              {project.category}
            </span>
            <h1 className="mt-4 text-4xl leading-tight font-semibold sm:text-5xl">{project.title}</h1>
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-primary-foreground/85">
              <div className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden />
                <dt className="sr-only">Location</dt>
                <dd>{project.location}</dd>
              </div>
              <div className="inline-flex items-center gap-2">
                <Tag className="h-4 w-4" aria-hidden />
                <dt className="sr-only">Category</dt>
                <dd>{project.category}</dd>
              </div>
              <div className="inline-flex items-center gap-2">
                <Activity className="h-4 w-4" aria-hidden />
                <dt className="sr-only">Status</dt>
                <dd>{project.status}</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.1}>
            <ImagePlaceholder label="PROJECT IMAGE PLACEHOLDER" ratio="aspect-[16/10]" />
          </Reveal>
        </Container>
      </header>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {blocks.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.05} className="surface-card p-7">
              <h2 className="text-xl font-semibold">{b.title}</h2>
              <p className="mt-3 text-muted-foreground">{b.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading title="Before / After" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div>
            <ImagePlaceholder label="BEFORE IMAGE PLACEHOLDER" ratio="aspect-[4/3]" />
            <p className="mt-2 text-sm text-muted-foreground">Before</p>
          </div>
          <div>
            <ImagePlaceholder label="AFTER IMAGE PLACEHOLDER" ratio="aspect-[4/3]" />
            <p className="mt-2 text-sm text-muted-foreground">After</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Project Video" />
        <div className="mt-8">
          <VideoPlaceholder url={project.video || undefined} />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading title="Photo Gallery" />
        <Stagger className="mt-8 grid gap-4 sm:grid-cols-3">
          {project.gallery.map((src, i) => (
            <StaggerItem key={i}>
              <ImagePlaceholder src={src || undefined} ratio="aspect-[4/3]" />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <SectionHeading title="Related Projects" />
        <Stagger className="mt-8 grid gap-5 sm:grid-cols-3">
          {related.map((r) => (
            <StaggerItem key={r.slug} className="surface-card overflow-hidden">
              <ImagePlaceholder ratio="aspect-[16/9]" className="rounded-none rounded-t-xl" />
              <div className="p-6">
                <h3 className="text-base font-semibold">{r.title}</h3>
                <div className="mt-4">
                  <BtnLink to="/projects/$slug" params={{ slug: r.slug }} variant="outline" size="sm">
                    View Project <ArrowRight className="h-4 w-4" />
                  </BtnLink>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
