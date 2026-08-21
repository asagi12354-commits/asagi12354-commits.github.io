<div align="center">

# 🍀 ASAGI 的個人部落格

> 記錄程式碼、二次元與生活裡的碎碎念
>
> ![Node.js >= 22](https://img.shields.io/badge/node.js-%3E%3D22-brightgreen)
> ![pnpm >= 11](https://img.shields.io/badge/pnpm-%3E%3D11-blue)
> ![Astro](https://img.shields.io/badge/Astro-7.2.0-orange)
> ![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue)
>
> 🖥️ 線上瀏覽：<https://asagi12354-commits.github.io>

</div>

---

> 願這裡的每一篇文字，都像螢火一樣，在長夜裡為你亮起一點微光。

這是我的個人部落格原始碼倉庫，用來分享技術折騰筆記、ACGN 興趣與日常碎碎念。站點基於
[Astro](https://astro.build) + [Svelte](https://svelte.dev) 建構，採用了
[Firefly](https://github.com/CuteLeaf/Firefly) 主題（Firefly 又 Fork 自
[fuwari](https://github.com/saicaca/fuwari)），並在此基礎上做了個人化設定。

## ✨ 站點特性

- ⚡ **靜態站點生成** — 基於 Astro，載入迅速並對 SEO 友善
- 🎨 **現代化設計** — 簡潔美觀，支援自訂主題色與亮 / 暗 / 跟隨系統三種模式
- 📱 **行動裝置友善** — 完整的響應式體驗，行動端專項最佳化
- 🔍 **全文搜尋** — 基於 Pagefind 的用戶端搜尋
- 🌸 **豐富模組** — 動態（微部落格）、相簿、友鏈、留言板、追番（Bangumi）、書籤導覽等
- 🧩 **Markdown 擴充** — 提醒區塊、GitHub 卡片、Mermaid / PlantUML 圖表、KaTeX 公式、Wiki 連結等
- 🔧 **設定驅動** — 大部分功能透過 `src/config/` 下的設定檔開關與自訂

## 🚀 本地開發

### 環境需求

- Node.js ≥ 22
- pnpm ≥ 11（本專案強制使用 pnpm）

### 快速開始

```bash
# 複製倉庫
git clone https://github.com/asagi12354-commits/asagi12354-commits.github.io.git
cd asagi12354-commits.github.io

# 安裝相依套件（如未安裝 pnpm，先執行 npm install -g pnpm）
pnpm install

# 啟動開發伺服器，預設執行於 http://localhost:4321
pnpm dev
```

## 🧞 常用指令

以下指令均在專案根目錄執行：

| 指令 | 作用 |
| :--- | :--- |
| `pnpm install` | 安裝相依套件 |
| `pnpm dev` | 在 `localhost:4321` 啟動開發伺服器 |
| `pnpm build` | 建構網站至 `./dist/` |
| `pnpm preview` | 本地預覽建構產物 |
| `pnpm check` | `astro check` 型別 / 錯誤檢查 |
| `pnpm lint` | Biome 檢查並自動修復 |
| `pnpm format` | Biome 格式化程式碼 |
| `pnpm new-post <filename>` | 建立一篇新文章 |
| `pnpm new-d <content>` | 建立一條動態 |
| `pnpm lqips` | 重新產生圖片 LQIP 佔位資料 |

## ⚙️ 寫文章

文章位於 `src/content/posts/`，支援 `.md` / `.mdx`。Frontmatter 範例：

```yaml
---
title: 我的第一篇文章
published: 2026-01-01
description: 這是一篇範例文章。
image: ./cover.jpg   # 或使用 "api" 啟用隨機封面
tags: [隨筆, 技術]
category: 前端
draft: false
pinned: false        # 是否置頂
comment: true         # 是否允許評論
---
```

動態（微部落格）位於 `src/content/dynamic/`，一個 Markdown 檔案對應一條動態，可用
`pnpm new-d <內容>` 快速建立。

## 🔧 個人化設定

站點的核心設定集中在 `src/config/` 目錄，透過 `src/config/index.ts` 統一匯出。常用的有：

- `siteConfig.ts` — 站點標題、描述、主題色、分頁、各頁面開關
- `profileConfig.ts` — 頭像、暱稱、簽名、社群連結
- `sidebarConfig.ts` — 側邊欄佈局與小工具排序
- `navBarConfig.ts` / `footerConfig.ts` — 導覽列與頁尾
- `commentConfig.ts`、`analyticsConfig.ts`、`fontConfig.ts` 等 — 評論、統計、字型等

## ☁️ 部署

站點靜態輸出到 `dist/`，可托管到 GitHub Pages、Vercel、Cloudflare 等平台。

- **建構指令**：`pnpm build`
- **輸出目錄**：`dist`

## 🙏 致謝

- 主題 [Firefly](https://github.com/CuteLeaf/Firefly) by [CuteLeaf](https://github.com/CuteLeaf)
- 原始模板 [fuwari](https://github.com/saicaca/fuwari) by [saicaca](https://github.com/saicaca)
- [Astro](https://astro.build) · [Svelte](https://svelte.dev) · [Tailwind CSS](https://tailwindcss.com) · [Iconify](https://iconify.design)

螢火主題相關圖片素材版權歸遊戲《崩壞：星穹鐵道》開發商米哈遊所有。

## 📝 授權協議

本專案遵循 [MIT License](../LICENSE) 開源協議。基於 MIT 協議，你可以自由使用、修改、散布程式碼，但需保留原始版權宣告：

- Copyright (c) 2024 [saicaca](https://github.com/saicaca) — [fuwari](https://github.com/saicaca/fuwari)
- Copyright (c) 2025 [CuteLeaf](https://github.com/CuteLeaf) — [Firefly](https://github.com/CuteLeaf/Firefly)

## 📮 聯絡我

- GitHub: [@asagi12354-commits](https://github.com/asagi12354-commits)
- Email: <asagi12354@gmail.com>
