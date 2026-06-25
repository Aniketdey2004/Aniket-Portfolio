import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import PageTransition from '../components/PageTransition';
import { FaGithub, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { HiDownload } from 'react-icons/hi';
import api from '../api/axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export default function Home() {
  const blobRef = useRef(null);
  useEffect(() => {
    if (!blobRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(blobRef.current, { y: 18, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    });
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      <section className="section pt-14 md:pt-20 pb-12">
        <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          <div>
            <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="chip mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-coral-500" /> Available for Full-Time SDE roles
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="h-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Hi, I'm <span className="bg-coral-gradient bg-clip-text text-transparent">Aniket Dey</span>.
              <br />I build production-grade <span className="text-ink-900">web products</span>.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
              className="mt-5 text-ink-600 text-lg leading-relaxed max-w-xl">
              Full-Stack MERN engineer and competitive programmer. I architect scalable REST APIs,
              ship pixel-perfect React frontends, and have solved 700+ DSA problems across LeetCode
              and GeeksforGeeks with a peak contest rating of 1718 over 42 contests.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
              className="mt-7 flex flex-wrap gap-3">
              <a className="btn-coral" href={`${API_BASE}/resume/download`}>
                <HiDownload size={18} /> Download Resume
              </a>
              <Link to="/projects" className="btn-ghost">
                View Projects <FaArrowRight size={12} />
              </Link>
              <Link to="/contact" className="btn-primary">Get in touch</Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.36 }}
              className="mt-7 flex items-center gap-4 text-ink-500">
              <a href="https://github.com/Aniketdey2004" target="_blank" rel="noreferrer" className="hover:text-coral-500"><FaGithub size={20} /></a>
              <a href="https://leetcode.com/u/Aniketdey004/" target="_blank" rel="noreferrer" className="hover:text-coral-500"><SiLeetcode size={20} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-coral-500"><FaLinkedin size={20} /></a>
              <span className="text-xs">Kolkata, India</span>
            </motion.div>
          </div>

          <div className="relative justify-self-center">
            <div ref={blobRef} className="absolute -inset-6 bg-coral-gradient opacity-25 blur-3xl rounded-[40%]" />
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-elevated border border-ink-200 bg-white">
              <img src="/Aniket.jpg" alt="Aniket Dey" className="w-[320px] sm:w-[380px] h-[420px] sm:h-[480px] object-cover" />
              {/* <div className="absolute bottom-4 left-4 right-4 bg-white/85 backdrop-blur rounded-xl px-4 py-3 border border-ink-200">
                <div className="text-xs uppercase tracking-wider text-coral-600 font-semibold">Currently</div>
                <div className="text-sm text-ink-800">Full Stack Developer Intern @ NRXEN IT Solutions</div>
              </div> */}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section pb-16">
        <div className="grid md:grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-6">
            <div className="text-xs uppercase tracking-wider text-coral-600 font-semibold">Education</div>
            <h3 className="h-display text-xl font-semibold mt-1">Heritage Institute of Technology, Kolkata</h3>
            <p className="text-ink-600 mt-2">B.Tech in Computer Science &amp; Engineering (Data Science)</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="chip">Aug 2023 – Jun 2027</span>
              <span className="chip border-coral-200 bg-coral-50 text-coral-700">CGPA 9.57 / 10.0</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="card p-6">
            <div className="text-xs uppercase tracking-wider text-coral-600 font-semibold">Current Role</div>
            <h3 className="h-display text-xl font-semibold mt-1">Full Stack Developer Intern</h3>
            <p className="text-ink-600 mt-2">NRXEN IT Solutions Pvt. Ltd. — building the React.js frontend for Wear Buddy smartwatch integrations: health metrics, geofence alerts and realtime GraphQL data.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="chip">React.js</span><span className="chip">GraphQL</span><span className="chip">Realtime</span>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
