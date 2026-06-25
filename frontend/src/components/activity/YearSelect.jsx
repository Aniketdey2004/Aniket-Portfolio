export default function YearSelect({ value, onChange, years }) {
  return (
    <select value={value} onChange={(e) => onChange(Number(e.target.value))}
      className="bg-white border border-ink-200 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-coral-400">
      {years.map((y) => <option key={y} value={y}>{y}</option>)}
    </select>
  );
}
