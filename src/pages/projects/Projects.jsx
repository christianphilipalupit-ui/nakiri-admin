const defaultProjects = [
  { id: 'project-forex-journal', name: 'Forex Journal', short: 'AI-powered trading journal with analytics and insights.', full: 'A focused trading journal that turns daily market research into clear, actionable insights.', techs: ['React', 'Firebase', 'OpenAI'], status: 'Published' },
  { id: 'project-portfolio-website', name: 'Portfolio Website', short: 'My personal portfolio website.', full: 'A personal portfolio website showcasing selected work and capabilities.', techs: ['Next.js', 'SCSS', 'Framer Motion'], status: 'Published' },
  { id: 'project-novel-platform', name: 'Novel Platform', short: 'Platform for reading and creating stories.', full: 'A platform for reading, writing, and sharing stories.', techs: ['React', 'MongoDB', 'Express'], status: 'Draft' },
  { id: 'project-our-calm-world', name: 'Our Calm World', short: 'Travel blog and guide website.', full: 'A calm travel blog and guide for thoughtful journeys.', techs: ['Next.js', 'Tailwind CSS', 'Vercel'], status: 'Draft' },
  { id: 'project-ai-code-playground', name: 'AI Code Playground', short: 'Online code editor with AI assistance.', full: 'An online code editor that helps developers explore ideas with AI assistance.', techs: ['React', 'Monaco Editor', 'Node.js'], status: 'Archived' },
]

export { defaultProjects }

export default function Projects({ projects = defaultProjects, loading = false, error = '', onNewProject, onEditProject }) {
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

      {loading && <p className="project-list-state">Loading Portfolio projects…</p>}
      {!loading && error && <p className="project-list-state error">{error}</p>}
      {!loading && !error && !projects.length && <p className="project-list-state">No Portfolio projects found.</p>}
      {!loading && !error && <div className="static-list">
        {projects.map(project => (
          <article className="static-row" key={project.id}>
            {project.coverImage ? <img className="project-list-image" src={project.coverImage.publicUrl} alt={project.coverImage.alt_text || project.name + ' cover'} /> : <span className="row-icon">□</span>}
            <div className="static-copy">
              <strong>{project.name}</strong>
              <p>{project.short}</p>
              <small>{Array.isArray(project.techs) ? project.techs.join(' · ') : project.technologies}</small>
            </div>
            {project.status && <span className={`badge ${project.status.toLowerCase()}`}>• {project.status}</span>}
            <button className="row-action" onClick={() => onEditProject(project)}>
              Edit
            </button>
          </article>
        ))}
      </div>}
    </div>
  )
}
