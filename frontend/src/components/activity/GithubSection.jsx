import { useEffect, useMemo, useState } from 'react';
import api from '../../api/axios';
import StatCard from './StatCard';
import Heatmap from './Heatmap';
import YearSelect from './YearSelect';
import Loader from '../Loader';

const thisYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => thisYear - i);

export default function GithubSection() {
  const [profile, setProfile] = useState(null);
  const [year, setYear] = useState(thisYear);
  const [contrib, setContrib] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { api.get('/github/profile').then((r) => setProfile(r.data)).catch(() => {}); }, []);
  useEffect(() => {
    setLoading(true);
    api.get(`/github/contributions/${year}`).then((r) => setContrib(r.data)).catch(() => setContrib(null)).finally(() => setLoading(false));
  }, [year]);

  const items = contrib?.contributions || [];
  const total = contrib?.total?.[year] ?? items.reduce((s, d) => s + (d.count || 0), 0);
  const activeDays = items.filter((d) => d.count > 0).length;

  return (
    <section className="space-y-6 mt-16">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h2 className="h-display text-2xl font-semibold">GitHub Activity</h2>
          <p className="text-sm text-ink-500 mt-1">
            {profile?.username ? `@${profile.username}` : '@Aniketdey2004'} · Year {year} · {total} contributions · {activeDays} active days
          </p>
        </div>
        <YearSelect value={year} onChange={setYear} years={years} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard label="Public Repos" value={profile?.publicRepos || 0} accent="text-coral-600" />
        <StatCard label="Total Contributions" value={total} />
        <StatCard label="Active Days" value={activeDays} />
      </div>
      <div className="card p-5">
        {loading ? <Loader /> : <Heatmap items={items} year={year} />}
      </div>
    </section>
  );
}
