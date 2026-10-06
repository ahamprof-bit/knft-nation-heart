import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Heart, Leaf, Quote, Users } from "lucide-react";

import { siteConfig } from "@/data/siteConfig";
import { organisation } from "@/data/organisation";
import { programmes } from "@/data/programmes";
import { projects } from "@/data/projects";
import { impactStats } from "@/data/impact";

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
   IMAGE IMPORT
   ============================================================ */

const categoryImages = import.meta.glob(
  "/src/assets/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

/* ============================================================
   VIDEO IMPORT
   ============================================================ */

const categoryVideos = import.meta.glob(
  "/src/assets/**/*.{mp4,MP4,webm,WEBM,mov,MOV}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

/* ============================================================
   TEXT NORMALIZER
   ============================================================ */

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[–—]/g, "-")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ============================================================
   PATH NORMALIZER
   ============================================================ */

function normalizeAssetPath(value: string) {
  return value
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

/* ============================================================
   IMAGE EXTENSION HELPERS
   ============================================================ */

function removeImageExtension(value: string) {
  return value.replace(
    /\.(jpg|jpeg|png|webp)$/i,
    "",
  );
}

function isWebpPath(value: string) {
  return /\.webp$/i.test(value);
}

/* ============================================================
   IMAGE ENTRIES
   ============================================================ */

const imageEntries = Object.entries(
  categoryImages,
);

/* ============================================================
   WEBP-FIRST IMAGE RESOLVER
   ============================================================

   If requested:

   image.jpg

   the resolver tries:

   image.webp
   image.jpg.webp
   image.jpg

   This supports both normal WebP naming and any
   extension-preserving WebP files that may exist.
   ============================================================ */

function resolveWebpFirst(
  requestedPath: string,
): string | undefined {
  const requestedNormalized =
    normalizeAssetPath(requestedPath);

  const requestedWithoutExtension =
    normalizeAssetPath(
      removeImageExtension(
        requestedPath,
      ),
    );

  /* ----------------------------------------------------------
     1. EXACT WEBP MATCH
     ---------------------------------------------------------- */

  const exactWebp = imageEntries.find(
    ([sourcePath]) => {
      const normalizedSource =
        normalizeAssetPath(sourcePath);

      return (
        isWebpPath(normalizedSource) &&
        (
          normalizedSource ===
            requestedNormalized.replace(
              /\.(jpg|jpeg|png)$/i,
              ".webp",
            ) ||
          normalizeAssetPath(
            removeImageExtension(
              normalizedSource,
            ),
          ) ===
            requestedWithoutExtension
        )
      );
    },
  );

  if (exactWebp) {
    return exactWebp[1];
  }

  /* ----------------------------------------------------------
     2. WEBP MATCH BY FILENAME
     ---------------------------------------------------------- */

  const requestedFilename =
    requestedWithoutExtension
      .split("/")
      .pop() ?? requestedWithoutExtension;

  const webpByFilename =
    imageEntries.find(
      ([sourcePath]) => {
        const normalizedSource =
          normalizeAssetPath(sourcePath);

        if (!isWebpPath(normalizedSource)) {
          return false;
        }

        const sourceFilename =
          normalizeAssetPath(
            removeImageExtension(
              normalizedSource
                .split("/")
                .pop() ??
                normalizedSource,
            ),
          );

        return (
          sourceFilename ===
          requestedFilename
        );
      },
    );

  if (webpByFilename) {
    return webpByFilename[1];
  }

  /* ----------------------------------------------------------
     3. ORIGINAL IMAGE FALLBACK
     ---------------------------------------------------------- */

  const original = imageEntries.find(
    ([sourcePath]) => {
      const normalizedSource =
        normalizeAssetPath(sourcePath);

      return (
        normalizedSource ===
          requestedNormalized ||
        normalizedSource.endsWith(
          requestedNormalized,
        )
      );
    },
  );

  return original?.[1];
}

/* ============================================================
   ALL AVAILABLE IMAGES
   ============================================================ */

const allAvailableImages =
  imageEntries
    .filter(
      ([path]) =>
        !isWebpPath(path),
    )
    .map(([, image]) => image);

/* ============================================================
   FIND IMAGE BY EXACT FILENAME
   ============================================================ */

function findImageByFilename(
  filename: string,
): string | undefined {
  return resolveWebpFirst(
    filename,
  );
}

/* ============================================================
   SAFE FALLBACK IMAGES
   ============================================================ */

const heroImage =
  findImageByFilename("hero.png") ??
  findImageByFilename(
    "Polish_20250208_071036066.jpg",
  ) ??
  allAvailableImages[0] ??
  "";

const aboutImage1 =
  findImageByFilename(
    "Polish_20250208_071036066.jpg",
  ) ??
  heroImage;

const aboutImage2 =
  findImageByFilename(
    "Polish_20250301_095608729.jpg",
  ) ??
  aboutImage1;

const malkhambImage =
  findImageByFilename(
    "IMG20250416111644.jpg",
  ) ??
  findImageByFilename(
    "IMG20250416111644_01.jpg",
  ) ??
  aboutImage2;

/* ============================================================
   CATEGORY ALIASES
   ============================================================ */

const categoryAliases: Record<
  string,
  string[]
> = {
  "water restoration": [
    "water restoration",
    "water",
    "lake",
    "lakes",
    "pond",
    "ponds",
    "water body",
    "water bodies",
  ],

  "environment biodiversity": [
    "environment",
    "biodiversity",
    "nature",
    "wildlife",
    "forest",
    "conservation",
    "tree",
    "trees",
    "plantation",
  ],

  "disaster relief": [
    "disaster relief",
    "disaster",
    "relief",
    "flood",
    "emergency",
    "rescue",
    "humanitarian",
  ],

  "blood donation": [
    "blood donation",
    "blood",
    "blood donate",
    "donation",
  ],

  "poverty hunger": [
    "poverty",
    "hunger",
    "food",
    "feeding",
    "essential support",
  ],

  "youth empowerment": [
    "youth",
    "empowerment",
    "leadership",
    "young",
    "student",
  ],

  education: [
    "education",
    "school",
    "student",
    "learning",
    "children",
  ],

  "sports traditional": [
    "sports",
    "traditional",
    "traditional arts",
    "malkhamb",
    "mallakhamb",
  ],

  "community development": [
    "community",
    "community development",
    "rural",
    "development",
  ],

  "career support": [
    "career",
    "employment",
    "job",
    "jobs",
    "skill",
    "skills",
  ],

  "tree plantation": [
    "tree plantation",
    "tree",
    "trees",
    "plantation",
    "planting",
    "sapling",
    "saplings",
  ],
};

/* ============================================================
   GET SEARCH TERMS
   ============================================================ */

function getCategorySearchTerms(
  categoryTitle: string,
): string[] {
  const normalizedTitle =
    normalizeText(categoryTitle);

  const matchingGroups = Object.entries(
    categoryAliases,
  )
    .filter(([category, aliases]) => {
      const normalizedCategory =
        normalizeText(category);

      return (
        normalizedTitle.includes(
          normalizedCategory,
        ) ||
        normalizedCategory.includes(
          normalizedTitle,
        ) ||
        aliases.some((alias) => {
          const normalizedAlias =
            normalizeText(alias);

          return (
            normalizedTitle.includes(
              normalizedAlias,
            ) ||
            normalizedAlias.includes(
              normalizedTitle,
            )
          );
        })
      );
    })
    .map(([category, aliases]) => [
      category,
      ...aliases,
    ]);

  const terms =
    matchingGroups.flat();

  return terms.length
    ? [
        ...new Set(
          terms.map(normalizeText),
        ),
      ]
    : [normalizedTitle];
}

/* ============================================================
   GET CATEGORY IMAGES
   ============================================================ */

function getCategoryImages(
  categoryTitle: string,
): string[] {
  const searchTerms =
    getCategorySearchTerms(
      categoryTitle,
    );

  const matchingEntries =
    imageEntries.filter(
      ([path]) => {
        const normalizedPath =
          normalizeText(path);

        return searchTerms.some(
          (term) =>
            normalizedPath.includes(
              term,
            ),
        );
      },
    );

  /*
   * WEBP FIRST
   *
   * Keep WebP before original formats.
   */

  const sortedEntries =
    matchingEntries.sort(
      ([a], [b]) => {
        const aWebp =
          isWebpPath(a);
        const bWebp =
          isWebpPath(b);

        if (aWebp && !bWebp) {
          return -1;
        }

        if (!aWebp && bWebp) {
          return 1;
        }

        return a.localeCompare(
          b,
        );
      },
    );

  return [
    ...new Set(
      sortedEntries.map(
        ([, image]) => image,
      ),
    ),
  ];
}

/* ============================================================
   RESOLVE EXACT PATH
   ============================================================ */

function resolveImage(
  path: string,
): string | undefined {
  return resolveWebpFirst(path);
}

/* ============================================================
   WATER RESTORATION IMAGES
   ============================================================ */

const waterImages = [
  "/src/assets/new folder/01 WATER RESTORATION/01 – Best Photos/1759853647390.jpg",
  "/src/assets/new folder/01 WATER RESTORATION/01 – Best Photos/1759853988061.jpg",
  "/src/assets/new folder/01 WATER RESTORATION/01 – Best Photos/1780073254157.png",
  "/src/assets/new folder/01 WATER RESTORATION/01 – Best Photos/1780073660152.png",
  "/src/assets/new folder/01 WATER RESTORATION/01 – Best Photos/DJI_20251227115143_0097_D.JPG",
  "/src/assets/new folder/01 WATER RESTORATION/01 – Best Photos/DJI_20251227115345_0102_D.JPG",
  "/src/assets/new folder/01 WATER RESTORATION/01 – Best Photos/DJI_20251227115410_0104_D.JPG",
  "/src/assets/new folder/01 WATER RESTORATION/01 – Best Photos/IMG-20250921-WA0023.jpg",
  "/src/assets/new folder/01 WATER RESTORATION/01 – Best Photos/IMG-20250921-WA0027.jpg",
  "/src/assets/new folder/01 WATER RESTORATION/01 – Best Photos/IMG-20250829-WA0023.jpg",
  "/src/assets/new folder/01 WATER RESTORATION/01 – Best Photos/Polish_20260318_105454399.jpg",
];

const resolvedWaterImages =
  waterImages
    .map(resolveImage)
    .filter(Boolean) as string[];

/* ============================================================
   LAKE RESTORATION PROJECTS
   ============================================================ */

const lakeProjects = [
  {
    name: "Aadur Malavanthangal Lake",
    description:
      "Water restoration and community-focused conservation work supporting the revival and protection of the lake ecosystem.",
    terms: [
      "aadur malavanthangal lake",
    ],
  },

  {
    name: "Erumananthangal Lake",
    description:
      "Field activities, inspections and restoration efforts focused on improving the condition of the lake and strengthening community participation.",
    terms: [
      "erumananthangal lake",
    ],
  },

  {
    name: "Kakuppam Lake",
    description:
      "Community-driven lake restoration activities focused on improving the water body and creating a healthier environment for surrounding communities.",
    terms: [
      "kakuppam lake",
    ],
  },

  {
    name: "Koliyanur Lake",
    description:
      "A continuing water restoration initiative supported by field activities, before-and-after documentation and community participation.",
    terms: [
      "koliyanur lake",
    ],
  },

  {
    name: "Murukkeri Lake",
    description:
      "Water body restoration and field documentation around Murukkeri, including aerial project documentation and restoration activities.",
    terms: [
      "murukkeri lake",
    ],
  },

  {
    name: "Muthampalayam Lake",
    description:
      "Lake restoration activities supported by ground documentation, photography and aerial project footage.",
    terms: [
      "muthampalayam lake",
    ],
  },

  {
    name: "Tindivanam Thulkar Kulam",
    description:
      "Water restoration work and community activity around Tindivanam Thulkar Kulam.",
    terms: [
      "tindivanam thulkar kulam",
    ],
  },

  {
    name: "Nanthan Kaalvaai Scheme",
    description:
      "Water-related field activity documented as part of the KNFT restoration initiatives.",
    terms: [
      "nanthan kaalvaai scheme",
    ],
  },
];

/* ============================================================
   LAKE IMAGE RESOLVER
   ============================================================ */

function getLakeImages(
  terms: string[],
): string[] {
  const normalizedTerms =
    terms.map(normalizeText);

  const matches =
    imageEntries.filter(
      ([path]) => {
        const normalizedPath =
          normalizeText(path);

        return normalizedTerms.some(
          (term) =>
            normalizedPath.includes(
              term,
            ),
        );
      },
    );

  /*
   * WEBP FIRST
   */

  matches.sort(
    ([a], [b]) => {
      const aWebp =
        isWebpPath(a);
      const bWebp =
        isWebpPath(b);

      if (aWebp && !bWebp) {
        return -1;
      }

      if (!aWebp && bWebp) {
        return 1;
      }

      return a.localeCompare(b);
    },
  );

  return [
    ...new Set(
      matches.map(
        ([, image]) => image,
      ),
    ),
  ];
}

/* ============================================================
   LAKE VIDEO RESOLVER
   ============================================================ */

function getLakeVideos(
  terms: string[],
): string[] {
  const normalizedTerms =
    terms.map(normalizeText);

  return [
    ...new Set(
      Object.entries(
        categoryVideos,
      )
        .filter(([path]) => {
          const normalizedPath =
            normalizeText(path);

          return normalizedTerms.some(
            (term) =>
              normalizedPath.includes(
                term,
              ),
          );
        })
        .map(
          ([, video]) => video,
        ),
    ),
  ];
}

/* ============================================================
   RESOLVED LAKE PROJECTS
   ============================================================ */

const resolvedLakeProjects =
  lakeProjects.map((lake) => ({
    ...lake,

    images: getLakeImages(
      lake.terms,
    ),

    videos: getLakeVideos(
      lake.terms,
    ),
  }));

/* ============================================================
   ROUTE
   ============================================================ */

export const Route =
  createFileRoute("/")({
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
      ],
    }),

    component: Home,
  });

/* ============================================================
   HOME
   ============================================================ */

function Home() {
  /* ==========================================================
     PROGRAMMES
     ========================================================== */

  const programmeImageMap =
    programmes.map((programme) => {
      const images =
        getCategoryImages(
          programme.title,
        );

      return {
        ...programme,

        resolvedImage:
          images[0] ??
          resolveWebpFirst(
            programme.image,
          ) ??
          programme.image,

        categoryImages:
          images,
      };
    });

  /* ==========================================================
     FEATURED PROJECT IMAGES
     ========================================================== */

  const projectImages =
    resolvedWaterImages.length > 0
      ? resolvedWaterImages
      : [
          aboutImage1,
          aboutImage2,
          malkhambImage,
        ];

  /* ==========================================================
     COMMUNITY CATEGORIES
     ========================================================== */

  const communityCategories = [
    "Water Restoration",
    "Environment & Biodiversity",
    "Disaster Relief & Humanitarian Support",
    "Blood Donation",
    "Poverty & Hunger Support",
    "Youth Empowerment",
    "Education",
    "Sports & Traditional Arts",
    "Community Development",
    "Career Support",
  ];

  /* ==========================================================
     COMMUNITY IMAGE DATA
     ========================================================== */

  const communitySections =
    communityCategories
      .map((category) => ({
        category,

        images:
          getCategoryImages(
            category,
          ),
      }))
      .filter(
        (item) =>
          item.images.length > 0,
      );

  /* ==========================================================
     HOME GALLERY
     ========================================================== */

  const galleryImages = [
    ...resolvedWaterImages
      .slice(0, 6)
      .map((image, index) => ({
        image,

        alt: `KNFT water restoration activity ${
          index + 1
        }`,
      })),

    ...resolvedLakeProjects.flatMap(
      (lake) =>
        lake.images
          .slice(0, 2)
          .map(
            (image, index) => ({
              image,

              alt: `${lake.name} restoration activity ${
                index + 1
              }`,
            }),
          ),
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
      {/* ====================================================
          HERO
      ==================================================== */}

      <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground">
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald/20 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <Container className="relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
          <Reveal>
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md">
              Est. Volunteer-led · 2012
            </span>

            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              {siteConfig.name}
            </h1>

            <p className="mt-5 max-w-2xl font-display text-xl text-primary-foreground/90 sm:text-2xl">
              {siteConfig.tagline}
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
                {heroImage ? (
                  <img
                    src={heroImage}
                    alt="Kalam Nation First Trust"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-black/20 text-sm text-white/60">
                    KNFT
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">
                  <div className="rounded-2xl border border-white/15 bg-black/30 p-4 backdrop-blur-xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                      Our belief
                    </p>

                    <p className="mt-2 font-display text-lg font-semibold text-white">
                      {
                        organisation
                          .coreBelief
                          .english
                      }
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
            <Eyebrow>
              Who We Are
            </Eyebrow>

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
                {aboutImage1 ? (
                  <img
                    src={aboutImage1}
                    alt="KNFT community initiative"
                    className="aspect-[3/4] w-full object-cover"
                    loading="lazy"
                  />
                ) : null}
              </div>

              <div className="relative mt-10 overflow-hidden rounded-[2rem]">
                {aboutImage2 ? (
                  <img
                    src={aboutImage2}
                    alt="KNFT volunteers"
                    className="aspect-[3/4] w-full object-cover"
                    loading="lazy"
                  />
                ) : null}
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
              {
                organisation
                  .coreBelief
                  .english
              }
            </h2>

            <div className="mx-auto mt-7 h-px w-20 bg-emerald" />

            <p className="mt-6 text-xl leading-8 text-muted-foreground">
              {
                organisation
                  .coreBelief
                  .tamil
              }
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ====================================================
          IMPACT
      ==================================================== */}

      <Section tone="forest">
        <Reveal className="max-w-2xl">
          <Eyebrow>
            Our Impact
          </Eyebrow>

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
          {impactStats.map((stat) => (
            <StaggerItem
              key={stat.label}
              className="rounded-2xl border border-white/15 bg-white/10 p-7 backdrop-blur-sm"
            >
              <p className="font-display text-4xl font-semibold">
                {stat.value === null ? (
                  "—"
                ) : (
                  <Counter
                    value={stat.value}
                    suffix={
                      stat.suffix ?? ""
                    }
                  />
                )}
              </p>

              <p className="mt-3 text-sm leading-6 text-primary-foreground/75">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
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
          {programmeImageMap.map(
            (programme) => (
              <StaggerItem
                key={programme.slug}
              >
                <article className="surface-card flex h-full flex-col overflow-hidden rounded-[1.75rem] transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    {programme.resolvedImage ? (
                      <img
                        src={
                          programme.resolvedImage
                        }
                        alt={
                          programme.title
                        }
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-secondary p-6 text-center text-sm text-muted-foreground">
                        Image coming soon
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-primary shadow-lg backdrop-blur">
                        <programme.icon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </div>

                      <h3 className="mt-4 text-xl font-semibold text-white">
                        {
                          programme.title
                        }
                      </h3>
                    </div>

                    {programme.categoryImages
                      .length > 1 && (
                      <span className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                        {
                          programme
                            .categoryImages
                            .length
                        }{" "}
                        photos
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex-1 text-sm leading-7 text-muted-foreground">
                      {
                        programme.description
                      }
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
            ),
          )}
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
                delay={
                  categoryIndex * 0.03
                }
              >
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {String(
                        categoryIndex + 1,
                      ).padStart(2, "0")}
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold">
                      {category}
                    </h3>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {images.length}{" "}
                    {images.length === 1
                      ? "photo"
                      : "photos"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {images
                    .slice(0, 8)
                    .map(
                      (
                        image,
                        imageIndex,
                      ) => (
                        <div
                          key={`${category}-${imageIndex}`}
                          className={`group relative overflow-hidden rounded-2xl ${
                            imageIndex === 0
                              ? "col-span-2 row-span-2"
                              : ""
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${category} activity ${
                              imageIndex + 1
                            }`}
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
          FEATURED PROJECTS
      ==================================================== */}

      <Section tone="muted">
        <SectionHeading
          eyebrow="Featured Projects"
          title="From intention to action."
          subtitle="Explore some of the projects and initiatives that represent KNFT's work on the ground."
        />

        <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map(
            (project, index) => (
              <StaggerItem
                key={project.slug}
              >
                <article className="surface-card flex h-full flex-col overflow-hidden rounded-[1.75rem]">
                  <div className="relative overflow-hidden">
                    {projectImages.length >
                    0 ? (
                      <img
                        src={
                          projectImages[
                            index %
                              projectImages.length
                          ]
                        }
                        alt={
                          project.title
                        }
                        className="aspect-[16/9] w-full object-cover transition-transform duration-700 hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex aspect-[16/9] items-center justify-center bg-muted text-sm text-muted-foreground">
                        Project image
                        coming soon
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-2xl font-semibold">
                      {
                        project.title
                      }
                    </h3>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.highlights.map(
                        (
                          highlight,
                        ) => (
                          <span
                            key={
                              highlight
                            }
                            className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                          >
                            {
                              highlight
                            }
                          </span>
                        ),
                      )}
                    </div>

                    <div className="mt-7">
                      <BtnLink
                        to="/projects/$slug"
                        params={
                          {
                            slug:
                              project.slug,
                          } as any
                        }
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
            ),
          )}
        </Stagger>

        {/* ==================================================
            LAKE RESTORATION
        ================================================== */}

        <div className="mt-16 border-t border-border pt-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Water Restoration
            </p>

            <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
              Lake Restoration
              Projects
            </h3>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Explore lake restoration work documented through project photos,
              field activities and available video footage.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resolvedLakeProjects.map(
              (lake, index) => {
                const coverImage =
                  lake.images[0] ??
                  (resolvedWaterImages.length
                    ? resolvedWaterImages[
                        index %
                          resolvedWaterImages.length
                      ]
                    : undefined) ??
                  aboutImage1;

                return (
                  <Reveal
                    key={lake.name}
                    delay={
                      index * 0.03
                    }
                  >
                    <article className="surface-card group flex h-full flex-col overflow-hidden rounded-[1.75rem]">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {coverImage ? (
                          <img
                            src={
                              coverImage
                            }
                            alt={`${lake.name} restoration project`}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-muted text-sm text-muted-foreground">
                            Image coming
                            soon
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                        <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-2">
                          <span className="rounded-full bg-black/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                            Lake Project
                          </span>

                          {lake.images
                            .length >
                            0 && (
                            <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-primary">
                              {
                                lake
                                  .images
                                  .length
                              }{" "}
                              photos
                            </span>
                          )}
                        </div>

                        <div className="absolute bottom-5 left-5 right-5">
                          <h4 className="text-2xl font-semibold text-white">
                            {lake.name}
                          </h4>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <p className="text-sm leading-7 text-muted-foreground">
                          {
                            lake.description
                          }
                        </p>

                        {lake.images
                          .length >
                          1 && (
                          <div className="mt-5 grid grid-cols-4 gap-2">
                            {lake.images
                              .slice(
                                0,
                                4,
                              )
                              .map(
                                (
                                  image,
                                  imageIndex,
                                ) => (
                                  <div
                                    key={`${lake.name}-${imageIndex}`}
                                    className="overflow-hidden rounded-xl"
                                  >
                                    <img
                                      src={
                                        image
                                      }
                                      alt={`${lake.name} image ${
                                        imageIndex +
                                        1
                                      }`}
                                      className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-110"
                                      loading="lazy"
                                    />
                                  </div>
                                ),
                              )}
                          </div>
                        )}

                        {lake.videos
                          .length >
                          0 && (
                          <div className="mt-5 overflow-hidden rounded-xl border border-border bg-muted/40">
                            <video
                              src={
                                lake
                                  .videos[0]
                              }
                              className="aspect-video w-full object-cover"
                              controls
                              muted
                              playsInline
                              preload="metadata"
                            />
                          </div>
                        )}

                        <div className="mt-6">
                          <BtnLink
                            to="/our-work"
                            variant="outline"
                            size="sm"
                          >
                            Explore Water
                            Restoration
                            <ArrowRight className="h-4 w-4" />
                          </BtnLink>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              },
            )}
          </div>

          <div className="mt-10 flex justify-center">
            <BtnLink
              to="/our-work"
              variant="outline"
            >
              View All Water
              Restoration Work
              <ArrowRight className="h-4 w-4" />
            </BtnLink>
          </div>
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
            {organisation.journey.map(
              (item, index) => (
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
                      {"year" in item &&
                      item.year ? (
                        <p className="font-display text-3xl font-bold text-primary">
                          {
                            item.year
                          }
                        </p>
                      ) : null}

                      <h3 className="mt-2 text-xl font-semibold">
                        {
                          item.title
                        }
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
              ),
            )}
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
          {organisation.values.map(
            (value, index) => (
              <StaggerItem
                key={value.title}
                className="surface-card rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="text-sm font-semibold text-primary">
                  {String(
                    index + 1,
                  ).padStart(2, "0")}
                </span>

                <h3 className="mt-6 text-xl font-semibold">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {value.body}
                </p>
              </StaggerItem>
            ),
          )}
        </Stagger>
      </Section>

      {/* ====================================================
          PHOTO GALLERY
      ==================================================== */}

      {galleryImages.length >
        0 && (
        <Section>
          <SectionHeading
            eyebrow="On The Ground"
            title="Real people. Real action."
            subtitle="A glimpse of volunteers and communities working together."
          />

          <Stagger className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {galleryImages.map(
              (item, index) => (
                <StaggerItem
                  key={`${item.alt}-${index}`}
                >
                  <div className="group relative overflow-hidden rounded-2xl">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </StaggerItem>
              ),
            )}
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
              {
                organisation
                  .philosophy
                  .statement
              }
            </p>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">
              {
                organisation
                  .philosophy
                  .tamil
              }
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