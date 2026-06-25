import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { HiOutlineMail } from 'react-icons/hi';

export default function Footer() {
  return (
    <footer className="border-t border-ink-200 mt-20">
      <div className="section py-10 grid md:grid-cols-3 gap-6 items-center">
        <div>
          <div className="h-display text-lg font-semibold">Aniket Dey</div>
          <div className="text-sm text-ink-500">Full Stack Developer · Competitive Programmer</div>
        </div>
        <div className="flex md:justify-center gap-4 text-ink-600">
          <a href="https://github.com/Aniketdey2004" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-coral-500"><FaGithub size={20} /></a>
          <a href="https://leetcode.com/u/Aniketdey004/" target="_blank" rel="noreferrer" aria-label="LeetCode" className="hover:text-coral-500"><SiLeetcode size={20} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-coral-500"><FaLinkedin size={20} /></a>
          <a href="mailto:aniketdey2004@gmail.com" aria-label="Email" className="hover:text-coral-500"><HiOutlineMail size={22} /></a>
        </div>
        <div className="md:text-right text-xs text-ink-500">© {new Date().getFullYear()} Aniket Dey. All rights reserved.</div>
      </div>
    </footer>
  );
}
