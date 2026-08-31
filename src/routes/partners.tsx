import { createFileRoute } from "@tanstack/react-router";
import { partners } from "@/data/partners";
import { LogoPlaceholder } from "@/components/placeholders";
import { Stagger, StaggerItem } from "@/components/motion-primitives";
import { BtnLink, PageHero, Section, SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners & Collaborators | KNFT" },
      {
        name: "description",
        content:
          "Organisations and CSR collaborators supporting Kalam Nation First Trust's community and environmental programmes.",
      },
      { property: "og:title", content: "KNFT Partners & Collaborators" },
      { property: "og:description", content: "Partner with KNFT to scale community impact." },
    ],
  }),
  component: Partners,
});

function Partners() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Our Partners & Collaborators"
        subtitle="Official partner logos will be added once provided by KNFT."
      />

      <Section>
        <Stagger className="grid gap-5 sm:grid-cols-3 lg:grid-cols-3">
          {partners.map((p) => (
            <StaggerItem key={p.id} className="surface-card p-6">
              <LogoPlaceholder src={p.logo || undefined} />
              <p className="mt-4 text-center text-sm text-muted-foreground">{p.name}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="muted">
        <SectionHeading
          align="center"
          title="Interested in partnering with KNFT?"
          subtitle="We welcome CSR partnerships, institutional collaborations and community alliances."
        />
        <div className="mt-8 flex justify-center">
          <BtnLink to="/csr" variant="primary" size="lg">
            Partner With KNFT
          </BtnLink>
        </div>
      </Section>
    </>
  );
}
