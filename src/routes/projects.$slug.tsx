import { createFileRoute } from "@tanstack/react-router";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Play,
} from "lucide-react";

import {
  getProject,
  getWaterProjects,
  type Project,
} from "@/data/projects";

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

/* ============================================================
   ASSET LIBRARY

   IMPORTANT:
   Each project uses ONLY its own mediaTerms.

   MEDIA FORMAT:
   - Photos        -> 9:16
   - Local videos  -> 9:16
   - YouTube       -> 9:16
   ============================================================ */

const imageModules = import.meta.glob(
  "/src/assets/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const videoModules = import.meta.glob(
  "/src/assets/**/*.{mp4,MP4,webm,WEBM}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

/* ============================================================
   NORMALISE
   ============================================================ */

function normalizePath(path: string) {
  return path
    .toLowerCase()
    .replace(/\\/g, "/")
    .replace(/\s+/g, " ");
}

/* ============================================================
   ALL MEDIA
   ============================================================ */

const allImages = Object.entries(imageModules).map(
  ([path, src]) => ({
    path: normalizePath(path),
    src,
  }),
);

const allVideos = Object.entries(videoModules).map(
  ([path, src]) => ({
    path: normalizePath(path),
    src,
  }),
);

/* ============================================================
   UNIQUE
   ============================================================ */

function unique(items: string[]) {
  return [...new Set(items)];
}

/* ============================================================
   FIND PROJECT IMAGES
   ============================================================ */

function findImages(terms: string[]) {
  if (!terms.length) {
    return [];
  }

  const normalizedTerms = terms.map((term) =>
    normalizePath(term),
  );

  return unique(
    allImages
      .filter(({ path }) =>
        normalizedTerms.some((term) =>
          path.includes(term),
        ),
      )
      .map(({ src }) => src),
  );
}

/* ============================================================
   FIND PROJECT VIDEOS
   ============================================================ */

function findVideos(terms: string[]) {
  if (!terms.length) {
    return [];
  }

  const normalizedTerms = terms.map((term) =>
    normalizePath(term),
  );

  return unique(
    allVideos
      .filter(({ path }) =>
        normalizedTerms.some((term) =>
          path.includes(term),
        ),
      )
      .map(({ src }) => src),
  );
}

/* ============================================================
   ROUTE
   ============================================================ */

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const project = getProject(params.slug);

    return {
      meta: [
        {
          title: project
            ? `${project.title} — KNFT`
            : "Project — Kalam Nation First Trust",
        },
        {
          name: "description",
          content: project
            ? project.overview
            : "Explore Kalam Nation First Trust community initiatives and projects.",
        },
        {
          property: "og:title",
          content: project
            ? `${project.title} — KNFT`
            : "KNFT Project",
        },
        {
          property: "og:description",
          content: project
            ? project.overview
            : "Explore KNFT projects and programmes.",
        },
      ],
    };
  },

  component: ProjectDetail,
});

/* ============================================================
   PROJECT MEDIA

   PRIORITY:

   1. Local project video
   2. Local project image
   3. Project-specific YouTube

   ALL MEDIA = 9:16

   NO MEDIA FALLBACK
   ============================================================ */

function ProjectMedia({
  project,
  images,
  videos,
}: {
  project: Project;
  images: string[];
  videos: string[];
}) {
  const localVideo = videos[0];
  const localImage = images[0];

  /* ==========================================================
     1. LOCAL PROJECT VIDEO

     9:16
     ========================================================== */

  if (localVideo) {
    return (
      <div
        className="
          flex
          w-full
          justify-center
          overflow-hidden
          rounded-3xl
          bg-black
        "
      >
        <div className="aspect-[9/16] w-full">
          <video
            src={localVideo}
            className="
              h-full
              w-full
              object-cover
            "
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label={`${project.title} project video`}
          />
        </div>
      </div>
    );
  }

  /* ==========================================================
     2. LOCAL PROJECT IMAGE

     9:16
     ========================================================== */

  if (localImage) {
    return (
      <div
        className="
          flex
          w-full
          justify-center
          overflow-hidden
          rounded-3xl
          bg-muted
        "
      >
        <div className="aspect-[9/16] w-full">
          <img
            src={localImage}
            alt={project.title}
            className="
              h-full
              w-full
              object-cover
            "
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  /* ==========================================================
     3. PROJECT-SPECIFIC YOUTUBE

     9:16
     ========================================================== */

  const youtube = project.youtubeVideos?.[0];

  if (youtube) {
    return (
      <div
        className="
          flex
          w-full
          justify-center
          overflow-hidden
          rounded-3xl
          bg-black
        "
      >
        <div className="relative aspect-[9/16] w-full">
          <iframe
            src={`https://www.youtube.com/embed/${youtube.id}`}
            title={youtube.title}
            className="
              absolute
              inset-0
              h-full
              w-full
            "
            loading="lazy"
            allow="
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share
            "
            allowFullScreen
          />

          <div
            className="
              pointer-events-none
              absolute
              bottom-4
              left-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/20
              bg-black/60
              px-3
              py-1.5
              text-xs
              font-medium
              text-white
              backdrop-blur-md
            "
          >
            <Play
              className="
                h-3.5
                w-3.5
                fill-current
              "
            />

            YouTube Video
          </div>
        </div>
      </div>
    );
  }

  return null;
}

/* ============================================================
   YOUTUBE SECTION

   ALL YOUTUBE VIDEOS = 9:16
   ============================================================ */

function YouTubeSection({
  project,
}: {
  project: Project;
}) {
  const videos = project.youtubeVideos ?? [];

  if (videos.length === 0) {
    return null;
  }

  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="Video"
        title="Watch the work"
        subtitle={`Videos related specifically to ${project.title}.`}
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div
            key={video.id}
            className="
              overflow-hidden
              rounded-2xl
              bg-black
              shadow-sm
            "
          >
            {/* ==================================================
                ALL YOUTUBE VIDEOS = 9:16
            ================================================== */}

            <div className="relative aspect-[9/16] w-full">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                "
                loading="lazy"
                allow="
                  accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture;
                  web-share
                "
                allowFullScreen
              />
            </div>

            {/* ==================================================
                VIDEO TITLE
            ================================================== */}

            <div
              className="
                border-t
                border-white/10
                bg-black
                px-4
                py-3
              "
            >
              <p className="text-sm font-medium text-white">
                {video.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   WATER PROJECTS

   RELATED PROJECT MEDIA = 9:16
   ============================================================ */

function RelatedWaterProjects({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const related = getWaterProjects().filter(
    (project) => project.slug !== currentSlug,
  );

  if (related.length === 0) {
    return null;
  }

  return (
    <Section>
      <SectionHeading
        eyebrow="Water Restoration"
        title="Other water projects"
        subtitle="Explore other KNFT water restoration initiatives."
      />

      <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((project) => {
          const images = findImages(
            project.mediaTerms,
          );

          const videos = findVideos(
            project.mediaTerms,
          );

          const image = images[0];
          const video = videos[0];

          return (
            <StaggerItem key={project.slug}>
              <article
                className="
                  surface-card
                  group
                  overflow-hidden
                  rounded-2xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lift
                "
              >
                {/* ==================================================
                    RELATED MEDIA

                    ALL = 9:16
                ================================================== */}

                {(image || video) && (
                  <div
                    className="
                      relative
                      flex
                      w-full
                      justify-center
                      overflow-hidden
                      bg-muted
                    "
                  >
                    <div className="aspect-[9/16] w-full">
                      {image ? (
                        <img
                          src={image}
                          alt={project.title}
                          className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-105
                          "
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <video
                          src={video}
                          className="
                            h-full
                            w-full
                            object-cover
                          "
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* ==================================================
                    CONTENT
                ================================================== */}

                <div className="p-5">
                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-primary
                    "
                  >
                    Water Restoration
                  </p>

                  <h3 className="mt-2 text-lg font-semibold">
                    {project.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      flex
                      items-center
                      gap-1.5
                      text-sm
                      text-muted-foreground
                    "
                  >
                    <MapPin className="h-4 w-4" />

                    {project.location}
                  </p>

                  <div className="mt-5">
                    <BtnLink
                      to="/projects/$slug"
                      params={{
                        slug: project.slug,
                      }}
                      variant="outline"
                      size="sm"
                    >
                      View Project

                      <ArrowRight className="h-4 w-4" />
                    </BtnLink>
                  </div>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}

/* ============================================================
   DETAIL PAGE
   ============================================================ */

function ProjectDetail() {
  const { slug } = Route.useParams();

  const project = getProject(slug);

  /* ==========================================================
     NOT FOUND
     ========================================================== */

  if (!project) {
    return (
      <>
        <PageHero
          eyebrow="Project"
          title="Project not found"
          subtitle="The requested KNFT project could not be found."
        />

        <Section>
          <BtnLink
            to="/our-work"
            variant="primary"
          >
            <ArrowLeft className="h-4 w-4" />

            Back to Our Work
          </BtnLink>
        </Section>
      </>
    );
  }

  /* ==========================================================
     PROJECT MEDIA
     ========================================================== */

  const images = findImages(
    project.mediaTerms,
  );

  const videos = findVideos(
    project.mediaTerms,
  );

  return (
    <>
      {/* ======================================================
          HERO
      ====================================================== */}

      <PageHero
        eyebrow={project.category}
        title={project.title}
        subtitle={project.overview}
      />

      {/* ======================================================
          MAIN PROJECT
      ====================================================== */}

      <Section>
        <div
          className="
            grid
            gap-10
            lg:grid-cols-[1.05fr_0.95fr]
            lg:items-start
          "
        >
          {/* ==================================================
              MEDIA
          ================================================== */}

          <Reveal>
            <ProjectMedia
              project={project}
              images={images}
              videos={videos}
            />

            {/* Photo count */}

            {images.length > 0 && (
              <p className="mt-3 text-sm text-muted-foreground">
                {images.length}{" "}
                {images.length === 1
                  ? "project photo"
                  : "project photos"}
              </p>
            )}
          </Reveal>

          {/* ==================================================
              BASIC INFO
          ================================================== */}

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              <span
                className="
                  rounded-full
                  bg-secondary
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-secondary-foreground
                "
              >
                {project.category}
              </span>

              <span
                className="
                  rounded-full
                  bg-secondary
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-secondary-foreground
                "
              >
                {project.status}
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-semibold leading-tight">
              {project.title}
            </h2>

            <p
              className="
                mt-4
                flex
                items-center
                gap-2
                text-sm
                text-muted-foreground
              "
            >
              <MapPin className="h-4 w-4" />

              {project.location}
            </p>

            {/* Highlights */}

            {project.highlights.length > 0 && (
              <ul className="mt-7 space-y-3">
                {project.highlights.map(
                  (highlight) => (
                    <li
                      key={highlight}
                      className="
                        flex
                        items-start
                        gap-3
                      "
                    >
                      <CheckCircle2
                        className="
                          mt-0.5
                          h-5
                          w-5
                          shrink-0
                          text-primary
                        "
                      />

                      <span className="text-sm leading-6">
                        {highlight}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            )}
          </Reveal>
        </div>
      </Section>

      {/* ======================================================
          DETAILS
      ====================================================== */}

      <Section tone="muted">
        <SectionHeading
          title="About this initiative"
          subtitle={project.overview}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="surface-card h-full rounded-2xl p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                The Challenge
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                What needs attention
              </h3>

              <p className="mt-4 leading-7 text-muted-foreground">
                {project.challenge}
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.05}>
            <article className="surface-card h-full rounded-2xl p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                Our Action
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                How the work happens
              </h3>

              <p className="mt-4 leading-7 text-muted-foreground">
                {project.action}
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="surface-card h-full rounded-2xl p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                Participation
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                People make it possible
              </h3>

              <p className="mt-4 leading-7 text-muted-foreground">
                {project.participation}
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.15}>
            <article className="surface-card h-full rounded-2xl p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                Impact
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                Why the work matters
              </h3>

              <p className="mt-4 leading-7 text-muted-foreground">
                {project.impact}
              </p>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* ======================================================
          LOCAL GALLERY

          ALL PHOTOS = 9:16
      ====================================================== */}

      {images.length > 0 && (
        <Section>
          <SectionHeading
            eyebrow="Gallery"
            title={`${project.title} — Photos`}
            subtitle="Only media belonging to this project is shown here."
          />

          <Stagger className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {images.map((image, index) => (
              <StaggerItem
                key={`${image}-${index}`}
              >
                <article className="group overflow-hidden rounded-2xl bg-muted">
                  <div className="aspect-[9/16] w-full">
                    <img
                      src={image}
                      alt={`${project.title} ${index + 1}`}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                      "
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      )}

      {/* ======================================================
          YOUTUBE

          ALL VIDEOS = 9:16
      ====================================================== */}

      <YouTubeSection project={project} />

      {/* ======================================================
          RELATED WATER PROJECTS
      ====================================================== */}

      {project.category === "Water Restoration" &&
        project.kind === "project" && (
          <RelatedWaterProjects
            currentSlug={project.slug}
          />
        )}

      {/* ======================================================
          BACK
      ====================================================== */}

      <Section tone="muted">
        <div className="flex flex-wrap gap-3">
          <BtnLink
            to="/our-work"
            variant="outline"
          >
            <ArrowLeft className="h-4 w-4" />

            Back to Our Work
          </BtnLink>

          {project.kind === "project" &&
            project.category ===
              "Water Restoration" && (
              <BtnLink
                to="/projects/$slug"
                params={{
                  slug: "water-restoration",
                }}
                variant="primary"
              >
                All Water Restoration

                <ArrowRight className="h-4 w-4" />
              </BtnLink>
            )}
        </div>
      </Section>
    </>
  );
}