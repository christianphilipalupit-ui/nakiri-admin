import { useState } from 'react'
import FormField from '../../components/ui/FormField.jsx'

const emptyPost = { title: '', slug: '', excerpt: '', content: '', category: 'Development', tags: ['React', 'APIs'], status: 'Draft', scheduledDate: '2026-08-30', scheduledTime: '10:00' }

export default function BlogEditor({ editing, post: selectedPost, onBack, onSave }) {
  const post = editing ? selectedPost : emptyPost
  const [saved, setSaved] = useState('')
  const [title, setTitle] = useState(post.title)
  const [slug, setSlug] = useState(post.slug)
  const [excerpt, setExcerpt] = useState(post.excerpt)
  const [content, setContent] = useState(post.content)
  const [category, setCategory] = useState(post.category)
  const [tags, setTags] = useState(post.tags || [])
  const [tagInput, setTagInput] = useState('')
  const [status, setStatus] = useState(post.status)
  const [scheduledDate, setScheduledDate] = useState(post.scheduledDate || '2026-08-30')
  const [scheduledTime, setScheduledTime] = useState(post.scheduledTime || '10:00')

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

  const updateTitle = value => {
    setTitle(value)
    if (!editing || !slug) setSlug(value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
  }

  const savePost = nextStatus => {
    if (!title.trim()) {
      notify('Enter a post title before saving')
      return
    }

    onSave({
      ...post,
      id: post.id,
      title: title.trim(),
      slug,
      excerpt,
      content,
      category,
      tags,
      status: nextStatus,
      scheduledDate,
      scheduledTime,
      date: editing ? post.date : 'Today',
    })
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
          <button className="secondary" type="button" onClick={() => savePost('Draft')}>Save Draft</button>
          <button className="primary" type="button" onClick={() => savePost('Published')}>{editing ? 'Save Changes' : 'Publish'}</button>
        </div>
      </div>

      {saved && <div className="toast">✓ {saved}</div>}

      <div className="editor-grid">
        <div className="editor-main">
          <section className="form-panel">
            <h2>Basic Information</h2>
            <FormField label="Title"><input value={title} onChange={event => updateTitle(event.target.value)} placeholder="Enter your blog post title..." /></FormField>
            <FormField label="Slug" hint="The URL-friendly version of your title."><input value={slug} onChange={event => setSlug(event.target.value)} placeholder="your-post-slug" /></FormField>
            <FormField label="Excerpt"><textarea rows="3" value={excerpt} onChange={event => setExcerpt(event.target.value)} placeholder="Write a short description..." /></FormField>
          </section>

          <section className="form-panel">
            <h2>Cover Image</h2>
            <div className="upload-area"><span className="upload-icon">▧</span><strong>Upload Cover Image</strong><small>Drag and drop an image here, or browse your files</small><button className="secondary">Choose Image</button></div>
          </section>

          <section className="form-panel">
            <div className="section-inline"><h2>Blog Content</h2><span className="word-count">Markdown supported</span></div>
            <div className="toolbar"><button>𝐁</button><button><i>𝐼</i></button><button>H</button><button>↗</button><button>▧</button><button>&lt;/&gt;</button></div>
            <textarea className="content-editor" value={content} onChange={event => setContent(event.target.value)} placeholder="Start writing your post..." />
          </section>
        </div>

        <aside className="editor-side">
          <section className="form-panel">
            <h2>Classification</h2>
            <FormField label="Category"><select value={category} onChange={event => setCategory(event.target.value)}><option>Development</option><option>Design</option><option>Career</option></select></FormField>
            <FormField label="Tags"><div className="tag-input">{tags.map(tag => <span className="tag" key={tag}>{tag}<button onClick={() => removeTag(tag)}>×</button></span>)}<input value={tagInput} onChange={event => setTagInput(event.target.value)} onKeyDown={addTag} placeholder="Add a tag..." /></div></FormField>
          </section>

          <section className="form-panel">
            <h2>Publishing</h2>
            <div className="status-options">{['Draft', 'Published', 'Scheduled'].map(option => <label key={option}><input type="radio" name="status" checked={status === option} onChange={() => setStatus(option)} /> <span>{option}</span></label>)}</div>
            {status === 'Scheduled' && <div className="schedule-fields"><input type="date" value={scheduledDate} onChange={event => setScheduledDate(event.target.value)} /><input type="time" value={scheduledTime} onChange={event => setScheduledTime(event.target.value)} /></div>}
            <small className="form-note">{status === 'Draft' ? 'Only you can see this post.' : status === 'Published' ? 'This post will be visible on your portfolio.' : 'Choose when this post should go live.'}</small>
          </section>
        </aside>
      </div>
    </div>
  )
}
