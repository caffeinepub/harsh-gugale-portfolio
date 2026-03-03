# Harsh Gugale – Embedded Systems Portfolio

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Multi-page portfolio website with React Router (Home, Media, Blog pages)
- Landing/Hero section with animated background, headline, tagline, intro, and two CTA buttons
- About section with glassmorphism card layout describing EV internship, DRDO internship, microcontroller experience, and career objective
- Skills section with categorized glowing cards and animated progress indicators (Core Electronics, Software & Tools, Emerging Technologies)
- Experience section with vertical neon timeline layout representing internship mission logs
- Projects section with grid layout, hover animations, glow borders, and project cards (title, tech stack, description, View Details button)
- Photography & Vlogging page (Media Vault): dark gallery with categories (Travel Photography, Cinematic Reels, Drone Shots, Short Vlogs), hover zoom, glass overlay captions
- Electronics Blog page: featured article, category filters (Embedded Systems, CAN Protocol, AI in Electronics, GATE Preparation), card layout with Read More buttons
- Contact section with futuristic form (Name, Email, Message), glowing Send button, and social links (Email, LinkedIn, GitHub)
- Backend: contact form submission storage, blog posts storage, project listings storage

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Generate Motoko backend with actors for: contact form submissions, blog posts (with categories), and project listings
2. Build React frontend with React Router for multi-page navigation (Home, Media, Blog)
3. Home page: animated circuit/particle background, Hero, About, Skills, Experience, Projects, Contact sections in scroll layout
4. Media page: category-filtered gallery grid with mock cinematic media items
5. Blog page: featured article, category filters, article card grid
6. Apply futuristic design system: deep navy/black background, neon blue/cyan/purple accents, Orbitron font, glassmorphism cards, neon glow borders, subtle animations
7. Responsive layout for desktop and mobile
8. SEO meta tags in index.html
