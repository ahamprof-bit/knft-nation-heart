export type TeamCategory = {
  title: string;
  description: string;
  members: { name: string; role: string }[];
};

export const teamCategories: TeamCategory[] = [
  {
    title: "Trust Leadership",
    description: "Content Coming Soon",
    members: [{ name: "Manikandan", role: "Leadership" }],
  },
  { title: "Project / Field Coordinators", description: "Content Coming Soon", members: [] },
  { title: "Volunteer Coordinators", description: "Content Coming Soon", members: [] },
  { title: "Youth Leaders", description: "Content Coming Soon", members: [] },
  { title: "Community Volunteers", description: "Content Coming Soon", members: [] },
  { title: "Programme Support Teams", description: "Content Coming Soon", members: [] },
  { title: "Subject Experts / Advisors", description: "Content Coming Soon", members: [] },
];
