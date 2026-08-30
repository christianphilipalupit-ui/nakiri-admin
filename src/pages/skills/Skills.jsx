const defaultSkills = [
  { id: 'skill-frontend-development', name: 'Frontend Development', description: 'Building responsive, accessible web experiences.', level: 'Advanced', category: 'Development', featured: true, visible: true, order: 1 },
  { id: 'skill-ui-ux-design', name: 'UI/UX Design', description: 'Turning complex ideas into simple interfaces.', level: 'Advanced', category: 'Design', featured: false, visible: true, order: 2 },
  { id: 'skill-product-strategy', name: 'Product Strategy', description: 'Connecting user needs to meaningful outcomes.', level: 'Intermediate', category: 'Strategy', featured: false, visible: true, order: 3 },
]

export { defaultSkills }
export const skills = defaultSkills

export default function Skills({ skills: skillList = defaultSkills, onCreate, onEdit }) {
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
        {skillList.map(skill => (
          <article className="static-row" key={skill.id}>
            <span className="row-icon">☆</span>
            <div className="static-copy">
              <strong>{skill.name}</strong>
              <p>{skill.description}</p>
              <small>{skill.category} · {skill.level}</small>
            </div>
            <button className="row-action" type="button" onClick={() => onEdit(skill)}>Edit</button>
          </article>
        ))}
      </div>
    </div>
  )
}
