# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server (typically localhost:4321, may use next available port)
- `pnpm build` - Build production site to ./dist/
- `pnpm preview` - Preview build locally
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm astro check` - Run Astro diagnostics and TypeScript type checking

## Project Architecture

This is an Astro-based café website with the following key components:

- **Framework**: Astro v5 with React integration for interactive components
- **Styling**: Tailwind CSS v4 with custom utility classes
- **Language**: Japanese (ja) café website
- **Deployment**: Configured for GitHub Pages at `/caffe-astore` base path

### Tech Stack

- Astro v5 with React v19 integration
- Tailwind CSS v4 with Vite plugin
- TypeScript with strict configuration
- Prettier for code formatting with organized imports

### File Structure

- `src/pages/` - Astro pages (currently single index.astro homepage)
- `src/components/` - React components (Hero.tsx, Concept.tsx, Menu.tsx) and Astro components (ConceptSSR.astro)
- `src/components/ui/` - shadcn/ui components (carousel.tsx)
- `src/lib/` - Utility functions (cn helper for Tailwind classes)
- `src/styles/` - Global CSS with Tailwind imports and custom font configurations
- `public/assets/` - Static assets organized by type (logo, menu, others)

### Configuration Details

- Uses `@/*` path alias for src directory imports
- Prettier configured with custom plugins for Astro, Tailwind, and import organization
- shadcn/ui components configured with "new-york" style and neutral base color
- Static output mode for GitHub Pages deployment

### Development Notes

- Site configured for `https://nishinohi.github.io/caffe-astore`
- Uses pnpm as package manager (locked to v10.12.1)
- TypeScript paths configured for `@/` alias pointing to `./src/`

### Component Architecture

- **Astro Components**: Server-side rendered components (`.astro` files)
- **React Components**: Interactive client-side components (`.tsx` files)
- **CSS Modules**: Used alongside Tailwind for component-specific styles (e.g., `Hero.module.css`)
- **Client Directives**: Use `client:load` for React components that need hydration

### Styling System

- **Primary Fonts**: Noto Sans JP (Japanese), Josefin Sans (English)
- **Tailwind v4**: Uses new @theme inline syntax in global.css
- **shadcn/ui**: Configured with "new-york" style and neutral base color
- **CSS Custom Properties**: Extensive theme system with dark mode support
- **Asset Paths**: All public assets must include `/caffe-astore/` base path prefix

### Menu System

- Menu items are stored as JSON files in `public/assets/menu/` with structured data (name, description, price, image)
- Categories include: caffe, cocktail, dolce, mocktail
- Each item has both .jpeg image and .json metadata file
- API endpoint at `src/pages/api/menu-structure.json.ts` provides structured menu data

### Performance Optimizations

- **Progressive Enhancement**: ConceptSSR.astro demonstrates SEO-first approach with JavaScript enhancements
- **Image Optimization**: Hero section uses eager loading for above-fold content
- **Mobile Considerations**: Parallax effects disabled on mobile for better performance
- **Accessibility**: Fallbacks provided via noscript tags
