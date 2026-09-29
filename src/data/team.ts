export type TeamCategory = {
  title: string;
  description: string;
  members: {
    name: string;
    role: string;
  }[];
};

export const teamCategories: TeamCategory[] = [
  {
    title: "Trust Leadership",
    description:
      "Providing leadership and direction for the Trust's social, environmental and community initiatives.",
    members: [
      {
        name: "Manikandan",
        role: "Trust Leadership",
      },
    ],
  },

  {
    title: "Project / Field Coordinators",
    description:
      "Coordinating projects, field activities and on-ground implementation across different programmes.",
    members: [
      {
        name: "B. Nandhagopal",
        role: "Project / Field Coordinator",
      },
      {
        name: "K. Nilavarasan",
        role: "Project / Field Coordinator",
      },
      {
        name: "K. Nilavazagan",
        role: "Project / Field Coordinator",
      },
      {
        name: "D. Premkumar",
        role: "Project / Field Coordinator",
      },
    ],
  },

  {
    title: "Volunteer Coordinators",
    description:
      "Supporting volunteer mobilisation, coordination and participation in community programmes.",
    members: [
      {
        name: "N. Aravazhi",
        role: "Volunteer Coordinator",
      },
      {
        name: "Pannerselvam",
        role: "Volunteer Coordinator",
      },
    ],
  },

  {
    title: "Youth Leaders",
    description:
      "Supporting youth participation and leadership across KNFT programmes and community initiatives.",
    members: [
      {
        name: "A. Aravindhan",
        role: "Youth Leader",
      },
    ],
  },

  {
    title: "Programme & Community Teams",
    description:
      "Various teams working across social service, education, sports, environmental conservation, agriculture, disaster relief and community development.",
    members: [
      {
        name: "Kalam Emergency Blood Donation Group",
        role: "Programme & Community Team",
      },
      {
        name: "Water Body Restoration & Biodiversity Conservation Group",
        role: "Programme & Community Team",
      },
      {
        name: "Northeast Monsoon Disaster Relief & Volunteer Group",
        role: "Programme & Community Team",
      },
      {
        name: "Vanga Vilaiyaadalam Volunteer Group",
        role: "Programme & Community Team",
      },
      {
        name: "Malarkambam Team",
        role: "Programme & Community Team",
      },
      {
        name: "Karate Team",
        role: "Programme & Community Team",
      },
      {
        name: "Evening Tuition Centre Team",
        role: "Programme & Community Team",
      },
      {
        name: "Agricultural Development Group – Tamil Nadu Farmers Association",
        role: "Programme & Community Team",
      },
      {
        name: "The People’s Society of India",
        role: "Programme & Community Team",
      },
      {
        name: "Other Specialised Community & Programme Teams",
        role: "Programme & Community Team",
      },
    ],
  },

  {
    title: "Subject Experts / Advisors",
    description:
      "Subject experts and advisors supporting the Trust with their experience and guidance.",
    members: [
      {
        name: "Thiru. K. Balasubramaniam",
        role: "Founder – M.N. Gayathri Charities / Advisor",
      },
      {
        name: "Thiru. Mohan",
        role: "Advisor",
      },
    ],
  },
];