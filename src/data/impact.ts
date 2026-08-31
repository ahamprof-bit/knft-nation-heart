export type Stat = {
  value: number | null;
  suffix?: string;
  label: string;
};

/** Verified headline numbers only. */
export const impactStats: Stat[] = [
  { value: 13, suffix: "+", label: "Water Bodies Restored" },
  { value: 20000, label: "Palm Seeds" },
  { value: 5000, suffix: "+", label: "Saplings Planted" },
  { value: 800, suffix: "+", label: "Children Trained" },
];

export const environmentalImpact: Stat[] = [
  { value: 13, suffix: "+", label: "Water Bodies Restored" },
  { value: 20000, label: "Palm Seeds Sown" },
  { value: 5000, suffix: "+", label: "Saplings Planted" },
  { value: null, label: "Nursery Development" },
  { value: null, label: "Waste Removed" },
];

export const socialImpact: Stat[] = [
  { value: 800, suffix: "+", label: "Children Trained" },
  { value: null, label: "Youth Engaged" },
  { value: null, label: "Sports Programmes" },
  { value: null, label: "Humanitarian Support" },
  { value: null, label: "Blood Donation" },
  { value: null, label: "Community Development" },
];

export type Story = {
  slug: string;
  title: string;
  journey: string;
  summary: string;
};

export const impactStories: Story[] = [
  {
    slug: "subasree",
    title: "Subasree's Journey",
    journey: "Support → Training → Achievement",
    summary: "Content Coming Soon",
  },
];
