import { useState } from 'react'
import FormField from '../../components/ui/FormField.jsx'

export default function BlogEditor({ editing, onBack }) {
  const [saved, setSaved] = useState('')
  const [tags, setTags] = useState(['React', 'APIs'])
  const [tagInput, setTagInput] = useState('')
  const [status, setStatus] = useState('Draft')

  const addTag = event => {
    if (event.key === 'Enter' && tagInput.trim()) {
      event.preventDefault()
      setTags(current => [...current, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = tagToRemove => {
    setTags(current => current.filter(tag => tag !== tagToRemove))
  }

  const notify = message => {
    setSaved(message)
    window.setTimeout(() => setSaved(''), 2200)
  }

  return (
    <div className="content editor-content">
      <div className="editor-heading">
        <button className="back-button" onClick={onBack}>← <span>Back to Blog Posts</span></button>
        <div className="editor-title">
          <h1>{editing ? 'Edit Post' : 'Create New Post'}</h1>
          <p>{editing ? 'Update your blog post details.' : 'Share something thoughtful with your audience.'}</p>
        </div>
        <div className="editor-actions">
          <button className="secondary" onClick={() => notify('Draft saved')}>Save Draft</button>
          <button className="primary" onClick={() => notify('Post ready to publish')}>Publish</button>
        </div>
      </div>

      {saved && <div className="toast">✓ {saved}</div>}

      <div className="editor-grid">
        <div className="editor-main">
          <section className="form-panel">
            <h2>Basic Information</h2>
            <FormField label="Title"><input defaultValue={editing ? 'Understanding APIs' : ''} placeholder="Enter your blog post title..." /></FormField>
            <FormField label="Slug" hint="The URL-friendly version of your title."><input defaultValue={editing ? 'understanding-apis' : ''} placeholder="your-post-slug" /></FormField>
            <FormField label="Excerpt"><textarea rows="3" defaultValue={editing ? 'A practical guide to building thoughtful API experiences.' : ''} placeholder="Write a short description..." /></FormField>
          </section>

          <section className="form-panel">
            <h2>Cover Image</h2>
            <div className="upload-area"><span className="upload-icon">▧</span><strong>Upload Cover Image</strong><small>Drag and drop an image here, or browse your files</small><button className="secondary">Choose Image</button></div>
          </section>

          <section className="form-panel">
            <div className="section-inline"><h2>Blog Content</h2><span className="word-count">Markdown supported</span></div>
            <div className="toolbar"><button>𝐁</button><button><i>𝐼</i></button><button>H</button><button>↗</button><button>▧</button><button>&lt;/&gt;</button></div>
            <textarea className="content-editor" defaultValue={editing ? '## Building better API experiences\n\nThoughtful APIs make products easier to use and teams easier to support.' : ''} placeholder="Start writing your post..." />
          </section>
        </div>

        <aside className="editor-side">
          <section className="form-panel">
            <h2>Classification</h2>
            <FormField label="Category"><select defaultValue="Development"><option>Development</option><option>Design</option><option>Career</option></select></FormField>
            <FormField label="Tags"><div className="tag-input">{tags.map(tag => <span className="tag" key={tag}>{tag}<button onClick={() => removeTag(tag)}>×</button></span>)}<input value={tagInput} onChange={event => setTagInput(event.target.value)} onKeyDown={addTag} placeholder="Add a tag..." /></div></FormField>
          </section>

          <section className="form-panel">
            <h2>Publishing</h2>
            <div className="status-options">{['Draft', 'Published', 'Scheduled'].map(option => <label key={option}><input type="radio" name="status" checked={status === option} onChange={() => setStatus(option)} /> <span>{option}</span></label>)}</div>
            {status === 'Scheduled' && <div className="schedule-fields"><input type="date" defaultValue="2026-08-30" /><input type="time" defaultValue="10:00" /></div>}
            <small className="form-note">{status === 'Draft' ? 'Only you can see this post.' : status === 'Published' ? 'This post will be visible on your portfolio.' : 'Choose when this post should go live.'}</small>
          </section>
        </aside>
      </div>
    </div>
  )
}
