import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export default function AdminResume() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const upload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Pick a PDF first');
    setBusy(true);
    const fd = new FormData(); fd.append('resume', file);
    try {
      await api.post('/resume/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Resume replaced'); setFile(null);
    } catch (err) { toast.error(err.response?.data?.error || 'Upload failed'); }
    finally { setBusy(false); }
  };
  return (
    <div>
      <h1 className="h-display text-2xl font-bold mb-1">Resume</h1>
      <p className="text-ink-500 text-sm mb-6">Upload a new PDF — it instantly replaces the public download.</p>
      <form onSubmit={upload} className="card p-6 space-y-4">
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <div className="flex gap-3">
          <button disabled={busy} className="btn-coral">{busy ? 'Uploading…' : 'Upload & Replace'}</button>
          <a href={`${API_BASE}/resume/download`} target="_blank" rel="noreferrer" className="btn-ghost">Download Current</a>
        </div>
      </form>
    </div>
  );
}
