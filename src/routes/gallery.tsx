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
  component: Gallery,
});

function Gallery() {
  const [active, setActive] = useState<GalleryCategory>("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const items = useMemo(
    () => (active === "All" ? galleryItems : galleryItems.filter((i) => i.category === active)),
    [active],
  );

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments from the field"
        subtitle="Client photographs and videos will replace these placeholders."
      />

      <Section>
        <div className="flex flex-wrap gap-2">
          {galleryCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground/75 hover:bg-secondary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.button
                key={item.id}
                layout
                type="button"
                onClick={() => setLightbox(item.caption)}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
              >
                <ImagePlaceholder
                  src={item.src || undefined}
                  ratio="aspect-[4/3]"
                  className="transition-transform group-hover:scale-[1.01]"
                />
                <p className="mt-2 text-sm text-muted-foreground">{item.caption}</p>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Video Gallery"
          title="Watch the work"
          subtitle="Video components are ready for Cloudinary URLs."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videoItems.map((v) => (
            <div key={v.id} className="surface-card overflow-hidden p-4">
              <VideoPlaceholder
                url={v.url || undefined}
                poster={v.poster || undefined}
                label="VIDEO THUMBNAIL PLACEHOLDER"
              />
              <p className="mt-3 px-1 text-sm font-semibold">{v.title}</p>
            </div>
          ))}
        </div>
      </Section>

      <AnimatePresence>
        {lightbox ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/85 p-5"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ImagePlaceholder ratio="aspect-[16/10]" />
              <div className="mt-3 flex items-center justify-between text-primary-foreground">
                <p className="text-sm">{lightbox}</p>
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  aria-label="Close"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
