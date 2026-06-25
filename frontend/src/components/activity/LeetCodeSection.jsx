import { useEffect, useMemo, useState } from 'react';
import api from '../../api/axios';
import StatCard from './StatCard';
import Heatmap from './Heatmap';
import YearSelect from './YearSelect';
import ContestChart from './ContestChart';
import ContestTable from './ContestTable';
import Loader from '../Loader';
import { motion } from 'framer-motion';

const thisYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => thisYear - i);

export default function LeetCodeSection() {
  const [profile, setProfile] = useState(null);
  const [year, setYear] = useState(thisYear);
  const [calendar, setCalendar] = useState(null);
  const [contests, setContests] = useState([]);
  const [loadingCal, setLoadingCal] = useState(false);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    api.get('/leetcode/profile').then((r) => setProfile(r.data)).catch(() => {});
    api.get('/leetcode/contest-history').then((r) => setContests(r.data?.data || r.data?.contestHistory || r.data || [])).catch(() => {});
  }, []);

  useEffect(() => {
    setLoadingCal(true);
    api.get(`/leetcode/calendar/${year}`).then((r) => setCalendar(r.data)).catch(() => setCalendar(null)).finally(() => setLoadingCal(false));
  }, [year]);

  const stats = useMemo(() => {
    if (!profile) return null;
    const ms = profile.matchedUserStats?.acSubmissionNum || profile.submitStats?.acSubmissionNum || [];
    const find = (k) => ms.find((x) => x.difficulty?.toLowerCase() === k)?.count || 0;
    const total = profile.totalSolved ?? find('all');
    return {
      total,
      easy: profile.easySolved ?? find('easy'),
      medium: profile.mediumSolved ?? find('medium'),
      hard: profile.hardSolved ?? find('hard'),
      submissions: profile.totalSubmissions?.[0]?.submissions || profile.totalSubmissionNum?.[0]?.submissions || 0,
      ranking: profile.ranking || 0,
    };
  }, [profile]);

  const calItems = useMemo(() => {
    if (!calendar) return [];
    let cal = calendar.submissionCalendar || calendar.data?.matchedUser?.userCalendar?.submissionCalendar;
    if (typeof cal === 'string') { try { cal = JSON.parse(cal); } catch { cal = {}; } }
    if (!cal) return [];
    return Object.entries(cal).map(([ts, count]) => ({
      date: new Date(Number(ts) * 1000).toISOString().slice(0, 10),
      count: Number(count),
    }));
  }, [calendar]);

  const activeDays = calItems.filter((d) => d.count > 0).length;

  const streak = useMemo(() => {
    let s = 0;
    const days = new Set(calItems.filter((d) => d.count > 0).map((d) => d.date));
    const d = new Date();
    while (days.has(d.toISOString().slice(0, 10))) { s++; d.setDate(d.getDate() - 1); }
    return s;
  }, [calItems]);

  const contestRows = useMemo(() => {
    const arr = Array.isArray(contests) ? contests : [];
    return arr.filter((c) => c.attended).map((c) => ({
      title: c.contest?.title || c.title || 'Contest',
      date: new Date((c.contest?.startTime || c.startTime) * 1000),
      startTime: c.contest?.startTime || c.startTime,
      ranking: c.ranking,
      rating: c.rating,
      problemsSolved: c.problemsSolved,
      totalProblems: c.totalProblems,
    })).sort((a, b) => a.startTime - b.startTime);
  }, [contests]);

  const ratingNow = contestRows.length ? Math.round(contestRows[contestRows.length - 1].rating) : 0;
  const ratingMax = contestRows.length ? Math.round(Math.max(...contestRows.map((r) => r.rating))) : 0;

  return (
    <section className="space-y-12">
      <div>
        <div className="flex items-end justify-between mb-4">
          <h2 className="h-display text-2xl font-semibold">LeetCode Statistics</h2>
          <a href="https://leetcode.com/u/Aniketdey004/" target="_blank" rel="noreferrer" className="text-xs text-coral-600 hover:underline">@Aniketdey004 ↗</a>
        </div>
        {!stats ? <Loader /> : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total Solved" value={stats.total} accent="text-coral-600" />
            <StatCard label="Easy" value={stats.easy} accent="text-green-600" />
            <StatCard label="Medium" value={stats.medium} accent="text-yellow-600" />
            <StatCard label="Hard" value={stats.hard} accent="text-red-600" />
            <StatCard label="Submissions" value={stats.submissions} />
            <StatCard label="Ranking" value={stats.ranking} />
            <StatCard label="Active Days" value={activeDays} />
            <StatCard label="Contests" value={contestRows.length} />
          </div>
        )}
      </div>

      <div>
        <div className="flex items-end justify-between mb-4 gap-3 flex-wrap">
          <div>
            <h2 className="h-display text-2xl font-semibold">LeetCode Activity</h2>
            <p className="text-sm text-ink-500 mt-1">Year {year} · Current streak {streak} days · {activeDays} active days</p>
          </div>
          <YearSelect value={year} onChange={setYear} years={years} />
        </div>
        <div className="card p-5">
          {loadingCal ? <Loader /> : <Heatmap items={calItems} year={year} />}
        </div>
      </div>

      <div>
        <h2 className="h-display text-2xl font-semibold mb-4">Contest Analytics</h2>
        <div className="grid grid-cols-3 gap-4 mb-5">
          <StatCard label="Current Rating" value={ratingNow} accent="text-coral-600" />
          <StatCard label="Max Rating" value={ratingMax} accent="text-ink-900" />
          <StatCard label="Contests" value={contestRows.length} />
        </div>
        <div className="card p-5">
          {contestRows.length ? <ContestChart data={contestRows} /> : <Loader label="Loading contest history…" />}
          <div className="mt-4 flex justify-end">
            <button className="btn-ghost text-sm" onClick={() => setShowTable((v) => !v)}>
              {showTable ? 'Hide Contest History' : 'View Contest History'}
            </button>
          </div>
        </div>
        {showTable && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
            <ContestTable rows={contestRows} />
          </motion.div>
        )}
      </div>
    </section>
  );
}