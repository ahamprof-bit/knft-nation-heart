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
   ============================================================ */

import subasreeImage1 from "@/assets/SPORTS/RUNNING/WhatsApp Image 2026-09-25 at 22.12.16.jpeg";

import subasreeImage2 from "@/assets/SPORTS/RUNNING/WhatsApp Image 2026-09-25 at 22.12.16 (1).jpeg";

import subasreeImage3 from "@/assets/SPORTS/RUNNING/WhatsApp Image 2026-09-25 at 22.12.16 (2).jpeg";

import subasreeImage4 from "@/assets/SPORTS/RUNNING/WhatsApp Image 2026-09-25 at 22.12.17.jpeg";

import subasreeImage5 from "@/assets/SPORTS/RUNNING/WhatsApp Image 2026-09-25 at 22.12.17 (1).jpeg";

import subasreeImage6 from "@/assets/SPORTS/RUNNING/WhatsApp Image 2026-09-25 at 22.12.18.jpeg";

export const impactStories: Story[] = [
  {
    slug: "subasree",
    title: "Subasree's Journey",
    category: "Sports & Youth Empowerment",

    journey: "Support → Training → Achievement",

    summary:
      "A journey highlighting how support, training and opportunity can help create meaningful change in an individual's life.",

    images: [
      {
        src: subasreeImage1,
        alt: "Subasree during her running journey",
      },
      {
        src: subasreeImage2,
        alt: "Subasree during training",
      },
      {
        src: subasreeImage3,
        alt: "Subasree sports activity",
      },
      {
        src: subasreeImage4,
        alt: "Subasree participating in running",
      },
      {
        src: subasreeImage5,
        alt: "Subasree achievement journey",
      },
      {
        src: subasreeImage6,
        alt: "Subasree sports achievement",
      },
    ],
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