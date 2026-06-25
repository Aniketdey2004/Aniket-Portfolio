import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HiOutlineLogout } from 'react-icons/hi';

const items = [
  { to: 'projects', label: 'Projects' },
  { to: 'experiences', label: 'Experiences' },
  { to: 'blogs', label: 'Blogs' },
  { to: 'resume', label: 'Resume' },
];

export default function AdminLayout() {
  const { logout, user } = useAuth();
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-ink-50 flex">
      <aside className="w-60 bg-ink-900 text-ink-100 p-5 hidden md:flex flex-col">
        <Link to="/" className="h-display text-lg font-bold text-white">Aniket Dey</Link>
        <div className="text-xs text-ink-400 mt-1">Admin Dashboard</div>
        <nav className="mt-8 flex flex-col gap-1">
          {items.map((i) => (
            <NavLink key={i.to} to={i.to} className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-coral-gradient text-white' : 'text-ink-300 hover:bg-ink-700'}`}>
              {i.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto pt-6 text-xs">
          <div className="text-ink-400 mb-2">{user?.email}</div>
          <button onClick={() => { logout(); nav('/login'); }} className="flex items-center gap-2 text-ink-300 hover:text-white">
            <HiOutlineLogout /> Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10 max-w-5xl">
        <Outlet />
      </main>
    </div>
  );
}
