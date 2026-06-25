import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/axios';

export default function CrudPanel({ title, endpoint, fields, format }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const blank = Object.fromEntries(fields.map((f) => [f.key, f.type === 'list' ? '' : '']));
  const [form, setForm] = useState(blank);

  const load = () => api.get(endpoint).then((r) => setItems(r.data));
  useEffect(() => { load(); }, []);

  const startEdit = (it) => {
    setEditing(it._id);
    const f = { ...it };
    fields.forEach((x) => { if (x.type === 'list' && Array.isArray(f[x.key])) f[x.key] = f[x.key].join(', '); });
    setForm(f);
  };
  const reset = () => { setEditing(null); setForm(blank); };

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    fields.forEach((x) => {
      if (x.type === 'list') payload[x.key] = String(payload[x.key] || '').split(',').map((s) => s.trim()).filter(Boolean);
      if (x.type === 'bool') payload[x.key] = !!payload[x.key];
    });
    try {
      if (editing) await api.put(`${endpoint}/${editing}`, payload);
      else await api.post(endpoint, payload);
      toast.success('Saved'); reset(); load();
    } catch (err) { toast.error(err.response?.data?.error || 'Save failed'); }
  };

  const remove = async (id) => {
    if (!confirm('Delete this item?')) return;
    await api.delete(`${endpoint}/${id}`);
    toast.success('Deleted'); load();
  };

  return (
    <div>
      <h1 className="h-display text-2xl font-bold mb-1">{title}</h1>
      <p className="text-ink-500 text-sm mb-6">Create, edit and delete records.</p>

      <form onSubmit={submit} className="card p-5 grid sm:grid-cols-2 gap-3 mb-8">
        {fields.map((f) => (
          <div key={f.key} className={f.full ? 'sm:col-span-2' : ''}>
            <label className="text-xs uppercase tracking-wider text-ink-500">{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea className="input min-h-[100px] mt-1" value={form[f.key] || ''} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
            ) : f.type === 'bool' ? (
              <label className="flex items-center gap-2 mt-2">
                <input type="checkbox" checked={!!form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.checked })} /> Yes
              </label>
            ) : (
              <input className="input mt-1" value={form[f.key] || ''} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} />
            )}
          </div>
        ))}
        <div className="sm:col-span-2 flex gap-3 mt-2">
          <button className="btn-coral">{editing ? 'Update' : 'Create'}</button>
          {editing && <button type="button" onClick={reset} className="btn-ghost">Cancel</button>}
        </div>
      </form>

      <div className="space-y-3">
        {items.map((it) => (
          <div key={it._id} className="card p-4 flex items-start justify-between gap-3">
            <div className="min-w-0">{format(it)}</div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => startEdit(it)} className="btn-ghost py-1.5 px-3 text-xs">Edit</button>
              <button onClick={() => remove(it._id)} className="btn py-1.5 px-3 text-xs bg-red-50 text-red-700 border border-red-200 hover:bg-red-100">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
