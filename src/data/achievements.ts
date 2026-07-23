export interface AchievementEntry {
  date: string;
  name: string;
  loc: string;
  /** e.g. "P9", "QUALIFIED", "Upcoming". Empty string hides the chip. */
  result: string;
  detail: string;
  podium?: boolean;
  upcoming?: boolean;
  founded?: boolean;
}

/** Newest first. */
export const achievements: AchievementEntry[] = [
  {
    date: "Aug 2026",
    name: "29th Roboracer Autonomous Racing Competition",
    loc: "IFAC 2026 @ Busan, Korea",
    result: "Upcoming",
    detail: "",
    upcoming: true,
  },
  {
    date: "Jun 2026",
    name: "27th Roboracer Autonomous Racing Competition",
    loc: "ICRA 2026 @ Vienna, Austria",
    result: "P9",
    detail: "",
  },
  {
    date: "May 2026",
    name: "5th RoboRacer Sim Racing League",
    loc: "ICRA 2026 (Online)",
    result: "P11",
    detail: "",
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
    value: String(achievements.filter((e) => !e.founded).length),
    foot: "3 countries",
  },
  carsBuilt: { value: "3", foot: "" },
};

/** Splits a leading ordinal ("29th …") so the suffix can render as <sup>. */
export function splitOrdinal(name: string): { num: string; suffix: string; rest: string } {
  const m = name.match(/^(\d+)(st|nd|rd|th)\b(.*)$/i);
  return m ? { num: m[1], suffix: m[2], rest: m[3] } : { num: "", suffix: "", rest: name };
}
