import { FaYoutube } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

export const SKILL_DATA = [
  { skill_name: "React.js", image: "react.png", width: 80, height: 80 },
  { skill_name: "Next.js 14", image: "next.png", width: 80, height: 80 },
  { skill_name: "TypeScript", image: "ts.png", width: 80, height: 80 },
  { skill_name: "Node.js", image: "node.png", width: 80, height: 80 },
  { skill_name: "Express.js", image: "express.png", width: 80, height: 80 },
  { skill_name: "MongoDB", image: "mongodb.png", width: 40, height: 40 },
  { skill_name: "PostgreSQL", image: "postgresql.png", width: 70, height: 70 },
  { skill_name: "Tailwind CSS", image: "tailwind.png", width: 80, height: 80 },
] as const;

export const SOCIALS = [
  { name: "GitHub", icon: RxGithubLogo, link: "https://github.com/abhishek01y" },
  { name: "LinkedIn", icon: RxLinkedinLogo, link: "https://www.linkedin.com/in/abhishek01y/" },
  { name: "Instagram", icon: RxInstagramLogo, link: "https://www.instagram.com/_abhi_unfiltered_/" },
] as const;

export const FRONTEND_SKILL = [
  { skill_name: "React.js", image: "react.png", width: 80, height: 80 },
  { skill_name: "Next.js 14", image: "next.png", width: 80, height: 80 },
  { skill_name: "TypeScript", image: "ts.png", width: 80, height: 80 },
  { skill_name: "JavaScript ES6+", image: "js.png", width: 65, height: 65 },
  { skill_name: "Tailwind CSS", image: "tailwind.png", width: 80, height: 80 },
] as const;

export const BACKEND_SKILL = [
  { skill_name: "Node.js", image: "node.png", width: 80, height: 80 },
  { skill_name: "Express.js", image: "express.png", width: 80, height: 80 },
  // Placeholder images used for Spring Boot, FastAPI, Flask - replace in /public/skills/
  { skill_name: "Spring Boot", image: "node.png", width: 80, height: 80 },
  { skill_name: "FastAPI", image: "go.png", width: 60, height: 60 },
  { skill_name: "Flask", image: "go.png", width: 60, height: 60 },
] as const;

export const FULLSTACK_SKILL = [
  { skill_name: "MongoDB Atlas", image: "mongodb.png", width: 40, height: 40 },
  { skill_name: "PostgreSQL", image: "postgresql.png", width: 70, height: 70 },
  { skill_name: "Supabase", image: "firebase.png", width: 55, height: 55 },
  { skill_name: "SQLite", image: "mysql.png", width: 70, height: 70 },
] as const;

export const OTHER_SKILL = [
  { skill_name: "Java", image: "ts.png", width: 80, height: 80 },
  { skill_name: "Python", image: "ts.png", width: 80, height: 80 },
  { skill_name: "C++", image: "ts.png", width: 80, height: 80 },
  { skill_name: "Git & GitHub", image: "go.png", width: 60, height: 60 },
] as const;

export const PROJECTS = [
  {
    title: "SafeRoute AI",
    description: "AI-powered urban safety platform delivering real-time safety scores using crowd reports, news sentiment analysis, and live location data.",
    image: "/projects/project-1.png",
    demoLink: "https://safe-route-brown.vercel.app/",
    githubLink: "https://github.com/abhishek01y/SafeRoute-AI",
    techStack: ["Next.js 14", "FastAPI", "Node.js", "Supabase", "PostgreSQL", "Mapbox GL JS"],
    highlights: ["Real-time safety scores", "Crowd-sourced reports", "News sentiment analysis", "Live location data"]
  },
  {
    title: "Resource & Skill Management System",
    description: "Full-stack employee skill tracking and ranking platform with analytics dashboard and automated scoring engine.",
    image: "/projects/project-2.png",
    githubLink: "https://github.com/abhishek01y/skill-management-manager",
    techStack: ["Java", "Spring Boot", "MongoDB Atlas", "React.js"],
    highlights: ["Employee skill tracking", "Ranking platform", "Analytics dashboard", "Automated scoring engine"]
  }
] as const;

export const MISSION_STATS = [
  { value: "4+", label: "Major Projects", detail: "Ready for featured work" },
  { value: "15+", label: "Technologies", detail: "Modern full stack toolkit" },
  { value: "Open", label: "Availability", detail: "Internships & Collaborations" },
] as const;

export const ABOUT_PANELS = [
  {
    title: "Background",
    description: "I am a Computer Science Engineering student at Chandigarh University focused on full stack development and AI-powered systems.",
  },
  {
    title: "Experience",
    description: "I enjoy building modern web applications, AI-based platforms, analytics dashboards, and backend systems. I started with problem solving and gradually moved into full stack development, backend engineering, and AI-powered applications.",
  },
  {
    title: "Current Focus",
    description: "Scalable backend architecture, AI integrations, DSA, and system design.",
  },
] as const;

export const PROCESS_STEPS = [
  { step: "01", title: "Discover", description: "Understand the goal, audience, constraints, and strongest product direction." },
  { step: "02", title: "Design", description: "Shape the interface, content structure, responsive flow, and interaction style." },
  { step: "03", title: "Build", description: "Implement clean components, polished motion, and scalable application structure." },
  { step: "04", title: "Optimize", description: "Refine performance, accessibility, SEO, responsiveness, and production quality." },
] as const;

export const RESUME_HIGHLIGHTS = [
  "Runner-Up – Inter-Hostel Basketball League",
  "Participant – Code Craftor 3.0 Hackathon",
  "Finalist – Mystery Code Competition",
  "Finalist – Apptivista Aptitude Competition",
  "Participant – AI Fest 2026",
] as const;

export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
      { name: "GitHub", icon: RxGithubLogo, link: "https://github.com/abhishek01y" },
      { name: "LinkedIn", icon: RxLinkedinLogo, link: "https://www.linkedin.com/in/abhishek01y/" },
      { name: "Instagram", icon: RxInstagramLogo, link: "https://www.instagram.com/_abhi_unfiltered_/" },
    ],
  },
  {
    title: "Interests",
    data: [
      { name: "Basketball", icon: null, link: "#" },
      { name: "Content Creation", icon: null, link: "#" },
      { name: "AI & Emerging Tech", icon: null, link: "#" },
    ],
  },
  {
    title: "About",
    data: [
      { name: "About Me", icon: null, link: "#about-me" },
      { name: "Contact Me", icon: null, link: "mailto:abhishkeyadav5@gmail.com" },
      { name: "Download Resume", icon: null, link: "/resume.pdf" },
    ],
  },
] as const;

export const NAV_LINKS = [
  { title: "About me", link: "#about-me" },
  { title: "Skills", link: "#skills" },
  { title: "Projects", link: "#projects" },
  { title: "Resume", link: "#resume" },
  { title: "Contact", link: "#contact" },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/abhishek01y",
};
