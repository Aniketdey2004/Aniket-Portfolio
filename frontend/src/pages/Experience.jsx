import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Loader from '../components/Loader';
import api from '../api/axios';
import { HiBriefcase } from 'react-icons/hi';

export default function Experience() {
  const [items, setItems] = useState(null);
  useEffect(() => { api.get('/experiences').then((r) => setItems(r.data)).catch(() => setItems([])); }, []);
  return (
    <PageTransition>
      <section className="section py-12">
        <header className="mb-10">
          <h1 className="h-display text-4xl font-bold">Experience</h1>
          <p className="text-ink-600 mt-2">Where I've shipped real software.</p>
        </header>
        {!items ? <Loader /> : (
          <div className="relative space-y-8 before:absolute before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-ink-200 sm:before:left-[22px]">
            {items.map((x, i) => (
              <motion.article
                key={x._id || i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative flex gap-4 sm:gap-6"
              >
                <span className="relative z-10 shrink-0 grid place-items-center w-10 h-10 rounded-full bg-coral-gradient text-white shadow-soft ring-4 ring-ink-50">
                  <HiBriefcase />
                </span>
                <div className="card min-w-0 flex-1 p-5 sm:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="h-display text-lg sm:text-xl font-semibold leading-snug">{x.role}</h3>
                    <span className="chip w-fit shrink-0">{x.startDate} – {x.current ? 'Present' : x.endDate}</span>
                  </div>
                  <div className="text-coral-600 font-medium mt-1">{x.company}{x.location ? ` · ${x.location}` : ''}</div>
                  <p className="text-ink-600 mt-3 leading-relaxed">{x.description}</p>
                  {x.bullets?.length ? (
                    <ul className="mt-3 list-disc pl-5 text-ink-600 space-y-1.5">
                      {x.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </PageTransition>
  );
}
