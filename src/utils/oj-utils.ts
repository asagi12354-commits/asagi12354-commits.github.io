// 算法刷题统计（OJ）数据读取工具
//
// 数据由 scripts/generate-oj-stats.ts 在构建时抓取写入 src/constants/oj-stats.json。
// 此处提供聚合读取函数，供 OjStats widget 与 /oj 分析页使用。

import ojData from "@constants/oj-stats.json";

// ── 类型（与 generate-oj-stats.ts 的输出结构一致）──────────────

export type LeetcodeStats = {
	enable: boolean;
	username: string;
	site: "cn" | "com";
	url: string;
	totalSolved: number;
	difficulty: { easy: number; medium: number; hard: number };
	ranking: number | null;
	fetchedAt: string | null;
};

export type LuoguStats = {
	enable: boolean;
	uid: string;
	url: string;
	name: string;
	passedProblemCount: number;
	submittedProblemCount: number;
	ranking: number | null;
	ccfLevel: number;
	color: string;
	dailyCounts: Record<string, number>;
	fetchedAt: string | null;
};

export type OjHistoryEntry = {
	date: string;
	leetcodeSolved: number;
	luoguSolved: number;
	total: number;
};

export type OjStatsData = {
	updatedAt: string;
	platforms: {
		leetcode: LeetcodeStats | null;
		luogu: LuoguStats | null;
	};
	history: OjHistoryEntry[];
};

export type OjSummary = {
	total: number; // 跨平台总 AC 题数
	leetcodeSolved: number;
	luoguSolved: number;
	difficulty: { easy: number; medium: number; hard: number }; // 目前仅 LeetCode 提供难度
	updatedAt: string;
};

const data: OjStatsData = ojData as OjStatsData;

/** 原始数据 */
export function getOjData(): OjStatsData {
	return data;
}

/** 跨平台汇总（总题数、难度合计） */
export function getOjSummary(): OjSummary {
	const leetcodeSolved = data.platforms.leetcode?.totalSolved ?? 0;
	const luoguSolved = data.platforms.luogu?.passedProblemCount ?? 0;
	const difficulty = data.platforms.leetcode?.difficulty ?? {
		easy: 0,
		medium: 0,
		hard: 0,
	};
	return {
		total: leetcodeSolved + luoguSolved,
		leetcodeSolved,
		luoguSolved,
		difficulty,
		updatedAt: data.updatedAt,
	};
}

/** LeetCode 明细（可能为 null） */
export function getLeetcodeStats(): LeetcodeStats | null {
	return data.platforms.leetcode;
}

/** 洛谷明细（可能为 null） */
export function getLuoguStats(): LuoguStats | null {
	return data.platforms.luogu;
}

/** 历史快照数组（按日期升序） */
export function getOjHistory(): OjHistoryEntry[] {
	return data.history ?? [];
}

/** 洛谷每日活跃度（用于热力图），无数据则返回空对象 */
export function getLuoguDailyCounts(): Record<string, number> {
	return data.platforms.luogu?.dailyCounts ?? {};
}
