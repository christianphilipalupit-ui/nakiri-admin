const posts = [
  ['Understanding APIs', 'A practical guide to building thoughtful API experiences.', 'Published · Aug 23, 2026'],
  ['React State Management', 'Choosing the right state model for modern applications.', 'Draft · Aug 21, 2026'],
  ['Designing for calm', 'How quiet interfaces help people focus.', 'Published · Aug 16, 2026'],
  ['The craft of shipping', 'Small, consistent steps toward better products.', 'Archived · Jul 30, 2026'],
]

export default function BlogPosts({ onNewPost, onEditPost }) {
  return (
    <div className="content static-content">
      <div className="page-heading">
        <div>
          <h1>Blog Posts</h1>
          <p>Create and manage your published writing.</p>
        </div>
        <button className="primary" onClick={onNewPost}>
          ＋ <span>New Blog Post</span>
        </button>
      </div>

      <div className="static-list">
        {posts.map(([title, excerpt, metadata]) => (
          <article className="static-row" key={title}>
            <span className="row-icon">▤</span>
            <div className="static-copy">
              <strong>{title}</strong>
              <p>{excerpt}</p>
              <small>{metadata}</small>
            </div>
            <button className="row-action" onClick={() => onEditPost(title)}>
              Edit
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}
