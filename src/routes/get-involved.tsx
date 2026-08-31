import { createFileRoute } from "@tanstack/react-router";
import { HandHeart, Handshake, HeartHandshake } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion-primitives";
import { BtnLink, PageHero, Section, SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Get Involved — Volunteer, Partner or Donate | KNFT" },
      {
        name: "description",
        content:
          "Join KNFT as a volunteer, build a CSR partnership, or support our water, environment and education work with a donation.",
      },
      { property: "og:title", content: "Get Involved with KNFT" },
      { property: "og:description", content: "Volunteer, partner or donate — every action counts." },
    ],
  }),
  component: GetInvolved,
});

const cards = [
  {
    icon: HandHeart,
    title: "Become a Volunteer",
    body: "Give your time to lake restoration, plantation drives, relief work and youth programmes.",
    cta: "Join as Volunteer",
    to: "/volunteer" as const,
  },
  {
    icon: Handshake,
    title: "CSR Partnership",
    body: "Partner with KNFT to deliver measurable environmental and social outcomes.",
    cta: "Partner With KNFT",
    to: "/csr" as const,
  },
  {
    icon: HeartHandshake,
    title: "Support Our Work",
    body: "Your contribution funds saplings, restoration equipment and community programmes.",
    cta: "Donate Now",
    to: "/donate" as const,
  },
];

function GetInvolved() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Three ways to stand with your community"
        subtitle="Nation First. Humanity Always."
      />

      <Section>
        <SectionHeading align="center" title="Choose how you want to contribute" />
        <Stagger className="mt-10 grid gap-5 lg:grid-cols-3">
          {cards.map((c) => (
            <StaggerItem key={c.title} className="surface-card flex h-full flex-col p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-gradient text-primary-foreground">
                <c.icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.body}</p>
              <div className="mt-6">
                <BtnLink to={c.to} variant={c.to === "/donate" ? "emerald" : "primary"}>
                  {c.cta}
                </BtnLink>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
