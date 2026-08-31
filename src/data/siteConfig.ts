export const siteConfig = {
  name: "Kalam Nation First Trust",
  shortName: "KNFT",
  tagline: "Nation First. Humanity Always.",
  description:
    "Community-driven action for people, nature and a stronger future.",
  email: "kalamnationtrust@gmail.com",
  phone: "Content Coming Soon",
  address: "Content Coming Soon",
  social: {
    facebook: "https://www.facebook.com/share/1DTjEmMbH6/",
    instagram: "",
    youtube: "",
    x: "",
    linkedin: "",
  },
  // Replace with the real coordinates / place name later. Single source of truth.
  map: {
    MAP_LOCATION: "Dummy Location",
    embedQuery: "Dummy Location",
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
