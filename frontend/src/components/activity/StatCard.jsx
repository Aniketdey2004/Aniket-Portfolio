import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ label, value, accent }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const target = Number(value) || 0;
    if (!target) { setN(0); return; }
    let raf, start;
    const dur = 900;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-5">
      <div className="text-xs uppercase tracking-wider text-ink-500">{label}</div>
      <div className={`mt-2 h-display text-3xl font-bold ${accent || 'text-ink-900'}`}>{n.toLocaleString()}</div>
    </motion.div>
  );
}
