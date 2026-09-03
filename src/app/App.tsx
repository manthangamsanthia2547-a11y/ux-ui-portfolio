import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { motion } from "motion/react";
import {
  Menu,
  X,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Globe,
  Palette,
  Layers,
  BookOpen,
  Check,
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
      projects: "Projects",
      activities: "Activities",
      skills: "Skills",
      workSkills: "Work Skills",
    },

    hero: {
      available: "Available for Internship",
      description:
        "UX/UI Designer and Computer Science student interested in creating simple, clear, and user-friendly digital experiences.",
      viewWork: "View My Projects",
      viewSkills: "View Skills",
      scroll: "Scroll",
      primaryTool: "Primary Tool",
      designer: "Designer",
      colorPalette: "Color Palette",
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
      viewProject: "View Project",
    },

    activities: {
      heading: "Activities",
      title1: "Learning &",
      title2: "Activities",
    },

    skills: {
      heading: "Skills",
      title1: "Design",
      title2: "Skills",
      uxui: "UX/UI Design",
      uxuiDescription:
        "Designing clear and user-friendly experiences from user flows to high-fidelity interfaces.",
      designTools: "Design Tools",
      designToolsDescription:
        "Tools used to create visual designs, wireframes, prototypes, and supporting graphics.",
      research: "UX Research & Testing",
      researchDescription:
        "Understanding user needs, validating designs, and preparing structured testing activities.",
    },

    workSkills: {
      heading: "Work Skills",
      title1: "How I",
      title2: "Work",
    },

    footer: {
      role: "UX/UI Designer · Nakhon Ratchasima, Thailand",
      copyright: "© 2026 All rights reserved.",
    },

    detail: {
      back: "Back to Projects",
      overview: "Project Overview",
      problem: "Problem",
      goal: "Goal",
      solution: "Solution",
      role: "My Role",
      whatIWorkedOn: "What I Worked On",
      process: "Design Process",
      visualDesign: "Visual Design",
      tools: "Tools & Skills",
      thanks: "Thanks for viewing",
      more: "More projects coming soon.",
    },
  },

  TH: {
    nav: {
      projects: "ผลงาน",
      activities: "กิจกรรม",
      skills: "สกิล",
      workSkills: "ทักษะการทำงาน",
    },

    hero: {
      available: "กำลังมองหาโอกาสฝึกงาน",
      description:
        "นักออกแบบ UX/UI และนักศึกษาวิทยาการคอมพิวเตอร์ที่สนใจการออกแบบประสบการณ์ดิจิทัลที่เรียบง่าย ใช้งานง่าย และตอบโจทย์ผู้ใช้",
      viewWork: "ดูผลงาน",
      viewSkills: "ดูทักษะ",
      scroll: "เลื่อนลง",
      primaryTool: "เครื่องมือหลัก",
      designer: "นักออกแบบ",
      colorPalette: "ชุดสี",
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
      viewProject: "ดูรายละเอียดโปรเจกต์",
    },

    activities: {
      heading: "กิจกรรม",
      title1: "การเรียนรู้และ",
      title2: "กิจกรรม",
    },

    skills: {
      heading: "ทักษะ",
      title1: "ทักษะด้าน",
      title2: "การออกแบบ",
      uxui: "การออกแบบ UX/UI",
      uxuiDescription:
        "ออกแบบประสบการณ์ที่ชัดเจนและใช้งานง่าย ตั้งแต่ User Flow ไปจนถึง High-Fidelity Interface",
      designTools: "เครื่องมือการออกแบบ",
      designToolsDescription:
        "เครื่องมือสำหรับสร้างงานออกแบบ Wireframe Prototype และงานกราฟิกประกอบ",
      research: "การวิจัยและทดสอบ UX",
      researchDescription:
        "ทำความเข้าใจความต้องการของผู้ใช้ ตรวจสอบการออกแบบ และเตรียมการทดสอบอย่างเป็นระบบ",
    },

    workSkills: {
      heading: "ทักษะการทำงาน",
      title1: "ทักษะในการ",
      title2: "ทำงาน",
    },

    footer: {
      role: "UX/UI Designer · นครราชสีมา ประเทศไทย",
      copyright: "© 2026 สงวนลิขสิทธิ์",
    },

    detail: {
      back: "กลับไปหน้าผลงาน",
      overview: "รายละเอียดโครงงาน",
      problem: "ปัญหา",
      goal: "เป้าหมาย",
      solution: "แนวทางการแก้ปัญหา",
      role: "บทบาทของฉัน",
      whatIWorkedOn: "สิ่งที่ฉันทำในโปรเจกต์นี้",
      process: "กระบวนการออกแบบ",
      visualDesign: "ผลงานการออกแบบ",
      tools: "เครื่องมือและทักษะ",
      thanks: "ขอบคุณที่รับชมผลงาน",
      more: "กำลังพัฒนาผลงานเพิ่มเติม",
    },
  },
};

// ─────────────────────────────────────────────────────────────
// Skills Data
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
// Activities
// ─────────────────────────────────────────────────────────────

const ACTIVITIES = [
  {
    title: 'Information Literacy Training: "Innovation Review and AI"',
    organization:
      "Office of Academic Resources and Information Technology, Nakhon Ratchasima Rajabhat University",
    dateEN: "December 17, 2025",
    dateTH: "17 ธันวาคม 2568",
  },
  {
    title: "Workshop on Document Formatting and Academic Citation",
    organization:
      "Office of Academic Resources and Information Technology, Nakhon Ratchasima Rajabhat University",
    dateEN: "January 7, 2026",
    dateTH: "7 มกราคม 2569",
  },
];

// ─────────────────────────────────────────────────────────────
// Chip
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

// ─────────────────────────────────────────────────────────────
// Section Tag
// ─────────────────────────────────────────────────────────────

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
    {
      href: "#projects",
      label: t.nav.projects,
    },
    {
      href: "#activities",
      label: t.nav.activities,
    },
    {
      href: "#skills",
      label: t.nav.skills,
    },
    {
      href: "#work-skills",
      label: t.nav.workSkills,
    },
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
          href="#hero"
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
                      <Check
                        size={14}
                        className="text-white"
                      />
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
                      <Check
                        size={14}
                        className="text-white"
                      />
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
              href="#skills"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-[#5A4D45] border hover:bg-[#F5EEE8] transition-colors"
              style={{
                borderColor: "#E0D5CA",
              }}
            >
              {t.hero.viewSkills}
              <ArrowRight size={14} />
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
// Project Type
// ─────────────────────────────────────────────────────────────

type ProjectData = {
  number: string;
  type: string;
  status: string;
  title: string;
  subtitle?: string;
  role: string;
  description: string;
  image: string;
  imageAlt: string;
  background: string;
  tags: string[];
  contributions: string[];
};

// ─────────────────────────────────────────────────────────────
// Project Detail
// ─────────────────────────────────────────────────────────────

function ProjectDetail({
  project,
  theme,
  language,
  onBack,
}: {
  project: ProjectData;
  theme: (typeof THEMES)[number];
  language: Language;
  onBack: () => void;
}) {
  const t = TRANSLATIONS[language];
  const isEnglish = language === "EN";

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 30,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -30,
      }}
      transition={{
        duration: 0.45,
      }}
      className="fixed inset-0 z-[100] overflow-y-auto"
      style={{
        background: "#FAF7F2",
      }}
    >
      {/* Detail Navigation */}
      <div
        className="sticky top-0 z-30 border-b"
        style={{
          background: "rgba(250,247,242,0.95)",
          backdropFilter: "blur(14px)",
          borderColor: "#E8DDD4",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#5A4D45] hover:text-[#1A1614] transition-colors"
          >
            <ArrowLeft size={17} />
            {t.detail.back}
          </button>

          <span
            className="text-xs font-semibold tracking-[0.18em]"
            style={{
              ...mono,
              color: theme.color,
            }}
          >
            PROJECT {project.number}
          </span>
        </div>
      </div>

      {/* Detail Hero */}
      <section className="pt-16 lg:pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <SectionTag theme={theme}>
                {project.type}
              </SectionTag>

              <div
                className="text-xs font-semibold mb-4"
                style={{
                  ...mono,
                  color: theme.color,
                }}
              >
                PROJECT {project.number}
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight text-[#1A1614] mb-5"
                style={serif}
              >
                {project.title}
              </h1>

              {project.subtitle && (
                <p className="text-base text-[#6B5E54] mb-4">
                  {project.subtitle}
                </p>
              )}

              <p
                className="text-sm font-semibold mb-6"
                style={{
                  color: theme.color,
                }}
              >
                {project.role}
              </p>

              <p className="text-base text-[#6B5E54] leading-relaxed max-w-xl mb-8">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    color="rose"
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
              className="rounded-[2rem] overflow-hidden border shadow-xl"
              style={{
                background: project.background,
                borderColor: "#E8DDD4",
              }}
            >
              <div className="p-5 lg:p-8">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section
        className="py-20 border-t"
        style={{
          borderColor: "#E8DDD4",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionTag theme={theme}>
            {t.detail.overview}
          </SectionTag>

          <div className="grid md:grid-cols-3 gap-5 mt-8">
            {/* Problem */}
            <div
              className="p-7 rounded-3xl border bg-white"
              style={{
                borderColor: "#E8DDD4",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: theme.light,
                }}
              >
                <span
                  className="text-sm font-semibold"
                  style={{
                    ...mono,
                    color: theme.color,
                  }}
                >
                  01
                </span>
              </div>

              <h3 className="font-semibold text-[#1A1614] mb-3">
                {t.detail.problem}
              </h3>

              <p className="text-sm text-[#6B5E54] leading-relaxed">
                {isEnglish
                  ? "Users need a clear and simple way to understand information, complete tasks, and manage their account without confusion."
                  : "ผู้ใช้ต้องการวิธีเข้าถึงข้อมูลและทำรายการต่าง ๆ ที่เข้าใจง่าย ลดความสับสน และสามารถจัดการข้อมูลได้อย่างสะดวก"}
              </p>
            </div>

            {/* Goal */}
            <div
              className="p-7 rounded-3xl border bg-white"
              style={{
                borderColor: "#E8DDD4",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: theme.light,
                }}
              >
                <span
                  className="text-sm font-semibold"
                  style={{
                    ...mono,
                    color: theme.color,
                  }}
                >
                  02
                </span>
              </div>

              <h3 className="font-semibold text-[#1A1614] mb-3">
                {t.detail.goal}
              </h3>

              <p className="text-sm text-[#6B5E54] leading-relaxed">
                {isEnglish
                  ? "Create a clear, consistent, and user-friendly interface that helps users complete their tasks easily."
                  : "ออกแบบอินเทอร์เฟซที่ชัดเจน มีความสอดคล้อง และช่วยให้ผู้ใช้สามารถทำงานต่าง ๆ ได้ง่ายขึ้น"}
              </p>
            </div>

            {/* Solution */}
            <div
              className="p-7 rounded-3xl border bg-white"
              style={{
                borderColor: "#E8DDD4",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: theme.light,
                }}
              >
                <span
                  className="text-sm font-semibold"
                  style={{
                    ...mono,
                    color: theme.color,
                  }}
                >
                  03
                </span>
              </div>

              <h3 className="font-semibold text-[#1A1614] mb-3">
                {t.detail.solution}
              </h3>

              <p className="text-sm text-[#6B5E54] leading-relaxed">
                {isEnglish
                  ? "Applied user-centered design principles, clear navigation, structured information, and consistent UI components."
                  : "นำแนวคิด User-Centered Design มาใช้ร่วมกับการจัดโครงสร้างข้อมูล การนำทางที่ชัดเจน และ UI Components ที่มีความสอดคล้องกัน"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* My Role */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-[0.7fr_1.3fr] gap-12">
            <div>
              <SectionTag theme={theme}>
                {t.detail.role}
              </SectionTag>

              <h2
                className="text-4xl font-light text-[#1A1614]"
                style={serif}
              >
                {t.detail.whatIWorkedOn}
              </h2>
            </div>

            <div>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.contributions.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-2xl border bg-white"
                      style={{
                        borderColor: "#E8DDD4",
                      }}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: theme.light,
                        }}
                      >
                        <Check
                          size={13}
                          style={{
                            color: theme.color,
                          }}
                        />
                      </div>

                      <span className="text-sm text-[#5A4D45] leading-relaxed">
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section
        className="py-20 border-t"
        style={{
          borderColor: "#E8DDD4",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionTag center theme={theme}>
              {t.detail.process}
            </SectionTag>

            <h2
              className="text-4xl lg:text-5xl font-light text-[#1A1614]"
              style={serif}
            >
              {isEnglish
                ? "From Idea to Interface"
                : "จากแนวคิดสู่หน้าจอ"}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              "Research",
              "Define",
              "Wireframe",
              "UI Design",
              "Prototype",
            ].map((step, index) => (
              <div
                key={step}
                className="relative p-5 rounded-2xl border bg-white text-center"
                style={{
                  borderColor: "#E8DDD4",
                }}
              >
                <div
                  className="text-xs mb-2"
                  style={{
                    ...mono,
                    color: theme.color,
                  }}
                >
                  0{index + 1}
                </div>

                <div className="text-sm font-semibold text-[#3E342F]">
                  {step}
                </div>

                {index < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                    <ChevronRight
                      size={15}
                      style={{
                        color: theme.color,
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Design */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionTag center theme={theme}>
              {t.detail.visualDesign}
            </SectionTag>

            <h2
              className="text-4xl lg:text-5xl font-light text-[#1A1614]"
              style={serif}
            >
              {isEnglish
                ? "Visual Design"
                : "ผลงานการออกแบบ"}
            </h2>

            <p className="text-sm text-[#8B7B72] mt-4 max-w-xl mx-auto">
              {isEnglish
                ? "A closer look at the interface and visual direction of the project."
                : "รายละเอียดของอินเทอร์เฟซและแนวทางการออกแบบของโปรเจกต์"}
            </p>
          </div>

          {/* Main Project Image */}
          <div
            className="rounded-3xl border overflow-hidden"
            style={{
              borderColor: "#E8DDD4",
              background: project.background,
            }}
          >
            <img
              src={project.image}
              alt={project.imageAlt}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Tools */}
      <section
        className="py-20 border-t"
        style={{
          borderColor: "#E8DDD4",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionTag theme={theme}>
            {t.detail.tools}
          </SectionTag>

          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                color="rose"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div
            className="rounded-3xl p-8 lg:p-12 text-center"
            style={{
              background: theme.light,
              border: `1px solid ${theme.border}`,
            }}
          >
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
              style={{
                ...mono,
                color: theme.color,
              }}
            >
              {t.detail.thanks}
            </p>

            <h2
              className="text-3xl lg:text-4xl font-light text-[#1A1614] mb-7"
              style={serif}
            >
              {t.detail.more}
            </h2>

            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-all"
              style={{
                background: theme.color,
              }}
            >
              <ArrowLeft size={15} />
              {t.detail.back}
            </button>
          </div>
        </div>
      </section>
    </motion.div>
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

  const [selectedProject, setSelectedProject] =
    useState<ProjectData | null>(null);

  const projects: ProjectData[] = [
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
              "Collaborated with a team on system analysis, UX/UI design, and development.",
            ]
          : [
              "วิเคราะห์ความต้องการของผู้ใช้และความต้องการของระบบ",
              "ออกแบบ User Flow และ Wireframe",
              "ออกแบบ High-Fidelity UI ด้วย Figma",
              "สร้าง Interactive Prototype",
              "จัดเตรียมการทดสอบ Usability และ Test Case",
              "ทำงานร่วมกับทีมในการวิเคราะห์ ออกแบบ UX/UI และพัฒนาระบบ",
            ],
    },

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

    {
      number: "03",
      type: t.projects.academicProject,
      status: "Completed",
      title:
        "SweetTime — Dessert Ordering Website",
      subtitle:
        "เว็บไซต์สั่งขนมหวานสำหรับโปรเจกต์ในรายวิชา",
      role: "Web Designer & Frontend Developer",
      description:
        language === "EN"
          ? "Designed and developed a simple dessert ordering website as part of a university course. The website presents dessert products with clear images, descriptions, prices, and easy-to-use ordering buttons."
          : "ออกแบบและพัฒนาเว็บไซต์สั่งขนมหวานเป็นส่วนหนึ่งของงานในรายวิชา โดยเน้นการนำเสนอสินค้าให้ดูน่าสนใจ มีข้อมูล ราคา และปุ่มสั่งซื้อที่เข้าใจง่าย",
      image: "/project3.png",
      imageAlt:
        "SweetTime Dessert Ordering Website",
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

    {
      number: "04",
      type: t.projects.academicProject,
      status: "Completed",
      title:
        "Mobile Profile & Account Management UI",
      role: "UI/UX Designer · Figma",
      description:
        language === "EN"
          ? "Designed a mobile account management interface as part of a classroom project, focusing on clear navigation, simple interactions, and consistent visual design across login, registration, profile, and settings screens."
          : "ออกแบบอินเทอร์เฟซสำหรับจัดการบัญชีผู้ใช้งานบนมือถือ ซึ่งเป็นส่วนหนึ่งของงานในชั้นเรียน โดยเน้นการนำทางที่ชัดเจน การใช้งานที่ง่าย และการออกแบบที่มีความสอดคล้องกันในหน้าล็อกอิน สมัครสมาชิก โปรไฟล์ และการตั้งค่าบัญชี",
      image: "/project4.png",
      imageAlt:
        "Mobile Profile and Account Management UI Design",
      background: "#F5EEE8",
      tags: [
        "Figma",
        "UI/UX Design",
        "Wireframing",
        "Prototyping",
      ],
      contributions:
        language === "EN"
          ? [
              "Designed Login and Registration screens.",
              "Designed Profile and Account Settings interfaces.",
              "Created UI components and screen layouts in Figma.",
              "Designed notification, language, privacy, and security settings.",
              "Focused on clear navigation and consistent UI design.",
            ]
          : [
              "ออกแบบหน้าล็อกอินและสมัครสมาชิก",
              "ออกแบบหน้าโปรไฟล์และการตั้งค่าบัญชี",
              "สร้าง UI Components และจัดวางหน้าจอด้วย Figma",
              "ออกแบบการตั้งค่าการแจ้งเตือน ภาษา ความเป็นส่วนตัว และความปลอดภัย",
              "เน้นการนำทางที่ชัดเจนและรูปแบบ UI ที่มีความสอดคล้องกัน",
            ],
    },
  ];

  if (selectedProject) {
    return (
      <ProjectDetail
        project={selectedProject}
        theme={theme}
        language={language}
        onBack={() => {
          setSelectedProject(null);

          setTimeout(() => {
            document
              .getElementById("projects")
              ?.scrollIntoView({
                behavior: "smooth",
              });
          }, 50);
        }}
      />
    );
  }

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

                {project.subtitle && (
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

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      color="rose"
                    />
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedProject(project);
                    window.scrollTo(0, 0);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-semibold text-white hover:opacity-90 hover:scale-[1.01] transition-all"
                  style={{
                    background: theme.color,
                  }}
                >
                  {t.projects.viewProject}
                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Activities
// ─────────────────────────────────────────────────────────────

function Activities({
  theme,
  language,
}: {
  theme: (typeof THEMES)[number];
  language: Language;
}) {
  const t = TRANSLATIONS[language];

  return (
    <section
      id="activities"
      className="py-28 border-t"
      style={{
        borderColor: "#E8DDD4",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionTag center theme={theme}>
            {t.activities.heading}
          </SectionTag>

          <h2
            className="text-4xl lg:text-5xl font-light tracking-tight text-[#1A1614]"
            style={serif}
          >
            {t.activities.title1}{" "}
            <span
              className="italic font-semibold"
              style={{
                color: theme.color,
              }}
            >
              {t.activities.title2}
            </span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {ACTIVITIES.map((activity, index) => (
            <motion.div
              key={index}
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
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="flex items-start gap-4 p-6 rounded-2xl border bg-white hover:shadow-md transition-all"
              style={{
                borderColor: "#E8DDD4",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: theme.light,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <BookOpen
                  size={16}
                  style={{
                    color: theme.color,
                  }}
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-[#1A1614] text-sm lg:text-base mb-1.5">
                  {activity.title}
                </h3>

                <p className="text-xs text-[#8B7B72] leading-relaxed mb-2">
                  {activity.organization}
                </p>

                <span
                  className="text-xs"
                  style={{
                    ...mono,
                    color: theme.color,
                  }}
                >
                  {language === "EN"
                    ? activity.dateEN
                    : activity.dateTH}
                </span>
              </div>
            </motion.div>
          ))}
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
      icon: Palette,
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

        <div className="grid md:grid-cols-3 gap-6">
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
                  {skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
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
// Work Skills
// ─────────────────────────────────────────────────────────────

function WorkSkills({
  theme,
  language,
}: {
  theme: (typeof THEMES)[number];
  language: Language;
}) {
  const t = TRANSLATIONS[language];

  return (
    <section
      id="work-skills"
      className="py-28 border-t"
      style={{
        borderColor: "#E8DDD4",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionTag center theme={theme}>
            {t.workSkills.heading}
          </SectionTag>

          <h2
            className="text-4xl lg:text-5xl font-light tracking-tight text-[#1A1614]"
            style={serif}
          >
            {t.workSkills.title1}{" "}
            <span
              className="italic font-semibold"
              style={{
                color: theme.color,
              }}
            >
              {t.workSkills.title2}
            </span>
          </h2>
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
          className="max-w-4xl mx-auto"
        >
          <div
            className="p-8 lg:p-10 rounded-3xl border bg-white"
            style={{
              borderColor: "#E8DDD4",
            }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SOFT_SKILLS.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.05,
                  }}
                  className="flex items-center gap-3 p-4 rounded-2xl"
                  style={{
                    background: theme.light,
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "#FFFFFF",
                      border: `1px solid ${theme.border}`,
                    }}
                  >
                    <Check
                      size={14}
                      style={{
                        color: theme.color,
                      }}
                    />
                  </div>

                  <span className="text-sm font-medium text-[#3E342F]">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
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
    {
      href: "#projects",
      label: t.nav.projects,
    },
    {
      href: "#activities",
      label: t.nav.activities,
    },
    {
      href: "#skills",
      label: t.nav.skills,
    },
    {
      href: "#work-skills",
      label: t.nav.workSkills,
    },
  ];

  return (
    <footer
      className="py-12 border-t"
      style={{
        borderColor: "#E8DDD4",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
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
    const sections =
      document.querySelectorAll("section[id]");

    const observer =
      new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) =>
                b.intersectionRatio -
                a.intersectionRatio
            );

          if (visibleEntries.length > 0) {
            setActive(
              visibleEntries[0].target.id
            );
          }
        },
        {
          threshold: [0.2, 0.3, 0.5],
          rootMargin: "-10% 0px -20% 0px",
        }
      );

    sections.forEach((section) => {
      observer.observe(section);
    });

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

      <Projects
        theme={theme}
        language={language}
      />

      <Activities
        theme={theme}
        language={language}
      />

      <Skills
        theme={theme}
        language={language}
      />

      <WorkSkills
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