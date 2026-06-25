import CrudPanel from './CrudPanel';
export default function AdminBlogs() {
  return <CrudPanel
    title="Blogs"
    endpoint="/blogs"
    fields={[
      { key: 'title', label: 'Title' },
      { key: 'slug', label: 'Slug' },
      { key: 'excerpt', label: 'Excerpt' },
      { key: 'coverImage', label: 'Cover Image URL' },
      { key: 'tags', label: 'Tags (comma-separated)', type: 'list', full: true },
      { key: 'content', label: 'Content (Markdown / HTML)', type: 'textarea', full: true },
      { key: 'published', label: 'Published', type: 'bool' },
    ]}
    format={(b) => (<><div className="font-semibold">{b.title}</div><div className="text-sm text-ink-500">/{b.slug} · {b.published ? 'Published' : 'Draft'}</div></>)}
  />;
}
