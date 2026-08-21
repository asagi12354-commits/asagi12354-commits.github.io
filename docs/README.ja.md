<div align="center">

# 🍀 ASAGI の個人ブログ

> コード、二次元、そして日々のつぶやきの記録
>
> ![Node.js >= 22](https://img.shields.io/badge/node.js-%3E%3D22-brightgreen)
> ![pnpm >= 11](https://img.shields.io/badge/pnpm-%3E%3D11-blue)
> ![Astro](https://img.shields.io/badge/Astro-7.2.0-orange)
> ![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue)
>
> 🖥️ サイトを見る：<https://asagi12354-commits.github.io>

</div>

---

> ここに綴る一つ一つの言葉が、蛍のように、長い夜にわずかな光を灯しますように。

これは私の個人ブログのソースコードリポジトリで、技術メモや ACGN の趣味、日々のつぶやきを
共有するためのものです。サイトは [Astro](https://astro.build) + [Svelte](https://svelte.dev)
で構築され、[Firefly](https://github.com/CuteLeaf/Firefly) テーマ（Firefly 自体が
[fuwari](https://github.com/saicaca/fuwari) から Fork されたもの）を利用し、その上で個人向けに
カスタマイズしています。

## ✨ 特徴

- ⚡ **静的サイト生成** — Astro による高速な読み込みと SEO フレンドリー
- 🎨 **モダンなデザイン** — シンプルで美しく、テーマカラーのカスタマイズとライト / ダーク / システム追従の 3 モードに対応
- 📱 **モバイル対応** — 完全なレスポンシブ体験とモバイル専用の最適化
- 🔍 **全文検索** — Pagefind によるクライアントサイド検索
- 🌸 **豊富なモジュール** — 動的投稿（マイクロブログ）、ギャラリー、フレンドリンク、ゲストブック、視聴記録（Bangumi）、ブックマークなど
- 🧩 **Markdown 拡張** — 注意書きブロック、GitHub カード、Mermaid / PlantUML 図、KaTeX 数式、Wiki リンクなど
- 🔧 **設定駆動** — ほとんどの機能は `src/config/` 配下の設定ファイルで切り替え・カスタマイズ可能

## 🚀 ローカル開発

### 動作環境

- Node.js ≥ 22
- pnpm ≥ 11（本プロジェクトは pnpm を強制）

### はじめに

```bash
# リポジトリをクローン
git clone https://github.com/asagi12354-commits/asagi12354-commits.github.io.git
cd asagi12354-commits.github.io

# 依存関係をインストール（pnpm 未導入の場合は先に npm install -g pnpm）
pnpm install

# 開発サーバーを起動（デフォルトは http://localhost:4321）
pnpm dev
```

## 🧞 コマンド

すべてのコマンドはプロジェクトルートで実行します：

| コマンド | 動作 |
| :--- | :--- |
| `pnpm install` | 依存関係のインストール |
| `pnpm dev` | `localhost:4321` で開発サーバーを起動 |
| `pnpm build` | サイトを `./dist/` にビルド |
| `pnpm preview` | ビルド成果物をローカルでプレビュー |
| `pnpm check` | `astro check` による型 / エラーチェック |
| `pnpm lint` | Biome で lint と自動修正 |
| `pnpm format` | Biome でコードを整形 |
| `pnpm new-post <filename>` | 新しい記事を作成 |
| `pnpm new-d <content>` | 動的投稿を 1 件作成 |
| `pnpm lqips` | 画像の LQIP プレースホルダーデータを再生成 |

## ⚙️ 記事の執筆

記事は `src/content/posts/` にあり、`.md` / `.mdx` に対応しています。Frontmatter の例：

```yaml
---
title: 初めての記事
published: 2026-01-01
description: これはサンプル記事です。
image: ./cover.jpg   # または "api" でランダムカバーを有効化
tags: [雑記, 技術]
category: フロントエンド
draft: false
pinned: false        # トップに固定するか
comment: true         # コメントを許可するか
---
```

動的投稿（マイクロブログ）は `src/content/dynamic/` にあり、1 つの Markdown ファイルが 1 件に対応します。
`pnpm new-d <内容>` で手早く作成できます。

## 🔧 カスタマイズ

サイトの中核設定は `src/config/` ディレクトリに集約され、`src/config/index.ts` から一括で
エクスポートされます。よく使うもの：

- `siteConfig.ts` — サイトタイトル、説明、テーマカラー、ページネーション、各ページのトグル
- `profileConfig.ts` — アバター、名前、自己紹介、ソーシャルリンク
- `sidebarConfig.ts` — サイドバーのレイアウトとウィジェットの並び順
- `navBarConfig.ts` / `footerConfig.ts` — ナビゲーションバーとフッター
- `commentConfig.ts`、`analyticsConfig.ts`、`fontConfig.ts` など — コメント、解析、フォント

## ☁️ デプロイ

サイトは静的ファイルを `dist/` に出力し、GitHub Pages、Vercel、Cloudflare などの
プラットフォームにホスティングできます。

- **ビルドコマンド**：`pnpm build`
- **出力ディレクトリ**：`dist`

## 🙏 謝辞

- テーマ [Firefly](https://github.com/CuteLeaf/Firefly) by [CuteLeaf](https://github.com/CuteLeaf)
- 元テンプレート [fuwari](https://github.com/saicaca/fuwari) by [saicaca](https://github.com/saicaca)
- [Astro](https://astro.build) · [Svelte](https://svelte.dev) · [Tailwind CSS](https://tailwindcss.com) · [Iconify](https://iconify.design)

Firefly テーマの画像素材の著作権は、ゲーム『崩壊：スターレイル』の開発元である miHoYo に帰属します。

## 📝 ライセンス

本プロジェクトは [MIT License](../LICENSE) の下で公開されています。MIT ライセンスにより、
コードの使用・改変・再配布は自由ですが、元の著作権表示を保持する必要があります：

- Copyright (c) 2024 [saicaca](https://github.com/saicaca) — [fuwari](https://github.com/saicaca/fuwari)
- Copyright (c) 2025 [CuteLeaf](https://github.com/CuteLeaf) — [Firefly](https://github.com/CuteLeaf/Firefly)

## 📮 連絡先

- GitHub: [@asagi12354-commits](https://github.com/asagi12354-commits)
- Email: <asagi12354@gmail.com>
