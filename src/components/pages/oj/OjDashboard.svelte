<script lang="ts">
import type {
	LeetcodeStats,
	LuoguStats,
	OjHistoryEntry,
	OjSummary,
} from "@/utils/oj-utils";

interface Labels {
	totalSolved: string;
	leetcode: string;
	luogu: string;
	easy: string;
	medium: string;
	hard: string;
	solved: string;
	submitted: string;
	ranking: string;
	difficultyDistribution: string;
	platformComparison: string;
	growthTrend: string;
	heatmap: string;
	noData: string;
	lastUpdated: string;
}

interface DashboardData {
	summary: OjSummary;
	leetcode: LeetcodeStats | null;
	luogu: LuoguStats | null;
	history: OjHistoryEntry[];
	dailyCounts: Record<string, number>;
	updatedAt: string;
}

const { data, labels }: { data: DashboardData; labels: Labels } = $props();

// ── 顶部统计卡 ──────────────────────────────────
const statCards = $derived([
	{
		label: labels.totalSolved,
		value: data.summary.total,
		color: "var(--series-1)",
	},
	{
		label: labels.leetcode,
		value: data.summary.leetcodeSolved,
		color: "#FFA116",
	},
	{
		label: labels.luogu,
		value: data.summary.luoguSolved,
		color: "#0E90D2",
	},
]);

// ── 难度分布（LeetCode 语义色）──────────────────────
const diff = $derived(
	data.leetcode?.difficulty ?? { easy: 0, medium: 0, hard: 0 },
);
const difficultyBars = $derived([
	{ label: labels.easy, value: diff.easy, color: "#00b8a3" },
	{ label: labels.medium, value: diff.medium, color: "#ffb800" },
	{ label: labels.hard, value: diff.hard, color: "#ff375f" },
]);
const diffTotal = $derived(diff.easy + diff.medium + diff.hard);

// ── 平台对比（分类色）──────────────────────────────
const platformBars = $derived(
	[
		data.leetcode?.enable
			? {
					label: labels.leetcode,
					value: data.leetcode.totalSolved,
					color: "var(--series-1)",
				}
			: null,
		data.luogu?.enable
			? {
					label: labels.luogu,
					value: data.luogu.passedProblemCount,
					color: "var(--series-2)",
				}
			: null,
	].filter((b): b is { label: string; value: number; color: string } => !!b),
);
const platformMax = $derived(Math.max(...platformBars.map((b) => b.value), 1));

// ── 增长趋势折线（SVG 自绘）──────────────────────
const CHART_W = 640;
const CHART_H = 200;
const PAD = { top: 16, right: 16, bottom: 28, left: 36 };

const trend = $derived(() => {
	const h = data.history ?? [];
	if (h.length === 0) {
		return { points: "", area: "", ticks: [], max: 0, dots: [] };
	}
	const max = Math.max(...h.map((e) => e.total), 1);
	const innerW = CHART_W - PAD.left - PAD.right;
	const innerH = CHART_H - PAD.top - PAD.bottom;
	const n = h.length;
	const x = (i: number) =>
		PAD.left + (n === 1 ? innerW / 2 : (i / (n - 1)) * innerW);
	const y = (v: number) => PAD.top + innerH - (v / max) * innerH;

	const dots = h.map((e, i) => ({
		cx: x(i),
		cy: y(e.total),
		date: e.date,
		total: e.total,
	}));
	const points = dots.map((d) => `${d.cx},${d.cy}`).join(" ");
	const area =
		n > 0
			? `${PAD.left},${PAD.top + innerH} ${points} ${x(n - 1)},${PAD.top + innerH}`
			: "";

	// y 轴刻度（0 / 中 / max）
	const ticks = [0, Math.round(max / 2), max].map((v) => ({
		v,
		y: y(v),
	}));
	return { points, area, ticks, max, dots };
});

// ── 洛谷活跃度热力图 ──────────────────────────────
const WEEKS = 26; // 展示最近约半年
const heatmap = $derived(() => {
	const counts = data.dailyCounts ?? {};
	// 以今天为终点，向前推 WEEKS*7 天
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	// 对齐到本周日（getDay: 0=周日）
	const end = new Date(today);
	const cells: { date: string; count: number; level: number }[] = [];
	let maxCount = 1;
	for (const v of Object.values(counts)) {
		if (v > maxCount) maxCount = v;
	}
	const totalDays = WEEKS * 7;
	const start = new Date(end);
	start.setDate(end.getDate() - (totalDays - 1));
	// 把 start 对齐到周日
	start.setDate(start.getDate() - start.getDay());
	for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
		const y = d.getFullYear();
		const m = String(d.getMonth() + 1).padStart(2, "0");
		const day = String(d.getDate()).padStart(2, "0");
		const key = `${y}-${m}-${day}`;
		const count = counts[key] ?? 0;
		let level = 0;
		if (count > 0) {
			const ratio = count / maxCount;
			level = ratio > 0.75 ? 4 : ratio > 0.5 ? 3 : ratio > 0.25 ? 2 : 1;
		}
		cells.push({ date: key, count, level });
	}
	// 按列（周）分组，每列 7 天
	const columns: (typeof cells)[] = [];
	for (let i = 0; i < cells.length; i += 7) {
		columns.push(cells.slice(i, i + 7));
	}
	return { columns };
});

// 热力图色阶（sequential blue）
const HEAT_COLORS = [
	"var(--heat-0)",
	"var(--heat-1)",
	"var(--heat-2)",
	"var(--heat-3)",
	"var(--heat-4)",
];

const updatedDate = $derived(
	data.updatedAt ? new Date(data.updatedAt).toLocaleString() : "",
);
const hasAnyData = $derived(!!(data.leetcode?.enable || data.luogu?.enable));
</script>

{#if !hasAnyData}
  <div class="viz-root py-16 text-center text-neutral-500 dark:text-neutral-400">
    {labels.noData}
  </div>
{:else}
  <div class="viz-root flex flex-col gap-8">
    <!-- 顶部统计卡 -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {#each statCards as card}
        <div class="stat-tile rounded-xl px-5 py-4 border border-(--line-divider)">
          <div class="text-3xl font-bold" style={`color:${card.color}`}>{card.value}</div>
          <div class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{card.label}</div>
        </div>
      {/each}
    </div>

    <!-- 平台对比 + 难度分布 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 平台对比 -->
      <section>
        <h2 class="chart-title">{labels.platformComparison}</h2>
        <div class="flex flex-col gap-3 mt-3">
          {#each platformBars as bar}
            <div class="flex items-center gap-3">
              <span class="text-sm w-16 shrink-0 text-neutral-600 dark:text-neutral-300">{bar.label}</span>
              <div class="flex-1 h-4 rounded-md bg-black/5 dark:bg-white/10 overflow-hidden">
                <div class="h-full rounded-md transition-all"
                     style={`width:${(bar.value / platformMax) * 100}%;background:${bar.color}`}></div>
              </div>
              <span class="text-sm font-bold w-10 text-right tabular-nums text-neutral-800 dark:text-neutral-100">{bar.value}</span>
            </div>
          {/each}
        </div>
      </section>

      <!-- 难度分布 -->
      <section>
        <h2 class="chart-title">{labels.difficultyDistribution}</h2>
        {#if diffTotal > 0}
          <div class="flex flex-col gap-3 mt-3">
            {#each difficultyBars as bar}
              <div class="flex items-center gap-3">
                <span class="text-sm w-14 shrink-0" style={`color:${bar.color}`}>{bar.label}</span>
                <div class="flex-1 h-4 rounded-md bg-black/5 dark:bg-white/10 overflow-hidden">
                  <div class="h-full rounded-md transition-all"
                       style={`width:${(bar.value / diffTotal) * 100}%;background:${bar.color}`}></div>
                </div>
                <span class="text-sm font-bold w-10 text-right tabular-nums text-neutral-800 dark:text-neutral-100">{bar.value}</span>
              </div>
            {/each}
          </div>
        {:else}
          <p class="text-sm text-neutral-400 mt-3">{labels.noData}</p>
        {/if}
      </section>
    </div>

    <!-- 增长趋势 -->
    <section>
      <h2 class="chart-title">{labels.growthTrend}</h2>
      {#if trend().dots.length > 0}
        <svg class="w-full mt-3" viewBox={`0 0 ${CHART_W} ${CHART_H}`} role="img" aria-label={labels.growthTrend}>
          <!-- 网格线 + y 轴刻度 -->
          {#each trend().ticks as tick}
            <line x1={PAD.left} y1={tick.y} x2={CHART_W - PAD.right} y2={tick.y}
                  stroke="var(--gridline)" stroke-width="1" />
            <text x={PAD.left - 6} y={tick.y + 3} text-anchor="end"
                  class="tick-text" fill="var(--muted-ink)">{tick.v}</text>
          {/each}
          <!-- 面积 -->
          <polygon points={trend().area} fill="var(--series-1)" opacity="0.12" />
          <!-- 折线 -->
          <polyline points={trend().points} fill="none" stroke="var(--series-1)" stroke-width="2"
                    stroke-linejoin="round" stroke-linecap="round" />
          <!-- 数据点 -->
          {#each trend().dots as dot}
            <circle cx={dot.cx} cy={dot.cy} r="4" fill="var(--series-1)"
                    stroke="var(--surface-1)" stroke-width="2">
              <title>{dot.date}: {dot.total}</title>
            </circle>
          {/each}
        </svg>
      {:else}
        <p class="text-sm text-neutral-400 mt-3">{labels.noData}</p>
      {/if}
    </section>

    <!-- 洛谷活跃度热力图 -->
    {#if data.luogu?.enable}
      <section>
        <h2 class="chart-title">{labels.heatmap}</h2>
        <div class="flex gap-[3px] mt-3 overflow-x-auto pb-2">
          {#each heatmap().columns as column}
            <div class="flex flex-col gap-[3px]">
              {#each column as cell}
                <div class="heat-cell rounded-sm"
                     style={`background:${HEAT_COLORS[cell.level]}`}
                     title={`${cell.date}: ${cell.count}`}></div>
              {/each}
            </div>
          {/each}
        </div>
      </section>
    {/if}

    {#if updatedDate}
      <p class="text-xs text-neutral-400 dark:text-neutral-500 text-right">
        {labels.lastUpdated} {updatedDate}
      </p>
    {/if}
  </div>
{/if}

<style>
.viz-root {
  --surface-1: #fcfcfb;
  --series-1: #2a78d6;
  --series-2: #008300;
  --gridline: #e1e0d9;
  --muted-ink: #898781;
  /* sequential blue 热力图色阶 */
  --heat-0: #ebedf0;
  --heat-1: #cde2fb;
  --heat-2: #86b6ef;
  --heat-3: #3987e5;
  --heat-4: #184f95;
}
:global(:root.dark) .viz-root {
  --surface-1: #1a1a19;
  --series-1: #3987e5;
  --series-2: #008300;
  --gridline: #2c2c2a;
  --muted-ink: #898781;
  --heat-0: #2c2c2a;
  --heat-1: #104281;
  --heat-2: #184f95;
  --heat-3: #256abf;
  --heat-4: #3987e5;
}
.chart-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--muted-ink);
}
:global(.viz-root) .chart-title {
  color: inherit;
}
.stat-tile {
  background: color-mix(in oklab, var(--surface-1) 100%, transparent);
}
.tick-text {
  font-size: 11px;
}
.heat-cell {
  width: 12px;
  height: 12px;
}
</style>

