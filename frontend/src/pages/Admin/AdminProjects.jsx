import CrudPanel from './CrudPanel';
export default function AdminProjects() {
  return <CrudPanel
    title="Projects"
    endpoint="/projects"
    fields={[
      { key: 'title', label: 'Title' },
      { key: 'tagline', label: 'Tagline' },
      { key: 'description', label: 'Description', type: 'textarea', full: true },
      { key: 'techStack', label: 'Tech Stack (comma-separated)', type: 'list', full: true },
      { key: 'features', label: 'Features (comma-separated)', type: 'list', full: true },
      { key: 'githubUrl', label: 'GitHub URL' },
      { key: 'liveUrl', label: 'Live URL' },
      { key: 'order', label: 'Order' },
    ]}
    format={(p) => (<><div className="font-semibold">{p.title}</div><div className="text-sm text-ink-500 truncate">{p.tagline}</div></>)}
  />;
}
