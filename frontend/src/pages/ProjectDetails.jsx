import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import Loader from '../components/Loader';
import api from '../api/axios';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';

export default function ProjectDetails() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  useEffect(() => { api.get(`/projects/${id}`).then((r) => setP(r.data)).catch(() => setP(false)); }, [id]);
  if (p === null) return <Loader />;
  if (!p) return <div className="section py-16 text-center text-ink-500">Project not found.</div>;
  return (
    <PageTransition>
      <section className="section py-12 max-w-4xl">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900"><FaArrowLeft size={11} /> Back</Link>
        <h1 className="h-display text-4xl font-bold mt-3">{p.title}</h1>
        {p.tagline && <div className="text-coral-600 font-medium mt-1">{p.tagline}</div>}
        <div className="mt-4 flex flex-wrap gap-2">
          {p.techStack?.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {p.githubUrl && <a className="btn-ghost" href={p.githubUrl} target="_blank" rel="noreferrer"><FaGithub /> Source</a>}
          {p.liveUrl && <a className="btn-coral" href={p.liveUrl} target="_blank" rel="noreferrer"><FaExternalLinkAlt /> Live</a>}
        </div>
        <div className="card p-6 mt-8">
          <h3 className="h-display text-lg font-semibold mb-2">Overview</h3>
          <p className="text-ink-600 leading-relaxed">{p.description}</p>
        </div>
        {p.features?.length ? (
          <div className="card p-6 mt-5">
            <h3 className="h-display text-lg font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2">
              {p.features.map((f, i) => (
                <li key={i} className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-coral-500 flex-shrink-0" /><span className="text-ink-700">{f}</span></li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </PageTransition>
  );
}
