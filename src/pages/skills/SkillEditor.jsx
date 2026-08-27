import { useState } from 'react'
import FormField from '../../components/ui/FormField.jsx'

const categories = ['Development', 'Design', 'Strategy', 'Communication', 'Other']
const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert']
const emptySkill = { name: '', description: '', category: 'Development', level: 'Intermediate', featured: false, visible: true, order: 1 }

export default function SkillEditor({ editing = false, skill, onBack }) {
  const initial = editing && skill ? skill : emptySkill
  const [name, setName] = useState(initial.name)
  const [description, setDescription] = useState(initial.description)
  const [category, setCategory] = useState(initial.category)
  const [level, setLevel] = useState(initial.level)
  const [featured, setFeatured] = useState(Boolean(initial.featured))
  const [visible, setVisible] = useState(initial.visible !== false)
  const [order, setOrder] = useState(initial.order)
  const [notice, setNotice] = useState('')

  const save = message => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2200)
  }

  return (
    <div className="content editor-content technology-editor">
      <div className="editor-heading">
        <button className="back-button" onClick={onBack}>← <span>Back to Skills</span></button>
        <div className="editor-title">
          <h1>{editing ? 'Edit Skill' : 'Create Skill'}</h1>
          <p>Manage this skill in your portfolio.</p>
        </div>
        <div className="editor-actions">
          <button className="secondary" onClick={() => save('Skill saved')}>Save{editing ? ' Changes' : ''}</button>
          <button className="primary" onClick={() => save(editing ? 'Changes saved' : 'Skill created')}>{editing ? 'Save Changes' : 'Save'}</button>
        </div>
      </div>
      {notice && <div className="toast">✓ {notice}</div>}
      <div className="editor-grid technology-grid">
        <div className="editor-main">
          <section className="form-panel">
            <h2>Skill Information</h2>
            <FormField label="Skill Name"><input value={name} onChange={event => setName(event.target.value)} placeholder="Frontend Development" /></FormField>
            <FormField label="Description"><textarea rows="4" value={description} onChange={event => setDescription(event.target.value)} placeholder="Describe this skill..." /></FormField>
          </section>
          <section className="form-panel">
            <h2>Classification</h2>
            <FormField label="Category"><select value={category} onChange={event => setCategory(event.target.value)}>{categories.map(item => <option key={item}>{item}</option>)}</select></FormField>
            <FormField label="Proficiency"><select value={level} onChange={event => setLevel(event.target.value)}>{levels.map(item => <option key={item}>{item}</option>)}</select></FormField>
          </section>
        </div>
        <aside className="editor-side">
          <section className="form-panel">
            <h2>Display Settings</h2>
            <label className="check-row"><input type="checkbox" checked={featured} onChange={event => setFeatured(event.target.checked)} /><span>Featured Skill</span></label>
            <label className="check-row"><input type="checkbox" checked={visible} onChange={event => setVisible(event.target.checked)} /><span>Show on Portfolio</span></label>
            <FormField label="Display Order"><input type="number" min="0" value={order} onChange={event => setOrder(event.target.value)} /></FormField>
          </section>
          <section className="form-panel">
            <div className="section-inline"><h2>Skill Preview</h2><span className="word-count">{level}</span></div>
            <div className="technology-preview"><div className="technology-icon">☆</div><h3>{name || 'Skill name'}</h3><span className="preview-category">{category}</span><p>{description || 'Your skill description will appear here.'}</p></div>
          </section>
        </aside>
      </div>
    </div>
  )
}
