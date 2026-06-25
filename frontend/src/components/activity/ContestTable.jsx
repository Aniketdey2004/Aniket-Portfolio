import { useMemo, useState } from 'react';

export default function ContestTable({ rows }) {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState({ key: 'date', dir: 'desc' });

  const filtered = useMemo(() => {
    const f = rows.filter((r) => r.title.toLowerCase().includes(q.toLowerCase()));
    const cmp = (a, b) => {
      const av = a[sort.key], bv = b[sort.key];
      if (av < bv) return sort.dir === 'asc' ? -1 : 1;
      if (av > bv) return sort.dir === 'asc' ? 1 : -1;
      return 0;
    };
    return f.sort(cmp);
  }, [rows, q, sort]);

  const head = (k, label) => (
    <th onClick={() => setSort((s) => ({ key: k, dir: s.key === k && s.dir === 'desc' ? 'asc' : 'desc' }))}
      className="text-left px-4 py-2.5 text-xs uppercase tracking-wider text-ink-500 cursor-pointer select-none hover:text-ink-800">
      {label} {sort.key === k && (sort.dir === 'asc' ? '↑' : '↓')}
    </th>
  );

  return (
    <div className="card overflow-hidden">
      <div className="p-4 border-b border-ink-200 flex items-center justify-between gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search contests…"
          className="input max-w-xs py-2" />
        <div className="text-xs text-ink-500">{filtered.length} contests</div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-ink-50">
            <tr>{head('title','Contest')}{head('date','Date')}{head('ranking','Rank')}{head('rating','Rating')}{head('problemsSolved','Solved')}</tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i} className="border-t border-ink-100 hover:bg-ink-50">
                <td className="px-4 py-2.5 font-medium text-ink-800">{r.title}</td>
                <td className="px-4 py-2.5 text-ink-600">{new Date(r.date).toLocaleDateString()}</td>
                <td className="px-4 py-2.5">{r.ranking}</td>
                <td className="px-4 py-2.5 font-semibold text-coral-600">{Math.round(r.rating)}</td>
                <td className="px-4 py-2.5">{r.problemsSolved}/{r.totalProblems}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
