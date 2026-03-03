import {
  BookOpen,
  Calendar,
  ChevronRight,
  ExternalLink,
  Loader2,
  Paperclip,
  User,
} from "lucide-react";
import { useState } from "react";
import type { BlogPost } from "../backend.d";
import { useGetAllPosts, useGetFeaturedPost } from "../hooks/useQueries";
import { trackBlogClick } from "../utils/analytics";

type BlogCategory =
  | "All"
  | "Embedded Systems"
  | "AI & Edge Computing"
  | "Career & GATE Journey"
  | "Creative Projects"
  | "CAN Protocol";

// Fallback posts for when backend returns nothing
const fallbackPosts: BlogPost[] = [
  {
    id: BigInt(1),
    title: "Getting Started with CAN Protocol in Automotive Systems",
    summary:
      "A deep dive into Controller Area Network (CAN) protocol — how it works, why it's essential for automotive ECUs, and implementation on STM32.",
    content:
      "CAN Protocol is fundamental to automotive embedded systems. This post covers the basics and advanced usage patterns.",
    author: "Harsh Gugale",
    publishedAt:
      BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    isFeatured: true,
    category: "CAN Protocol",
    fileUrl: "",
  },
  {
    id: BigInt(2),
    title: "STM32 vs ESP32: Choosing the Right MCU for Your Project",
    summary:
      "A practical comparison of STM32 and ESP32 microcontrollers — performance, peripherals, power consumption, and ideal use cases for each platform.",
    content: "Comparing popular microcontrollers for embedded projects.",
    author: "Harsh Gugale",
    publishedAt:
      BigInt(Date.now() - 14 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    isFeatured: false,
    category: "Embedded Systems",
    fileUrl: "",
  },
  {
    id: BigInt(3),
    title: "Edge AI on Microcontrollers: TensorFlow Lite Micro Guide",
    summary:
      "How to run machine learning models on resource-constrained embedded hardware using TensorFlow Lite Micro, with practical examples on Raspberry Pi.",
    content:
      "Edge AI deployment on microcontrollers is transforming embedded systems.",
    author: "Harsh Gugale",
    publishedAt:
      BigInt(Date.now() - 21 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    isFeatured: false,
    category: "AI & Edge Computing",
    fileUrl: "",
  },
  {
    id: BigInt(4),
    title: "RTOS Fundamentals for Embedded Engineers",
    summary:
      "Understanding Real-Time Operating Systems (RTOS) — task scheduling, semaphores, mutexes, and when to use FreeRTOS in your embedded projects.",
    content: "RTOS concepts are essential for complex embedded applications.",
    author: "Harsh Gugale",
    publishedAt:
      BigInt(Date.now() - 28 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    isFeatured: false,
    category: "Embedded Systems",
    fileUrl: "",
  },
  {
    id: BigInt(5),
    title: "GATE ECE 2025: Signals & Systems Preparation Strategy",
    summary:
      "Complete preparation roadmap for GATE Electronics — focusing on Signals & Systems, weighted topics, important formulae, and past paper analysis.",
    content: "Comprehensive GATE preparation guidance for ECE students.",
    author: "Harsh Gugale",
    publishedAt:
      BigInt(Date.now() - 35 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    isFeatured: false,
    category: "Career & GATE Journey",
    fileUrl: "",
  },
  {
    id: BigInt(6),
    title: "Designing a CAN Bus Monitor with STM32 and Python",
    summary:
      "Step-by-step guide to building a CAN bus monitoring tool using STM32 as the hardware interface and Python for real-time data visualization.",
    content:
      "Building practical CAN bus monitoring tools for automotive diagnostics.",
    author: "Harsh Gugale",
    publishedAt:
      BigInt(Date.now() - 42 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    isFeatured: false,
    category: "CAN Protocol",
    fileUrl: "",
  },
];

const categories: BlogCategory[] = [
  "All",
  "Embedded Systems",
  "AI & Edge Computing",
  "Career & GATE Journey",
  "Creative Projects",
  "CAN Protocol",
];

const categoryConfig: Record<
  string,
  { color: string; bg: string; border: string; ocid: string }
> = {
  All: {
    color: "#00d4ff",
    bg: "rgba(0,212,255,0.1)",
    border: "rgba(0,212,255,0.3)",
    ocid: "blog.all_tab",
  },
  "Embedded Systems": {
    color: "#00d4ff",
    bg: "rgba(0,212,255,0.1)",
    border: "rgba(0,212,255,0.3)",
    ocid: "blog.embedded_tab",
  },
  "AI & Edge Computing": {
    color: "#00ff88",
    bg: "rgba(0,255,136,0.1)",
    border: "rgba(0,255,136,0.3)",
    ocid: "blog.ai_tab",
  },
  "Career & GATE Journey": {
    color: "#ff8800",
    bg: "rgba(255,136,0,0.1)",
    border: "rgba(255,136,0,0.3)",
    ocid: "blog.gate_tab",
  },
  "Creative Projects": {
    color: "#a855f7",
    bg: "rgba(168,85,247,0.1)",
    border: "rgba(168,85,247,0.3)",
    ocid: "blog.creative_tab",
  },
  "CAN Protocol": {
    color: "#a855f7",
    bg: "rgba(168,85,247,0.1)",
    border: "rgba(168,85,247,0.3)",
    ocid: "blog.can_tab",
  },
};

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");

  const { data: allPosts, isLoading: postsLoading } = useGetAllPosts();
  const { data: featuredPost, isLoading: featuredLoading } =
    useGetFeaturedPost();

  const isLoading = postsLoading || featuredLoading;

  const posts = allPosts && allPosts.length > 0 ? allPosts : fallbackPosts;

  const displayFeatured =
    featuredPost ?? fallbackPosts.find((p) => p.isFeatured) ?? fallbackPosts[0];

  const filtered =
    activeCategory === "All"
      ? posts.filter((p) => !p.isFeatured)
      : posts.filter((p) => p.category === activeCategory && !p.isFeatured);

  return (
    <div
      data-ocid="blog.page"
      className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#060b18" }}
    >
      {/* Background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 15%, rgba(0,212,255,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 pt-8">
          <span className="section-label">KNOWLEDGE_BASE</span>
          <h1
            className="font-display font-bold mt-2"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#e8f4f8",
            }}
          >
            <span style={{ color: "rgba(0,212,255,0.5)" }}>&#47;&#47; </span>
            ENGINEERING{" "}
            <span
              style={{
                color: "#00d4ff",
                textShadow:
                  "0 0 20px rgba(0,212,255,0.6), 0 0 40px rgba(0,212,255,0.3)",
              }}
            >
              TERMINAL
            </span>
          </h1>
          <p
            className="font-body text-sm mt-3 max-w-xl"
            style={{ color: "rgba(232,244,248,0.5)" }}
          >
            Technical articles on embedded systems, communication protocols, AI
            hardware integration, and examination strategy.
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div
            data-ocid="blog.loading_state"
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
              FETCHING_KNOWLEDGE_BASE...
            </span>
          </div>
        )}

        {!isLoading && (
          <>
            {/* Featured Article */}
            {displayFeatured && (
              <div
                data-ocid="blog.featured_card"
                className="mb-12 rounded-lg overflow-hidden relative"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(123,47,255,0.04) 50%, rgba(10,17,40,0.9) 100%)",
                  border: "1px solid rgba(0,212,255,0.25)",
                  boxShadow:
                    "0 0 40px rgba(0,212,255,0.06), inset 0 0 40px rgba(0,212,255,0.02)",
                }}
              >
                {/* Top gradient bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{
                    background:
                      "linear-gradient(90deg, #00d4ff, #7b2fff, #00ff88, transparent)",
                  }}
                />

                <div className="p-8 lg:p-12">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className="font-mono-code text-xs px-3 py-1 rounded"
                      style={{
                        background: "rgba(0,212,255,0.1)",
                        border: "1px solid rgba(0,212,255,0.3)",
                        color: "#00d4ff",
                        boxShadow: "0 0 10px rgba(0,212,255,0.15)",
                      }}
                    >
                      FEATURED
                    </span>
                    <span
                      className="font-mono-code text-xs px-2 py-1 rounded"
                      style={{
                        background: (
                          categoryConfig[displayFeatured.category] ??
                          categoryConfig.All
                        ).bg,
                        border: `1px solid ${(categoryConfig[displayFeatured.category] ?? categoryConfig.All).border}`,
                        color: (
                          categoryConfig[displayFeatured.category] ??
                          categoryConfig.All
                        ).color,
                      }}
                    >
                      {displayFeatured.category}
                    </span>
                  </div>

                  <h2
                    className="font-display font-bold mb-4"
                    style={{
                      fontSize: "clamp(1.25rem, 3vw, 2rem)",
                      color: "#e8f4f8",
                    }}
                  >
                    {displayFeatured.title}
                  </h2>

                  <p
                    className="font-body text-sm leading-relaxed mb-6 max-w-3xl"
                    style={{ color: "rgba(232,244,248,0.68)" }}
                  >
                    {displayFeatured.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2">
                      <User
                        className="w-3.5 h-3.5"
                        style={{ color: "rgba(0,212,255,0.5)" }}
                      />
                      <span
                        className="font-body text-xs"
                        style={{ color: "rgba(232,244,248,0.4)" }}
                      >
                        {displayFeatured.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar
                        className="w-3.5 h-3.5"
                        style={{ color: "rgba(0,212,255,0.5)" }}
                      />
                      <span
                        className="font-body text-xs"
                        style={{ color: "rgba(232,244,248,0.4)" }}
                      >
                        {formatDate(displayFeatured.publishedAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <button
                        type="button"
                        className="glow-btn-cyan px-5 py-2 rounded font-body text-sm font-medium flex items-center gap-2"
                        aria-label={`Read more about ${displayFeatured.title}`}
                        onClick={() =>
                          trackBlogClick(
                            displayFeatured.title,
                            displayFeatured.category,
                          )
                        }
                      >
                        READ MORE
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      {displayFeatured.fileUrl &&
                        displayFeatured.fileUrl !== "" && (
                          <a
                            href={displayFeatured.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-ocid="blog.featured_file_link_button"
                            className="px-4 py-2 rounded font-body text-sm font-medium flex items-center gap-2 transition-all duration-200"
                            style={{
                              background: "rgba(123,47,255,0.12)",
                              border: "1px solid rgba(123,47,255,0.4)",
                              color: "#a855f7",
                              boxShadow: "0 0 12px rgba(123,47,255,0.2)",
                            }}
                            aria-label={`View attached file for ${displayFeatured.title}`}
                          >
                            <Paperclip className="w-3.5 h-3.5" />
                            VIEW FILE
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Category filters */}
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

            {/* Article grid */}
            {filtered.length === 0 ? (
              <div
                data-ocid="blog.empty_state"
                className="text-center py-20 glass-card rounded-lg"
              >
                <BookOpen
                  className="w-12 h-12 mx-auto mb-4"
                  style={{ color: "rgba(0,212,255,0.3)" }}
                />
                <p
                  className="font-mono-code text-sm"
                  style={{ color: "rgba(0,212,255,0.4)" }}
                >
                  NO_ARTICLES_IN_CATEGORY
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.slice(0, 6).map((post, idx) => (
                  <BlogCard
                    key={post.id.toString()}
                    post={post}
                    index={idx + 1}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const catCfg = categoryConfig[post.category] ?? categoryConfig.All;

  return (
    <article
      data-ocid={`blog.item.${index}`}
      className="blog-card glass-card rounded-lg overflow-hidden flex flex-col"
    >
      {/* Color accent top */}
      <div
        className="h-0.5"
        style={{
          background: `linear-gradient(90deg, ${catCfg.color}, transparent)`,
        }}
      />

      <div className="p-6 flex flex-col flex-1">
        {/* Category badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="font-mono-code text-xs px-2 py-1 rounded"
            style={{
              background: catCfg.bg,
              border: `1px solid ${catCfg.border}`,
              color: catCfg.color,
            }}
          >
            {post.category}
          </span>
          <div className="flex items-center gap-1">
            <Calendar
              className="w-3 h-3"
              style={{ color: "rgba(232,244,248,0.3)" }}
            />
            <span
              className="font-mono-code text-xs"
              style={{ color: "rgba(232,244,248,0.3)" }}
            >
              {formatDate(post.publishedAt)}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold text-sm leading-snug mb-3"
          style={{ color: "#e8f4f8" }}
        >
          {post.title}
        </h3>

        {/* Summary */}
        <p
          className="font-body text-xs leading-relaxed flex-1 mb-4"
          style={{ color: "rgba(232,244,248,0.58)" }}
        >
          {post.summary}
        </p>

        {/* Author + Actions */}
        <div
          className="flex items-center justify-between pt-3 border-t flex-wrap gap-2"
          style={{ borderColor: "rgba(0,212,255,0.08)" }}
        >
          <div className="flex items-center gap-1.5">
            <User
              className="w-3 h-3"
              style={{ color: "rgba(0,212,255,0.4)" }}
            />
            <span
              className="font-body text-xs"
              style={{ color: "rgba(232,244,248,0.35)" }}
            >
              {post.author}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {post.fileUrl && post.fileUrl !== "" && (
              <a
                href={post.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid={`blog.file_link_button.${index}`}
                className="flex items-center gap-1 font-body text-xs font-medium px-2 py-1 rounded transition-all duration-200"
                style={{
                  background: "rgba(123,47,255,0.1)",
                  border: "1px solid rgba(123,47,255,0.3)",
                  color: "#a855f7",
                  boxShadow: "0 0 8px rgba(123,47,255,0.15)",
                }}
                aria-label={`Download or view file for ${post.title}`}
              >
                <Paperclip className="w-3 h-3" />
                FILE
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
            <button
              type="button"
              data-ocid={`blog.read_more_button.${index}`}
              className="flex items-center gap-1 font-body text-xs font-medium transition-colors duration-200"
              style={{ color: catCfg.color }}
              aria-label={`Read more about ${post.title}`}
              onClick={() => trackBlogClick(post.title, post.category)}
            >
              READ MORE
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
