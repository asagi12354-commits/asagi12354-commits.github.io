<div align="center">

# 🍀 ASAGI's Personal Blog

> Notes on code, anime, and everyday musings
>
> ![Node.js >= 22](https://img.shields.io/badge/node.js-%3E%3D22-brightgreen)
> ![pnpm >= 11](https://img.shields.io/badge/pnpm-%3E%3D11-blue)
> ![Astro](https://img.shields.io/badge/Astro-7.2.0-orange)
> ![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue)
>
> 🖥️ Live site: <https://asagi12354-commits.github.io>

</div>

---

> May every word here glow like a firefly, a small light in the long night.

This is the source repository of my personal blog, where I share tech notes, ACGN
interests, and everyday musings. The site is built with [Astro](https://astro.build) +
[Svelte](https://svelte.dev) and uses the [Firefly](https://github.com/CuteLeaf/Firefly)
theme (itself forked from [fuwari](https://github.com/saicaca/fuwari)), personalized on top.

## ✨ Features

- ⚡ **Static site generation** — fast loading and SEO-friendly, powered by Astro
- 🎨 **Modern design** — clean look, customizable theme color, light/dark/system modes
- 📱 **Mobile friendly** — fully responsive with mobile-specific optimizations
- 🔍 **Full-text search** — client-side search powered by Pagefind
- 🌸 **Rich modules** — dynamics (microblog), gallery, friend links, guestbook, Bangumi tracking, bookmarks, and more
- 🧩 **Markdown extensions** — admonitions, GitHub cards, Mermaid / PlantUML diagrams, KaTeX, wiki links, etc.
- 🔧 **Config-driven** — most features are toggled and customized via files under `src/config/`

## 🚀 Local Development

### Requirements

- Node.js ≥ 22
- pnpm ≥ 11 (pnpm is enforced for this project)

### Getting Started

```bash
# Clone the repo
git clone https://github.com/asagi12354-commits/asagi12354-commits.github.io.git
cd asagi12354-commits.github.io

# Install dependencies (install pnpm first with `npm install -g pnpm` if needed)
pnpm install

# Start the dev server, runs at http://localhost:4321 by default
pnpm dev
```

## 🧞 Commands

Run all commands from the project root:

| Command | Action |
| :--- | :--- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start the dev server at `localhost:4321` |
| `pnpm build` | Build the site to `./dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm check` | Type / error checking via `astro check` |
| `pnpm lint` | Lint and auto-fix with Biome |
| `pnpm format` | Format code with Biome |
| `pnpm new-post <filename>` | Scaffold a new post |
| `pnpm new-d <content>` | Create a new dynamic entry |
| `pnpm lqips` | Regenerate LQIP placeholder data |

## ⚙️ Writing Posts

Posts live in `src/content/posts/` and support `.md` / `.mdx`. Frontmatter example:

```yaml
---
title: My First Post
published: 2026-01-01
description: This is a sample post.
image: ./cover.jpg   # or use "api" to enable a random cover
tags: [Notes, Tech]
category: Front-end
draft: false
pinned: false        # pin to top
comment: true         # allow comments
---
```

Dynamics (microblog) live in `src/content/dynamic/`, one Markdown file per entry. Use
`pnpm new-d <content>` to create one quickly.

## 🔧 Configuration

Core settings live under `src/config/`, exported through `src/config/index.ts`. Common ones:

- `siteConfig.ts` — site title, description, theme color, pagination, page toggles
- `profileConfig.ts` — avatar, name, bio, social links
- `sidebarConfig.ts` — sidebar layout and widget ordering
- `navBarConfig.ts` / `footerConfig.ts` — navbar and footer
- `commentConfig.ts`, `analyticsConfig.ts`, `fontConfig.ts`, etc. — comments, analytics, fonts

## ☁️ Deployment

The site outputs static files to `dist/` and can be hosted on GitHub Pages, Vercel,
Cloudflare, and similar platforms.

- **Build command**: `pnpm build`
- **Output directory**: `dist`

## 🙏 Credits

- Theme [Firefly](https://github.com/CuteLeaf/Firefly) by [CuteLeaf](https://github.com/CuteLeaf)
- Original template [fuwari](https://github.com/saicaca/fuwari) by [saicaca](https://github.com/saicaca)
- [Astro](https://astro.build) · [Svelte](https://svelte.dev) · [Tailwind CSS](https://tailwindcss.com) · [Iconify](https://iconify.design)

Firefly theme image assets are copyright of miHoYo, developer of *Honkai: Star Rail*.

## 📝 License

This project is licensed under the [MIT License](./LICENSE). Under MIT, you may freely
use, modify, and distribute the code, but you must retain the original copyright notices:

- Copyright (c) 2024 [saicaca](https://github.com/saicaca) — [fuwari](https://github.com/saicaca/fuwari)
- Copyright (c) 2025 [CuteLeaf](https://github.com/CuteLeaf) — [Firefly](https://github.com/CuteLeaf/Firefly)

## 📮 Contact

- GitHub: [@asagi12354-commits](https://github.com/asagi12354-commits)
- Email: <asagi12354@gmail.com>
