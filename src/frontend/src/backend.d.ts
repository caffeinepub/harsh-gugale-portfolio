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
export interface ProfileMeta {
    instagram: string;
    currentlyBuilding: string;
    profileImageUrl: string;
}
export interface Skill {
    name: string;
    level: bigint;
}
export interface Experience {
    id: bigint;
    title: string;
    date: string;
    tags: Array<string>;
    description: string;
    accentColor: string;
    company: string;
    badge: string;
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
export interface MediaItem {
    id: bigint;
    title: string;
    itemOrder: bigint;
    mediaUrl: string;
    caption: string;
    mediaType: string;
    category: string;
}
export interface SkillCategory {
    id: bigint;
    name: string;
    accentColor: string;
    skills: Array<Skill>;
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
export interface Project {
    id: bigint;
    title: string;
    description: string;
    githubUrl: string;
    demoUrl: string;
    category: string;
    techStack: Array<string>;
}
export interface AnalyticsData {
    topBlogs: Array<BlogViewStat>;
    topProjects: Array<ProjectViewStat>;
    visitorCount: bigint;
    resumeDownloadCount: bigint;
}
export interface backendInterface {
    addBlogPost(title: string, category: string, summary: string, content: string, author: string, publishedAt: bigint, isFeatured: boolean, fileUrl: string): Promise<bigint>;
    addExperience(title: string, company: string, badge: string, date: string, description: string, tags: Array<string>, accentColor: string): Promise<bigint>;
    addMediaItem(title: string, category: string, caption: string, mediaUrl: string, mediaType: string, itemOrder: bigint): Promise<bigint>;
    addProject(title: string, techStack: Array<string>, description: string, category: string, githubUrl: string, demoUrl: string): Promise<bigint>;
    changeAdminPassword(currentPassword: string, newPassword: string): Promise<boolean>;
    deleteBlogPost(id: bigint): Promise<boolean>;
    deleteExperience(id: bigint): Promise<boolean>;
    deleteMediaItem(id: bigint): Promise<boolean>;
    deleteProject(id: bigint): Promise<boolean>;
    getAllContacts(): Promise<Array<ContactSubmission>>;
    getAllExperiences(): Promise<Array<Experience>>;
    getAllMediaItems(): Promise<Array<MediaItem>>;
    getAllPosts(): Promise<Array<BlogPost>>;
    getAllProjects(): Promise<Array<Project>>;
    getAnalytics(): Promise<AnalyticsData>;
    getFeaturedPost(): Promise<BlogPost | null>;
    getPostsByCategory(category: string): Promise<Array<BlogPost>>;
    getProfileMeta(): Promise<ProfileMeta>;
    getResumeContent(): Promise<ResumeContent>;
    getSkillCategories(): Promise<Array<SkillCategory>>;
    initializeBlogs(): Promise<void>;
    initializeData(): Promise<void>;
    initializeExperiences(): Promise<void>;
    initializeMediaItems(): Promise<void>;
    initializeProjects(): Promise<void>;
    initializeSkills(): Promise<void>;
    recordBlogView(id: bigint): Promise<void>;
    recordProjectView(id: bigint): Promise<void>;
    recordResumeDownload(): Promise<void>;
    recordVisit(): Promise<void>;
    submitContact(name: string, email: string, message: string, timestamp: bigint): Promise<void>;
    updateBlogPost(id: bigint, title: string, category: string, summary: string, content: string, author: string, publishedAt: bigint, isFeatured: boolean, fileUrl: string): Promise<boolean>;
    updateExperience(id: bigint, title: string, company: string, badge: string, date: string, description: string, tags: Array<string>, accentColor: string): Promise<boolean>;
    updateMediaItem(id: bigint, title: string, category: string, caption: string, mediaUrl: string, mediaType: string, itemOrder: bigint): Promise<boolean>;
    updateProfileMeta(profileImageUrl: string, instagram: string, currentlyBuilding: string): Promise<void>;
    updateProject(id: bigint, title: string, techStack: Array<string>, description: string, category: string, githubUrl: string, demoUrl: string): Promise<boolean>;
    updateResumeContent(name: string, tagline: string, about: string, careerObjective: string, resumeFileUrl: string, email: string, linkedin: string, github: string): Promise<void>;
    updateSkillCategory(id: bigint, name: string, accentColor: string, skills: Array<Skill>): Promise<boolean>;
    verifyAdminPassword(password: string): Promise<boolean>;
}
