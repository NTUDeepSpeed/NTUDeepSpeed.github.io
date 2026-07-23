export interface PitNote {
  tag: string;
  /** Short date shown on the Home preview cards. */
  date: string;
  year: string;
  title: string;
  blurb: string;
  href: string;
  featured?: boolean;
}

/** Newest first. Add new write-ups here and create a page under pit-notes/. */
export const pitNotes: PitNote[] = [
  {
    tag: "Race report",
    date: "May 12",
    year: "2026",
    title: "P3 at ICRA 2024",
    blurb:
      "Three rookie drivers, one unfamiliar track, 41.8s laps in the final without a single bumper touch.",
    href: "/pit-notes/p3-at-icra-2024/",
    featured: true,
  },
  {
    tag: "Engineering",
    date: "May 04",
    year: "2026",
    title: "Why we ditched the camera",
    blurb:
      "LiDAR-only perception cut latency by 18ms and removed a whole class of failure modes. Here's the math.",
    href: "/pit-notes/p3-at-icra-2024/",
  },
  {
    tag: "Build",
    date: "Apr 22",
    year: "2026",
    title: "A new chassis in 14 days",
    blurb:
      "VESC 6 MkVI, Hokuyo UST-10LX, Jetson Orin NX. What we learned soldering at 2am the night before shipping.",
    href: "/pit-notes/p3-at-icra-2024/",
  },
  {
    tag: "Engineering",
    date: "Apr 02",
    year: "2026",
    title: "Pure pursuit, but with feeling",
    blurb: "How a 12-line tweak to lookahead distance cut our average lap by 1.2 seconds.",
    href: "/pit-notes/p3-at-icra-2024/",
  },
  {
    tag: "Sim2Real",
    date: "Mar 18",
    year: "2026",
    title: "The 18ms gap",
    blurb:
      "What changed between our F1Tenth Gym times and our real-track times. Spoiler: tire grip.",
    href: "/pit-notes/p3-at-icra-2024/",
  },
  {
    tag: "Team",
    date: "Feb 28",
    year: "2026",
    title: "Welcoming the rookies",
    blurb:
      "Four new members, two new disciplines, and an onboarding doc we wrote and then immediately rewrote.",
    href: "/pit-notes/p3-at-icra-2024/",
  },
];
