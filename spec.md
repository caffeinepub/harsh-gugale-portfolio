# Harsh Gugale Portfolio

## Current State
- Full-stack portfolio with Motoko backend and React frontend
- Admin panel at `/admin` with tabs: Resume Editor, Blog Manager, Projects Manager
- GA4 tracking via `analytics.ts` for resume downloads, blog clicks, project clicks, contact submits
- Backend tracks: contacts, blog posts, projects, resume content
- No in-app analytics counters (visitor count, view counts, resume download count)

## Requested Changes (Diff)

### Add
- **Analytics backend storage**: new Motoko state for tracking:
  - `visitorCount`: incremented on each page visit (via a `recordVisit` update call)
  - `resumeDownloadCount`: incremented when resume is downloaded
  - `blogViewCounts`: Map<Nat, Nat> (blog post id -> view count)
  - `projectViewCounts`: Map<Nat, Nat> (project id -> view count)
- **Backend query methods**: `getAnalytics()` returning all stats in one call
- **Backend update methods**: `recordVisit()`, `recordResumeDownload()`, `recordBlogView(id)`, `recordProjectView(id)`
- **Analytics tab** in admin dashboard: new "Analytics" tab showing:
  - Total visitor count card
  - Resume download count card
  - Top 5 most viewed blog posts list
  - Top 5 most viewed projects list
- **Frontend tracking calls**: wire `recordVisit()` in App.tsx on mount, `recordResumeDownload()` in hero CTA, `recordBlogView()` on blog card click, `recordProjectView()` on project card click

### Modify
- `main.mo`: add analytics state variables and methods
- `backend.d.ts`: add new analytics types and method signatures
- `AdminPage.tsx`: add "Analytics" tab with dashboard panel
- `useQueries.ts`: add hooks for analytics data fetch and mutations
- `App.tsx` or `HomePage.tsx`: call `recordVisit` on mount

### Remove
- Nothing removed

## Implementation Plan
1. Update `main.mo` to add analytics counters (visitorCount, resumeDownloadCount, blogViewCounts, projectViewCounts), plus 4 update methods and 1 combined query `getAnalytics()`
2. Update `backend.d.ts` with `AnalyticsData` type and new method signatures
3. Add `useGetAnalytics`, `useRecordVisit`, `useRecordResumeDownload`, `useRecordBlogView`, `useRecordProjectView` hooks in `useQueries.ts`
4. Wire `recordVisit` call in `App.tsx` once on mount
5. Wire `recordResumeDownload` in hero Download Resume button
6. Wire `recordBlogView` on blog card/read-more click in `BlogPage.tsx`
7. Wire `recordProjectView` on project card view in `HomePage.tsx`
8. Add "Analytics" tab to `AdminPage.tsx` with 4 stat cards and ranked lists
