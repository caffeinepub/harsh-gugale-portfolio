# Harsh Gugale Portfolio

## Current State
- Full portfolio with backend (Motoko) + React frontend
- Admin panel at `/admin` (password: `harsh2025`) with Resume, Blog, Projects tabs
- Backend stores: ContactSubmission, BlogPost, Project, ResumeContent
- Experience, About bio paragraphs, Skills, Profile Image are ALL hardcoded in frontend components — not editable
- Admin panel has NO contact messages viewer
- Admin panel has NO password reset mechanism
- Admin panel missing tabs for: Experience, About content, Skills, Profile Image

## Requested Changes (Diff)

### Add
- Backend: `ExperienceEntry` type with id, title, company, badge, date, description, tags (array), accent (cyan/purple)
- Backend: `AboutContent` type — bio paragraphs (array of {prefix, text}), protocols (array), status rows (array of {label, value, color})
- Backend: `SkillCategory` type with name and skills array
- Backend: `SiteSettings` type — profileImageUrl, instagram, currentlyBuilding, adminPasswordHash
- Backend: CRUD methods for ExperienceEntry, AboutContent (singleton update), SkillCategory CRUD, SiteSettings update
- Backend: `getAllContacts` is already present, just needs admin panel UI
- Backend: `verifyAdminPassword`, `changeAdminPassword` methods
- Frontend: Admin tabs for "Experience", "About & Skills", "Profile Image", "Messages", "Settings (Password)"
- Frontend: AboutSection, ExperienceSection, SkillsSection, HeroSection read from backend (with fallback defaults)
- Frontend: Password reset using a recovery code stored in SiteSettings (admin sets a recovery email/code)

### Modify
- Backend main.mo: add Experience, About, Skills, SiteSettings actors/storage
- backend.d.ts: add all new types and methods
- useQueries.ts: add hooks for new backend calls
- AboutSection.tsx: read about content from backend
- ExperienceSection.tsx: read experiences from backend
- HeroSection.tsx: read profileImageUrl, instagram, currentlyBuilding from backend
- AdminPage.tsx: add 5 new tabs (Experience, About & Skills, Profile Image, Messages, Password)
- AdminDashboard: expand tabs list

### Remove
- Hardcoded `experiences` array in ExperienceSection.tsx
- Hardcoded about paragraphs/protocols in AboutSection.tsx

## Implementation Plan
1. Rewrite backend/main.mo to add Experience, AboutContent, SkillCategory, SiteSettings with full CRUD
2. Update backend.d.ts with all new types and method signatures
3. Update useQueries.ts with new hooks
4. Refactor AboutSection, ExperienceSection, HeroSection to read from backend with sensible defaults
5. Expand AdminPage with 5 new tabs covering all editable content
6. Password reset: admin can change password from Settings tab by entering old password OR a recovery PIN they set
