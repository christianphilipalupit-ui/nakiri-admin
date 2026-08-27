import { useState } from 'react'
import FormField from '../../components/ui/FormField.jsx'

const technologyOptions = ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Node.js', 'Express.js', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Firebase', 'Supabase', 'Tailwind CSS', 'SCSS', 'Git', 'Docker', 'Vercel']

const emptyProject = {
  name: '', slug: '', short: '', full: '', techs: [], status: 'Draft',
}

export default function ProjectEditor({ editing, onBack }) {
  const project = editing ? { name: 'Forex Journal', slug: 'forex-journal', short: 'AI-powered trading journal with analytics and insights.', full: 'A focused trading journal that turns daily market research into clear, actionable insights.', techs: ['React', 'Firebase', 'OpenAI'], status: 'Published' } : emptyProject
  const [name, setName] = useState(project.name)
  const [slug, setSlug] = useState(project.slug)
  const [short, setShort] = useState(project.short)
  const [full, setFull] = useState(project.full)
  const [techs, setTechs] = useState(project.techs)
  const [status, setStatus] = useState(project.status)
  const [visibility, setVisibility] = useState('Public')
  const [featured, setFeatured] = useState(editing)
  const [showOnPortfolio, setShowOnPortfolio] = useState(true)
  const [notice, setNotice] = useState('')

  const toggleTech = technology => {
    setTechs(current => current.includes(technology) ? current.filter(item => item !== technology) : [...current, technology])
  }

  const updateName = value => {
    setName(value)
    if (!editing || !slug) setSlug(value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
  }

  const notify = message => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2200)
  }

  return (
    <div className="content editor-content project-editor">
      <div className="editor-heading">
        <button className="back-button" onClick={onBack}>← <span>Back to Projects</span></button>
        <div className="editor-title">
          <h1>{editing ? 'Edit Project' : 'Create New Project'}</h1>
          <p>{editing ? 'Update your portfolio project details.' : 'Add a project to your portfolio.'}</p>
        </div>
        <div className="editor-actions">
          <button className="secondary" onClick={() => notify('Draft saved')}>Save Draft</button>
          <button className="primary" onClick={() => notify(editing ? 'Project changes saved' : 'Project published')}>{editing ? 'Save Changes' : 'Publish'}</button>
        </div>
      </div>

      {notice && <div className="toast">✓ {notice}</div>}

      <div className="editor-grid project-grid">
        <div className="editor-main">
          <section className="form-panel">
            <h2>Project Information</h2>
            <FormField label="Project Name"><input value={name} onChange={event => updateName(event.target.value)} placeholder="Enter project name..." /></FormField>
            <FormField label="Project Slug"><input value={slug} onChange={event => setSlug(event.target.value)} placeholder="project-slug" /></FormField>
            <FormField label="Short Description"><textarea rows="3" value={short} onChange={event => setShort(event.target.value)} placeholder="A short description for project cards..." /></FormField>
            <FormField label="Full Project Description"><textarea rows="7" value={full} onChange={event => setFull(event.target.value)} placeholder="Describe the project, your role, and the outcome..." /></FormField>
          </section>
          <section className="form-panel"><h2>Project Media</h2><div className="upload-area"><span className="upload-icon">▧</span><strong>Upload Project Cover</strong><small>Drop image here · Recommended project thumbnail</small><button className="secondary">Choose Image</button></div></section>
          <section className="form-panel">
            <h2>Project Technologies</h2>
            <div className="tech-chips">{techs.map(technology => <span className="tag" key={technology}>{technology}<button onClick={() => toggleTech(technology)}>×</button></span>)}</div>
            <div className="tech-options">{technologyOptions.map(technology => <button type="button" key={technology} className={techs.includes(technology) ? 'selected' : ''} onClick={() => toggleTech(technology)}>{technology}</button>)}</div>
          </section>
          <section className="form-panel"><h2>Project Links</h2><FormField label="Live Demo URL"><input placeholder="https://your-project.com" /></FormField><FormField label="GitHub Repository URL"><input placeholder="https://github.com/username/project" /></FormField></section>
        </div>

        <aside className="editor-side">
          <section className="form-panel">
            <h2>Status & Visibility</h2>
            <FormField label="Status"><select value={status} onChange={event => setStatus(event.target.value)}><option>Draft</option><option>Published</option><option>Archived</option></select></FormField>
            <div className="status-options"><label><input type="radio" name="visibility" checked={visibility === 'Public'} onChange={() => setVisibility('Public')} /> Public</label><label><input type="radio" name="visibility" checked={visibility === 'Private'} onChange={() => setVisibility('Private')} /> Private</label></div>
            <label className="check-row"><input type="checkbox" checked={featured} onChange={event => setFeatured(event.target.checked)} /> <span>Featured Project</span></label>
            <label className="check-row"><input type="checkbox" checked={showOnPortfolio} onChange={event => setShowOnPortfolio(event.target.checked)} /> <span>Show on Portfolio</span></label>
          </section>
          <section className="form-panel">
            <div className="section-inline"><h2>Project Preview</h2><span className="word-count">{status}</span></div>
            <div className="project-preview"><div className="project-cover">▧<small>Cover image preview</small></div><h3>{name || 'Your project name'}</h3><p>{short || 'Your short project description will appear here.'}</p><div className="preview-tags">{techs.map(technology => <span key={technology}>{technology}</span>)}</div></div>
          </section>
        </aside>
      </div>
    </div>
  )
}
