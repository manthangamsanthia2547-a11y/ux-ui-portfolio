import { useState, useEffect } from "react";
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
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Typography
// ─────────────────────────────────────────────────────────────

const serif: React.CSSProperties = {
  fontFamily: "'Fraunces', Georgia, serif",
};

const mono: React.CSSProperties = {
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
// Navigation
// ─────────────────────────────────────────────────────────────

const NAV = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#training", label: "Training" },
  { href: "#contact", label: "Contact" },
];

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

const HIGHLIGHTS = [
  "Experience using Figma to create UI designs, wireframes, and interactive prototypes.",
  "Understanding of User-Centered Design (UCD), user flows, and basic design systems.",
  "Familiar with usability testing, test case preparation, and User Acceptance Testing (UAT).",
  "Understanding of Agile and Scrum methodology through academic project work.",
  "Able to work independently, communicate effectively, and collaborate with a team.",
];

// ─────────────────────────────────────────────────────────────
// Training
// ─────────────────────────────────────────────────────────────

const TRAINING = [
  {
    title: 'Information Literacy Training: "Innovation Review and AI"',
    org: "Office of Academic Resources and Information Technology, Nakhon Ratchasima Rajabhat University",
    date: "December 17, 2025",
  },
  {
    title: "Workshop on Document Formatting and Academic Citation",
    org: "Office of Academic Resources and Information Technology, Nakhon Ratchasima Rajabhat University",
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
  children: React.ReactNode;
  center?: boolean;
  theme: (typeof THEMES)[number];
}) {
  if (center) {
    return (
      <div className="flex items-center justify-center gap-2.5 mb-5">
        <div
          className="w-6 h-px"
          style={{ background: theme.color }}
        />

        <span
          className="text-xs font-semibold tracking-[0.2em] uppercase"
          style={{ ...mono, color: theme.color }}
        >
          {children}
        </span>

        <div
          className="w-6 h-px"
          style={{ background: theme.color }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5 mb-5">
      <div
        className="w-6 h-px"
        style={{ background: theme.color }}
      />

      <span
        className="text-xs font-semibold tracking-[0.2em] uppercase"
        style={{ ...mono, color: theme.color }}
      >
        {children}
      </span>
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
}: {
  active: string;
  theme: (typeof THEMES)[number];
  setThemeIndex: (index: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showThemes, setShowThemes] = useState(false);

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
          : {}
      }
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {NAV.map(({ href, label }) => (
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
                  ? { color: theme.color }
                  : undefined
              }
            >
              {label}
            </a>
          ))}

          {/* Theme Button */}
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

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Theme Button */}
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

          {/* Mobile Menu Button */}
          <button
            className="text-[#8B7B72] hover:text-[#1A1614] transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div
          className="md:hidden mx-4 mt-2 p-4 rounded-2xl border flex flex-col gap-1 shadow-lg"
          style={{
            background: "#FFFFFF",
            borderColor: "#E8DDD4",
          }}
        >
          {NAV.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="py-2.5 px-3 rounded-xl text-sm font-medium text-[#5A4D45] transition-colors"
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
}: {
  theme: (typeof THEMES)[number];
}) {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden"
    >
      {/* Dot Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(${theme.color}22 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Main Glow */}
      <div
        className="absolute top-24 right-1/3 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: theme.color,
          opacity: 0.07,
          filter: "blur(120px)",
        }}
      />

      {/* Secondary Glow */}
      <div
        className="absolute bottom-24 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "#9B7BB0",
          opacity: 0.08,
          filter: "blur(100px)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-20 items-center">
        {/* Hero Text */}
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

            Available for Internship &amp; Entry-Level Positions
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
            UX/UI Designer &amp; Computer Science student passionate
            about crafting intuitive, visually compelling digital
            experiences through user-centered design.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-white hover:opacity-90 hover:scale-[1.02] transition-all"
              style={{
                background: theme.color,
              }}
            >
              View My Work
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
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* Design Canvas */}
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

            {/* Figma Badge */}
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
                Primary Tool
              </div>
            </motion.div>

            {/* UX/UI Badge */}
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
                Designer
              </div>
            </motion.div>

            {/* Color Palette */}
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
                Color Palette
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          className="text-[10px] tracking-[0.2em] uppercase font-semibold"
          style={{
            ...mono,
            color: theme.color + "80",
          }}
        >
          Scroll
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
}: {
  theme: (typeof THEMES)[number];
}) {
  const info = [
    {
      icon: Calendar,
      label: "Date of Birth",
      value: "2 July 2004 (22 years old)",
    },
    {
      icon: Globe,
      label: "Nationality",
      value: "Thai",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Nakhon Ratchasima, Thailand",
    },
    {
      icon: Mail,
      label: "Email",
      value: "manthangamsanthia2547@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
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
              Career Objective
            </SectionTag>

            <h2
              className="text-4xl lg:text-5xl font-light leading-tight tracking-tight text-[#1A1614] mb-6"
              style={serif}
            >
              Creating Meaningful
              <br />

              <span
                className="italic font-semibold"
                style={{
                  color: theme.color,
                }}
              >
                User Experiences
              </span>
            </h2>

            <p className="text-[#5A4D45] leading-relaxed text-base lg:text-lg mb-4">
              I am a Computer Science student with a strong interest in
              UX/UI Design. I enjoy creating simple, intuitive, and
              user-friendly digital experiences.
            </p>

            <p className="text-[#8B7B72] leading-relaxed mb-10">
              I am looking for an internship opportunity where I can
              apply what I have learned, improve my design skills, and
              gain experience working with a professional team.
            </p>

            <h3
              className="font-semibold text-[#1A1614] mb-5 text-sm"
              style={mono}
            >
              Summary of Qualifications
            </h3>

            <ul className="space-y-3">
              {HIGHLIGHTS.map((h, i) => (
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

                  {h}
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

            {/* Languages */}
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
                Languages
              </div>

              <div className="flex gap-3">
                <div
                  className="flex-1 p-3 rounded-xl text-center"
                  style={{
                    background: "#FAF7F2",
                  }}
                >
                  <div className="text-sm font-semibold text-[#1A1614]">
                    Thai
                  </div>

                  <div className="text-[10px] text-[#8B7B72] mt-0.5">
                    Native · Excellent
                  </div>
                </div>

                <div
                  className="flex-1 p-3 rounded-xl text-center"
                  style={{
                    background: "#FAF7F2",
                  }}
                >
                  <div className="text-sm font-semibold text-[#1A1614]">
                    English
                  </div>

                  <div className="text-[10px] text-[#8B7B72] mt-0.5">
                    Basic Proficiency
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
}: {
  theme: (typeof THEMES)[number];
}) {
  const categories = [
    {
      title: "UX/UI Design",
      icon: Layers,
      description:
        "Designing clear and user-friendly experiences from user flows to high-fidelity interfaces.",
      skills: DESIGN_SKILLS,
      color: "rose" as ChipColor,
    },
    {
      title: "Design Tools",
      icon: Layers,
      description:
        "Tools used to create visual designs, wireframes, prototypes, and supporting graphics.",
      skills: DESIGN_TOOLS,
      color: "stone" as ChipColor,
    },
    {
      title: "UX Research & Testing",
      icon: BookOpen,
      description:
        "Understanding user needs, validating designs, and preparing structured testing activities.",
      skills: UX_RESEARCH,
      color: "purple" as ChipColor,
    },
    {
      title: "Soft Skills",
      icon: Users2,
      description:
        "Professional qualities developed through coursework, project collaboration, and teamwork.",
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
            UX/UI Skills &amp; Professional Skills
          </SectionTag>

          <h2
            className="text-4xl lg:text-5xl font-light tracking-tight text-[#1A1614]"
            style={serif}
          >
            Tools of{" "}
            <span
              className="italic font-semibold"
              style={{
                color: theme.color,
              }}
            >
              the Craft
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
}: {
  theme: (typeof THEMES)[number];
}) {
  return (
    <section
      id="projects"
      className="py-24 border-t"
      style={{
        borderColor: "#E8DDD4",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <SectionTag center theme={theme}>
            My Projects
          </SectionTag>

          <h2
            className="text-4xl lg:text-5xl font-light tracking-tight text-[#1A1614]"
            style={serif}
          >
            Selected{" "}
            <span
              className="italic font-semibold"
              style={{
                color: theme.color,
              }}
            >
              Work
            </span>
          </h2>

          <p className="mt-3 text-sm text-[#8B7B72] max-w-xl mx-auto">
            A collection of academic projects and UX/UI design work
            created during my Computer Science studies.
          </p>
        </div>

        {/* Project 01 */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
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
          className="mb-8 rounded-3xl overflow-hidden border bg-white shadow-sm"
          style={{
            borderColor: "#E8DDD4",
          }}
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image */}
            <div
              className="flex items-center justify-center p-4 lg:p-5"
              style={{
                background: "#F5EEE8",
              }}
            >
              <div className="w-full h-[520px] lg:h-[580px] flex items-center justify-center">
                <img
                  src="/project1.png"
                  alt="Common Area Fee Management System UI Design"
                  className="w-[100%] h-[100%] object-contain"
                />
              </div>
            </div>

            {/* Project Info */}
            <div className="p-7 lg:p-9 flex flex-col justify-center">
              <div
                className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full text-[10px] font-medium border mb-4"
                style={{
                  ...mono,
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

                In Progress — Senior Project
              </div>

              <h3 className="text-xl lg:text-2xl font-semibold text-[#1A1614] leading-tight mb-3">
                Information System for Common Area Fee Management &amp;
                Debt Tracking
              </h3>

              <p
                className="text-xs font-semibold mb-4"
                style={{
                  color: theme.color,
                }}
              >
                UX/UI Designer &amp; UX Researcher
              </p>

              <p className="text-sm text-[#5A4D45] leading-relaxed mb-5">
                Designed user-friendly interfaces and user flows for a
                common area fee management system, focusing on clear
                information, easy navigation, and a better experience
                for residents and administrators.
              </p>

              {/* Contribution */}
              <div className="mb-5">
                <h4
                  className="text-xs font-semibold text-[#1A1614] mb-2"
                  style={mono}
                >
                  My Contribution
                </h4>

                <ul className="space-y-1.5">
                  {[
                    "Analyzed user needs and system requirements.",
                    "Created user flows and wireframes.",
                    "Designed high-fidelity UI screens in Figma.",
                    "Created interactive prototypes.",
                    "Prepared usability testing and test cases.",
                  ].map((item, index) => (
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

                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Figma",
                  "UX/UI Design",
                  "User Flow",
                  "Wireframing",
                  "Prototyping",
                  "Usability Testing",
                ].map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    color="rose"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project 02 */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
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
          className="rounded-3xl overflow-hidden border bg-white shadow-sm"
          style={{
            borderColor: "#E8DDD4",
          }}
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image */}
            <div
              className="flex items-center justify-center p-5 lg:p-7"
              style={{
                background: "#F5EEE8",
              }}
            >
              <div className="w-full h-[520px] lg:h-[580px] flex items-center justify-center">
                <img
                  src="/project2.png"
                  alt="Online Food Ordering System UI Design"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Project Info */}
            <div className="p-7 lg:p-9 flex flex-col justify-center">
              <div
                className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full text-[10px] font-medium border mb-4"
                style={{
                  ...mono,
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

                Academic Project
              </div>

              <h3 className="text-xl lg:text-2xl font-semibold text-[#1A1614] leading-tight mb-3">
                ระบบสั่งอาหารออนไลน์
                <br />
                สำหรับร้านข้าวแกงครัวไทย
              </h3>

              <p className="text-sm text-[#5A4D45] mb-2">
                Online Food Ordering System for Thai Food Restaurant
              </p>

              <p
                className="text-xs font-semibold mb-4"
                style={{
                  color: theme.color,
                }}
              >
                UI/UX Designer · Figma
              </p>

              <p className="text-sm text-[#5A4D45] leading-relaxed mb-5">
                Designed a mobile food ordering interface for a Thai
                food restaurant, focusing on simple navigation, clear
                food information, and an easy-to-use ordering experience.
              </p>

              {/* Contribution */}
              <div className="mb-5">
                <h4
                  className="text-xs font-semibold text-[#1A1614] mb-2"
                  style={mono}
                >
                  My Contribution
                </h4>

                <ul className="space-y-1.5">
                  {[
                    "Designed mobile interfaces for food browsing and ordering.",
                    "Designed login and food detail screens.",
                    "Focused on clear food information and pricing.",
                    "Created the visual design using Figma.",
                    "Designed an easy-to-understand mobile experience.",
                  ].map((item, index) => (
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

                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Figma",
                  "UI Design",
                  "Mobile App",
                  "Wireframing",
                  "Prototyping",
                ].map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    color="rose"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Education
// ─────────────────────────────────────────────────────────────

function Education({
  theme,
}: {
  theme: (typeof THEMES)[number];
}) {
  const schools = [
    {
      school: "Nakhon Ratchasima Rajabhat University",
      degree: "Bachelor of Science in Computer Science",
      duration: "July 2023 – Present (In Progress)",
      gpa: "3.29",
      location: "Nakhon Ratchasima, Thailand",
      accent: theme.color,
    },
    {
      school: "Thachangratbamroong School",
      degree:
        "General Education Program (High School Certificate)",
      duration: "May 2019 – March 2022",
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
              Education
            </SectionTag>

            <h2
              className="text-4xl lg:text-5xl font-light tracking-tight text-[#1A1614]"
              style={serif}
            >
              Academic
              <br />

              <span
                className="italic font-semibold"
                style={{
                  color: theme.color,
                }}
              >
                Background
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
                      GPA
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
}: {
  theme: (typeof THEMES)[number];
}) {
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
              Training &amp; Seminars
            </SectionTag>

            <h2
              className="text-4xl lg:text-5xl font-light tracking-tight text-[#1A1614]"
              style={serif}
            >
              Continuous
              <br />

              <span
                className="italic font-semibold"
                style={{
                  color: theme.color,
                }}
              >
                Learning
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {TRAINING.map((t, i) => (
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
                    {t.title}
                  </h4>

                  <p className="text-xs text-[#8B7B72] leading-relaxed mb-2.5">
                    {t.org}
                  </p>

                  <span
                    className="text-xs font-medium"
                    style={{
                      ...mono,
                      color: theme.color,
                    }}
                  >
                    {t.date}
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
}: {
  theme: (typeof THEMES)[number];
}) {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "manthangamsanthia2547@gmail.com",
      href: "mailto:manthangamsanthia2547@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "094-363-6445",
      href: "tel:0943636445",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Nakhon Ratchasima 30230, Thailand",
    },
    {
      icon: Github,
      label: "GitHub",
      value:
        "github.com/manthangamsanthia2547-a11y/ux-ui-portfolio",
      href: "https://github.com/manthangamsanthia2547-a11y/ux-ui-portfolio",
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
        {/* Header */}
        <div className="text-center mb-16">
          <SectionTag center theme={theme}>
            Get In Touch
          </SectionTag>

          <h2
            className="text-4xl lg:text-5xl font-light tracking-tight text-[#1A1614]"
            style={serif}
          >
            Let’s Work{" "}
            <span
              className="italic font-semibold"
              style={{
                color: theme.color,
              }}
            >
              Together
            </span>
          </h2>

          <p className="mt-4 text-[#8B7B72] max-w-md mx-auto leading-relaxed">
            Interested in internship opportunities or collaborations?
            Feel free to contact me through the information below.
          </p>
        </div>

        {/* Contact Information */}
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
            ({ icon: Icon, label, value, href }) => {
              const content = (
                <>
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

                  <div>
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
                </>
              );

              if (href) {
                return (
                  <a
                    key={label}
                    href={href}
                    target={
                      label === "GitHub"
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      label === "GitHub"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-5 p-6 rounded-2xl border bg-white hover:shadow-md transition-all duration-200"
                    style={{
                      borderColor: "#E8DDD4",
                    }}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div
                  key={label}
                  className="flex items-center gap-5 p-6 rounded-2xl border bg-white"
                  style={{
                    borderColor: "#E8DDD4",
                  }}
                >
                  {content}
                </div>
              );
            }
          )}

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
                Open to Opportunities
              </span>
            </div>

            <p className="text-sm text-[#8B7B72] leading-relaxed">
              Currently seeking internship opportunities in UX/UI
              Design and related roles.
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
}: {
  theme: (typeof THEMES)[number];
}) {
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
            UX/UI Designer · Nakhon Ratchasima, Thailand
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {NAV.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-[#8B7B72] transition-colors"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#8B7B72";
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
          &copy; 2026 All rights reserved.
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

  const [themeIndex, setThemeIndex] = useState(() => {
    if (typeof window === "undefined") {
      return 0;
    }

    const savedTheme = localStorage.getItem("portfolio-theme");

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

  // Save selected theme
  useEffect(() => {
    localStorage.setItem(
      "portfolio-theme",
      String(themeIndex)
    );
  }, [themeIndex]);

  // Detect active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      {
        threshold: 0.3,
      }
    );

    document
      .querySelectorAll("section[id]")
      .forEach((section) => observer.observe(section));

    return () => observer.disconnect();
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
      />

      <Hero theme={theme} />

      <About theme={theme} />

      <Skills theme={theme} />

      <Projects theme={theme} />

      <Education theme={theme} />

      <Training theme={theme} />

      <Contact theme={theme} />

      <Footer theme={theme} />
    </div>
  );
}