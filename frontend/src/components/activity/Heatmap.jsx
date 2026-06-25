import { useMemo } from 'react';

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const CELL      = 11;
const GAP       = 2;
const STEP      = CELL + GAP;
const ROWS      = 6;        // max days per column
const MONTH_GAP = 14;       // gap between month blocks

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export default function Heatmap({ items, year }) {
  const { months, max } = useMemo(() => {
    const map = new Map(items.map((d) => [d.date, d.count]));
    let max = 1;

    const months = MONTH_NAMES.map((label, m) => {
      const daysInMonth = getDaysInMonth(year, m);
      const days = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const date  = `${year}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const count = map.get(date) || 0;
        if (count > max) max = count;
        days.push({ date, count });
      }

      // Split days into columns of max ROWS each
      const columns = [];
      for (let i = 0; i < days.length; i += ROWS) {
        columns.push(days.slice(i, i + ROWS));
      }

      return { label, columns };
    });

    return { months, max };
  }, [items, year]);

  const level = (c) => {
    if (!c) return 0;
    const r = c / Math.max(1, max);
    if (r > 0.75) return 4;
    if (r > 0.5)  return 3;
    if (r > 0.25) return 2;
    return 1;
  };

  const COLORS = ['#e5e7eb', '#bbf7d0', '#4ade80', '#16a34a', '#14532d'];

  return (
    <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <div style={{
        display:        'flex',
        gap:            `${MONTH_GAP}px`,
        alignItems:     'flex-start',
        justifyContent: 'center',
        flexWrap:       'nowrap',
      }}>
        {months.map((month) => {
          const blockWidth = month.columns.length * STEP - GAP;
          return (
            <div key={month.label} style={{ flexShrink: 0, width: `${blockWidth}px` }}>

              {/* Month label */}
              <div style={{
                fontSize:    '10px',
                fontWeight:  600,
                color:       '#6b7280',
                marginBottom:'5px',
                whiteSpace:  'nowrap',
              }}>
                {month.label}
              </div>

              {/* Columns of days */}
              <div style={{ display: 'flex', gap: `${GAP}px` }}>
                {month.columns.map((col, ci) => (
                  <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: `${GAP}px` }}>
                    {col.map((d) => (
                      <div
                        key={d.date}
                        title={`${d.date} — ${d.count} submission${d.count !== 1 ? 's' : ''}`}
                        style={{
                          width:        `${CELL}px`,
                          height:       `${CELL}px`,
                          borderRadius: '2px',
                          background:   COLORS[level(d.count)],
                          flexShrink:   0,
                          cursor:       d.count > 0 ? 'pointer' : 'default',
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        gap:            '4px',
        marginTop:      '12px',
        justifyContent: 'flex-end',
      }}>
        <span style={{ fontSize: '10px', color: '#9ca3af', marginRight: '3px' }}>Less</span>
        {COLORS.map((c, i) => (
          <div key={i} style={{
            width: `${CELL}px`, height: `${CELL}px`,
            borderRadius: '2px', background: c, flexShrink: 0,
          }} />
        ))}
        <span style={{ fontSize: '10px', color: '#9ca3af', marginLeft: '3px' }}>More</span>
      </div>
    </div>
  );
}