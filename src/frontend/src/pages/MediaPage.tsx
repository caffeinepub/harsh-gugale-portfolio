import { Camera, Film, Play, Wind } from "lucide-react";
import { useState } from "react";

type Category =
  | "All"
  | "Travel Photography"
  | "Cinematic Reels"
  | "Drone Shots"
  | "Short Vlogs";

const mediaItems = [
  {
    id: 1,
    title: "Ladakh Valley at Dusk",
    category: "Travel Photography" as Category,
    caption: "Golden hour over the Indus River Valley",
    gradient:
      "linear-gradient(135deg, #0a1128 0%, #1a3a6e 50%, #00d4ff22 100%)",
    aspectRatio: "tall",
    icon: Camera,
  },
  {
    id: 2,
    title: "Circuit Board Timelapse",
    category: "Cinematic Reels" as Category,
    caption: "Assembly line of tomorrow's technology",
    gradient:
      "linear-gradient(135deg, #0d0d1a 0%, #1a0d2e 50%, #7b2fff33 100%)",
    aspectRatio: "wide",
    icon: Film,
  },
  {
    id: 3,
    title: "Coastal Aerial 4K",
    category: "Drone Shots" as Category,
    caption: "Konkan coastline from 400m altitude",
    gradient:
      "linear-gradient(135deg, #060b18 0%, #0d2b45 50%, #00d4ff1a 100%)",
    aspectRatio: "square",
    icon: Wind,
  },
  {
    id: 4,
    title: "Engineering Lab Vlog",
    category: "Short Vlogs" as Category,
    caption: "Behind the scenes: firmware debugging day",
    gradient:
      "linear-gradient(135deg, #0a0e1a 0%, #1f1a3a 50%, #a855f733 100%)",
    aspectRatio: "square",
    icon: Play,
  },
  {
    id: 5,
    title: "Himachal Snowfields",
    category: "Travel Photography" as Category,
    caption: "Rohtang Pass in early winter",
    gradient:
      "linear-gradient(135deg, #060c1e 0%, #0d1e3a 50%, #00d4ff2a 100%)",
    aspectRatio: "wide",
    icon: Camera,
  },
  {
    id: 6,
    title: "Mumbai Hyperlapses",
    category: "Cinematic Reels" as Category,
    caption: "City that never sleeps, from above",
    gradient:
      "linear-gradient(135deg, #1a0d0d 0%, #2e1a0a 50%, #ff880033 100%)",
    aspectRatio: "tall",
    icon: Film,
  },
  {
    id: 7,
    title: "Tech Campus Flyover",
    category: "Drone Shots" as Category,
    caption: "Aerial survey of innovation district",
    gradient:
      "linear-gradient(135deg, #060b18 0%, #152838 50%, #00ff8822 100%)",
    aspectRatio: "square",
    icon: Wind,
  },
  {
    id: 8,
    title: "EV Expo 2024",
    category: "Short Vlogs" as Category,
    caption: "Exploring the future of mobility",
    gradient:
      "linear-gradient(135deg, #0a1428 0%, #1a2a40 50%, #00d4ff1a 100%)",
    aspectRatio: "square",
    icon: Play,
  },
  {
    id: 9,
    title: "Rajasthan Desert Dawn",
    category: "Travel Photography" as Category,
    caption: "First light over the Thar Desert",
    gradient:
      "linear-gradient(135deg, #1a1005 0%, #3d2a10 50%, #ffaa0033 100%)",
    aspectRatio: "tall",
    icon: Camera,
  },
  {
    id: 10,
    title: "PCB Manufacturing Reel",
    category: "Cinematic Reels" as Category,
    caption: "Where circuits come to life",
    gradient:
      "linear-gradient(135deg, #050d15 0%, #102030 50%, #00d4ff2a 100%)",
    aspectRatio: "wide",
    icon: Film,
  },
  {
    id: 11,
    title: "Western Ghats From Above",
    category: "Drone Shots" as Category,
    caption: "Biodiversity hotspot at monsoon peak",
    gradient:
      "linear-gradient(135deg, #051505 0%, #0d2b1a 50%, #00ff8822 100%)",
    aspectRatio: "square",
    icon: Wind,
  },
  {
    id: 12,
    title: "Lab to Launch Vlog",
    category: "Short Vlogs" as Category,
    caption: "First field deployment of the rover project",
    gradient:
      "linear-gradient(135deg, #0a0a1e 0%, #1a1a3a 50%, #7b2fff22 100%)",
    aspectRatio: "square",
    icon: Play,
  },
];

const categories: Category[] = [
  "All",
  "Travel Photography",
  "Cinematic Reels",
  "Drone Shots",
  "Short Vlogs",
];

const categoryConfig: Record<
  string,
  { color: string; bg: string; border: string; ocid: string }
> = {
  All: {
    color: "#00d4ff",
    bg: "rgba(0,212,255,0.1)",
    border: "rgba(0,212,255,0.3)",
    ocid: "media.all_tab",
  },
  "Travel Photography": {
    color: "#a855f7",
    bg: "rgba(168,85,247,0.1)",
    border: "rgba(168,85,247,0.3)",
    ocid: "media.travel_tab",
  },
  "Cinematic Reels": {
    color: "#00d4ff",
    bg: "rgba(0,212,255,0.1)",
    border: "rgba(0,212,255,0.3)",
    ocid: "media.reels_tab",
  },
  "Drone Shots": {
    color: "#00ff88",
    bg: "rgba(0,255,136,0.1)",
    border: "rgba(0,255,136,0.3)",
    ocid: "media.drone_tab",
  },
  "Short Vlogs": {
    color: "#ff8800",
    bg: "rgba(255,136,0,0.1)",
    border: "rgba(255,136,0,0.3)",
    ocid: "media.vlogs_tab",
  },
};

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? mediaItems
      : mediaItems.filter((item) => item.category === activeCategory);

  return (
    <div
      data-ocid="media.page"
      className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#060b18" }}
    >
      {/* Background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(123,47,255,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 pt-8">
          <span className="section-label">ARCHIVE_01</span>
          <h1
            className="font-display font-bold mt-2"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#e8f4f8",
            }}
          >
            <span style={{ color: "rgba(123,47,255,0.6)" }}>&#47;&#47; </span>
            MEDIA{" "}
            <span
              style={{
                color: "#a855f7",
                textShadow:
                  "0 0 20px rgba(123,47,255,0.6), 0 0 40px rgba(123,47,255,0.3)",
              }}
            >
              VAULT
            </span>
          </h1>
          <p
            className="font-body text-sm mt-3 max-w-xl"
            style={{ color: "rgba(232,244,248,0.5)" }}
          >
            A curated archive of travels, engineering cinematics, drone
            perspectives, and vlogged adventures.
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const cfg = categoryConfig[cat];
            const isActive = activeCategory === cat;
            return (
              <button
                type="button"
                key={cat}
                data-ocid={cfg.ocid}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded font-body text-sm font-medium tracking-wide transition-all duration-200"
                style={{
                  background: isActive ? cfg.bg : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isActive ? cfg.border : "rgba(255,255,255,0.08)"}`,
                  color: isActive ? cfg.color : "rgba(232,244,248,0.5)",
                  boxShadow: isActive ? `0 0 15px ${cfg.color}20` : "none",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-0">
          {filtered.map((item) => {
            const Icon = item.icon;
            const catCfg = categoryConfig[item.category];
            const heights: Record<string, string> = {
              tall: "260px",
              wide: "180px",
              square: "220px",
            };

            return (
              <div
                key={item.id}
                data-ocid={`media.item.${item.id}`}
                className="media-card rounded-lg overflow-hidden mb-4 break-inside-avoid relative cursor-pointer"
                style={{ height: heights[item.aspectRatio] }}
              >
                {/* Background gradient */}
                <div
                  className="media-inner absolute inset-0"
                  style={{ background: item.gradient }}
                />

                {/* Grid texture overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />

                {/* Icon center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: `${catCfg.color}15`,
                      border: `1px solid ${catCfg.color}30`,
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: catCfg.color, opacity: 0.6 }}
                    />
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className="font-mono-code text-xs px-2 py-1 rounded"
                    style={{
                      background: `${catCfg.color}18`,
                      border: `1px solid ${catCfg.color}35`,
                      color: catCfg.color,
                    }}
                  >
                    {item.category.split(" ")[0].toUpperCase()}
                  </span>
                </div>

                {/* Glass overlay on hover */}
                <div
                  className="media-overlay absolute inset-0 flex flex-col justify-end p-4"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 30%, rgba(6,11,24,0.92) 100%)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <h3
                    className="font-display font-bold text-sm"
                    style={{ color: "#e8f4f8" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-body text-xs mt-1"
                    style={{ color: "rgba(232,244,248,0.6)" }}
                  >
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 glass-card rounded-lg">
            <p
              className="font-mono-code text-sm"
              style={{ color: "rgba(0,212,255,0.4)" }}
            >
              NO_ITEMS_IN_CATEGORY
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
