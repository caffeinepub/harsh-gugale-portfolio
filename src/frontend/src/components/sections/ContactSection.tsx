import {
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Loader2,
  Mail,
  Send,
} from "lucide-react";
import { useState } from "react";
import { SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import { useGetResumeContent, useSubmitContact } from "../../hooks/useQueries";
import { trackContactSubmit } from "../../utils/analytics";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const {
    mutate: submitContact,
    isPending,
    isSuccess,
    isError,
    reset: resetMutation,
  } = useSubmitContact();
  const { data: resumeContent } = useGetResumeContent();

  const email = resumeContent?.email || "harsh.gugale@example.com";
  const linkedin = resumeContent?.linkedin || "linkedin.com/in/harshgugale";
  const github = resumeContent?.github || "github.com/harshgugale";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    trackContactSubmit();
    submitContact({
      name: form.name,
      email: form.email,
      message: form.message,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
      style={{ backgroundColor: "#060b18" }}
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="mb-16">
          <span className="section-label">SECTION_06</span>
          <h2
            className="font-display font-bold mt-2"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "#e8f4f8",
            }}
          >
            <span style={{ color: "rgba(0,212,255,0.5)" }}>&#47;&#47; </span>
            ESTABLISH_LINK
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Contact info */}
          <div className="glass-card rounded-lg p-8 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{
                background:
                  "linear-gradient(90deg, #00d4ff, rgba(123,47,255,0.5), transparent)",
              }}
            />

            <div className="mb-8">
              <p
                className="font-mono-code text-xs mb-2"
                style={{ color: "rgba(0,212,255,0.4)" }}
              >
                COMM_CHANNELS::
              </p>
              <h3
                className="font-display font-bold text-xl"
                style={{ color: "#e8f4f8" }}
              >
                Get In Touch
              </h3>
              <p
                className="font-body text-sm mt-2"
                style={{ color: "rgba(232,244,248,0.55)" }}
              >
                Open to Embedded Systems, Edge AI, and Product Development
                Opportunities. Let's build intelligent systems together.
              </p>
            </div>

            <div className="space-y-5">
              <ContactLink
                icon={<Mail className="w-4 h-4" />}
                label="EMAIL"
                value={email}
                href={`mailto:${email}`}
                color="#00d4ff"
              />
              <ContactLink
                icon={<SiLinkedin className="w-4 h-4" />}
                label="LINKEDIN"
                value={linkedin}
                href={
                  linkedin.startsWith("http") ? linkedin : `https://${linkedin}`
                }
                color="#a855f7"
              />
              <ContactLink
                icon={<SiGithub className="w-4 h-4" />}
                label="GITHUB"
                value={github}
                href={github.startsWith("http") ? github : `https://${github}`}
                color="#00ff88"
              />
              <ContactLink
                icon={<SiInstagram className="w-4 h-4" />}
                label="INSTAGRAM"
                value="instagram.com/harshgugale"
                href="https://instagram.com/harshgugale"
                color="#a855f7"
              />
            </div>

            {/* Status indicator */}
            <div
              className="mt-8 p-4 rounded"
              style={{
                background: "rgba(0,255,136,0.04)",
                border: "1px solid rgba(0,255,136,0.15)",
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full blink"
                  style={{
                    backgroundColor: "#00ff88",
                    boxShadow: "0 0 6px #00ff88",
                  }}
                />
                <span
                  className="font-mono-code text-xs"
                  style={{ color: "#00ff88" }}
                >
                  STATUS::AVAILABLE_FOR_OPPORTUNITIES
                </span>
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="glass-card rounded-lg p-8 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{
                background:
                  "linear-gradient(90deg, #7b2fff, rgba(0,212,255,0.5), transparent)",
              }}
            />

            {isSuccess ? (
              <div
                data-ocid="contact.success_state"
                className="flex flex-col items-center justify-center h-full py-12 text-center"
              >
                <CheckCircle
                  className="w-12 h-12 mb-4"
                  style={{ color: "#00ff88" }}
                />
                <h3
                  className="font-display font-bold text-lg mb-2"
                  style={{ color: "#00ff88" }}
                >
                  TRANSMISSION RECEIVED
                </h3>
                <p
                  className="font-body text-sm"
                  style={{ color: "rgba(232,244,248,0.6)" }}
                >
                  Message logged. I'll respond within 24–48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm({ name: "", email: "", message: "" });
                    resetMutation();
                  }}
                  className="mt-6 glow-btn-cyan px-6 py-2 rounded font-body text-sm"
                >
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="font-mono-code text-xs block mb-2"
                    style={{ color: "rgba(0,212,255,0.5)" }}
                  >
                    NAME::
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    data-ocid="contact.name_input"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    autoComplete="name"
                    className="w-full px-4 py-3 rounded font-body text-sm outline-none transition-all duration-200"
                    style={{
                      background: "rgba(0,212,255,0.04)",
                      border: "1px solid rgba(0,212,255,0.2)",
                      color: "#e8f4f8",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(0,212,255,0.5)";
                      e.target.style.boxShadow = "0 0 15px rgba(0,212,255,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(0,212,255,0.2)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="font-mono-code text-xs block mb-2"
                    style={{ color: "rgba(0,212,255,0.5)" }}
                  >
                    EMAIL::
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    data-ocid="contact.email_input"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                    className="w-full px-4 py-3 rounded font-body text-sm outline-none transition-all duration-200"
                    style={{
                      background: "rgba(0,212,255,0.04)",
                      border: "1px solid rgba(0,212,255,0.2)",
                      color: "#e8f4f8",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(0,212,255,0.5)";
                      e.target.style.boxShadow = "0 0 15px rgba(0,212,255,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(0,212,255,0.2)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="font-mono-code text-xs block mb-2"
                    style={{ color: "rgba(0,212,255,0.5)" }}
                  >
                    MESSAGE::
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    data-ocid="contact.message_textarea"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded font-body text-sm outline-none transition-all duration-200 resize-none"
                    style={{
                      background: "rgba(0,212,255,0.04)",
                      border: "1px solid rgba(0,212,255,0.2)",
                      color: "#e8f4f8",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(0,212,255,0.5)";
                      e.target.style.boxShadow = "0 0 15px rgba(0,212,255,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(0,212,255,0.2)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {isError && (
                  <div
                    data-ocid="contact.error_state"
                    className="flex items-center gap-2 p-3 rounded"
                    style={{
                      background: "rgba(255,80,80,0.08)",
                      border: "1px solid rgba(255,80,80,0.25)",
                    }}
                  >
                    <AlertCircle
                      className="w-4 h-4"
                      style={{ color: "#ff5050" }}
                    />
                    <span
                      className="font-body text-xs"
                      style={{ color: "#ff5050" }}
                    >
                      TRANSMISSION_FAILED — Please try again.
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={isPending}
                  className="w-full py-3 rounded font-body font-medium tracking-widest text-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed glow-btn-cyan-filled"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      TRANSMITTING...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      TRANSMIT MESSAGE
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLink({
  icon,
  label,
  value,
  href,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  color: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 group transition-all duration-200 p-3 rounded"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${color}30`;
        e.currentTarget.style.background = `${color}08`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
      }}
    >
      <div
        className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
        style={{
          background: `${color}12`,
          border: `1px solid ${color}30`,
          color: color,
          boxShadow: `0 0 10px ${color}15`,
        }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p
          className="font-mono-code text-xs"
          style={{ color: "rgba(232,244,248,0.35)" }}
        >
          {label}
        </p>
        <p
          className="font-body text-sm truncate"
          style={{ color: "rgba(232,244,248,0.8)" }}
        >
          {value}
        </p>
      </div>
      <ExternalLink
        className="w-4 h-4 ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: color }}
      />
    </a>
  );
}
