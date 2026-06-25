import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

const links = [
  { to: '/', label: 'Home' },
  { to: '/activity', label: 'Activity' },
  { to: '/experience', label: 'Experience' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-ink-50/75 backdrop-blur-md border-b border-ink-200/70">
      <div className="section flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src="/Aniket.jpg" alt="Aniket Dey" className="h-9 w-9 rounded-full object-cover ring-2 ring-coral-200 group-hover:ring-coral-400 transition" />
          <span className="h-display font-semibold text-ink-900">Aniket Dey</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) =>
                `relative px-3.5 py-2 text-sm rounded-full transition ${isActive ? 'text-ink-900' : 'text-ink-500 hover:text-ink-800'}`}>
              {({ isActive }) => (
                <>
                  <span>{l.label}</span>
                  {isActive && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 bg-ink-100 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <button className="md:hidden p-2 text-ink-800" onClick={() => setOpen((v) => !v)}>
          {open ? <HiX size={22} /> : <HiMenu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-ink-200 bg-ink-50">
            <div className="section py-3 flex flex-col">
              {links.map((l) => (
                <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)}
                  className={({ isActive }) => `px-2 py-2.5 rounded-lg text-sm ${isActive ? 'text-ink-900 bg-ink-100' : 'text-ink-600'}`}>
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
