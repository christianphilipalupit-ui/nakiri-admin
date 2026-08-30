const defaultPosts = [
  { id: 'post-understanding-apis', title: 'Understanding APIs', slug: 'understanding-apis', excerpt: 'A practical guide to building thoughtful API experiences.', content: '## Building better API experiences\n\nThoughtful APIs make products easier to use and teams easier to support.', category: 'Development', tags: ['React', 'APIs'], status: 'Published', date: 'Aug 23, 2026' },
  { id: 'post-react-state-management', title: 'React State Management', slug: 'react-state-management', excerpt: 'Choosing the right state model for modern applications.', content: '', category: 'Development', tags: ['React'], status: 'Draft', date: 'Aug 21, 2026' },
  { id: 'post-designing-for-calm', title: 'Designing for calm', slug: 'designing-for-calm', excerpt: 'How quiet interfaces help people focus.', content: '', category: 'Design', tags: ['Design'], status: 'Published', date: 'Aug 16, 2026' },
  { id: 'post-craft-of-shipping', title: 'The craft of shipping', slug: 'the-craft-of-shipping', excerpt: 'Small, consistent steps toward better products.', content: '', category: 'Career', tags: ['Process'], status: 'Archived', date: 'Jul 30, 2026' },
]

export { defaultPosts }

export default function BlogPosts({ posts = defaultPosts, onNewPost, onEditPost }) {
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
        {posts.map(post => (
          <article className="static-row" key={post.id}>
            <span className="row-icon">▤</span>
            <div className="static-copy">
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
              <small>{post.status} · {post.date}</small>
            </div>
            <button className="row-action" type="button" onClick={() => onEditPost(post)}>
              Edit
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}
