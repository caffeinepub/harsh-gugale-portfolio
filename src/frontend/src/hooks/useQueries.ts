import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AnalyticsData,
  BlogPost,
  ContactSubmission,
  Experience,
  MediaItem,
  ProfileMeta,
  Project,
  ResumeContent,
  Skill,
  SkillCategory,
} from "../backend.d";
import { useActor } from "./useActor";

// ── Projects ──────────────────────────────────────────────────────────
export function useGetAllProjects() {
  const { actor, isFetching } = useActor();
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Blog Posts ────────────────────────────────────────────────────────
export function useGetAllPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFeaturedPost() {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost | null>({
    queryKey: ["featuredPost"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getFeaturedPost();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPostsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["posts", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === "All") return actor.getAllPosts();
      return actor.getPostsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Resume Content ────────────────────────────────────────────────────
export function useGetResumeContent() {
  const { actor, isFetching } = useActor();
  return useQuery<ResumeContent>({
    queryKey: ["resumeContent"],
    queryFn: async () => {
      if (!actor)
        return {
          name: "",
          tagline: "",
          about: "",
          careerObjective: "",
          resumeFileUrl: "",
          email: "",
          linkedin: "",
          github: "",
        };
      return actor.getResumeContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateResumeContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ResumeContent) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.updateResumeContent(
        data.name,
        data.tagline,
        data.about,
        data.careerObjective,
        data.resumeFileUrl,
        data.email,
        data.linkedin,
        data.github,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumeContent"] });
    },
  });
}

// ── Blog Post Mutations ────────────────────────────────────────────────
export function useAddBlogPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      category: string;
      summary: string;
      content: string;
      author: string;
      isFeatured: boolean;
      fileUrl: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      const publishedAt = BigInt(Date.now()) * BigInt(1_000_000);
      return actor.addBlogPost(
        data.title,
        data.category,
        data.summary,
        data.content,
        data.author,
        publishedAt,
        data.isFeatured,
        data.fileUrl,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["featuredPost"] });
    },
  });
}

export function useUpdateBlogPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      title: string;
      category: string;
      summary: string;
      content: string;
      author: string;
      publishedAt: bigint;
      isFeatured: boolean;
      fileUrl: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.updateBlogPost(
        data.id,
        data.title,
        data.category,
        data.summary,
        data.content,
        data.author,
        data.publishedAt,
        data.isFeatured,
        data.fileUrl,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["featuredPost"] });
    },
  });
}

export function useDeleteBlogPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.deleteBlogPost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["featuredPost"] });
    },
  });
}

// ── Project Mutations ─────────────────────────────────────────────────
export function useAddProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      techStack: string[];
      description: string;
      category: string;
      githubUrl: string;
      demoUrl: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.addProject(
        data.title,
        data.techStack,
        data.description,
        data.category,
        data.githubUrl,
        data.demoUrl,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      title: string;
      techStack: string[];
      description: string;
      category: string;
      githubUrl: string;
      demoUrl: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.updateProject(
        data.id,
        data.title,
        data.techStack,
        data.description,
        data.category,
        data.githubUrl,
        data.demoUrl,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.deleteProject(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

// ── Analytics ─────────────────────────────────────────────────────────
export function useGetAnalytics() {
  const { actor, isFetching } = useActor();
  return useQuery<AnalyticsData>({
    queryKey: ["analytics"],
    queryFn: async () => {
      if (!actor)
        return {
          topBlogs: [],
          topProjects: [],
          visitorCount: BigInt(0),
          resumeDownloadCount: BigInt(0),
        };
      return actor.getAnalytics();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRecordVisit() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      return actor.recordVisit();
    },
  });
}

export function useRecordResumeDownload() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      return actor.recordResumeDownload();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}

export function useRecordBlogView() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) return;
      return actor.recordBlogView(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}

export function useRecordProjectView() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) return;
      return actor.recordProjectView(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}

// ── Blog Initialize ───────────────────────────────────────────────────
export function useInitializeBlogs() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.initializeBlogs();
    },
  });
}

// ── Experiences ───────────────────────────────────────────────────────
export function useGetAllExperiences() {
  const { actor, isFetching } = useActor();
  return useQuery<Experience[]>({
    queryKey: ["experiences"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllExperiences();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddExperience() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      company: string;
      badge: string;
      date: string;
      description: string;
      tags: string[];
      accentColor: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.addExperience(
        data.title,
        data.company,
        data.badge,
        data.date,
        data.description,
        data.tags,
        data.accentColor,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
  });
}

export function useUpdateExperience() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      title: string;
      company: string;
      badge: string;
      date: string;
      description: string;
      tags: string[];
      accentColor: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.updateExperience(
        data.id,
        data.title,
        data.company,
        data.badge,
        data.date,
        data.description,
        data.tags,
        data.accentColor,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
  });
}

export function useDeleteExperience() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.deleteExperience(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
  });
}

export function useInitializeExperiences() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.initializeExperiences();
    },
  });
}

// ── Skill Categories ──────────────────────────────────────────────────
export function useGetSkillCategories() {
  const { actor, isFetching } = useActor();
  return useQuery<SkillCategory[]>({
    queryKey: ["skillCategories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSkillCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateSkillCategory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      name: string;
      accentColor: string;
      skills: Skill[];
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.updateSkillCategory(
        data.id,
        data.name,
        data.accentColor,
        data.skills,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skillCategories"] });
    },
  });
}

export function useInitializeSkills() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.initializeSkills();
    },
  });
}

// ── Profile Meta ──────────────────────────────────────────────────────
export function useGetProfileMeta() {
  const { actor, isFetching } = useActor();
  return useQuery<ProfileMeta>({
    queryKey: ["profileMeta"],
    queryFn: async () => {
      if (!actor)
        return { instagram: "", currentlyBuilding: "", profileImageUrl: "" };
      return actor.getProfileMeta();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateProfileMeta() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ProfileMeta) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.updateProfileMeta(
        data.profileImageUrl,
        data.instagram,
        data.currentlyBuilding,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileMeta"] });
    },
  });
}

// ── Admin Password ────────────────────────────────────────────────────
export function useChangeAdminPassword() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      currentPassword: string;
      newPassword: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.changeAdminPassword(data.currentPassword, data.newPassword);
    },
  });
}

export function useVerifyAdminPassword() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (password: string) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.verifyAdminPassword(password);
    },
  });
}

// ── Contact Messages ──────────────────────────────────────────────────
export function useGetAllContacts() {
  const { actor, isFetching } = useActor();
  return useQuery<ContactSubmission[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContacts();
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Contact Submission ────────────────────────────────────────────────
export function useSubmitContact() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      const timestamp = BigInt(Date.now()) * BigInt(1_000_000);
      return actor.submitContact(name, email, message, timestamp);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}

// ── Initialize All Data ───────────────────────────────────────────────
export function useInitializeData() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.initializeData();
    },
  });
}

// ── Media Items ────────────────────────────────────────────────────────
export function useGetAllMediaItems() {
  const { actor, isFetching } = useActor();
  return useQuery<MediaItem[]>({
    queryKey: ["mediaItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMediaItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddMediaItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      category: string;
      caption: string;
      mediaUrl: string;
      mediaType: string;
      itemOrder: bigint;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.addMediaItem(
        data.title,
        data.category,
        data.caption,
        data.mediaUrl,
        data.mediaType,
        data.itemOrder,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mediaItems"] });
    },
  });
}

export function useUpdateMediaItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      title: string;
      category: string;
      caption: string;
      mediaUrl: string;
      mediaType: string;
      itemOrder: bigint;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.updateMediaItem(
        data.id,
        data.title,
        data.category,
        data.caption,
        data.mediaUrl,
        data.mediaType,
        data.itemOrder,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mediaItems"] });
    },
  });
}

export function useDeleteMediaItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.deleteMediaItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mediaItems"] });
    },
  });
}

export function useInitializeMediaItems() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.initializeMediaItems();
    },
  });
}
