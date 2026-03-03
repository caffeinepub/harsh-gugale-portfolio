import { Code2, Cpu, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const coreElectronics = [
  { name: "Embedded C", level: 90 },
  { name: "STM32 / ARM Cortex", level: 85 },
  { name: "ESP32", level: 88 },
  { name: "Arduino", level: 92 },
  { name: "CAN Protocol", level: 82 },
  { name: "UART / SPI / I2C", level: 87 },
  { name: "RTOS Basics", level: 75 },
  { name: "PCB Fundamentals", level: 72 },
];

const softwareTools = [
  { name: "Python", level: 80 },
  { name: "MATLAB", level: 75 },
  { name: "Git", level: 85 },
  { name: "Proteus", level: 78 },
  { name: "Keil uVision", level: 80 },
];

const emergingTech = [
  "Edge AI",
  "IoT Systems",
  "Autonomous Systems",
  "EV Electrical Architecture",
  "Machine Learning",
  "Computer Vision",
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
          {/* Card 1: Core Electronics */}
          <div
            data-ocid="skills.core_electronics_card"
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
                  MODULE_01
                </p>
                <h3
                  className="font-display font-bold text-sm"
                  style={{ color: "#00d4ff" }}
                >
                  Core Electronics
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {coreElectronics.map((skill) => (
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

          {/* Card 2: Software & Tools */}
          <div
            data-ocid="skills.software_tools_card"
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
                  MODULE_02
                </p>
                <h3
                  className="font-display font-bold text-sm"
                  style={{ color: "#a855f7" }}
                >
                  Software & Tools
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {softwareTools.map((skill) => (
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

          {/* Card 3: Emerging Technologies */}
          <div
            data-ocid="skills.emerging_tech_card"
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
                  MODULE_03
                </p>
                <h3
                  className="font-display font-bold text-sm"
                  style={{ color: "#00ff88" }}
                >
                  Emerging Technologies
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {emergingTech.map((tech) => (
                <span
                  key={tech}
                  className="font-body text-sm px-3 py-2 rounded-full"
                  style={{
                    background: "rgba(0,255,136,0.07)",
                    border: "1px solid rgba(0,255,136,0.25)",
                    color: "#00ff88",
                    boxShadow: "0 0 8px rgba(0,255,136,0.08)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Dashboard decorative */}
            <div
              className="mt-8 p-4 rounded"
              style={{
                background: "rgba(0,255,136,0.03)",
                border: "1px solid rgba(0,255,136,0.1)",
              }}
            >
              <p
                className="font-mono-code text-xs mb-2"
                style={{ color: "rgba(0,255,136,0.4)" }}
              >
                SYSTEM_STATUS::
              </p>
              <div className="space-y-2">
                {[
                  { label: "Edge Processing", pct: 85 },
                  { label: "AI Integration", pct: 78 },
                  { label: "Autonomous Logic", pct: 72 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span
                      className="font-body text-xs flex-1"
                      style={{ color: "rgba(0,255,136,0.6)" }}
                    >
                      {item.label}
                    </span>
                    <div
                      className="flex-1 h-1 rounded-full overflow-hidden"
                      style={{ background: "rgba(0,255,136,0.1)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: isVisible ? `${item.pct}%` : "0%",
                          background:
                            "linear-gradient(90deg, #00ff88, rgba(0,255,136,0.5))",
                          boxShadow: "0 0 4px rgba(0,255,136,0.4)",
                          transitionDelay: "0.5s",
                        }}
                      />
                    </div>
                    <span
                      className="font-mono-code text-xs"
                      style={{ color: "rgba(0,255,136,0.5)" }}
                    >
                      {item.pct}%
                    </span>
                  </div>
                ))}
              </div>
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
