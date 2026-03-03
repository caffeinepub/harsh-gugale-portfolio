import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const handleViewProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#060b18" }}
    >
      {/* Animated grid background */}
      <div className="hero-grid-bg" />
      <div className="hero-grid-overlay" />

      {/* Radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,255,0.06) 0%, rgba(123,47,255,0.04) 40%, transparent 70%)",
        }}
      />

      {/* Corner accent glows */}
      <div
        className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(0,212,255,0.07) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at bottom right, rgba(123,47,255,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Scan line */}
      <div className="scan-line" />

      {/* Floating particles */}
      <Particles />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-8 max-w-5xl mx-auto">
        {/* Status badge */}
        <div
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
          style={{
            background: "rgba(0,212,255,0.06)",
            border: "1px solid rgba(0,212,255,0.2)",
            boxShadow: "0 0 20px rgba(0,212,255,0.08)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full blink"
            style={{
              backgroundColor: "#00ff88",
              boxShadow: "0 0 6px #00ff88",
            }}
          />
          <span
            className="font-mono-code text-xs tracking-widest"
            style={{ color: "#00ff88" }}
          >
            SYS::ONLINE
          </span>
        </div>

        {/* Name */}
        <h1
          className="font-display font-bold tracking-tight leading-none mb-4"
          style={{
            fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
            color: "#e8f4f8",
            textShadow:
              "0 0 40px rgba(0,212,255,0.3), 0 0 80px rgba(0,212,255,0.1)",
          }}
        >
          HARSH{" "}
          <span
            style={{
              color: "#00d4ff",
              textShadow:
                "0 0 20px rgba(0,212,255,0.8), 0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(0,212,255,0.2)",
            }}
          >
            GUGALE
          </span>
        </h1>

        {/* Tagline */}
        <p
          className="font-body font-medium tracking-widest mb-6"
          style={{
            fontSize: "clamp(0.75rem, 2vw, 1rem)",
            color: "#00d4ff",
            letterSpacing: "0.2em",
            textShadow: "0 0 10px rgba(0,212,255,0.4)",
          }}
        >
          Embedded Systems&nbsp;|&nbsp;EV Electronics&nbsp;|&nbsp;AI-Integrated
          Hardware
        </p>

        {/* Divider line */}
        <div
          className="mx-auto mb-8 h-px"
          style={{
            width: "min(400px, 80%)",
            background:
              "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), rgba(123,47,255,0.3), transparent)",
          }}
        />

        {/* Intro paragraph */}
        <p
          className="font-body max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{
            fontSize: "clamp(0.875rem, 1.5vw, 1.05rem)",
            color: "rgba(232,244,248,0.7)",
          }}
        >
          Electronics and Telecommunication Engineer specializing in embedded
          systems, automotive electronics, and AI-powered hardware platforms.
          Focused on building intelligent, real-time, and autonomous electronic
          systems.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            data-ocid="hero.view_projects_button"
            onClick={handleViewProjects}
            className="glow-btn-cyan-filled px-8 py-3 rounded font-body font-medium tracking-widest text-sm"
          >
            VIEW PROJECTS
          </button>
          <button
            type="button"
            data-ocid="hero.contact_button"
            onClick={handleContact}
            className="glow-btn-purple px-8 py-3 rounded font-body font-medium tracking-widest text-sm"
          >
            CONTACT ME
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 group"
        aria-label="Scroll to about section"
      >
        <span
          className="font-mono-code text-xs tracking-widest"
          style={{ color: "rgba(0,212,255,0.4)" }}
        >
          SCROLL
        </span>
        <ChevronDown
          className="w-5 h-5 animate-bounce"
          style={{ color: "rgba(0,212,255,0.5)" }}
        />
      </button>
    </section>
  );
}

// CSS-only floating particles
function Particles() {
  const particles = [
    { size: 2, left: "8%", delay: "0s", duration: "12s", color: "#00d4ff" },
    { size: 3, left: "18%", delay: "2s", duration: "18s", color: "#7b2fff" },
    { size: 1.5, left: "27%", delay: "4s", duration: "15s", color: "#00d4ff" },
    { size: 2.5, left: "35%", delay: "1s", duration: "20s", color: "#00ff88" },
    { size: 2, left: "47%", delay: "6s", duration: "14s", color: "#00d4ff" },
    { size: 3, left: "56%", delay: "3s", duration: "17s", color: "#7b2fff" },
    { size: 1.5, left: "65%", delay: "7s", duration: "16s", color: "#00d4ff" },
    { size: 2, left: "74%", delay: "2.5s", duration: "22s", color: "#00ff88" },
    { size: 2.5, left: "83%", delay: "5s", duration: "13s", color: "#00d4ff" },
    { size: 1.5, left: "92%", delay: "8s", duration: "19s", color: "#7b2fff" },
  ];

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.left}
          className="particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.left,
            bottom: 0,
            animationDelay: p.delay,
            animationDuration: p.duration,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            opacity: 0,
          }}
        />
      ))}
    </>
  );
}
