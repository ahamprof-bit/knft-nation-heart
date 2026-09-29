import { createFileRoute } from "@tanstack/react-router";

import {
  ArrowRight,
  Droplets,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  Leaf,
  ShieldCheck,
  Trophy,
  Users,
  Utensils,
} from "lucide-react";

import { workAreas } from "@/data/projects";

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
   IMAGE + VIDEO LIBRARY
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

/* ============================================================
   MEDIA OBJECTS
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
   FIND IMAGES
   ============================================================ */

function findImages(terms: string[]) {
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
   FIND VIDEOS
   ============================================================ */

function findVideos(terms: string[]) {
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
   CATEGORY ICONS
   ============================================================ */

function CategoryIcon({
  slug,
}: {
  slug: string;
}) {
  const common = "h-5 w-5";

  switch (slug) {
    case "water-restoration":
      return <Droplets className={common} />;

    case "environment-biodiversity":
      return <Leaf className={common} />;

    case "disaster-relief-humanitarian-support":
      return <ShieldCheck className={common} />;

    case "blood-donation":
      return <HeartPulse className={common} />;

    case "poverty-hunger-support":
      return <Utensils className={common} />;

    case "youth-empowerment":
      return <Users className={common} />;

    case "education":
      return <GraduationCap className={common} />;

    case "sports-traditional-arts":
      return <Trophy className={common} />;

    case "community-development":
      return <HeartHandshake className={common} />;

    default:
      return <Leaf className={common} />;
  }
}

/* ============================================================
   MEDIA COMPONENT
   ============================================================

   IMPORTANT:
   - ALL IMAGES = 9:16
   - ALL VIDEOS = 16:9
   ============================================================ */

function ProgrammeMedia({
  image,
  video,
  title,
}: {
  image?: string;
  video?: string;
  title: string;
}) {
  /* ==========================================================
     IMAGE
     ALWAYS 9:16
     ========================================================== */

  if (image) {
    return (
      <div className="relative flex w-full justify-center overflow-hidden bg-muted">
        <div className="aspect-[9/16] w-full overflow-hidden">
          <img
            src={image}
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
        </div>
      </div>
    );
  }

  /* ==========================================================
     VIDEO
     ALWAYS 16:9
     ========================================================== */

  if (video) {
    return (
      <div className="relative w-full overflow-hidden bg-black">
        <div className="aspect-video w-full">
          <video
            src={video}
            className="h-full w-full object-contain"
            controls
            playsInline
            preload="metadata"
          />

          <span
            className="
              absolute
              right-3
              top-3
              rounded-full
              bg-black/70
              px-3
              py-1
              text-xs
              font-medium
              text-white
              backdrop-blur
            "
          >
            Video
          </span>
        </div>
      </div>
    );
  }

  return null;
}

/* ============================================================
   ROUTE
   ============================================================ */

export const Route = createFileRoute("/our-work")({
  head: () => ({
    meta: [
      {
        title:
          "Our Work — Programmes of Kalam Nation First Trust",
      },
      {
        name: "description",
        content:
          "Explore Kalam Nation First Trust programmes covering water restoration, environment, disaster relief, blood donation, education, youth, sports and community development.",
      },
      {
        property: "og:title",
        content: "Our Work — KNFT Programmes",
      },
      {
        property: "og:description",
        content:
          "Nine areas of community action led by Kalam Nation First Trust.",
      },
    ],
  }),

  component: OurWork,
});

/* ============================================================
   PAGE
   ============================================================ */

function OurWork() {
  return (
    <>
      {/* ======================================================
          HERO
      ====================================================== */}

      <PageHero
        eyebrow="Our Work"
        title="Programmes that put communities first"
        subtitle="Nine focus areas, one purpose — stronger people, healthier nature."
      />

      {/* ======================================================
          PROGRAMME CARDS
      ====================================================== */}

      <Section>
        <SectionHeading
          title="Focus areas"
          subtitle="Explore each KNFT programme using its own dedicated images, videos and content."
        />

        <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workAreas.map((area) => {
            const images = findImages(area.mediaTerms);
            const videos = findVideos(area.mediaTerms);

            const previewImage = images[0];
            const previewVideo = videos[0];

            return (
              <StaggerItem key={area.slug}>
                <article
                  className="
                    surface-card
                    group
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
                  {/* ==================================================
                      MEDIA
                  ================================================== */}

                  {(previewImage || previewVideo) && (
                    <ProgrammeMedia
                      image={previewImage}
                      video={previewVideo}
                      title={area.title}
                    />
                  )}

                  {/* ==================================================
                      MEDIA COUNT
                  ================================================== */}

                  {images.length > 0 && (
                    <div className="-mt-12 relative z-10 px-3">
                      <div className="flex justify-end">
                        <div
                          className="
                            rounded-full
                            bg-black/70
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            text-white
                            backdrop-blur-md
                          "
                        >
                          {images.length}{" "}
                          {images.length === 1
                            ? "photo"
                            : "photos"}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ==================================================
                      CONTENT
                  ================================================== */}

                  <div className="flex flex-1 flex-col p-6">
                    {/* Icon */}

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-secondary
                        text-primary
                      "
                    >
                      <CategoryIcon slug={area.slug} />
                    </div>

                    {/* Title */}

                    <h3 className="mt-4 text-xl font-semibold leading-tight">
                      {area.title}
                    </h3>

                    {/* Overview */}

                    <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                      {area.overview}
                    </p>

                    {/* ==================================================
                        HIGHLIGHTS
                    ================================================== */}

                    <div className="mt-5 flex flex-wrap gap-2">
                      {area.highlights.map((highlight) => (
                        <span
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
                        </span>
                      ))}
                    </div>

                    {/* ==================================================
                        BUTTON
                    ================================================== */}

                    <div className="mt-6">
                      <BtnLink
                        to="/projects/$slug"
                        params={{
                          slug: area.slug,
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Explore

                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </BtnLink>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* ======================================================
          WATER RESTORATION FEATURE
      ====================================================== */}

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-secondary
                text-primary
              "
            >
              <Droplets className="h-6 w-6" />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Featured Initiative
            </p>

            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Restoring water. Reviving communities.
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              Water restoration is one of KNFT&apos;s key areas of
              community action. Explore the individual lake and water
              restoration projects to see their respective media and
              documentation.
            </p>

            <div className="mt-7">
              <BtnLink
                to="/projects/$slug"
                params={{
                  slug: "water-restoration",
                }}
                variant="primary"
              >
                Explore Water Restoration

                <ArrowRight className="h-4 w-4" />
              </BtnLink>
            </div>
          </Reveal>

          {/* ======================================================
              WATER RESTORATION IMAGES
              ALL IMAGES = 9:16
          ====================================================== */}

          <Reveal
            delay={0.1}
            className="grid grid-cols-2 gap-4"
          >
            {findImages(["01 water restoration"])
              .slice(0, 4)
              .map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="
                    group
                    overflow-hidden
                    rounded-2xl
                  "
                >
                  <div className="aspect-[9/16] w-full">
                    <img
                      src={image}
                      alt={`KNFT water restoration ${index + 1}`}
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
                </div>
              ))}
          </Reveal>
        </div>
      </Section>

      {/* ======================================================
          CLOSING
      ====================================================== */}

      <Section tone="forest">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground/70">
              Together For Change
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-primary-foreground sm:text-4xl">
              Every programme starts with people.
            </h2>

            <p className="mt-4 text-primary-foreground/75">
              From environmental restoration to humanitarian support,
              KNFT works through community participation and volunteer
              action.
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}