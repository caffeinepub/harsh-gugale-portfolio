import { Code2, Cpu, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const embeddedSystems = [
  { name: "Microcontrollers (STM32 / ESP32 / Arduino)", level: 90 },
  { name: "Firmware Development (Embedded C)", level: 88 },
  { name: "Communication Protocols (UART / I2C / SPI / CAN)", level: 85 },
  { name: "RTOS & Real-Time Systems", level: 78 },
  { name: "ADC / DAC / PWM / Timers", level: 80 },
  { name: "PCB Design Fundamentals", level: 72 },
];

const aiSoftware = [
  { name: "Python", level: 82 },
  { name: "Machine Learning / Edge AI", level: 78 },
  { name: "Data Processing & Visualization", level: 74 },
  { name: "MATLAB", level: 75 },
  { name: "Computer Vision (OpenCV)", level: 72 },
];

const toolsPlatforms = [
  { name: "Git & Version Control", level: 88 },
  { name: "VS Code / Keil uVision", level: 85 },
  { name: "Proteus Simulation", level: 80 },
  { name: "KiCad (PCB)", level: 70 },
  { name: "MATLAB / Simulink", level: 75 },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
          {/* Card 1: Embedded Systems */}
          <div
            data-ocid="skills.embedded_systems_card"
            className="glass-card rounded-lg p-6 relative overflow-hidden"
          >
            {/* Colored top border */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{
                background: "linear-gradient(90deg, #00d4ff, transparent)",
              }}
            />

            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-9 h-9 rounded flex items-center justify-center"
                style={{
                  background: "rgba(0,212,255,0.1)",
                  border: "1px solid rgba(0,212,255,0.3)",
                }}
              >
                <Cpu className="w-4 h-4" style={{ color: "#00d4ff" }} />
              </div>
              <div>
                <p
                  className="font-mono-code text-xs"
                  style={{ color: "rgba(0,212,255,0.45)" }}
                >
                  MODULE_01 / Embedded Systems
                </p>
                <h3
                  className="font-display font-bold text-sm"
                  style={{ color: "#00d4ff" }}
                >
                  Embedded Systems
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {embeddedSystems.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color="#00d4ff"
                  animate={isVisible}
                />
              ))}
            </div>
          </div>

          {/* Card 2: AI & Software */}
          <div
            data-ocid="skills.ai_software_card"
            className="glass-card-purple rounded-lg p-6 relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{
                background: "linear-gradient(90deg, #7b2fff, transparent)",
              }}
            />

            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-9 h-9 rounded flex items-center justify-center"
                style={{
                  background: "rgba(123,47,255,0.1)",
                  border: "1px solid rgba(123,47,255,0.3)",
                }}
              >
                <Code2 className="w-4 h-4" style={{ color: "#a855f7" }} />
              </div>
              <div>
                <p
                  className="font-mono-code text-xs"
                  style={{ color: "rgba(123,47,255,0.5)" }}
                >
                  MODULE_02 / AI & Software
                </p>
                <h3
                  className="font-display font-bold text-sm"
                  style={{ color: "#a855f7" }}
                >
                  AI & Software
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {aiSoftware.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color="#a855f7"
                  animate={isVisible}
                />
              ))}
            </div>
          </div>

          {/* Card 3: Tools & Platforms */}
          <div
            data-ocid="skills.tools_platforms_card"
            className="glass-card-green rounded-lg p-6 relative overflow-hidden md:col-span-2 lg:col-span-1"
          >
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{
                background: "linear-gradient(90deg, #00ff88, transparent)",
              }}
            />

            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-9 h-9 rounded flex items-center justify-center"
                style={{
                  background: "rgba(0,255,136,0.1)",
                  border: "1px solid rgba(0,255,136,0.3)",
                }}
              >
                <Zap className="w-4 h-4" style={{ color: "#00ff88" }} />
              </div>
              <div>
                <p
                  className="font-mono-code text-xs"
                  style={{ color: "rgba(0,255,136,0.45)" }}
                >
                  MODULE_03 / Tools & Platforms
                </p>
                <h3
                  className="font-display font-bold text-sm"
                  style={{ color: "#00ff88" }}
                >
                  Tools & Platforms
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {toolsPlatforms.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color="#00ff88"
                  animate={isVisible}
                />
              ))}
            </div>
          </div>
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
