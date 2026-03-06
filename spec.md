# Harsh Gugale Portfolio

## Current State
- Full portfolio site with Home, Blog, Media, and Admin pages
- Admin has tabs: Resume, Blog, Projects, Analytics, Experience, Skills, Profile, Messages, Security
- Backend has full CRUD for: blogs, projects, experiences, skills, resume content, profile meta, contacts, analytics
- Hero tagline is **hardcoded** as static text — not reading from backend `resumeContent.tagline`
- Experience section uses fallback hardcoded data when backend is empty; the `initializeData()` call from admin may not have been triggered
- MediaPage is fully static (12 hardcoded items with gradient placeholders, no images)
- No media management in admin — admin cannot add/edit/delete media items

## Requested Changes (Diff)

### Add
- Backend: `MediaItem` type with fields: id, title, category, caption, mediaUrl (link to image/video), mediaType (Photo/Reel/Drone/Vlog), order
- Backend: CRUD for media items: `getAllMediaItems`, `addMediaItem`, `updateMediaItem`, `deleteMediaItem`, `initializeMediaItems`
- Admin tab: "Media" — lets admin add/edit/delete media items with URL, title, category, caption
- Media page now reads from backend (with static fallback for empty state)

### Modify
- HeroSection: read tagline from `resumeContent.tagline` (with static fallback) so admin can edit it from Resume tab
- ExperienceSection: remove stale fallback logic — call `initializeData()` on first load via `useInitializeData` hook to ensure seeding happens, show skeleton while loading
- `useQueries.ts`: add `useInitializeData` hook for the combined init, add media CRUD hooks
- Admin panel: add Media tab between Profile and Messages tabs
- Resume tab in admin: clarify the "TAGLINE" field note — it controls the hero's role text

### Remove
- Static hardcoded `FALLBACK_EXPERIENCES` array dependency when backend is initialized — keep as safety fallback but only show after a proper loading state

## Implementation Plan
1. Update `main.mo` backend to add `MediaItem` type + full CRUD + `initializeMediaItems` + combined `initializeData` call
2. Regenerate `backend.d.ts` with new types/methods
3. Add `useInitializeData`, `useGetAllMediaItems`, `useAddMediaItem`, `useUpdateMediaItem`, `useDeleteMediaItem` hooks to `useQueries.ts`
4. Fix `HeroSection.tsx`: replace hardcoded tagline with `resumeContent?.tagline || "Embedded Systems Engineer | Edge AI Developer | Creative Technologist"`
5. Fix `ExperienceSection.tsx`: call `initializeData` (combined init) on mount instead of just `initializeExperiences`, improve loading state, remove fallback after loading completes
6. Update `MediaPage.tsx`: fetch media items from backend, render real URLs when available, fallback to gradient placeholders when no URL set
7. Add `MediaTab` component to `AdminPage.tsx` with add/edit/delete UI
8. Add "media" to `AdminTab` type and tab navigation
9. Validate and deploy
