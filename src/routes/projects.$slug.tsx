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

import { driveMedia } from "@/data/driveMedia";

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
   GOOGLE DRIVE MEDIA
   ============================================================

   IMPORTANT
   ----------
   Local import.meta.glob has been removed.

   All available project media comes from:
     src/data/driveMedia.ts

   MEDIA RATIO
   -----------
   Photos  -> 9:16
   Videos  -> 9:16
   YouTube -> 9:16

   IMPORTANT
   -----------
   We DO NOT reuse another project's image when a project
   does not have its own mapped Drive image.

   This prevents the same lake thumbnail appearing for:
   Kakuppam
   Koliyanur
   Murukkeri
   etc.

   ============================================================ */


/* ============================================================
   HELPERS
   ============================================================ */

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}


function unique(items: string[]) {
  return [...new Set(items.filter(Boolean))];
}


/* ============================================================
   WATER RESTORATION MEDIA
   ============================================================ */

/*
 * These are the water-restoration folders that are actually
 * mapped in driveMedia.ts.
 */

const aaduMalavanthangalImages =
  driveMedia.waterRestoration
    .aadurMalavanthangalLake ?? [];

const erumananthangalImages =
  driveMedia.waterRestoration
    .erumananthangalLake ?? [];

const muthampalayamImages =
  driveMedia.waterRestoration
    .muthampalayamLakes ?? [];

const inspectionImages =
  driveMedia.waterRestoration
    .inspectionPeoples ?? [];


/* ============================================================
   WATER VIDEOS
   ============================================================ */

const waterVideos = unique([
  driveMedia.waterRestoration
    .generalLakeHeroSectionVideoVertical,

  ...driveMedia.waterRestoration
    .heroSectionVideosToPlay,
]);


/* ============================================================
   CATEGORY MEDIA
   ============================================================ */

const categoryImages: Record<string, string[]> = {
  "water restoration": unique([
    ...aaduMalavanthangalImages,
    ...erumananthangalImages,
    ...muthampalayamImages,
    ...inspectionImages,
  ]),

  "environment biodiversity": unique([
    ...driveMedia.treePlantation,
  ]),

  "disaster relief": unique([
    ...driveMedia.disasterRelief,
  ]),

  "blood donation": unique([
    ...driveMedia.bloodDonation,
  ]),

  education: unique([
    ...driveMedia.education,
  ]),

  "sports traditional": unique([
    ...driveMedia.sports.malkhamb,
    ...driveMedia.sports.karate,
    ...driveMedia.sports.running,
  ]),

  "community development": unique([
    ...driveMedia.projectAndImpact,
  ]),

  "career support": unique([
    ...driveMedia.careerSupport,
  ]),

  "tree plantation": unique([
    ...driveMedia.treePlantation,
  ]),
};


/* ============================================================
   FIND PROJECT IMAGES
   ============================================================ */

/*
 * IMPORTANT
 * ----------
 * This function intentionally uses PROJECT-SPECIFIC matching.
 *
 * We do NOT do:
 *
 *   if water -> return all waterImages
 *
 * because that causes:
 *
 * Kakuppam
 * Koliyanur
 * Murukkeri
 *
 * to display the same unrelated thumbnail.
 */

function findImages(terms: string[]): string[] {
  if (!terms.length) {
    return [];
  }

  const normalized = terms
    .map(normalizeText)
    .join(" ");


  /* ==========================================================
     AADUR MALAVANTHANGAL
     ========================================================== */

  if (
    normalized.includes("aadur") ||
    normalized.includes("malavanthangal")
  ) {
    return unique(
      aaduMalavanthangalImages,
    );
  }


  /* ==========================================================
     ERUMANANTHANGAL
     ========================================================== */

  if (
    normalized.includes("erumananthangal")
  ) {
    return unique(
      erumananthangalImages,
    );
  }


  /* ==========================================================
     MUTHAMPALAYAM
     ========================================================== */

  if (
    normalized.includes("muthampalayam")
  ) {
    return unique(
      muthampalayamImages,
    );
  }


  /* ==========================================================
     KAKUPPAM
     ========================================================== */

  if (
    normalized.includes("kakuppam")
  ) {
    /*
     * No separate Kakuppam Drive folder is currently mapped.
     *
     * IMPORTANT:
     * Do NOT return generic waterImages here.
     *
     * This prevents an unrelated lake thumbnail from appearing.
     */

    return [];
  }


  /* ==========================================================
     KOLIYANUR
     ========================================================== */

  if (
    normalized.includes("koliyanur")
  ) {
    /*
     * No separate Koliyanur Drive folder is currently mapped.
     */

    return [];
  }


  /* ==========================================================
     MURUKKERI
     ========================================================== */

  if (
    normalized.includes("murukkeri")
  ) {
    /*
     * No separate Murukkeri Drive folder is currently mapped.
     */

    return [];
  }


  /* ==========================================================
     TINDIVANAM THULKAR KULAM
     ========================================================== */

  if (
    normalized.includes("tindivanam") ||
    normalized.includes("thulkar") ||
    normalized.includes("kulam")
  ) {
    return [];
  }


  /* ==========================================================
     NANTHAN KAALVAAI
     ========================================================== */

  if (
    normalized.includes("nanthan") ||
    normalized.includes("kaalvaai")
  ) {
    return [];
  }


  /* ==========================================================
     ENVIRONMENT / BIODIVERSITY
     ========================================================== */

  if (
    normalized.includes("environment") ||
    normalized.includes("biodiversity") ||
    normalized.includes("nature") ||
    normalized.includes("forest")
  ) {
    return unique(
      categoryImages[
        "environment biodiversity"
      ] ?? [],
    );
  }


  /* ==========================================================
     TREE PLANTATION
     ========================================================== */

  if (
    normalized.includes("tree plantation") ||
    normalized.includes("tree planting") ||
    normalized.includes("plantation")
  ) {
    return unique(
      categoryImages[
        "tree plantation"
      ] ?? [],
    );
  }


  /* ==========================================================
     DISASTER RELIEF
     ========================================================== */

  if (
    normalized.includes("disaster") ||
    normalized.includes("relief") ||
    normalized.includes("humanitarian") ||
    normalized.includes("flood") ||
    normalized.includes("emergency")
  ) {
    return unique(
      categoryImages[
        "disaster relief"
      ] ?? [],
    );
  }


  /* ==========================================================
     BLOOD DONATION
     ========================================================== */

  if (
    normalized.includes("blood") ||
    normalized.includes("donation")
  ) {
    return unique(
      categoryImages[
        "blood donation"
      ] ?? [],
    );
  }


  /* ==========================================================
     EDUCATION
     ========================================================== */

  if (
    normalized.includes("education") ||
    normalized.includes("school") ||
    normalized.includes("student") ||
    normalized.includes("learning")
  ) {
    return unique(
      categoryImages.education ?? [],
    );
  }


  /* ==========================================================
     SPORTS
     ========================================================== */

  if (
    normalized.includes("sport") ||
    normalized.includes("traditional") ||
    normalized.includes("malkhamb") ||
    normalized.includes("mallakhamb") ||
    normalized.includes("karate") ||
    normalized.includes("running")
  ) {
    return unique(
      categoryImages[
        "sports traditional"
      ] ?? [],
    );
  }


  /* ==========================================================
     COMMUNITY DEVELOPMENT
     ========================================================== */

  if (
    normalized.includes("community") ||
    normalized.includes("development") ||
    normalized.includes("rural")
  ) {
    return unique(
      categoryImages[
        "community development"
      ] ?? [],
    );
  }


  /* ==========================================================
     CAREER SUPPORT
     ========================================================== */

  if (
    normalized.includes("career") ||
    normalized.includes("employment") ||
    normalized.includes("job") ||
    normalized.includes("skill")
  ) {
    return unique(
      categoryImages[
        "career support"
      ] ?? [],
    );
  }


  /* ==========================================================
     NO MATCH
     ========================================================== */

  return [];
}


/* ============================================================
   FIND PROJECT VIDEOS
   ============================================================ */

/*
 * IMPORTANT
 * ----------
 * Videos are also project-specific.
 *
 * We do NOT display the same water video on every lake page.
 */

function findVideos(terms: string[]): string[] {
  if (!terms.length) {
    return [];
  }

  const normalized = terms
    .map(normalizeText)
    .join(" ");


  /* ==========================================================
     AADUR MALAVANTHANGAL
     ========================================================== */

  if (
    normalized.includes("aadur") ||
    normalized.includes("malavanthangal")
  ) {
    return unique(
      waterVideos,
    );
  }


  /*
   * At the moment there is no confirmed project-specific
   * Drive video mapping for the other lake projects.
   *
   * Returning [] prevents unrelated videos from appearing.
   */

  return [];
}


/* ============================================================
   ROUTE
   ============================================================ */

export const Route = createFileRoute(
  "/projects/$slug",
)({
  head: ({ params }) => {
    const project = getProject(
      params.slug,
    );

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
   ============================================================ */

/*
 * PRIORITY
 *
 * 1. Project-specific Google Drive video
 * 2. Project-specific Google Drive image
 * 3. Project-specific YouTube video
 *
 * NO WRONG MEDIA FALLBACK
 */

function ProjectMedia({
  project,
  images,
  videos,
}: {
  project: Project;
  images: string[];
  videos: string[];
}) {
  const projectVideo =
    videos[0];

  const projectImage =
    images[0];


  /* ==========================================================
     1. GOOGLE DRIVE PROJECT VIDEO
     ========================================================== */

  if (projectVideo) {
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
            src={projectVideo}
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
     2. GOOGLE DRIVE PROJECT IMAGE
     ========================================================== */

  if (projectImage) {
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
            src={projectImage}
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
     ========================================================== */

  const youtube =
    project.youtubeVideos?.[0];


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


  /* ==========================================================
     NO MEDIA
     ========================================================== */

  return (
    <div
      className="
        flex
        aspect-[9/16]
        w-full
        items-center
        justify-center
        rounded-3xl
        bg-muted
        p-8
        text-center
      "
    >
      <div>
        <p className="text-sm font-semibold text-primary">
          Project Media
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Media for this project will be added when its
          dedicated Drive folder is mapped.
        </p>
      </div>
    </div>
  );
}


/* ============================================================
   YOUTUBE SECTION
   ============================================================ */

function YouTubeSection({
  project,
}: {
  project: Project;
}) {
  const videos =
    project.youtubeVideos ?? [];


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

      <div
        className="
          mt-10
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
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
   RELATED WATER PROJECTS
   ============================================================ */

function RelatedWaterProjects({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const related =
    getWaterProjects().filter(
      (project) =>
        project.slug !== currentSlug,
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

      <Stagger
        className="
          mt-10
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {related.map((project) => {
          const images =
            findImages(
              project.mediaTerms,
            );

          const videos =
            findVideos(
              project.mediaTerms,
            );

          const image =
            images[0];

          const video =
            videos[0];


          return (
            <StaggerItem
              key={project.slug}
            >
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
                    MEDIA
                ================================================== */}

                {image ? (
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
                    </div>
                  </div>
                ) : video ? (
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
                    </div>
                  </div>
                ) : null}


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
  const { slug } =
    Route.useParams();


  const project =
    getProject(slug);


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

  const images =
    findImages(
      project.mediaTerms,
    );


  const videos =
    findVideos(
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


            <h2
              className="
                mt-5
                text-3xl
                font-semibold
                leading-tight
              "
            >
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


            {/* ==================================================
                HIGHLIGHTS
            ================================================== */}

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

              <p
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-primary
                "
              >
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

              <p
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-primary
                "
              >
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

              <p
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-primary
                "
              >
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

              <p
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-primary
                "
              >
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
          PROJECT GALLERY

          IMPORTANT
          ----------
          First image = main project image.

          Gallery starts from image #2.
          This prevents duplicate first image.
      ====================================================== */}

      {images.length > 1 && (
        <Section>

          <SectionHeading
            eyebrow="Gallery"
            title={`${project.title} — Photos`}
            subtitle="Only media belonging to this project is shown here."
          />


          <Stagger
            className="
              mt-10
              grid
              grid-cols-2
              gap-4
              md:grid-cols-3
              lg:grid-cols-4
            "
          >

            {images
              .slice(1)
              .map(
                (image, index) => (
                  <StaggerItem
                    key={`${image}-${index}`}
                  >
                    <article
                      className="
                        group
                        overflow-hidden
                        rounded-2xl
                        bg-muted
                      "
                    >

                      <div className="aspect-[9/16] w-full">

                        <img
                          src={image}
                          alt={`${project.title} ${
                            index + 2
                          }`}
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
                ),
              )}

          </Stagger>

        </Section>
      )}


      {/* ======================================================
          YOUTUBE
      ====================================================== */}

      <YouTubeSection
        project={project}
      />


      {/* ======================================================
          RELATED WATER PROJECTS
      ====================================================== */}

      {project.category ===
        "Water Restoration" &&
        project.kind === "project" && (
          <RelatedWaterProjects
            currentSlug={
              project.slug
            }
          />
        )}


      {/* ======================================================
          BACK / NAVIGATION
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