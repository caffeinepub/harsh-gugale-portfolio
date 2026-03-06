import { Code2, Cpu, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  useGetSkillCategories,
  useInitializeSkills,
} from "../../hooks/useQueries";

const FALLBACK_CATEGORIES = [
  {
    id: BigInt(0),
    name: "Embedded Systems",
    accentColor: "#00d4ff",
    skills: [
      { name: "Microcontrollers (STM32 / ESP32 / Arduino)", level: BigInt(90) },
      { name: "Firmware Development (Embedded C)", level: BigInt(88) },
      {
        name: "Communication Protocols (UART / I2C / SPI / CAN)",
        level: BigInt(85),
      },
      { name: "RTOS & Real-Time Systems", level: BigInt(78) },
      { name: "ADC / DAC / PWM / Timers", level: BigInt(80) },
      { name: "PCB Design Fundamentals", level: BigInt(72) },
    ],
  },
  {
    id: BigInt(1),
    name: "AI & Software",
    accentColor: "#a855f7",
    skills: [
      { name: "Python", level: BigInt(82) },
      { name: "Machine Learning / Edge AI", level: BigInt(78) },
      { name: "Data Processing & Visualization", level: BigInt(74) },
      { name: "MATLAB", level: BigInt(75) },
      { name: "Computer Vision (OpenCV)", level: BigInt(72) },
    ],
  },
  {
    id: BigInt(2),
    name: "Tools & Platforms",
    accentColor: "#00ff88",
    skills: [
      { name: "Git & Version Control", level: BigInt(88) },
      { name: "VS Code / Keil uVision", level: BigInt(85) },
      { name: "Proteus Simulation", level: BigInt(80) },
      { name: "KiCad (PCB)", level: BigInt(70) },
      { name: "MATLAB / Simulink", level: BigInt(75) },
    ],
  },
];

const CARD_CONFIGS = [
  {
    cardClass: "glass-card",
    color: "#00d4ff",
    moduleLabel: "MODULE_01",
    icon: <Cpu className="w-4 h-4" style={{ color: "#00d4ff" }} />,
    iconBg: "rgba(0,212,255,0.1)",
    iconBorder: "rgba(0,212,255,0.3)",
    moduleLabelColor: "rgba(0,212,255,0.45)",
    gradientBorder: "linear-gradient(90deg, #00d4ff, transparent)",
    extraClass: "",
  },
  {
    cardClass: "glass-card-purple",
    color: "#a855f7",
    moduleLabel: "MODULE_02",
    icon: <Code2 className="w-4 h-4" style={{ color: "#a855f7" }} />,
    iconBg: "rgba(123,47,255,0.1)",
    iconBorder: "rgba(123,47,255,0.3)",
    moduleLabelColor: "rgba(123,47,255,0.5)",
    gradientBorder: "linear-gradient(90deg, #7b2fff, transparent)",
    extraClass: "",
  },
  {
    cardClass: "glass-card-green",
    color: "#00ff88",
    moduleLabel: "MODULE_03",
    icon: <Zap className="w-4 h-4" style={{ color: "#00ff88" }} />,
    iconBg: "rgba(0,255,136,0.1)",
    iconBorder: "rgba(0,255,136,0.3)",
    moduleLabelColor: "rgba(0,255,136,0.45)",
    gradientBorder: "linear-gradient(90deg, #00ff88, transparent)",
    extraClass: "md:col-span-2 lg:col-span-1",
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const { data: dynamicCategories, isLoading } = useGetSkillCategories();
  const { mutate: initSkills } = useInitializeSkills();

  // biome-ignore lint/correctness/useExhaustiveDependencies: fire-and-forget initialization on mount
  useEffect(() => {
    try {
      initSkills();
    } catch {
      // fire-and-forget
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const categories =
    !isLoading && dynamicCategories && dynamicCategories.length > 0
      ? dynamicCategories
      : FALLBACK_CATEGORIES;

  return (
    <section
      id="skills"
      ref={sectionRef}
      data-ocid="skills.section"
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
      style={{ backgroundColor: "#060b18" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 right-0 w-80 h-80 pointer-events-none -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(123,47,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="mb-16">
          <span className="section-label">SECTION_03</span>
          <h2
            className="font-display font-bold mt-2"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "#e8f4f8",
            }}
          >
            <span style={{ color: "rgba(0,212,255,0.5)" }}>&#47;&#47; </span>
            SKILL_MATRIX
            <span
              style={{
                color: "#00d4ff",
                textShadow: "0 0 20px rgba(0,212,255,0.5)",
              }}
            >
              .DAT
            </span>
          </h2>
        </div>

        {/* Three-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const cfg = CARD_CONFIGS[index % CARD_CONFIGS.length];
            const ocidBase =
              index === 0
                ? "skills.embedded_systems_card"
                : index === 1
                  ? "skills.ai_software_card"
                  : "skills.tools_platforms_card";
            const moduleIndex = `MODULE_0${index + 1} / ${category.name}`;
            return (
              <div
                key={category.id.toString()}
                data-ocid={ocidBase}
                className={`${cfg.cardClass} rounded-lg p-6 relative overflow-hidden ${cfg.extraClass}`}
              >
                {/* Colored top border */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: cfg.gradientBorder }}
                />

                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 rounded flex items-center justify-center"
                    style={{
                      background: cfg.iconBg,
                      border: `1px solid ${cfg.iconBorder}`,
                    }}
                  >
                    {cfg.icon}
                  </div>
                  <div>
                    <p
                      className="font-mono-code text-xs"
                      style={{ color: cfg.moduleLabelColor }}
                    >
                      {moduleIndex}
                    </p>
                    <h3
                      className="font-display font-bold text-sm"
                      style={{ color: cfg.color }}
                    >
                      {category.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={Number(skill.level)}
                      color={cfg.color}
                      animate={isVisible}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillBar({
  name,
  level,
  color,
  animate,
}: {
  name: string;
  level: number;
  color: string;
  animate: boolean;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span
          className="font-body text-xs font-medium"
          style={{ color: "rgba(232,244,248,0.75)" }}
        >
          {name}
        </span>
        <span
          className="font-mono-code text-xs"
          style={{ color: `${color}99` }}
        >
          {level}%
        </span>
      </div>
      <div
        className="h-1 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: animate ? `${level}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}66)`,
            boxShadow: `0 0 6px ${color}60`,
            transitionDelay: "0.3s",
          }}
        />
      </div>
    </div>
  );
}
