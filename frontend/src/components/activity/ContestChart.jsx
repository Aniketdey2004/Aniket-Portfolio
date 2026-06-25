import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function fmt(ts) { try { return new Date(ts * 1000).toLocaleDateString(undefined, { month: 'short', year: '2-digit' }); } catch { return ''; } }

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="bg-white border border-ink-200 rounded-xl shadow-soft p-3 text-sm">
      <div className="font-semibold text-ink-900">{p.title}</div>
      <div className="text-ink-500 text-xs">{new Date(p.startTime * 1000).toLocaleString()}</div>
      <div className="mt-2 grid grid-cols-3 gap-3 text-xs">
        <div><div className="text-ink-400">Rating</div><div className="font-semibold">{Math.round(p.rating)}</div></div>
        <div><div className="text-ink-400">Rank</div><div className="font-semibold">{p.ranking}</div></div>
        <div><div className="text-ink-400">Solved</div><div className="font-semibold">{p.problemsSolved}/{p.totalProblems}</div></div>
      </div>
    </div>
  );
};

export default function ContestChart({ data }) {
  return (
    <div className="h-[320px]">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 18, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="rg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e07a5f" />
              <stop offset="100%" stopColor="#943a2b" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e9e6e0" />
          <XAxis dataKey="startTime" tickFormatter={fmt} stroke="#9a948a" fontSize={11} />
          <YAxis stroke="#9a948a" fontSize={11} domain={['auto', 'auto']} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="rating" stroke="url(#rg)" strokeWidth={2.5} dot={{ r: 3, fill: '#d35d44' }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
