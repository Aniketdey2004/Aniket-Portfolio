import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Loader from '../components/Loader';
import api from '../api/axios';
import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa';
import { HiOutlineDocumentText } from 'react-icons/hi';

function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Blogs() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    api.get('/blogs').then((r) => setItems(r.data)).catch(() => setItems([]));
  }, []);

  return (
    <PageTransition>
      <section className="section py-10">
        <header className="mb-8">
          <h1 className="h-display text-3xl font-bold">Blogs</h1>
          <p className="text-ink-600 mt-1 text-sm">Notes on engineering, system design, and building in public.</p>
        </header>

        {!items ? <Loader label="Loading blogs…" /> : items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-8 text-center max-w-lg mx-auto"
          >
            <div className="inline-flex p-3 rounded-full bg-coral-gradient text-white shadow-soft">
              <HiOutlineDocumentText size={24} />
            </div>
            <h2 className="h-display text-lg font-semibold mt-4">No posts yet</h2>
            <p className="text-ink-600 mt-1 text-sm">Published articles will show up here. Check back soon.</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {items.map((b, i) => (
              <motion.article
                key={b._id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={`/blogs/${b._id}`}
                  className="card group block h-full overflow-hidden hover:-translate-y-1 hover:shadow-elevated transition"
                >
                  {b.coverImage ? (
                    <div className="aspect-[16/7] bg-ink-100 overflow-hidden">
                      <img
                        src={b.coverImage}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/7] bg-gradient-to-br from-coral-100 to-ink-100 flex items-center justify-center">
                      <HiOutlineDocumentText size={32} className="text-coral-400/80" />
                    </div>
                  )}
                  <div className="p-4 sm:p-5">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-ink-500">
                      <span className="inline-flex items-center gap-1">
                        <FaCalendarAlt size={9} className="text-coral-500" />
                        {formatDate(b.createdAt)}
                      </span>
                      {b.tags?.slice(0, 3).map((t) => <span key={t} className="chip">{t}</span>)}
                    </div>
                    <h2 className="h-display text-lg font-semibold mt-2 group-hover:text-coral-600 transition line-clamp-2">
                      {b.title}
                    </h2>
                    {b.excerpt && (
                      <p className="text-ink-600 mt-1.5 text-sm line-clamp-2 leading-relaxed">{b.excerpt}</p>
                    )}
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-coral-600 group-hover:text-coral-700">
                      Read article <FaArrowRight size={10} className="group-hover:translate-x-0.5 transition" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </PageTransition>
  );
}