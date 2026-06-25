import PageTransition from '../components/PageTransition';
import LeetCodeSection from '../components/activity/LeetCodeSection';
import GithubSection from '../components/activity/GithubSection';

export default function Activity() {
  return (
    <PageTransition>
      <section className="section py-12">
        <header className="mb-10">
          <h1 className="h-display text-4xl font-bold">Coding Activity</h1>
          <p className="text-ink-600 mt-2 max-w-2xl">A live, data-driven view of my problem solving and open-source activity — pulled fresh from LeetCode and GitHub through my backend.</p>
        </header>
        <LeetCodeSection />
        <GithubSection />
      </section>
    </PageTransition>
  );
}
