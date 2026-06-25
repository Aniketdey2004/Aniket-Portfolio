import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Loader from '../components/Loader';
import api from '../api/axios';
import { HiArrowLeft } from 'react-icons/hi';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    // try by id first, fall back to slug lookup
    api.get(`/blogs/${id}`)
      .then((r) => setBlog(r.data))
      .catch(() => {
        api.get('/blogs')
          .then((r) => {
            const found = (r.data || []).find((b) => b.slug === id || b._id === id);
            if (found) setBlog(found); else setErr(true);
          })
          .catch(() => setErr(true));
      });
  }, [id]);

  if (err) {
    return (
      <PageTransition>
        <section className="section py-24 text-center">
          <h1 className="h-display text-3xl font-bold">Blog not found</h1>
          <Link to="/blogs" className="btn-ghost mt-6 inline-flex"><HiArrowLeft /> Back to blogs</Link>
        </section>
      </PageTransition>
    );
  }
  if (!blog) return <PageTransition><section className="section py-16"><Loader /></section></PageTransition>;

  return (
    <PageTransition>
      <article className="section max-w-3xl py-12">
        <Link to="/blogs" className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-coral-600 mb-6">
          <HiArrowLeft /> All blogs
        </Link>
        <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-[11px] uppercase tracking-wider text-coral-600 font-semibold">
            {blog.createdAt && new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <h1 className="h-display text-3xl sm:text-5xl font-bold mt-2 leading-tight">{blog.title}</h1>
          {blog.excerpt && <p className="text-ink-600 mt-4 text-lg leading-relaxed">{blog.excerpt}</p>}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {(blog.tags || []).map((t, i) => <span key={i} className="chip">{t}</span>)}
          </div>
        </motion.header>
        {blog.coverImage && (
          <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            src={blog.coverImage} alt={blog.title}
            className="mt-8 w-full rounded-2xl border border-ink-200 shadow-soft" />
        )}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="prose prose-ink mt-10 max-w-none text-ink-700 leading-relaxed whitespace-pre-wrap text-base sm:text-lg"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </PageTransition>
  );
}
