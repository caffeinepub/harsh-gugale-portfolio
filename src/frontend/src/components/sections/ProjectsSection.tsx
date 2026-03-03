import { Cpu, ExternalLink, Github, Loader2 } from "lucide-react";
import type { Project } from "../../backend.d";
import { useGetAllProjects } from "../../hooks/useQueries";
import { trackProjectClick } from "../../utils/analytics";

const fallbackProjects: Project[] = [
  {
    id: BigInt(1),
    title: "Smart Lock System",
    description:
      "Designed a Bluetooth-controlled access system solving keyless entry for homes. Role: System Architecture & Firmware. Outcome: Reduced unauthorized access risk with real-time mobile control.",
    category: "IoT Security",
    techStack: ["Bluetooth", "Servo Motor", "Arduino", "Mobile App"],
    githubUrl: "",
    demoUrl: "",
  },
  {
    id: BigInt(2),
    title: "Home Automation using ESP32",
    description:
      "Built an IoT platform to automate and remotely control home appliances via mobile and voice. Role: IoT Architecture, Firmware & Cloud Integration. Outcome: 40% faster appliance control response time.",
    category: "IoT Systems",
    techStack: ["ESP32", "WiFi", "MQTT", "Relay", "Node-RED"],
    githubUrl: "",
    demoUrl: "",
  },
  {
    id: BigInt(3),
    title: "Autonomous Landmine Detection Rover",
    description:
      "Engineered an autonomous rover for hazardous terrain landmine detection using metal sensors and obstacle avoidance. Role: Embedded System Design & Autonomous Logic. Outcome: Demonstrated safe autonomous navigation in test environment.",
    category: "Autonomous Systems",
    techStack: ["Arduino", "Metal Detector", "RF", "Servo", "Ultrasonic"],
    githubUrl: "",
    demoUrl: "",
  },
  {
    id: BigInt(4),
    title: "Edge AI Traffic Violation Detection",
    description:
      "Deployed a real-time computer vision system on embedded hardware for traffic rule enforcement. Role: AI Model Integration & Edge Deployment. Outcome: 87% detection accuracy at 15fps on Raspberry Pi.",
    category: "Edge AI",
    techStack: ["Raspberry Pi", "TensorFlow Lite", "OpenCV", "Python"],
    githubUrl: "",
    demoUrl: "",
  },
  {
    id: BigInt(5),
    title: "AI-Integrated Robotic Arm",
    description:
      "Developed a 6-DOF arm with gesture recognition and vision-guided object manipulation. Role: AI Integration, Servo Control & Computer Vision. Outcome: Achieved pick-and-place with 92% positional accuracy.",
    category: "Robotics",
    techStack: ["STM32", "Python", "OpenCV", "Servo", "ML"],
    githubUrl: "",
    demoUrl: "",
  },
];

const categoryColors: Record<
  string,
  { color: string; bg: string; border: string }
> = {
  "IoT Security": {
    color: "#00d4ff",
    bg: "rgba(0,212,255,0.08)",
    border: "rgba(0,212,255,0.25)",
  },
  "IoT Systems": {
    color: "#00d4ff",
    bg: "rgba(0,212,255,0.08)",
    border: "rgba(0,212,255,0.25)",
  },
  "Autonomous Systems": {
    color: "#a855f7",
    bg: "rgba(168,85,247,0.08)",
    border: "rgba(168,85,247,0.25)",
  },
  "Edge AI": {
    color: "#00ff88",
    bg: "rgba(0,255,136,0.08)",
    border: "rgba(0,255,136,0.25)",
  },
  Robotics: {
    color: "#a855f7",
    bg: "rgba(168,85,247,0.08)",
    border: "rgba(168,85,247,0.25)",
  },
};

export default function ProjectsSection() {
  const { data: backendProjects, isLoading } = useGetAllProjects();
  const projects =
    backendProjects && backendProjects.length > 0
      ? backendProjects
      : fallbackProjects;

  return (
    <section
      id="projects"
      data-ocid="projects.section"
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
      style={{ backgroundColor: "#060b18" }}
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at bottom right, rgba(0,212,255,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="mb-16">
          <span className="section-label">SECTION_05</span>
          <h2
            className="font-display font-bold mt-2"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "#e8f4f8",
            }}
          >
            <span style={{ color: "rgba(0,212,255,0.5)" }}>&#47;&#47; </span>
            PROJECT_MODULES
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

        {/* Loading state */}
        {isLoading && (
          <div
            data-ocid="projects.loading_state"
            className="flex items-center justify-center py-20 gap-3"
          >
            <Loader2
              className="w-6 h-6 animate-spin"
              style={{ color: "#00d4ff" }}
            />
            <span
              className="font-mono-code text-sm"
              style={{ color: "rgba(0,212,255,0.5)" }}
            >
              LOADING_MODULES...
            </span>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && projects.length === 0 && (
          <div
            data-ocid="projects.empty_state"
            className="text-center py-20 glass-card rounded-lg"
          >
            <Cpu
              className="w-12 h-12 mx-auto mb-4"
              style={{ color: "rgba(0,212,255,0.3)" }}
            />
            <p
              className="font-mono-code text-sm"
              style={{ color: "rgba(0,212,255,0.4)" }}
            >
              NO_MODULES_FOUND
            </p>
          </div>
        )}

        {/* Projects grid */}
        {!isLoading && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((project, idx) => (
              <ProjectCard
                key={project.id.toString()}
                project={project}
                index={idx + 1}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const catStyle = categoryColors[project.category] ?? {
    color: "#00d4ff",
    bg: "rgba(0,212,255,0.08)",
    border: "rgba(0,212,255,0.25)",
  };

  return (
    <article
      data-ocid={`projects.item.${index}`}
      className="project-card glass-card rounded-lg overflow-hidden flex flex-col"
    >
      {/* Module header bar */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{
          background: `${catStyle.bg}`,
          borderBottom: `1px solid ${catStyle.border}`,
        }}
      >
        <span
          className="font-mono-code text-xs"
          style={{ color: catStyle.color }}
        >
          {project.category.toUpperCase()}
        </span>
        <span
          className="font-mono-code text-xs"
          style={{ color: "rgba(232,244,248,0.25)" }}
        >
          MOD_{String(index).padStart(2, "0")}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-display font-bold text-base mb-3 leading-tight"
          style={{ color: "#e8f4f8" }}
        >
          {project.title}
        </h3>

        <p
          className="font-body text-sm leading-relaxed mb-4 flex-1"
          style={{ color: "rgba(232,244,248,0.65)" }}
        >
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono-code text-xs px-2 py-0.5 rounded"
              style={{
                background: `${catStyle.bg}`,
                border: `1px solid ${catStyle.border}`,
                color: catStyle.color,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 flex-wrap">
          {project.githubUrl && project.githubUrl !== "" ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`projects.github_link.${index}`}
              className="flex-1 py-2 rounded font-body text-xs font-medium tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5"
              style={{
                background: catStyle.bg,
                border: `1px solid ${catStyle.border}`,
                color: catStyle.color,
                boxShadow: `0 0 10px ${catStyle.color}15`,
              }}
              aria-label={`GitHub repository for ${project.title}`}
              onClick={() => trackProjectClick(project.title, "github")}
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
          ) : null}
          {project.demoUrl && project.demoUrl !== "" ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`projects.demo_link.${index}`}
              className="flex-1 py-2 rounded font-body text-xs font-medium tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5"
              style={{
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.25)",
                color: "#00d4ff",
                boxShadow: "0 0 10px rgba(0,212,255,0.15)",
              }}
              aria-label={`Live demo for ${project.title}`}
              onClick={() => trackProjectClick(project.title, "demo")}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          ) : null}
          {(!project.githubUrl || project.githubUrl === "") &&
            (!project.demoUrl || project.demoUrl === "") && (
              <button
                type="button"
                data-ocid={`projects.view_details_button.${index}`}
                className="w-full py-2 rounded font-body text-sm font-medium tracking-wider transition-all duration-300"
                style={{
                  background: catStyle.bg,
                  border: `1px solid ${catStyle.border}`,
                  color: catStyle.color,
                  boxShadow: `0 0 10px ${catStyle.color}15`,
                }}
                onClick={() => trackProjectClick(project.title, "view_details")}
              >
                VIEW DETAILS
              </button>
            )}
        </div>
      </div>
    </article>
  );
}
