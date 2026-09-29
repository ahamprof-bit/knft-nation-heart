import { createFileRoute } from "@tanstack/react-router";

import {
  ArrowRight,
  MapPin,
  Play,
} from "lucide-react";

import { projects } from "@/data/projects";

import {
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
   PROJECT / CATEGORY ASSETS

   All images and videos are loaded from:
   src/assets/

   IMPORTANT:
   Each project/category uses ONLY its own mediaTerms
   from @/data/projects.ts.

   MEDIA FORMAT:
   - Local photos  -> 9:16
   - Local videos  -> 9:16
   - YouTube videos -> 9:16
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
   HELPERS
   ============================================================ */

function normalizePath(path: string) {
  return path
    .toLowerCase()
    .replace(/\\/g, "/")
    .replace(/\s+/g, " ");
}

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
   FIND IMAGES FOR THIS PROJECT / CATEGORY
   ============================================================ */

function findImages(keywords: string[]) {
  if (!keywords?.length) {
    return [];
  }

  const normalizedKeywords = keywords.map(
    (keyword) => normalizePath(keyword),
  );

  return unique(
    allImages
      .filter(({ path }) =>
        normalizedKeywords.some((keyword) =>
          path.includes(keyword),
        ),
      )
      .map(({ src }) => src),
  );
}

/* ============================================================
   FIND VIDEOS FOR THIS PROJECT / CATEGORY
   ============================================================ */

function findVideos(keywords: string[]) {
  if (!keywords?.length) {
    return [];
  }

  const normalizedKeywords = keywords.map(
    (keyword) => normalizePath(keyword),
  );

  return unique(
    allVideos
      .filter(({ path }) =>
        normalizedKeywords.some((keyword) =>
          path.includes(keyword),
        ),
      )
      .map(({ src }) => src),
  );
}

/* ============================================================
   YOUTUBE MEDIA
   ============================================================ */

type YouTubeMedia = {
  id: string;
  title?: string;
};

/* ============================================================
   ROUTE
   ============================================================ */

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      {
        title:
          "Projects — Kalam Nation First Trust",
      },
      {
        name: "description",
        content:
          "Explore Kalam Nation First Trust projects and community initiatives across water restoration, environment, disaster relief, blood donation, education, youth empowerment, sports and community development.",
      },
      {
        property: "og:title",
        content:
          "KNFT Projects — Kalam Nation First Trust",
      },
      {
        property: "og:description",
        content:
          "Explore KNFT projects and community initiatives.",
      },
    ],
  }),

  component: ProjectsIndex,
});

/* ============================================================
   YOUTUBE MEDIA CARD

   ALL YOUTUBE VIDEOS = 9:16
   ============================================================ */

function YouTubeMediaCard({
  media,
  title,
}: {
  media: YouTubeMedia;
  title: string;
}) {
  return (
    <div
      className="
        relative
        flex
        w-full
        justify-center
        overflow-hidden
        bg-black
      "
    >
      <div className="aspect-[9/16] w-full">
        <iframe
          src={`https://www.youtube.com/embed/${media.id}`}
          title={
            media.title ||
            `${title} project video`
          }
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
            shadow-lg
            backdrop-blur-md
          "
        >
          <Play
            className="
              h-3.5
              w-3.5
              fill-current
            "
            aria-hidden
          />

          YouTube Video
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PROJECT CARD MEDIA

   PRIORITY:

   1. Local project video
   2. Local project image
   3. Project-specific YouTube

   FORMAT:

   ALL MEDIA = 9:16

   NEVER:

   Project A -> Project B image
   Project A -> Project B video
   ============================================================ */

function ProjectCardMedia({
  title,
  mediaTerms,
  youtube,
}: {
  projectSlug: string;
  title: string;
  mediaTerms: string[];
  youtube?: YouTubeMedia[];
}) {
  const images = findImages(mediaTerms);
  const videos = findVideos(mediaTerms);

  const localVideo = videos[0];
  const localImage = images[0];
  const youtubeVideo = youtube?.[0];

  /* ==========================================================
     1. LOCAL VIDEO

     9:16
     ========================================================== */

  if (localVideo) {
    return (
      <div
        className="
          relative
          flex
          w-full
          justify-center
          overflow-hidden
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
              transition-transform
              duration-700
              group-hover:scale-105
            "
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={localImage}
            aria-label={`${title} project video`}
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/60
              via-black/10
              to-transparent
            "
          />

          <div
            className="
              absolute
              bottom-4
              left-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/20
              bg-black/50
              px-3
              py-1.5
              text-xs
              font-medium
              text-white
              shadow-lg
              backdrop-blur-md
            "
          >
            <Play
              className="
                h-3.5
                w-3.5
                fill-current
              "
              aria-hidden
            />

            Project Video
          </div>
        </div>
      </div>
    );
  }

  /* ==========================================================
     2. LOCAL IMAGE

     9:16
     ========================================================== */

  if (localImage) {
    return (
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
          <img
            src={localImage}
            alt={title}
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

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/50
              via-transparent
              to-transparent
            "
          />

          {/* Photo count */}

          {images.length > 1 && (
            <div
              className="
                absolute
                right-4
                top-4
                rounded-full
                bg-black/60
                px-3
                py-1.5
                text-xs
                font-medium
                text-white
                backdrop-blur-md
              "
            >
              {images.length} photos
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ==========================================================
     3. PROJECT-SPECIFIC YOUTUBE

     9:16
     ========================================================== */

  if (youtubeVideo) {
    return (
      <YouTubeMediaCard
        media={youtubeVideo}
        title={title}
      />
    );
  }

  /* ==========================================================
     4. NO MEDIA

     No placeholder.
     ========================================================== */

  return null;
}

/* ============================================================
   PROJECT CARD
   ============================================================ */

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const youtube = project.youtubeVideos?.map(
    (video) => ({
      id: video.id,
      title: video.title,
    }),
  );

  const hasImages =
    findImages(project.mediaTerms).length > 0;

  const hasVideos =
    findVideos(project.mediaTerms).length > 0;

  const hasYouTube =
    (youtube?.length ?? 0) > 0;

  const hasMedia =
    hasImages ||
    hasVideos ||
    hasYouTube;

  return (
    <article
      className="
        group
        surface-card
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-lift
      "
    >
      {/* ======================================================
          MEDIA

          Only render media area if project has media.
      ====================================================== */}

      {hasMedia && (
        <ProjectCardMedia
          projectSlug={project.slug}
          title={project.title}
          mediaTerms={project.mediaTerms}
          youtube={youtube}
        />
      )}

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          flex
          flex-1
          flex-col
          p-6
        "
      >
        {/* Category */}

        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.16em]
            text-emerald
          "
        >
          {project.category}
        </p>

        {/* Title */}

        <h3
          className="
            mt-2
            text-xl
            font-semibold
            leading-tight
          "
        >
          {project.title}
        </h3>

        {/* Location */}

        <p
          className="
            mt-3
            inline-flex
            items-center
            gap-1.5
            text-sm
            text-muted-foreground
          "
        >
          <MapPin
            className="h-4 w-4"
            aria-hidden
          />

          {project.location}
        </p>

        {/* ==================================================
            HIGHLIGHTS
        ================================================== */}

        {project.highlights?.length > 0 && (
          <ul
            className="
              mt-4
              flex
              flex-wrap
              gap-2
            "
          >
            {project.highlights.map(
              (highlight) => (
                <li
                  key={highlight}
                  className="
                    rounded-full
                    bg-secondary
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-secondary-foreground
                  "
                >
                  {highlight}
                </li>
              ),
            )}
          </ul>
        )}

        {/* ==================================================
            DESCRIPTION
        ================================================== */}

        <p
          className="
            mt-4
            line-clamp-3
            text-sm
            leading-6
            text-muted-foreground
          "
        >
          {project.overview}
        </p>

        {/* ==================================================
            VIEW PROJECT
        ================================================== */}

        <div
          className="
            mt-auto
            pt-6
          "
        >
          <BtnLink
            to="/projects/$slug"
            params={{
              slug: project.slug,
            }}
            variant="outline"
            size="sm"
          >
            View Project

            <ArrowRight
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </BtnLink>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   PROJECTS PAGE
   ============================================================ */

function ProjectsIndex() {
  return (
    <>
      {/* ======================================================
          PAGE HERO
      ====================================================== */}

      <PageHero
        eyebrow="Projects"
        title="Work that changes landscapes and lives"
        subtitle="Explore KNFT programmes and individual community projects, each with its own relevant media and documentation."
      />

      {/* ======================================================
          ALL PROJECTS
      ====================================================== */}

      <Section>
        <SectionHeading
          title="All projects"
          subtitle="Explore water restoration, environment, humanitarian support, blood donation, education, youth, sports and community initiatives."
        />

        <Stagger
          className="
            mt-10
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ======================================================
          MEDIA RULE
      ====================================================== */}

      <Section tone="muted">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.16em]
              text-primary
            "
          >
            KNFT Media
          </p>

          <h2
            className="
              mt-3
              text-2xl
              font-semibold
              sm:text-3xl
            "
          >
            Every project shows its own story.
          </h2>

          <p
            className="
              mt-4
              leading-7
              text-muted-foreground
            "
          >
            Local photos, videos and project-specific
            YouTube media are shown only for the
            corresponding programme or project.
          </p>
        </div>
      </Section>
    </>
  );
}