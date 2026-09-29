/* ============================================================
   KNFT PARTNERS DATA
   Kalam Nation First Trust
   ============================================================ */

/* ============================================================
   ABAYA FOUNDATION
   ============================================================ */

import abayaLogo from "@/assets/PARTNERS/Abaya foundation/LOGO.jpeg";

import abaya1 from "@/assets/PARTNERS/Abaya foundation/WhatsApp Image 2026-09-25 at 22.22.09.jpeg";

import abaya2 from "@/assets/PARTNERS/Abaya foundation/WhatsApp Image 2026-09-25 at 22.22.10 (1).jpeg";

import abaya3 from "@/assets/PARTNERS/Abaya foundation/WhatsApp Image 2026-09-25 at 22.22.10.jpeg";

/* ============================================================
   INFOSYS
   ============================================================ */

import infosysLogo from "@/assets/PARTNERS/Infosys/logo.jpeg";

import infosys1 from "@/assets/PARTNERS/Infosys/WhatsApp Image 2026-09-25 at 23.44.34.jpeg";

import infosys2 from "@/assets/PARTNERS/Infosys/WhatsApp Image 2026-09-25 at 23.44.35.jpeg";

import infosys3 from "@/assets/PARTNERS/Infosys/WhatsApp Image 2026-09-25 at 23.44.36.jpeg";

/* ============================================================
   MN GAYATHRI CHARITIES
   ============================================================ */

import mnLogo from "@/assets/PARTNERS/MN gayathri charities/LOGO.jpeg";

import mn1 from "@/assets/PARTNERS/MN gayathri charities/WhatsApp Image 2026-09-25 at 22.29.52.jpeg";

import mn2 from "@/assets/PARTNERS/MN gayathri charities/WhatsApp Image 2026-09-25 at 22.29.53.jpeg";

import mn3 from "@/assets/PARTNERS/MN gayathri charities/WhatsApp Image 2026-09-25 at 22.29.54.jpeg";

import mnLakeVideo from "@/assets/PARTNERS/MN gayathri charities/Muthayampalayamm lake done by mn charity.mp4";

import mnVideo from "@/assets/PARTNERS/MN gayathri charities/WhatsApp Video 2026-09-25 at 22.36.54.mp4";

/* ============================================================
   NDSO
   ============================================================ */

import ndsoLogo from "@/assets/PARTNERS/NDSO/LOGO.jpeg";

import ndso1 from "@/assets/PARTNERS/NDSO/WhatsApp Image 2026-09-25 at 22.31.24.jpeg";

import ndso2 from "@/assets/PARTNERS/NDSO/WhatsApp Image 2026-09-25 at 22.31.25.jpeg";

/* ============================================================
   GENERAL PARTNER SECTION VIDEOS
   ============================================================ */

import partnersHorizontalVideo from "@/assets/PARTNERS/videos to play in this section/horiz.mp4";

import partnersVerticalVideo from "@/assets/PARTNERS/videos to play in this section/verti.mp4";

/* ============================================================
   PARTNER TYPE
   ============================================================ */

export type Partner = {
  id: string;

  name: string;

  logo: string;

  description: string;

  category: string;

  images?: string[];

  videos?: string[];
};

/* ============================================================
   PARTNERS
   ============================================================ */

export const partners: Partner[] = [
  /* ==========================================================
     ABAYA FOUNDATION
     ========================================================== */

  {
    id: "abaya-foundation",

    name: "Abaya Foundation",

    logo: abayaLogo,

    description:
      "Abaya Foundation is one of the organisations featured among KNFT's partners and collaborators.",

    category: "Community Partner",

    images: [
      abaya1,
      abaya2,
      abaya3,
    ],

    videos: [],
  },

  /* ==========================================================
     INFOSYS
     ========================================================== */

  {
    id: "infosys",

    name: "Infosys",

    logo: infosysLogo,

    description:
      "Infosys is featured among KNFT's partner and collaboration initiatives.",

    category: "CSR Partner",

    images: [
      infosys1,
      infosys2,
      infosys3,
    ],

    videos: [],
  },

  /* ==========================================================
     MN GAYATHRI CHARITIES
     ========================================================== */

  {
    id: "mn-gayathri-charities",

    name: "MN Gayathri Charities",

    logo: mnLogo,

    description:
      "MN Gayathri Charities is featured among KNFT's community and environmental collaboration initiatives.",

    category: "Charity Partner",

    images: [
      mn1,
      mn2,
      mn3,
    ],

    videos: [
      mnLakeVideo,
      mnVideo,
    ],
  },

  /* ==========================================================
     NDSO
     ========================================================== */

  {
    id: "ndso",

    name: "NDSO",

    logo: ndsoLogo,

    description:
      "NDSO is featured among the organisations and collaborators associated with KNFT.",

    category: "Community Partner",

    images: [
      ndso1,
      ndso2,
    ],

    videos: [],
  },
];

/* ============================================================
   GENERAL PARTNER SECTION MEDIA
   ============================================================ */

export const partnerSectionVideos = {
  horizontal: partnersHorizontalVideo,

  vertical: partnersVerticalVideo,
};

/* ============================================================
   HELPER
   ============================================================ */

export function getPartnerById(
  id: string,
): Partner | undefined {
  return partners.find(
    (partner) => partner.id === id,
  );
}