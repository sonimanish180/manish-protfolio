export const personalInfo = {
  name: "Manish Soni",
  title: "Lead Software Engineer",
  subtitle: "Product & Platform Architecture",
  email: "msoni@ar.iitr.ac.in",
  phone: "+91 8960072136",
  linkedin: "https://www.linkedin.com/in/manish-soni",
  tagline:
    "Product-focused engineer specializing in 0→1 products and scalable platform architecture. I build end-to-end systems that ship.",
  roles: [
    "Lead Software Engineer",
    "Platform Architect",
    "Full-Stack Developer",
    "React / Next.js Engineer",
    "Golang Backend Engineer",
  ],
}

export type Experience = {
  company: string
  location: string
  role: string
  period: string
  current: boolean
  bullets: string[]
}

export const experience: Experience[] = [
  {
    company: "Payram",
    location: "Dubai (Remote)",
    role: "Lead Software Engineer",
    period: "Apr 2024 – Present",
    current: true,
    bullets: [
      "Led development of the Payram Core frontend (Next.js) from scratch, shaping scalable UI architecture.",
      "Implemented payment channels and core flows in Payram Core backend (Golang).",
      "Architected and delivered the Payments Application, enabling modular and scalable payment integrations.",
      "Designed the Multi-Onramper architecture to support integration with multiple providers.",
      "Built a reusable API Orchestrator library to standardize integrations and reduce onboarding effort by ~30%.",
      "Independently developed and delivered the Merchant Application (React Native) end-to-end.",
      "Built a Smart Contract Deployment Dashboard to improve security and reliability of production deployments.",
      "Contributed to product architecture and technical decision-making, while mentoring peers.",
    ],
  },
  {
    company: "Xalts",
    location: "Bengaluru",
    role: "Software Development Engineer",
    period: "May 2023 – Mar 2024",
    current: false,
    bullets: [
      "Built a blockchain data analysis platform from scratch, handling complex data structures and large-scale processing.",
      "Architected a unified authentication system using AWS Cognito, enabling secure multi-application access.",
      "Designed and developed a workflow/builder system using canvas and tree-based architecture.",
      "Improved deployment workflows, ensuring smoother development-to-production transitions.",
      "Collaborated with product and design teams to drive system design decisions and improve usability.",
    ],
  },
  {
    company: "Create Protocol",
    location: "Goa (Remote)",
    role: "Full Stack Developer – Web3",
    period: "Jul 2022 – Apr 2023",
    current: false,
    bullets: [
      "Led development of a no-code platform (Creator Console) from scratch, designing both frontend and backend architecture.",
      "Managed and mentored a team of 4 engineers, improving delivery efficiency and technical quality.",
      "Defined system architecture, product scope, and technical direction for multiple projects.",
      "Delivered multiple projects end-to-end while collaborating with clients and product teams.",
    ],
  },
  {
    company: "Credenc",
    location: "Gurgaon",
    role: "Frontend Developer",
    period: "Oct 2021 – Jul 2022",
    current: false,
    bullets: [
      "Built frontend systems from scratch for a Fee Management System and Course Aggregator platform.",
      "Architected scalable UI using React, Redux, and AWS deployment infrastructure.",
      "Collaborated with product and design teams to improve usability and performance.",
      "Mentored interns and contributed to frontend best practices.",
    ],
  },
  {
    company: "invoid",
    location: "Gurgaon",
    role: "Frontend Developer",
    period: "Apr 2021 – Oct 2021",
    current: false,
    bullets: [
      "Developed frontend for KYC and verification systems, including dashboards and compliance tools.",
      "Built responsive applications using React, Redux, and WebRTC for document and video verification.",
      "Supported development of systems related to OCR, e-sign, and digital verification processes.",
    ],
  },
]

export type SkillCategory = {
  category: string
  color: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    color: "violet",
    skills: ["TypeScript", "JavaScript", "Golang", "Solidity"],
  },
  {
    category: "Frontend",
    color: "sky",
    skills: ["React.js", "Next.js"],
  },
  {
    category: "Mobile",
    color: "emerald",
    skills: ["React Native"],
  },
  {
    category: "Backend",
    color: "amber",
    skills: ["Node.js", "Go"],
  },
  {
    category: "Cloud & Infra",
    color: "rose",
    skills: ["AWS Cognito", "AWS Deployment"],
  },
  {
    category: "Expertise",
    color: "indigo",
    skills: [
      "System Architecture",
      "Platform Design",
      "Technical Leadership",
      "API Orchestration",
      "Integration Systems",
      "0→1 Product Development",
      "Team Mentorship",
    ],
  },
]

export type Project = {
  title: string
  description: string
  impact?: string
  tech: string[]
  company: string
}

export const projects: Project[] = [
  {
    title: "Payram Core",
    description:
      "Led full-stack development of the Payram Core payment platform — frontend in Next.js and backend in Golang. Architected scalable UI and implemented core payment channel flows from the ground up.",
    impact: "2 production-grade applications shipped",
    tech: ["Next.js", "Golang", "TypeScript"],
    company: "Payram",
  },
  {
    title: "Multi-Onramper Architecture",
    description:
      "Designed a provider-agnostic onramper architecture allowing seamless integration with multiple payment providers. Paired with a reusable API Orchestrator library to standardize and simplify onboarding.",
    impact: "~30% reduction in provider onboarding complexity",
    tech: ["System Design", "API Integration", "Golang"],
    company: "Payram",
  },
  {
    title: "Merchant Application",
    description:
      "Independently designed and delivered the Merchant Application end-to-end — from architecture to production deployment — as a React Native mobile app.",
    tech: ["React Native", "TypeScript"],
    company: "Payram",
  },
  {
    title: "Smart Contract Dashboard",
    description:
      "Built a deployment dashboard improving security, traceability, and reliability for production smart contract deployments. Provided a unified interface for teams to manage on-chain deployments safely.",
    tech: ["React", "Web3", "Solidity"],
    company: "Payram",
  },
  {
    title: "Blockchain Data Platform",
    description:
      "Built a blockchain data analysis platform at Xalts from scratch, handling complex data structures and large-scale on-chain data processing.",
    tech: ["TypeScript", "Blockchain", "AWS"],
    company: "Xalts",
  },
  {
    title: "Creator Console",
    description:
      "Led development of a no-code platform from scratch at Create Protocol, managing a team of 4 engineers. Defined system architecture, product scope, and technical direction across multiple client projects.",
    tech: ["React", "Node.js", "No-code"],
    company: "Create Protocol",
  },
]

export const education = {
  institution: "Indian Institute of Technology, Roorkee",
  shortName: "IIT Roorkee",
  degree: "B.Arch",
  period: "2014 – 2019",
}

export const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "2", label: "Production Apps Shipped" },
  { value: "4+", label: "Engineers Mentored" },
  { value: "~30%", label: "Onboarding Complexity Reduced" },
]
