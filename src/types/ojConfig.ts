// 算法刷题统计（OJ）配置类型定义

// LeetCode 平台配置
export type OjLeetcodeConfig = {
	enable: boolean; // 是否抓取 LeetCode 数据
	username: string; // 用户名（国区为个人主页 slug，例如 "ASA_GI"）
	site?: "cn" | "com"; // 站点：cn=国区 leetcode.cn（默认），com=国际站 leetcode.com
};

// 洛谷平台配置
export type OjLuoguConfig = {
	enable: boolean; // 是否抓取洛谷数据
	uid: string; // 洛谷用户 UID，例如 "2063081"
};

// 各平台配置集合
export type OjPlatformsConfig = {
	leetcode: OjLeetcodeConfig;
	luogu: OjLuoguConfig;
};

// OJ 刷题统计总配置
export type OjConfig = {
	enable: boolean; // 总开关，关闭后 widget 与 /oj 页面均不展示
	title?: string; // 分析页标题，留空则用 i18n 翻译
	description?: string; // 分析页描述，留空则用 i18n 翻译
	platforms: OjPlatformsConfig; // 各平台配置
	snapshotHistory?: boolean; // 是否累积每日快照到 history（用于增长曲线/热力图），默认 true
};
