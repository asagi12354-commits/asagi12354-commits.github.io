<div align="center">

# 🍀 ASAGI 的个人博客

> 记录代码、二次元与生活里的碎碎念
>
> ![Node.js >= 22](https://img.shields.io/badge/node.js-%3E%3D22-brightgreen)
> ![pnpm >= 11](https://img.shields.io/badge/pnpm-%3E%3D11-blue)
> ![Astro](https://img.shields.io/badge/Astro-7.2.0-orange)
> ![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue)
>
> 🖥️ 在线访问：<https://asagi12354-commits.github.io>

</div>

---

> 愿这里的每一篇文字，都像萤火一样，在长夜里为你亮起一点微光。

这是我的个人博客源码仓库，用来分享技术折腾笔记、ACGN 兴趣与日常碎碎念。站点基于
[Astro](https://astro.build) + [Svelte](https://svelte.dev) 构建，采用了
[Firefly](https://github.com/CuteLeaf/Firefly) 主题（Firefly 又 Fork 自
[fuwari](https://github.com/saicaca/fuwari)），并在此基础上做了个人化配置。

## ✨ 站点特性

- ⚡ **静态站点生成** — 基于 Astro，加载迅速并对 SEO 友好
- 🎨 **现代化设计** — 简洁美观，支持自定义主题色与亮/暗/跟随系统三种模式
- 📱 **移动友好** — 完整的响应式体验，移动端专项优化
- 🔍 **全文搜索** — 基于 Pagefind 的客户端搜索
- 🌸 **丰富模块** — 动态（微博客）、相册、友链、留言板、追番（Bangumi）、书签导航等
- 🧩 **Markdown 扩展** — 提醒块、GitHub 卡片、Mermaid / PlantUML 图表、KaTeX 公式、Wiki 链接等
- 🔧 **配置驱动** — 大部分功能通过 `src/config/` 下的配置文件开关与自定义

## 🚀 本地开发

### 环境要求

- Node.js ≥ 22
- pnpm ≥ 11（本项目强制使用 pnpm）

### 快速开始

```bash
# 克隆仓库
git clone https://github.com/asagi12354-commits/asagi12354-commits.github.io.git
cd asagi12354-commits.github.io

# 安装依赖（如未安装 pnpm，先执行 npm install -g pnpm）
pnpm install

# 启动开发服务器，默认运行在 http://localhost:4321
pnpm dev
```

## 🧞 常用命令

以下命令均在项目根目录执行：

| 命令 | 作用 |
| :--- | :--- |
| `pnpm install` | 安装依赖 |
| `pnpm dev` | 在 `localhost:4321` 启动开发服务器 |
| `pnpm build` | 构建网站至 `./dist/` |
| `pnpm preview` | 本地预览构建产物 |
| `pnpm check` | `astro check` 类型 / 错误检查 |
| `pnpm lint` | Biome 检查并自动修复 |
| `pnpm format` | Biome 格式化代码 |
| `pnpm new-post <filename>` | 创建一篇新文章 |
| `pnpm new-d <content>` | 创建一条动态 |
| `pnpm lqips` | 重新生成图片 LQIP 占位数据 |

## ⚙️ 写文章

文章位于 `src/content/posts/`，支持 `.md` / `.mdx`。Frontmatter 示例：

```yaml
---
title: 我的第一篇文章
published: 2026-01-01
description: 这是一篇示例文章。
image: ./cover.jpg   # 或使用 "api" 启用随机封面
tags: [随笔, 技术]
category: 前端
draft: false
pinned: false        # 是否置顶
comment: true         # 是否允许评论
---
```

动态（微博客）位于 `src/content/dynamic/`，一个 Markdown 文件对应一条动态，可用
`pnpm new-d <内容>` 快速创建。

## 🔧 个性化配置

站点的核心设置集中在 `src/config/` 目录，通过 `src/config/index.ts` 统一导出。常用的有：

- `siteConfig.ts` — 站点标题、描述、主题色、分页、各页面开关
- `profileConfig.ts` — 头像、昵称、签名、社交链接
- `sidebarConfig.ts` — 侧边栏布局与小组件排序
- `navBarConfig.ts` / `footerConfig.ts` — 导航栏与页脚
- `commentConfig.ts`、`analyticsConfig.ts`、`fontConfig.ts` 等 — 评论、统计、字体等

## ☁️ 部署

站点静态输出到 `dist/`，可托管到 GitHub Pages、Vercel、Cloudflare 等平台。

- **构建命令**：`pnpm build`
- **输出目录**：`dist`

## 🙏 致谢

- 主题 [Firefly](https://github.com/CuteLeaf/Firefly) by [CuteLeaf](https://github.com/CuteLeaf)
- 原始模板 [fuwari](https://github.com/saicaca/fuwari) by [saicaca](https://github.com/saicaca)
- [Astro](https://astro.build) · [Svelte](https://svelte.dev) · [Tailwind CSS](https://tailwindcss.com) · [Iconify](https://iconify.design)

流萤主题相关图片素材版权归游戏《崩坏：星穹铁道》开发商米哈游所有。

## 📝 许可协议

本项目遵循 [MIT License](./LICENSE) 开源协议。基于 MIT 协议，你可以自由使用、修改、分发代码，但需保留原始版权声明：

- Copyright (c) 2024 [saicaca](https://github.com/saicaca) — [fuwari](https://github.com/saicaca/fuwari)
- Copyright (c) 2025 [CuteLeaf](https://github.com/CuteLeaf) — [Firefly](https://github.com/CuteLeaf/Firefly)

## 📮 联系我

- GitHub: [@asagi12354-commits](https://github.com/asagi12354-commits)
- Email: <asagi12354@gmail.com>
