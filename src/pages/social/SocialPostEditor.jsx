import { useState } from 'react'

const emptyPost = {
  text: '',
  tags: ['product', 'buildinpublic'],
  media: 'Image',
  platforms: ['Instagram'],
  status: 'Draft',
  scheduledDate: '2026-08-30',
  scheduledTime: '10:00',
}

const platformLimits = {
  instagram: 2200,
  tiktok: 4000,
}

const normalizePlatform = platform => String(platform || '').toLowerCase().replace(/[^a-z]/g, '')

export default function SocialPostEditor({ editing, post: selectedPost, onBack, onSave }) {
  const post = editing ? selectedPost : emptyPost
  const [text, setText] = useState(post?.text || '')
  const [tags, setTags] = useState(post?.tags || [])
  const [tagInput, setTagInput] = useState('')
  const [media, setMedia] = useState(post?.media || 'Image')
  const [platforms, setPlatforms] = useState(post?.platforms || ['Instagram'])
  const [status, setStatus] = useState(post?.status === 'Scheduled' ? 'Schedule' : post?.status === 'Published' ? 'Publish Now' : post?.status || 'Draft')
  const [scheduledDate, setScheduledDate] = useState(post?.scheduledDate || '2026-08-30')
  const [scheduledTime, setScheduledTime] = useState(post?.scheduledTime || '10:00')
  const configuredLimits = platforms
    .map(platform => platformLimits[normalizePlatform(platform)])
    .filter(limit => Number.isFinite(limit) && limit > 0)
  const activeLimit = configuredLimits.length > 0 ? Math.min(...configuredLimits) : null
  const isOverLimit = activeLimit !== null && text.length > activeLimit

  const togglePlatform = platform => setPlatforms(current => current.includes(platform)
    ? current.filter(item => item !== platform)
    : [...current, platform])

  const addTag = event => {
    if (event.key === 'Enter' && tagInput.trim()) {
      event.preventDefault()
      setTags(current => [...current, tagInput.trim().replace(/^#/, '')])
      setTagInput('')
    }
  }

  const savePost = action => {
    const nextStatus = action === 'draft'
      ? 'Draft'
      : action === 'schedule'
        ? 'Scheduled'
        : 'Published'

    onSave({
      ...post,
      id: post?.id,
      title: editing ? post.title : text.trim().split(/\s+/).slice(0, 5).join(' ') || 'Untitled social post',
      text,
      tags,
      media,
      platforms,
      status: nextStatus,
      scheduledDate,
      scheduledTime,
      date: editing ? post.date : nextStatus === 'Scheduled' ? scheduledDate : 'Today',
    })
  }

  return (
    <div className="content editor-content social-editor">
      <div className="editor-heading">
        <button className="back-button" onClick={onBack}>← <span>Back to Social Posts</span></button>
        <div className="editor-title">
          <h1>{editing ? 'Edit Social Post' : 'Create Social Post'}</h1>
          <p>Create content for your social audience.</p>
        </div>
        <div className="editor-actions">
          <button className="secondary" type="button" onClick={() => savePost('draft')}>Save Draft</button>
          <button className="primary" type="button" onClick={() => savePost(status === 'Schedule' ? 'schedule' : 'publish')}>
            {status === 'Schedule' ? 'Schedule' : editing ? 'Save Changes' : 'Publish Now'}
          </button>
        </div>
      </div>

      <div className="editor-grid social-grid">
        <div className="editor-main">
          <section className="form-panel">
            <h2>Post Content</h2>
            <label className="form-field">
              <span>Post text</span>
              <textarea className="social-textarea" maxLength={activeLimit || undefined} value={text} onChange={event => setText(event.target.value)} placeholder="What would you like to share?" />
              <small className={isOverLimit ? 'character-count exceeded' : 'character-count'}>
                {activeLimit === null
                  ? text.length + ' characters · No platform limit'
                  : text.length + ' / ' + activeLimit + ' characters' + (isOverLimit ? ' · ' + (text.length - activeLimit) + ' over limit' : '')}
              </small>
            </label>
            <label className="form-field">
              <span>Hashtags</span>
              <div className="tag-input">
                {tags.map(tag => <span className="tag" key={tag}>#{tag}<button type="button" onClick={() => setTags(current => current.filter(item => item !== tag))}>×</button></span>)}
                <input value={tagInput} onChange={event => setTagInput(event.target.value)} onKeyDown={addTag} placeholder="Add hashtag and press Enter..." />
              </div>
            </label>
          </section>

          <section className="form-panel">
            <div className="section-inline">
              <h2>Media</h2>
              <div className="media-type-toggle">
                {['Image', 'Video'].map(option => <button type="button" key={option} className={media === option ? 'selected' : ''} onClick={() => setMedia(option)}>{option}</button>)}
              </div>
            </div>
            <div className="upload-area social-upload">
              <span className="upload-icon">{media === 'Video' ? '▶' : '▧'}</span>
              <strong>{media === 'Video' ? 'Upload Video' : 'Attach an image'}</strong>
              <small>{media === 'Video' ? 'Drop your video here, or choose a video file' : 'Drag and drop an image here, or choose an image to attach'}</small>
              <button className="secondary" type="button">Choose {media}</button>
            </div>
            {platforms.includes('TikTok') && media === 'Image' && <p className="media-hint">ⓘ TikTok performs best with video content.</p>}
          </section>

          <section className="form-panel">
            <h2>Platforms</h2>
            <div className="platform-grid">
              {['Facebook', 'Instagram', 'X / Twitter', 'LinkedIn', 'TikTok'].map(platform => (
                <button type="button" key={platform} className={platforms.includes(platform) ? 'platform-card selected' : 'platform-card'} onClick={() => togglePlatform(platform)}>
                  <span className="platform-symbol">{platform === 'X / Twitter' ? '𝕏' : platform[0]}</span>
                  <span>{platform}</span>
                  <i>{platforms.includes(platform) ? '✓' : '+'}</i>
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className="editor-side">
          <section className="form-panel">
            <h2>Publishing</h2>
            <div className="status-options">
              {['Draft', 'Publish Now', 'Schedule'].map(option => (
                <label key={option}><input type="radio" name="social-status" checked={status === option} onChange={() => setStatus(option)} /><span>{option}</span></label>
              ))}
            </div>
            {status === 'Schedule' && (
              <div className="schedule-fields">
                <input type="date" value={scheduledDate} onChange={event => setScheduledDate(event.target.value)} />
                <input type="time" value={scheduledTime} onChange={event => setScheduledTime(event.target.value)} />
              </div>
            )}
            <small className="form-note">{status === 'Draft' ? 'Only you can see this post.' : status === 'Schedule' ? 'Choose when this post should go live.' : 'This post will be published to selected platforms.'}</small>
          </section>

          <section className="form-panel">
            <div className="section-inline"><h2>Preview</h2><span className="word-count">{platforms.length} selected</span></div>
            <div className="social-preview">
              <div className="preview-head"><span className="avatar">C</span><div><strong>Christian</strong><small>{platforms[0] || 'Select a platform'}</small></div></div>
              <p>{text || 'Your post preview will appear here as you write.'}</p>
              <div className={media === 'Video' ? 'preview-image video-preview' : 'preview-image'}>{media === 'Video' ? <><span className="play-indicator">▶</span><small>Video preview</small></> : <>▧<small>Image preview</small></>}</div>
              <div className="preview-tags">{tags.map(tag => <span key={tag}>#{tag}</span>)}</div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
