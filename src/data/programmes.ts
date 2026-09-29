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

// =====================================================
// PROGRAMME IMAGES
// =====================================================

// Gallery images
import aboutImage1 from "@/assets/GALLERY/Polish_20250208_071036066.jpg";
import aboutImage2 from "@/assets/GALLERY/Polish_20250301_095608729.jpg";

// Muthampalayam Lake images
import lakeImage1 from "@/assets/01 WATER RESTORATION/lakes projects/MUTHAMPALAYAM LAKE IMAGES/IMG-20250628-WA0004.jpg";
import lakeImage2 from "@/assets/01 WATER RESTORATION/lakes projects/MUTHAMPALAYAM LAKE IMAGES/IMG-20250703-WA0032.jpg";

// Mallakhamb / Sports image
import malkhambImage from "@/assets/SPORTS/Malkhamb_/IMG20250416111608_01.jpg";
// =====================================================
// TYPE
// =====================================================

export type Programme = {
  slug: string;
  title: string;
  icon: LucideIcon;
  description: string;
  image: string;
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
    image: lakeImage1,
  },

  {
    slug: "environment-biodiversity",
    title: "Environment & Biodiversity",
    icon: Leaf,
    description:
      "Tree plantation, palm seed sowing, nurseries and habitat protection.",
    image: malkhambImage,
  },

  {
    slug: "disaster-relief",
    title: "Disaster Relief & Humanitarian Support",
    icon: LifeBuoy,
    description:
      "Volunteer response and relief support during emergencies.",
    image: aboutImage1,
  },

  {
    slug: "blood-donation",
    title: "Blood Donation",
    icon: HeartPulse,
    description:
      "Donor mobilisation and camps connecting people in need.",
    image: aboutImage2,
  },

  {
    slug: "poverty-hunger",
    title: "Poverty & Hunger Support",
    icon: UtensilsCrossed,
    description:
      "Food and essential support for families facing hardship.",
    image: lakeImage2,
  },

  {
    slug: "youth-empowerment",
    title: "Youth Empowerment",
    icon: Rocket,
    description:
      "Building confidence, skills and leadership opportunities for young people.",
    image: aboutImage1,
  },

  {
    slug: "education",
    title: "Education",
    icon: GraduationCap,
    description:
      "Learning support and training programmes for children.",
    image: aboutImage1,
  },

  {
    slug: "sports-arts",
    title: "Sports & Traditional Arts",
    icon: Trophy,
    description:
      "Encouraging sports and keeping traditional arts alive.",
    image: malkhambImage,
  },

  {
    slug: "community-development",
    title: "Community Development",
    icon: Users,
    description:
      "Local initiatives that strengthen everyday community life.",
    image: lakeImage2,
  },
];