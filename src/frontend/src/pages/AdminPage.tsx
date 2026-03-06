import {
  AlertCircle,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  EyeOff,
  Film,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  Pencil,
  Plus,
  Shield,
  Terminal,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type {
  BlogPost,
  Experience,
  MediaItem,
  Project,
  ResumeContent,
  Skill,
  SkillCategory,
} from "../backend.d";
import {
  useAddBlogPost,
  useAddExperience,
  useAddMediaItem,
  useAddProject,
  useChangeAdminPassword,
  useDeleteBlogPost,
  useDeleteExperience,
  useDeleteMediaItem,
  useDeleteProject,
  useGetAllContacts,
  useGetAllExperiences,
  useGetAllMediaItems,
  useGetAllPosts,
  useGetAllProjects,
  useGetAnalytics,
  useGetProfileMeta,
  useGetResumeContent,
  useGetSkillCategories,
  useInitializeData,
  useUpdateBlogPost,
  useUpdateExperience,
  useUpdateMediaItem,
  useUpdateProfileMeta,
  useUpdateProject,
  useUpdateResumeContent,
  useUpdateSkillCategory,
  useVerifyAdminPassword,
} from "../hooks/useQueries";

// ── Types ──────────────────────────────────────────────────────────────
type AdminTab =
  | "resume"
  | "blog"
  | "projects"
  | "analytics"
  | "experience"
  | "skills"
  | "profile"
  | "messages"
  | "media"
  | "security";
type BlogFormState = {
  id?: bigint;
  publishedAt?: bigint;
  title: string;
  category: string;
  summary: string;
  content: string;
  author: string;
  fileUrl: string;
  isFeatured: boolean;
};
type ProjectFormState = {
  id?: bigint;
  title: string;
  category: string;
  description: string;
  techStack: string;
  githubUrl: string;
  demoUrl: string;
};

const BLOG_CATEGORIES = [
  "Embedded Systems",
  "AI & Edge Computing",
  "RTOS & Firmware",
  "Career & GATE Journey",
  "Creative Projects",
  "CAN Protocol",
];

// ── Shared input styles ────────────────────────────────────────────────
const inputStyle = {
  background: "rgba(6,11,24,0.8)",
  border: "1px solid rgba(0,212,255,0.2)",
  color: "#e8f4f8",
  outline: "none",
};

const inputFocusHandler = (
  e: React.FocusEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
) => {
  e.currentTarget.style.borderColor = "rgba(0,212,255,0.6)";
  e.currentTarget.style.boxShadow = "0 0 12px rgba(0,212,255,0.15)";
};
const inputBlurHandler = (
  e: React.FocusEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
) => {
  e.currentTarget.style.borderColor = "rgba(0,212,255,0.2)";
  e.currentTarget.style.boxShadow = "none";
};

// ── Login Panel ────────────────────────────────────────────────────────
function LoginPanel({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState(false);
  const verifyMutation = useVerifyAdminPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const valid = await verifyMutation.mutateAsync(password);
      if (valid) {
        onSuccess();
      } else {
        setError(true);
        setTimeout(() => setError(false), 3000);
      }
    } catch {
      // Fallback to hardcoded check if actor not ready
      if (password === "harsh2025") {
        onSuccess();
      } else {
        setError(true);
        setTimeout(() => setError(false), 3000);
      }
    }
  };

  return (
    <div
      data-ocid="admin.login_panel"
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#060b18" }}
    >
      {/* Bg glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(123,47,255,0.06) 0%, transparent 65%)",
        }}
      />

      <div
        className="w-full max-w-md relative z-10 rounded-xl p-8"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,212,255,0.04) 0%, rgba(123,47,255,0.04) 100%)",
          border: "1px solid rgba(0,212,255,0.2)",
          boxShadow: "0 0 60px rgba(0,212,255,0.06)",
        }}
      >
        {/* Top bar */}
        <div
          className="absolute top-0 left-0 right-0 h-px rounded-t-xl"
          style={{
            background:
              "linear-gradient(90deg, transparent, #00d4ff, #7b2fff, transparent)",
          }}
        />

        <div className="flex flex-col items-center mb-8">
          <div
            className="w-14 h-14 rounded-full border flex items-center justify-center mb-4"
            style={{
              borderColor: "rgba(0,212,255,0.3)",
              background: "rgba(0,212,255,0.06)",
              boxShadow: "0 0 20px rgba(0,212,255,0.15)",
            }}
          >
            <Lock className="w-6 h-6" style={{ color: "#00d4ff" }} />
          </div>
          <h1
            className="font-display font-bold text-xl tracking-widest"
            style={{ color: "#e8f4f8" }}
          >
            ADMIN ACCESS
          </h1>
          <p
            className="font-mono-code text-xs mt-1"
            style={{ color: "rgba(0,212,255,0.5)" }}
          >
            RESTRICTED_ZONE :: AUTH_REQUIRED
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              data-ocid="admin.password_input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter access code"
              className="w-full px-4 py-3 rounded-lg font-body text-sm pr-10"
              style={{
                ...inputStyle,
                borderColor: error
                  ? "rgba(255,60,60,0.5)"
                  : "rgba(0,212,255,0.2)",
              }}
              onFocus={inputFocusHandler}
              onBlur={inputBlurHandler}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: "rgba(232,244,248,0.4)" }}
              onClick={() => setShowPw(!showPw)}
            >
              {showPw ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {error && (
            <div
              className="flex items-center gap-2 text-xs font-mono-code px-3 py-2 rounded"
              style={{
                background: "rgba(255,60,60,0.08)",
                border: "1px solid rgba(255,60,60,0.25)",
                color: "#ff6060",
              }}
            >
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              ACCESS_DENIED :: INVALID_CREDENTIALS
            </div>
          )}

          <button
            type="submit"
            data-ocid="admin.access_button"
            disabled={verifyMutation.isPending}
            className="w-full py-3 rounded-lg font-display font-bold text-sm tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(123,47,255,0.15))",
              border: "1px solid rgba(0,212,255,0.4)",
              color: "#00d4ff",
              boxShadow: "0 0 20px rgba(0,212,255,0.15)",
            }}
          >
            {verifyMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : null}
            ACCESS SYSTEM
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Resume Tab ─────────────────────────────────────────────────────────
function ResumeTab() {
  const { data: resumeData, isLoading } = useGetResumeContent();
  const updateMutation = useUpdateResumeContent();

  const [form, setForm] = useState<ResumeContent>({
    name: "",
    tagline: "",
    about: "",
    careerObjective: "",
    resumeFileUrl: "",
    email: "",
    linkedin: "",
    github: "",
  });

  useEffect(() => {
    if (resumeData) {
      setForm(resumeData);
    }
  }, [resumeData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync(form);
      toast.success("Resume content updated successfully");
    } catch {
      toast.error("Failed to save changes");
    }
  };

  if (isLoading) {
    return (
      <div
        data-ocid="admin.resume.loading_state"
        className="flex items-center justify-center py-20 gap-3"
      >
        <Loader2
          className="w-5 h-5 animate-spin"
          style={{ color: "#00d4ff" }}
        />
        <span
          className="font-mono-code text-sm"
          style={{ color: "rgba(0,212,255,0.5)" }}
        >
          LOADING_RESUME...
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label
            htmlFor="resume-name"
            className="font-mono-code text-xs"
            style={{ color: "rgba(0,212,255,0.7)" }}
          >
            NAME
          </label>
          <input
            id="resume-name"
            name="name"
            type="text"
            data-ocid="admin.resume.name_input"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="resume-tagline"
            className="font-mono-code text-xs"
            style={{ color: "rgba(0,212,255,0.7)" }}
          >
            TAGLINE
          </label>
          <input
            id="resume-tagline"
            name="tagline"
            type="text"
            data-ocid="admin.resume.tagline_input"
            value={form.tagline}
            onChange={handleChange}
            placeholder="Professional tagline"
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="resume-about"
          className="font-mono-code text-xs"
          style={{ color: "rgba(0,212,255,0.7)" }}
        >
          ABOUT
        </label>
        <textarea
          id="resume-about"
          name="about"
          data-ocid="admin.resume.about_textarea"
          value={form.about}
          onChange={handleChange}
          placeholder="About section content..."
          rows={4}
          className="w-full px-3 py-2.5 rounded-lg font-body text-sm resize-none"
          style={inputStyle}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="resume-career-objective"
          className="font-mono-code text-xs"
          style={{ color: "rgba(0,212,255,0.7)" }}
        >
          CAREER OBJECTIVE
        </label>
        <textarea
          id="resume-career-objective"
          name="careerObjective"
          data-ocid="admin.resume.career_objective_textarea"
          value={form.careerObjective}
          onChange={handleChange}
          placeholder="Career objective statement..."
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg font-body text-sm resize-none"
          style={inputStyle}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="resume-file-url"
          className="font-mono-code text-xs"
          style={{ color: "rgba(0,212,255,0.7)" }}
        >
          RESUME FILE URL (PDF / Drive Link)
        </label>
        <input
          id="resume-file-url"
          name="resumeFileUrl"
          type="text"
          data-ocid="admin.resume.file_url_input"
          value={form.resumeFileUrl}
          onChange={handleChange}
          placeholder="https://drive.google.com/file/..."
          className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
          style={inputStyle}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="space-y-1.5">
          <label
            htmlFor="resume-email"
            className="font-mono-code text-xs"
            style={{ color: "rgba(0,212,255,0.7)" }}
          >
            EMAIL
          </label>
          <input
            id="resume-email"
            name="email"
            type="email"
            data-ocid="admin.resume.email_input"
            value={form.email}
            onChange={handleChange}
            placeholder="email@example.com"
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="resume-linkedin"
            className="font-mono-code text-xs"
            style={{ color: "rgba(0,212,255,0.7)" }}
          >
            LINKEDIN
          </label>
          <input
            id="resume-linkedin"
            name="linkedin"
            type="text"
            data-ocid="admin.resume.linkedin_input"
            value={form.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/..."
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="resume-github"
            className="font-mono-code text-xs"
            style={{ color: "rgba(0,212,255,0.7)" }}
          >
            GITHUB
          </label>
          <input
            id="resume-github"
            name="github"
            type="text"
            data-ocid="admin.resume.github_input"
            value={form.github}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          data-ocid="admin.resume.save_button"
          disabled={updateMutation.isPending}
          className="px-8 py-2.5 rounded-lg font-display font-bold text-sm tracking-wider transition-all duration-300 flex items-center gap-2"
          style={{
            background: updateMutation.isPending
              ? "rgba(0,212,255,0.06)"
              : "rgba(0,212,255,0.12)",
            border: "1px solid rgba(0,212,255,0.4)",
            color: updateMutation.isPending ? "rgba(0,212,255,0.4)" : "#00d4ff",
            boxShadow: updateMutation.isPending
              ? "none"
              : "0 0 20px rgba(0,212,255,0.15)",
          }}
        >
          {updateMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              SAVING...
            </>
          ) : (
            "SAVE CHANGES"
          )}
        </button>

        {updateMutation.isSuccess && (
          <div
            data-ocid="admin.resume.success_state"
            className="flex items-center gap-1.5 font-mono-code text-xs"
            style={{ color: "#00ff88" }}
          >
            <CheckCircle2 className="w-4 h-4" />
            SAVED
          </div>
        )}
        {updateMutation.isError && (
          <div
            data-ocid="admin.resume.error_state"
            className="flex items-center gap-1.5 font-mono-code text-xs"
            style={{ color: "#ff6060" }}
          >
            <AlertCircle className="w-4 h-4" />
            SAVE_FAILED
          </div>
        )}
      </div>
    </form>
  );
}

// ── Blog Form ──────────────────────────────────────────────────────────
const defaultBlogForm: BlogFormState = {
  title: "",
  category: "Embedded Systems",
  summary: "",
  content: "",
  author: "Harsh Gugale",
  fileUrl: "",
  isFeatured: false,
};

function BlogForm({
  initial,
  isEditing,
  onSubmit,
  onCancel,
  isPending,
}: {
  initial: BlogFormState;
  isEditing: boolean;
  onSubmit: (data: BlogFormState) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [form, setForm] = useState<BlogFormState>(initial);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div
      className="rounded-xl p-6 mb-6 space-y-4"
      style={{
        background: "rgba(0,212,255,0.03)",
        border: "1px solid rgba(0,212,255,0.15)",
      }}
    >
      <div className="flex items-center justify-between">
        <h3
          className="font-display font-bold text-sm tracking-wider"
          style={{ color: "#00d4ff" }}
        >
          {isEditing ? "// EDIT_POST" : "// NEW_POST"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          style={{ color: "rgba(232,244,248,0.4)" }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="blog-title"
            className="font-mono-code text-xs"
            style={{ color: "rgba(0,212,255,0.7)" }}
          >
            TITLE
          </label>
          <input
            id="blog-title"
            name="title"
            type="text"
            data-ocid="admin.blog.title_input"
            value={form.title}
            onChange={handleChange}
            placeholder="Post title"
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="blog-category"
            className="font-mono-code text-xs"
            style={{ color: "rgba(0,212,255,0.7)" }}
          >
            CATEGORY
          </label>
          <select
            id="blog-category"
            name="category"
            data-ocid="admin.blog.category_select"
            value={form.category}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          >
            {BLOG_CATEGORIES.map((cat) => (
              <option
                key={cat}
                value={cat}
                style={{ background: "#060b18", color: "#e8f4f8" }}
              >
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="blog-summary"
          className="font-mono-code text-xs"
          style={{ color: "rgba(0,212,255,0.7)" }}
        >
          SUMMARY
        </label>
        <textarea
          id="blog-summary"
          name="summary"
          data-ocid="admin.blog.summary_textarea"
          value={form.summary}
          onChange={handleChange}
          placeholder="Brief summary (shown in card view)..."
          rows={2}
          className="w-full px-3 py-2.5 rounded-lg font-body text-sm resize-none"
          style={inputStyle}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="blog-content"
          className="font-mono-code text-xs"
          style={{ color: "rgba(0,212,255,0.7)" }}
        >
          CONTENT
        </label>
        <textarea
          id="blog-content"
          name="content"
          data-ocid="admin.blog.content_textarea"
          value={form.content}
          onChange={handleChange}
          placeholder="Full article content..."
          rows={5}
          className="w-full px-3 py-2.5 rounded-lg font-body text-sm resize-none"
          style={inputStyle}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="blog-author"
            className="font-mono-code text-xs"
            style={{ color: "rgba(0,212,255,0.7)" }}
          >
            AUTHOR
          </label>
          <input
            id="blog-author"
            name="author"
            type="text"
            data-ocid="admin.blog.author_input"
            value={form.author}
            onChange={handleChange}
            placeholder="Author name"
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="blog-file-url"
            className="font-mono-code text-xs"
            style={{ color: "rgba(0,212,255,0.7)" }}
          >
            FILE URL (Google Drive, Notion, GitHub...)
          </label>
          <input
            id="blog-file-url"
            name="fileUrl"
            type="text"
            data-ocid="admin.blog.file_url_input"
            value={form.fileUrl}
            onChange={handleChange}
            placeholder="Paste any file/document link here"
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="blog-featured"
          name="isFeatured"
          data-ocid="admin.blog.featured_checkbox"
          checked={form.isFeatured}
          onChange={handleChange}
          className="w-4 h-4 rounded"
          style={{ accentColor: "#00d4ff" }}
        />
        <label
          htmlFor="blog-featured"
          className="font-body text-sm cursor-pointer"
          style={{ color: "rgba(232,244,248,0.7)" }}
        >
          Set as Featured Post
        </label>
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          data-ocid="admin.blog.publish_button"
          disabled={isPending}
          onClick={() => onSubmit(form)}
          className="px-6 py-2.5 rounded-lg font-display font-bold text-xs tracking-wider transition-all duration-300 flex items-center gap-2"
          style={{
            background: isPending
              ? "rgba(0,212,255,0.06)"
              : "rgba(0,212,255,0.12)",
            border: "1px solid rgba(0,212,255,0.35)",
            color: isPending ? "rgba(0,212,255,0.4)" : "#00d4ff",
            boxShadow: isPending ? "none" : "0 0 16px rgba(0,212,255,0.12)",
          }}
        >
          {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
          {isEditing ? "UPDATE POST" : "PUBLISH POST"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-lg font-body text-xs transition-all duration-200"
          style={{
            background: "transparent",
            border: "1px solid rgba(232,244,248,0.1)",
            color: "rgba(232,244,248,0.5)",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Blog Tab ───────────────────────────────────────────────────────────
function BlogTab() {
  const { data: posts, isLoading } = useGetAllPosts();
  const addMutation = useAddBlogPost();
  const updateMutation = useUpdateBlogPost();
  const deleteMutation = useDeleteBlogPost();

  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<bigint | null>(null);

  const isPending = addMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (data: BlogFormState) => {
    try {
      if (editingPost) {
        await updateMutation.mutateAsync({
          id: editingPost.id,
          title: data.title,
          category: data.category,
          summary: data.summary,
          content: data.content,
          author: data.author,
          publishedAt: editingPost.publishedAt,
          isFeatured: data.isFeatured,
          fileUrl: data.fileUrl,
        });
        toast.success("Post updated successfully");
      } else {
        await addMutation.mutateAsync({
          title: data.title,
          category: data.category,
          summary: data.summary,
          content: data.content,
          author: data.author,
          isFeatured: data.isFeatured,
          fileUrl: data.fileUrl,
        });
        toast.success("Post published successfully");
      }
      setShowForm(false);
      setEditingPost(null);
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Post deleted");
      setConfirmDelete(null);
    } catch {
      toast.error("Failed to delete post");
    }
  };

  const formInitial: BlogFormState = editingPost
    ? {
        id: editingPost.id,
        publishedAt: editingPost.publishedAt,
        title: editingPost.title,
        category: editingPost.category,
        summary: editingPost.summary,
        content: editingPost.content,
        author: editingPost.author,
        fileUrl: editingPost.fileUrl,
        isFeatured: editingPost.isFeatured,
      }
    : defaultBlogForm;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3
          className="font-mono-code text-xs"
          style={{ color: "rgba(0,212,255,0.5)" }}
        >
          {posts?.length ?? 0} POSTS_IN_DB
        </h3>
        <button
          type="button"
          data-ocid="admin.blog.add_button"
          onClick={() => {
            setEditingPost(null);
            setShowForm(true);
          }}
          className="px-4 py-2 rounded-lg font-display font-bold text-xs tracking-wider transition-all duration-300 flex items-center gap-2"
          style={{
            background: "rgba(0,212,255,0.1)",
            border: "1px solid rgba(0,212,255,0.3)",
            color: "#00d4ff",
            boxShadow: "0 0 14px rgba(0,212,255,0.1)",
          }}
        >
          <Plus className="w-3.5 h-3.5" />
          ADD NEW POST
        </button>
      </div>

      {showForm && (
        <BlogForm
          key={editingPost?.id?.toString() ?? "new"}
          initial={formInitial}
          isEditing={!!editingPost}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingPost(null);
          }}
          isPending={isPending}
        />
      )}

      {isLoading ? (
        <div
          data-ocid="admin.blog.loading_state"
          className="flex items-center justify-center py-12 gap-3"
        >
          <Loader2
            className="w-5 h-5 animate-spin"
            style={{ color: "#00d4ff" }}
          />
          <span
            className="font-mono-code text-xs"
            style={{ color: "rgba(0,212,255,0.5)" }}
          >
            LOADING_POSTS...
          </span>
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="space-y-3">
          {posts.slice(0, 10).map((post, idx) => (
            <div
              key={post.id.toString()}
              data-ocid={`admin.blog.item.${idx + 1}`}
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg"
              style={{
                background: "rgba(0,212,255,0.02)",
                border: "1px solid rgba(0,212,255,0.1)",
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="font-body text-sm font-medium truncate"
                    style={{ color: "#e8f4f8" }}
                  >
                    {post.title}
                  </span>
                  {post.isFeatured && (
                    <span
                      className="font-mono-code text-xs px-1.5 py-0.5 rounded flex-shrink-0"
                      style={{
                        background: "rgba(0,212,255,0.1)",
                        border: "1px solid rgba(0,212,255,0.25)",
                        color: "#00d4ff",
                      }}
                    >
                      FEATURED
                    </span>
                  )}
                  {post.fileUrl && post.fileUrl !== "" && (
                    <span
                      className="font-mono-code text-xs px-1.5 py-0.5 rounded flex-shrink-0"
                      style={{
                        background: "rgba(123,47,255,0.1)",
                        border: "1px solid rgba(123,47,255,0.25)",
                        color: "#a855f7",
                      }}
                    >
                      FILE
                    </span>
                  )}
                </div>
                <span
                  className="font-mono-code text-xs"
                  style={{ color: "rgba(0,212,255,0.45)" }}
                >
                  {post.category}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {confirmDelete === post.id ? (
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono-code text-xs"
                      style={{ color: "#ff6060" }}
                    >
                      Confirm?
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id)}
                      disabled={deleteMutation.isPending}
                      className="px-2 py-1 rounded text-xs font-body"
                      style={{
                        background: "rgba(255,60,60,0.15)",
                        border: "1px solid rgba(255,60,60,0.3)",
                        color: "#ff6060",
                      }}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(null)}
                      className="px-2 py-1 rounded text-xs font-body"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(232,244,248,0.5)",
                      }}
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      data-ocid={`admin.blog.edit_button.${idx + 1}`}
                      onClick={() => handleEdit(post)}
                      className="p-1.5 rounded transition-colors duration-200"
                      style={{ color: "rgba(0,212,255,0.5)" }}
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      data-ocid={`admin.blog.delete_button.${idx + 1}`}
                      onClick={() => setConfirmDelete(post.id)}
                      className="p-1.5 rounded transition-colors duration-200"
                      style={{ color: "rgba(255,100,100,0.5)" }}
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="text-center py-12"
          style={{ color: "rgba(0,212,255,0.35)" }}
        >
          <Terminal className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="font-mono-code text-xs">NO_POSTS_FOUND</p>
        </div>
      )}
    </div>
  );
}

// ── Project Form ───────────────────────────────────────────────────────
const defaultProjectForm: ProjectFormState = {
  title: "",
  category: "",
  description: "",
  techStack: "",
  githubUrl: "",
  demoUrl: "",
};

function ProjectForm({
  initial,
  isEditing,
  onSubmit,
  onCancel,
  isPending,
}: {
  initial: ProjectFormState;
  isEditing: boolean;
  onSubmit: (data: ProjectFormState) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [form, setForm] = useState<ProjectFormState>(initial);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="rounded-xl p-6 mb-6 space-y-4"
      style={{
        background: "rgba(123,47,255,0.03)",
        border: "1px solid rgba(123,47,255,0.15)",
      }}
    >
      <div className="flex items-center justify-between">
        <h3
          className="font-display font-bold text-sm tracking-wider"
          style={{ color: "#a855f7" }}
        >
          {isEditing ? "// EDIT_PROJECT" : "// NEW_PROJECT"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          style={{ color: "rgba(232,244,248,0.4)" }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="proj-title"
            className="font-mono-code text-xs"
            style={{ color: "rgba(123,47,255,0.8)" }}
          >
            TITLE
          </label>
          <input
            id="proj-title"
            name="title"
            type="text"
            data-ocid="admin.projects.title_input"
            value={form.title}
            onChange={handleChange}
            placeholder="Project title"
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="proj-category"
            className="font-mono-code text-xs"
            style={{ color: "rgba(123,47,255,0.8)" }}
          >
            CATEGORY
          </label>
          <input
            id="proj-category"
            name="category"
            type="text"
            data-ocid="admin.projects.category_input"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. IoT Systems, Edge AI..."
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="proj-description"
          className="font-mono-code text-xs"
          style={{ color: "rgba(123,47,255,0.8)" }}
        >
          DESCRIPTION
        </label>
        <textarea
          id="proj-description"
          name="description"
          data-ocid="admin.projects.description_textarea"
          value={form.description}
          onChange={handleChange}
          placeholder="Project description..."
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg font-body text-sm resize-none"
          style={inputStyle}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="proj-techstack"
          className="font-mono-code text-xs"
          style={{ color: "rgba(123,47,255,0.8)" }}
        >
          TECH STACK (comma-separated)
        </label>
        <input
          id="proj-techstack"
          name="techStack"
          type="text"
          data-ocid="admin.projects.techstack_input"
          value={form.techStack}
          onChange={handleChange}
          placeholder="STM32, Python, CAN, ESP32..."
          className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
          style={inputStyle}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="proj-github"
            className="font-mono-code text-xs"
            style={{ color: "rgba(123,47,255,0.8)" }}
          >
            GITHUB URL
          </label>
          <input
            id="proj-github"
            name="githubUrl"
            type="text"
            data-ocid="admin.projects.github_input"
            value={form.githubUrl}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="proj-demo"
            className="font-mono-code text-xs"
            style={{ color: "rgba(123,47,255,0.8)" }}
          >
            DEMO URL
          </label>
          <input
            id="proj-demo"
            name="demoUrl"
            type="text"
            data-ocid="admin.projects.demo_input"
            value={form.demoUrl}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          data-ocid="admin.projects.save_button"
          disabled={isPending}
          onClick={() => onSubmit(form)}
          className="px-6 py-2.5 rounded-lg font-display font-bold text-xs tracking-wider transition-all duration-300 flex items-center gap-2"
          style={{
            background: isPending
              ? "rgba(123,47,255,0.04)"
              : "rgba(123,47,255,0.12)",
            border: "1px solid rgba(123,47,255,0.35)",
            color: isPending ? "rgba(168,85,247,0.4)" : "#a855f7",
            boxShadow: isPending ? "none" : "0 0 16px rgba(123,47,255,0.12)",
          }}
        >
          {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
          {isEditing ? "UPDATE PROJECT" : "ADD PROJECT"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-lg font-body text-xs transition-all duration-200"
          style={{
            background: "transparent",
            border: "1px solid rgba(232,244,248,0.1)",
            color: "rgba(232,244,248,0.5)",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Projects Tab ───────────────────────────────────────────────────────
function ProjectsTab() {
  const { data: projects, isLoading } = useGetAllProjects();
  const addMutation = useAddProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<bigint | null>(null);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const isPending = addMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (data: ProjectFormState) => {
    const techStackArr = data.techStack
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    try {
      if (editingProject) {
        await updateMutation.mutateAsync({
          id: editingProject.id,
          title: data.title,
          techStack: techStackArr,
          description: data.description,
          category: data.category,
          githubUrl: data.githubUrl,
          demoUrl: data.demoUrl,
        });
        toast.success("Project updated");
      } else {
        await addMutation.mutateAsync({
          title: data.title,
          techStack: techStackArr,
          description: data.description,
          category: data.category,
          githubUrl: data.githubUrl,
          demoUrl: data.demoUrl,
        });
        toast.success("Project added");
      }
      setShowForm(false);
      setEditingProject(null);
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Project deleted");
      setConfirmDelete(null);
    } catch {
      toast.error("Failed to delete project");
    }
  };

  const formInitial: ProjectFormState = editingProject
    ? {
        id: editingProject.id,
        title: editingProject.title,
        category: editingProject.category,
        description: editingProject.description,
        techStack: editingProject.techStack.join(", "),
        githubUrl: editingProject.githubUrl,
        demoUrl: editingProject.demoUrl,
      }
    : defaultProjectForm;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3
          className="font-mono-code text-xs"
          style={{ color: "rgba(123,47,255,0.6)" }}
        >
          {projects?.length ?? 0} PROJECTS_IN_DB
        </h3>
        <button
          type="button"
          data-ocid="admin.projects.add_button"
          onClick={() => {
            setEditingProject(null);
            setShowForm(true);
          }}
          className="px-4 py-2 rounded-lg font-display font-bold text-xs tracking-wider transition-all duration-300 flex items-center gap-2"
          style={{
            background: "rgba(123,47,255,0.1)",
            border: "1px solid rgba(123,47,255,0.3)",
            color: "#a855f7",
            boxShadow: "0 0 14px rgba(123,47,255,0.1)",
          }}
        >
          <Plus className="w-3.5 h-3.5" />
          ADD PROJECT
        </button>
      </div>

      {showForm && (
        <ProjectForm
          key={editingProject?.id?.toString() ?? "new"}
          initial={formInitial}
          isEditing={!!editingProject}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
          isPending={isPending}
        />
      )}

      {isLoading ? (
        <div
          data-ocid="admin.projects.loading_state"
          className="flex items-center justify-center py-12 gap-3"
        >
          <Loader2
            className="w-5 h-5 animate-spin"
            style={{ color: "#a855f7" }}
          />
          <span
            className="font-mono-code text-xs"
            style={{ color: "rgba(123,47,255,0.5)" }}
          >
            LOADING_PROJECTS...
          </span>
        </div>
      ) : projects && projects.length > 0 ? (
        <div className="space-y-3">
          {projects.slice(0, 10).map((project, idx) => (
            <div
              key={project.id.toString()}
              data-ocid={`admin.projects.item.${idx + 1}`}
              className="rounded-lg overflow-hidden"
              style={{
                background: "rgba(123,47,255,0.02)",
                border: "1px solid rgba(123,47,255,0.1)",
              }}
            >
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="font-body text-sm font-medium truncate"
                      style={{ color: "#e8f4f8" }}
                    >
                      {project.title}
                    </span>
                    <span
                      className="font-mono-code text-xs px-1.5 py-0.5 rounded"
                      style={{
                        background: "rgba(123,47,255,0.1)",
                        border: "1px solid rgba(123,47,255,0.2)",
                        color: "#a855f7",
                      }}
                    >
                      {project.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono-code text-xs px-1.5 py-0.5 rounded"
                        style={{
                          background: "rgba(0,212,255,0.04)",
                          border: "1px solid rgba(0,212,255,0.12)",
                          color: "rgba(0,212,255,0.6)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span
                        className="font-mono-code text-xs"
                        style={{ color: "rgba(0,212,255,0.4)" }}
                      >
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedIdx(expandedIdx === idx ? null : idx)
                    }
                    className="p-1.5 rounded transition-colors duration-200"
                    style={{ color: "rgba(123,47,255,0.5)" }}
                    title="Expand"
                  >
                    {expandedIdx === idx ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                  {confirmDelete === project.id ? (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="font-mono-code text-xs"
                        style={{ color: "#ff6060" }}
                      >
                        Confirm?
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDelete(project.id)}
                        disabled={deleteMutation.isPending}
                        className="px-2 py-1 rounded text-xs font-body"
                        style={{
                          background: "rgba(255,60,60,0.15)",
                          border: "1px solid rgba(255,60,60,0.3)",
                          color: "#ff6060",
                        }}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(null)}
                        className="px-2 py-1 rounded text-xs font-body"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "rgba(232,244,248,0.5)",
                        }}
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        data-ocid={`admin.projects.edit_button.${idx + 1}`}
                        onClick={() => handleEdit(project)}
                        className="p-1.5 rounded transition-colors duration-200"
                        style={{ color: "rgba(0,212,255,0.5)" }}
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        data-ocid={`admin.projects.delete_button.${idx + 1}`}
                        onClick={() => setConfirmDelete(project.id)}
                        className="p-1.5 rounded transition-colors duration-200"
                        style={{ color: "rgba(255,100,100,0.5)" }}
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {expandedIdx === idx && (
                <div
                  className="px-4 pb-3 text-xs font-body border-t"
                  style={{
                    color: "rgba(232,244,248,0.55)",
                    borderColor: "rgba(123,47,255,0.1)",
                  }}
                >
                  <p className="mt-2">{project.description}</p>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block truncate"
                      style={{ color: "rgba(0,212,255,0.5)" }}
                    >
                      GitHub: {project.githubUrl}
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 block truncate"
                      style={{ color: "rgba(0,212,255,0.5)" }}
                    >
                      Demo: {project.demoUrl}
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          className="text-center py-12"
          style={{ color: "rgba(123,47,255,0.35)" }}
        >
          <Terminal className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="font-mono-code text-xs">NO_PROJECTS_FOUND</p>
        </div>
      )}
    </div>
  );
}

// ── Analytics Tab ──────────────────────────────────────────────────────
function AnalyticsTab() {
  const { data, isLoading } = useGetAnalytics();

  if (isLoading) {
    return (
      <div
        data-ocid="admin.analytics.loading_state"
        className="flex items-center justify-center py-20 gap-3"
      >
        <Loader2
          className="w-5 h-5 animate-spin"
          style={{ color: "#00ff88" }}
        />
        <span
          className="font-mono-code text-sm"
          style={{ color: "rgba(0,255,136,0.5)" }}
        >
          LOADING_ANALYTICS...
        </span>
      </div>
    );
  }

  const visitorCount = data?.visitorCount ?? BigInt(0);
  const resumeDownloadCount = data?.resumeDownloadCount ?? BigInt(0);
  const topBlogs = data?.topBlogs ?? [];
  const topProjects = data?.topProjects ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <BarChart3 className="w-4 h-4" style={{ color: "#00ff88" }} />
        <span
          className="font-mono-code text-xs"
          style={{ color: "rgba(0,255,136,0.6)" }}
        >
          SYSTEM_ANALYTICS :: REAL_TIME
        </span>
      </div>

      {/* Stat cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Visitors card */}
        <div
          data-ocid="admin.analytics.visitors_card"
          className="rounded-xl p-6 flex flex-col gap-3 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(0,212,255,0.02) 100%)",
            border: "1px solid rgba(0,212,255,0.2)",
            boxShadow: "0 0 30px rgba(0,212,255,0.05)",
          }}
        >
          {/* Glow bg */}
          <div
            className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(0,212,255,0.12) 0%, transparent 70%)",
            }}
          />
          <div className="flex items-center justify-between">
            <span
              className="font-mono-code text-xs tracking-widest"
              style={{ color: "rgba(0,212,255,0.6)" }}
            >
              VISITORS
            </span>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.2)",
              }}
            >
              <Users className="w-4 h-4" style={{ color: "#00d4ff" }} />
            </div>
          </div>
          <div
            className="font-display font-bold"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "#00d4ff",
              textShadow:
                "0 0 20px rgba(0,212,255,0.5), 0 0 40px rgba(0,212,255,0.2)",
              lineHeight: 1,
            }}
          >
            {visitorCount.toLocaleString()}
          </div>
          <span
            className="font-body text-xs"
            style={{ color: "rgba(232,244,248,0.4)" }}
          >
            Total site visits recorded
          </span>
        </div>

        {/* Resume downloads card */}
        <div
          data-ocid="admin.analytics.downloads_card"
          className="rounded-xl p-6 flex flex-col gap-3 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(168,85,247,0.06) 0%, rgba(168,85,247,0.02) 100%)",
            border: "1px solid rgba(168,85,247,0.2)",
            boxShadow: "0 0 30px rgba(168,85,247,0.05)",
          }}
        >
          {/* Glow bg */}
          <div
            className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(168,85,247,0.12) 0%, transparent 70%)",
            }}
          />
          <div className="flex items-center justify-between">
            <span
              className="font-mono-code text-xs tracking-widest"
              style={{ color: "rgba(168,85,247,0.6)" }}
            >
              RESUME DOWNLOADS
            </span>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "rgba(168,85,247,0.1)",
                border: "1px solid rgba(168,85,247,0.2)",
              }}
            >
              <Download className="w-4 h-4" style={{ color: "#a855f7" }} />
            </div>
          </div>
          <div
            className="font-display font-bold"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "#a855f7",
              textShadow:
                "0 0 20px rgba(168,85,247,0.5), 0 0 40px rgba(168,85,247,0.2)",
              lineHeight: 1,
            }}
          >
            {resumeDownloadCount.toLocaleString()}
          </div>
          <span
            className="font-body text-xs"
            style={{ color: "rgba(232,244,248,0.4)" }}
          >
            Resume file link clicks
          </span>
        </div>
      </div>

      {/* Ranked list cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Top blog posts */}
        <div
          data-ocid="admin.analytics.top_blogs_card"
          className="rounded-xl p-5 flex flex-col gap-4"
          style={{
            background: "rgba(0,212,255,0.02)",
            border: "1px solid rgba(0,212,255,0.15)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="font-mono-code text-xs tracking-widest"
              style={{ color: "rgba(0,212,255,0.7)" }}
            >
              TOP BLOG POSTS
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(0,212,255,0.1)" }}
            />
          </div>

          {topBlogs.length === 0 ? (
            <div
              className="text-center py-6"
              style={{ color: "rgba(0,212,255,0.3)" }}
            >
              <Eye className="w-6 h-6 mx-auto mb-2 opacity-40" />
              <p className="font-mono-code text-xs">NO_DATA_YET</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {topBlogs.slice(0, 5).map((blog, idx) => (
                <div
                  key={blog.id.toString()}
                  className="flex items-center gap-3"
                >
                  <span
                    className="font-mono-code text-xs font-bold flex-shrink-0 w-6"
                    style={{
                      color:
                        idx === 0
                          ? "#00d4ff"
                          : idx === 1
                            ? "rgba(0,212,255,0.7)"
                            : "rgba(0,212,255,0.45)",
                      textShadow:
                        idx === 0 ? "0 0 8px rgba(0,212,255,0.5)" : "none",
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-body text-xs flex-1 truncate"
                    style={{ color: "rgba(232,244,248,0.75)" }}
                    title={blog.title}
                  >
                    {blog.title}
                  </span>
                  <div
                    className="flex items-center gap-1 flex-shrink-0"
                    style={{ color: "rgba(0,212,255,0.5)" }}
                  >
                    <Eye className="w-3 h-3" />
                    <span className="font-mono-code text-xs">
                      {blog.viewCount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top projects */}
        <div
          data-ocid="admin.analytics.top_projects_card"
          className="rounded-xl p-5 flex flex-col gap-4"
          style={{
            background: "rgba(168,85,247,0.02)",
            border: "1px solid rgba(168,85,247,0.15)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="font-mono-code text-xs tracking-widest"
              style={{ color: "rgba(168,85,247,0.7)" }}
            >
              TOP PROJECTS
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(168,85,247,0.1)" }}
            />
          </div>

          {topProjects.length === 0 ? (
            <div
              className="text-center py-6"
              style={{ color: "rgba(168,85,247,0.3)" }}
            >
              <Eye className="w-6 h-6 mx-auto mb-2 opacity-40" />
              <p className="font-mono-code text-xs">NO_DATA_YET</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {topProjects.slice(0, 5).map((proj, idx) => (
                <div
                  key={proj.id.toString()}
                  className="flex items-center gap-3"
                >
                  <span
                    className="font-mono-code text-xs font-bold flex-shrink-0 w-6"
                    style={{
                      color:
                        idx === 0
                          ? "#a855f7"
                          : idx === 1
                            ? "rgba(168,85,247,0.7)"
                            : "rgba(168,85,247,0.45)",
                      textShadow:
                        idx === 0 ? "0 0 8px rgba(168,85,247,0.5)" : "none",
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-body text-xs flex-1 truncate"
                    style={{ color: "rgba(232,244,248,0.75)" }}
                    title={proj.title}
                  >
                    {proj.title}
                  </span>
                  <div
                    className="flex items-center gap-1 flex-shrink-0"
                    style={{ color: "rgba(168,85,247,0.5)" }}
                  >
                    <Eye className="w-3 h-3" />
                    <span className="font-mono-code text-xs">
                      {proj.viewCount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Refresh hint */}
      <p
        className="font-mono-code text-xs text-center"
        style={{ color: "rgba(232,244,248,0.2)" }}
      >
        DATA_REFRESH :: LIVE | TRACKING_ACTIVE
      </p>
    </div>
  );
}

// ── Experience Form State ──────────────────────────────────────────────
type ExperienceFormState = {
  id?: bigint;
  title: string;
  company: string;
  badge: string;
  date: string;
  description: string;
  tags: string;
  accentColor: string;
};

const defaultExperienceForm: ExperienceFormState = {
  title: "",
  company: "",
  badge: "",
  date: "",
  description: "",
  tags: "",
  accentColor: "#00d4ff",
};

function ExperienceForm({
  initial,
  isEditing,
  onSubmit,
  onCancel,
  isPending,
}: {
  initial: ExperienceFormState;
  isEditing: boolean;
  onSubmit: (data: ExperienceFormState) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [form, setForm] = useState<ExperienceFormState>(initial);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="rounded-xl p-6 mb-6 space-y-4"
      style={{
        background: "rgba(0,212,255,0.03)",
        border: "1px solid rgba(0,212,255,0.15)",
      }}
    >
      <div className="flex items-center justify-between">
        <h3
          className="font-display font-bold text-sm tracking-wider"
          style={{ color: "#00d4ff" }}
        >
          {isEditing ? "// EDIT_EXPERIENCE" : "// NEW_EXPERIENCE"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          style={{ color: "rgba(232,244,248,0.4)" }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="exp-title"
            className="font-mono-code text-xs"
            style={{ color: "rgba(0,212,255,0.7)" }}
          >
            TITLE
          </label>
          <input
            id="exp-title"
            name="title"
            type="text"
            data-ocid="admin.experience.title_input"
            value={form.title}
            onChange={handleChange}
            placeholder="Job title"
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="exp-company"
            className="font-mono-code text-xs"
            style={{ color: "rgba(0,212,255,0.7)" }}
          >
            COMPANY
          </label>
          <input
            id="exp-company"
            name="company"
            type="text"
            data-ocid="admin.experience.company_input"
            value={form.company}
            onChange={handleChange}
            placeholder="Company name"
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="exp-badge"
            className="font-mono-code text-xs"
            style={{ color: "rgba(0,212,255,0.7)" }}
          >
            BADGE (2-3 chars)
          </label>
          <input
            id="exp-badge"
            name="badge"
            type="text"
            data-ocid="admin.experience.badge_input"
            value={form.badge}
            onChange={handleChange}
            placeholder="EV / DEF"
            maxLength={4}
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="exp-date"
            className="font-mono-code text-xs"
            style={{ color: "rgba(0,212,255,0.7)" }}
          >
            DATE / YEAR
          </label>
          <input
            id="exp-date"
            name="date"
            type="text"
            data-ocid="admin.experience.date_input"
            value={form.date}
            onChange={handleChange}
            placeholder="2024"
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="exp-accent"
            className="font-mono-code text-xs"
            style={{ color: "rgba(0,212,255,0.7)" }}
          >
            ACCENT COLOR
          </label>
          <select
            id="exp-accent"
            name="accentColor"
            data-ocid="admin.experience.accent_select"
            value={form.accentColor}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          >
            <option
              value="#00d4ff"
              style={{ background: "#060b18", color: "#e8f4f8" }}
            >
              Cyan / EV
            </option>
            <option
              value="#a855f7"
              style={{ background: "#060b18", color: "#e8f4f8" }}
            >
              Purple / DEF
            </option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="exp-description"
          className="font-mono-code text-xs"
          style={{ color: "rgba(0,212,255,0.7)" }}
        >
          DESCRIPTION
        </label>
        <textarea
          id="exp-description"
          name="description"
          data-ocid="admin.experience.description_textarea"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe your role and responsibilities..."
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg font-body text-sm resize-none"
          style={inputStyle}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="exp-tags"
          className="font-mono-code text-xs"
          style={{ color: "rgba(0,212,255,0.7)" }}
        >
          TAGS (comma-separated)
        </label>
        <input
          id="exp-tags"
          name="tags"
          type="text"
          data-ocid="admin.experience.tags_input"
          value={form.tags}
          onChange={handleChange}
          placeholder="CAN Protocol, Firmware, STM32..."
          className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
          style={inputStyle}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
        />
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          data-ocid="admin.experience.save_button"
          disabled={isPending}
          onClick={() => onSubmit(form)}
          className="px-6 py-2.5 rounded-lg font-display font-bold text-xs tracking-wider transition-all duration-300 flex items-center gap-2"
          style={{
            background: isPending
              ? "rgba(0,212,255,0.06)"
              : "rgba(0,212,255,0.12)",
            border: "1px solid rgba(0,212,255,0.35)",
            color: isPending ? "rgba(0,212,255,0.4)" : "#00d4ff",
            boxShadow: isPending ? "none" : "0 0 16px rgba(0,212,255,0.12)",
          }}
        >
          {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
          {isEditing ? "UPDATE EXPERIENCE" : "ADD EXPERIENCE"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-lg font-body text-xs transition-all duration-200"
          style={{
            background: "transparent",
            border: "1px solid rgba(232,244,248,0.1)",
            color: "rgba(232,244,248,0.5)",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Experience Tab ─────────────────────────────────────────────────────
function ExperienceTab() {
  const { data: experiences, isLoading } = useGetAllExperiences();
  const addMutation = useAddExperience();
  const updateMutation = useUpdateExperience();
  const deleteMutation = useDeleteExperience();
  const { mutate: initData } = useInitializeData();

  const [showForm, setShowForm] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<bigint | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: fire-and-forget initialization on mount
  useEffect(() => {
    try {
      initData();
    } catch {
      // fire-and-forget
    }
  }, []);

  const isPending = addMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (data: ExperienceFormState) => {
    const tagsArr = data.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    try {
      if (editingExp) {
        await updateMutation.mutateAsync({
          id: editingExp.id,
          title: data.title,
          company: data.company,
          badge: data.badge,
          date: data.date,
          description: data.description,
          tags: tagsArr,
          accentColor: data.accentColor,
        });
        toast.success("Experience updated");
      } else {
        await addMutation.mutateAsync({
          title: data.title,
          company: data.company,
          badge: data.badge,
          date: data.date,
          description: data.description,
          tags: tagsArr,
          accentColor: data.accentColor,
        });
        toast.success("Experience added");
      }
      setShowForm(false);
      setEditingExp(null);
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleEdit = (exp: Experience) => {
    setEditingExp(exp);
    setShowForm(true);
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Experience deleted");
      setConfirmDelete(null);
    } catch {
      toast.error("Failed to delete experience");
    }
  };

  const formInitial: ExperienceFormState = editingExp
    ? {
        id: editingExp.id,
        title: editingExp.title,
        company: editingExp.company,
        badge: editingExp.badge,
        date: editingExp.date,
        description: editingExp.description,
        tags: editingExp.tags.join(", "),
        accentColor: editingExp.accentColor,
      }
    : defaultExperienceForm;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3
          className="font-mono-code text-xs"
          style={{ color: "rgba(0,212,255,0.5)" }}
        >
          {experiences?.length ?? 0} EXPERIENCES_IN_DB
        </h3>
        <button
          type="button"
          data-ocid="admin.experience.add_button"
          onClick={() => {
            setEditingExp(null);
            setShowForm(true);
          }}
          className="px-4 py-2 rounded-lg font-display font-bold text-xs tracking-wider transition-all duration-300 flex items-center gap-2"
          style={{
            background: "rgba(0,212,255,0.1)",
            border: "1px solid rgba(0,212,255,0.3)",
            color: "#00d4ff",
            boxShadow: "0 0 14px rgba(0,212,255,0.1)",
          }}
        >
          <Plus className="w-3.5 h-3.5" />
          ADD EXPERIENCE
        </button>
      </div>

      {showForm && (
        <ExperienceForm
          key={editingExp?.id?.toString() ?? "new"}
          initial={formInitial}
          isEditing={!!editingExp}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingExp(null);
          }}
          isPending={isPending}
        />
      )}

      {isLoading ? (
        <div
          data-ocid="admin.experience.loading_state"
          className="flex items-center justify-center py-12 gap-3"
        >
          <Loader2
            className="w-5 h-5 animate-spin"
            style={{ color: "#00d4ff" }}
          />
          <span
            className="font-mono-code text-xs"
            style={{ color: "rgba(0,212,255,0.5)" }}
          >
            LOADING_EXPERIENCES...
          </span>
        </div>
      ) : experiences && experiences.length > 0 ? (
        <div className="space-y-3">
          {experiences.slice(0, 20).map((exp, idx) => (
            <div
              key={exp.id.toString()}
              data-ocid={`admin.experience.item.${idx + 1}`}
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg"
              style={{
                background: "rgba(0,212,255,0.02)",
                border: "1px solid rgba(0,212,255,0.1)",
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="font-mono-code text-xs px-2 py-0.5 rounded flex-shrink-0"
                    style={{
                      background: `${exp.accentColor}20`,
                      border: `1px solid ${exp.accentColor}40`,
                      color: exp.accentColor,
                    }}
                  >
                    {exp.badge}
                  </span>
                  <span
                    className="font-body text-sm font-medium truncate"
                    style={{ color: "#e8f4f8" }}
                  >
                    {exp.title}
                  </span>
                </div>
                <span
                  className="font-mono-code text-xs"
                  style={{ color: "rgba(0,212,255,0.45)" }}
                >
                  {exp.company} · {exp.date}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {confirmDelete === exp.id ? (
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono-code text-xs"
                      style={{ color: "#ff6060" }}
                    >
                      Confirm?
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDelete(exp.id)}
                      disabled={deleteMutation.isPending}
                      className="px-2 py-1 rounded text-xs font-body"
                      style={{
                        background: "rgba(255,60,60,0.15)",
                        border: "1px solid rgba(255,60,60,0.3)",
                        color: "#ff6060",
                      }}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(null)}
                      className="px-2 py-1 rounded text-xs font-body"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(232,244,248,0.5)",
                      }}
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      data-ocid={`admin.experience.edit_button.${idx + 1}`}
                      onClick={() => handleEdit(exp)}
                      className="p-1.5 rounded transition-colors duration-200"
                      style={{ color: "rgba(0,212,255,0.5)" }}
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      data-ocid={`admin.experience.delete_button.${idx + 1}`}
                      onClick={() => setConfirmDelete(exp.id)}
                      className="p-1.5 rounded transition-colors duration-200"
                      style={{ color: "rgba(255,100,100,0.5)" }}
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          data-ocid="admin.experience.empty_state"
          className="text-center py-12"
          style={{ color: "rgba(0,212,255,0.35)" }}
        >
          <Terminal className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="font-mono-code text-xs">NO_EXPERIENCES_FOUND</p>
          <p
            className="font-mono-code text-xs mt-1"
            style={{ color: "rgba(0,212,255,0.25)" }}
          >
            Click ADD EXPERIENCE to create the first entry
          </p>
        </div>
      )}
    </div>
  );
}

// ── Skills Tab ─────────────────────────────────────────────────────────
function SkillsTab() {
  const { data: categories, isLoading } = useGetSkillCategories();
  const { mutate: initData } = useInitializeData();
  const updateMutation = useUpdateSkillCategory();

  // Local form state: map from category id to its skills list
  const [localCategories, setLocalCategories] = useState<SkillCategory[]>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: fire-and-forget initialization on mount
  useEffect(() => {
    try {
      initData();
    } catch {
      // fire-and-forget
    }
  }, []);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setLocalCategories(
        categories.map((cat) => ({
          ...cat,
          skills: cat.skills.map((s) => ({ ...s })),
        })),
      );
    }
  }, [categories]);

  const handleSkillChange = (
    catIndex: number,
    skillIndex: number,
    field: "name" | "level",
    value: string,
  ) => {
    setLocalCategories((prev) => {
      const updated = prev.map((cat, ci) => {
        if (ci !== catIndex) return cat;
        const skills = cat.skills.map((s, si) => {
          if (si !== skillIndex) return s;
          return {
            ...s,
            [field]: field === "level" ? BigInt(Number(value) || 0) : value,
          };
        });
        return { ...cat, skills };
      });
      return updated;
    });
  };

  const handleAddSkill = (catIndex: number) => {
    setLocalCategories((prev) =>
      prev.map((cat, ci) => {
        if (ci !== catIndex) return cat;
        return {
          ...cat,
          skills: [...cat.skills, { name: "", level: BigInt(75) }],
        };
      }),
    );
  };

  const handleRemoveSkill = (catIndex: number, skillIndex: number) => {
    setLocalCategories((prev) =>
      prev.map((cat, ci) => {
        if (ci !== catIndex) return cat;
        return {
          ...cat,
          skills: cat.skills.filter((_, si) => si !== skillIndex),
        };
      }),
    );
  };

  const handleSaveCategory = async (cat: SkillCategory) => {
    try {
      await updateMutation.mutateAsync({
        id: cat.id,
        name: cat.name,
        accentColor: cat.accentColor,
        skills: cat.skills.map((s) => ({
          name: s.name,
          level: s.level,
        })) as Skill[],
      });
      toast.success(`${cat.name} saved`);
    } catch {
      toast.error("Failed to save skills");
    }
  };

  if (isLoading) {
    return (
      <div
        data-ocid="admin.skills.loading_state"
        className="flex items-center justify-center py-20 gap-3"
      >
        <Loader2
          className="w-5 h-5 animate-spin"
          style={{ color: "#00d4ff" }}
        />
        <span
          className="font-mono-code text-sm"
          style={{ color: "rgba(0,212,255,0.5)" }}
        >
          LOADING_SKILLS...
        </span>
      </div>
    );
  }

  const COLORS = ["#00d4ff", "#a855f7", "#00ff88"];

  return (
    <div className="space-y-8">
      {localCategories.map((cat, catIndex) => {
        const color = COLORS[catIndex % COLORS.length];
        return (
          <div
            key={cat.id.toString()}
            data-ocid={`admin.skills.category.${catIndex + 1}`}
            className="rounded-xl p-5"
            style={{
              background: `${color}08`,
              border: `1px solid ${color}25`,
            }}
          >
            {/* Category header */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 6px ${color}`,
                }}
              />
              <h3
                className="font-display font-bold text-sm tracking-wider"
                style={{ color }}
              >
                {cat.name}
              </h3>
              <span
                className="font-mono-code text-xs"
                style={{ color: `${color}60` }}
              >
                ({cat.skills.length} skills)
              </span>
            </div>

            {/* Skill rows */}
            <div className="space-y-2 mb-4">
              {cat.skills.map((skill, skillIndex) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skill list uses index as stable key within editing session
                <div key={skillIndex} className="flex items-center gap-2">
                  <input
                    type="text"
                    data-ocid={`admin.skills.skill_name_input.${skillIndex + 1}`}
                    value={skill.name}
                    onChange={(e) =>
                      handleSkillChange(
                        catIndex,
                        skillIndex,
                        "name",
                        e.target.value,
                      )
                    }
                    placeholder="Skill name"
                    className="flex-1 px-3 py-2 rounded-lg font-body text-sm"
                    style={inputStyle}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                  />
                  <input
                    type="number"
                    data-ocid={`admin.skills.skill_level_input.${skillIndex + 1}`}
                    value={Number(skill.level)}
                    min={0}
                    max={100}
                    onChange={(e) =>
                      handleSkillChange(
                        catIndex,
                        skillIndex,
                        "level",
                        e.target.value,
                      )
                    }
                    className="w-20 px-3 py-2 rounded-lg font-mono-code text-sm"
                    style={inputStyle}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                  />
                  <span
                    className="font-mono-code text-xs w-6"
                    style={{ color: `${color}80` }}
                  >
                    %
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(catIndex, skillIndex)}
                    className="p-1.5 rounded transition-colors duration-200"
                    style={{ color: "rgba(255,100,100,0.5)" }}
                    title="Remove skill"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleAddSkill(catIndex)}
                className="px-3 py-1.5 rounded-lg font-body text-xs flex items-center gap-1.5 transition-all duration-200"
                style={{
                  background: `${color}10`,
                  border: `1px solid ${color}30`,
                  color,
                }}
              >
                <Plus className="w-3 h-3" />
                Add Skill
              </button>
              <button
                type="button"
                data-ocid={`admin.skills.save_button.${catIndex + 1}`}
                disabled={updateMutation.isPending}
                onClick={() => handleSaveCategory(cat)}
                className="px-5 py-1.5 rounded-lg font-display font-bold text-xs tracking-wider flex items-center gap-2 transition-all duration-300"
                style={{
                  background: updateMutation.isPending
                    ? `${color}08`
                    : `${color}15`,
                  border: `1px solid ${color}40`,
                  color: updateMutation.isPending ? `${color}40` : color,
                  boxShadow: updateMutation.isPending
                    ? "none"
                    : `0 0 16px ${color}15`,
                }}
              >
                {updateMutation.isPending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : null}
                SAVE {cat.name.toUpperCase()}
              </button>
            </div>
          </div>
        );
      })}

      {localCategories.length === 0 && (
        <div
          data-ocid="admin.skills.empty_state"
          className="text-center py-12"
          style={{ color: "rgba(0,212,255,0.35)" }}
        >
          <Terminal className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="font-mono-code text-xs">NO_SKILL_CATEGORIES_FOUND</p>
          <p
            className="font-mono-code text-xs mt-1"
            style={{ color: "rgba(0,212,255,0.25)" }}
          >
            Skills are initializing...
          </p>
        </div>
      )}
    </div>
  );
}

// ── Profile Tab ────────────────────────────────────────────────────────
function ProfileTab() {
  const { data: profileMeta, isLoading } = useGetProfileMeta();
  const updateMutation = useUpdateProfileMeta();

  const [form, setForm] = useState({
    profileImageUrl: "",
    instagram: "",
    currentlyBuilding: "",
  });

  useEffect(() => {
    if (profileMeta) {
      setForm({
        profileImageUrl: profileMeta.profileImageUrl,
        instagram: profileMeta.instagram,
        currentlyBuilding: profileMeta.currentlyBuilding,
      });
    }
  }, [profileMeta]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync({
        profileImageUrl: form.profileImageUrl,
        instagram: form.instagram,
        currentlyBuilding: form.currentlyBuilding,
      });
      toast.success("Profile settings saved");
    } catch {
      toast.error("Failed to save profile settings");
    }
  };

  if (isLoading) {
    return (
      <div
        data-ocid="admin.profile.loading_state"
        className="flex items-center justify-center py-20 gap-3"
      >
        <Loader2
          className="w-5 h-5 animate-spin"
          style={{ color: "#00d4ff" }}
        />
        <span
          className="font-mono-code text-sm"
          style={{ color: "rgba(0,212,255,0.5)" }}
        >
          LOADING_PROFILE...
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-5 max-w-2xl">
      <div className="space-y-1.5">
        <label
          htmlFor="profile-image-url"
          className="font-mono-code text-xs"
          style={{ color: "rgba(0,212,255,0.7)" }}
        >
          PROFILE IMAGE URL
        </label>
        <input
          id="profile-image-url"
          name="profileImageUrl"
          type="text"
          data-ocid="admin.profile.image_url_input"
          value={form.profileImageUrl}
          onChange={handleChange}
          placeholder="https://your-image-url.com/photo.jpg"
          className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
          style={inputStyle}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
        />
        {form.profileImageUrl && (
          <div className="mt-2 flex items-center gap-3">
            <img
              src={form.profileImageUrl}
              alt="Profile preview"
              className="w-16 h-16 rounded-full object-cover"
              style={{
                border: "2px solid rgba(0,212,255,0.3)",
                boxShadow: "0 0 12px rgba(0,212,255,0.1)",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <span
              className="font-mono-code text-xs"
              style={{ color: "rgba(0,212,255,0.5)" }}
            >
              IMAGE_PREVIEW
            </span>
          </div>
        )}
        <p
          className="font-mono-code text-xs"
          style={{ color: "rgba(232,244,248,0.3)" }}
        >
          Direct image URL. Leave empty to show HG initials.
        </p>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="profile-instagram"
          className="font-mono-code text-xs"
          style={{ color: "rgba(0,212,255,0.7)" }}
        >
          INSTAGRAM URL
        </label>
        <input
          id="profile-instagram"
          name="instagram"
          type="text"
          data-ocid="admin.profile.instagram_input"
          value={form.instagram}
          onChange={handleChange}
          placeholder="https://instagram.com/yourhandle"
          className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
          style={inputStyle}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="profile-currently-building"
          className="font-mono-code text-xs"
          style={{ color: "rgba(0,212,255,0.7)" }}
        >
          CURRENTLY BUILDING (shown in hero section)
        </label>
        <input
          id="profile-currently-building"
          name="currentlyBuilding"
          type="text"
          data-ocid="admin.profile.currently_building_input"
          value={form.currentlyBuilding}
          onChange={handleChange}
          placeholder="AI-Powered Robotic System with Mobile Vision Integration"
          className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
          style={inputStyle}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
        />
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          data-ocid="admin.profile.save_button"
          disabled={updateMutation.isPending}
          className="px-8 py-2.5 rounded-lg font-display font-bold text-sm tracking-wider transition-all duration-300 flex items-center gap-2"
          style={{
            background: updateMutation.isPending
              ? "rgba(0,212,255,0.06)"
              : "rgba(0,212,255,0.12)",
            border: "1px solid rgba(0,212,255,0.4)",
            color: updateMutation.isPending ? "rgba(0,212,255,0.4)" : "#00d4ff",
            boxShadow: updateMutation.isPending
              ? "none"
              : "0 0 20px rgba(0,212,255,0.15)",
          }}
        >
          {updateMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : null}
          SAVE PROFILE
        </button>

        {updateMutation.isSuccess && (
          <div
            data-ocid="admin.profile.success_state"
            className="flex items-center gap-1.5 font-mono-code text-xs"
            style={{ color: "#00ff88" }}
          >
            <CheckCircle2 className="w-4 h-4" />
            SAVED
          </div>
        )}
        {updateMutation.isError && (
          <div
            data-ocid="admin.profile.error_state"
            className="flex items-center gap-1.5 font-mono-code text-xs"
            style={{ color: "#ff6060" }}
          >
            <AlertCircle className="w-4 h-4" />
            SAVE_FAILED
          </div>
        )}
      </div>
    </form>
  );
}

// ── Messages Tab ───────────────────────────────────────────────────────
function MessagesTab() {
  const { data: contacts, isLoading } = useGetAllContacts();

  const sorted = contacts
    ? [...contacts].sort((a, b) => Number(b.timestamp - a.timestamp))
    : [];

  if (isLoading) {
    return (
      <div
        data-ocid="admin.messages.loading_state"
        className="flex items-center justify-center py-20 gap-3"
      >
        <Loader2
          className="w-5 h-5 animate-spin"
          style={{ color: "#00d4ff" }}
        />
        <span
          className="font-mono-code text-sm"
          style={{ color: "rgba(0,212,255,0.5)" }}
        >
          LOADING_MESSAGES...
        </span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Mail className="w-4 h-4" style={{ color: "#00d4ff" }} />
        <span
          className="font-mono-code text-xs"
          style={{ color: "rgba(0,212,255,0.6)" }}
        >
          {sorted.length} MESSAGE{sorted.length !== 1 ? "S" : ""}_RECEIVED
        </span>
      </div>

      {sorted.length === 0 ? (
        <div
          data-ocid="admin.messages.empty_state"
          className="text-center py-12"
          style={{ color: "rgba(0,212,255,0.35)" }}
        >
          <MessageSquare className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="font-mono-code text-xs">NO_MESSAGES_YET</p>
          <p
            className="font-mono-code text-xs mt-1"
            style={{ color: "rgba(0,212,255,0.25)" }}
          >
            Contact form submissions will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((contact, idx) => {
            const ts = Number(contact.timestamp / BigInt(1_000_000));
            const dateStr = new Date(ts).toLocaleString();
            const contactKey = `${contact.email}-${contact.timestamp.toString()}`;
            return (
              <div
                key={contactKey}
                data-ocid={`admin.messages.item.${idx + 1}`}
                className="rounded-lg p-5 relative"
                style={{
                  background: "rgba(0,212,255,0.02)",
                  border: "1px solid rgba(0,212,255,0.1)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-lg"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,212,255,0.4), transparent)",
                  }}
                />
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span
                      className="font-display font-bold text-sm"
                      style={{ color: "#e8f4f8" }}
                    >
                      {contact.name}
                    </span>
                    <span
                      className="font-mono-code text-xs ml-3"
                      style={{ color: "rgba(0,212,255,0.6)" }}
                    >
                      {contact.email}
                    </span>
                  </div>
                  <span
                    className="font-mono-code text-xs flex-shrink-0"
                    style={{ color: "rgba(232,244,248,0.3)" }}
                  >
                    {dateStr}
                  </span>
                </div>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "rgba(232,244,248,0.7)" }}
                >
                  {contact.message}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Security Tab ───────────────────────────────────────────────────────
function SecurityTab() {
  const changePasswordMutation = useChangeAdminPassword();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormError("");
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSuccess(false);

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setFormError("All fields are required.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setFormError("New passwords do not match.");
      return;
    }
    if (form.newPassword.length < 6) {
      setFormError("New password must be at least 6 characters.");
      return;
    }

    try {
      const result = await changePasswordMutation.mutateAsync({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      if (result) {
        setSuccess(true);
        setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        toast.success("Password changed successfully");
      } else {
        setFormError("Incorrect current password.");
      }
    } catch {
      setFormError("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="max-w-md">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-4 h-4" style={{ color: "#00d4ff" }} />
        <span
          className="font-display font-bold text-sm tracking-wider"
          style={{ color: "#e8f4f8" }}
        >
          CHANGE PASSWORD
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="sec-current-pw"
            className="font-mono-code text-xs"
            style={{ color: "rgba(0,212,255,0.7)" }}
          >
            CURRENT PASSWORD
          </label>
          <input
            id="sec-current-pw"
            name="currentPassword"
            type="password"
            data-ocid="admin.security.current_password_input"
            value={form.currentPassword}
            onChange={handleChange}
            placeholder="Enter current password"
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="sec-new-pw"
            className="font-mono-code text-xs"
            style={{ color: "rgba(0,212,255,0.7)" }}
          >
            NEW PASSWORD
          </label>
          <input
            id="sec-new-pw"
            name="newPassword"
            type="password"
            data-ocid="admin.security.new_password_input"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="sec-confirm-pw"
            className="font-mono-code text-xs"
            style={{ color: "rgba(0,212,255,0.7)" }}
          >
            CONFIRM NEW PASSWORD
          </label>
          <input
            id="sec-confirm-pw"
            name="confirmPassword"
            type="password"
            data-ocid="admin.security.confirm_password_input"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>

        {formError && (
          <div
            data-ocid="admin.security.error_state"
            className="flex items-center gap-2 text-xs font-mono-code px-3 py-2 rounded"
            style={{
              background: "rgba(255,60,60,0.08)",
              border: "1px solid rgba(255,60,60,0.25)",
              color: "#ff6060",
            }}
          >
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            {formError}
          </div>
        )}

        {success && (
          <div
            data-ocid="admin.security.success_state"
            className="flex items-center gap-2 text-xs font-mono-code px-3 py-2 rounded"
            style={{
              background: "rgba(0,255,136,0.08)",
              border: "1px solid rgba(0,255,136,0.25)",
              color: "#00ff88",
            }}
          >
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
            PASSWORD_CHANGED :: SUCCESS
          </div>
        )}

        <button
          type="submit"
          data-ocid="admin.security.change_password_button"
          disabled={changePasswordMutation.isPending}
          className="w-full py-3 rounded-lg font-display font-bold text-sm tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
          style={{
            background: changePasswordMutation.isPending
              ? "rgba(0,212,255,0.06)"
              : "rgba(0,212,255,0.12)",
            border: "1px solid rgba(0,212,255,0.4)",
            color: changePasswordMutation.isPending
              ? "rgba(0,212,255,0.4)"
              : "#00d4ff",
            boxShadow: changePasswordMutation.isPending
              ? "none"
              : "0 0 20px rgba(0,212,255,0.15)",
          }}
        >
          {changePasswordMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : null}
          CHANGE PASSWORD
        </button>
      </form>

      <div
        className="mt-6 p-4 rounded-lg"
        style={{
          background: "rgba(232,244,248,0.02)",
          border: "1px solid rgba(232,244,248,0.08)",
        }}
      >
        <p
          className="font-mono-code text-xs"
          style={{ color: "rgba(232,244,248,0.3)" }}
        >
          NOTE: Password recovery via OTP requires email, which is not enabled
          on this plan. Keep your password stored securely.
        </p>
      </div>
    </div>
  );
}

// ── Media Tab ──────────────────────────────────────────────────────────
type MediaFormState = {
  id?: bigint;
  title: string;
  category: string;
  caption: string;
  mediaUrl: string;
  mediaType: string;
  itemOrder: string;
};

const MEDIA_CATEGORIES = [
  "Travel Photography",
  "Cinematic Reels",
  "Drone Shots",
  "Short Vlogs",
];

const MEDIA_TYPES = ["Photo", "Reel", "Drone", "Vlog"];

const defaultMediaForm: MediaFormState = {
  title: "",
  category: "Travel Photography",
  caption: "",
  mediaUrl: "",
  mediaType: "Photo",
  itemOrder: "0",
};

function MediaForm({
  initial,
  isEditing,
  onSubmit,
  onCancel,
  isPending,
}: {
  initial: MediaFormState;
  isEditing: boolean;
  onSubmit: (data: MediaFormState) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [form, setForm] = useState<MediaFormState>(initial);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="rounded-xl p-6 mb-6 space-y-4"
      style={{
        background: "rgba(168,85,247,0.03)",
        border: "1px solid rgba(168,85,247,0.15)",
      }}
    >
      <div className="flex items-center justify-between">
        <h3
          className="font-display font-bold text-sm tracking-wider"
          style={{ color: "#a855f7" }}
        >
          {isEditing ? "// EDIT_MEDIA" : "// NEW_MEDIA"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          style={{ color: "rgba(232,244,248,0.4)" }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="media-title"
            className="font-mono-code text-xs"
            style={{ color: "rgba(168,85,247,0.8)" }}
          >
            TITLE
          </label>
          <input
            id="media-title"
            name="title"
            type="text"
            data-ocid="admin.media.title_input"
            value={form.title}
            onChange={handleChange}
            placeholder="Media title"
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="media-category"
            className="font-mono-code text-xs"
            style={{ color: "rgba(168,85,247,0.8)" }}
          >
            CATEGORY
          </label>
          <select
            id="media-category"
            name="category"
            data-ocid="admin.media.category_select"
            value={form.category}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          >
            {MEDIA_CATEGORIES.map((cat) => (
              <option
                key={cat}
                value={cat}
                style={{ background: "#060b18", color: "#e8f4f8" }}
              >
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="media-url"
          className="font-mono-code text-xs"
          style={{ color: "rgba(168,85,247,0.8)" }}
        >
          MEDIA URL (Image / Video link)
        </label>
        <input
          id="media-url"
          name="mediaUrl"
          type="text"
          data-ocid="admin.media.url_input"
          value={form.mediaUrl}
          onChange={handleChange}
          placeholder="https://your-image-or-video-url.com/..."
          className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
          style={inputStyle}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
        />
        {form.mediaUrl && form.mediaUrl !== "" && (
          <div className="mt-2">
            <img
              src={form.mediaUrl}
              alt="Media preview"
              className="w-20 h-14 rounded object-cover"
              style={{
                border: "1px solid rgba(168,85,247,0.3)",
                boxShadow: "0 0 8px rgba(168,85,247,0.1)",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="media-caption"
          className="font-mono-code text-xs"
          style={{ color: "rgba(168,85,247,0.8)" }}
        >
          CAPTION
        </label>
        <input
          id="media-caption"
          name="caption"
          type="text"
          data-ocid="admin.media.caption_input"
          value={form.caption}
          onChange={handleChange}
          placeholder="Short caption for this media"
          className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
          style={inputStyle}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="media-type"
            className="font-mono-code text-xs"
            style={{ color: "rgba(168,85,247,0.8)" }}
          >
            MEDIA TYPE
          </label>
          <select
            id="media-type"
            name="mediaType"
            data-ocid="admin.media.type_select"
            value={form.mediaType}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg font-body text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          >
            {MEDIA_TYPES.map((t) => (
              <option
                key={t}
                value={t}
                style={{ background: "#060b18", color: "#e8f4f8" }}
              >
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="media-order"
            className="font-mono-code text-xs"
            style={{ color: "rgba(168,85,247,0.8)" }}
          >
            ORDER (display position)
          </label>
          <input
            id="media-order"
            name="itemOrder"
            type="number"
            data-ocid="admin.media.order_input"
            value={form.itemOrder}
            onChange={handleChange}
            placeholder="0"
            min={0}
            className="w-full px-3 py-2.5 rounded-lg font-mono-code text-sm"
            style={inputStyle}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          data-ocid="admin.media.save_button"
          disabled={isPending}
          onClick={() => onSubmit(form)}
          className="px-6 py-2.5 rounded-lg font-display font-bold text-xs tracking-wider transition-all duration-300 flex items-center gap-2"
          style={{
            background: isPending
              ? "rgba(168,85,247,0.04)"
              : "rgba(168,85,247,0.12)",
            border: "1px solid rgba(168,85,247,0.35)",
            color: isPending ? "rgba(168,85,247,0.4)" : "#a855f7",
            boxShadow: isPending ? "none" : "0 0 16px rgba(168,85,247,0.12)",
          }}
        >
          {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
          {isEditing ? "UPDATE MEDIA" : "ADD MEDIA"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-lg font-body text-xs transition-all duration-200"
          style={{
            background: "transparent",
            border: "1px solid rgba(232,244,248,0.1)",
            color: "rgba(232,244,248,0.5)",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function MediaTab() {
  const { data: mediaItems, isLoading } = useGetAllMediaItems();
  const addMutation = useAddMediaItem();
  const updateMutation = useUpdateMediaItem();
  const deleteMutation = useDeleteMediaItem();

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<bigint | null>(null);

  const isPending = addMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (data: MediaFormState) => {
    try {
      const itemOrder = BigInt(Number(data.itemOrder) || 0);
      if (editingItem) {
        await updateMutation.mutateAsync({
          id: editingItem.id,
          title: data.title,
          category: data.category,
          caption: data.caption,
          mediaUrl: data.mediaUrl,
          mediaType: data.mediaType,
          itemOrder,
        });
        toast.success("Media item updated");
      } else {
        await addMutation.mutateAsync({
          title: data.title,
          category: data.category,
          caption: data.caption,
          mediaUrl: data.mediaUrl,
          mediaType: data.mediaType,
          itemOrder,
        });
        toast.success("Media item added");
      }
      setShowForm(false);
      setEditingItem(null);
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleEdit = (item: MediaItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Media item deleted");
      setConfirmDelete(null);
    } catch {
      toast.error("Failed to delete media item");
    }
  };

  const formInitial: MediaFormState = editingItem
    ? {
        id: editingItem.id,
        title: editingItem.title,
        category: editingItem.category,
        caption: editingItem.caption,
        mediaUrl: editingItem.mediaUrl,
        mediaType: editingItem.mediaType,
        itemOrder: Number(editingItem.itemOrder).toString(),
      }
    : defaultMediaForm;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3
          className="font-mono-code text-xs"
          style={{ color: "rgba(168,85,247,0.6)" }}
        >
          {mediaItems?.length ?? 0} MEDIA_ITEMS_IN_DB
        </h3>
        <button
          type="button"
          data-ocid="admin.media.add_button"
          onClick={() => {
            setEditingItem(null);
            setShowForm(true);
          }}
          className="px-4 py-2 rounded-lg font-display font-bold text-xs tracking-wider transition-all duration-300 flex items-center gap-2"
          style={{
            background: "rgba(168,85,247,0.1)",
            border: "1px solid rgba(168,85,247,0.3)",
            color: "#a855f7",
            boxShadow: "0 0 14px rgba(168,85,247,0.1)",
          }}
        >
          <Plus className="w-3.5 h-3.5" />
          ADD MEDIA
        </button>
      </div>

      {showForm && (
        <MediaForm
          key={editingItem?.id?.toString() ?? "new"}
          initial={formInitial}
          isEditing={!!editingItem}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
          isPending={isPending}
        />
      )}

      {isLoading ? (
        <div
          data-ocid="admin.media.loading_state"
          className="flex items-center justify-center py-12 gap-3"
        >
          <Loader2
            className="w-5 h-5 animate-spin"
            style={{ color: "#a855f7" }}
          />
          <span
            className="font-mono-code text-xs"
            style={{ color: "rgba(168,85,247,0.5)" }}
          >
            LOADING_MEDIA...
          </span>
        </div>
      ) : mediaItems && mediaItems.length > 0 ? (
        <div className="space-y-3">
          {mediaItems.map((item, idx) => (
            <div
              key={item.id.toString()}
              data-ocid={`admin.media.item.${idx + 1}`}
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg"
              style={{
                background: "rgba(168,85,247,0.02)",
                border: "1px solid rgba(168,85,247,0.1)",
              }}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Thumbnail */}
                {item.mediaUrl && item.mediaUrl !== "" ? (
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="w-10 h-10 rounded object-cover flex-shrink-0"
                    style={{
                      border: "1px solid rgba(168,85,247,0.3)",
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(168,85,247,0.1)",
                      border: "1px solid rgba(168,85,247,0.2)",
                    }}
                  >
                    <Film
                      className="w-4 h-4"
                      style={{ color: "rgba(168,85,247,0.5)" }}
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="font-body text-sm font-medium truncate"
                      style={{ color: "#e8f4f8" }}
                    >
                      {item.title}
                    </span>
                    <span
                      className="font-mono-code text-xs px-1.5 py-0.5 rounded flex-shrink-0"
                      style={{
                        background: "rgba(168,85,247,0.1)",
                        border: "1px solid rgba(168,85,247,0.2)",
                        color: "#a855f7",
                      }}
                    >
                      {item.mediaType}
                    </span>
                  </div>
                  <span
                    className="font-mono-code text-xs"
                    style={{ color: "rgba(168,85,247,0.5)" }}
                  >
                    {item.category} · #{Number(item.itemOrder)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {confirmDelete === item.id ? (
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono-code text-xs"
                      style={{ color: "#ff6060" }}
                    >
                      Confirm?
                    </span>
                    <button
                      type="button"
                      data-ocid={`admin.media.confirm_button.${idx + 1}`}
                      onClick={() => handleDelete(item.id)}
                      disabled={deleteMutation.isPending}
                      className="px-2 py-1 rounded text-xs font-body"
                      style={{
                        background: "rgba(255,60,60,0.15)",
                        border: "1px solid rgba(255,60,60,0.3)",
                        color: "#ff6060",
                      }}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      data-ocid={`admin.media.cancel_button.${idx + 1}`}
                      onClick={() => setConfirmDelete(null)}
                      className="px-2 py-1 rounded text-xs font-body"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(232,244,248,0.5)",
                      }}
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      data-ocid={`admin.media.edit_button.${idx + 1}`}
                      onClick={() => handleEdit(item)}
                      className="p-1.5 rounded transition-colors duration-200"
                      style={{ color: "rgba(168,85,247,0.5)" }}
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      data-ocid={`admin.media.delete_button.${idx + 1}`}
                      onClick={() => setConfirmDelete(item.id)}
                      className="p-1.5 rounded transition-colors duration-200"
                      style={{ color: "rgba(255,100,100,0.5)" }}
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          data-ocid="admin.media.empty_state"
          className="text-center py-12"
          style={{ color: "rgba(168,85,247,0.35)" }}
        >
          <Film className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="font-mono-code text-xs">NO_MEDIA_ITEMS_FOUND</p>
          <p
            className="font-mono-code text-xs mt-1"
            style={{ color: "rgba(168,85,247,0.25)" }}
          >
            Click ADD MEDIA to upload your first item
          </p>
        </div>
      )}
    </div>
  );
}

// ── Admin Dashboard ────────────────────────────────────────────────────
function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("resume");

  const tabs: { id: AdminTab; label: string; ocid: string; color: string }[] = [
    {
      id: "resume",
      label: "Resume",
      ocid: "admin.resume_tab",
      color: "#00d4ff",
    },
    {
      id: "blog",
      label: "Blog",
      ocid: "admin.blog_tab",
      color: "#00d4ff",
    },
    {
      id: "projects",
      label: "Projects",
      ocid: "admin.projects_tab",
      color: "#a855f7",
    },
    {
      id: "experience",
      label: "Experience",
      ocid: "admin.experience_tab",
      color: "#00d4ff",
    },
    {
      id: "skills",
      label: "Skills",
      ocid: "admin.skills_tab",
      color: "#00ff88",
    },
    {
      id: "profile",
      label: "Profile",
      ocid: "admin.profile_tab",
      color: "#a855f7",
    },
    {
      id: "messages",
      label: "Messages",
      ocid: "admin.messages_tab",
      color: "#00d4ff",
    },
    {
      id: "media",
      label: "Media",
      ocid: "admin.media_tab",
      color: "#a855f7",
    },
    {
      id: "analytics",
      label: "Analytics",
      ocid: "admin.analytics_tab",
      color: "#00ff88",
    },
    {
      id: "security",
      label: "Security",
      ocid: "admin.security_tab",
      color: "#ff6060",
    },
  ];

  return (
    <div
      data-ocid="admin.page"
      className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#060b18" }}
    >
      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 15%, rgba(0,212,255,0.03) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 pt-8">
          <span className="section-label">ADMIN_CONSOLE</span>
          <h1
            className="font-display font-bold mt-2"
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              color: "#e8f4f8",
            }}
          >
            <span style={{ color: "rgba(0,212,255,0.4)" }}>&#47;&#47; </span>
            CONTROL{" "}
            <span
              style={{
                color: "#00d4ff",
                textShadow:
                  "0 0 20px rgba(0,212,255,0.5), 0 0 40px rgba(0,212,255,0.2)",
              }}
            >
              PANEL
            </span>
          </h1>
          <p
            className="font-mono-code text-xs mt-2"
            style={{ color: "rgba(0,212,255,0.4)" }}
          >
            SYSTEM::ACTIVE | ACCESS_LEVEL::ADMIN | SESSION::SECURED
          </p>
        </div>

        {/* Tab switcher */}
        <div
          className="flex flex-wrap gap-1 mb-8 rounded-lg p-1"
          style={{
            border: "1px solid rgba(0,212,255,0.15)",
            background: "rgba(6,11,24,0.6)",
          }}
        >
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              data-ocid={tab.ocid}
              onClick={() => setActiveTab(tab.id)}
              className="py-2 px-3 rounded font-display font-bold text-xs tracking-wider transition-all duration-300 relative"
              style={{
                color:
                  activeTab === tab.id ? tab.color : "rgba(232,244,248,0.4)",
                background:
                  activeTab === tab.id ? `${tab.color}15` : "transparent",
                boxShadow:
                  activeTab === tab.id ? `0 0 10px ${tab.color}20` : "none",
                border:
                  activeTab === tab.id
                    ? `1px solid ${tab.color}40`
                    : "1px solid transparent",
              }}
            >
              {tab.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          className="rounded-xl p-6 sm:p-8"
          style={{
            background: "rgba(6,11,24,0.5)",
            border: "1px solid rgba(0,212,255,0.1)",
            backdropFilter: "blur(12px)",
          }}
        >
          {activeTab === "resume" && <ResumeTab />}
          {activeTab === "blog" && <BlogTab />}
          {activeTab === "projects" && <ProjectsTab />}
          {activeTab === "experience" && <ExperienceTab />}
          {activeTab === "skills" && <SkillsTab />}
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "messages" && <MessagesTab />}
          {activeTab === "media" && <MediaTab />}
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "security" && <SecurityTab />}
        </div>
      </div>
    </div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return <LoginPanel onSuccess={() => setAuthenticated(true)} />;
  }

  return <AdminDashboard />;
}
