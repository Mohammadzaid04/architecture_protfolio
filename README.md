# Architecture Studio Portfolio

A minimalist, high-performance portfolio website for an architecture studio.
Built with **React**, **Vite**, **TypeScript (Strict)**, **Tailwind CSS**, and **React Router**.

---

## Quick Start

### Prerequisites

- Node.js `24.x` (matching `.nvmrc`)
- npm `10.x` or later

### Installation

```bash
npm install
```

### Environment Setup

Copy the example environment configuration:

```bash
cp .env.example .env
```

Set `VITE_CLOUDINARY_CLOUD_NAME` to your Cloudinary cloud name.

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Code Quality & Formatting

```bash
npm run lint          # Run ESLint across TypeScript files
npm run format        # Automatically format files with Prettier
npm run format:check  # Check code formatting without modifying
```

---

## Folder Architecture

```text
src/
├── assets/        # Static images, client SVGs, fonts, and local assets
├── components/
│   ├── common/    # Reusable atomic UI (Button, Container, Section, etc.)
│   ├── layout/    # Structural layout (Navbar, Footer, Layout, ScrollToTop)
│   └── projects/  # Project-specific components (ProjectCard, ProjectGrid, Gallery)
├── pages/         # Page route views (Home, About, Projects, ProjectDetail, Careers, Contact, NotFound)
├── data/          # Client-editable content files (siteConfig, navigation, projects, jobs)
├── hooks/         # Custom React hooks
├── utils/         # Utility functions (Cloudinary media helpers, SEO metadata)
├── types/         # Strict shared TypeScript definitions
└── styles/        # Global stylesheet and design tokens
```

---

## Where to Edit Client Content

All editable content is strictly decoupled from UI components and resides in `src/data/`:

1. **Studio Information & Contact**: Edit `src/data/siteConfig.ts` (Studio name, tagline, email, phone, address, map embed, social links).
2. **Navigation Menu**: Edit `src/data/navigation.ts` (Header and footer navigation links).
3. **Portfolio Projects**: Edit `src/data/projects.ts` (Add, edit, or categorize architectural projects).
4. **Job Openings**: Edit `src/data/jobs.ts` (Career postings and requirements).

Every client-editable variable is clearly labeled with an `// EDIT:` comment.

---

## How to Edit the Home Page

All Home page copy, video URLs, and photography are isolated in `src/data/homeContent.ts`:

- **Hero Headline & Slides**: Update `homeContent.hero` (`headline`, `subheadline`, and `slides` array with Cloudinary public IDs).
- **Showreel Video**: Set `homeContent.hero.showreelUrl` to any normal Vimeo or YouTube share link (e.g. `https://vimeo.com/76979871`).
- **Optional Hero Video Loop**: Set `homeContent.hero.heroVideoSrc` to a direct MP4 URL. If empty, the image slideshow is used.
- **Studio Introduction**: Edit `homeContent.intro` (`statement`, `description`, and `imageId`).
- **Featured Projects**: Update `homeContent.featuredProjectSlugs` with project slugs from `src/data/projects.ts`.
- **Services & Approach**: Add or modify items in `homeContent.services`.
- **Selected Project Spotlight**: Update `homeContent.selectedProject` (`slug`, `title`, `oneLineStory`, and optional `filmUrl`).
- **Studio Metrics & Clients**: Update `homeContent.stats` and `homeContent.clients` (SVG marks in `src/assets/clients/`).
- **Call to Action**: Update `homeContent.cta`.
