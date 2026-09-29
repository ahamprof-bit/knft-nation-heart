import { createFileRoute } from "@tanstack/react-router";
import { partners, partnerSectionVideos } from "@/data/partners";

import {
  Stagger,
  StaggerItem,
} from "@/components/motion-primitives";

import {
  BtnLink,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/ui-kit";

/* =========================================================
   ROUTE
   ========================================================= */

export const Route = createFileRoute("/partners")({
  component: PartnersPage,
});

/* =========================================================
   VIDEO CARD
   ========================================================= */

function VideoCard({
  src,
  aspect = "video",
}: {
  src: string;
  aspect?: "video" | "vertical";
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-black/10 bg-black shadow-sm">
      <video
        className={
          aspect === "vertical"
            ? "mx-auto block h-auto max-h-[720px] w-full object-contain md:max-w-[420px]"
            : "aspect-video w-full object-contain"
        }
        controls
        playsInline
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

/* =========================================================
   PARTNERS PAGE
   ========================================================= */

function PartnersPage() {
  return (
    <main>
      {/* =====================================================
          HERO
      ===================================================== */}

      <PageHero
        eyebrow="Partners & Collaborators"
        title="Together, We Create Greater Impact"
        description="KNFT works with organisations, institutions, charities and community partners to create meaningful and sustainable change."
      />

      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

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

      {/* =====================================================
          PARTNER SECTION VIDEOS
      ===================================================== */}

      <Section className="bg-muted/30">
        <SectionHeading
          eyebrow="Collaboration in Action"
          title="Our Partners in Action"
          description="Watch moments from our collaborative work and community initiatives."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.7fr_0.8fr] lg:items-center">
          {/* Horizontal video */}

          <div>
            <VideoCard
              src={partnerSectionVideos.horizontal}
              aspect="video"
            />
          </div>

          {/* Vertical video */}

          <div className="flex justify-center">
            <VideoCard
              src={partnerSectionVideos.vertical}
              aspect="vertical"
            />
          </div>
        </div>
      </Section>

      {/* =====================================================
          PARTNERS GRID
      ===================================================== */}

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
                  {/* =================================================
                      PARTNER HEADER
                  ================================================= */}

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    {/* Logo */}

                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-white p-3">
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </div>

                    {/* Name + category */}

                    <div>
                      <p className="text-sm font-medium text-primary">
                        {partner.category}
                      </p>

                      <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                        {partner.name}
                      </h2>
                    </div>
                  </div>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  <p className="mt-6 leading-7 text-muted-foreground">
                    {partner.description}
                  </p>

                  {/* =================================================
                      PARTNER IMAGES
                  ================================================= */}

                  {partner.images && partner.images.length > 0 && (
                    <div className="mt-8">
                      <h3 className="mb-4 text-base font-semibold">
                        Partnership Highlights
                      </h3>

                      <div className="grid grid-cols-2 gap-3">
                        {partner.images.map((image, index) => (
                          <div
                            key={`${partner.id}-image-${index}`}
                            className="overflow-hidden rounded-2xl border bg-muted"
                          >
                            <img
                              src={image}
                              alt={`${partner.name} partnership activity ${
                                index + 1
                              }`}
                              className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                              loading="lazy"
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

      {/* =====================================================
          MN GAYATHRI CHARITIES
          Videos are displayed here only once.
      ===================================================== */}

      {(() => {
        const mnGayathri = partners.find(
          (partner) => partner.id === "mn-gayathri-charities",
        );

        const videos = mnGayathri?.videos ?? [];

        return videos.length > 0 ? (
          <Section className="bg-muted/30">
            <SectionHeading
              eyebrow="Community Collaboration"
              title="MN Gayathri Charities"
              description="A look at collaborative environmental and community work carried out with MN Gayathri Charities."
            />

            <div className="mt-10 grid gap-8 lg:grid-cols-[1.7fr_0.8fr] lg:items-center">
              {/* Lake restoration video */}

              {videos[0] && (
                <div>
                  <VideoCard src={videos[0]} aspect="video" />
                </div>
              )}

              {/* Vertical WhatsApp video */}

              {videos[1] && (
                <div className="flex justify-center">
                  <VideoCard
                    src={videos[1]}
                    aspect="vertical"
                  />
                </div>
              )}
            </div>
          </Section>
        ) : null;
      })()}

      {/* =====================================================
          CTA
      ===================================================== */}

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