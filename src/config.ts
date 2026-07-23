/** Site-wide configuration. */
export const SITE = {
  name: "NTU DeepSpeed",
  tagline: "NTU DeepSpeed · RoboRacer · Singapore",
  /** Shows the pulsing "Live" chip in the header on every page (race days). */
  showLiveChip: false,
  links: {
    github: "https://github.com/NTUDeepSpeed",
    instagram: "https://www.instagram.com/ntu_deepspeed/",
    linkedin: "https://www.linkedin.com/company/ntudeepspeed/",
    email: "mailto:ntu-deepspeed@e.ntu.edu.sg",
  },
  contact: {
    email: "ntu-deepspeed@e.ntu.edu.sg",
    instagramHandle: "@ntu_deepspeed",
    linkedinName: "NTU DeepSpeed",
    githubName: "NTUDeepSpeed",
    address: [
      "Hardware and Embedded Systems Lab (HESL)",
      "College of Computing and Data Science",
      "Nanyang Technological University",
      "50 Nanyang Avenue, Singapore 639798",
    ],
  },
} as const;

export type PageId = "home" | "achievements" | "pit-notes" | "members" | "contact";

export const NAV_ITEMS: ReadonlyArray<{ id: PageId; label: string; href: string }> = [
  { id: "home", label: "Home", href: "/" },
  { id: "achievements", label: "Achievements", href: "/achievements/" },
  { id: "pit-notes", label: "Pit notes", href: "/pit-notes/" },
  { id: "members", label: "Members", href: "/members/" },
  { id: "contact", label: "Contact us", href: "/contact/" },
];
