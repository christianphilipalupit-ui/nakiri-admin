export const skills = [
  { name: 'Frontend Development', description: 'Building responsive, accessible web experiences.', level: 'Advanced', category: 'Development' },
  { name: 'UI/UX Design', description: 'Turning complex ideas into simple interfaces.', level: 'Advanced', category: 'Design' },
  { name: 'Product Strategy', description: 'Connecting user needs to meaningful outcomes.', level: 'Intermediate', category: 'Strategy' },
]

export default function Skills({ onCreate, onEdit }) {
  return (
    <div className="content static-content">
      <div className="page-heading">
        <div>
          <h1>Skills</h1>
          <p>Manage the skills and expertise shown on your portfolio.</p>
        </div>
        <button className="primary" onClick={onCreate}>＋ <span>Add Skill</span></button>
      </div>
      <div className="static-list">
        {skills.map(skill => (
          <article className="static-row" key={skill.name}>
            <span className="row-icon">☆</span>
            <div className="static-copy">
              <strong>{skill.name}</strong>
              <p>{skill.description}</p>
              <small>{skill.category} · {skill.level}</small>
            </div>
            <button className="row-action" onClick={() => onEdit(skill)}>Edit</button>
          </article>
        ))}
      </div>
    </div>
  )
}
