export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="flex items-center justify-center py-16 text-ink-500">
      <div className="h-6 w-6 rounded-full border-2 border-ink-300 border-t-coral-500 animate-spin mr-3" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
