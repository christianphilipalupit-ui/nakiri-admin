const projects = [
  ['Forex Journal', 'AI-powered trading journal with analytics and insights.', 'React · Firebase · OpenAI', 'Published'],
  ['Portfolio Website', 'My personal portfolio website.', 'Next.js · SCSS · Framer Motion', 'Published'],
  ['Novel Platform', 'Platform for reading and creating stories.', 'React · MongoDB · Express', 'Draft'],
  ['Our Calm World', 'Travel blog and guide website.', 'Next.js · Tailwind CSS · Vercel', 'Draft'],
  ['AI Code Playground', 'Online code editor with AI assistance.', 'React · Monaco Editor · Node.js', 'Archived'],
]

export default function Projects({ onNewProject, onEditProject }) {
  return (
    <div className="content static-content">
      <div className="page-heading">
        <div>
          <h1>Projects</h1>
          <p>Manage projects displayed on your portfolio.</p>
        </div>
        <button className="primary" onClick={onNewProject}>
          ＋ <span>New Project</span>
        </button>
      </div>

      <div className="static-list">
        {projects.map(([name, description, technologies, status]) => (
          <article className="static-row" key={name}>
            <span className="row-icon">□</span>
            <div className="static-copy">
              <strong>{name}</strong>
              <p>{description}</p>
              <small>{technologies}</small>
            </div>
            <span className={`badge ${status.toLowerCase()}`}>• {status}</span>
            <button className="row-action" onClick={() => onEditProject(name)}>
              Edit
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}
