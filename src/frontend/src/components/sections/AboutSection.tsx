import { Activity, Cpu, Shield, Zap } from "lucide-react";
import { useGetProfileMeta, useGetResumeContent } from "../../hooks/useQueries";

export default function AboutSection() {
  const { data: profileMeta } = useGetProfileMeta();
  const { data: resumeContent } = useGetResumeContent();

  const hasProfileImage =
    profileMeta?.profileImageUrl && profileMeta.profileImageUrl !== "";

  return (
    <section
      id="about"
      data-ocid="about.section"
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
      style={{ backgroundColor: "#060b18" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-0 w-64 h-64 pointer-events-none -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="mb-16">
          <span className="section-label">SECTION_02</span>
          <h2
            className="font-display font-bold mt-2"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "#e8f4f8",
            }}
          >
            <span style={{ color: "rgba(0,212,255,0.5)" }}>&#47;&#47; </span>
            ABOUT
            <span
              style={{
                color: "#00d4ff",
                textShadow: "0 0 20px rgba(0,212,255,0.5)",
              }}
            >
              .SYS
            </span>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Profile stats card */}
          <div className="glass-card rounded-lg p-8 relative overflow-hidden">
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, #00d4ff, rgba(0,212,255,0.3), transparent)",
              }}
            />

            <div className="mb-6">
              {/* Avatar: show image if profileImageUrl is set, else show HG initials */}
              {hasProfileImage ? (
                <img
                  src={profileMeta!.profileImageUrl}
                  alt="Harsh Gugale"
                  className="w-20 h-20 rounded-full mb-6 object-cover"
                  style={{
                    border: "2px solid rgba(0,212,255,0.3)",
                    boxShadow: "0 0 20px rgba(0,212,255,0.15)",
                  }}
                />
              ) : (
                <div
                  className="w-20 h-20 rounded-full mb-6 flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(123,47,255,0.15))",
                    border: "2px solid rgba(0,212,255,0.3)",
                    boxShadow: "0 0 20px rgba(0,212,255,0.15)",
                  }}
                >
                  <span
                    className="font-display font-bold text-2xl"
                    style={{ color: "#00d4ff" }}
                  >
                    HG
                  </span>
                </div>
              )}

              <h3
                className="font-display font-bold text-xl mb-1"
                style={{ color: "#e8f4f8" }}
              >
                Harsh Gugale
              </h3>
              <p
                className="font-body text-sm"
                style={{ color: "rgba(0,212,255,0.7)" }}
              >
                Electronics & Telecommunication Engineer
              </p>
            </div>

            {/* Status rows */}
            <div className="space-y-4">
              <StatusRow
                icon={<Activity className="w-4 h-4" />}
                label="STATUS"
                value="Active"
                valueColor="#00ff88"
              />
              <StatusRow
                icon={<Cpu className="w-4 h-4" />}
                label="ROLE"
                value="Embedded Engineer"
                valueColor="#00d4ff"
              />
              <StatusRow
                icon={<Shield className="w-4 h-4" />}
                label="CLEARANCE"
                value="Defense R&D"
                valueColor="#a855f7"
              />
              <StatusRow
                icon={<Zap className="w-4 h-4" />}
                label="DOMAIN"
                value="EV · AI · Firmware"
                valueColor="#00d4ff"
              />
            </div>

            {/* Divider */}
            <div className="my-6 section-divider opacity-30" />

            {/* Key protocols */}
            <div>
              <p
                className="font-mono-code text-xs mb-3"
                style={{ color: "rgba(0,212,255,0.4)" }}
              >
                PROTOCOLS::ACTIVE
              </p>
              <div className="flex flex-wrap gap-2">
                {["CAN", "UART", "SPI", "I2C", "RTOS", "ARM"].map((p) => (
                  <span
                    key={p}
                    className="font-mono-code text-xs px-2 py-1 rounded"
                    style={{
                      background: "rgba(0,212,255,0.06)",
                      border: "1px solid rgba(0,212,255,0.2)",
                      color: "#00d4ff",
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Summary + objective */}
          <div className="space-y-6">
            {/* Terminal-style summary card */}
            <div
              className="rounded-lg p-6 relative overflow-hidden"
              style={{
                background: "rgba(10,17,40,0.8)",
                border: "1px solid rgba(0,212,255,0.1)",
              }}
            >
              {/* Terminal header */}
              <div
                className="flex items-center gap-2 mb-4 pb-3"
                style={{ borderBottom: "1px solid rgba(0,212,255,0.08)" }}
              >
                <div className="flex gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: "#ff5f57" }}
                  />
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: "#febc2e" }}
                  />
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: "#28c840" }}
                  />
                </div>
                <span
                  className="font-mono-code text-xs ml-2"
                  style={{ color: "rgba(0,212,255,0.4)" }}
                >
                  profile.sys
                </span>
              </div>

              <div className="space-y-4">
                {resumeContent?.about && resumeContent.about !== "" ? (
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "rgba(232,244,248,0.75)" }}
                  >
                    <span style={{ color: "#00d4ff" }}>{"> "}</span>
                    {resumeContent.about}
                  </p>
                ) : (
                  <>
                    <p
                      className="font-body text-sm leading-relaxed"
                      style={{ color: "rgba(232,244,248,0.75)" }}
                    >
                      <span style={{ color: "#00d4ff" }}>{"> "}</span>
                      Embedded Systems Intern at an EV manufacturing company —
                      hands-on with{" "}
                      <span style={{ color: "#00d4ff" }}>CAN Protocol</span>,
                      digital instrument cluster systems, firmware debugging,
                      and sensor interfacing within real automotive
                      environments.
                    </p>
                    <p
                      className="font-body text-sm leading-relaxed"
                      style={{ color: "rgba(232,244,248,0.75)" }}
                    >
                      <span style={{ color: "#a855f7" }}>{"> "}</span>
                      DRDO Intern — developed a{" "}
                      <span style={{ color: "#a855f7" }}>
                        Velocity of Detonation measuring system
                      </span>{" "}
                      using oscillographic techniques and high-speed signal
                      conditioning circuits for defense applications.
                    </p>
                    <p
                      className="font-body text-sm leading-relaxed"
                      style={{ color: "rgba(232,244,248,0.75)" }}
                    >
                      <span style={{ color: "#00ff88" }}>{"> "}</span>
                      Strong foundation in microcontrollers{" "}
                      <span style={{ color: "#00ff88" }}>
                        (STM32, ESP32, Arduino)
                      </span>
                      , communication protocols (UART, SPI, I2C, CAN), and
                      real-time firmware development.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Career objective card */}
            <div
              data-ocid="about.career_objective_card"
              className="rounded-lg p-6 relative overflow-hidden"
              style={{
                background: "rgba(0,212,255,0.03)",
                border: "1px solid rgba(0,212,255,0.25)",
                boxShadow:
                  "0 0 30px rgba(0,212,255,0.05), inset 0 0 30px rgba(0,212,255,0.02)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{
                  background:
                    "linear-gradient(90deg, #00d4ff, #7b2fff, transparent)",
                }}
              />
              <p
                className="font-mono-code text-xs mb-3"
                style={{ color: "rgba(0,212,255,0.5)" }}
              >
                OBJECTIVE::
              </p>
              <p
                className="font-body text-sm leading-relaxed italic"
                style={{ color: "rgba(232,244,248,0.85)" }}
              >
                {resumeContent?.careerObjective &&
                resumeContent.careerObjective !== "" ? (
                  `"${resumeContent.careerObjective}"`
                ) : (
                  <>
                    "To design intelligent embedded architectures that integrate
                    AI with real-time hardware systems for{" "}
                    <span style={{ color: "#00d4ff" }}>automotive</span> and{" "}
                    <span style={{ color: "#a855f7" }}>autonomous</span>{" "}
                    applications."
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusRow({
  icon,
  label,
  value,
  valueColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueColor: string;
}) {
  return (
    <div
      className="flex items-center justify-between py-2 px-0"
      style={{ borderBottom: "1px solid rgba(0,212,255,0.06)" }}
    >
      <div className="flex items-center gap-2">
        <span style={{ color: "rgba(0,212,255,0.5)" }}>{icon}</span>
        <span
          className="font-mono-code text-xs tracking-widest"
          style={{ color: "rgba(232,244,248,0.45)" }}
        >
          {label}
        </span>
      </div>
      <span
        className="font-body text-sm font-medium"
        style={{ color: valueColor }}
      >
        {value}
      </span>
    </div>
  );
}
