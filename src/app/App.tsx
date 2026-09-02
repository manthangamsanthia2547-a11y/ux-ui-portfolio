import { useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
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
  Sun,
  Moon,
  ExternalLink,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type Language = "th" | "en";

type Theme = {
  name: string;
  color: string;
  soft: string;
  light: string;
};

/* =========================================================
   THEMES
========================================================= */

const THEMES: Theme[] = [
  {
    name: "Rose",
    color: "#C47A86",
    soft: "#F3E1E5",
    light: "#FBF1F3",
  },
  {
    name: "Sage",
    color: "#789B82",
    soft: "#DDE9E0",
    light: "#F1F6F2",
  },
  {
    name: "Lavender",
    color: "#8C82B8",
    soft: "#E7E3F2",
    light: "#F5F3FA",
  },
  {
    name: "Blue",
    color: "#7394B8",
    soft: "#DCE7F1",
    light: "#F2F6FA",
  },
];

/* =========================================================
   FONT HELPERS
========================================================= */

const displayFont = {
  fontFamily:
    "'Bricolage Grotesque', 'Inter', ui-sans-serif, system-ui, sans-serif",
};

const mono = {
  fontFamily:
    "'JetBrains Mono', 'SFMono-Regular', Consolas, monospace",
};

/* =========================================================
   NAVIGATION
========================================================= */

const NAV = [
  {
    href: "#about",
    th: "เกี่ยวกับ",
    en: "About",
  },
  {
    href: "#skills",
    th: "ทักษะ",
    en: "Skills",
  },
  {
    href: "#projects",
    th: "ผลงาน",
    en: "Projects",
  },
  {
    href: "#education",
    th: "การศึกษา",
    en: "Education",
  },
  {
    href: "#training",
    th: "การอบรม",
    en: "Training",
  },
  {
    href: "#contact",
    th: "ติดต่อ",
    en: "Contact",
  },
];

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [active, setActive] = useState("hero");

  const [themeIndex, setThemeIndex] = useState(0);

  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "th";
    }

    const saved = localStorage.getItem("portfolio-language");

    return saved === "en" ? "en" : "th";
  });

  const theme = THEMES[themeIndex];

  useEffect(() => {
    localStorage.setItem("portfolio-language", language);
  }, [language]);

  useEffect(() => {
    const sections = [
      "hero",
      "about",
      "skills",
      "projects",
      "education",
      "training",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        threshold: [0.15, 0.3, 0.5],
        rootMargin: "-20% 0px -50% 0px",
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen bg-[#FAF7F2] text-[#28221F] overflow-x-hidden"
      style={{
        ...displayFont,
        ["--accent" as string]: theme.color,
        ["--accent-soft" as string]: theme.soft,
        ["--accent-light" as string]: theme.light,
      }}
    >
      <Nav
        active={active}
        theme={theme}
        themeIndex={themeIndex}
        setThemeIndex={setThemeIndex}
        language={language}
        setLanguage={setLanguage}
      />

      <main>
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
      </main>

      <Footer
        theme={theme}
        language={language}
      />
    </div>
  );
}

/* =========================================================
   NAV
========================================================= */

function Nav({
  active,
  theme,
  themeIndex,
  setThemeIndex,
  language,
  setLanguage,
}: {
  active: string;
  theme: Theme;
  themeIndex: number;
  setThemeIndex: (index: number) => void;
  language: Language;
  setLanguage: (language: Language) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 lg:px-8 pt-4">
      <nav
        className="mx-auto max-w-7xl rounded-2xl border border-[#E8DED6] bg-[#FFFDFB]/95 backdrop-blur-xl shadow-sm"
        style={{ borderColor: `${theme.color}22` }}
      >
        <div className="h-16 px-5 md:px-7 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-2 shrink-0"
          >
            <span
              className="text-2xl font-bold tracking-tight"
              style={{
                ...displayFont,
                color: theme.color,
              }}
            >
              M.
            </span>

            <span
              className="hidden sm:block text-sm font-medium text-[#6E625C]"
              style={mono}
            >
              Portfolio
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const isActive =
                active === item.href.replace("#", "");

              return (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="relative px-4 py-2 rounded-full text-sm transition-colors"
                  style={{
                    color: isActive
                      ? theme.color
                      : "#746861",
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  {language === "th"
                    ? item.th
                    : item.en}

                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute left-1/2 -bottom-1 h-1 w-1 rounded-full"
                      style={{
                        backgroundColor:
                          theme.color,
                        transform:
                          "translateX(-50%)",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language */}
            <div className="flex items-center rounded-full border border-[#E8DED6] bg-white p-1">
              <button
                onClick={() => setLanguage("th")}
                className="px-3 py-1.5 rounded-full text-[10px] font-bold transition-all"
                style={{
                  ...mono,
                  backgroundColor:
                    language === "th"
                      ? theme.color
                      : "transparent",
                  color:
                    language === "th"
                      ? "#FFFFFF"
                      : "#8B7B72",
                }}
              >
                TH
              </button>

              <button
                onClick={() => setLanguage("en")}
                className="px-3 py-1.5 rounded-full text-[10px] font-bold transition-all"
                style={{
                  ...mono,
                  backgroundColor:
                    language === "en"
                      ? theme.color
                      : "transparent",
                  color:
                    language === "en"
                      ? "#FFFFFF"
                      : "#8B7B72",
                }}
              >
                EN
              </button>
            </div>

            {/* Theme */}
            <div className="relative group">
              <button
                className="w-10 h-10 rounded-full border border-[#E8DED6] bg-white flex items-center justify-center hover:bg-[#FAF7F2] transition-colors"
                aria-label="Change theme"
              >
                <Palette
                  size={17}
                  style={{ color: theme.color }}
                />
              </button>

              <div className="absolute right-0 top-11 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
                <div className="rounded-2xl border border-[#E8DED6] bg-white shadow-xl p-3 flex gap-2">
                  {THEMES.map((item, index) => (
                    <button
                      key={item.name}
                      onClick={() =>
                        setThemeIndex(index)
                      }
                      className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-[#E4DCD5] transition-transform hover:scale-110"
                      style={{
                        backgroundColor:
                          item.color,
                      }}
                      title={item.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => scrollTo("#contact")}
              className="ml-1 px-5 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: theme.color,
              }}
            >
              {language === "th"
                ? "ติดต่อฉัน"
                : "Get In Touch"}
            </button>
          </div>

          {/* Mobile */}
          <button
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#5E534D]"
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
          >
            {mobileOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            className="lg:hidden border-t border-[#EEE5DE] px-5 py-4"
          >
            <div className="flex flex-col gap-1">
              {NAV.map((item) => (
                <button
                  key={item.href}
                  onClick={() =>
                    scrollTo(item.href)
                  }
                  className="text-left px-4 py-3 rounded-xl text-sm"
                  style={{
                    color:
                      active ===
                      item.href.replace("#", "")
                        ? theme.color
                        : "#655A54",
                    backgroundColor:
                      active ===
                      item.href.replace("#", "")
                        ? `${theme.color}12`
                        : "transparent",
                  }}
                >
                  {language === "th"
                    ? item.th
                    : item.en}
                </button>
              ))}

              <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#EEE5DE]">
                <div className="flex items-center rounded-full border border-[#E8DED6] bg-white p-1">
                  <button
                    onClick={() =>
                      setLanguage("th")
                    }
                    className="px-3 py-1.5 rounded-full text-[10px] font-bold"
                    style={{
                      ...mono,
                      backgroundColor:
                        language === "th"
                          ? theme.color
                          : "transparent",
                      color:
                        language === "th"
                          ? "#fff"
                          : "#8B7B72",
                    }}
                  >
                    TH
                  </button>

                  <button
                    onClick={() =>
                      setLanguage("en")
                    }
                    className="px-3 py-1.5 rounded-full text-[10px] font-bold"
                    style={{
                      ...mono,
                      backgroundColor:
                        language === "en"
                          ? theme.color
                          : "transparent",
                      color:
                        language === "en"
                          ? "#fff"
                          : "#8B7B72",
                    }}
                  >
                    EN
                  </button>
                </div>

                <button
                  onClick={() =>
                    scrollTo("#contact")
                  }
                  className="px-4 py-2 rounded-full text-xs font-semibold text-white"
                  style={{
                    backgroundColor:
                      theme.color,
                  }}
                >
                  {language === "th"
                    ? "ติดต่อฉัน"
                    : "Get In Touch"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}

/* =========================================================
   HERO
========================================================= */

function Hero({
  theme,
  language,
}: {
  theme: Theme;
  language: Language;
}) {
  return (
    <section
      id="hero"
      className="min-h-screen pt-32 md:pt-36 pb-20 px-5 md:px-8 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-7"
              style={{
                borderColor: `${theme.color}35`,
                backgroundColor: `${theme.color}0C`,
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  backgroundColor:
                    theme.color,
                }}
              />

              <span
                className="text-xs font-medium"
                style={{
                  color: theme.color,
                  ...mono,
                }}
              >
                {language === "th"
                  ? "เปิดรับโอกาสฝึกงานและงานระดับเริ่มต้น"
                  : "Available for Internship & Entry-Level Positions"}
              </span>
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
              className="text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.88] tracking-[-0.055em] font-semibold"
              style={displayFont}
            >
              <span className="block">
                {language === "th"
                  ? "สวัสดีค่ะ,"
                  : "Hello,"}
              </span>

              <span
                className="block"
                style={{
                  color: theme.color,
                }}
              >
                {language === "th"
                  ? "ฉันคือมัณฑนา"
                  : "I'm Manthana."}
              </span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-[#70645D]"
            >
              {language === "th"
                ? "นักออกแบบ UX/UI และนักศึกษาวิทยาการคอมพิวเตอร์ที่สนใจการสร้างประสบการณ์ดิจิทัลที่ใช้งานง่าย สวยงาม และตอบโจทย์ผู้ใช้"
                : "UX/UI Designer & Computer Science student passionate about crafting intuitive, visually compelling digital experiences through user-centered design."}
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-all hover:translate-y-[-1px]"
                style={{
                  backgroundColor:
                    theme.color,
                }}
              >
                {language === "th"
                  ? "ดูผลงานของฉัน"
                  : "View My Work"}

                <ArrowRight size={16} />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#DED4CC] bg-white text-[#4F4641] text-sm font-semibold hover:border-[#C9BDB4] transition-all"
              >
                {language === "th"
                  ? "ติดต่อฉัน"
                  : "Contact Me"}
              </a>
            </motion.div>

            {/* Mini Stats */}
            <div className="mt-12 flex flex-wrap gap-8">
              <Stat
                value="4+"
                label={
                  language === "th"
                    ? "โปรเจกต์"
                    : "Projects"
                }
                theme={theme}
              />

              <Stat
                value="UI/UX"
                label={
                  language === "th"
                    ? "ความสนใจหลัก"
                    : "Main Focus"
                }
                theme={theme}
              />

              <Stat
                value="CS"
                label={
                  language === "th"
                    ? "นักศึกษาวิทยาการคอมพิวเตอร์"
                    : "Computer Science"
                }
                theme={theme}
              />
            </div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="relative"
          >
            <div
              className="absolute -top-10 -right-8 w-32 h-32 rounded-full blur-3xl opacity-50"
              style={{
                backgroundColor:
                  theme.soft,
              }}
            />

            <div
              className="relative rounded-[2rem] overflow-hidden border bg-white shadow-[0_25px_80px_rgba(50,35,25,0.08)]"
              style={{
                borderColor: `${theme.color}25`,
              }}
            >
              <div className="aspect-[4/5] flex items-center justify-center bg-[#F4EEE8]">
                <div className="text-center px-8">
                  <div
                    className="w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full flex items-center justify-center text-5xl md:text-6xl font-semibold text-white shadow-lg"
                    style={{
                      backgroundColor:
                        theme.color,
                    }}
                  >
                    M
                  </div>

                  <p
                    className="mt-7 text-2xl md:text-3xl font-semibold"
                    style={displayFont}
                  >
                    Manthana
                  </p>

                  <p
                    className="mt-2 text-xs text-[#8A7C73]"
                    style={mono}
                  >
                    UX/UI DESIGNER
                  </p>
                </div>
              </div>

              <div className="absolute left-5 bottom-5 right-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor:
                        theme.light,
                      color: theme.color,
                    }}
                  >
                    <Palette size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      UX/UI Designer
                    </p>

                    <p className="text-xs text-[#8A7C73]">
                      {language === "th"
                        ? "ออกแบบประสบการณ์ดิจิทัล"
                        : "Designing digital experiences"}
                    </p>
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

/* =========================================================
   STAT
========================================================= */

function Stat({
  value,
  label,
  theme,
}: {
  value: string;
  label: string;
  theme: Theme;
}) {
  return (
    <div>
      <p
        className="text-xl font-semibold"
        style={{
          ...displayFont,
          color: theme.color,
        }}
      >
        {value}
      </p>

      <p className="mt-1 text-xs text-[#8A7C73]">
        {label}
      </p>
    </div>
  );
}

/* =========================================================
   ABOUT
========================================================= */

function About({
  theme,
  language,
}: {
  theme: Theme;
  language: Language;
}) {
  return (
    <section
      id="about"
      className="py-24 md:py-32 px-5 md:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="01 / ABOUT"
          title={
            language === "th"
              ? "เกี่ยวกับฉัน"
              : "About Me"
          }
          description={
            language === "th"
              ? "ฉันสนใจการออกแบบเว็บไซต์และแอปพลิเคชันที่ผสมผสานความสวยงามเข้ากับการใช้งานจริง"
              : "I enjoy designing websites and digital products that balance visual quality with real user needs."
            }
          theme={theme}
        />

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 mt-16">
          <div>
            <p
              className="text-4xl md:text-5xl font-semibold leading-tight"
              style={displayFont}
            >
              {language === "th"
                ? "Design with purpose."
                : "Design with purpose."}
            </p>

            <div
              className="w-16 h-1 rounded-full mt-6"
              style={{
                backgroundColor:
                  theme.color,
              }}
            />
          </div>

          <div className="space-y-6 text-[#70645D] leading-8">
            <p>
              {language === "th"
                ? "ฉันเป็นนักศึกษาวิทยาการคอมพิวเตอร์ที่มีความสนใจด้าน UX/UI Design และ Frontend Development ชอบเปลี่ยนปัญหาที่ซับซ้อนให้กลายเป็นหน้าจอและประสบการณ์ที่เข้าใจง่าย"
                : "I am a Computer Science student interested in UX/UI Design and Frontend Development. I enjoy turning complex problems into clear interfaces and meaningful user experiences."}
            </p>

            <p>
              {language === "th"
                ? "ในการทำโปรเจกต์ ฉันให้ความสำคัญกับการทำความเข้าใจผู้ใช้ การวาง Information Architecture การออกแบบ User Flow การทำ Wireframe และ Prototype รวมถึงการทดสอบและปรับปรุงงาน"
                : "In my projects, I focus on understanding users, information architecture, user flows, wireframing, prototyping, testing, and continuous improvement."}
            </p>

            <p>
              {language === "th"
                ? "ฉันกำลังมองหาโอกาสในการฝึกงานหรืองานระดับเริ่มต้นด้าน UX/UI Design, Product Design หรือ Frontend Development เพื่อเรียนรู้จากการทำงานจริงและพัฒนาทักษะของตัวเอง"
                : "I am looking for internship or entry-level opportunities in UX/UI Design, Product Design, or Frontend Development where I can learn from real-world projects and continue growing."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SKILLS
========================================================= */

function Skills({
  theme,
  language,
}: {
  theme: Theme;
  language: Language;
}) {
  const skills = [
    {
      icon: Palette,
      title:
        language === "th"
          ? "UX/UI Design"
          : "UX/UI Design",
      items:
        language === "th"
          ? [
              "User Research",
              "User Flow",
              "Wireframe",
              "Prototype",
              "Responsive Design",
              "Usability Testing",
            ]
          : [
              "User Research",
              "User Flow",
              "Wireframe",
              "Prototype",
              "Responsive Design",
              "Usability Testing",
            ],
    },
    {
      icon: Layers,
      title:
        language === "th"
          ? "Design Tools"
          : "Design Tools",
      items: [
        "Figma",
        "FigJam",
        "Design System",
        "Component Design",
        "Visual Design",
        "Prototyping",
      ],
    },
    {
      icon: Globe,
      title:
        language === "th"
          ? "Frontend"
          : "Frontend",
      items: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "TypeScript",
        "Tailwind CSS",
      ],
    },
    {
      icon: Users2,
      title:
        language === "th"
          ? "Working Style"
          : "Working Style",
      items:
        language === "th"
          ? [
              "Teamwork",
              "Communication",
              "Problem Solving",
              "Agile / Scrum",
              "Documentation",
              "Continuous Learning",
            ]
          : [
              "Teamwork",
              "Communication",
              "Problem Solving",
              "Agile / Scrum",
              "Documentation",
              "Continuous Learning",
            ],
    },
  ];

  return (
    <section
      id="skills"
      className="py-24 md:py-32 px-5 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="02 / SKILLS"
          title={
            language === "th"
              ? "ทักษะ"
              : "Skills"
          }
          description={
            language === "th"
              ? "ทักษะที่ใช้ในการออกแบบ พัฒนา และทำงานร่วมกับทีม"
              : "Skills I use to design, build, and collaborate on digital products."
          }
          theme={theme}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {skills.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <motion.div
                key={skill.title}
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
                  amount: 0.2,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                className="rounded-3xl border border-[#E8DED6] bg-white p-6"
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center"
                  style={{
                    backgroundColor:
                      theme.light,
                    color: theme.color,
                  }}
                >
                  <Icon size={20} />
                </div>

                <h3
                  className="mt-6 text-lg font-semibold"
                  style={displayFont}
                >
                  {skill.title}
                </h3>

                <div className="mt-5 space-y-3">
                  {skill.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm text-[#766A63]"
                    >
                      <Check
                        size={14}
                        style={{
                          color: theme.color,
                        }}
                      />

                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PROJECTS
========================================================= */

function Projects({
  theme,
  language,
}: {
  theme: Theme;
  language: Language;
}) {
  const projects = [
    {
      number: "01",
      category:
        language === "th"
          ? "Senior Project"
          : "Senior Project",
      title:
        language === "th"
          ? "ระบบสารสนเทศเพื่อบริหารจัดการค่าส่วนกลางและติดตามหนี้ค้างชำระ"
          : "Information System for Common Area Fee Management & Debt Tracking",
      description:
        language === "th"
          ? "ระบบสำหรับบริหารจัดการค่าส่วนกลาง การออกใบแจ้งหนี้ การติดตามยอดค้างชำระ การตรวจสอบการชำระเงิน และการแจ้งเตือนผ่าน LINE"
          : "A system for managing common area fees, invoices, outstanding balances, payment verification, and LINE notifications.",
      tags: [
        "Figma",
        "UX/UI",
        "LINE Messaging API",
        "Database",
        "Agile / Scrum",
      ],
      image: "/project1.png",
      role:
        language === "th"
          ? "UX/UI Designer · System Analyst"
          : "UX/UI Designer · System Analyst",
    },
    {
      number: "02",
      category:
        language === "th"
          ? "Academic Project"
          : "Academic Project",
      title:
        language === "th"
          ? "ระบบสั่งอาหารออนไลน์ สำหรับร้านข้าวแกงครัวไทย"
          : "Online Food Ordering System for Thai Food Restaurant",
      description:
        language === "th"
          ? "ออกแบบ Mobile Food Ordering Interface สำหรับร้านอาหารไทย โดยเน้นการนำทางที่ง่าย ข้อมูลอาหารชัดเจน และขั้นตอนการสั่งซื้อที่ใช้งานสะดวก"
          : "Designed a mobile food ordering interface for a Thai food restaurant, focusing on simple navigation, clear food information, and an easy ordering experience.",
      tags: [
        "Figma",
        "UI/UX",
        "Mobile Design",
        "Prototype",
      ],
      image: "/project2.png",
      role:
        language === "th"
          ? "UI/UX Designer · Figma"
          : "UI/UX Designer · Figma",
    },
    {
      number: "03",
      category:
        language === "th"
          ? "Personal Project"
          : "Personal Project",
      title: "JobTrackr: Job Application Tracker",
      description:
        language === "th"
          ? "เว็บแอปสำหรับจัดการและติดตามการสมัครงานในที่เดียว พร้อม Dashboard, Application List และ Kanban Board เพื่อช่วยให้ผู้ใช้เห็นสถานะการสมัครงานได้ง่ายขึ้น"
          : "A web application designed to organize and track job applications in one place, featuring a dashboard, application list, and Kanban board.",
      tags: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "UI/UX Design",
      ],
      image: "/jobtrackr.png",
      role:
        language === "th"
          ? "UI/UX Designer · Frontend Developer"
          : "UI/UX Designer · Frontend Developer",
      liveDemo:
        "https://job-application-tracker-wine-ten.vercel.app/",
      github:
        "https://github.com/manthangamsanthia2547-a11y/job-application-tracker",
    },
    {
      number: "04",
      category:
        language === "th"
          ? "Personal Project"
          : "Personal Project",
      title:
        language === "th"
          ? "MangaVerse: แพลตฟอร์มอ่านมังงะและเว็บตูน"
          : "MangaVerse: Manga & Webtoon Reading Platform",
      description:
        language === "th"
          ? "เว็บไซต์สำหรับค้นหา อ่าน และจัดการมังงะและเว็บตูน โดยเน้นการนำทางที่เข้าใจง่าย ประสบการณ์การอ่านที่สะดวก และการค้นหาเนื้อหาที่เรียบง่าย"
          : "A responsive web platform for discovering, reading, and managing manga and webtoons, focusing on intuitive navigation, comfortable reading, and simple content discovery.",
      tags: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "UI/UX Design",
        "Responsive Design",
        "Dark/Light Mode",
      ],
      image: "/mangaverse.png",
      role:
        language === "th"
          ? "UI/UX Designer · Frontend Developer"
          : "UI/UX Designer · Frontend Developer",
      liveDemo:
        "https://mangaverse-reading-platform.vercel.app/",
      github:
        "https://github.com/manthangamsanthia2547-a11y/mangaverse-reading-platform",
    },
  ];

  return (
    <section
      id="projects"
      className="py-24 md:py-32 px-5 md:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="03 / PROJECTS"
          title={
            language === "th"
              ? "ผลงาน"
              : "Selected Projects"
          }
          description={
            language === "th"
              ? "ตัวอย่างโปรเจกต์ด้าน UX/UI, Web Application และ Frontend Development"
              : "Selected work across UX/UI design, web applications, and frontend development."
          }
          theme={theme}
        />

        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              theme={theme}
              language={language}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({
  project,
  theme,
  language,
  index,
}: {
  project: {
    number: string;
    category: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
    role: string;
    liveDemo?: string;
    github?: string;
  };
  theme: Theme;
  language: Language;
  index: number;
}) {
  return (
    <motion.article
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
        amount: 0.15,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
      }}
      className="group overflow-hidden rounded-[2rem] border border-[#E8DED6] bg-[#FFFDFB]"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#F3EDE7]">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
          />
        </div>

        <div
          className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-bold text-white backdrop-blur-md"
          style={{
            backgroundColor: `${theme.color}E6`,
            ...mono,
          }}
        >
          PROJECT {project.number}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-7">
        <div
          className="text-[10px] uppercase tracking-[0.15em] font-bold"
          style={{
            color: theme.color,
            ...mono,
          }}
        >
          {project.category}
        </div>

        <h3
          className="mt-3 text-2xl font-semibold leading-tight text-[#29221F]"
          style={displayFont}
        >
          {project.title}
        </h3>

        <p className="mt-4 text-sm leading-7 text-[#756961]">
          {project.description}
        </p>

        <div className="mt-5">
          <p className="text-xs font-semibold text-[#5D524B]">
            {language === "th"
              ? "บทบาท"
              : "My Role"}
          </p>

          <p className="mt-1 text-xs text-[#897A71]">
            {project.role}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full text-[10px] border"
              style={{
                color: theme.color,
                borderColor: `${theme.color}25`,
                backgroundColor:
                  theme.light,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        {(project.liveDemo ||
          project.github) && (
          <div className="flex flex-wrap gap-2 mt-7 pt-5 border-t border-[#EEE5DE]">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-white transition-all hover:opacity-90"
                style={{
                  backgroundColor:
                    theme.color,
                }}
              >
                <ExternalLink size={14} />

                {language === "th"
                  ? "ดู Live Demo"
                  : "Live Demo"}
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold border border-[#DED4CC] bg-white text-[#544A44] hover:border-[#C9BDB4] transition-colors"
              >
                <Github size={14} />

                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

/* =========================================================
   EDUCATION
========================================================= */

function Education({
  theme,
  language,
}: {
  theme: Theme;
  language: Language;
}) {
  return (
    <section
      id="education"
      className="py-24 md:py-32 px-5 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="04 / EDUCATION"
          title={
            language === "th"
              ? "การศึกษา"
              : "Education"
          }
          description={
            language === "th"
              ? "พื้นฐานด้าน Computer Science ที่นำมาประยุกต์ใช้กับงานออกแบบและพัฒนา"
              : "A Computer Science background that supports my design and development work."
          }
          theme={theme}
        />

        <div className="mt-14 max-w-4xl">
          <div
            className="relative pl-8 md:pl-12 border-l-2"
            style={{
              borderColor:
                `${theme.color}35`,
            }}
          >
            <div
              className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-[#FAF7F2]"
              style={{
                backgroundColor:
                  theme.color,
              }}
            />

            <div className="rounded-3xl border border-[#E8DED6] bg-white p-7 md:p-9">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{
                    color: theme.color,
                    backgroundColor:
                      theme.light,
                  }}
                >
                  <Calendar size={13} />

                  {language === "th"
                    ? "ปัจจุบัน"
                    : "Present"}
                </span>
              </div>

              <h3
                className="mt-5 text-2xl md:text-3xl font-semibold"
                style={displayFont}
              >
                {language === "th"
                  ? "มหาวิทยาลัยราชภัฏนครราชสีมา"
                  : "Nakhon Ratchasima Rajabhat University"}
              </h3>

              <p
                className="mt-2 font-medium"
                style={{
                  color: theme.color,
                }}
              >
                {language === "th"
                  ? "วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์"
                  : "Bachelor of Science in Computer Science"}
              </p>

              <p className="mt-5 text-sm leading-7 text-[#756961]">
                {language === "th"
                  ? "ศึกษาเกี่ยวกับการพัฒนาซอฟต์แวร์ ฐานข้อมูล การวิเคราะห์ระบบ การออกแบบเว็บไซต์ และเทคโนโลยีสารสนเทศ พร้อมนำความรู้มาประยุกต์ใช้กับโปรเจกต์ด้าน UX/UI และ Web Application"
                  : "Studying software development, databases, system analysis, web design, and information technology, while applying these skills to UX/UI and web application projects."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   TRAINING
========================================================= */

function Training({
  theme,
  language,
}: {
  theme: Theme;
  language: Language;
}) {
  const trainings = [
    {
      icon: Palette,
      title:
        language === "th"
          ? "UX/UI Design"
          : "UX/UI Design",
      description:
        language === "th"
          ? "ศึกษาแนวคิด User Experience, User Interface, Design Process, Persona, User Flow, Wireframe และ Prototype"
          : "Studied User Experience, User Interface, design processes, personas, user flows, wireframes, and prototypes.",
    },
    {
      icon: BookOpen,
      title:
        language === "th"
          ? "Agile & Scrum"
          : "Agile & Scrum",
      description:
        language === "th"
          ? "เรียนรู้การทำงานแบบ Agile และ Scrum รวมถึง Product Backlog, Sprint Planning, Sprint Review และ Retrospective"
          : "Learned Agile and Scrum practices including Product Backlog, Sprint Planning, Sprint Review, and Retrospective.",
    },
    {
      icon: Globe,
      title:
        language === "th"
          ? "Frontend Development"
          : "Frontend Development",
      description:
        language === "th"
          ? "พัฒนาเว็บไซต์ด้วย HTML, CSS, JavaScript, React, TypeScript และ Tailwind CSS"
          : "Built web interfaces using HTML, CSS, JavaScript, React, TypeScript, and Tailwind CSS.",
    },
  ];

  return (
    <section
      id="training"
      className="py-24 md:py-32 px-5 md:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="05 / TRAINING"
          title={
            language === "th"
              ? "การอบรมและการเรียนรู้"
              : "Training & Learning"
          }
          description={
            language === "th"
              ? "สิ่งที่ฉันศึกษาเพิ่มเติมเพื่อพัฒนาทักษะด้านการออกแบบและเทคโนโลยี"
              : "Additional learning that supports my design and technology skills."
          }
          theme={theme}
        />

        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {trainings.map(
            (training, index) => {
              const Icon = training.icon;

              return (
                <motion.div
                  key={training.title}
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
                    delay: index * 0.08,
                  }}
                  className="rounded-3xl border border-[#E8DED6] bg-[#FFFDFB] p-7"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      color: theme.color,
                      backgroundColor:
                        theme.light,
                    }}
                  >
                    <Icon size={21} />
                  </div>

                  <h3
                    className="mt-6 text-xl font-semibold"
                    style={displayFont}
                  >
                    {training.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#756961]">
                    {training.description}
                  </p>
                </motion.div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT
========================================================= */

function Contact({
  theme,
  language,
}: {
  theme: Theme;
  language: Language;
}) {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-5 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="06 / CONTACT"
          title={
            language === "th"
              ? "มาพูดคุยกัน"
              : "Let's Connect"
          }
          description={
            language === "th"
              ? "หากสนใจร่วมงาน ฝึกงาน หรืออยากพูดคุยเกี่ยวกับโปรเจกต์ สามารถติดต่อฉันได้เลยค่ะ"
              : "If you're interested in working together, internship opportunities, or discussing a project, feel free to reach out."
          }
          theme={theme}
        />

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 mt-14">
          {/* Contact Form */}
          <div className="rounded-[2rem] border border-[#E8DED6] bg-white p-7 md:p-9">
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold mb-2">
                  {language === "th"
                    ? "ชื่อ"
                    : "Your Name"}
                </label>

                <input
                  type="text"
                  placeholder={
                    language === "th"
                      ? "ชื่อของคุณ"
                      : "Your name"
                  }
                  className="w-full px-4 py-3.5 rounded-xl border border-[#E4DAD2] bg-[#FFFCF9] outline-none focus:ring-2"
                  style={{
                    ["--tw-ring-color" as string]:
                      `${theme.color}30`,
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2">
                  {language === "th"
                    ? "อีเมล"
                    : "Email Address"}
                </label>

                <input
                  type="email"
                  placeholder={
                    language === "th"
                      ? "อีเมลของคุณ"
                      : "Your email"
                  }
                  className="w-full px-4 py-3.5 rounded-xl border border-[#E4DAD2] bg-[#FFFCF9] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2">
                  {language === "th"
                    ? "ข้อความ"
                    : "Message"}
                </label>

                <textarea
                  rows={5}
                  placeholder={
                    language === "th"
                      ? "บอกฉันเกี่ยวกับโอกาสหรือโปรเจกต์..."
                      : "Tell me about the opportunity or project..."
                  }
                  className="w-full px-4 py-3.5 rounded-xl border border-[#E4DAD2] bg-[#FFFCF9] outline-none resize-none"
                />
              </div>

              <a
                href="mailto:manthana@example.com"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl text-sm font-semibold text-white"
                style={{
                  backgroundColor:
                    theme.color,
                }}
              >
                {language === "th"
                  ? "ส่งข้อความ"
                  : "Send Message"}

                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <ContactCard
              icon={Mail}
              title="Email"
              text={
                language === "th"
                  ? "สามารถติดต่อผ่านอีเมลได้เลยค่ะ"
                  : "Let's connect via email."
              }
              theme={theme}
            />

            <ContactCard
              icon={Phone}
              title="Phone"
              text={
                language === "th"
                  ? "พร้อมพูดคุยเกี่ยวกับโอกาสในการทำงาน"
                  : "Let's connect via phone."
              }
              theme={theme}
            />

            <ContactCard
              icon={MapPin}
              title={
                language === "th"
                  ? "Location"
                  : "Location"
              }
              text={
                language === "th"
                  ? "นครราชสีมา, ประเทศไทย"
                  : "Nakhon Ratchasima, Thailand"
              }
              theme={theme}
            />

            <div
              className="rounded-3xl border p-6"
              style={{
                borderColor: `${theme.color}30`,
                backgroundColor:
                  theme.light,
              }}
            >
              <div className="flex gap-4">
                <div
                  className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0"
                  style={{
                    color: theme.color,
                  }}
                >
                  <Check size={18} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    {language === "th"
                      ? "Open to Opportunities"
                      : "Open to Opportunities"}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#756961]">
                    {language === "th"
                      ? "กำลังมองหาโอกาสฝึกงานและงานระดับเริ่มต้นด้าน UX/UI Design, Product Design และ Frontend Development"
                      : "Currently seeking internship and entry-level opportunities in UX/UI Design, Product Design, and Frontend Development."}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://github.com/manthangamsanthia2547-a11y/ux-ui-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#DED4CC] bg-white text-xs font-semibold text-[#514741]"
              >
                <Github size={15} />
                GitHub
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#DED4CC] bg-white text-xs font-semibold text-[#514741]"
              >
                {language === "th"
                  ? "ดูผลงาน"
                  : "View Projects"}

                <ChevronRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT CARD
========================================================= */

function ContactCard({
  icon: Icon,
  title,
  text,
  theme,
}: {
  icon: typeof Mail;
  title: string;
  text: string;
  theme: Theme;
}) {
  return (
    <div className="rounded-3xl border border-[#E8DED6] bg-white p-5 flex items-center gap-4">
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
        style={{
          color: theme.color,
          backgroundColor:
            theme.light,
        }}
      >
        <Icon size={18} />
      </div>

      <div>
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="mt-1 text-xs text-[#8A7C73]">
          {text}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
  theme,
}: {
  eyebrow: string;
  title: string;
  description: string;
  theme: Theme;
}) {
  return (
    <div className="max-w-3xl">
      <div
        className="text-[10px] tracking-[0.18em] font-bold"
        style={{
          ...mono,
          color: theme.color,
        }}
      >
        {eyebrow}
      </div>

      <h2
        className="mt-4 text-4xl md:text-6xl tracking-[-0.04em] font-semibold"
        style={displayFont}
      >
        {title}
      </h2>

      <p className="mt-5 text-base md:text-lg leading-8 text-[#796D65]">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer({
  theme,
  language,
}: {
  theme: Theme;
  language: Language;
}) {
  return (
    <footer className="border-t border-[#E8DED6] bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="text-xl font-bold"
              style={{
                ...displayFont,
                color: theme.color,
              }}
            >
              M.
            </span>

            <span className="text-xs text-[#8A7C73]">
              {language === "th"
                ? "UX/UI Designer & Computer Science Student"
                : "UX/UI Designer & Computer Science Student"}
            </span>
          </div>

          <p
            className="text-[10px] text-[#9A8C83]"
            style={mono}
          >
            © {new Date().getFullYear()} Manthana Ngamsanthia
          </p>
        </div>
      </div>
    </footer>
  );
}