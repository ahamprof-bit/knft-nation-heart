import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Heart, MessageCircle } from "lucide-react";
import { FormEvent, useState } from "react";

export const Route = createFileRoute("/donate")({
  component: DonatePage,

  head: () => ({
    meta: [
      {
        title: "Donate — Kalam Nation First Trust",
      },
      {
        name: "description",
        content:
          "Support Kalam Nation First Trust and contribute towards meaningful community, environmental and humanitarian initiatives.",
      },
    ],
  }),
});

const WHATSAPP_NUMBER = "919500804607";

function openWhatsApp(message: string) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message,
  )}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

function DonatePage() {
  const [amount, setAmount] = useState("");

  const quickAmounts = [500, 1000, 2500];

  const handleDonationSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      return;
    }

    const message = `Hello KNFT Team 👋

I would like to support Kalam Nation First Trust with a donation.

━━━━━━━━━━━━━━━━━━
DONATION DETAILS
━━━━━━━━━━━━━━━━━━

Donation Amount: ₹${numericAmount.toLocaleString("en-IN")}

━━━━━━━━━━━━━━━━━━

Please share the donation/payment details.

Thank you for the opportunity to support KNFT's work.

Nation First. Humanity Always. 🇮🇳`;

    openWhatsApp(message);
  };

  return (
    <main className="min-h-screen bg-background">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.12),transparent_35%),radial-gradient(circle_at_bottom_left,hsl(var(--primary)/0.08),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="max-w-3xl">

            <a
              href="/get-involved"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Get Involved
            </a>

            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <Heart className="h-4 w-4 fill-current" />
              Support Our Mission
            </div>

            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Your support can create{" "}
              <span className="text-primary">
                meaningful change.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Every contribution helps Kalam Nation First Trust
              continue its work for communities, education,
              environment, health and social development.
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          DONATION SECTION
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_480px] lg:items-start">

          {/* LEFT */}
          <div>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Make a Difference
            </p>

            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Choose your contribution
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              Select an amount or enter your own contribution.
              After submitting, WhatsApp will open with your
              donation request so the KNFT team can provide the
              payment details.
            </p>

            {/* IMPACT CARDS */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Heart className="h-5 w-5" />
                </div>

                <h3 className="mt-5 font-display text-lg font-bold">
                  Support Communities
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Help support meaningful community-focused
                  initiatives and humanitarian activities.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                </div>

                <h3 className="mt-5 font-display text-lg font-bold">
                  Support Our Mission
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Your contribution helps KNFT continue its
                  long-term social impact initiatives.
                </p>
              </div>

            </div>

            {/* WHATSAPP INFORMATION */}
            <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-6">
              <div className="flex gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                  <MessageCircle className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">
                    Donation through WhatsApp
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Submit your contribution amount and WhatsApp
                    will open with a pre-filled message for the
                    KNFT team.
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* =================================================
              DONATION FORM
          ================================================= */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-8">

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Donation
            </p>

            <h2 className="mt-2 font-display text-2xl font-bold">
              How much would you like to give?
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Select a quick amount or enter your preferred
              contribution.
            </p>

            {/* QUICK AMOUNTS */}
            <div className="mt-7 grid grid-cols-3 gap-3">

              {quickAmounts.map((value) => {
                const selected = Number(amount) === value;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAmount(String(value))}
                    className={`rounded-xl border px-3 py-3 text-sm font-semibold transition-all ${
                      selected
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border bg-background text-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    ₹{value.toLocaleString("en-IN")}
                  </button>
                );
              })}

            </div>

            {/* FORM */}
            <form
              onSubmit={handleDonationSubmit}
              className="mt-6"
            >
              <label
                htmlFor="donation-amount"
                className="text-sm font-semibold text-foreground"
              >
                Donation amount
              </label>

              <div className="relative mt-2">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                  ₹
                </span>

                <input
                  id="donation-amount"
                  type="number"
                  min="1"
                  step="1"
                  value={amount}
                  onChange={(event) =>
                    setAmount(event.target.value)
                  }
                  placeholder="Enter amount"
                  required
                  className="h-14 w-full rounded-xl border border-border bg-background pl-9 pr-4 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

              </div>

              <button
                type="submit"
                disabled={
                  !amount ||
                  Number(amount) <= 0
                }
                className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md disabled:pointer-events-none disabled:opacity-50"
              >
                <MessageCircle className="h-5 w-5" />
                Continue via WhatsApp
              </button>
            </form>

            <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
              WhatsApp will open with your selected donation
              amount. The KNFT team will provide the payment
              details.
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}
      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-5 py-14 text-center sm:px-8">

          <Heart className="mx-auto h-8 w-8 text-primary" />

          <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
            Nation First. Humanity Always.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
            Together, we can turn compassion into meaningful
            action and lasting impact.
          </p>

        </div>
      </section>

    </main>
  );
}
