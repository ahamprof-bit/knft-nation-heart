import type { LucideIcon } from "lucide-react";

import {
  Droplets,
  Leaf,
  LifeBuoy,
  HeartPulse,
  UtensilsCrossed,
  Rocket,
  GraduationCap,
  Trophy,
  Users,
} from "lucide-react";

import { driveMedia } from "@/data/driveMedia";

// =====================================================
// TYPES
// =====================================================

export type Programme = {
  slug: string;
  title: string;
  icon: LucideIcon;
  description: string;
  image: string;
};

// =====================================================
// GOOGLE DRIVE IMAGE HELPER
// =====================================================

// Converts a Google Drive file ID to a thumbnail URL.
// Use IDs for files shared as "Anyone with the link - Viewer".

const driveImage = (fileId: string) =>
  `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;

// =====================================================
// PROGRAMME IMAGES
// =====================================================

// Reuse the existing KNFT Google Drive media mapping.
// Update the property names below if your driveMedia.ts
// uses different names for these categories.

const programmeImages = {
  waterRestoration:
    driveMedia.waterRestoration?.[0] ??
    driveImage("1BdgKv85rIOfvFVaMyu8T9iiDLltIQUCb"),

  environment:
    driveMedia.environment?.[0] ??
    driveMedia.sports.running?.[0] ??
    driveImage("1gepyGtSwoQZdHgky4_wSKYZmJdE-DYgv"),

  disasterRelief:
    driveMedia.disasterRelief?.[0] ??
    driveImage("1hmdGWXcJREs2EpmpWv_Ld-kgOhcaAtZu"),

  bloodDonation:
    driveMedia.bloodDonation?.[0] ??
    driveImage("15mVnPPFQUOaimeHxiKTLjDAwSLMZM7Gw"),

  povertyHunger:
    driveMedia.povertyHunger?.[0] ??
    driveImage("1sH_wh0zZXPGm1-xOrbEYvLGh_5YLIZhe"),

  youthEmpowerment:
    driveMedia.youthEmpowerment?.[0] ??
    driveMedia.sports.running?.[0] ??
    driveImage("1gepyGtSwoQZdHgky4_wSKYZmJdE-DYgv"),

  education:
    driveMedia.education?.[0] ??
    driveImage("15mVnPPFQUOaimeHxiKTLjDAwSLMZM7Gw"),

  sportsArts:
    driveMedia.sports.running?.[0] ??
    driveImage("1gepyGtSwoQZdHgky4_wSKYZmJdE-DYgv"),

  communityDevelopment:
    driveMedia.communityDevelopment?.[0] ??
    driveImage("1sH_wh0zZXPGm1-xOrbEYvLGh_5YLIZhe"),
};

// =====================================================
// PROGRAMMES
// =====================================================

export const programmes: Programme[] = [
  {
    slug: "water-restoration",
    title: "Water Restoration",
    icon: Droplets,
    description:
      "Reviving lakes, ponds and traditional water bodies with community participation.",
    image: programmeImages.waterRestoration,
  },

  {
    slug: "environment-biodiversity",
    title: "Environment & Biodiversity",
    icon: Leaf,
    description:
      "Tree plantation, palm seed sowing, nurseries and habitat protection.",
    image: programmeImages.environment,
  },

  {
    slug: "disaster-relief",
    title: "Disaster Relief & Humanitarian Support",
    icon: LifeBuoy,
    description:
      "Volunteer response and relief support during emergencies.",
    image: programmeImages.disasterRelief,
  },

  {
    slug: "blood-donation",
    title: "Blood Donation",
    icon: HeartPulse,
    description:
      "Donor mobilisation and camps connecting people in need.",
    image: programmeImages.bloodDonation,
  },

  {
    slug: "poverty-hunger",
    title: "Poverty & Hunger Support",
    icon: UtensilsCrossed,
    description:
      "Food and essential support for families facing hardship.",
    image: programmeImages.povertyHunger,
  },

  {
    slug: "youth-empowerment",
    title: "Youth Empowerment",
    icon: Rocket,
    description:
      "Building confidence, skills and leadership opportunities for young people.",
    image: programmeImages.youthEmpowerment,
  },

  {
    slug: "education",
    title: "Education",
    icon: GraduationCap,
    description:
      "Learning support and training programmes for children.",
    image: programmeImages.education,
  },

  {
    slug: "sports-arts",
    title: "Sports & Traditional Arts",
    icon: Trophy,
    description:
      "Encouraging sports and keeping traditional arts alive.",
    image: programmeImages.sportsArts,
  },

  {
    slug: "community-development",
    title: "Community Development",
    icon: Users,
    description:
      "Local initiatives that strengthen everyday community life.",
    image: programmeImages.communityDevelopment,
  },
];
