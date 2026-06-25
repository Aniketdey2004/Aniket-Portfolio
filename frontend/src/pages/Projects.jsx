import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Loader from '../components/Loader';
import api from '../api/axios';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';

export default function Projects() {
  const [items, setItems] = useState(null);
  useEffect(() => { api.get('/projects').then((r) => setItems(r.data.sort((a,b)=>(a.order||0)-(b.order||0)))).catch(() => setItems([])); }, []);
  return (
    <PageTransition>
      <section className="section py-12">
        <header className="mb-10">
          <h1 className="h-display text-4xl font-bold">Projects</h1>
          <p className="text-ink-600 mt-2">Production-grade builds I've shipped.</p>
        </header>
        {!items ? <Loader /> : (
          <div className="grid md:grid-cols-2 gap-5">
            {items.map((p, i) => (
              <motion.div key={p._id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="card p-6 group hover:-translate-y-1 hover:shadow-elevated transition">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="h-display text-xl font-semibold">{p.title}</h3>
                    {p.tagline && <div className="text-coral-600 text-sm font-medium mt-1">{p.tagline}</div>}
                  </div>
                  <div className="flex gap-3 text-ink-500">
                    {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-ink-900"><FaGithub /></a>}
                    {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" aria-label="Live" className="hover:text-coral-500"><FaExternalLinkAlt /></a>}
                  </div>
                </div>
                <p className="text-ink-600 mt-3 line-clamp-3">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.techStack?.slice(0, 6).map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
                <Link to={`/projects/${p._id}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-coral-600 hover:text-coral-700">
                  View details <FaArrowRight size={11} />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </PageTransition>
  );
}
