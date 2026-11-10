/* ============================================================
   KNFT IMPACT DATA
   Kalam Nation First Trust
   ============================================================ */

/* ============================================================
   STAT TYPE
   ============================================================ */

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
  /** What is being counted, e.g. "unique water bodies". */
  unit?: string;
  /** Plain-language definition shown on detailed Impact pages. */
  definition?: string;
};

/** Date the public figures below were last reviewed. */
export const IMPACT_LAST_UPDATED = "October 2026";

/**
 * Headline water-body figure — the ONLY place it is defined.
 * Counts unique sites; a site with several activities counts once.
 */
export const waterBodiesHeadline = {
  value: 50,
  suffix: "+",
  label: "Water Bodies",
  unit: "unique water bodies",
  definition:
    "Unique water bodies (lakes, ponds, channels) where KNFT has carried out assessment, restoration or maintenance work. A site with several activities is counted once.",
} as const;

/* ============================================================
   IMPACT STORY TYPE
   ============================================================ */

export type StoryImage = {
  src: string;
  alt: string;
};

export type Story = {
  slug: string;
  title: string;
  journey: string;
  summary: string;
  category?: string;
  images?: StoryImage[];
};

/* ============================================================
   VERIFIED HEADLINE NUMBERS
   ============================================================ */

export const impactStats: Stat[] = [
  {
    value: waterBodiesHeadline.value,
    suffix: waterBodiesHeadline.suffix,
    label: waterBodiesHeadline.label,
    unit: waterBodiesHeadline.unit,
    definition: waterBodiesHeadline.definition,
  },
  {
    value: 20000,
    label: "Palm Seeds Sown",
    unit: "seeds sown",
    definition:
      "Palm seeds sown. Seeds collected and seedlings established are reported separately.",
  },
  {
    value: 5000,
    suffix: "+",
    label: "Saplings Planted",
    unit: "saplings planted",
    definition:
      "Saplings planted. This is not the number of surviving trees.",
  },
  {
    value: 800,
    suffix: "+",
    label: "Children Trained",
    unit: "children",
    definition: "Children who took part in KNFT training programmes.",
  },
];

/* ============================================================
   ENVIRONMENTAL IMPACT
   ============================================================ */

export const environmentalImpact: Stat[] = [
  {
    value: waterBodiesHeadline.value,
    suffix: waterBodiesHeadline.suffix,
    label: waterBodiesHeadline.label,
    unit: waterBodiesHeadline.unit,
    definition: waterBodiesHeadline.definition,
  },
  {
    value: 20000,
    label: "Palm Seeds Sown",
  },
  {
    value: 5000,
    suffix: "+",
    label: "Saplings Planted",
  },
];

/* ============================================================
   SOCIAL IMPACT
   ============================================================ */

export const socialImpact: Stat[] = [
  {
    value: 800,
    suffix: "+",
    label: "Children Trained",
  },
  {
    value: 500,
    suffix: "+",
    label: "Youth Engaged",
  },
  {
    value: 2,
    label: "Sports Programmes",
  },
  {
    value: 1000,
    suffix: "+",
    label: "Humanitarian Support",
  },
  {
    value: 100,
    suffix: "+",
    label: "Blood Donors Mobilised",
    unit: "donors mobilised",
    definition:
      "Donors mobilised for blood donation. Camps held and donations coordinated are reported separately.",
  },
  {
    value: 20,
    suffix: "+",
    label: "Community Initiatives",
  },
];

/* ============================================================
   IMPACT STORIES

   Images are mapped from Google Drive through driveMedia.ts.
   No local image imports are required.
   ============================================================ */

import { driveMedia } from "@/data/driveMedia";

const subasreeImages: StoryImage[] = (
  driveMedia.sports.running ?? []
).map((src, index) => ({
  src,
  alt: `Subasree running journey image ${index + 1}`,
}));

export const impactStories: Story[] = [
  {
    slug: "subasree",
    title: "Subasree's Journey",
    category: "Sports & Youth Empowerment",

    journey: "Support → Training → Achievement",

    summary:
      "A journey highlighting how support, training and opportunity can help create meaningful change in an individual's life.",

    images: subasreeImages,
  },
];

/* ============================================================
   IMPACT AREAS
   ============================================================ */

export const impactAreas = [
  {
    title: "Water Restoration",
    description:
      "Reviving lakes, ponds and traditional water bodies through community participation.",
  },

  {
    title: "Environment & Biodiversity",
    description:
      "Tree plantation, palm seed sowing, nurseries and habitat protection.",
  },

  {
    title: "Disaster Relief",
    description:
      "Volunteer-led humanitarian support during emergencies and difficult situations.",
  },

  {
    title: "Blood Donation",
    description:
      "Connecting donors and communities to support people in need.",
  },

  {
    title: "Education",
    description:
      "Supporting children through learning, training and educational initiatives.",
  },

  {
    title: "Youth Empowerment",
    description:
      "Creating opportunities for young people through leadership, skills and volunteering.",
  },

  {
    title: "Sports & Traditional Arts",
    description:
      "Encouraging sports participation and preserving traditional arts and activities.",
  },

  {
    title: "Community Development",
    description:
      "Strengthening local communities through practical, community-led initiatives.",
  },
] as const;