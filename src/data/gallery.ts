/* ============================================================
   KNFT GALLERY DATA
   Kalam Nation First Trust
   ============================================================ */

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
  src: string;
};

export type VideoItem = {
  id: string;
  category: Exclude<GalleryCategory, "All">;
  title: string;
  poster?: string;
  url: string;
  aspectRatio?: "16:9" | "9:16";
};

/* ============================================================
   IMAGE LOADER
   ============================================================ */

const waterImages = import.meta.glob(
  "/src/assets/01 WATER RESTORATION/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const environmentImages = import.meta.glob(
  "/src/assets/13 TREE PLANTATION/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const disasterImages = import.meta.glob(
  "/src/assets/03 DISASTER RELIEF/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const bloodImages = import.meta.glob(
  "/src/assets/04 BLOOD DONATION/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const educationImages = import.meta.glob(
  "/src/assets/06 EDUCATION/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const youthImages = import.meta.glob(
  "/src/assets/08 CAREER SUPPORT/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const communityImages = import.meta.glob(
  "/src/assets/10 PROJECTS & IMPACT/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const eventImages = import.meta.glob(
  "/src/assets/GALLERY/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

/* ============================================================
   VIDEO LOADER
   ============================================================ */

const waterVideos = import.meta.glob(
  "/src/assets/01 WATER RESTORATION/**/*.mp4",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const environmentVideos = import.meta.glob(
  "/src/assets/13 TREE PLANTATION/**/*.mp4",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const communityVideos = import.meta.glob(
  "/src/assets/10 PROJECTS & IMPACT/**/*.mp4",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const eventVideos = import.meta.glob(
  "/src/assets/GALLERY/**/*.mp4",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const sportsVideos = import.meta.glob(
  "/src/assets/SPORTS/**/*.mp4",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

/* ============================================================
   HELPERS
   ============================================================ */

function getValues(
  assets: Record<string, string>,
): string[] {
  return Object.values(assets).filter(Boolean);
}

function getFileName(path: string): string {
  return path.split("/").pop()?.replace(/\.[^/.]+$/, "") ?? "";
}

/* ============================================================
   CATEGORY IMAGE ARRAYS
   ============================================================ */

const WATER = getValues(waterImages);

const ENVIRONMENT = getValues(environmentImages);

const DISASTER_RELIEF = getValues(disasterImages);

const BLOOD_DONATION = getValues(bloodImages);

const EDUCATION = getValues(educationImages);

const YOUTH = getValues(youthImages);

const COMMUNITY = getValues(communityImages);

const EVENTS = getValues(eventImages);

/* ============================================================
   CREATE GALLERY ITEMS
   ============================================================ */

function createGalleryItems(
  category: Exclude<GalleryCategory, "All">,
  images: string[],
  prefix: string,
): GalleryItem[] {
  return images.map((src, index) => ({
    id: `${prefix}-${index + 1}`,
    category,
    caption: `${category} Activity ${index + 1}`,
    src,
  }));
}

/* ============================================================
   GALLERY ITEMS
   ============================================================ */

export const galleryItems: GalleryItem[] = [
  /* ----------------------------------------------------------
     WATER
     ---------------------------------------------------------- */

  ...createGalleryItems(
    "Water",
    WATER,
    "water",
  ),

  /* ----------------------------------------------------------
     ENVIRONMENT
     ---------------------------------------------------------- */

  ...createGalleryItems(
    "Environment",
    ENVIRONMENT,
    "environment",
  ),

  /* ----------------------------------------------------------
     DISASTER RELIEF
     ---------------------------------------------------------- */

  ...createGalleryItems(
    "Disaster Relief",
    DISASTER_RELIEF,
    "disaster",
  ),

  /* ----------------------------------------------------------
     BLOOD DONATION
     ---------------------------------------------------------- */

  ...createGalleryItems(
    "Blood Donation",
    BLOOD_DONATION,
    "blood",
  ),

  /* ----------------------------------------------------------
     EDUCATION
     ---------------------------------------------------------- */

  ...createGalleryItems(
    "Education",
    EDUCATION,
    "education",
  ),

  /* ----------------------------------------------------------
     YOUTH / CAREER SUPPORT
     ---------------------------------------------------------- */

  ...createGalleryItems(
    "Youth",
    YOUTH,
    "youth",
  ),

  /* ----------------------------------------------------------
     SPORTS
     ----------------------------------------------------------

     Sports assets are loaded separately below because
     the folder contains Malkhamb, Karate and Running.
     ---------------------------------------------------------- */

  ...createGalleryItems(
    "Sports",
    [
      ...getValues(
        import.meta.glob(
          "/src/assets/SPORTS/**/*.jpg",
          {
            eager: true,
            query: "?url",
            import: "default",
          },
        ) as Record<string, string>,
      ),

      ...getValues(
        import.meta.glob(
          "/src/assets/SPORTS/**/*.jpeg",
          {
            eager: true,
            query: "?url",
            import: "default",
          },
        ) as Record<string, string>,
      ),

      ...getValues(
        import.meta.glob(
          "/src/assets/SPORTS/**/*.png",
          {
            eager: true,
            query: "?url",
            import: "default",
          },
        ) as Record<string, string>,
      ),
    ],
    "sports",
  ),

  /* ----------------------------------------------------------
     COMMUNITY
     ---------------------------------------------------------- */

  ...createGalleryItems(
    "Community",
    COMMUNITY,
    "community",
  ),

  /* ----------------------------------------------------------
     EVENTS
     ---------------------------------------------------------- */

  ...createGalleryItems(
    "Events",
    EVENTS,
    "events",
  ),
];

/* ============================================================
   VIDEO ITEMS
   ============================================================ */

export const videoItems: VideoItem[] = [
  /* ==========================================================
     WATER — LOCAL VIDEOS
     ========================================================== */

  ...Object.entries(waterVideos).map(([path, url], index) => ({
    id: `water-video-${index + 1}`,
    category: "Water" as const,
    title: getFileName(path),
    url,
    aspectRatio: "16:9" as const,
  })),

  /* ==========================================================
     ENVIRONMENT — LOCAL VIDEOS
     ========================================================== */

  ...Object.entries(environmentVideos).map(
    ([path, url], index) => ({
      id: `environment-video-${index + 1}`,
      category: "Environment" as const,
      title: getFileName(path),
      url,
      aspectRatio: "16:9" as const,
    }),
  ),

  /* ==========================================================
     COMMUNITY — LOCAL VIDEOS
     ========================================================== */

  ...Object.entries(communityVideos).map(
    ([path, url], index) => ({
      id: `community-video-${index + 1}`,
      category: "Community" as const,
      title: getFileName(path),
      url,
      aspectRatio: "16:9" as const,
    }),
  ),

  /* ==========================================================
     EVENTS — LOCAL VIDEOS
     ========================================================== */

  ...Object.entries(eventVideos).map(
    ([path, url], index) => ({
      id: `event-video-${index + 1}`,
      category: "Events" as const,
      title: getFileName(path),
      url,
      aspectRatio: "16:9" as const,
    }),
  ),

  /* ==========================================================
     SPORTS — LOCAL VIDEOS
     ========================================================== */

  ...Object.entries(sportsVideos).map(
    ([path, url], index) => ({
      id: `sports-video-${index + 1}`,
      category: "Sports" as const,
      title: getFileName(path),
      url,
      aspectRatio: "16:9" as const,
    }),
  ),

  /* ==========================================================
     WATER — YOUTUBE 16:9
     ========================================================== */

  {
    id: "water-youtube-1",
    category: "Water",
    title: "Murukeri Lake",
    url: "https://www.youtube.com/embed/Ntm5BAffvas",
    aspectRatio: "16:9",
  },

  {
    id: "water-youtube-2",
    category: "Water",
    title: "Muthampalayam Lake",
    url: "https://www.youtube.com/embed/QPLpPZTDf_E",
    aspectRatio: "16:9",
  },

  {
    id: "water-youtube-3",
    category: "Water",
    title: "Muthampalayam Lake Restoration",
    url: "https://www.youtube.com/embed/-hlDW3CoauY",
    aspectRatio: "16:9",
  },

  {
    id: "water-youtube-4",
    category: "Water",
    title: "Muthampalayam Lake",
    url: "https://www.youtube.com/embed/Zi6kv3pPDR8",
    aspectRatio: "16:9",
  },

  {
    id: "water-youtube-5",
    category: "Water",
    title: "Nanthan Kaalvaai Scheme",
    url: "https://www.youtube.com/embed/zPysaF4lNRk",
    aspectRatio: "16:9",
  },

  /* ==========================================================
     WATER — YOUTUBE SHORTS 9:16
     ========================================================== */

  {
    id: "water-short-1",
    category: "Water",
    title: "Tindivanam Lake — 1 Lakh Seeds Sowed",
    url: "https://www.youtube.com/embed/S575c64PrgY",
    aspectRatio: "9:16",
  },

  {
    id: "water-short-2",
    category: "Water",
    title: "Tindivanam Neeramaipu Kulu",
    url: "https://www.youtube.com/embed/58kVDVE7sp0",
    aspectRatio: "9:16",
  },

  {
    id: "water-short-3",
    category: "Water",
    title: "Murukkeri Lake — Journey Towards Restoration",
    url: "https://www.youtube.com/embed/0iqAtAs2A_E",
    aspectRatio: "9:16",
  },

  {
    id: "water-short-4",
    category: "Water",
    title: "Koliyanur Lake — Thamarai Seed Sowing",
    url: "https://www.youtube.com/embed/W7SJdIkyYZU",
    aspectRatio: "9:16",
  },

  {
    id: "water-short-5",
    category: "Water",
    title: "Ariyalur Lake — Before & After",
    url: "https://www.youtube.com/embed/n4q-bRpc4I8",
    aspectRatio: "9:16",
  },

  {
    id: "water-short-6",
    category: "Water",
    title: "Kakuppam Lake — Before & After",
    url: "https://www.youtube.com/embed/hIXwleFKx5s",
    aspectRatio: "9:16",
  },

  {
    id: "water-short-7",
    category: "Water",
    title: "Villupuram District Administration & Volunteers",
    url: "https://www.youtube.com/embed/2PEoDIPVOuE",
    aspectRatio: "9:16",
  },

  /* ==========================================================
     COMMUNITY — PARTNER / COLLABORATION VIDEO
     ========================================================== */

  {
    id: "community-short-1",
    category: "Community",
    title: "Infosys Partners with KNFT",
    url: "https://www.youtube.com/embed/j1yKZckLzFQ",
    aspectRatio: "9:16",
  },
];

/* ============================================================
   OPTIONAL HELPERS FOR GALLERY COMPONENT
   ============================================================ */

export function getGalleryItemsByCategory(
  category: GalleryCategory,
): GalleryItem[] {
  if (category === "All") {
    return galleryItems;
  }

  return galleryItems.filter(
    (item) => item.category === category,
  );
}

export function getVideosByCategory(
  category: GalleryCategory,
): VideoItem[] {
  if (category === "All") {
    return videoItems;
  }

  return videoItems.filter(
    (item) => item.category === category,
  );
}