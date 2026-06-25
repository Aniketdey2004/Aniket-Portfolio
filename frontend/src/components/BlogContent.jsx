export default function BlogContent({ content }) {
  if (!content) return null;
  const isHtml = /<[a-z][\s\S]*>/i.test(content);
  if (isHtml) {
    return <div className="blog-prose" dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return (
    <div className="space-y-4">
      {content.split(/\n\n+/).filter(Boolean).map((para, i) => (
        <p key={i} className="text-ink-600 leading-relaxed">{para}</p>
      ))}
    </div>
  );
}
