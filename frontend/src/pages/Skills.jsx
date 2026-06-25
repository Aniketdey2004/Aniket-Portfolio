import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import {
  SiJavascript, SiPython, SiMysql, SiTypescript,
  SiReact, SiNextdotjs, SiRedux, SiTailwindcss, SiBootstrap,
  SiNodedotjs, SiExpress, SiPostman, SiGit, SiGithub,
  SiMongodb, SiNumpy, SiPandas, SiScikitlearn,
} from 'react-icons/si';
import { FaJava, FaServer, FaChartLine } from 'react-icons/fa';
import { TbBrandCpp, TbBinaryTree, TbDatabaseCog, TbCpu, TbNetwork } from 'react-icons/tb';
import { BsCodeSquare } from 'react-icons/bs';

const groups = [
  { title: 'Languages', items: [
    { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'Java', icon: FaJava, color: '#ea2d2e' },
    { name: 'SQL', icon: SiMysql, color: '#4479A1' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
  ]},
  { title: 'Frontend', items: [
    { name: 'React.js', icon: SiReact, color: '#61dafb' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#000' },
    { name: 'Redux.js', icon: SiRedux, color: '#764abc' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38bdf8' },
    { name: 'Bootstrap', icon: SiBootstrap, color: '#7c3aed' },
  ]},
  { title: 'Backend', items: [
    { name: 'Node.js', icon: SiNodedotjs, color: '#3c873a' },
    { name: 'Express.js', icon: SiExpress, color: '#000' },
    { name: 'REST APIs', icon: FaServer, color: '#d35d44' },
  ]},
  { title: 'Databases', items: [
    { name: 'MongoDB', icon: SiMongodb, color: '#4DB33D' },
    { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  ]},
  { title: 'Machine Learning & Data Analytics', items: [
    { name: 'NumPy', icon: SiNumpy, color: '#013243' },
    { name: 'Pandas', icon: SiPandas, color: '#150458' },
    { name: 'Matplotlib', icon: FaChartLine, color: '#11557c' },
    { name: 'Scikit-learn', icon: SiScikitlearn, color: '#F7931E' },
  ]},
  { title: 'Tools & Platforms', items: [
    { name: 'Git', icon: SiGit, color: '#f05033' },
    { name: 'GitHub', icon: SiGithub, color: '#000' },
    { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
  ]},
  { title: 'Computer Science Fundamentals', items: [
    { name: 'DSA', icon: TbBinaryTree, color: '#d35d44' },
    { name: 'OOP', icon: BsCodeSquare, color: '#4a4641' },
    { name: 'Operating Systems', icon: TbCpu, color: '#4a4641' },
    { name: 'DBMS', icon: TbDatabaseCog, color: '#4a4641' },
    { name: 'Computer Networks', icon: TbNetwork, color: '#4a4641' },
  ]},
];

export default function Skills() {
  return (
    <PageTransition>
      <section className="section py-12">
        <header className="mb-10">
          <h1 className="h-display text-4xl font-bold">Skills</h1>
          <p className="text-ink-600 mt-2">The tools and disciplines I use to ship.</p>
        </header>
        <div className="space-y-8">
          {groups.map((g, gi) => (
            <motion.div key={g.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: gi * 0.04 }}>
              <h3 className="h-display text-lg font-semibold mb-3">{g.title}</h3>
              <div className="flex flex-wrap gap-3">
                {g.items.map(({ name, icon: Icon, color }) => (
                  <div key={name} className="card px-4 py-3 flex items-center gap-3 hover:-translate-y-0.5 hover:shadow-elevated transition">
                    <Icon size={22} style={{ color }} />
                    <span className="text-sm font-medium text-ink-800">{name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
