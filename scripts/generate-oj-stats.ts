// 算法刷题统计（OJ）数据抓取脚本
//
// 因 LeetCode / 洛谷接口都不允许浏览器跨域直接请求，只能在构建时抓取，
// 写入 src/constants/oj-stats.json，由 OjStats widget 与 /oj 分析页读取。
//
// 抓取失败时保留旧值并跳过（绝不阻断构建），与 generate-lqips.ts 的容错策略一致。

import fs from "node:fs/promises";
import path from "node:path";
import { ojConfig } from "../src/config";

const OUTPUT_FILE = "src/constants/oj-stats.json";

const BROWSER_UA =
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

// ── 数据结构 ──────────────────────────────────

export interface LeetcodeStats {
	enable: boolean;
	username: string;
	site: "cn" | "com";
	url: string;
	totalSolved: number;
	difficulty: { easy: number; medium: number; hard: number };
	ranking: number | null;
	fetchedAt: string | null;
}

export interface LuoguStats {
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
}

export interface OjHistoryEntry {
	date: string;
	leetcodeSolved: number;
	luoguSolved: number;
	total: number;
}

export interface OjStatsData {
	updatedAt: string;
	platforms: {
		leetcode: LeetcodeStats | null;
		luogu: LuoguStats | null;
	};
	history: OjHistoryEntry[];
}

// ── LeetCode 抓取 ──────────────────────────────────

// 国区 leetcode.cn 与国际站 leetcode.com 的 GraphQL schema 不同：
// - 国区用 userProfileUserQuestionProgressV2(userSlug) 拿难度分布
// - 国际站用 matchedUser(username).submitStatsGlobal.acSubmissionNum
async function fetchLeetcode(): Promise<LeetcodeStats | null> {
	const cfg = ojConfig.platforms.leetcode;
	if (!cfg.enable || !cfg.username) return null;

	const site = cfg.site ?? "cn";
	const origin =
		site === "cn" ? "https://leetcode.cn" : "https://leetcode.com";
	const endpoint = `${origin}/graphql/`;
	const profileUrl =
		site === "cn"
			? `${origin}/u/${cfg.username}/`
			: `${origin}/${cfg.username}/`;

	const difficulty = { easy: 0, medium: 0, hard: 0 };
	let ranking: number | null = null;

	try {
		if (site === "cn") {
			const query = `query userProgress($userSlug: String!) {
				userProfileUserQuestionProgressV2(userSlug: $userSlug) {
					numAcceptedQuestions { count difficulty }
				}
				userProfilePublicProfile(userSlug: $userSlug) {
					profile { ranking { currentGlobalRanking } }
				}
			}`;
			const res = await fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Referer: origin,
					"User-Agent": BROWSER_UA,
				},
				body: JSON.stringify({
					query,
					variables: { userSlug: cfg.username },
				}),
			});
			const json = (await res.json()) as {
				data?: {
					userProfileUserQuestionProgressV2?: {
						numAcceptedQuestions?: { count: number; difficulty: string }[];
					};
					userProfilePublicProfile?: {
						profile?: { ranking?: { currentGlobalRanking?: number } | null };
					};
				};
			};
			const accepted =
				json.data?.userProfileUserQuestionProgressV2?.numAcceptedQuestions ??
				[];
			for (const item of accepted) {
				const d = item.difficulty.toUpperCase();
				if (d === "EASY") difficulty.easy = item.count;
				else if (d === "MEDIUM") difficulty.medium = item.count;
				else if (d === "HARD") difficulty.hard = item.count;
			}
			ranking =
				json.data?.userProfilePublicProfile?.profile?.ranking
					?.currentGlobalRanking ?? null;
		} else {
			const query = `query getUserProfile($username: String!) {
				matchedUser(username: $username) {
					submitStatsGlobal { acSubmissionNum { difficulty count } }
					profile { ranking }
				}
			}`;
			const res = await fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Referer: origin,
					"User-Agent": BROWSER_UA,
				},
				body: JSON.stringify({ query, variables: { username: cfg.username } }),
			});
			const json = (await res.json()) as {
				data?: {
					matchedUser?: {
						submitStatsGlobal?: {
							acSubmissionNum?: { difficulty: string; count: number }[];
						};
						profile?: { ranking?: number };
					};
				};
			};
			const nums =
				json.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum ?? [];
			for (const item of nums) {
				const d = item.difficulty.toUpperCase();
				if (d === "EASY") difficulty.easy = item.count;
				else if (d === "MEDIUM") difficulty.medium = item.count;
				else if (d === "HARD") difficulty.hard = item.count;
			}
			ranking = json.data?.matchedUser?.profile?.ranking ?? null;
		}

		const totalSolved =
			difficulty.easy + difficulty.medium + difficulty.hard;
		if (totalSolved === 0 && ranking === null) {
			throw new Error("empty response (user not found or schema changed)");
		}

		console.log(
			`  LeetCode(${site}) ${cfg.username}: ${totalSolved} solved (E${difficulty.easy}/M${difficulty.medium}/H${difficulty.hard})`,
		);
		return {
			enable: true,
			username: cfg.username,
			site,
			url: profileUrl,
			totalSolved,
			difficulty,
			ranking,
			fetchedAt: new Date().toISOString(),
		};
	} catch (err) {
		console.warn(`  LeetCode fetch failed: ${(err as Error).message}`);
		return null;
	}
}

// ── 洛谷抓取 ──────────────────────────────────

// 洛谷反爬：首次请求返回 302 并下发 C3VK cookie，需带该 cookie 重放同一 URL。
// 数据在返回 HTML 的 <script id="lentille-context"> 内，为一段干净 JSON。
async function fetchLuogu(): Promise<LuoguStats | null> {
	const cfg = ojConfig.platforms.luogu;
	if (!cfg.enable || !cfg.uid) return null;

	const url = `https://www.luogu.com.cn/user/${cfg.uid}?_contentOnly=1`;
	const profileUrl = `https://www.luogu.com.cn/user/${cfg.uid}`;

	try {
		// 第一步：不跟随重定向，捕获 Set-Cookie 里的 C3VK
		const first = await fetch(url, {
			redirect: "manual",
			headers: { "User-Agent": BROWSER_UA, Referer: "https://www.luogu.com.cn/" },
		});
		const setCookie = first.headers.get("set-cookie") ?? "";
		const c3vkMatch = setCookie.match(/C3VK=([a-f0-9]+)/i);
		const cookie = c3vkMatch ? `C3VK=${c3vkMatch[1]}` : "";

		// 第二步：带 C3VK 重放同一 URL 拿到真正内容
		const second = await fetch(url, {
			headers: {
				"User-Agent": BROWSER_UA,
				Referer: profileUrl,
				...(cookie ? { Cookie: cookie } : {}),
			},
		});
		const html = await second.text();

		// 提取 lentille-context 内的 JSON
		const ctxMatch = html.match(
			/<script[^>]*id="lentille-context"[^>]*>([\s\S]*?)<\/script>/,
		);
		if (!ctxMatch) {
			throw new Error("lentille-context not found (anti-bot changed?)");
		}
		const ctx = JSON.parse(ctxMatch[1]) as {
			data?: {
				user?: {
					name?: string;
					passedProblemCount?: number;
					submittedProblemCount?: number;
					ranking?: number;
					ccfLevel?: number;
					color?: string;
				};
				dailyCounts?: Record<string, [number, number]>;
			};
		};
		const user = ctx.data?.user;
		if (!user || typeof user.passedProblemCount !== "number") {
			throw new Error("user data missing in response");
		}

		// dailyCounts 原始值为 [提交次数, 通过数?]，取第一个作为当日活跃度用于热力图
		const rawDaily = ctx.data?.dailyCounts ?? {};
		const dailyCounts: Record<string, number> = {};
		for (const [date, val] of Object.entries(rawDaily)) {
			dailyCounts[date] = Array.isArray(val) ? val[0] : Number(val) || 0;
		}

		console.log(
			`  洛谷 ${cfg.uid} (${user.name ?? "?"}): ${user.passedProblemCount} passed / ${user.submittedProblemCount ?? 0} submitted`,
		);
		return {
			enable: true,
			uid: cfg.uid,
			url: profileUrl,
			name: user.name ?? "",
			passedProblemCount: user.passedProblemCount,
			submittedProblemCount: user.submittedProblemCount ?? 0,
			ranking: user.ranking ?? null,
			ccfLevel: user.ccfLevel ?? 0,
			color: user.color ?? "Gray",
			dailyCounts,
			fetchedAt: new Date().toISOString(),
		};
	} catch (err) {
		console.warn(`  洛谷 fetch failed: ${(err as Error).message}`);
		return null;
	}
}

// ── 主流程 ──────────────────────────────────

function todayStr(): string {
	// 用本地日期（YYYY-MM-DD）作为快照 key
	const d = new Date();
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${y}-${m}-${day}`;
}

async function main() {
	if (!ojConfig.enable) {
		console.log("[oj-stats] ojConfig.enable = false, skip.");
		return;
	}

	// 读取旧数据用于抓取失败时兜底
	let prev: OjStatsData | null = null;
	try {
		prev = JSON.parse(await fs.readFile(OUTPUT_FILE, "utf-8")) as OjStatsData;
		console.log(`[oj-stats] Loaded existing ${OUTPUT_FILE}`);
	} catch {
		console.log(`[oj-stats] No existing ${OUTPUT_FILE}, will create new.`);
	}

	console.log("[oj-stats] Fetching...");
	const [leetcodeFetched, luoguFetched] = await Promise.all([
		fetchLeetcode(),
		fetchLuogu(),
	]);

	// 抓取失败保留旧值
	const leetcode = leetcodeFetched ?? prev?.platforms.leetcode ?? null;
	const luogu = luoguFetched ?? prev?.platforms.luogu ?? null;

	// 累积每日快照
	const history: OjHistoryEntry[] = [...(prev?.history ?? [])];
	if (ojConfig.snapshotHistory !== false) {
		const leetcodeSolved = leetcode?.totalSolved ?? 0;
		const luoguSolved = luogu?.passedProblemCount ?? 0;
		const entry: OjHistoryEntry = {
			date: todayStr(),
			leetcodeSolved,
			luoguSolved,
			total: leetcodeSolved + luoguSolved,
		};
		// 同日覆盖，否则追加
		const idx = history.findIndex((h) => h.date === entry.date);
		if (idx >= 0) history[idx] = entry;
		else history.push(entry);
		history.sort((a, b) => a.date.localeCompare(b.date));
	}

	const data: OjStatsData = {
		updatedAt: new Date().toISOString(),
		platforms: { leetcode, luogu },
		history,
	};

	await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
	await fs.writeFile(OUTPUT_FILE, JSON.stringify(data, null, 2), "utf-8");
	console.log(
		`[oj-stats] Done. ${history.length} history snapshot(s). Output: ${OUTPUT_FILE}`,
	);
}

main();
