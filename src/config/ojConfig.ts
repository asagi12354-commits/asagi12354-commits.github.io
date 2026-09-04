import type { OjConfig } from "../types/ojConfig";

/**
 * 算法刷题统计（OJ）配置
 *
 * 数据在构建时由 scripts/generate-oj-stats.ts 抓取并写入 src/constants/oj-stats.json，
 * 侧边栏 widget（OjStats）与 /oj 分析页读取该 JSON 渲染。
 * 因两大 OJ 接口都不允许浏览器跨域直接请求，只能构建时抓取，故部署后数据不会实时更新，
 * 需配合 GitHub Actions 定时重建（.github/workflows/oj-stats.yml）持续刷新。
 */
export const ojConfig: OjConfig = {
	// 总开关，关闭后侧边栏 widget 与 /oj 页面均不展示
	enable: true,

	// 分析页标题，留空则使用 i18n 中的翻译
	title: "",

	// 分析页描述，留空则使用 i18n 中的翻译
	description: "",

	// 各平台配置
	platforms: {
		// LeetCode
		leetcode: {
			// 是否抓取 LeetCode 数据
			enable: true,
			// 用户名（国区为个人主页 slug）
			username: "ASA_GI",
			// 站点：cn=国区 leetcode.cn，com=国际站 leetcode.com
			site: "cn",
		},
		// 洛谷
		luogu: {
			// 是否抓取洛谷数据
			enable: true,
			// 洛谷用户 UID
			uid: "2063081",
		},
	},

	// 是否累积每日快照（用于增长曲线/年度热力图），需配合定时重建才有意义
	snapshotHistory: true,
};
