import { Calendar, MapPin } from "lucide-react";
import { useEffect } from "react";
import {
  useGetAllExperiences,
  useInitializeData,
} from "../../hooks/useQueries";

const FALLBACK_EXPERIENCES = [
  {
    id: BigInt(1),
    title: "Embedded Systems Intern",
    company: "EV Manufacturing Company",
    badge: "EV",
    date: "2024",
    accentColor: "#00d4ff",
    description:
      "Worked on digital instrument cluster systems, CAN communication, firmware validation, sensor interfacing, and EV electrical architecture. Gained hands-on experience with real automotive hardware and embedded diagnostics.",
    tags: [
      "CAN Protocol",
      "Firmware",
      "STM32",
      "Sensors",
      "Instrument Cluster",
    ],
  },
  {
    id: BigInt(2),
    title: "Research & Development Intern",
    company: "DRDO – Defense R&D",
    badge: "DEF",
    date: "2023",
    accentColor: "#a855f7",
    description:
      "Developed Velocity of Detonation measuring system using oscillographic techniques and high-speed signal conditioning circuits. Worked with precision measurement instruments and defense-grade electronics.",
    tags: [
      "Signal Processing",
      "Oscilloscope",
      "Defense",
      "Electronics",
      "VOD System",
    ],
  },
];

function getCardStyle(accentColor: string) {
  if (accentColor === "#00d4ff") {
    return {
      cardClass: "glass-card",
      nodeColor: "#00d4ff",
      nodePulse: "node-pulse-cyan",
      tagColor: "rgba(0,212,255,0.12)",
      tagBorder: "rgba(0,212,255,0.25)",
      tagText: "#00d4ff",
    };
  }
  // purple fallback
  return {
    cardClass: "glass-card-purple",
    nodeColor: "#7b2fff",
    nodePulse: "node-pulse-purple",
    tagColor: "rgba(123,47,255,0.12)",
    tagBorder: "rgba(123,47,255,0.25)",
    tagText: "#a855f7",
  };
}

export default function ExperienceSection() {
  const { data: dynamicExperiences } = useGetAllExperiences();
  const { mutate: initData } = useInitializeData();

  // biome-ignore lint/correctness/useExhaustiveDependencies: fire-and-forget initialization on mount
  useEffect(() => {
    try {
      initData();
    } catch {
      // fire-and-forget
    }
  }, []);

  const experiences =
    dynamicExperiences && dynamicExperiences.length > 0
      ? dynamicExperiences
      : FALLBACK_EXPERIENCES;

  return (
    <section
      id="experience"
      data-ocid="experience.section"
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
      style={{ backgroundColor: "#060b18" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <div className="mb-16">
          <span className="section-label">SECTION_04</span>
          <h2
            className="font-display font-bold mt-2"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "#e8f4f8",
            }}
          >
            <span style={{ color: "rgba(0,212,255,0.5)" }}>&#47;&#47; </span>
            MISSION_LOG
            <span
              style={{
                color: "#00d4ff",
                textShadow: "0 0 20px rgba(0,212,255,0.5)",
              }}
            >
              .EXE
            </span>
          </h2>
          <p
            className="font-mono-code text-xs mt-2"
            style={{ color: "rgba(0,212,255,0.35)" }}
          >
            DEPLOYMENT HISTORY :: {experiences.length} ENTRIES FOUND
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical neon line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px timeline-line hidden md:block" />

          <div className="space-y-16">
            {experiences.map((exp, idx) => {
              const style = getCardStyle(exp.accentColor);
              return (
                <div
                  key={exp.id.toString()}
                  data-ocid={`experience.item.${idx + 1}`}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    idx % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Card (alternating) */}
                  <div className="flex-1">
                    <div
                      className={`${style.cardClass} rounded-lg p-6 relative overflow-hidden`}
                      style={{
                        maxWidth: "440px",
                        marginLeft: idx % 2 === 0 ? "auto" : "0",
                        marginRight: idx % 2 === 1 ? "auto" : "0",
                      }}
                    >
                      {/* Top accent */}
                      <div
                        className="absolute top-0 left-0 right-0 h-0.5"
                        style={{
                          background: `linear-gradient(90deg, ${exp.accentColor}, transparent)`,
                        }}
                      />

                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="font-mono-code text-xs px-2 py-0.5 rounded"
                              style={{
                                background: `${style.nodeColor}20`,
                                border: `1px solid ${style.nodeColor}40`,
                                color: exp.accentColor,
                              }}
                            >
                              {exp.badge}
                            </span>
                            <div className="flex items-center gap-1">
                              <Calendar
                                className="w-3 h-3"
                                style={{ color: "rgba(232,244,248,0.3)" }}
                              />
                              <span
                                className="font-mono-code text-xs"
                                style={{ color: "rgba(232,244,248,0.4)" }}
                              >
                                {exp.date}
                              </span>
                            </div>
                          </div>
                          <h3
                            className="font-display font-bold text-base"
                            style={{ color: "#e8f4f8" }}
                          >
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin
                              className="w-3 h-3"
                              style={{ color: exp.accentColor }}
                            />
                            <span
                              className="font-body text-xs"
                              style={{ color: exp.accentColor }}
                            >
                              {exp.company}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p
                        className="font-body text-sm leading-relaxed mb-4"
                        style={{ color: "rgba(232,244,248,0.68)" }}
                      >
                        {exp.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono-code text-xs px-2 py-1 rounded"
                            style={{
                              background: style.tagColor,
                              border: `1px solid ${style.tagBorder}`,
                              color: style.tagText,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="hidden md:flex items-start justify-center pt-6 relative z-10 w-8 flex-shrink-0">
                    <div
                      className={`w-4 h-4 rounded-full ${style.nodePulse}`}
                      style={{
                        backgroundColor: style.nodeColor,
                        border: `2px solid ${style.nodeColor}`,
                      }}
                    />
                  </div>

                  {/* Date label (alternate side) */}
                  <div className="hidden md:flex flex-1 items-start pt-6">
                    <div className={idx % 2 === 0 ? "pl-4" : "pr-4 ml-auto"}>
                      <span
                        className="font-mono-code text-sm font-bold"
                        style={{ color: exp.accentColor }}
                      >
                        {exp.date}
                      </span>
                      <p
                        className="font-body text-xs mt-1"
                        style={{ color: "rgba(232,244,248,0.3)" }}
                      >
                        DEPLOYMENT
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
