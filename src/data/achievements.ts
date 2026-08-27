export interface AchievementEntry {
  date: string;
  name: string;
  loc: string;
  /** e.g. "P9", "QUALIFIED", "Upcoming". Empty string hides the chip. */
  result: string;
  /** Qualifying-round rank, e.g. "Q8/29". Rendered as its own chip before `result`. */
  qualResult?: string;
  detail: string;
  /** Link to a pit note write-up. Renders a "Read more" link under the detail. */
  readMore?: string;
  podium?: boolean;
  upcoming?: boolean;
  founded?: boolean;
}

/** Newest first. */
export const achievements: AchievementEntry[] = [
  {
    date: "Sep 2026",
    name: "6th RoboRacer Sim Racing League",
    loc: "IROS 2026 (Online)",
    result: "Upcoming",
    detail: "",
    upcoming: true,
  },
  {
    date: "Aug 2026",
    name: "29th Roboracer Autonomous Racing Competition",
    loc: "IFAC 2026 @ Busan, Korea",
    result: "P15",
    detail: "15th of 54 teams",
  },
  {
    date: "Jun 2026",
    name: "27th Roboracer Autonomous Racing Competition",
    loc: "ICRA 2026 @ Vienna, Austria",
    result: "P9",
    qualResult: "Q8/29",
    detail: "Qualified 8th of 29 teams; P9 in the Classic Cup",
    readMore: "/pit-notes/racing-the-full-stack-at-icra-2026/",
  },
  {
    date: "May 2026",
    name: "5th RoboRacer Sim Racing League",
    loc: "ICRA 2026 (Online)",
    result: "P11",
    qualResult: "Q6/73",
    detail: "Qualified 6th of 73 teams; P11 in the Phase 2 Time-Attack",
  },
  {
    date: "Nov 2025",
    name: "26th Roboracer Autonomous Racing Competition",
    loc: "ICCAS 2025 @ Incheon, Korea",
    result: "QUALIFIED",
    detail: "",
  },
  {
    date: "2022",
    name: "Team founded",
    loc: "NTU, Singapore",
    result: "",
    detail: "",
    founded: true,
  },
];

export const achievementStats = {
  bestRanking: { value: "#9", foot: "@ ICRA 2026" },
  races: {
    value: String(achievements.filter((e) => !e.founded && !e.upcoming).length),
    foot: "3 countries",
  },
  carsBuilt: { value: "3", foot: "" },
};

/** Splits a leading ordinal ("29th …") so the suffix can render as <sup>. */
export function splitOrdinal(name: string): { num: string; suffix: string; rest: string } {
  const m = name.match(/^(\d+)(st|nd|rd|th)\b(.*)$/i);
  return m ? { num: m[1], suffix: m[2], rest: m[3] } : { num: "", suffix: "", rest: name };
}
