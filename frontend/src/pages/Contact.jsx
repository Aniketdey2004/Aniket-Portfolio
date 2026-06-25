import { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import api from '../api/axios';
import { HiOutlineMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', form);
      toast.success('Message sent! I will reply soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Could not send message.');
    } finally { setLoading(false); }
  };
  return (
    <PageTransition>
      <section className="section py-12 grid md:grid-cols-[1fr_1.2fr] gap-10">
        <div>
          <h1 className="h-display text-4xl font-bold">Let's talk.</h1>
          <p className="text-ink-600 mt-3">Have a role, project, or collaboration in mind? Send a note — I read every message.</p>
          <div className="mt-6 space-y-3 text-ink-700">
            <div className="flex items-center gap-3"><HiOutlineMail className="text-coral-500" /> aniketdey2004@gmail.com</div>
            <div className="flex items-center gap-3"><FaGithub /> github.com/Aniketdey2004</div>
            <div className="flex items-center gap-3"><SiLeetcode className="text-coral-500" /> leetcode.com/u/Aniketdey004</div>
            <div className="flex items-center gap-3"><FaLinkedin /> LinkedIn</div>
          </div>
        </div>
        <motion.form onSubmit={submit} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input className="input" required placeholder="Your name" value={form.name} onChange={update('name')} />
            <input className="input" type="email" required placeholder="Your email" value={form.email} onChange={update('email')} />
          </div>
          <input className="input" required placeholder="Subject" value={form.subject} onChange={update('subject')} />
          <textarea className="input min-h-[150px] resize-y" required placeholder="Your message" value={form.message} onChange={update('message')} />
          <button disabled={loading} className="btn-coral w-full">{loading ? 'Sending…' : 'Send Message'}</button>
        </motion.form>
      </section>
    </PageTransition>
  );
}
