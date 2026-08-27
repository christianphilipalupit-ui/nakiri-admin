const technologies = [
  ['React', 'Frontend library', '12 projects'],
  ['Next.js', 'React framework', '8 projects'],
  ['TypeScript', 'Typed JavaScript', '7 projects'],
  ['Supabase', 'Backend platform', '4 projects'],
  ['Figma', 'Design tool', '15 projects'],
  ['Tailwind CSS', 'Utility-first CSS', '9 projects'],
]

export default function Technologies({ onCreate, onEdit }) {
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
        {technologies.map(([name, description, meta]) => (
          <article className="static-row" key={name}>
            <span className="row-icon">□</span>
            <div className="static-copy">
              <strong>{name}</strong>
              <p>{description}</p>
              <small>{meta}</small>
            </div>
            <button className="row-action" onClick={() => onEdit(name)}>
              Edit
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}
