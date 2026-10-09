import { createFileRoute } from "@tanstack/react-router";

import { Stagger, StaggerItem } from "@/components/motion-primitives";

import {
  BtnLink,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/ui-kit";

/* =========================================================
   GOOGLE DRIVE HELPERS
   ========================================================= */

function driveImage(fileId: string) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
}

function driveImageFallback(fileId: string) {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

function driveVideo(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

/* =========================================================
   TYPES
   ========================================================= */

type Partner = {
  id: string;
  name: string;
  category: string;
  description: string;
  initials: string;
  images: string[];
};

/* =========================================================
   PARTNER DATA — GOOGLE DRIVE FILE IDs
   ========================================================= */

const partners: Partner[] = [
  {
    id: "abaya-foundation",
    name: "ABAYA FOUNDATION",
    category: "Foundation",
    description:
      "A valued collaborator supporting community initiatives and meaningful social impact.",
    initials: "AF",
    images: [
      "1wEXneJjRDaQL3FHC8SPaixn4sMNOW0NM",
      "1WPdupdaQ56yq374Hpi5M2ByJVb6iAMty",
      "10qTgCSGNX2BU73OE0pwjnudMVPnRJGcj",
      "1g31ZIVDuHn5I45LPZ0CRlRnpjBoM2vUm",
    ],
  },

  {
    id: "infosys",
    name: "INFOSYS",
    category: "Corporate Partner",
    description:
      "Working together to encourage community participation and sustainable development.",
    initials: "I",
    images: [
      "1PhOn5xQWljV5PtCP_d0FPK3UdMOvqPem",
      "15S6YyUXl_qkog7TBpoBQ_IlW-ZcKKa_Z",
      "1rF9lUULeV1eL8SdBFFpU38BgL3ElyAGJ",
      "1PUC1CsUcW4etPMw1r4gwYC3A7M89_RhW",
    ],
  },

  {
    id: "mn-gayathri-charities",
    name: "MN Gayathri Charities",
    category: "Charitable Organisation",
    description:
      "Collaborating on environmental restoration and community-focused activities.",
    initials: "MG",
    images: [
      "1bj3SCzD0_lzWD9a80pOadRd8Hc_fiew5",
      "1KIBC0un4w-EbnRYx7fSGrnjdKNWj8Nny",
      "1JkIsJHazUD6nKmzaR3LpQxo_uScWyI4Y",
      "1r3EOd5e5_t6ypVpbeKGwjoA5bv2qLUil",
      "1XOu3DdLxUK4YxppHwTZ7Qxmy5rzDpB_M",
      "16ZC08p9E_yJ7hp-p39nJMnusHDj0Z_CP",
      "1odKDkpJhBOvDieob-fjuVKvPHVtBrVKi",
      "1lviNdGn6LXl9Y78w7D6Eh0FcyaXP8eik",
      "1yljo0ADJ8P14XYm0ZNsQlFYOzT4cXNvv",
      "1K-aXsY48Zie92YYIDpb5ReaeEOmKDNlB",
      "18LTosM_iSP6iEZ_WT2y-IwrW_vzxm3Xg",
      "1qBXMhNKP3IYKDVcua-HEVoZXlq-3WsL2",
      "1zOSYFKq8bYiWdT1v5mWlT_jdIWk5Yku8",
    ],
  },

  {
    id: "ndso",
    name: "NDSO",
    category: "Organisation",
    description:
      "Supporting community-focused initiatives through collaboration.",
    initials: "N",
    images: [
      "1wEmdM7PBf7moTMSLecpEQ4z9xm54OsrF",
      "1BJH_fdO3fMHKprBNZcMo54xA8pX2Yhh4",
      "1du6vGJjX6t8E0dbqnWLu8MKdnHLblM6h",
    ],
  },

  {
    id: "vpm-neernelai-kulu",
    name: "VPM NEERNELAI KULU",
    category: "Water & Environment",
    description:
      "A community collaboration connected with water and environmental initiatives.",
    initials: "VPM",
    images: ["13r0LPxLYpk0kF4OC1M1lBb-uanleI16m"],
  },

  {
    id: "tindivanam-neernelai-kulu",
    name: "Tindivanam NEERNELAI KULU",
    category: "Water & Environment",
    description:
      "Supporting local water and environmental awareness initiatives.",
    initials: "TNK",
    images: ["1nu3QnIjuM3txHM7RGbqtWwZrpdF_Zy3c"],
  },

  {
    id: "exnora",
    name: "Exnora",
    category: "Environment",
    description:
      "Supporting environmental awareness and community action.",
    initials: "E",
    images: ["1rbHn-w5zfevu86d8QOJP5u9C0jnvBXez"],
  },
];

/* =========================================================
   PARTNER VIDEOS
   ========================================================= */

const partnerSectionVideos = {
  horizontal: "1sw6lSv58bT--JWu4pQprw-zgJtR2pSlV",
  vertical: "1PsuPKZCJEieslJdJGgAMit_Nt8Kik-GK",
};

/* =========================================================
   ROUTE
   ========================================================= */

export const Route = createFileRoute("/partners")({
  component: PartnersPage,
});

/* =========================================================
   VIDEO CARD
   Google Drive preview player
   ========================================================= */

function VideoCard({
  fileId,
  aspect = "video",
}: {
  fileId: string;
  aspect?: "video" | "vertical";
}) {
  return (
    <div
      className={`overflow-hidden rounded-3xl border border-black/10 bg-black shadow-sm ${
        aspect === "vertical"
          ? "mx-auto w-full max-w-[420px]"
          : "w-full"
      }`}
    >
      <iframe
        src={driveVideo(fileId)}
        title="KNFT partner collaboration video"
        className={`w-full ${
          aspect === "vertical" ? "aspect-[9/16]" : "aspect-video"
        }`}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

/* =========================================================
   PARTNER IMAGE
   Thumbnail + fallback
   ========================================================= */

function PartnerImage({
  fileId,
  alt,
}: {
  fileId: string;
  alt: string;
}) {
  return (
    <img
      src={driveImage(fileId)}
      alt={alt}
      className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 hover:scale-105"
      loading="lazy"
      decoding="async"
      onError={(event) => {
        const image = event.currentTarget;

        if (!image.dataset.fallbackTried) {
          image.dataset.fallbackTried = "true";
          image.src = driveImageFallback(fileId);
        }
      }}
    />
  );
}

/* =========================================================
   PARTNERS PAGE
   ========================================================= */

function PartnersPage() {
  return (
    <main>
      {/* HERO */}

      <PageHero
        eyebrow="Partners & Collaborators"
        title="Together, We Create Greater Impact"
        description="KNFT works with organisations, institutions, charities and community partners to create meaningful and sustainable change."
      />

      {/* INTRODUCTION */}

      <Section>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-base leading-8 text-muted-foreground md:text-lg">
            Our partnerships bring together people, resources, knowledge and
            community participation. Through collaboration, we support
            environmental restoration, education, humanitarian initiatives,
            community development and other programmes.
          </p>
        </div>
      </Section>

      {/* PARTNER VIDEOS */}

      <Section className="bg-muted/30">
        <SectionHeading
          eyebrow="Collaboration in Action"
          title="Our Partners in Action"
          description="Watch moments from our collaborative work and community initiatives."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.7fr_0.8fr] lg:items-center">
          <VideoCard fileId={partnerSectionVideos.horizontal} />

          <div className="flex justify-center">
            <VideoCard
              fileId={partnerSectionVideos.vertical}
              aspect="vertical"
            />
          </div>
        </div>
      </Section>

      {/* PARTNER GRID */}

      <Section>
        <SectionHeading
          eyebrow="Our Network"
          title="Our Partners"
          description="Organisations and collaborators working alongside KNFT."
        />

        <Stagger className="mt-12 grid gap-8 md:grid-cols-2">
          {partners.map((partner) => (
            <StaggerItem key={partner.id}>
              <article className="h-full overflow-hidden rounded-3xl border border-black/10 bg-background shadow-sm transition-shadow duration-300 hover:shadow-lg">
                <div className="p-6 md:p-8">
                  {/* PARTNER HEADER */}

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border bg-primary/10 p-3 text-2xl font-bold text-primary">
                      {partner.initials}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-primary">
                        {partner.category}
                      </p>

                      <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                        {partner.name}
                      </h2>
                    </div>
                  </div>

                  {/* DESCRIPTION */}

                  <p className="mt-6 leading-7 text-muted-foreground">
                    {partner.description}
                  </p>

                  {/* PARTNER IMAGES */}

                  {partner.images.length > 0 && (
                    <div className="mt-8">
                      <h3 className="mb-4 text-base font-semibold">
                        Partnership Highlights
                      </h3>

                      <div className="grid grid-cols-2 gap-3">
                        {partner.images.map((imageId, index) => (
                          <div
                            key={`${partner.id}-image-${index}`}
                            className="overflow-hidden rounded-2xl border bg-muted"
                          >
                            <PartnerImage
                              fileId={imageId}
                              alt={`${partner.name} partnership activity ${
                                index + 1
                              }`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* CALL TO ACTION */}

      <Section>
        <div className="overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground md:px-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-80">
              Work With KNFT
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Let&apos;s Create Impact Together
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 opacity-90">
              Organisations, CSR teams, charities and community groups can
              connect with KNFT to explore meaningful collaboration
              opportunities.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <BtnLink href="/csr" variant="secondary">
                CSR Enquiry
              </BtnLink>

              <BtnLink href="/contact" variant="outline">
                Contact KNFT
              </BtnLink>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
