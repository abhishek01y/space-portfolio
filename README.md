# Space Portfolio

An immersive developer portfolio built with Next.js, React, TypeScript, Tailwind CSS, Framer Motion, and Three.js. The app is a static single-page portfolio with animated sections, project cards, skill icons, space-themed video assets, and a responsive navigation experience.

## Project Structure

```bash
app/          App Router entry points, metadata layout, and global styles
components/   Main page sections and reusable UI pieces
config/       Site metadata
constants/    Navigation, social links, skills, projects, and footer content
lib/          Motion helpers and utility functions
public/       Images, skill icons, project images, and video assets
```

## Getting Started

1. Install dependencies:

```bash
npm ci
```

2. Start the development server:

```bash
npm run dev
```

3. Validate the app:

```bash
npm run lint
npm run build
```

## Customization

Most portfolio content is intentionally centralized:

- Update project cards, social links, skills, footer links, and source code URL in `constants/index.ts`.
- Update title, description, author, and Open Graph metadata in `config/index.ts`.
- Replace visual assets in `public/` when custom branding, screenshots, or project images are ready.

## Current Scope

This is a frontend-only portfolio. It does not include API routes, authentication, database schema, server actions, or backend integrations. Add those only when a future feature requires them.
