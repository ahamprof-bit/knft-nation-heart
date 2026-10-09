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
};

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
    value: 13,
    suffix: "+",
    label: "Water Bodies Restored",
  },
  {
    value: 20000,
    label: "Palm Seeds",
  },
  {
    value: 5000,
    suffix: "+",
    label: "Saplings Planted",
  },
  {
    value: 800,
    suffix: "+",
    label: "Children Trained",
  },
];

/* ============================================================
   ENVIRONMENTAL IMPACT
   ============================================================ */

export const environmentalImpact: Stat[] = [
  {
    value: 13,
    suffix: "+",
    label: "Water Bodies Restored",
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
