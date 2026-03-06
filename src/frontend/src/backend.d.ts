import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    publishedAt: bigint;
    author: string;
    summary: string;
    isFeatured: boolean;
    category: string;
    fileUrl: string;
}
export interface BlogViewStat {
    id: bigint;
    title: string;
    viewCount: bigint;
}
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface ProjectViewStat {
    id: bigint;
    title: string;
    viewCount: bigint;
}
export interface Project {
    id: bigint;
    title: string;
    description: string;
    githubUrl: string;
    demoUrl: string;
    category: string;
    techStack: Array<string>;
}
export interface ResumeContent {
    linkedin: string;
    about: string;
    tagline: string;
    name: string;
    email: string;
    careerObjective: string;
    github: string;
    resumeFileUrl: string;
}
export interface AnalyticsData {
    topBlogs: Array<BlogViewStat>;
    topProjects: Array<ProjectViewStat>;
    visitorCount: bigint;
    resumeDownloadCount: bigint;
}
export interface backendInterface {
    addBlogPost(title: string, category: string, summary: string, content: string, author: string, publishedAt: bigint, isFeatured: boolean, fileUrl: string): Promise<bigint>;
    addProject(title: string, techStack: Array<string>, description: string, category: string, githubUrl: string, demoUrl: string): Promise<bigint>;
    deleteBlogPost(id: bigint): Promise<boolean>;
    deleteProject(id: bigint): Promise<boolean>;
    getAllContacts(): Promise<Array<ContactSubmission>>;
    getAllPosts(): Promise<Array<BlogPost>>;
    getAllProjects(): Promise<Array<Project>>;
    getAnalytics(): Promise<AnalyticsData>;
    getFeaturedPost(): Promise<BlogPost | null>;
    getPostsByCategory(category: string): Promise<Array<BlogPost>>;
    getResumeContent(): Promise<ResumeContent>;
    initializeBlogs(): Promise<void>;
    initializeData(): Promise<void>;
    initializeProjects(): Promise<void>;
    recordBlogView(id: bigint): Promise<void>;
    recordProjectView(id: bigint): Promise<void>;
    recordResumeDownload(): Promise<void>;
    recordVisit(): Promise<void>;
    submitContact(name: string, email: string, message: string, timestamp: bigint): Promise<void>;
    updateBlogPost(id: bigint, title: string, category: string, summary: string, content: string, author: string, publishedAt: bigint, isFeatured: boolean, fileUrl: string): Promise<boolean>;
    updateProject(id: bigint, title: string, techStack: Array<string>, description: string, category: string, githubUrl: string, demoUrl: string): Promise<boolean>;
    updateResumeContent(name: string, tagline: string, about: string, careerObjective: string, resumeFileUrl: string, email: string, linkedin: string, github: string): Promise<void>;
}
