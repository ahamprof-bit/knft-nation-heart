
/* ============================================================
   KNFT PROJECTS + OUR WORK DATA
   ============================================================ */

export type MediaVideo = {
  id: string;
  title: string;
  aspect: "16:9" | "9:16";
};

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

  /*
   * Used by the UI to identify whether this is:
   * - an Our Work category
   * - an individual project
   */
  kind: "work-area" | "project";

  /*
   * Folder keywords used by import.meta.glob()
   * to find ONLY the correct media.
   */
  mediaTerms: string[];

  /*
   * YouTube videos belonging ONLY to this item.
   */
  youtubeVideos?: MediaVideo[];
};

const TBD = "Content Coming Soon";

/* ============================================================
   OUR WORK — 9 CATEGORIES
   ============================================================ */

export const workAreas: Project[] = [
  {
    kind: "work-area",
    slug: "water-restoration",
    title: "Water Restoration",
    category: "Water Restoration",
    location: "Tamil Nadu",
    status: "Active",

    highlights: [
      "Lake restoration",
      "Water conservation",
      "Community participation",
    ],

    overview:
      "Reviving lakes, ponds and traditional water bodies with community participation.",

    challenge:
      "Water bodies require sustained restoration, protection and community involvement.",

    action:
      "KNFT supports restoration-focused community initiatives around lakes, ponds and water systems.",

    participation:
      "Volunteers and local communities contribute to on-ground restoration and awareness activities.",

    impact:
      "Water restoration initiatives aim to strengthen local water ecosystems and community resilience.",

    gallery: [],
    video: "",

    mediaTerms: ["01 water restoration"],

    youtubeVideos: [
      {
        id: "Ntm5BAffvas",
        title: "Murukeri Lake | முருக்கேரி ஏரி",
        aspect: "16:9",
      },
      {
        id: "QPLpPZTDf_E",
        title: "Muthampalayam News | Muthampalayam Lake",
        aspect: "16:9",
      },
      {
        id: "-hlDW3CoauY",
        title: "Muthampalayam Lake",
        aspect: "16:9",
      },
      {
        id: "Zi6kv3pPDR8",
        title: "Muthampalayam Lake",
        aspect: "16:9",
      },
      {
        id: "zPysaF4lNRk",
        title: "Nanthan Kaalvaai Scheme",
        aspect: "16:9",
      },
      {
        id: "S575c64PrgY",
        title: "Tindivanam Lake — 1 Lakh Seeds Sowed",
        aspect: "9:16",
      },
      {
        id: "58kVDVE7sp0",
        title: "Tindivanam Neeramaipu Kulu",
        aspect: "9:16",
      },
      {
        id: "0iqAtAs2A_E",
        title: "Murukkeri Lake — Journey Towards Restoration",
        aspect: "9:16",
      },
      {
        id: "W7SJdIkyYZU",
        title: "Koliyanur Lake — Thamarai Seed Sowed",
        aspect: "9:16",
      },
      {
        id: "n4q-bRpc4I8",
        title: "Ariyalur Lake — Before & After Transformation",
        aspect: "9:16",
      },
      {
        id: "hIXwleFKx5s",
        title: "Kakuppam Lake — Before vs After",
        aspect: "9:16",
      },
      {
        id: "2PEoDIPVOuE",
        title:
          "Villupuram District Administration, Municipality & Volunteers",
        aspect: "9:16",
      },
    ],
  },

  {
    kind: "work-area",
    slug: "environment-biodiversity",
    title: "Environment & Biodiversity",
    category: "Environment & Biodiversity",
    location: "Tamil Nadu",
    status: "Active",

    highlights: [
      "Tree plantation",
      "Palm seed sowing",
      "Nursery development",
    ],

    overview:
      "Tree plantation, palm seed sowing, nurseries and habitat protection.",

    challenge:
      "Environmental protection requires long-term participation and consistent community action.",

    action:
      "KNFT undertakes plantation and environmental initiatives using volunteer participation.",

    participation:
      "Community members and volunteers participate in plantation and environmental activities.",

    impact:
      "The work contributes to greener surroundings and stronger environmental awareness.",

    gallery: [],
    video: "",

    mediaTerms: ["13 tree plantation"],
  },

  {
    kind: "work-area",
    slug: "disaster-relief-humanitarian-support",
    title: "Disaster Relief & Humanitarian Support",
    category: "Disaster Relief & Humanitarian Support",
    location: "Tamil Nadu",
    status: "Active",

    highlights: [
      "Emergency response",
      "Relief support",
      "Volunteer mobilisation",
    ],

    overview:
      "Volunteer response and relief support during emergencies.",

    challenge:
      "Emergencies can create immediate needs for affected families and communities.",

    action:
      "KNFT volunteers participate in relief-oriented activities during emergency situations.",

    participation:
      "Volunteers support collection, coordination and distribution activities where required.",

    impact:
      "Relief initiatives are intended to provide practical support to people affected by emergencies.",

    gallery: [],
    video: "",

    mediaTerms: ["03 disaster relief"],
  },

  {
    kind: "work-area",
    slug: "blood-donation",
    title: "Blood Donation",
    category: "Blood Donation",
    location: "Tamil Nadu",
    status: "Active",

    highlights: [
      "Blood donor mobilisation",
      "Donation camps",
      "Community awareness",
    ],

    overview:
      "Donor mobilisation and camps connecting people in need.",

    challenge:
      "Patients requiring blood depend on timely availability and willing donors.",

    action:
      "KNFT supports blood donation activities and donor mobilisation initiatives.",

    participation:
      "Volunteers help connect donors, coordinate activities and encourage community participation.",

    impact:
      "Blood donation initiatives help strengthen community participation in supporting patients in need.",

    gallery: [],
    video: "",

    mediaTerms: ["04 blood donation"],
  },

  {
    kind: "work-area",
    slug: "poverty-hunger-support",
    title: "Poverty & Hunger Support",
    category: "Poverty & Hunger Support",
    location: "Tamil Nadu",
    status: "Active",

    highlights: [
      "Food support",
      "Essential assistance",
      "Community support",
    ],

    overview:
      "Food and essential support for families facing hardship.",

    challenge:
      "Families facing hardship may require immediate food and essential support.",

    action:
      "KNFT supports community-oriented assistance initiatives where documented and organised.",

    participation:
      "Volunteers and supporters can contribute through community support activities.",

    impact:
      "The programme focuses on practical assistance for people facing hardship.",

    gallery: [],
    video: "",

    /*
     * No confirmed dedicated poverty/hunger image folder
     * was identified in the supplied asset inventory.
     *
     * IMPORTANT:
     * We intentionally do NOT use another category's image.
     */
    mediaTerms: [],
  },

  {
    kind: "work-area",
    slug: "youth-empowerment",
    title: "Youth Empowerment",
    category: "Youth Empowerment",
    location: "Tamil Nadu",
    status: "Active",

    highlights: [
      "Career support",
      "Skills development",
      "Youth opportunities",
    ],

    overview:
      "Building confidence, skills and leadership opportunities for young people.",

    challenge:
      "Young people benefit from access to learning, skills and opportunities that support their development.",

    action:
      "KNFT's youth-focused work includes career-support and community initiatives.",

    participation:
      "Young people, volunteers and community members can participate in development-oriented activities.",

    impact:
      "The programme aims to support youth confidence, skills and opportunities.",

    gallery: [],
    video: "",

    mediaTerms: ["08 career support"],
  },

  {
    kind: "work-area",
    slug: "education",
    title: "Education",
    category: "Education",
    location: "Tamil Nadu",
    status: "Active",

    highlights: [
      "Learning support",
      "Student activities",
      "Training programmes",
    ],

    overview:
      "Learning support and training programmes for children.",

    challenge:
      "Children and students benefit from continued access to learning support and development opportunities.",

    action:
      "KNFT supports education-oriented activities and learning initiatives.",

    participation:
      "Volunteers and supporters can contribute to education and student-focused programmes.",

    impact:
      "Education initiatives are focused on supporting children's learning and development.",

    gallery: [],
    video: "",

    mediaTerms: ["06 education"],
  },

  {
    kind: "work-area",
    slug: "sports-traditional-arts",
    title: "Sports & Traditional Arts",
    category: "Sports & Traditional Arts",
    location: "Tamil Nadu",
    status: "Active",

    highlights: [
      "Mallakhamb",
      "Karate",
      "Running & sports",
    ],

    overview:
      "Encouraging sports and keeping traditional arts alive.",

    challenge:
      "Sports and traditional disciplines need continued participation and visibility among younger generations.",

    action:
      "KNFT supports sports and traditional-art activities including Mallakhamb, Karate and running-related initiatives.",

    participation:
      "Young people and community members participate through sports and traditional-art activities.",

    impact:
      "These activities encourage participation, discipline and continued interest in traditional practices.",

    gallery: [],
    video: "",

    mediaTerms: ["sports"],
  },

  {
    kind: "work-area",
    slug: "community-development",
    title: "Community Development",
    category: "Community Development",
    location: "Tamil Nadu",
    status: "Active",

    highlights: [
      "Local initiatives",
      "Volunteer participation",
      "Community support",
    ],

    overview:
      "Local initiatives that strengthen everyday community life.",

    challenge:
      "Communities often require coordinated local participation to address practical needs.",

    action:
      "KNFT supports community-oriented initiatives driven by volunteers and local participation.",

    participation:
      "Community members and volunteers contribute to local activities and initiatives.",

    impact:
      "The programme focuses on strengthening local participation and community life.",

    gallery: [],
    video: "",

    /*
     * No dedicated community-development folder was confirmed
     * in the supplied asset inventory.
     *
     * No unrelated image is used.
     */
    mediaTerms: [],
  },
];

/* ============================================================
   WATER RESTORATION PROJECTS
   ============================================================ */

const waterProjects: Project[] = [
  {
    kind: "project",
    slug: "muthambalayam-lake-restoration",
    title: "Muthampalayam Lake Restoration",
    category: "Water Restoration",
    location: "Muthampalayam",
    status: TBD,

    highlights: [
      "170-acre lake",
      "Water restoration",
      "Community transformation",
    ],

    overview: TBD,
    challenge: TBD,
    action: TBD,
    participation: TBD,
    impact: TBD,

    gallery: [],
    video: "",

    mediaTerms: ["muthampalayam lake images"],

    youtubeVideos: [
      {
        id: "QPLpPZTDf_E",
        title: "Muthampalayam News | Muthampalayam Lake",
        aspect: "16:9",
      },
      {
        id: "-hlDW3CoauY",
        title: "Muthampalayam Lake",
        aspect: "16:9",
      },
      {
        id: "Zi6kv3pPDR8",
        title: "Muthampalayam Lake",
        aspect: "16:9",
      },
    ],
  },

  {
    kind: "project",
    slug: "koliyanur-lake-restoration",
    title: "Koliyanur Lake Restoration",
    category: "Water Restoration",
    location: "Koliyanur",
    status: TBD,

    highlights: [
      "Lake restoration",
      "Restoration",
      "Environmental improvement",
    ],

    overview: TBD,
    challenge: TBD,
    action: TBD,
    participation: TBD,
    impact: TBD,

    gallery: [],
    video: "",

    mediaTerms: ["koliyanur lake"],

    youtubeVideos: [
      {
        id: "W7SJdIkyYZU",
        title: "Koliyanur Lake — Thamarai Seed Sowed",
        aspect: "9:16",
      },
    ],
  },

  {
    kind: "project",
    slug: "aadur-malavanthangal-lake-restoration",
    title: "Aadur Malavanthangal Lake Restoration",
    category: "Water Restoration",
    location: "Aadur Malavanthangal",
    status: TBD,

    highlights: [
      "Lake restoration",
      "Desilting",
      "Community-led initiative",
    ],

    overview: TBD,
    challenge: TBD,
    action: TBD,
    participation: TBD,
    impact: TBD,

    gallery: [],
    video: "",

    mediaTerms: ["aadur malavanthanngal lake"],
  },

  {
    kind: "project",
    slug: "erumananthangal-lake-restoration",
    title: "Erumananthangal Lake Restoration",
    category: "Water Restoration",
    location: "Erumananthangal",
    status: TBD,

    highlights: [
      "Lake restoration",
      "Water conservation",
      "Local community support",
    ],

    overview: TBD,
    challenge: TBD,
    action: TBD,
    participation: TBD,
    impact: TBD,

    gallery: [],
    video: "",

    mediaTerms: ["erumananthangal lake"],
  },

  {
    kind: "project",
    slug: "kakuppam-lake-restoration",
    title: "Kakuppam Lake Restoration",
    category: "Water Restoration",
    location: "Kakuppam",
    status: TBD,

    highlights: [
      "Lake restoration",
      "Desilting",
      "Groundwater recharge",
    ],

    overview: TBD,
    challenge: TBD,
    action: TBD,
    participation: TBD,
    impact: TBD,

    gallery: [],
    video: "",

    mediaTerms: ["kakuppam lake"],

    youtubeVideos: [
      {
        id: "hIXwleFKx5s",
        title: "Kakuppam Lake — Before vs After",
        aspect: "9:16",
      },
    ],
  },

  {
    kind: "project",
    slug: "murukkeri-lake-restoration",
    title: "Murukkeri Lake Restoration, Marakanam",
    category: "Water Restoration",
    location: "Marakanam",
    status: TBD,

    highlights: [
      "Lake restoration",
      "Marakanam region",
      "Restoration documentation",
    ],

    overview: TBD,
    challenge: TBD,
    action: TBD,
    participation: TBD,
    impact: TBD,

    gallery: [],
    video: "",

    mediaTerms: ["murukkeri lake"],

    youtubeVideos: [
      {
        id: "Ntm5BAffvas",
        title: "Murukeri Lake | முருக்கேரி ஏரி",
        aspect: "16:9",
      },
      {
        id: "0iqAtAs2A_E",
        title: "Murukkeri Lake — Journey Towards Restoration",
        aspect: "9:16",
      },
    ],
  },

  {
    kind: "project",
    slug: "nanthan-kaalvaai-scheme",
    title: "Nanthan Kaalvaai Scheme",
    category: "Water Restoration",
    location: "Nanthan Kaalvaai",
    status: TBD,

    highlights: [
      "Canal/waterway restoration",
      "Irrigation support",
      "Community initiative",
    ],

    overview: TBD,
    challenge: TBD,
    action: TBD,
    participation: TBD,
    impact: TBD,

    gallery: [],
    video: "",

    mediaTerms: ["nanthan kaalvaai scheme"],

    youtubeVideos: [
      {
        id: "zPysaF4lNRk",
        title: "Nanthan Kaalvaai Scheme",
        aspect: "16:9",
      },
    ],
  },

  {
    kind: "project",
    slug: "tindivanam-thulkar-kulam-restoration",
    title: "Tindivanam Thulkar Kulam Restoration",
    category: "Water Restoration",
    location: "Tindivanam",
    status: TBD,

    highlights: [
      "Pond restoration",
      "Tindivanam region",
      "Water conservation",
    ],

    overview: TBD,
    challenge: TBD,
    action: TBD,
    participation: TBD,
    impact: TBD,

    gallery: [],
    video: "",

    mediaTerms: ["tindivanam thulkar kulam"],

    youtubeVideos: [
      {
        id: "S575c64PrgY",
        title: "Tindivanam Lake — 1 Lakh Seeds Sowed",
        aspect: "9:16",
      },
      {
        id: "58kVDVE7sp0",
        title: "Tindivanam Neeramaipu Kulu",
        aspect: "9:16",
      },
    ],
  },
];

/* ============================================================
   ALL PROJECT DATA
   ============================================================ */

export const projects: Project[] = [
  ...workAreas,
  ...waterProjects,
];

/* ============================================================
   HELPERS
   ============================================================ */

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const getWorkArea = (slug: string) =>
  workAreas.find((project) => project.slug === slug);

export const getWaterProjects = () =>
  projects.filter(
    (project) =>
      project.kind === "project" &&
      project.category === "Water Restoration",
  );
