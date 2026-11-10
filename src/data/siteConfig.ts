export const siteConfig = {
  name: "Kalam Nation First Trust",
  shortName: "KNFT",
  url: "https://kalamnationfirsttrust.com",
  tagline: "Nation First. Humanity Always.",
  description:
    "Community-driven action for people, nature and a stronger future.",
  email: "kalamnationtrust@gmail.com",

  /*
   * Contact details that are not confirmed yet are left EMPTY on purpose
   * (no "Content Coming Soon" text on the public site).
   * Footer / Contact must only render a field when it is non-empty.
   */
  phone: "",
  address: "",

  social: {
    facebook: "https://www.facebook.com/share/1DTjEmMbH6/",
    instagram: "",
    youtube: "",
    x: "",
    linkedin: "",
  },

  // Fill with the real place name / address query. Leave empty to hide the map.
  map: {
    MAP_LOCATION: "",
    embedQuery: "",
  },

  // Cloudinary-ready media configuration (empty until the client provides it)
  media: {
    cloudinaryCloudName: "",
    placeholderImage: "/assets/placeholder.jpg",
  },

  payments: {
    // Public key only. Secret key must live server-side.
    razorpayKeyId: import.meta.env["VITE_RAZORPAY_KEY_ID"] ?? "",
    currency: "INR",
  },
} as const;

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Our Work", to: "/our-work" },
  { label: "Projects", to: "/projects" },
  { label: "Impact", to: "/impact" },
  { label: "Gallery", to: "/gallery" },
  { label: "Team", to: "/team" },
  { label: "Partners", to: "/partners" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "Contact", to: "/contact" },
] as const;