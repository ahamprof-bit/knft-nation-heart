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

export type Programme = {
  slug: string;
  title: string;
  icon: LucideIcon;
  description: string;
};

export const programmes: Programme[] = [
  {
    slug: "water-restoration",
    title: "Water Restoration",
    icon: Droplets,
    description:
      "Reviving lakes, ponds and traditional water bodies with community participation.",
  },
  {
    slug: "environment-biodiversity",
    title: "Environment & Biodiversity",
    icon: Leaf,
    description:
      "Tree plantation, palm seed sowing, nurseries and habitat protection.",
  },
  {
    slug: "disaster-relief",
    title: "Disaster Relief & Humanitarian Support",
    icon: LifeBuoy,
    description: "Volunteer response and relief support during emergencies.",
  },
  {
    slug: "blood-donation",
    title: "Blood Donation",
    icon: HeartPulse,
    description: "Donor mobilisation and camps connecting people in need.",
  },
  {
    slug: "poverty-hunger",
    title: "Poverty & Hunger Support",
    icon: UtensilsCrossed,
    description: "Food and essential support for families facing hardship.",
  },
  {
    slug: "youth-empowerment",
    title: "Youth Empowerment",
    icon: Rocket,
    description: "Leadership, skills and volunteering pathways for young people.",
  },
  {
    slug: "education",
    title: "Education",
    icon: GraduationCap,
    description: "Learning support and training programmes for children.",
  },
  {
    slug: "sports-arts",
    title: "Sports & Traditional Arts",
    icon: Trophy,
    description: "Encouraging sports and keeping traditional arts alive.",
  },
  {
    slug: "community-development",
    title: "Community Development",
    icon: Users,
    description: "Local initiatives that strengthen everyday community life.",
  },
];
