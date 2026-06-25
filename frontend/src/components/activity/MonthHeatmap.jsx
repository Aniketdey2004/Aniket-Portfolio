import { useMemo } from 'react';

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/**
 * Month-grid heatmap.
 * Props:
 *   items: [{date:'YYYY-MM-DD', count:Number}]
 *   months: [{year:Number, monthIndex:0..11}]  (in display order, left→right)
 *   showYear: boolean — append '24 etc next to month label
 *   palette: 'coral' | 'green'
 */
export default function MonthHeatmap({ items, months, showYear = false, palette = 'green' }) {
  const map = useMemo(() => {
    const m = new Map();
    for (const d of items || []) m.set(d.date, d.count);
    return m;
  }, [items]);
  const max = useMemo(() => Math.max(1, ...(items || []).map((d) => d.count || 0)), [items]);

  const palettes = {
    green: ['#eef0f3', '#c6ecd1', '#74d68a', '#3aaa57', '#1b6f34'],
    coral: ['#f3eeec', '#fbd4c6', '#f3a98e', '#e07a5f', '#9e3d27'],
  };
  const colors = palettes[palette] || palettes.green;
  const level = (c) => {
    if (!c) return 0;
    const r = c / max;
    if (r > 0.75) return 4;
    if (r > 0.5) return 3;
    if (r > 0.25) return 2;
    return 1;
  };

  return (
    <div className="w-full">
      <div className="grid gap-x-3 gap-y-4 w-full
        grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
        {months.map(({ year, monthIndex }) => {
          const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
          // exactly 30 cells per month (per spec). If month has 31 days, day 31 is overlaid
          // into the last cell as a stacked marker; if 28/29 days, remaining cells empty.
          const cells = Array.from({ length: 30 }, (_, i) => {
            const day = i + 1;
            if (day > daysInMonth) return { empty: true };
            const date = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            return { date, count: map.get(date) || 0 };
          });
          const day31 = daysInMonth === 31
            ? (() => {
                const date = `${year}-${String(monthIndex + 1).padStart(2, '0')}-31`;
                return { date, count: map.get(date) || 0 };
              })()
            : null;

          const monthTotal = (cells.reduce((s, c) => s + (c.count || 0), 0)) + (day31?.count || 0);

          return (
            <div key={`${year}-${monthIndex}`} className="min-w-0 flex flex-col">
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-ink-700">
                  {MONTH_NAMES[monthIndex]}{showYear ? <span className="text-ink-400 font-normal"> '{String(year).slice(2)}</span> : null}
                </span>
                {monthTotal > 0 && (
                  <span className="text-[10px] text-ink-400 tabular-nums">{monthTotal}</span>
                )}
              </div>
              <div className="grid grid-cols-5 gap-[3px] w-full">
                {cells.map((c, i) => (
                  <div
                    key={i}
                    title={c.empty ? '' : `${c.date} — ${c.count} contribution${c.count !== 1 ? 's' : ''}`}
                    className="aspect-square rounded-[3px] transition-transform hover:scale-125"
                    style={{ background: c.empty ? 'transparent' : colors[level(c.count)] }}
                  />
                ))}
              </div>
              {day31 && (
                <div className="grid grid-cols-5 gap-[3px] w-full mt-[3px]">
                  <div
                    title={`${day31.date} — ${day31.count} contribution${day31.count !== 1 ? 's' : ''}`}
                    className="aspect-square rounded-[3px]"
                    style={{ background: colors[level(day31.count)] }}
                  />
                  <div /><div /><div /><div />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 mt-5 text-xs text-ink-500">
        <span>Less</span>
        {colors.map((c, i) => <span key={i} className="w-3 h-3 rounded-[3px]" style={{ background: c }} />)}
        <span>More</span>
      </div>
    </div>
  );
}
