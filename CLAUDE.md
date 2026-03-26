# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # tsc + vite build (TypeScript compile then bundle)
npm run preview   # Preview production build locally
```

There is no test framework configured.

## Architecture

This is a React 19 + TypeScript + Vite portfolio site deployed to GitHub Pages at `/lia-portfolio-website/`.

**Routing**: Hash-based (`createHashRouter`) with two top-level routes:
- `/` — single-page layout rendering all sections stacked (Hero, AboutMe, Paintings, OtherWork, Contact)
- `/admin` — gated admin panel for content management

**Content management pattern**: Site content lives in `src/data/content.json` (static import). The admin panel (`src/admin/`) lets the site owner edit this JSON and upload media through the GitHub API (`@octokit/rest`), committing changes directly to the repo — which triggers GitHub Pages deployment. GitHub PAT is stored only in `sessionStorage` (cleared on tab close).

**Theming**: CSS custom properties define a semantic color palette (`--color-bg`, `--color-ink`, `--color-accent`, etc.) in [src/index.css](src/index.css) for both light and dark modes. Tailwind is configured to use these via `class`-based dark mode. Theme preference persists to `localStorage` via `ThemeContext`.

**TypeScript**: Strict mode is enabled (`noUnusedLocals`, `noUnusedParameters`, `strictNullChecks`).

## Key Files

- [src/App.tsx](src/App.tsx) — router definition and error boundary
- [src/admin/useOctokit.ts](src/admin/useOctokit.ts) — GitHub API wrapper (file reads, writes, uploads to `public/uploads/`)
- [src/admin/AdminPanel.tsx](src/admin/AdminPanel.tsx) — tabbed editor for all content sections
- [src/types/content.ts](src/types/content.ts) — TypeScript interfaces for all content shapes
- [src/data/content.json](src/data/content.json) — live site content (source of truth)
- [vite.config.ts](vite.config.ts) — base path set to `/lia-portfolio-website/` for GitHub Pages
