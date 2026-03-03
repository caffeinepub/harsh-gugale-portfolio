import { Link, useRouterState } from "@tanstack/react-router";
import { Cpu, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/", ocid: "nav.home_link" },
  { label: "About", href: "/#about", ocid: "nav.about_link" },
  { label: "Skills", href: "/#skills", ocid: "nav.skills_link" },
  { label: "Experience", href: "/#experience", ocid: "nav.experience_link" },
  { label: "Projects", href: "/#projects", ocid: "nav.projects_link" },
  { label: "Media", href: "/media", ocid: "nav.media_link" },
  { label: "Blog", href: "/blog", ocid: "nav.blog_link" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change – currentPath is the trigger
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional route-change trigger
  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  const handleAnchorClick = (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-glass" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            aria-label="Harsh Gugale Home"
          >
            <div
              className="w-8 h-8 rounded border flex items-center justify-center"
              style={{
                borderColor: "rgba(0,212,255,0.5)",
                boxShadow: "0 0 12px rgba(0,212,255,0.3)",
              }}
            >
              <Cpu className="w-4 h-4" style={{ color: "#00d4ff" }} />
            </div>
            <span
              className="font-display font-bold text-lg tracking-widest"
              style={{
                color: "#00d4ff",
                textShadow:
                  "0 0 10px rgba(0,212,255,0.6), 0 0 20px rgba(0,212,255,0.3)",
              }}
            >
              HG
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive =
                link.href === currentPath ||
                (link.href === "/" && currentPath === "/");
              if (link.href.startsWith("/#")) {
                return (
                  <button
                    type="button"
                    key={link.href}
                    data-ocid={link.ocid}
                    onClick={() => handleAnchorClick(link.href)}
                    className="text-sm font-body tracking-wider transition-all duration-200 relative group"
                    style={{
                      color: isActive ? "#00d4ff" : "rgba(232, 244, 248, 0.65)",
                    }}
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-px transition-all duration-300"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, #00d4ff, transparent)",
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      }}
                    />
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-px transition-all duration-300 group-hover:opacity-100 group-hover:scale-x-100"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)",
                        opacity: 0,
                        transform: "scaleX(0)",
                      }}
                    />
                  </button>
                );
              }
              return (
                <Link
                  key={link.href}
                  to={link.href as "/"}
                  data-ocid={link.ocid}
                  className="text-sm font-body tracking-wider transition-all duration-200 relative group"
                  style={{
                    color:
                      currentPath === link.href
                        ? "#00d4ff"
                        : "rgba(232, 244, 248, 0.65)",
                  }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-px transition-all duration-300"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, #00d4ff, transparent)",
                      opacity: currentPath === link.href ? 1 : 0,
                    }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Contact CTA */}
          <div className="hidden md:block">
            <button
              type="button"
              data-ocid="nav.contact_button"
              onClick={() => handleAnchorClick("/#contact")}
              className="glow-btn-cyan px-4 py-1.5 rounded text-sm font-body font-medium tracking-wider"
            >
              Contact
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            data-ocid="nav.mobile_menu_toggle"
            className="md:hidden p-2 rounded"
            style={{ color: "#00d4ff" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden border-t py-4 space-y-2"
            style={{
              borderColor: "rgba(0,212,255,0.1)",
              background: "rgba(6,11,24,0.97)",
              backdropFilter: "blur(20px)",
            }}
          >
            {navLinks.map((link) => {
              if (link.href.startsWith("/#")) {
                return (
                  <button
                    type="button"
                    key={link.href}
                    data-ocid={link.ocid}
                    onClick={() => handleAnchorClick(link.href)}
                    className="block w-full text-left px-4 py-2.5 text-sm font-body tracking-wider"
                    style={{ color: "rgba(232,244,248,0.8)" }}
                  >
                    {link.label}
                  </button>
                );
              }
              return (
                <Link
                  key={link.href}
                  to={link.href as "/"}
                  data-ocid={link.ocid}
                  className="block px-4 py-2.5 text-sm font-body tracking-wider"
                  style={{ color: "rgba(232,244,248,0.8)" }}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="px-4 pt-2">
              <button
                type="button"
                data-ocid="nav.contact_button"
                onClick={() => handleAnchorClick("/#contact")}
                className="glow-btn-cyan w-full py-2 rounded text-sm font-body font-medium tracking-wider"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
