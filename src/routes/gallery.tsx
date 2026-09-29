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

import { VideoPlaceholder } from "@/components/placeholders";
import {
  PageHero,
  Section,
  SectionHeading,
} from "@/components/ui-kit";

/* ============================================================
   LOAD ALL IMAGES FROM NEW FOLDER
   ============================================================ */

const knftImages = import.meta.glob(
  "/src/assets/new folder/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
) as Record<string, string>;

/* ============================================================
   IMAGE RESOLVER
   ============================================================ */

function resolveGalleryImage(src?: string) {
  if (!src) return undefined;

  // Already a URL
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:")
  ) {
    return src;
  }

  // Normalize path
  const normalizedSrc = src
    .replace(/\\/g, "/")
    .replace(/^.*?new folder\//i, "");

  // Exact path match
  const exactMatch = Object.entries(knftImages).find(
    ([path]) => {
      const normalizedPath = path
        .replace(/\\/g, "/")
        .replace(/^.*?new folder\//i, "");

      return (
        normalizedPath.toLowerCase() ===
        normalizedSrc.toLowerCase()
      );
    },
  );

  if (exactMatch) {
    return exactMatch[1];
  }

  // Filename match
  const filename = normalizedSrc
    .split("/")
    .pop()
    ?.toLowerCase();

  if (!filename) return undefined;

  const filenameMatch = Object.entries(knftImages).find(
    ([path]) => {
      const currentFilename = path
        .replace(/\\/g, "/")
        .split("/")
        .pop()
        ?.toLowerCase();

      return currentFilename === filename;
    },
  );

  return filenameMatch?.[1];
}

/* ============================================================
   FALLBACK IMAGE
   ============================================================ */

const fallbackGalleryImage =
  resolveGalleryImage(
    "01 WATER RESTORATION/01 – Best Photos/1759853647390.jpg",
  ) ?? Object.values(knftImages)[0];

/* ============================================================
   NEW FOLDER GALLERY ITEMS
   ============================================================ */

type NewFolderGalleryItem = {
  id: string;
  src: string;
  caption: string;
  category: GalleryCategory;
};

/*
 * All automatically discovered images are placed under "All".
 *
 * Caption is intentionally empty so filenames are NEVER shown.
 */

const newFolderGalleryItems: NewFolderGalleryItem[] =
  Object.entries(knftImages).map(
    ([, src], index) => ({
      id: `new-folder-image-${index}`,
      src,
      caption: "",
      category: "All" as GalleryCategory,
    }),
  );

/* ============================================================
   COMBINE EXISTING + NEW IMAGES
   ============================================================ */

const allGalleryItems = [
  ...galleryItems,
  ...newFolderGalleryItems,
];

/* ============================================================
   ROUTE
   ============================================================ */

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      {
        title: "Gallery — Photos & Videos | KNFT",
      },
      {
        name: "description",
        content:
          "Photo and video gallery of KNFT's water restoration, environment, relief, education and community programmes.",
      },
      {
        property: "og:title",
        content: "KNFT Gallery",
      },
      {
        property: "og:description",
        content:
          "Photos and videos from KNFT's community work.",
      },
    ],
  }),

  component: Gallery,
});

/* ============================================================
   GALLERY IMAGE
   ============================================================ */

function GalleryImage({
  src,
  alt,
  ratio = "aspect-[4/3]",
  className = "",
}: {
  src?: string;
  alt: string;
  ratio?: string;
  className?: string;
}) {
  const imageSrc =
    resolveGalleryImage(src) ??
    src ??
    fallbackGalleryImage;

  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-xl
        bg-muted
        ${ratio}
        ${className}
      `}
    >
      {imageSrc ? (
        <>
          <img
            src={imageSrc}
            alt={alt}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
            loading="lazy"
            decoding="async"
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/35
              via-transparent
              to-transparent
              opacity-70
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
          />
        </>
      ) : (
        <div
          className="
            flex
            h-full
            w-full
            items-center
            justify-center
            text-sm
            text-muted-foreground
          "
        >
          Image Coming Soon
        </div>
      )}
    </div>
  );
}

/* ============================================================
   GALLERY PAGE
   ============================================================ */

function Gallery() {
  const [active, setActive] =
    useState<GalleryCategory>("All");

  const [lightbox, setLightbox] =
    useState<{
      src: string;
      caption: string;
    } | null>(null);

  /* ==========================================================
     FILTER GALLERY
     ========================================================== */

  const items = useMemo(() => {
    /*
     * ALL:
     * Existing gallery images + every image
     * inside src/assets/new folder.
     */
    if (active === "All") {
      return allGalleryItems;
    }

    /*
     * OTHER CATEGORIES:
     * Keep the existing gallery category
     * behaviour exactly as before.
     */
    return galleryItems.filter(
      (item) => item.category === active,
    );
  }, [active]);

  return (
    <>
      {/* ======================================================
          PAGE HERO
          ====================================================== */}

      <PageHero
        eyebrow="Gallery"
        title="Moments from the field"
        subtitle="Real moments from KNFT's community, environmental and social initiatives."
      />

      {/* ======================================================
          PHOTO GALLERY
          ====================================================== */}

      <Section>
        {/* ====================================================
            CATEGORY FILTERS
            ==================================================== */}

        <div className="flex flex-wrap gap-2">
          {galleryCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() =>
                setActive(category)
              }
              className={`
                rounded-full
                border
                px-4
                py-2
                text-sm
                font-medium
                transition-all
                duration-200
                ${
                  active === category
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-background text-foreground/75 hover:bg-secondary hover:text-primary"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ====================================================
            PHOTO COUNT
            ==================================================== */}

        <p className="mt-5 text-sm text-muted-foreground">
          {items.length}{" "}
          {items.length === 1
            ? "photo"
            : "photos"}
        </p>

        {/* ====================================================
            PHOTO GRID
            ==================================================== */}

        <motion.div
          layout
          className="
            mt-10
            grid
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => {
              const imageSrc =
                resolveGalleryImage(item.src) ??
                item.src ??
                fallbackGalleryImage;

              return (
                <motion.button
                  key={`${item.id}-${index}`}
                  layout
                  type="button"
                  onClick={() => {
                    if (imageSrc) {
                      setLightbox({
                        src: imageSrc,
                        caption: "",
                      });
                    }
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className="
                    group
                    rounded-xl
                    text-left
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-ring
                    focus-visible:ring-offset-2
                  "
                  aria-label="Open image"
                >
                  <GalleryImage
                    src={imageSrc}
                    alt="KNFT community activity"
                    ratio="aspect-[4/3]"
                  />
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ====================================================
            EMPTY STATE
            ==================================================== */}

        {items.length === 0 && (
          <div
            className="
              mt-10
              rounded-2xl
              border
              border-dashed
              border-border
              p-12
              text-center
            "
          >
            <p className="text-muted-foreground">
              No photographs available in
              this category yet.
            </p>
          </div>
        )}
      </Section>

      {/* ======================================================
          VIDEO GALLERY
          ====================================================== */}

      <Section tone="muted">
        <SectionHeading
          eyebrow="Video Gallery"
          title="Watch the work"
          subtitle="Videos from KNFT's field activities, awareness programmes and community initiatives."
        />

        <div
          className="
            mt-10
            grid
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {videoItems.map((video) => (
            <div
              key={video.id}
              className="
                surface-card
                overflow-hidden
                p-4
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lift
              "
            >
              <VideoPlaceholder
                url={
                  video.url || undefined
                }
                poster={
                  video.poster
                    ? resolveGalleryImage(
                        video.poster,
                      )
                    : undefined
                }
                label="KNFT VIDEO"
              />

              <p className="mt-3 px-1 text-sm font-semibold">
                {video.title}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ======================================================
          LIGHTBOX
          ====================================================== */}

      <AnimatePresence>
        {lightbox ? (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[80]
              flex
              items-center
              justify-center
              bg-charcoal/90
              p-4
              sm:p-6
            "
            onClick={() =>
              setLightbox(null)
            }
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
          >
            <motion.div
              initial={{
                scale: 0.95,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.95,
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="
                relative
                w-full
                max-w-5xl
              "
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              {/* CLOSE BUTTON */}

              <button
                type="button"
                onClick={() =>
                  setLightbox(null)
                }
                aria-label="Close image"
                className="
                  absolute
                  right-3
                  top-3
                  z-10
                  inline-flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/30
                  bg-black/50
                  text-white
                  backdrop-blur-md
                  transition-colors
                  hover:bg-black/70
                "
              >
                <X className="h-5 w-5" />
              </button>

              {/* IMAGE */}

              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  bg-black
                  shadow-2xl
                "
              >
                <img
                  src={lightbox.src}
                  alt="KNFT gallery image"
                  className="
                    max-h-[85vh]
                    w-full
                    object-contain
                  "
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}