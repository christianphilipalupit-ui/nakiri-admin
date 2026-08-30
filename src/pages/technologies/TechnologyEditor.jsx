import { useState } from 'react'
import FormField from '../../components/ui/FormField.jsx'

const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Cloud', 'Mobile', 'Tools', 'Other']

export default function TechnologyEditor({ editing, technology: selectedTechnology, onBack, onSave }) {
  const initial = editing
    ? selectedTechnology
    : {
        name: '',
        slug: '',
        description: '',
        category: 'Frontend',
        status: 'Active',
        featured: false,
        visible: true,
        order: 1,
      }

  const [name, setName] = useState(initial.name)
  const [slug, setSlug] = useState(initial.slug)
  const [description, setDescription] = useState(initial.description)
  const [category, setCategory] = useState(initial.category)
  const [status, setStatus] = useState(initial.status)
  const [featured, setFeatured] = useState(Boolean(initial.featured))
  const [visible, setVisible] = useState(initial.visible !== false)
  const [order, setOrder] = useState(initial.order)

  const save = () => {
    onSave({
      ...initial,
      id: initial.id,
      name,
      slug,
      description,
      category,
      status,
      featured,
      visible,
      order,
    })
  }

  const updateName = value => {
    setName(value)
    if (!editing || !slug) {
      setSlug(
        value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
      )
    }
  }

  return (
    <div className="content editor-content technology-editor">
      <div className="editor-heading">
        <button className="back-button" onClick={onBack}>
          ← <span>Back to Technologies</span>
        </button>
        <div className="editor-title"><h1>{editing ? 'Edit Technology' : 'Create Technology'}</h1><p>Manage this technology in your portfolio.</p></div>
        <div className="editor-actions">
          <button className="secondary" type="button" onClick={save}>
            Save{editing ? ' Changes' : ''}
          </button>
          <button className="primary" type="button" onClick={save}>
            {editing ? 'Save Changes' : 'Save'}
          </button>
        </div>
      </div>
      <div className="editor-grid technology-grid">
        <div className="editor-main">
          <section className="form-panel">
            <h2>Basic Information</h2>
            <FormField label="Technology Name">
              <input value={name} onChange={event => updateName(event.target.value)} placeholder="React" />
            </FormField>
            <FormField label="Slug">
              <input value={slug} onChange={event => setSlug(event.target.value)} placeholder="react" />
            </FormField>
            <FormField label="Short Description">
              <textarea rows="4" value={description} onChange={event => setDescription(event.target.value)} placeholder="A short description of this technology..." />
            </FormField>
          </section>
          <section className="form-panel">
            <h2>Technology Icon / Logo</h2>
            <div className="upload-area">
              <span className="upload-icon">◇</span>
              <strong>Upload Technology Icon</strong>
              <small>or drag and drop an image here</small>
              <button className="secondary">Choose Icon</button>
            </div>
          </section>
        </div>
        <aside className="editor-side">
          <section className="form-panel">
            <h2>Classification</h2>
            <FormField label="Category">
              <select value={category} onChange={event => setCategory(event.target.value)}>
                {categories.map(item => <option key={item}>{item}</option>)}
              </select>
            </FormField>
          </section>
          <section className="form-panel">
            <h2>Display Settings</h2>
            <FormField label="Status">
              <select value={status} onChange={event => setStatus(event.target.value)}>
                <option>Active</option>
                <option>Hidden</option>
              </select>
            </FormField>
            <label className="check-row">
              <input type="checkbox" checked={featured} onChange={event => setFeatured(event.target.checked)} />
              <span>Featured Technology</span>
            </label>
            <label className="check-row">
              <input type="checkbox" checked={visible} onChange={event => setVisible(event.target.checked)} />
              <span>Show on Portfolio</span>
            </label>
            <FormField label="Display Order">
              <input type="number" min="0" value={order} onChange={event => setOrder(event.target.value)} />
            </FormField>
          </section>
          <section className="form-panel">
            <div className="section-inline">
              <h2>Technology Preview</h2>
              <span className="word-count">{status}</span>
            </div>
            <div className="technology-preview">
              <div className="technology-icon">◇</div>
              <h3>{name || 'Technology name'}</h3>
              <span className="preview-category">{category}</span>
              <p>{description || 'Your technology description will appear here.'}</p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
