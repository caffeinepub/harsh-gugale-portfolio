import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BlogPost, Project, ResumeContent } from "../backend.d";
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
