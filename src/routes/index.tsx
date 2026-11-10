
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import { ArrowRight, Heart, Leaf, Quote, Users } from "lucide-react";
import KNFTIntro from "@/components/intro/KNFTIntro";
import { siteConfig } from "@/data/siteConfig";
import { organisation } from "@/data/organisation";
import { programmes } from "@/data/programmes";
import { projects } from "@/data/projects";
import {
  impactStats,
  waterBodiesHeadline,
  IMPACT_LAST_UPDATED,
} from "@/data/impact";
import { driveMedia } from "@/data/driveMedia";

import {
  Counter,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/motion-primitives";

import {
  BtnLink,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui-kit";

/* ============================================================
   SAFE DRIVE IMAGE
   ============================================================ */

type SafeImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  sources?: string[];
};

function SafeImage({
  src,
  sources = [],
  alt = "",
  onError,
  ...props
}: SafeImageProps) {
  const candidates = [src, ...sources].filter(
    (value, index, list): value is string =>
      Boolean(value) && list.indexOf(value) === index,
  );

  const [sourceIndex, setSourceIndex] = useState(0);

  const currentSrc = candidates[sourceIndex];

  if (!currentSrc) {
    return null;
  }

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      onError={(event) => {
        onError?.(event);

        setSourceIndex((current) => {
          const next = current + 1;
          return next < candidates.length ? next : candidates.length;
        });
      }}
    />
  );
}

/* ============================================================
   SLOW IMPACT COUNTER
   ============================================================ */

function SlowCounter({
  target,
  duration = 12000,
}: {
  target: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    let animationFrame = 0;
    let startTime: number | null = null;
    let hasStarted = false;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCount(Math.floor(target * progress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          hasStarted = true;
          observer.disconnect();
          animationFrame = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [target, duration]);

  return <span ref={counterRef}>{count.toLocaleString("en-IN")}</span>;
}

/* ============================================================
   DRIVE MEDIA GROUPS
   ============================================================ */

const waterImages = [
  ...driveMedia.waterRestoration.aadurMalavanthangalLake,
  ...driveMedia.waterRestoration.erumananthangalLake,
  ...driveMedia.waterRestoration.inspectionPeoples,
  ...driveMedia.waterRestoration.muthampalayamLakes,
];

const waterVideos = [
  driveMedia.waterRestoration.generalLakeHeroSectionVideoVertical,
  ...driveMedia.waterRestoration.heroSectionVideosToPlay,
].filter(Boolean);

const homeCategoryMedia: Record<string, string[]> = {
  "water restoration": waterImages,
  "environment biodiversity": driveMedia.treePlantation,
  "disaster relief": driveMedia.disasterRelief,
  "blood donation": driveMedia.bloodDonation,
  "youth empowerment": driveMedia.projectAndImpact,
  education: driveMedia.education,
  "sports traditional": [
    ...driveMedia.sports.karate,
    ...driveMedia.sports.malkhamb,
    ...driveMedia.sports.running,
  ],
  "community development": driveMedia.projectAndImpact,
  "career support": driveMedia.careerSupport,
  "tree plantation": driveMedia.treePlantation,
};

/* ============================================================
   CATEGORY MEDIA RESOLVER
   ============================================================ */

function getCategoryImages(categoryTitle: string): string[] {
  const value = categoryTitle.toLowerCase();

  if (
    value.includes("water") ||
    value.includes("lake") ||
    value.includes("pond") ||
    value.includes("restoration")
  ) {
    return homeCategoryMedia["water restoration"];
  }

  if (
    value.includes("environment") ||
    value.includes("biodiversity") ||
    value.includes("nature")
  ) {
    return homeCategoryMedia["environment biodiversity"];
  }

  if (
    value.includes("disaster") ||
    value.includes("relief") ||
    value.includes("humanitarian")
  ) {
    return homeCategoryMedia["disaster relief"];
  }

  if (value.includes("blood") || value.includes("donation")) {
    return homeCategoryMedia["blood donation"];
  }

  if (
    value.includes("youth") ||
    value.includes("empowerment") ||
    value.includes("leadership")
  ) {
    return homeCategoryMedia["youth empowerment"];
  }

  if (
    value.includes("education") ||
    value.includes("school") ||
    value.includes("student") ||
    value.includes("learning")
  ) {
    return homeCategoryMedia.education;
  }

  if (
    value.includes("sports") ||
    value.includes("traditional") ||
    value.includes("malkhamb") ||
    value.includes("mallakhamb") ||
    value.includes("karate") ||
    value.includes("running")
  ) {
    return homeCategoryMedia["sports traditional"];
  }

  if (
    value.includes("community") ||
    value.includes("development") ||
    value.includes("rural")
  ) {
    return homeCategoryMedia["community development"];
  }

  if (
    value.includes("career") ||
    value.includes("employment") ||
    value.includes("job") ||
    value.includes("skill")
  ) {
    return homeCategoryMedia["career support"];
  }

  if (
    value.includes("tree") ||
    value.includes("plantation") ||
    value.includes("planting")
  ) {
    return homeCategoryMedia["tree plantation"];
  }

  return [];
}

/* ============================================================
   FEATURED PROJECT MEDIA RESOLVER
   ============================================================ */

function getProjectImages(project: {
  slug?: string;
  title?: string;
}): string[] {
  const value =
    `${project.slug ?? ""} ${project.title ?? ""}`.toLowerCase();

  if (value.includes("muthampalayam")) {
    return driveMedia.waterRestoration.muthampalayamLakes;
  }

  if (
    value.includes("koliyanur") ||
    value.includes("lake") ||
    value.includes("water") ||
    value.includes("restoration")
  ) {
    return waterImages;
  }

  if (
    value.includes("nursery") ||
    value.includes("tree") ||
    value.includes("plant")
  ) {
    return driveMedia.treePlantation;
  }

  if (
    value.includes("plastic") ||
    value.includes("environment") ||
    value.includes("biodiversity")
  ) {
    return driveMedia.projectAndImpact;
  }

  return driveMedia.projectAndImpact;
}

/* ============================================================
   DIRECT DRIVE HOME IMAGES
   ============================================================ */

const heroDriveImage =
  "https://drive.google.com/thumbnail?id=1IJW-5hpOnUtJ4mxn9NAKzvHpgZt0cSq_&sz=w2000";

const collectorLakeImages = [
  "https://drive.google.com/thumbnail?id=1gepyGtSwoQZdHgky4_wSKYZmJdE-DYgv&sz=w1600",
  "https://drive.google.com/thumbnail?id=15mVnPPFQUOaimeHxiKTLjDAwSLMZM7Gw&sz=w1600",
  "https://drive.google.com/thumbnail?id=1hmdGWXcJREs2EpmpWv_Ld-kgOhcaAtZu&sz=w1600",
  "https://drive.google.com/thumbnail?id=1BdgKv85rIOfvFVaMyu8T9iiDLltIQUCb&sz=w1600",
  "https://drive.google.com/thumbnail?id=1sH_wh0zZXPGm1-xOrbEYvLGh_5YLIZhe&sz=w1600",
];

const heroImage = heroDriveImage;

const aboutImage1 =
  driveMedia.gallery[1] ??
  driveMedia.projectAndImpact[0] ??
  heroImage;

const aboutImage2 =
  driveMedia.gallery[2] ??
  driveMedia.projectAndImpact[1] ??
  aboutImage1;

const resolvedWaterImages = waterImages;

/* ============================================================
   LAKE RESTORATION PROJECTS
   ============================================================ */

const lakeProjects = [
  {
    name: "Aadur Malavanthangal Lake",
    description:
      "Water restoration and community-focused conservation work supporting the revival and protection of the lake ecosystem.",
    images: driveMedia.waterRestoration.aadurMalavanthangalLake,
    videos: waterVideos,
  },
  {
    name: "Erumananthangal Lake",
    description:
      "Field activities, inspections and restoration efforts focused on improving the condition of the lake and strengthening community participation.",
    images: driveMedia.waterRestoration.erumananthangalLake,
    videos: waterVideos,
  },
  {
    name: "Kakuppam Lake",
    description:
      "Community-driven lake restoration activities focused on improving the water body and creating a healthier environment for surrounding communities.",
    images: waterImages,
    videos: waterVideos,
  },
  {
    name: "Koliyanur Lake",
    description:
      "A continuing water restoration initiative supported by field activities, before-and-after documentation and community participation.",
    images: waterImages,
    videos: waterVideos,
  },
  {
    name: "Murukkeri Lake",
    description:
      "Water body restoration and field documentation around Murukkeri, including aerial project documentation and restoration activities.",
    images: waterImages,
    videos: waterVideos,
  },
  {
    name: "Muthampalayam Lake",
    description:
      "Lake restoration activities supported by ground documentation, photography and aerial project footage.",
    images: driveMedia.waterRestoration.muthampalayamLakes,
    videos: waterVideos,
  },
  {
    name: "Tindivanam Thulkar Kulam",
    description:
      "Water restoration work and community activity around Tindivanam Thulkar Kulam.",
    images: waterImages,
    videos: waterVideos,
  },
  {
    name: "Nanthan Kaalvaai Scheme",
    description:
      "Water-related field activity documented as part of the KNFT restoration initiatives.",
    images: waterImages,
    videos: waterVideos,
  },
];

const resolvedLakeProjects = lakeProjects;

/* ============================================================
   VERIFIED HOMEPAGE DATA
   ============================================================ */

const projectStatuses = [
  "Assessment",
  "Planned",
  "In Progress",
  "Completed",
  "Maintenance / Monitoring",
];

const villupuramProgramme = [
  { count: "7", label: "Lakes" },
  { count: "5", label: "Water conveyance / feeder channels" },
  { count: "3", label: "Ponds" },
];

const isWaterStat = (label: string) =>
  /water|lake|pond/i.test(label);

const verifiedImpactStats = impactStats.filter(
  (stat) =>
    typeof stat.value === "number" &&
    stat.value > 0 &&
    !isWaterStat(stat.label) &&
    !/sapling|tree planted/i.test(stat.label),
);

type ReachRegion = {
  name: string;
  type: "State" | "Union Territory";
  status: "Confirmed" | "Planned";
  note: string;
};

const reachRegions: ReachRegion[] = [
  {
    name: "Tamil Nadu",
    type: "State",
    status: "Confirmed",
    note: "Documented field work. Project records are listed on the Our Work pages.",
  },
  {
    name: "Puducherry",
    type: "Union Territory",
    status: "Confirmed",
    note: "Documented field work. Project records are listed on the Our Work pages.",
  },
];

/* ============================================================
   ROUTE
   ============================================================ */

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Kalam Nation First Trust — Nation First. Humanity Always.",
      },
      {
        name: "description",
        content:
          "Kalam Nation First Trust works with communities to restore nature, support people, empower youth and create meaningful social impact.",
      },
      {
        property: "og:title",
        content:
          "Kalam Nation First Trust — Nation First. Humanity Always.",
      },
      {
        property: "og:description",
        content:
          "Community-driven action for people, nature and a stronger future.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://kalamnationfirsttrust.com/",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://kalamnationfirsttrust.com/",
      },
    ],
  }),

  component: Home,
});

/* ============================================================
   HOME
   ============================================================ */

function Home() {
  const [showIntro, setShowIntro] = useState(true);

  /* ==========================================================
     PROGRAMMES
     ========================================================== */

  const programmeImageMap = programmes
    .filter((programme) => {
      const value =
        `${programme.slug} ${programme.title}`.toLowerCase();

      return (
        !value.includes("poverty") &&
        !value.includes("hunger")
      );
    })
    .map((programme) => {
      const images = getCategoryImages(programme.title);

      return {
        ...programme,
        resolvedImage: images[0] ?? "",
        categoryImages: images,
      };
    });

  /* ==========================================================
     FEATURED PROJECT IMAGES
     ========================================================== */

  const featuredProjectMedia = projects.map((project) => ({
    project,
    images: getProjectImages(project),
  }));

  /* ==========================================================
     COMMUNITY CATEGORIES
     ========================================================== */

  const communityCategories = [
    "Water Restoration",
    "Environment & Biodiversity",
    "Disaster Relief & Humanitarian Support",
    "Blood Donation",
    "Youth Empowerment",
    "Education",
    "Sports & Traditional Arts",
    "Community Development",
    "Career Support",
  ];

  /* ==========================================================
     COMMUNITY IMAGE DATA
     ========================================================== */

  const communitySections = communityCategories
    .map((category) => ({
      category,
      images: getCategoryImages(category),
    }))
    .filter((item) => item.images.length > 0);

  /* ==========================================================
     HOME GALLERY
     ========================================================== */

  const galleryImages = [
    ...resolvedWaterImages.slice(0, 6).map((image, index) => ({
      image,
      alt: `KNFT water restoration field activity ${index + 1}`,
    })),

    ...resolvedLakeProjects
      .filter((lake) => lake.images !== waterImages)
      .flatMap((lake) =>
        lake.images.slice(0, 2).map((image, index) => ({
          image,
          alt: `${lake.name} restoration activity ${index + 1}`,
        })),
      ),
  ].filter(
    (
      item,
    ): item is {
      image: string;
      alt: string;
    } => Boolean(item.image),
  );

  return (
    <>
      {/* INTRO — videos are managed inside KNFTIntro.tsx */}
      {showIntro && (
        <KNFTIntro onComplete={() => setShowIntro(false)} />
      )}

      {/* ====================================================
          HERO
      ==================================================== */}

      <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground">
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald/20 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <Container className="relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
          <Reveal>
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md">
              Volunteer-led origin · 2012
            </span>

            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              {siteConfig.name}
            </h1>

            <p className="mt-5 max-w-2xl font-display text-xl text-primary-foreground/90 sm:text-2xl">
              Restoring Water. Protecting Nature. Empowering Communities.
            </p>

            <p className="mt-6 max-w-xl text-base leading-8 text-primary-foreground/75 sm:text-lg">
              {siteConfig.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <BtnLink
                to="/donate"
                variant="emerald"
                size="lg"
              >
                Support Our Mission
                <Heart className="h-4 w-4" />
              </BtnLink>

              <BtnLink
                to="/our-work"
                variant="ghostLight"
                size="lg"
              >
                Explore Our Work
                <ArrowRight className="h-4 w-4" />
              </BtnLink>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-xs text-primary-foreground/65">
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Volunteer-led
              </span>

              <span className="flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                Community-driven
              </span>

              <span className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Humanity-first
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-white/10 blur-xl" />

              <div className="group relative overflow-hidden rounded-[2rem] border border-white/15 bg-black/10 shadow-2xl">
                <SafeImage
                  src={heroImage}
                  sources={[
                    heroDriveImage,
                    ...driveMedia.gallery,
                    ...waterImages,
                  ]}
                  alt="KNFT volunteers and community members at a water restoration site"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-1000 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  fetchPriority="high"
                  decoding="async"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">
                  <div className="rounded-2xl border border-white/15 bg-black/30 p-4 backdrop-blur-xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                      Our belief
                    </p>

                    <p className="mt-2 font-display text-lg font-semibold text-white">
                      {organisation.coreBelief.english}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ====================================================
          WHO WE ARE
      ==================================================== */}

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <Eyebrow>Who We Are</Eyebrow>

            <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight sm:text-5xl">
              Building communities.
              Restoring nature.
              Empowering people.
            </h2>

            <div className="mt-7 space-y-5 text-muted-foreground">
              {organisation.story
                .slice(0, 2)
                .map((paragraph) => (
                  <p
                    key={paragraph}
                    className="leading-8"
                  >
                    {paragraph}
                  </p>
                ))}
            </div>

            <div className="mt-8">
              <BtnLink
                to="/about"
                variant="primary"
              >
                Discover Our Story
                <ArrowRight className="h-4 w-4" />
              </BtnLink>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-[2rem]">
                <SafeImage
                  src={aboutImage1}
                  sources={[
                    ...driveMedia.projectAndImpact,
                    ...driveMedia.gallery,
                  ]}
                  alt="KNFT volunteers and community members at a field activity"
                  className="aspect-[3/4] w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="relative mt-10 overflow-hidden rounded-[2rem]">
                <SafeImage
                  src={aboutImage2}
                  sources={[
                    ...driveMedia.projectAndImpact,
                    ...driveMedia.gallery,
                  ]}
                  alt="KNFT volunteers and community members at a field activity"
                  className="aspect-[3/4] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ====================================================
          CORE BELIEF
      ==================================================== */}

      <Section tone="muted">
        <Reveal>
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-border bg-background p-8 text-center shadow-sm sm:p-14">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Our Core Belief
            </p>

            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-5xl">
              {organisation.coreBelief.english}
            </h2>

            <div className="mx-auto mt-7 h-px w-20 bg-emerald" />

            <p className="mt-6 text-xl leading-8 text-muted-foreground">
              {organisation.coreBelief.tamil}
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ====================================================
          INITIATIVE SPOTLIGHT — 9 LAKES, ONE DAY
      ==================================================== */}

      <Section>
        <Reveal>
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <Eyebrow>Initiative Spotlight</Eyebrow>

              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">
                9 Lakes. One Day.
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                On a single day, KNFT volunteers, field teams and local
                communities{" "}
                <strong className="font-semibold text-foreground">
                  initiated restoration work at nine lakes
                </strong>{" "}
                in Villupuram district. Progress and completion status are
                reported lake by lake, not for the day as a whole.
              </p>
            </div>

            <div className="mt-10 overflow-hidden rounded-[2rem] border border-border bg-background shadow-sm">
              <div className="grid gap-0 lg:grid-cols-[1fr_0.85fr]">
                <div className="grid grid-cols-2 gap-2 bg-muted p-2 sm:grid-cols-3">
                  {collectorLakeImages.map((image, index) => (
                    <div
                      key={image}
                      className={`group relative overflow-hidden rounded-xl ${
                        index === 0
                          ? "col-span-2 row-span-2 sm:col-span-2"
                          : ""
                      }`}
                    >
                      <SafeImage
                        src={image}
                        sources={collectorLakeImages.slice(index + 1)}
                        alt={`Lake restoration initiative, Villupuram district — field photo ${
                          index + 1
                        }`}
                        className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
                          index === 0
                            ? "aspect-[4/3]"
                            : "aspect-square"
                        }`}
                        loading="lazy"
                        decoding="async"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Leaf className="h-7 w-7" aria-hidden="true" />
                  </span>

                  <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Coordinated community action
                  </p>

                  <h3 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">
                    Nine lakes, one shared start.
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                    The initiative brought volunteers, field teams and local
                    communities together to begin work at nine lakes at the
                    same time.
                  </p>

                  <div className="mt-7 rounded-2xl border border-border bg-muted/60 p-5">
                    <p className="font-display text-3xl font-bold text-primary">
                      9
                    </p>

                    <p className="mt-1 text-xs font-medium leading-5 text-muted-foreground">
                      Lakes where work was initiated on the day
                    </p>
                  </div>

                  <div className="mt-8 border-l-2 border-emerald pl-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                      Official participation
                    </p>

                    <p className="mt-2 font-display text-lg font-semibold leading-snug">
                      Officials of the Villupuram District Administration
                      took part in the initiative.
                    </p>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Participation only. It does not indicate funding,
                      endorsement or a formal partnership.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ====================================================
          IMPACT
      ==================================================== */}

      <Section tone="forest">
        <Reveal className="max-w-2xl">
          <Eyebrow>Our Impact</Eyebrow>

          <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
            Turning collective action
            into measurable impact.
          </h2>

          <p className="mt-4 leading-7 text-primary-foreground/70">
            Our ongoing work reflects
            the contribution of volunteers,
            communities, supporters and
            partners.
          </p>
        </Reveal>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StaggerItem className="rounded-2xl border border-white/15 bg-white/10 p-7 backdrop-blur-sm">
            <p className="font-display text-4xl font-semibold">
              {waterBodiesHeadline.value}
              {waterBodiesHeadline.suffix}
            </p>

            <p className="mt-3 text-sm leading-6 text-primary-foreground/75">
              {waterBodiesHeadline.label} — unique sites
            </p>
          </StaggerItem>

          <StaggerItem className="rounded-2xl border border-white/15 bg-white/10 p-7 backdrop-blur-sm">
            <p className="font-display text-4xl font-semibold">
              <SlowCounter target={200000} duration={12000} />+
            </p>

            <p className="mt-3 text-sm leading-6 text-primary-foreground/75">
              Saplings Planted
            </p>
          </StaggerItem>

          {verifiedImpactStats.map((stat) => (
            <StaggerItem
              key={stat.label}
              className="rounded-2xl border border-white/15 bg-white/10 p-7 backdrop-blur-sm"
            >
              <p className="font-display text-4xl font-semibold">
                <Counter
                  value={stat.value as number}
                  suffix={stat.suffix ?? ""}
                />
              </p>

              <p className="mt-3 text-sm leading-6 text-primary-foreground/75">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-6 text-xs leading-6 text-primary-foreground/60">
          The water-body figure counts unique sites where KNFT has carried
          out assessment, restoration or maintenance work; a site with
          several activities is counted once. Figures are reported by KNFT
          and published only once verified against project records.
          {IMPACT_LAST_UPDATED
            ? ` Last updated: ${IMPACT_LAST_UPDATED}.`
            : ""}
        </p>
      </Section>

      {/* ====================================================
          OUR REACH
      ==================================================== */}

      <Section>
        <SectionHeading
          eyebrow="Our Reach"
          title="Where we work."
          subtitle="Locations are listed only where field work is documented. Other regions are shown as planned expansion until work begins."
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reachRegions.map((region) => (
            <li
              key={region.name}
              className="surface-card rounded-2xl p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">
                    {region.name}
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    {region.type}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    region.status === "Confirmed"
                      ? "bg-emerald/15 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {region.status === "Confirmed"
                    ? "Active — documented"
                    : "Planned expansion"}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {region.note}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ====================================================
          RECENT VILLUPURAM PROGRAMME
      ==================================================== */}

      <Section tone="muted">
        <Reveal>
          <div className="mx-auto max-w-5xl">
            <Eyebrow>Recent Programme</Eyebrow>

            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Villupuram water restoration and monsoon preparedness.
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
              A district-level initiative connected with the Villupuram
              District Waterbody Restoration and Biodiversity Conservation
              Committee. Over two months, KNFT reported coverage of the
              following sites:
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {villupuramProgramme.map((item) => (
                <li
                  key={item.label}
                  className="surface-card rounded-2xl p-6"
                >
                  <p className="font-display text-4xl font-bold text-primary">
                    {item.count}
                  </p>

                  <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">
                    {item.label}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-3xl text-sm leading-7 text-muted-foreground">
              Channels are man-made water conveyance structures, not
              natural streams. These sites are counted once and are not
              added again to the headline total. Each site is reported
              with its own status:
            </p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {projectStatuses.map((status) => (
                <li
                  key={status}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {status}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      {/* ====================================================
          VISION / MISSION
      ==================================================== */}

      <Section>
        <SectionHeading
          eyebrow="Why KNFT"
          title="A simple vision. A practical mission."
          subtitle="We believe meaningful change happens when people come together and take sustained action."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal className="surface-card rounded-[2rem] p-8 sm:p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Leaf className="h-6 w-6" />
            </span>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Our Vision
            </p>

            <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">
              A stronger,
              compassionate and
              sustainable society.
            </h3>

            <p className="mt-5 leading-8 text-muted-foreground">
              {organisation.vision}
            </p>
          </Reveal>

          <Reveal
            delay={0.08}
            className="surface-card rounded-[2rem] p-8 sm:p-10"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Heart className="h-6 w-6" />
            </span>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Our Mission
            </p>

            <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">
              Turning collective action
              into meaningful change.
            </h3>

            <ul className="mt-6 space-y-4">
              {organisation.mission
                .slice(0, 5)
                .map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-7 text-muted-foreground"
                  >
                    <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-emerald" />
                    <span>{item}</span>
                  </li>
                ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* ====================================================
          OUR WORK
      ==================================================== */}

      <Section tone="muted">
        <SectionHeading
          eyebrow="Our Work"
          title="Areas where we create action."
          subtitle="From environmental restoration to humanitarian support, education and youth development."
        />

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programmeImageMap.map((programme) => (
            <StaggerItem key={programme.slug}>
              <article className="surface-card flex h-full flex-col overflow-hidden rounded-[1.75rem] transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <SafeImage
                    src={programme.resolvedImage}
                    sources={programme.categoryImages}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-primary shadow-lg backdrop-blur">
                      <programme.icon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="mt-4 text-xl font-semibold text-white">
                      {programme.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="flex-1 text-sm leading-7 text-muted-foreground">
                    {programme.description}
                  </p>

                  <div className="mt-6">
                    <BtnLink
                      to="/our-work"
                      variant="outline"
                      size="sm"
                    >
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </BtnLink>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ====================================================
          REAL COMMUNITY ACTION
      ==================================================== */}

      <Section>
        <SectionHeading
          eyebrow="Real Community Action"
          title="See the work behind the mission."
          subtitle="These images capture moments from KNFT initiatives and community activities."
        />

        <div className="mt-12 space-y-16">
          {communitySections.map(
            ({ category, images }, categoryIndex) => (
              <Reveal
                key={category}
                delay={categoryIndex * 0.03}
              >
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {String(categoryIndex + 1).padStart(2, "0")}
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold">
                      {category}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {images.slice(0, 8).map(
                    (image, imageIndex) => (
                      <div
                        key={`${category}-${imageIndex}`}
                        className={`group relative overflow-hidden rounded-2xl ${
                          imageIndex === 0
                            ? "col-span-2 row-span-2"
                            : ""
                        }`}
                      >
                        <SafeImage
                          src={image}
                          sources={images.slice(imageIndex + 1)}
                          alt={`${category} — field photo ${imageIndex + 1}`}
                          className="aspect-square h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                          decoding="async"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                    ),
                  )}
                </div>
              </Reveal>
            ),
          )}
        </div>

        <div className="mt-12 flex justify-center">
          <BtnLink
            to="/gallery"
            variant="outline"
          >
            Explore Full Gallery
            <ArrowRight className="h-4 w-4" />
          </BtnLink>
        </div>
      </Section>

      {/* ====================================================
          JOURNEY
      ==================================================== */}

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionHeading
              eyebrow="Our Journey"
              title="A movement that keeps growing."
              subtitle="Every volunteer, initiative and community partnership has shaped the KNFT journey."
            />
          </Reveal>
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl">
          <div className="absolute left-4 top-0 h-full w-px bg-border sm:left-1/2 sm:-translate-x-1/2" />

          <Stagger className="space-y-10">
            {organisation.journey.map((item, index) => (
              <StaggerItem
                key={`${item.title}-${index}`}
                className="relative"
              >
                <div className="grid gap-6 sm:grid-cols-2 sm:gap-12">
                  <div
                    className={`pl-10 sm:pl-0 ${
                      index % 2 === 0
                        ? "sm:text-right"
                        : "sm:order-2"
                    }`}
                  >
                    {"year" in item && item.year ? (
                      <p className="font-display text-3xl font-bold text-primary">
                        {item.year}
                      </p>
                    ) : null}

                    <h3 className="mt-2 text-xl font-semibold">
                      {item.title}
                    </h3>
                  </div>

                  <div
                    className={`surface-card relative rounded-2xl p-6 ${
                      index % 2 === 0
                        ? ""
                        : "sm:order-1"
                    }`}
                  >
                    <span className="absolute -left-[2.1rem] top-7 h-3 w-3 rounded-full bg-emerald ring-4 ring-background sm:hidden" />

                    <p className="text-sm leading-7 text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* ====================================================
          VALUES
      ==================================================== */}

      <Section tone="muted">
        <SectionHeading
          eyebrow="Our Values"
          title="The principles behind every action."
          subtitle="Our work is guided by values that put people, communities and the environment at the centre."
        />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {organisation.values.map((value, index) => (
            <StaggerItem
              key={value.title}
              className="surface-card rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="text-sm font-semibold text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-6 text-xl font-semibold">
                {value.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {value.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ====================================================
          PHOTO GALLERY
      ==================================================== */}

      {galleryImages.length > 0 && (
        <Section>
          <SectionHeading
            eyebrow="On The Ground"
            title="Real people. Real action."
            subtitle="A glimpse of volunteers and communities working together."
          />

          <Stagger className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {galleryImages.map((item, index) => (
              <StaggerItem key={`${item.alt}-${index}`}>
                <div className="group relative overflow-hidden rounded-2xl">
                  <SafeImage
                    src={item.image}
                    sources={galleryImages
                      .slice(index + 1)
                      .map((entry) => entry.image)}
                    alt={item.alt}
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-9 flex justify-center">
            <BtnLink
              to="/gallery"
              variant="outline"
            >
              View Full Gallery
              <ArrowRight className="h-4 w-4" />
            </BtnLink>
          </div>
        </Section>
      )}

      {/* ====================================================
          LEADERSHIP / PHILOSOPHY
      ==================================================== */}

      <Section tone="muted">
        <div className="surface-card grid gap-10 rounded-[2rem] p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <Reveal>
            <Quote
              className="h-9 w-9 text-emerald"
              aria-hidden
            />

            <p className="mt-5 max-w-4xl font-display text-2xl font-semibold leading-snug sm:text-4xl">
              {organisation.philosophy.statement}
            </p>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">
              {organisation.philosophy.tamil}
            </p>
          </Reveal>

          <Reveal
            delay={0.1}
            className="flex flex-wrap gap-3"
          >
            <BtnLink
              to="/about"
              variant="primary"
            >
              About KNFT
            </BtnLink>

            <BtnLink
              to="/team"
              variant="outline"
            >
              Meet Our Team
            </BtnLink>
          </Reveal>
        </div>
      </Section>

      {/* ====================================================
          GET INVOLVED CTA
      ==================================================== */}

      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-primary px-7 py-14 text-center text-primary-foreground sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
                Be Part of the Change
              </p>

              <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-5xl">
                Meaningful change begins
                when we choose to act
                together.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl leading-8 text-primary-foreground/75">
                Volunteer your time,
                support an initiative,
                collaborate with KNFT or
                help us create a larger
                impact for communities and
                nature.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <BtnLink
                  to="/get-involved"
                  variant="soft"
                  size="lg"
                >
                  Get Involved
                  <ArrowRight className="h-4 w-4" />
                </BtnLink>

                <BtnLink
                  to="/donate"
                  variant="ghostLight"
                  size="lg"
                >
                  Donate Now
                  <Heart className="h-4 w-4" />
                </BtnLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
