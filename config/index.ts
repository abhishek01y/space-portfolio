import type { Metadata } from "next";

export const siteConfig: Metadata = {
  title: "Abhishek Yadav | Software Developer",
  description:
    "Portfolio of Abhishek Yadav, a Computer Science Engineering student and Software Developer specializing in full stack web development, AI integration, and scalable backend architecture.",
  keywords: [
    "Abhishek Yadav",
    "Abhishek",
    "software developer",
    "full stack developer",
    "backend developer",
    "AI",
    "MERN stack",
    "Next.js",
    "React",
    "Spring Boot",
    "FastAPI",
    "portfolio",
    "web development",
    "Chandigarh University"
  ] as Array<string>,
  authors: {
    name: "Abhishek Yadav",
    url: "https://github.com/abhishek01y",
  },
  creator: "Abhishek Yadav",
  openGraph: {
    title: "Abhishek Yadav | Software Developer",
    description:
      "Explore selected projects, modern web skills, and the professional portfolio of Abhishek Yadav.",
    url: "https://github.com/abhishek01y",
    siteName: "Abhishek Yadav Portfolio",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Abhishek Yadav Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
} as const;
