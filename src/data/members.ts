export interface SlotCrop {
  /** Scale multiplier on top of object-fit: contain. */
  s: number;
  /** Horizontal offset of the image center, in % of the frame width. */
  x: number;
  /** Vertical offset of the image center, in % of the frame height. */
  y: number;
}

export interface Member {
  name: string;
  role: "Mentor" | "Team Member";
  dept: string;
  linkedin?: string;
  photo?: string;
  /** Optional saved crop for the photo (from the design's image slots). */
  crop?: SlotCrop;
}

export const team: Member[] = [
  {
    name: "Assoc Prof Arvind Easwaran",
    role: "Mentor",
    dept: "College of Computing and Data Science",
    linkedin: "https://www.linkedin.com/in/arvind-easwaran-066544292",
    photo: "/assets/team/team-1.jpg",
  },
  {
    name: "Eduardo de Conto",
    role: "Mentor",
    dept: "PhD, CCDS",
    linkedin: "https://www.linkedin.com/in/eduardoconto",
    photo: "/assets/team/eduardo.jpg",
  },
  {
    name: "Subrat Prasad Panda",
    role: "Mentor",
    dept: "PhD, CCDS",
    linkedin: "https://www.linkedin.com/in/subratpp",
    photo: "/assets/team/subrat.jpg",
  },
  {
    name: "Raditya Chema Hafizh Pradigta",
    role: "Mentor",
    dept: "",
    linkedin: "https://www.linkedin.com/in/raditya-chema-hafizh-pradigta-7b4ba4190",
    photo: "/assets/team/raditya-crop.png",
  },
  {
    name: "Ting-Ju Chen",
    role: "Team Member",
    dept: "Y3, EEE",
    linkedin: "https://www.linkedin.com/in/ting-ju-chen-251901241",
    photo: "/assets/team/cynthia.jpg",
  },
  {
    name: "Kah Lok Wong",
    role: "Team Member",
    dept: "Y3, EEE",
    linkedin: "https://www.linkedin.com/in/kah-lok-wong-a059392a1",
    photo: "/assets/team/kahlok.jpg",
  },
  {
    name: "Yun-Tung Lee",
    role: "Team Member",
    dept: "Y3, CCDS",
    linkedin: "https://www.linkedin.com/in/yuntunglee",
    photo: "/assets/team/sunny.jpg",
  },
  {
    name: "Chennupati Sri Siva Sai Abhiram",
    role: "Team Member",
    dept: "Y2, CCDS",
    linkedin: "https://www.linkedin.com/in/abhiram-chennupati-2b9838366",
    photo: "/assets/team/member-8.webp",
  },
  {
    name: "Li Mu-En",
    role: "Team Member",
    dept: "Y2, CCDS",
    linkedin: "https://www.linkedin.com/in/nathan-lee-649296365/",
    photo: "/assets/team/member-9.webp",
    crop: { s: 1.633, x: 0.863, y: 7.616 },
  },
  {
    name: "Moolya Baba Purandara",
    role: "Team Member",
    dept: "Y3, MAE",
    linkedin: "https://www.linkedin.com/in/baba-moolya-39b3793a6/",
    photo: "/assets/team/member-10.webp",
  },
  {
    name: "S Sarvajana Hari",
    role: "Team Member",
    dept: "Y2, CCDS",
    photo: "/assets/team/member-11.webp",
  },
];

export const alumni: Member[] = [
  { name: "Michael Yuhas", role: "Mentor", dept: "PhD, IGP", photo: "/assets/team/team-2.jpg" },
  { name: "Benjamin Teh", role: "Team Member", dept: "Graduated, School of MAE", photo: "/assets/team/team-3.jpg" },
  { name: "Luke Toh", role: "Team Member", dept: "Graduated, School of MAE", photo: "/assets/team/team-4.jpg" },
  { name: "Satvik Gupta", role: "Team Member", dept: "Graduated, School of MAE", photo: "/assets/team/team-5.jpg" },
  { name: "JingXiang Mo", role: "Team Member", dept: "Visiting undergraduate, SPMS", photo: "/assets/team/team-6.jpg" },
];
