import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Loader from '../components/Loader';
import BlogContent from '../components/BlogContent';
import api from '../api/axios';
import { FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';

function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    api.get(`/blogs/${id}`).then((r) => setBlog(r.data)).catch(() => setBlog(false));
  }, [id]);

  if (blog === null) return <Loader label="Loading article…" />;
  if (!blog) {
    return (
      <PageTransition>
        <div className="section py-16 text-center">
          <p className="text-ink-500">Blog post not found.</p>
          <Link to="/blogs" className="inline-flex items-center gap-2 mt-4 text-sm text-coral-600 hover:text-coral-700">
            <FaArrowLeft size={11} /> Back to blogs
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <article className="section py-12 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/blogs" className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 transition">
            <FaArrowLeft size={11} /> All blogs
          </Link>
        </motion.div>

        {blog.coverImage && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-6 rounded-2xl overflow-hidden border border-ink-200 shadow-soft aspect-[16/9] bg-ink-100"
          >
            <img src={blog.coverImage} alt="" className="w-full h-full object-cover" />
          </motion.div>
        )}

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8"
        >
          <div className="flex flex-wrap items-center gap-3 text-sm text-ink-500">
            <span className="inline-flex items-center gap-1.5">
              <FaCalendarAlt size={12} className="text-coral-500" />
              {formatDate(blog.createdAt)}
            </span>
            {blog.tags?.length ? (
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((t) => <span key={t} className="chip">{t}</span>)}
              </div>
            ) : null}
          </div>
          <h1 className="h-display text-3xl sm:text-4xl font-bold mt-4 leading-tight">{blog.title}</h1>
          {blog.excerpt && <p className="text-ink-600 text-lg mt-3 leading-relaxed">{blog.excerpt}</p>}
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="card p-6 sm:p-8 mt-8"
        >
          <BlogContent content={blog.content} />
        </motion.div>
      </article>
    </PageTransition>
  );
}
