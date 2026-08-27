const quickActions = [
  ['New Project', 'Start a new project', '□'],
  ['Write a Post', 'Create a new blog post', '✎'],
  ['Create Social Post', 'Schedule or publish content', '➤'],
]

const recentItems = [
  ['Forex Journal', 'Edited project', 'Projects', 'Today, 10:45 AM', '□'],
  ['Understanding APIs', 'Published blog post', 'Blog Posts', 'Yesterday, 09:30 PM', '▤'],
  ['New project teaser', 'Scheduled social post', 'Social Posts', 'Aug 23, 10:00 AM', '➤'],
  ['Supabase Integration', 'Edited project', 'Projects', 'Aug 22, 02:15 PM', '□'],
  ['React State Management', 'Draft blog post', 'Blog Posts', 'Aug 21, 11:20 AM', '▤'],
]

const overviewItems = [
  ['Projects', '12', '□'],
  ['Blog Posts', '8', '▤'],
  ['Social Posts', '3', '➤'],
  ['Technologies', '15', '▱'],
  ['Skills', '10', '☆'],
]

export default function Dashboard({ onNewProject, onNewPost, onNewSocialPost }) {
  const title = 'Good morning, Christian! 👋'
  const description = "Let's create something amazing today."
  const actionHandlers = [onNewProject, onNewPost, onNewSocialPost]

  return (
    <div className="content">
      <div className="page-heading">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <button className="primary" onClick={onNewProject}>
          ＋ <span>New Project</span>
        </button>
      </div>

      <section className="welcome-grid">
        {quickActions.map(([label, helper, icon], index) => (
          <button className="action-card" key={label} onClick={actionHandlers[index]}>
            <span className="action-icon">{icon}</span>
            <span>
              <strong>{label}</strong>
              <small>{helper}</small>
            </span>
            <b>→</b>
          </button>
        ))}
      </section>

      <section className="preview-grid">
        <div className="panel recent">
          <div className="panel-title">
            <h2>Recently Worked On</h2>
            <a>View all</a>
          </div>
          {recentItems.map(([item, action, section, time, icon]) => (
            <div className="recent-row" key={item}>
              <span className="row-icon">{icon}</span>
              <span>
                <strong>{item}</strong>
                <small>{action} <em>•</em> {section}</small>
              </span>
              <time>{time}</time>
            </div>
          ))}
        </div>

        <div className="panel overview">
          <div className="panel-title">
            <h2>Overview</h2>
          </div>
          {overviewItems.map(([name, count, icon]) => (
            <div className="overview-row" key={name}>
              <span className="row-icon">{icon}</span>
              <strong>{name}</strong>
              <b>{count}</b>
            </div>
          ))}
        </div>
      </section>

      <div className="quote">
        <span>“</span>
        <div>
          <strong>Consistency turns ideas into reality.</strong>
          <small>Keep building.</small>
        </div>
        <i>Christian</i>
      </div>
    </div>
  )
}

export { Dashboard as DashboardContent }
