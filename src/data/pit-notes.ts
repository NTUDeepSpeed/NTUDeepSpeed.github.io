export interface PitNote {
  tag: string;
  /** Short date shown on the Home preview cards. */
  date: string;
  year: string;
  title: string;
  blurb: string;
  href: string;
  /** Card thumbnail shown on the Pit notes index (16:9 crop). */
  thumb: string;
  featured?: boolean;
}

/** Newest first. Add new write-ups here and create a page under pit-notes/. */
export const pitNotes: PitNote[] = [
  {
    tag: "Race report",
    date: "Jul 23",
    year: "2026",
    title: "Racing the full stack at ICRA 2026",
    blurb:
      "6th of 78 in sim qualifying, top-10 on the physical track, and our complete autonomy pipeline's first race — five days at the 27th RoboRacer competition in Vienna.",
    href: "/pit-notes/racing-the-full-stack-at-icra-2026/",
    thumb: "/assets/pit-notes/icra-2026/team-with-car.jpg",
    featured: true,
  },
];
