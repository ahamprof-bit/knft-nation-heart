import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  galleryCategories,
  galleryItems,
  videoItems,
  type GalleryCategory,
} from "@/data/gallery";
import { ImagePlaceholder, VideoPlaceholder } from "@/components/placeholders";
import { PageHero, Section, SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Photos & Videos | KNFT" },
      {
        name: "description",
        content:
          "Photo and video gallery of KNFT's water restoration, environment, relief, education and community programmes.",
      },
      { property: "og:title", content: "KNFT Gallery" },
      { property: "og:description", content: "Photos and videos from KNFT's community work." },
    ],
  }),
  component: Gallery;
});

function Gallery() {
  return null;
}
