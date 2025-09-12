# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server at localhost:4321
- `pnpm build` - Build production site to ./dist/
- `pnpm preview` - Preview build locally
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

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
- `src/lib/` - Utility functions (cn helper for Tailwind classes)
- `src/styles/` - Global CSS with Tailwind imports
- `public/` - Static assets (favicon, images)

### Configuration Details

- Uses `@/*` path alias for src directory imports
- Prettier configured with custom plugins for Astro, Tailwind, and import organization
- shadcn/ui components configured with "new-york" style and neutral base color
- Static output mode for GitHub Pages deployment

### Development Notes

- Site configured for `https://nishinohi.github.io/caffe-astore`
- Uses pnpm as package manager (locked to v10.12.1)
- TypeScript paths configured for `@/` alias pointing to `./src/`
