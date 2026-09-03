import { useState, useEffect } from "react";
import type { CSSProperties, ReactNode } from "react";
import { motion } from "motion/react";
import {
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ChevronRight,
  Calendar,
  BookOpen,
  Globe,
  Github,
  Layers,
  Users2,
  Palette,
  Check,
  Copy,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Typography
// ─────────────────────────────────────────────────────────────

const serif: CSSProperties = {
  fontFamily: "'Fraunces', Georgia, serif",
};

const mono: CSSProperties = {
  fontFamily: "'Geist Mono', 'Courier New', monospace",
};

// ─────────────────────────────────────────────────────────────
// Theme Colors
// ─────────────────────────────────────────────────────────────

const THEMES = [
  {
    name: "Rose",
    color: "#C2748A",
    light: "#FFF0F3",
    border: "#FCCDD4",
    soft: "#D4A0B0",
  },
  {
    name: "Sage",
    color: "#5F8F82",
    light: "#EEF7F3",
    border: "#C9E3DA",
    soft: "#9FC5B9",
  },
  {
    name: "Lavender",
    color: "#8B78A8",
    light: "#F4F0FA",
    border: "#DDD3EA",
    soft: "#B8A9CE",
  },
  {
    name: "Blue",
    color: "#5F8FAF",
    light: "#EFF7FB",
    border: "#C9E2EF",
    soft: "#9FC4D8",
  },
];

// ─────────────────────────────────────────────────────────────
// Language
// ─────────────────────────────────────────────────────────────

type Language = "EN" | "TH";

const TRANSLATIONS = {
  EN: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      education: "Education",
      training: "Training",
      contact: "Contact",
    },

    hero: {
      available: "Available for Internship & Entry-Level Positions",
      description:
        "UX/UI Designer & Computer Science student passionate about crafting intuitive, visually compelling digital experiences through user-centered design.",
      viewWork: "View My Work",
      contact: "Contact Me",
      scroll: "Scroll",
      primaryTool: "Primary Tool",
      designer: "Designer",
      colorPalette: "Color Palette",
    },

    about: {
      careerObjective: "Career Objective",
      title1: "Creating Meaningful",
      title2: "User Experiences",
      paragraph1:
        "I am a Computer Science student with a strong interest in UX/UI Design. I enjoy creating simple, intuitive, and user-friendly digital experiences.",
      paragraph2:
        "I am looking for an internship opportunity where I can apply what I have learned, improve my design skills, and gain experience working with a professional team.",
      summary: "Summary of Qualifications",
      dateOfBirth: "Date of Birth",
      nationality: "Nationality",
      location: "Location",
      email: "Email",
      phone: "Phone",
      languages: "Languages",
      thai: "Thai",
      english: "English",
      native: "Native · Excellent",
      basic: "Basic Proficiency",
    },

    skills: {
      heading: "UX/UI Skills & Professional Skills",
      title1: "Tools of",
      title2: "the Craft",
      uxui: "UX/UI Design",
      uxuiDescription:
        "Designing clear and user-friendly experiences from user flows to high-fidelity interfaces.",
      designTools: "Design Tools",
      designToolsDescription:
        "Tools used to create visual designs, wireframes, prototypes, and supporting graphics.",
      research: "UX Research & Testing",
      researchDescription:
        "Understanding user needs, validating designs, and preparing structured testing activities.",
      softSkills: "Soft Skills",
      softSkillsDescription:
        "Professional qualities developed through coursework, project collaboration, and teamwork.",
    },

    projects: {
      heading: "My Projects",
      title1: "Selected",
      title2: "Work",
      description:
        "A collection of academic projects and UX/UI design work created during my Computer Science studies.",
      contribution: "My Contribution",
      inProgress: "Currently In Progress",
      seniorProject: "Senior Project",
      academicProject: "Academic Project",
    },

    education: {
      heading: "Education",
      title1: "Academic",
      title2: "Background",
      gpa: "GPA",
      universityDegree: "Bachelor of Science in Computer Science",
      universityDuration: "July 2023 – Present (In Progress)",
      highSchoolDegree:
        "General Education Program (High School Certificate)",
      highSchoolDuration: "May 2019 – March 2022",
    },

    training: {
      heading: "Training & Seminars",
      title1: "Continuous",
      title2: "Learning",
    },

    contact: {
      heading: "Get In Touch",
      title1: "Let’s Work",
      title2: "Together",
      description:
        "Interested in internship opportunities or collaborations? Feel free to contact me through the information below.",
      opportunities: "Open to Opportunities",
      opportunitiesDescription:
        "Currently seeking internship opportunities in UX/UI Design and related roles.",
    },

    footer: {
      role: "UX/UI Designer · Nakhon Ratchasima, Thailand",
      copyright: "© 2026 All rights reserved.",
    },
  },

  TH: {
    nav: {
      about: "เกี่ยวกับฉัน",
      skills: "ทักษะ",
      projects: "ผลงาน",
      education: "การศึกษา",
      training: "การอบรม",
      contact: "ติดต่อ",
    },

    hero: {
      available: "เปิดรับโอกาสฝึกงานและตำแหน่งระดับเริ่มต้น",
      description:
        "นักออกแบบ UX/UI และนักศึกษาวิทยาการคอมพิวเตอร์ที่มีความสนใจในการสร้างประสบการณ์ดิจิทัลที่ใช้งานง่าย สวยงาม และตอบโจทย์ผู้ใช้ โดยยึดหลักการออกแบบที่เน้นผู้ใช้เป็นศูนย์กลาง",
      viewWork: "ดูผลงานของฉัน",
      contact: "ติดต่อฉัน",
      scroll: "เลื่อนลง",
      primaryTool: "เครื่องมือหลัก",
      designer: "นักออกแบบ",
      colorPalette: "ชุดสี",
    },

    about: {
      careerObjective: "เป้าหมายในการทำงาน",
      title1: "สร้างประสบการณ์",
      title2: "ที่มีความหมาย",
      paragraph1:
        "ฉันเป็นนักศึกษาวิทยาการคอมพิวเตอร์ที่มีความสนใจด้าน UX/UI Design ชอบการออกแบบประสบการณ์ดิจิทัลที่เรียบง่าย ใช้งานง่าย และตอบโจทย์ความต้องการของผู้ใช้",
      paragraph2:
        "กำลังมองหาโอกาสฝึกงานที่ได้ใช้ความรู้ที่เรียนมา พัฒนาทักษะด้านการออกแบบ และเรียนรู้ประสบการณ์การทำงานร่วมกับทีมมืออาชีพ",
      summary: "คุณสมบัติโดยสรุป",
      dateOfBirth: "วันเกิด",
      nationality: "สัญชาติ",
      location: "ที่อยู่",
      email: "อีเมล",
      phone: "โทรศัพท์",
      languages: "ภาษา",
      thai: "ภาษาไทย",
      english: "ภาษาอังกฤษ",
      native: "เจ้าของภาษา · ดีเยี่ยม",
      basic: "ระดับพื้นฐาน",
    },

    skills: {
      heading: "ทักษะ UX/UI และทักษะการทำงาน",
      title1: "เครื่องมือและ",
      title2: "ทักษะที่ใช้",
      uxui: "การออกแบบ UX/UI",
      uxuiDescription:
        "ออกแบบประสบการณ์ที่ชัดเจนและใช้งานง่าย ตั้งแต่ User Flow ไปจนถึง High-Fidelity Interface",
      designTools: "เครื่องมือการออกแบบ",
      designToolsDescription:
        "เครื่องมือสำหรับสร้างงานออกแบบ Wireframe Prototype และงานกราฟิกประกอบ",
      research: "การวิจัยและทดสอบ UX",
      researchDescription:
        "ทำความเข้าใจความต้องการของผู้ใช้ ตรวจสอบการออกแบบ และเตรียมการทดสอบอย่างเป็นระบบ",
      softSkills: "ทักษะด้านการทำงาน",
      softSkillsDescription:
        "ทักษะที่พัฒนาจากการเรียน การทำโปรเจกต์ และการทำงานร่วมกับทีม",
    },

    projects: {
      heading: "ผลงานของฉัน",
      title1: "ผลงานที่",
      title2: "คัดเลือก",
      description:
        "รวมผลงานจากโครงงานการศึกษาและงาน UX/UI ที่พัฒนาระหว่างการศึกษาด้านวิทยาการคอมพิวเตอร์",
      contribution: "สิ่งที่ฉันรับผิดชอบ",
      inProgress: "กำลังดำเนินการ",
      seniorProject: "โครงงานจบ",
      academicProject: "โครงงานการศึกษา",
    },

    education: {
      heading: "การศึกษา",
      title1: "ประวัติ",
      title2: "การศึกษา",
      gpa: "เกรดเฉลี่ย",
      universityDegree:
        "วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์",
      universityDuration: "กรกฎาคม 2566 – ปัจจุบัน",
      highSchoolDegree:
        "หลักสูตรการศึกษาขั้นพื้นฐาน ระดับมัธยมศึกษาตอนปลาย",
      highSchoolDuration: "พฤษภาคม 2562 – มีนาคม 2565",
    },

    training: {
      heading: "การอบรมและสัมมนา",
      title1: "การเรียนรู้",
      title2: "อย่างต่อเนื่อง",
    },

    contact: {
      heading: "ติดต่อฉัน",
      title1: "มาร่วมงาน",
      title2: "ไปด้วยกัน",
      description:
        "หากสนใจโอกาสฝึกงานหรือการร่วมงาน สามารถติดต่อฉันได้ผ่านข้อมูลด้านล่าง",
      opportunities: "เปิดรับโอกาส",
      opportunitiesDescription:
        "กำลังมองหาโอกาสฝึกงานด้าน UX/UI Design และตำแหน่งที่เกี่ยวข้อง",
    },

    footer: {
      role: "UX/UI Designer · นครราชสีมา ประเทศไทย",
      copyright: "© 2026 สงวนลิขสิทธิ์",
    },
  },
};

// ─────────────────────────────────────────────────────────────
// Skills
// ─────────────────────────────────────────────────────────────

const DESIGN_SKILLS = [
  "UI Design",
  "Wireframing",
  "Interactive Prototyping",
  "User-Centered Design (UCD)",
  "User Flow Mapping",
  "Information Architecture",
];

const DESIGN_TOOLS = [
  "Figma",
  "Canva",
  "Adobe Photoshop",
  "Affinity Designer",
];

const UX_RESEARCH = [
  "Requirements Analysis",
  "User Research",
  "Usability Testing",
  "User Acceptance Testing (UAT)",
  "Test Case Preparation",
];

const SOFT_SKILLS = [
  "Attention to Detail",
  "Problem-Solving",
  "Fast Learner & Adaptability",
  "Teamwork & Collaboration",
  "Effective Communication",
  "Analytical Thinking",
];

// ─────────────────────────────────────────────────────────────
// Highlights
// ─────────────────────────────────────────────────────────────

const HIGHLIGHTS = {
  EN: [
    "Experience using Figma to create UI designs, wireframes, and interactive prototypes.",
    "Understanding of User-Centered Design (UCD), user flows, and basic design systems.",
    "Familiar with usability testing, test case preparation, and User Acceptance Testing (UAT).",
    "Understanding of Agile and Scrum methodology through academic project work.",
    "Able to work independently, communicate effectively, and collaborate with a team.",
  ],

  TH: [
    "มีประสบการณ์ใช้ Figma ในการออกแบบ UI, Wireframe และ Interactive Prototype",
    "มีความเข้าใจเกี่ยวกับ User-Centered Design (UCD), User Flow และ Design System เบื้องต้น",
    "มีความคุ้นเคยกับการทดสอบ Usability, การจัดทำ Test Case และ User Acceptance Testing (UAT)",
    "มีความเข้าใจ Agile และ Scrum จากการทำโครงงานทางการศึกษา",
    "สามารถทำงานด้วยตนเอง สื่อสารได้อย่างมีประสิทธิภาพ และทำงานร่วมกับทีมได้",
  ],
};

// ─────────────────────────────────────────────────────────────
// Training
// ─────────────────────────────────────────────────────────────

const TRAINING = [
  {
    title:
      'Information Literacy Training: "Innovation Review and AI"',
    org:
      "Office of Academic Resources and Information Technology, Nakhon Ratchasima Rajabhat University",
    date: "December 17, 2025",
  },
  {
    title: "Workshop on Document Formatting and Academic Citation",
    org:
      "Office of Academic Resources and Information Technology, Nakhon Ratchasima Rajabhat University",
    date: "January 7, 2026",
  },
];

// ─────────────────────────────────────────────────────────────
// Shared Components
// ─────────────────────────────────────────────────────────────

type ChipColor = "rose" | "stone" | "purple";

function Chip({
  label,
  color = "rose",
}: {
  label: string;
  color?: ChipColor;
}) {
  const cls: Record<ChipColor, string> = {
    rose: "bg-rose-50 text-rose-700 border-rose-200/80",
    stone: "bg-stone-100 text-stone-600 border-stone-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200/70",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${cls[color]}`}
      style={mono}
    >
      {label}
    </span>
  );
}

function SectionTag({
  children,
  center = false,
  theme,
}: {
  children: ReactNode;
  center?: boolean;
  theme: (typeof THEMES)[number];
}) {
  return (
    <div
      className={`flex items-center ${
        center ? "justify-center" : ""
      } gap-2.5 mb-5`}
    >
      <div
        className="w-6 h-px"
        style={{
          background: theme.color,
        }}
      />

      <span
        className="text-xs font-semibold tracking-[0.2em] uppercase"
        style={{
          ...mono,
          color: theme.color,
        }}
      >
        {children}
      </span>

      {center && (
        <div
          className="w-6 h-px"
          style={{
            background: theme.color,
          }}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────

function Nav({
  active,
  theme,
  setThemeIndex,
  language,
  setLanguage,
}: {
  active: string;
  theme: (typeof THEMES)[number];
  setThemeIndex: (index: number) => void;
  language: Language;
  setLanguage: (language: Language) => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showThemes, setShowThemes] = useState(false);

  const t = TRANSLATIONS[language];

  const translatedNav = [
    { href: "#about", label: t.nav.about },
    { href: "#skills", label: t.nav.skills },
    { href: "#projects", label: t.nav.projects },
    { href: "#education", label: t.nav.education },
    { href: "#training", label: t.nav.training },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 border-b" : "py-6"
      }`}
      style={
        scrolled
          ? {
              background: "rgba(250,247,242,0.95)",
              backdropFilter: "blur(12px)",
              borderColor: "#E8DDD4",
            }
          : undefined
      }
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <a
          href="#"
          className="text-2xl font-semibold tracking-tight text-[#1A1614] leading-none"
          style={{
            ...serif,
            fontStyle: "italic",
          }}
        >
          Manthana Ngamsanthia
        </a>

        <div className="hidden md:flex items-center gap-6">
          {translatedNav.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors duration-200 ${
                active === href.slice(1)
                  ? ""
                  : "text-[#8B7B72] hover:text-[#1A1614]"
              }`}
              style={
                active === href.slice(1)
                  ? {
                      color: theme.color,
                    }
                  : undefined
              }
            >
              {label}
            </a>
          ))}

          <button
            onClick={() =>
              setLanguage(language === "EN" ? "TH" : "EN")
            }
            className="px-3 h-9 rounded-full border flex items-center justify-center gap-1.5 text-xs font-semibold hover:scale-105 transition-all"
            style={{
              borderColor: theme.border,
              background: theme.light,
              color: theme.color,
              ...mono,
            }}
            aria-label="Change language"
          >
            <Globe size={14} />
            {language}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowThemes(!showThemes)}
              className="w-9 h-9 rounded-full border flex items-center justify-center hover:scale-105 transition-all"
              style={{
                borderColor: theme.border,
                background: theme.light,
                color: theme.color,
              }}
              aria-label="Change theme color"
            >
              <Palette size={16} />
            </button>

            {showThemes && (
              <div
                className="absolute right-0 top-12 p-3 rounded-2xl border bg-white shadow-xl flex gap-2"
                style={{
                  borderColor: "#E8DDD4",
                }}
              >
                {THEMES.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setThemeIndex(index);
                      setShowThemes(false);
                    }}
                    title={item.name}
                    className="relative w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform flex items-center justify-center"
                    style={{
                      background: item.color,
                      borderColor:
                        theme.name === item.name
                          ? "#1A1614"
                          : "transparent",
                    }}
                  >
                    {theme.name === item.name && (
                      <Check size={14} className="text-white" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() =>
              setLanguage(language === "EN" ? "TH" : "EN")
            }
            className="px-3 h-9 rounded-full border flex items-center justify-center gap-1.5 text-xs font-semibold"
            style={{
              borderColor: theme.border,
              background: theme.light,
              color: theme.color,
              ...mono,
            }}
            aria-label="Change language"
          >
            <Globe size={14} />
            {language}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowThemes(!showThemes)}
              className="w-9 h-9 rounded-full border flex items-center justify-center"
              style={{
                borderColor: theme.border,
                background: theme.light,
                color: theme.color,
              }}
              aria-label="Change theme color"
            >
              <Palette size={16} />
            </button>

            {showThemes && (
              <div
                className="absolute right-0 top-12 p-3 rounded-2xl border bg-white shadow-xl flex gap-2"
                style={{
                  borderColor: "#E8DDD4",
                }}
              >
                {THEMES.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setThemeIndex(index);
                      setShowThemes(false);
                    }}
                    title={item.name}
                    className="relative w-8 h-8 rounded-full border-2 flex items-center justify-center"
                    style={{
                      background: item.color,
                      borderColor:
                        theme.name === item.name
                          ? "#1A1614"
                          : "transparent",
                    }}
                  >
                    {theme.name === item.name && (
                      <Check size={14} className="text-white" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="text-[#8B7B72] hover:text-[#1A1614] transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="md:hidden mx-4 mt-2 p-4 rounded-2xl border flex flex-col gap-1 shadow-lg"
          style={{
            background: "#FFFFFF",
            borderColor: "#E8DDD4",
          }}
        >
          {translatedNav.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="py-2.5 px-3 rounded-xl text-sm font-medium text-[#5A4D45]"
              style={{
                color:
                  active === href.slice(1)
                    ? theme.color
                    : undefined,
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────

function Hero({
  theme,
  language,
}: {
  theme: (typeof THEMES)[number];
  language: Language;
}) {
  const t = TRANSLATIONS[language];

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(${theme.color}22 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div
        className="absolute top-24 right-1/3 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: theme.color,
          opacity: 0.07,
          filter: "blur(120px)",
        }}
      />

      <div
        className="absolute bottom-24 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "#9B7BB0",
          opacity: 0.08,
          filter: "blur(100px)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 48,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold border mb-8"
            style={{
              ...mono,
              background: theme.light,
              borderColor: theme.border,
              color: theme.color,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{
                background: "#34D399",
              }}
            />

            {t.hero.available}
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-[0.92] text-[#1A1614] mb-3"
            style={serif}
          >
            Miss{" "}
            <span
              className="italic font-semibold"
              style={{
                color: theme.color,
              }}
            >
              Manthana
            </span>
          </h1>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-[0.92] text-[#1A1614] mb-8"
            style={serif}
          >
            Ngamsanthia
          </h1>

          <p className="text-lg text-[#6B5E54] leading-relaxed max-w-lg mb-10">
            {t.hero.description}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-white hover:opacity-90 hover:scale-[1.02] transition-all"
              style={{
                background: theme.color,
              }}
            >
              {t.hero.viewWork}
              <ArrowRight size={14} />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-[#5A4D45] border hover:bg-[#F5EEE8] transition-colors"
              style={{
                borderColor: "#E0D5CA",
              }}
            >
              <Mail size={14} />
              {t.hero.contact}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.88,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="hidden lg:flex items-center justify-center relative"
        >
          <div className="relative w-full max-w-xs">
            <div
              className="rounded-3xl overflow-hidden shadow-2xl border"
              style={{
                background: "#FFFFFF",
                borderColor: "#E8DDD4",
              }}
            >
              <div
                className="flex items-center gap-1.5 px-4 py-3 border-b"
                style={{
                  borderColor: "#F0E9E1",
                }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />

                <div
                  className="ml-3 flex-1 h-4 rounded"
                  style={{
                    background: "#F5F0EB",
                  }}
                />
              </div>

              <div className="p-5 space-y-3">
                <div
                  className="h-20 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${theme.light}, #F5EEF8)`,
                  }}
                >
                  <div className="text-center">
                    <div
                      className="w-9 h-9 rounded-full mx-auto mb-2"
                      style={{
                        background: `linear-gradient(135deg, ${theme.color}, #9B7BB0)`,
                      }}
                    />

                    <div
                      className="w-16 h-1.5 rounded mx-auto"
                      style={{
                        background: "#E8DDD4",
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    theme.color,
                    "#9B7BB0",
                    "#E8A87C",
                    "#6BA5C9",
                  ].map((color) => (
                    <div
                      key={color}
                      className="h-10 rounded-lg"
                      style={{
                        background: color + "30",
                        border: `1.5px solid ${color}50`,
                      }}
                    >
                      <div className="flex items-end justify-center h-full pb-1.5">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            background: color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {[75, 50, 88].map((w, i) => (
                    <div
                      key={i}
                      className="h-2 rounded-full"
                      style={{
                        background: "#F0E9E1",
                      }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${w}%`,
                          background:
                            i === 0
                              ? `linear-gradient(90deg, ${theme.color}, #9B7BB0)`
                              : i === 1
                              ? "#E8A87C"
                              : "#6BA5C9",
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <div
                    className="flex-1 h-8 rounded-xl flex items-center justify-center"
                    style={{
                      background: theme.color,
                    }}
                  >
                    <div
                      className="w-10 h-1.5 rounded"
                      style={{
                        background: "rgba(255,255,255,0.5)",
                      }}
                    />
                  </div>

                  <div
                    className="flex-1 h-8 rounded-xl flex items-center justify-center border"
                    style={{
                      borderColor: "#E8DDD4",
                    }}
                  >
                    <div
                      className="w-10 h-1.5 rounded"
                      style={{
                        background: "#E0D5CA",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              className="absolute -top-5 -right-8 px-4 py-2.5 rounded-2xl shadow-lg border bg-white"
              style={{
                borderColor: "#E8DDD4",
              }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className="text-xs font-semibold text-[#1A1614]"
                style={mono}
              >
                Figma
              </div>

              <div className="text-[10px] text-[#8B7B72]">
                {t.hero.primaryTool}
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-3 -left-8 px-4 py-2.5 rounded-2xl shadow-lg border bg-white"
              style={{
                borderColor: "#E8DDD4",
              }}
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
            >
              <div
                className="text-xs font-semibold"
                style={{
                  ...mono,
                  color: theme.color,
                }}
              >
                UX/UI
              </div>

              <div className="text-[10px] text-[#8B7B72]">
                {t.hero.designer}
              </div>
            </motion.div>

            <motion.div
              className="absolute top-1/2 -left-12 -translate-y-1/2 p-3 rounded-2xl shadow-lg border bg-white"
              style={{
                borderColor: "#E8DDD4",
              }}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.4,
              }}
            >
              <div className="flex gap-1.5 mb-1.5">
                {[
                  theme.color,
                  "#9B7BB0",
                  "#E8A87C",
                  "#6BA5C9",
                ].map((c) => (
                  <div
                    key={c}
                    className="w-3.5 h-3.5 rounded-full"
                    style={{
                      background: c,
                    }}
                  />
                ))}
              </div>

              <div
                className="text-[10px] text-[#8B7B72]"
                style={mono}
              >
                {t.hero.colorPalette}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          className="text-[10px] tracking-[0.2em] uppercase font-semibold"
          style={{
            ...mono,
            color: theme.color + "80",
          }}
        >
          {t.hero.scroll}
        </span>

        <motion.div
          animate={{
            y: [0, 8, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
          }}
          className="w-px h-10 rounded-full"
          style={{
            background: `linear-gradient(to bottom, ${theme.color}80, transparent)`,
          }}
        />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// About
// ─────────────────────────────────────────────────────────────

function About({
  theme,
  language,
}: {
  theme: (typeof THEMES)[number];
  language: Language;
}) {
  const t = TRANSLATIONS[language];

  const info = [
    {
      icon: Calendar,
      label: t.about.dateOfBirth,
      value: "2 July 2004 (22 years old)",
    },
    {
      icon: Globe,
      label: t.about.nationality,
      value: "Thai",
    },
    {
      icon: MapPin,
      label: t.about.location,
      value: "Nakhon Ratchasima, Thailand",
    },
    {
      icon: Mail,
      label: t.about.email,
      value: "manthangamsanthia2547@gmail.com",
    },
    {
      icon: Phone,
      label: t.about.phone,
      value: "094-363-6445",
    },
  ];

  return (
    <section
      id="about"
      className="py-28 border-t"
      style={{
        borderColor: "#E8DDD4",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_360px] gap-14 lg:gap-20 items-start">
          <motion.div
            initial={{
              opacity: 0,
              x: -32,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <SectionTag theme={theme}>
              {t.about.careerObjective}
            </SectionTag>

            <h2
              className="text-4xl lg:text-5xl font-light leading-tight tracking-tight text-[#1A1614] mb-6"
              style={serif}
            >
              {t.about.title1}
              <br />

              <span
                className="italic font-semibold"
                style={{
                  color: theme.color,
                }}
              >
                {t.about.title2}
              </span>
            </h2>

            <p className="text-[#5A4D45] leading-relaxed text-base lg:text-lg mb-4">
              {t.about.paragraph1}
            </p>

            <p className="text-[#8B7B72] leading-relaxed mb-10">
              {t.about.paragraph2}
            </p>

            <h3
              className="font-semibold text-[#1A1614] mb-5 text-sm"
              style={mono}
            >
              {t.about.summary}
            </h3>

            <ul className="space-y-3">
              {HIGHLIGHTS[language].map((h, i) => (
                <motion.li
                  key={i}
                  initial={{
                    opacity: 0,
                    x: -16,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.07,
                  }}
                  className="flex items-start gap-3 text-sm text-[#5A4D45] leading-relaxed"
                >
                  <ChevronRight
                    size={14}
                    className="flex-shrink-0 mt-0.5"
                    style={{
                      color: theme.color,
                    }}
                  />

                  <span>{h}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 32,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="space-y-3"
          >
            {info.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-4 rounded-2xl border bg-white hover:shadow-sm transition-all duration-200"
                style={{
                  borderColor: "#E8DDD4",
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: theme.light,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <Icon
                    size={14}
                    style={{
                      color: theme.color,
                    }}
                  />
                </div>

                <div>
                  <div
                    className="text-[10px] text-[#8B7B72] mb-0.5"
                    style={mono}
                  >
                    {label}
                  </div>

                  <div className="text-sm font-medium text-[#1A1614] break-all">
                    {value}
                  </div>
                </div>
              </div>
            ))}

            <div
              className="p-4 rounded-2xl border bg-white"
              style={{
                borderColor: "#E8DDD4",
              }}
            >
              <div
                className="text-[10px] text-[#8B7B72] mb-3"
                style={mono}
              >
                {t.about.languages}
              </div>

              <div className="flex gap-3">
                <div
                  className="flex-1 p-3 rounded-xl text-center"
                  style={{
                    background: "#FAF7F2",
                  }}
                >
                  <div className="text-sm font-semibold text-[#1A1614]">
                    {t.about.thai}
                  </div>

                  <div className="text-[10px] text-[#8B7B72] mt-0.5">
                    {t.about.native}
                  </div>
                </div>

                <div
                  className="flex-1 p-3 rounded-xl text-center"
                  style={{
                    background: "#FAF7F2",
                  }}
                >
                  <div className="text-sm font-semibold text-[#1A1614]">
                    {t.about.english}
                  </div>

                  <div className="text-[10px] text-[#8B7B72] mt-0.5">
                    {t.about.basic}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Skills
// ─────────────────────────────────────────────────────────────

function Skills({
  theme,
  language,
}: {
  theme: (typeof THEMES)[number];
  language: Language;
}) {
  const t = TRANSLATIONS[language];

  const categories = [
    {
      title: t.skills.uxui,
      icon: Layers,
      description: t.skills.uxuiDescription,
      skills: DESIGN_SKILLS,
      color: "rose" as ChipColor,
    },
    {
      title: t.skills.designTools,
      icon: Layers,
      description: t.skills.designToolsDescription,
      skills: DESIGN_TOOLS,
      color: "stone" as ChipColor,
    },
    {
      title: t.skills.research,
      icon: BookOpen,
      description: t.skills.researchDescription,
      skills: UX_RESEARCH,
      color: "purple" as ChipColor,
    },
    {
      title: t.skills.softSkills,
      icon: Users2,
      description: t.skills.softSkillsDescription,
      skills: SOFT_SKILLS,
      color: "rose" as ChipColor,
    },
  ];

  return (
    <section
      id="skills"
      className="py-28 border-t relative"
      style={{
        borderColor: "#E8DDD4",
      }}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[700px] h-40 pointer-events-none opacity-[0.07]"
        style={{
          background: `linear-gradient(90deg, ${theme.color}, #9B7BB0)`,
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <SectionTag center theme={theme}>
            {t.skills.heading}
          </SectionTag>

          <h2
            className="text-4xl lg:text-5xl font-light tracking-tight text-[#1A1614]"
            style={serif}
          >
            {t.skills.title1}{" "}
            <span
              className="italic font-semibold"
              style={{
                color: theme.color,
              }}
            >
              {t.skills.title2}
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(
            (
              { title, icon: Icon, description, skills, color },
              i
            ) => (
              <motion.div
                key={title}
                initial={{
                  opacity: 0,
                  y: 28,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.1,
                }}
                className="p-7 rounded-3xl border bg-white hover:shadow-lg transition-all duration-300 group"
                style={{
                  borderColor: "#E8DDD4",
                }}
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300"
                  style={{
                    background: theme.light,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <Icon
                    size={20}
                    style={{
                      color: theme.color,
                    }}
                  />
                </div>

                <h3 className="text-base font-semibold text-[#1A1614] mb-2">
                  {title}
                </h3>

                <p className="text-xs text-[#8B7B72] leading-relaxed mb-5">
                  {description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <Chip
                      key={s}
                      label={s}
                      color={color}
                    />
                  ))}
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Projects
// ─────────────────────────────────────────────────────────────

function Projects({
  theme,
  language,
}: {
  theme: (typeof THEMES)[number];
  language: Language;
}) {
  const t = TRANSLATIONS[language];

  const projects = [
    // ─────────────────────────────────────────────────────────
    // PROJECT 01
    // ─────────────────────────────────────────────────────────

    {
      number: "01",
      type: t.projects.seniorProject,
      status: "In Progress",
      title:
        "Information System for Common Area Fee Management & Debt Tracking",
      role: "UX/UI Designer & UX Researcher",
      description:
        language === "EN"
          ? "Designed user-friendly interfaces and user flows for a common area fee management system, focusing on clear information, easy navigation, and a better experience for residents and administrators."
          : "ออกแบบอินเทอร์เฟซและ User Flow สำหรับระบบบริหารจัดการค่าส่วนกลางและติดตามหนี้ค้างชำระ โดยเน้นข้อมูลที่ชัดเจน การใช้งานที่ง่าย และประสบการณ์ที่ดีสำหรับผู้อยู่อาศัยและผู้ดูแลระบบ",
      image: "/project1.png",
      imageAlt:
        "Common Area Fee Management System UI Design",
      background: "#F5EEE8",
      tags: [
        "Figma",
        "UX/UI Design",
        "User Flow",
        "Wireframing",
        "Prototyping",
        "Usability Testing",
      ],
      contributions:
        language === "EN"
          ? [
              "Analyzed user needs and system requirements.",
              "Created user flows and wireframes.",
              "Designed high-fidelity UI screens in Figma.",
              "Created interactive prototypes.",
              "Prepared usability testing and test cases.",
            ]
          : [
              "วิเคราะห์ความต้องการของผู้ใช้และความต้องการของระบบ",
              "ออกแบบ User Flow และ Wireframe",
              "ออกแบบ High-Fidelity UI ด้วย Figma",
              "สร้าง Interactive Prototype",
              "จัดเตรียมการทดสอบ Usability และ Test Case",
            ],
    },

    // ─────────────────────────────────────────────────────────
    // PROJECT 02
    // ─────────────────────────────────────────────────────────

    {
      number: "02",
      type: t.projects.academicProject,
      status: "Completed",
      title:
        "ระบบสั่งอาหารออนไลน์ สำหรับร้านข้าวแกงครัวไทย",
      subtitle:
        "Online Food Ordering System for Thai Food Restaurant",
      role: "UI/UX Designer · Figma",
      description:
        language === "EN"
          ? "Designed a mobile food ordering interface for a Thai food restaurant, focusing on simple navigation, clear food information, and an easy-to-use ordering experience."
          : "ออกแบบอินเทอร์เฟซระบบสั่งอาหารบนมือถือสำหรับร้านอาหารไทย โดยเน้นการนำทางที่เข้าใจง่าย ข้อมูลอาหารที่ชัดเจน และประสบการณ์การสั่งอาหารที่สะดวก",
      image: "/project2.png",
      imageAlt:
        "Online Food Ordering System UI Design",
      background: "#F5EEE8",
      tags: [
        "Figma",
        "UI Design",
        "Mobile App",
        "Wireframing",
        "Prototyping",
      ],
      contributions:
        language === "EN"
          ? [
              "Designed mobile interfaces for food browsing and ordering.",
              "Designed login and food detail screens.",
              "Focused on clear food information and pricing.",
              "Created the visual design using Figma.",
              "Designed an easy-to-understand mobile experience.",
            ]
          : [
              "ออกแบบหน้าจอมือถือสำหรับการเลือกดูอาหารและสั่งอาหาร",
              "ออกแบบหน้าล็อกอินและรายละเอียดอาหาร",
              "เน้นข้อมูลอาหารและราคาที่ชัดเจน",
              "ออกแบบ Visual Design ด้วย Figma",
              "ออกแบบประสบการณ์การใช้งานบนมือถือให้เข้าใจง่าย",
            ],
    },

    // ─────────────────────────────────────────────────────────
    // PROJECT 03 — SWEETTIME
    // ─────────────────────────────────────────────────────────

    {
      number: "03",
      type: t.projects.academicProject,
      status: "Completed",
      title: "SweetTime — Dessert Ordering Website",
      subtitle:
        "เว็บไซต์สั่งขนมหวานสำหรับโปรเจกต์ในรายวิชา",
      role: "Web Designer & Frontend Developer",
      description:
        language === "EN"
          ? "Designed and developed a simple dessert ordering website as part of a university course. The website presents dessert products with clear images, descriptions, prices, and easy-to-use ordering buttons."
          : "ออกแบบและพัฒนาเว็บไซต์สั่งขนมหวานเป็นส่วนหนึ่งของงานในรายวิชา โดยเน้นการนำเสนอสินค้าให้ดูน่าสนใจ มีข้อมูล ราคา และปุ่มสั่งซื้อที่เข้าใจง่าย",
      image: "/project3.png",
      imageAlt: "SweetTime Dessert Ordering Website",
      background: "#FFF1F3",
      tags: [
        "Web Design",
        "Frontend Development",
        "HTML",
        "CSS",
        "JavaScript",
        "Responsive Design",
      ],
      contributions:
        language === "EN"
          ? [
              "Designed the overall webpage layout and visual style.",
              "Created dessert product cards with images, descriptions, and prices.",
              "Designed clear and easy-to-use ordering buttons.",
              "Created the contact and social media section.",
              "Developed the webpage based on the designed interface.",
            ]
          : [
              "ออกแบบโครงสร้างหน้าเว็บและรูปแบบ Visual Design โดยรวม",
              "ออกแบบ Product Card สำหรับแสดงรูปภาพ รายละเอียด และราคาขนม",
              "ออกแบบปุ่มสั่งซื้อให้มองเห็นและใช้งานได้ง่าย",
              "ออกแบบส่วนติดต่อและช่องทาง Social Media",
              "พัฒนาเว็บไซต์ตามรูปแบบที่ออกแบบไว้",
            ],
    },
  ];

  return (
    <section
      id="projects"
      className="py-24 border-t"
      style={{
        borderColor: "#E8DDD4",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionTag center theme={theme}>
            {t.projects.heading}
          </SectionTag>

          <h2
            className="text-4xl lg:text-5xl font-light tracking-tight text-[#1A1614]"
            style={serif}
          >
            {t.projects.title1}{" "}
            <span
              className="italic font-semibold"
              style={{
                color: theme.color,
              }}
            >
              {t.projects.title2}
            </span>
          </h2>

          <p className="mt-4 text-sm text-[#8B7B72] max-w-2xl mx-auto leading-relaxed">
            {t.projects.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.number}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.55,
              }}
              className="rounded-3xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition-all duration-300"
              style={{
                borderColor: "#E8DDD4",
              }}
            >
              <div
                className="w-full h-[300px] lg:h-[340px] flex items-center justify-center p-5"
                style={{
                  background: project.background,
                }}
              >
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="w-full h-full object-contain rounded-xl"
                  loading="lazy"
                />
              </div>

              <div className="p-6 lg:p-7">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-medium border"
                    style={{
                      background: "#FFF7ED",
                      borderColor: "#FED7AA",
                      color: "#D97706",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "#F59E0B",
                      }}
                    />

                    {project.type}
                  </div>

                  <span
                    className="text-[10px] font-semibold"
                    style={{
                      ...mono,
                      color: theme.color,
                    }}
                  >
                    PROJECT {project.number}
                  </span>
                </div>

                {project.status === "In Progress" && (
                  <div className="mb-3">
                    <span
                      className="inline-flex items-center gap-1.5 text-[10px] font-medium"
                      style={{
                        ...mono,
                        color: "#D97706",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{
                          background: "#F59E0B",
                        }}
                      />

                      {t.projects.inProgress}
                    </span>
                  </div>
                )}

                <h3 className="text-xl lg:text-2xl font-semibold text-[#1A1614] leading-tight mb-2">
                  {project.title}
                </h3>

                {"subtitle" in project &&
                  project.subtitle && (
                    <p className="text-sm text-[#5A4D45] mb-2">
                      {project.subtitle}
                    </p>
                  )}

                <p
                  className="text-xs font-semibold mb-4"
                  style={{
                    color: theme.color,
                  }}
                >
                  {project.role}
                </p>

                <p className="text-sm text-[#5A4D45] leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="mb-5">
                  <h4
                    className="text-xs font-semibold text-[#1A1614] mb-2"
                    style={mono}
                  >
                    {t.projects.contribution}
                  </h4>

                  <ul className="space-y-1.5">
                    {project.contributions.map(
                      (item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-xs text-[#5A4D45]"
                        >
                          <ChevronRight
                            size={12}
                            className="flex-shrink-0 mt-0.5"
                            style={{
                              color: theme.color,
                            }}
                          />

                          <span>{item}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      color="rose"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Education
// ─────────────────────────────────────────────────────────────

function Education({
  theme,
  language,
}: {
  theme: (typeof THEMES)[number];
  language: Language;
}) {
  const t = TRANSLATIONS[language];

  const schools = [
    {
      school: "Nakhon Ratchasima Rajabhat University",
      degree: t.education.universityDegree,
      duration: t.education.universityDuration,
      gpa: "3.29",
      location: "Nakhon Ratchasima, Thailand",
      accent: theme.color,
    },

    {
      school: "Thachangratbamroong School",
      degree: t.education.highSchoolDegree,
      duration: t.education.highSchoolDuration,
      gpa: "3.41",
      location: "Nakhon Ratchasima, Thailand",
      accent: "#9B7BB0",
    },
  ];

  return (
    <section
      id="education"
      className="py-28 border-t"
      style={{
        borderColor: "#E8DDD4",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">
          <div>
            <SectionTag theme={theme}>
              {t.education.heading}
            </SectionTag>

            <h2
              className="text-4xl lg:text-5xl font-light tracking-tight text-[#1A1614]"
              style={serif}
            >
              {t.education.title1}
              <br />

              <span
                className="italic font-semibold"
                style={{
                  color: theme.color,
                }}
              >
                {t.education.title2}
              </span>
            </h2>
          </div>

          <div className="space-y-5">
            {schools.map((s, i) => (
              <motion.div
                key={s.school}
                initial={{
                  opacity: 0,
                  x: 28,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.12,
                }}
                className="p-7 rounded-3xl border bg-white hover:shadow-md transition-shadow duration-300"
                style={{
                  borderColor: "#E8DDD4",
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h3 className="font-semibold text-lg text-[#1A1614] mb-1.5 leading-snug">
                      {s.school}
                    </h3>

                    <p className="text-[#5A4D45] text-sm leading-relaxed">
                      {s.degree}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div
                      className="text-2xl font-bold leading-none"
                      style={{
                        ...serif,
                        fontStyle: "italic",
                        color: s.accent,
                      }}
                    >
                      {s.gpa}
                    </div>

                    <div
                      className="text-[10px] text-[#8B7B72] mt-1"
                      style={mono}
                    >
                      {t.education.gpa}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div
                    className="flex items-center gap-1.5 text-xs text-[#8B7B72]"
                    style={mono}
                  >
                    <Calendar
                      size={11}
                      style={{
                        color: s.accent,
                      }}
                    />

                    {s.duration}
                  </div>

                  <div
                    className="flex items-center gap-1.5 text-xs text-[#8B7B72]"
                    style={mono}
                  >
                    <MapPin
                      size={11}
                      style={{
                        color: s.accent,
                      }}
                    />

                    {s.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Training
// ─────────────────────────────────────────────────────────────

function Training({
  theme,
  language,
}: {
  theme: (typeof THEMES)[number];
  language: Language;
}) {
  const t = TRANSLATIONS[language];

  return (
    <section
      id="training"
      className="py-28 border-t"
      style={{
        borderColor: "#E8DDD4",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">
          <div>
            <SectionTag theme={theme}>
              {t.training.heading}
            </SectionTag>

            <h2
              className="text-4xl lg:text-5xl font-light tracking-tight text-[#1A1614]"
              style={serif}
            >
              {t.training.title1}
              <br />

              <span
                className="italic font-semibold"
                style={{
                  color: theme.color,
                }}
              >
                {t.training.title2}
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {TRAINING.map((training, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: 28,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
                className="flex items-start gap-4 p-6 rounded-2xl border bg-white transition-colors duration-200"
                style={{
                  borderColor: "#E8DDD4",
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: theme.light,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <BookOpen
                    size={14}
                    style={{
                      color: theme.color,
                    }}
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-[#1A1614] mb-1.5 text-sm leading-relaxed">
                    {training.title}
                  </h4>

                  <p className="text-xs text-[#8B7B72] leading-relaxed mb-2.5">
                    {training.org}
                  </p>

                  <span
                    className="text-xs font-medium"
                    style={{
                      ...mono,
                      color: theme.color,
                    }}
                  >
                    {training.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Contact
// ─────────────────────────────────────────────────────────────

function Contact({
  theme,
  language,
}: {
  theme: (typeof THEMES)[number];
  language: Language;
}) {
  const t = TRANSLATIONS[language];

  const [copied, setCopied] = useState("");

  const copyToClipboard = async (
    text: string,
    type: string
  ) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(type);

      setTimeout(() => {
        setCopied("");
      }, 1500);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t.about.email,
      value: "manthangamsanthia2547@gmail.com",
      type: "email",
    },

    {
      icon: Phone,
      label: t.about.phone,
      value: "094-363-6445",
      type: "phone",
    },

    {
      icon: MapPin,
      label: t.about.location,
      value: "Nakhon Ratchasima 30230, Thailand",
      type: "address",
    },
  ];

  return (
    <section
      id="contact"
      className="py-28 border-t"
      style={{
        borderColor: "#E8DDD4",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionTag center theme={theme}>
            {t.contact.heading}
          </SectionTag>

          <h2
            className="text-4xl lg:text-5xl font-light tracking-tight text-[#1A1614]"
            style={serif}
          >
            {t.contact.title1}{" "}
            <span
              className="italic font-semibold"
              style={{
                color: theme.color,
              }}
            >
              {t.contact.title2}
            </span>
          </h2>

          <p className="mt-4 text-[#8B7B72] max-w-md mx-auto leading-relaxed">
            {t.contact.description}
          </p>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {contactInfo.map(
            ({
              icon: Icon,
              label,
              value,
              type,
            }) => (
              <div
                key={label}
                className="flex items-center gap-5 p-6 rounded-2xl border bg-white"
                style={{
                  borderColor: "#E8DDD4",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: theme.light,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <Icon
                    size={18}
                    style={{
                      color: theme.color,
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className="text-xs text-[#8B7B72] mb-1"
                    style={mono}
                  >
                    {label}
                  </div>

                  <div className="text-base font-medium text-[#1A1614] break-all">
                    {value}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(value, type)
                  }
                  className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    background:
                      copied === type
                        ? "#DCFCE7"
                        : theme.light,

                    color:
                      copied === type
                        ? "#16A34A"
                        : theme.color,

                    border: `1px solid ${
                      copied === type
                        ? "#BBF7D0"
                        : theme.border
                    }`,
                  }}
                >
                  {copied === type ? (
                    <>
                      <Check size={14} />

                      {language === "TH"
                        ? "คัดลอกแล้ว"
                        : "Copied"}
                    </>
                  ) : (
                    <>
                      <Copy size={14} />

                      {language === "TH"
                        ? "คัดลอก"
                        : "Copy"}
                    </>
                  )}
                </button>
              </div>
            )
          )}

          {/* GitHub */}

          <a
            href="https://github.com/manthangamsanthia2547-a11y/ux-ui-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-5 p-6 rounded-2xl border bg-white hover:shadow-md transition-all duration-200"
            style={{
              borderColor: "#E8DDD4",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: theme.light,
                border: `1px solid ${theme.border}`,
              }}
            >
              <Github
                size={18}
                style={{
                  color: theme.color,
                }}
              />
            </div>

            <div>
              <div
                className="text-xs text-[#8B7B72] mb-1"
                style={mono}
              >
                GitHub
              </div>

              <div className="text-base font-medium text-[#1A1614] break-all">
                github.com/manthangamsanthia2547-a11y/ux-ui-portfolio
              </div>
            </div>
          </a>

          {/* Open to Opportunities */}

          <div
            className="p-6 rounded-2xl border bg-white mt-6"
            style={{
              borderColor: "#E8DDD4",
            }}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  background: "#34D399",
                  boxShadow: "0 0 6px #34D39980",
                }}
              />

              <span className="text-sm font-semibold text-[#1A1614]">
                {t.contact.opportunities}
              </span>
            </div>

            <p className="text-sm text-[#8B7B72] leading-relaxed">
              {t.contact.opportunitiesDescription}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────

function Footer({
  theme,
  language,
}: {
  theme: (typeof THEMES)[number];
  language: Language;
}) {
  const t = TRANSLATIONS[language];

  const translatedNav = [
    { href: "#about", label: t.nav.about },
    { href: "#skills", label: t.nav.skills },
    { href: "#projects", label: t.nav.projects },
    { href: "#education", label: t.nav.education },
    { href: "#training", label: t.nav.training },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer
      className="py-12 border-t"
      style={{
        borderColor: "#E8DDD4",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div
            className="text-lg font-semibold tracking-tight text-[#1A1614] mb-0.5"
            style={{
              ...serif,
              fontStyle: "italic",
            }}
          >
            Manthana Ngamsanthia
          </div>

          <div
            className="text-xs text-[#8B7B72]"
            style={mono}
          >
            {t.footer.role}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {translatedNav.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-[#8B7B72] transition-colors"
              onMouseEnter={(e) => {
                e.currentTarget.style.color =
                  theme.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  "#8B7B72";
              }}
            >
              {label}
            </a>
          ))}
        </div>

        <div
          className="text-xs text-[#C5B8B0]"
          style={mono}
        >
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState("hero");

  const [language, setLanguage] =
    useState<Language>(() => {
      if (typeof window === "undefined") {
        return "EN";
      }

      const savedLanguage =
        localStorage.getItem(
          "portfolio-language"
        );

      return savedLanguage === "TH"
        ? "TH"
        : "EN";
    });

  const [themeIndex, setThemeIndex] =
    useState(() => {
      if (typeof window === "undefined") {
        return 0;
      }

      const savedTheme =
        localStorage.getItem(
          "portfolio-theme"
        );

      if (savedTheme !== null) {
        const parsedTheme = Number(savedTheme);

        if (
          Number.isInteger(parsedTheme) &&
          parsedTheme >= 0 &&
          parsedTheme < THEMES.length
        ) {
          return parsedTheme;
        }
      }

      return 0;
    });

  const theme = THEMES[themeIndex];

  useEffect(() => {
    localStorage.setItem(
      "portfolio-language",
      language
    );
  }, [language]);

  useEffect(() => {
    localStorage.setItem(
      "portfolio-theme",
      String(themeIndex)
    );
  }, [themeIndex]);

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        (entries) => {
          const visibleEntry =
            entries.find(
              (entry) => entry.isIntersecting
            );

          if (visibleEntry) {
            setActive(
              visibleEntry.target.id
            );
          }
        },
        {
          threshold: 0.3,
        }
      );

    document
      .querySelectorAll("section[id]")
      .forEach((section) =>
        observer.observe(section)
      );

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="min-h-screen antialiased"
      style={{
        background: "#FAF7F2",
        color: "#1A1614",
        fontFamily:
          "'Bricolage Grotesque', system-ui, sans-serif",
      }}
    >
      <Nav
        active={active}
        theme={theme}
        setThemeIndex={setThemeIndex}
        language={language}
        setLanguage={setLanguage}
      />

      <Hero
        theme={theme}
        language={language}
      />

      <About
        theme={theme}
        language={language}
      />

      <Skills
        theme={theme}
        language={language}
      />

      <Projects
        theme={theme}
        language={language}
      />

      <Education
        theme={theme}
        language={language}
      />

      <Training
        theme={theme}
        language={language}
      />

      <Contact
        theme={theme}
        language={language}
      />

      <Footer
        theme={theme}
        language={language}
      />
    </div>
  );
}