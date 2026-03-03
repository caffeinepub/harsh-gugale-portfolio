import { Link } from "@tanstack/react-router";
import { Cpu, Heart } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t py-10"
      style={{
        borderColor: "rgba(0,212,255,0.08)",
        background: "rgba(6,11,24,0.8)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded border flex items-center justify-center"
              style={{
                borderColor: "rgba(0,212,255,0.3)",
                boxShadow: "0 0 8px rgba(0,212,255,0.2)",
              }}
            >
              <Cpu className="w-3.5 h-3.5" style={{ color: "#00d4ff" }} />
            </div>
            <span
              className="font-display font-bold tracking-widest text-sm"
              style={{ color: "#00d4ff" }}
            >
              HG
            </span>
            <span
              className="font-mono text-xs ml-2"
              style={{ color: "rgba(232,244,248,0.35)" }}
            >
              &#47;&#47; HARSH GUGALE
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/harshgugale"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:scale-110"
              style={{ color: "rgba(232,244,248,0.5)" }}
              aria-label="GitHub"
            >
              <SiGithub className="w-5 h-5 hover:text-[#00d4ff]" />
            </a>
            <a
              href="https://linkedin.com/in/harshgugale"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:scale-110"
              style={{ color: "rgba(232,244,248,0.5)" }}
              aria-label="LinkedIn"
            >
              <SiLinkedin className="w-5 h-5 hover:text-[#00d4ff]" />
            </a>
          </div>

          {/* Attribution */}
          <p
            className="text-xs font-body"
            style={{ color: "rgba(232,244,248,0.35)" }}
          >
            © {year}. Built with{" "}
            <Heart
              className="w-3 h-3 inline-block mx-0.5"
              style={{ color: "#00d4ff" }}
            />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: "rgba(0,212,255,0.6)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>

        {/* Bottom divider */}
        <div className="section-divider mt-8 opacity-30" />
        <div className="flex items-center justify-between mt-4">
          <p
            className="text-center text-xs font-mono-code"
            style={{ color: "rgba(232,244,248,0.2)" }}
          >
            SYS::PORTFOLIO_v1.0 | STATUS::ONLINE | UPTIME::∞
          </p>
          <Link
            to="/admin"
            data-ocid="footer.admin_link"
            className="text-xs font-mono-code transition-colors duration-200 hover:opacity-60"
            style={{ color: "rgba(232,244,248,0.15)" }}
          >
            admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
