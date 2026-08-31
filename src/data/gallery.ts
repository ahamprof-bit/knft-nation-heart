export const galleryCategories = [
  "All",
  "Water",
  "Environment",
  "Disaster Relief",
  "Blood Donation",
  "Education",
  "Youth",
  "Sports",
  "Community",
  "Events",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryItem = {
  id: string;
  category: Exclude<GalleryCategory, "All">;
  caption: string;
  src: string; // empty => placeholder rendered
};

const cats: Exclude<GalleryCategory, "All">[] = [
  "Water",
  "Environment",
  "Disaster Relief",
  "Blood Donation",
  "Education",
  "Youth",
  "Sports",
  "Community",
  "Events",
];

export const galleryItems: GalleryItem[] = cats.flatMap((category, i) =>
  Array.from({ length: 2 }, (_, j) => ({
    id: `g-${i}-${j}`,
    category,
    caption: `${category} — Photo Coming Soon`,
    src: "",
  })),
);

export type VideoItem = {
  id: string;
  title: string;
  poster: string;
  url: string; // future Cloudinary URL
};

export const videoItems: VideoItem[] = [
  { id: "v1", title: "Project Video", poster: "", url: "" },
  { id: "v2", title: "Community Activity", poster: "", url: "" },
  { id: "v3", title: "Environmental Work", poster: "", url: "" },
];
