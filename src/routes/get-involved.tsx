import { createFileRoute } from "@tanstack/react-router";
import {
  HandHeart,
  Handshake,
  HeartHandshake,
  MessageCircle,
  X,
  Send,
  FileDown,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import {
  Stagger,
  StaggerItem,
} from "@/components/motion-primitives";

import {
  PageHero,
  Section,
  SectionHeading,
} from "@/components/ui-kit";

// ============================================================
// PDF DOCUMENTS
// ============================================================

const tenAC80G = encodeURI(
  "/documents/10AC -80G.pdf",
);

const csrFundRelease = encodeURI(
  "/documents/CSR FUND FUND RELEASE (1)-4-6_1.pdf",
);

const kalamNationSigned = encodeURI(
  "/documents/Kalam nation first trust singed.pdf",
);

const knftNpoPdf = encodeURI(
  "/documents/KNFT NPO PDF.pdf",
);

// ============================================================
// WHATSAPP
// ============================================================

const WHATSAPP_NUMBER = "919500804607";

function openWhatsApp(message: string) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message,
  )}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

// ============================================================
// INPUT STYLES
// ============================================================

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10 sm:text-base";

const selectClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:text-base";

const textareaClass =
  "w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10 sm:text-base";

// ============================================================
// CARDS
// ============================================================

const cards = [
  {
    icon: HandHeart,
    title: "Become a Volunteer",
    body:
      "Give your time to lake restoration, plantation drives, relief work and youth programmes.",
    cta: "Join as Volunteer",
    type: "volunteer" as const,
  },
  {
    icon: Handshake,
    title: "CSR Partnership",
    body:
      "Partner with KNFT to deliver measurable environmental and social outcomes.",
    cta: "Partner With KNFT",
    type: "csr" as const,
  },
  {
    icon: HeartHandshake,
    title: "Support Our Work",
    body:
      "Your contribution helps support restoration, plantation, education, relief and community programmes.",
    cta: "Donate Now",
    type: "donate" as const,
  },
];

// ============================================================
// ROUTE
// ============================================================

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      {
        title: "Get Involved — Volunteer, Partner or Donate | KNFT",
      },
      {
        name: "description",
        content:
          "Join KNFT as a volunteer, build a CSR partnership, or support our water, environment and education work with a donation.",
      },
      {
        property: "og:title",
        content: "Get Involved with KNFT",
      },
      {
        property: "og:description",
        content:
          "Volunteer, partner or donate — every action counts.",
      },
    ],
  }),
  component: GetInvolved,
});

// ============================================================
// MAIN
// ============================================================

function GetInvolved() {
  const [activeModal, setActiveModal] = useState<
    "volunteer" | "csr" | "donate" | null
  >(null);

  // ==========================================================
  // AUTO OPEN DONATION MODAL
  // /get-involved?donate=true
  // ==========================================================

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search,
    );

    if (params.get("donate") === "true") {
      setActiveModal("donate");
    }
  }, []);

  // ==========================================================
  // VOLUNTEER
  // ==========================================================

  const [volunteerName, setVolunteerName] =
    useState("");

  const [volunteerPhone, setVolunteerPhone] =
    useState("");

  const [volunteerEmail, setVolunteerEmail] =
    useState("");

  const [volunteerLocation, setVolunteerLocation] =
    useState("");

  const [volunteerInterest, setVolunteerInterest] =
    useState("");

  const [volunteerAvailability, setVolunteerAvailability] =
    useState("");

  // ==========================================================
  // CSR
  // ==========================================================

  const [companyName, setCompanyName] =
    useState("");

  const [contactPerson, setContactPerson] =
    useState("");

  const [companyPhone, setCompanyPhone] =
    useState("");

  const [companyEmail, setCompanyEmail] =
    useState("");

  const [companyLocation, setCompanyLocation] =
    useState("");

  const [csrInterest, setCsrInterest] =
    useState("");

  const [csrMessage, setCsrMessage] =
    useState("");

  // ==========================================================
  // DONATION
  // ==========================================================

  const [amount, setAmount] = useState("");

  // ==========================================================
  // CLOSE
  // ==========================================================

  const closeModal = () => {
    setActiveModal(null);
  };

  // ==========================================================
  // VOLUNTEER SUBMIT
  // ==========================================================

  const handleVolunteerSubmit = (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const message = `Hello KNFT Team 👋

I would like to join Kalam Nation First Trust as a volunteer.

━━━━━━━━━━━━━━━━━━
VOLUNTEER DETAILS
━━━━━━━━━━━━━━━━━━

Name: ${volunteerName}

Phone: ${volunteerPhone}

Email: ${volunteerEmail || "Not provided"}

Location: ${volunteerLocation}

Area of Interest: ${volunteerInterest}

Availability: ${volunteerAvailability}

━━━━━━━━━━━━━━━━━━

I am interested in contributing my time and support to KNFT's community initiatives.

Please share the next steps to register as a volunteer.

Thank you.
Nation First. Humanity Always. 🇮🇳`;

    openWhatsApp(message);
    closeModal();
  };

  // ==========================================================
  // CSR SUBMIT
  // ==========================================================

  const handleCSRSubmit = (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const message = `Hello KNFT Team 👋

I am interested in partnering with Kalam Nation First Trust through a CSR initiative.

━━━━━━━━━━━━━━━━━━
CSR PARTNERSHIP DETAILS
━━━━━━━━━━━━━━━━━━

Company / Organisation: ${companyName}

Contact Person: ${contactPerson}

Phone: ${companyPhone}

Email: ${companyEmail}

Location: ${companyLocation}

CSR Area of Interest: ${csrInterest}

Additional Message:
${csrMessage || "Not provided"}

━━━━━━━━━━━━━━━━━━

I would like to know more about KNFT's CSR programmes, project opportunities and partnership process.

Please share the details.

Thank you.
Nation First. Humanity Always. 🇮🇳`;

    openWhatsApp(message);
    closeModal();
  };

  // ==========================================================
  // DONATION SUBMIT
  // ==========================================================

  const handleDonationSubmit = (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      return;
    }

    const message = `Hello KNFT Team 👋

I would like to support Kalam Nation First Trust with a donation.

━━━━━━━━━━━━━━━━━━
DONATION DETAILS
━━━━━━━━━━━━━━━━━━

Donation Amount: ₹${numericAmount.toLocaleString(
      "en-IN",
    )}

━━━━━━━━━━━━━━━━━━

Please share the donation/payment details.

Thank you for the opportunity to support KNFT's work.

Nation First. Humanity Always. 🇮🇳`;

    openWhatsApp(message);
    closeModal();
  };

  // ==========================================================
  // CARD CLICK
  // ==========================================================

  const handleCardClick = (
    type: "volunteer" | "csr" | "donate",
  ) => {
    setActiveModal(type);
  };

  return (
    <>
      {/* ======================================================
          HERO
      ====================================================== */}

      <PageHero
        eyebrow="Get Involved"
        title="Three ways to stand with your community"
        subtitle="Nation First. Humanity Always."
      />

      {/* ======================================================
          CARDS
      ====================================================== */}

      <Section>
        <SectionHeading
          align="center"
          title="Choose how you want to contribute"
          subtitle="Whether you give your time, expertise or financial support, every contribution helps create lasting community impact."
        />

        <Stagger className="mt-10 grid gap-5 lg:grid-cols-3">
          {cards.map((c) => (
            <StaggerItem
              key={c.title}
              className="surface-card flex h-full flex-col p-6 sm:p-8"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-leaf-gradient text-primary-foreground">
                <c.icon
                  className="h-6 w-6"
                  aria-hidden
                />
              </span>

              <h3 className="mt-5 text-xl font-semibold">
                {c.title}
              </h3>

              <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                {c.body}
              </p>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() =>
                    handleCardClick(c.type)
                  }
                  className={
                    c.type === "donate"
                      ? "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
                      : "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:w-auto"
                  }
                >
                  <MessageCircle className="h-4 w-4" />
                  {c.cta}
                </button>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ======================================================
          DOCUMENTS
      ====================================================== */}

      <Section tone="muted">
        <SectionHeading
          align="center"
          title="KNFT Documents"
          subtitle="Download official KNFT documents and supporting certificates."
        />

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:gap-5 md:grid-cols-2">

          <div className="surface-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="min-w-0">
              <h3 className="text-base font-semibold sm:text-lg">
                10AC & 80G Certificate
              </h3>

              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                KNFT 10AC and 80G registration document.
              </p>
            </div>

            <a
              href={tenAC80G}
              download="KNFT-10AC-80G.pdf"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:w-auto"
            >
              <FileDown className="h-4 w-4" />
              Download
            </a>
          </div>

          <div className="surface-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="min-w-0">
              <h3 className="text-base font-semibold sm:text-lg">
                CSR Fund Release
              </h3>

              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                Official CSR fund release document.
              </p>
            </div>

            <a
              href={csrFundRelease}
              download="KNFT-CSR-Fund-Release.pdf"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:w-auto"
            >
              <FileDown className="h-4 w-4" />
              Download
            </a>
          </div>

          <div className="surface-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="min-w-0">
              <h3 className="text-base font-semibold sm:text-lg">
                Kalam Nation First Trust
              </h3>

              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                Signed trust document.
              </p>
            </div>

            <a
              href={kalamNationSigned}
              download="Kalam-Nation-First-Trust-Signed.pdf"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:w-auto"
            >
              <FileDown className="h-4 w-4" />
              Download
            </a>
          </div>

          <div className="surface-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="min-w-0">
              <h3 className="text-base font-semibold sm:text-lg">
                KNFT NPO Document
              </h3>

              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                Kalam Nation First Trust NPO document.
              </p>
            </div>

            <a
              href={knftNpoPdf}
              download="KNFT-NPO-Document.pdf"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:w-auto"
            >
              <FileDown className="h-4 w-4" />
              Download
            </a>
          </div>
        </div>
      </Section>

      {/* ======================================================
          VOLUNTEER MODAL
      ====================================================== */}

      {activeModal === "volunteer" && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-sm sm:p-4"
          onClick={closeModal}
        >
          <div
            className="relative my-2 flex max-h-[calc(100vh-1rem)] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-background shadow-2xl sm:my-6 sm:max-h-[calc(100vh-3rem)]"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="relative shrink-0 border-b border-border px-5 py-5 sm:px-7 sm:py-6">
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition hover:bg-muted/70"
                aria-label="Close volunteer form"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="pr-12">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald sm:text-sm">
                  Join KNFT
                </p>

                <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                  Become a Volunteer
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Please provide a few basic details.
                  Your information will be sent to the
                  KNFT team through WhatsApp.
                </p>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              <form
                onSubmit={handleVolunteerSubmit}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="volunteer-name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Full Name *
                  </label>

                  <input
                    id="volunteer-name"
                    type="text"
                    required
                    value={volunteerName}
                    onChange={(e) =>
                      setVolunteerName(
                        e.target.value,
                      )
                    }
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="volunteer-phone"
                    className="mb-2 block text-sm font-medium"
                  >
                    Phone Number *
                  </label>

                  <input
                    id="volunteer-phone"
                    type="tel"
                    required
                    value={volunteerPhone}
                    onChange={(e) =>
                      setVolunteerPhone(
                        e.target.value,
                      )
                    }
                    placeholder="Enter your phone number"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="volunteer-email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email Address
                  </label>

                  <input
                    id="volunteer-email"
                    type="email"
                    value={volunteerEmail}
                    onChange={(e) =>
                      setVolunteerEmail(
                        e.target.value,
                      )
                    }
                    placeholder="Enter your email"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="volunteer-location"
                    className="mb-2 block text-sm font-medium"
                  >
                    Location / City *
                  </label>

                  <input
                    id="volunteer-location"
                    type="text"
                    required
                    value={volunteerLocation}
                    onChange={(e) =>
                      setVolunteerLocation(
                        e.target.value,
                      )
                    }
                    placeholder="Example: Chennai"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="volunteer-interest"
                    className="mb-2 block text-sm font-medium"
                  >
                    Area of Interest *
                  </label>

                  <select
                    id="volunteer-interest"
                    required
                    value={volunteerInterest}
                    onChange={(e) =>
                      setVolunteerInterest(
                        e.target.value,
                      )
                    }
                    className={selectClass}
                  >
                    <option value="">
                      Select an area
                    </option>

                    <option value="Environment & Lake Restoration">
                      Environment & Lake Restoration
                    </option>

                    <option value="Plantation & Green Initiatives">
                      Plantation & Green Initiatives
                    </option>

                    <option value="Education & Youth Programmes">
                      Education & Youth Programmes
                    </option>

                    <option value="Community & Relief Work">
                      Community & Relief Work
                    </option>

                    <option value="Event Support">
                      Event Support
                    </option>

                    <option value="Photography / Videography">
                      Photography / Videography
                    </option>

                    <option value="Social Media / Digital Support">
                      Social Media / Digital Support
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="volunteer-availability"
                    className="mb-2 block text-sm font-medium"
                  >
                    Availability *
                  </label>

                  <select
                    id="volunteer-availability"
                    required
                    value={volunteerAvailability}
                    onChange={(e) =>
                      setVolunteerAvailability(
                        e.target.value,
                      )
                    }
                    className={selectClass}
                  >
                    <option value="">
                      Select availability
                    </option>

                    <option value="Weekdays">
                      Weekdays
                    </option>

                    <option value="Weekends">
                      Weekends
                    </option>

                    <option value="Both Weekdays & Weekends">
                      Both Weekdays & Weekends
                    </option>

                    <option value="Occasional Events">
                      Occasional Events
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:py-4 sm:text-base"
                >
                  <Send className="h-5 w-5" />
                  Send via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
          CSR MODAL
      ====================================================== */}

      {activeModal === "csr" && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-sm sm:p-4"
          onClick={closeModal}
        >
          <div
            className="relative my-2 flex max-h-[calc(100vh-1rem)] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-background shadow-2xl sm:my-6 sm:max-h-[calc(100vh-3rem)]"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="relative shrink-0 border-b border-border px-5 py-5 sm:px-7 sm:py-6">
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition hover:bg-muted/70"
                aria-label="Close CSR form"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="pr-12">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald sm:text-sm">
                  Partner With KNFT
                </p>

                <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                  CSR Partnership
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Tell us about your organisation
                  and CSR requirements.
                </p>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              <form
                onSubmit={handleCSRSubmit}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="company-name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Company / Organisation *
                  </label>

                  <input
                    id="company-name"
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) =>
                      setCompanyName(
                        e.target.value,
                      )
                    }
                    placeholder="Company / organisation name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-person"
                    className="mb-2 block text-sm font-medium"
                  >
                    Contact Person *
                  </label>

                  <input
                    id="contact-person"
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) =>
                      setContactPerson(
                        e.target.value,
                      )
                    }
                    placeholder="Contact person name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="company-phone"
                    className="mb-2 block text-sm font-medium"
                  >
                    Phone Number *
                  </label>

                  <input
                    id="company-phone"
                    type="tel"
                    required
                    value={companyPhone}
                    onChange={(e) =>
                      setCompanyPhone(
                        e.target.value,
                      )
                    }
                    placeholder="Phone number"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="company-email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Official Email *
                  </label>

                  <input
                    id="company-email"
                    type="email"
                    required
                    value={companyEmail}
                    onChange={(e) =>
                      setCompanyEmail(
                        e.target.value,
                      )
                    }
                    placeholder="Official email"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="company-location"
                    className="mb-2 block text-sm font-medium"
                  >
                    Company Location *
                  </label>

                  <input
                    id="company-location"
                    type="text"
                    required
                    value={companyLocation}
                    onChange={(e) =>
                      setCompanyLocation(
                        e.target.value,
                      )
                    }
                    placeholder="Example: Chennai"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="csr-interest"
                    className="mb-2 block text-sm font-medium"
                  >
                    CSR Area of Interest *
                  </label>

                  <select
                    id="csr-interest"
                    required
                    value={csrInterest}
                    onChange={(e) =>
                      setCsrInterest(
                        e.target.value,
                      )
                    }
                    className={selectClass}
                  >
                    <option value="">
                      Select an area
                    </option>

                    <option value="Environment & Lake Restoration">
                      Environment & Lake Restoration
                    </option>

                    <option value="Plantation & Green Initiatives">
                      Plantation & Green Initiatives
                    </option>

                    <option value="Education">
                      Education
                    </option>

                    <option value="Community Development">
                      Community Development
                    </option>

                    <option value="Healthcare & Relief">
                      Healthcare & Relief
                    </option>

                    <option value="Youth Development">
                      Youth Development
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="csr-message"
                    className="mb-2 block text-sm font-medium"
                  >
                    Additional Message
                  </label>

                  <textarea
                    id="csr-message"
                    rows={4}
                    value={csrMessage}
                    onChange={(e) =>
                      setCsrMessage(
                        e.target.value,
                      )
                    }
                    placeholder="Tell us about your CSR requirement..."
                    className={textareaClass}
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:py-4 sm:text-base"
                >
                  <Send className="h-5 w-5" />
                  Send CSR Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
          DONATION MODAL
      ====================================================== */}

      {activeModal === "donate" && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-sm sm:p-4"
          onClick={closeModal}
        >
          <div
            className="relative my-3 w-full max-w-md rounded-3xl bg-background p-5 shadow-2xl sm:p-7"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition hover:bg-muted/70"
              aria-label="Close donation window"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="pr-12">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald sm:text-sm">
                Support KNFT
              </p>

              <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                Choose your donation amount
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Enter the amount you would like to
                contribute to KNFT.
              </p>
            </div>

            <form
              onSubmit={handleDonationSubmit}
              className="mt-6"
            >
              <label
                htmlFor="donation-amount"
                className="mb-2 block text-sm font-medium"
              >
                Donation Amount
              </label>

              <div className="flex items-center overflow-hidden rounded-xl border border-border bg-background">
                <span className="px-4 text-lg font-semibold text-muted-foreground">
                  ₹
                </span>

                <input
                  id="donation-amount"
                  type="number"
                  min="1"
                  required
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                  className="min-w-0 w-full bg-transparent px-2 py-3.5 text-base outline-none sm:py-4 sm:text-lg"
                />
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3">
                {[500, 1000, 2500].map(
                  (value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setAmount(
                          String(value),
                        )
                      }
                      className="rounded-xl border border-border px-2 py-3 text-sm font-semibold transition hover:border-emerald hover:bg-emerald/5 sm:px-3"
                    >
                      ₹
                      {value.toLocaleString(
                        "en-IN",
                      )}
                    </button>
                  ),
                )}
              </div>

              <button
                type="submit"
                disabled={
                  !amount ||
                  Number(amount) <= 0
                }
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald px-5 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:py-4 sm:text-base"
              >
                <MessageCircle className="h-5 w-5" />
                Continue via WhatsApp
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
                Razorpay online payment can be
                connected here later.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
