const defaultPosts = [
  { id: 'social-new-project-teaser', title: 'New project teaser', text: 'A first look at the new portfolio project.', tags: ['product', 'buildinpublic'], platforms: ['Instagram'], status: 'Scheduled', scheduledDate: '2026-08-27', scheduledTime: '10:00', media: 'Image', date: 'Aug 27, 2026' },
  { id: 'social-behind-the-scenes', title: 'Behind the scenes', text: 'A glimpse into my design and build process.', tags: ['design', 'process'], platforms: ['Instagram', 'LinkedIn'], status: 'Published', scheduledDate: '', scheduledTime: '', media: 'Image', date: 'Aug 20, 2026' },
  { id: 'social-weekly-roundup', title: 'Weekly roundup', text: 'Sharing useful links and things I learned this week.', tags: ['learning', 'resources'], platforms: ['LinkedIn'], status: 'Draft', scheduledDate: '', scheduledTime: '', media: 'Image', date: 'Aug 18, 2026' },
]

export { defaultPosts }

export default function SocialPosts({ posts = defaultPosts, onCreate, onEdit }) {
  return (
    <div className="content static-content">
      <div className="page-heading">
        <div><h1>Social Posts</h1><p>Schedule and publish social content.</p></div>
        <button className="primary" onClick={onCreate}>＋ <span>New Social Post</span></button>
      </div>
      <div className="static-list">
        {posts.map(post => (
          <article className="static-row" key={post.id}>
            <span className="row-icon">➤</span>
            <div className="static-copy">
              <strong>{post.title}</strong>
              <p>{post.text}</p>
              <small>{post.status} · {post.date}</small>
            </div>
            <button className="row-action" type="button" onClick={() => onEdit(post)}>Edit</button>
          </article>
        ))}
      </div>
    </div>
  )
}
