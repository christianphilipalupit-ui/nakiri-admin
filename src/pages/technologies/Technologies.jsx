const defaultTechnologies = [
  { id: 'technology-react', name: 'React', slug: 'react', description: 'Frontend library', category: 'Frontend', status: 'Active', featured: true, visible: true, order: 1, meta: '12 projects' },
  { id: 'technology-nextjs', name: 'Next.js', slug: 'nextjs', description: 'React framework', category: 'Frontend', status: 'Active', featured: false, visible: true, order: 2, meta: '8 projects' },
  { id: 'technology-typescript', name: 'TypeScript', slug: 'typescript', description: 'Typed JavaScript', category: 'Frontend', status: 'Active', featured: false, visible: true, order: 3, meta: '7 projects' },
  { id: 'technology-supabase', name: 'Supabase', slug: 'supabase', description: 'Backend platform', category: 'Backend', status: 'Active', featured: false, visible: true, order: 4, meta: '4 projects' },
  { id: 'technology-figma', name: 'Figma', slug: 'figma', description: 'Design tool', category: 'Tools', status: 'Active', featured: false, visible: true, order: 5, meta: '15 projects' },
  { id: 'technology-tailwind', name: 'Tailwind CSS', slug: 'tailwind-css', description: 'Utility-first CSS', category: 'Frontend', status: 'Active', featured: false, visible: true, order: 6, meta: '9 projects' },
]

export { defaultTechnologies }

export default function Technologies({ technologies = defaultTechnologies, onCreate, onEdit }) {
  return (
    <div className="content static-content">
      <div className="page-heading">
        <div>
          <h1>Technologies</h1>
          <p>Manage the tools and technologies in your portfolio.</p>
        </div>
        <button className="primary" onClick={onCreate}>
          ＋ <span>Add Technology</span>
        </button>
      </div>
      <div className="static-list">
        {technologies.map(technology => (
          <article className="static-row" key={technology.id}>
            <span className="row-icon">□</span>
            <div className="static-copy">
              <strong>{technology.name}</strong>
              <p>{technology.description}</p>
              <small>{technology.meta || (technology.order || 0) + ' projects'}</small>
            </div>
            <button className="row-action" type="button" onClick={() => onEdit(technology)}>
              Edit
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}
