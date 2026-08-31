export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  status: string;
  highlights: string[];
  overview: string;
  challenge: string;
  action: string;
  participation: string;
  impact: string;
  gallery: string[];
  video: string;
};

const TBD = "Content Coming Soon";

export const projects: Project[] = [
  {
    slug: "muthambalayam-lake-restoration",
    title: "Muthambalayam Lake Restoration",
    category: "Water Restoration",
    location: TBD,
    status: TBD,
    highlights: ["170-acre lake", "Water restoration", "Community transformation"],
    overview: TBD,
    challenge: TBD,
    action: TBD,
    participation: TBD,
    impact: TBD,
    gallery: ["", "", ""],
    video: "",
  },
  {
    slug: "koliyanur-lake-restoration",
    title: "Koliyanur Lake Restoration",
    category: "Water Restoration",
    location: TBD,
    status: TBD,
    highlights: ["37-acre lake", "Restoration", "Environmental improvement"],
    overview: TBD,
    challenge: TBD,
    action: TBD,
    participation: TBD,
    impact: TBD,
    gallery: ["", "", ""],
    video: "",
  },
  {
    slug: "plastic-waste-transformation",
    title: "Plastic Waste Transformation",
    category: "Environment & Biodiversity",
    location: TBD,
    status: TBD,
    highlights: ["Waste removal", "Nursery development", "Environmental restoration"],
    overview: TBD,
    challenge: TBD,
    action: TBD,
    participation: TBD,
    impact: TBD,
    gallery: ["", "", ""],
    video: "",
  },
  {
    slug: "nursery-development",
    title: "Nursery Development",
    category: "Environment & Biodiversity",
    location: TBD,
    status: TBD,
    highlights: ["1-acre nursery", "2,000+ seedlings", "Community plantation"],
    overview: TBD,
    challenge: TBD,
    action: TBD,
    participation: TBD,
    impact: TBD,
    gallery: ["", "", ""],
    video: "",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
