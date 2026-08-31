export type Partner = {
  id: string;
  name: string;
  logo: string; // empty until the client provides the official logo
  url?: string;
};

/** Placeholders only — no partner relationships are claimed here. */
export const partners: Partner[] = Array.from({ length: 6 }, (_, i) => ({
  id: `partner-${i + 1}`,
  name: "Content Coming Soon",
  logo: "",
}));
