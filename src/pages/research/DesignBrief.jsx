import { useMemo, useState } from 'react'

const styleOptions = ['Minimal', 'Vintage', 'Retro', 'Bold Typography', 'Illustration', 'Hand Drawn', 'Modern', 'Cute', 'Dark', 'Playful']
const productOptions = ['T-Shirt', 'Hoodie', 'Sweatshirt', 'Poster', 'Sticker', 'Mug', 'Tote Bag']
const briefStatuses = ['Draft', 'Ready for Design', 'In Progress', 'Completed']

function readBriefDraft() {
  try {
    const stored = sessionStorage.getItem('nakiri-design-brief-draft')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function DesignBrief({ onBack, onOpportunities, onOpenMockup }) {
  const [draft] = useState(readBriefDraft)
  const [status, setStatus] = useState('Draft')
  const [showPreview, setShowPreview] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [keywordInput, setKeywordInput] = useState('')
  const [brief, setBrief] = useState(() => ({
    concept: draft?.title || '',
    direction: draft?.description || '',
    audience: 'Developers and coffee lovers',
    emotion: 'Motivated and understood',
    message: draft?.title || '',
    style: 'Minimal',
    colors: 'Warm cream, charcoal black, coffee brown',
    typography: 'Bold clean sans-serif with friendly spacing',
    composition: 'Centered typography with a simple supporting graphic',
    illustration: 'Coffee cup combined with a coding symbol',
    background: 'Clean solid or lightly textured background',
    primaryText: draft?.title || '',
    secondaryText: 'Code. Coffee. Repeat.',
    supportingText: '',
    includeKeywords: draft?.tags || [],
    avoidKeywords: [],
    products: ['T-Shirt', 'Mug'],
    notes: '',
  }))

  const updateBrief = (field, value) => setBrief(current => ({ ...current, [field]: value }))
  const showFeedback = message => { setFeedback(message); window.setTimeout(() => setFeedback(''), 2500) }
  const toggleProduct = product => updateBrief('products', brief.products.includes(product) ? brief.products.filter(item => item !== product) : [...brief.products, product])
  const addKeyword = field => { const value = keywordInput.trim(); if (!value) return; if (!brief[field].includes(value)) updateBrief(field, [...brief[field], value]); setKeywordInput('') }
  const removeKeyword = (field, keyword) => updateBrief(field, brief[field].filter(item => item !== keyword))
  const handleKeywordKeyDown = (event, field) => { if (event.key === 'Enter' || event.key === ',') { event.preventDefault(); addKeyword(field) } }

  const generatedPrompt = useMemo(() => `Create an original ${brief.style.toLowerCase()} design for ${brief.audience.toLowerCase()}. Concept: ${brief.concept || 'a focused niche design'}. Direction: ${brief.direction || 'clear, memorable visual storytelling'}. Use ${brief.colors.toLowerCase()} with ${brief.typography.toLowerCase()}. Compose it as ${brief.composition.toLowerCase()}, featuring ${brief.illustration.toLowerCase()}. The primary message is “${brief.primaryText || 'an engaging niche message'}”. Avoid ${brief.avoidKeywords.join(', ') || 'generic or copied visual elements'}. Target products: ${brief.products.join(', ') || 'apparel and accessories'}.`, [brief])

  const saveDraft = () => { sessionStorage.setItem('nakiri-design-brief', JSON.stringify({ ...brief, status, opportunity: draft?.opportunity })); showFeedback('Design Brief draft saved temporarily') }
  const markReady = () => { setStatus('Ready for Design'); sessionStorage.setItem('nakiri-design-brief', JSON.stringify({ ...brief, status: 'Ready for Design', opportunity: draft?.opportunity })); showFeedback('Brief marked Ready for Design') }
  const copyPrompt = async () => { try { await navigator.clipboard.writeText(generatedPrompt); showFeedback('Design prompt copied') } catch { showFeedback('Design prompt ready to copy') } }
  const openMockup = () => {
    sessionStorage.setItem('nakiri-design-brief-draft', JSON.stringify({ ...brief, status, opportunity: draft.opportunity, title: brief.concept || draft.title, niche: draft.niche, description: brief.direction, tags: brief.includeKeywords }))
    onOpenMockup()
  }

  if (!draft?.opportunity) {
    return <section className="content design-brief-empty-page"><div className="form-panel"><span className="research-empty-icon">✦</span><h1>No opportunity brief found</h1><p>A Design Brief should normally be started from an Opportunity.</p><button className="primary" type="button" onClick={onOpportunities}>← Back to Opportunities</button></div></section>
  }

  return (
    <section className="content design-brief-content">
      <div className="design-brief-breadcrumb"><button type="button" onClick={onBack}>Research Tools</button><span>›</span><button type="button" onClick={onBack}>Opportunity Detail</button><span>›</span><span>Design Brief</span></div>
      <div className="design-brief-heading"><div><h1>Design Brief</h1><p>Turn a researched opportunity into a clear creative direction.</p><span className="brief-context">For: {draft.title} · {draft.niche}</span></div><div className="design-brief-actions"><select value={status} onChange={event => setStatus(event.target.value)} aria-label="Brief status">{briefStatuses.map(option => <option key={option}>{option}</option>)}</select><button className="secondary" type="button" onClick={() => setShowPreview(current => !current)}>{showPreview ? 'Edit Brief' : 'Preview Brief'}</button><button className="secondary" type="button" onClick={saveDraft}>Save Draft</button><button className="primary" type="button" onClick={markReady}>Mark Ready</button><button className="primary" type="button" onClick={openMockup}>▧ &nbsp; Open Mockup Studio</button></div></div>

      {showPreview ? <section className="form-panel brief-preview-panel"><div className="brief-preview-heading"><div><h2>Brief Preview</h2><p>Review the current creative direction before moving it into design.</p></div><span>{status}</span></div><div className="brief-preview-content"><h3>{brief.concept || 'Untitled Design Concept'}</h3><p>{brief.direction}</p><div className="brief-preview-message">{brief.primaryText}<small>{brief.secondaryText}</small></div><dl><div><dt>Audience</dt><dd>{brief.audience}</dd></div><div><dt>Style</dt><dd>{brief.style}</dd></div><div><dt>Products</dt><dd>{brief.products.join(', ') || 'None selected'}</dd></div><div><dt>Colors</dt><dd>{brief.colors}</dd></div></dl><strong>Prompt Preview</strong><p>{generatedPrompt}</p></div></section> : <div className="design-brief-grid"><main className="design-brief-main"><section className="form-panel brief-context-panel"><h2>Opportunity Context</h2><div className="brief-opportunity-context"><div><small>Opportunity</small><strong>{draft.title}</strong></div><div><small>Niche</small><strong>{draft.niche}</strong></div><div><small>Score</small><strong className="accent-text">{draft.opportunity.score}/100</strong></div><div><small>Competition</small><strong>{draft.opportunity.competition}</strong></div></div><p>{draft.description}</p><div className="brief-tags">{draft.tags?.map(tag => <span key={tag}>{tag}</span>)}</div></section>

          <section className="form-panel brief-form-panel"><h2>Design Direction</h2><label className="form-field"><span>Design Concept / Title</span><input value={brief.concept} onChange={event => updateBrief('concept', event.target.value)} placeholder="Name the creative concept" /></label><label className="form-field"><span>Main Design Direction</span><textarea value={brief.direction} onChange={event => updateBrief('direction', event.target.value)} placeholder="Describe the intended visual direction" /></label><div className="brief-two-columns"><label className="form-field"><span>Target Audience</span><input value={brief.audience} onChange={event => updateBrief('audience', event.target.value)} /></label><label className="form-field"><span>Desired Emotional Response</span><input value={brief.emotion} onChange={event => updateBrief('emotion', event.target.value)} /></label></div><label className="form-field"><span>Core Message</span><input value={brief.message} onChange={event => updateBrief('message', event.target.value)} /></label><div className="style-options"><span>Design Style</span><div>{styleOptions.map(style => <button className={brief.style === style ? 'selected' : ''} type="button" key={style} onClick={() => updateBrief('style', style)}>{style}</button>)}</div></div></section>

          <section className="form-panel brief-form-panel"><h2>Visual Direction</h2><label className="form-field"><span>Suggested Colors</span><input value={brief.colors} onChange={event => updateBrief('colors', event.target.value)} /></label><label className="form-field"><span>Typography Direction</span><input value={brief.typography} onChange={event => updateBrief('typography', event.target.value)} /></label><label className="form-field"><span>Composition / Layout</span><textarea value={brief.composition} onChange={event => updateBrief('composition', event.target.value)} /></label><label className="form-field"><span>Illustration or Graphic Direction</span><textarea value={brief.illustration} onChange={event => updateBrief('illustration', event.target.value)} /></label><label className="form-field"><span>Background Treatment</span><input value={brief.background} onChange={event => updateBrief('background', event.target.value)} /></label></section>

          <section className="form-panel brief-form-panel"><h2>Content &amp; Messaging</h2><label className="form-field"><span>Primary Text / Message</span><input value={brief.primaryText} onChange={event => updateBrief('primaryText', event.target.value)} /></label><label className="form-field"><span>Secondary Text</span><input value={brief.secondaryText} onChange={event => updateBrief('secondaryText', event.target.value)} /></label><label className="form-field"><span>Supporting Text (optional)</span><input value={brief.supportingText} onChange={event => updateBrief('supportingText', event.target.value)} /></label><div className="brief-keyword-section"><span>Keywords or phrases to include</span><div className="brief-chip-input">{brief.includeKeywords.map(keyword => <span key={keyword}>{keyword}<button type="button" onClick={() => removeKeyword('includeKeywords', keyword)}>×</button></span>)}<input value={keywordInput} onChange={event => setKeywordInput(event.target.value)} onKeyDown={event => handleKeywordKeyDown(event, 'includeKeywords')} onBlur={() => addKeyword('includeKeywords')} placeholder="Add keyword and press Enter" /></div></div><div className="brief-keyword-section"><span>Keywords or elements to avoid</span><div className="brief-chip-input">{brief.avoidKeywords.map(keyword => <span className="avoid" key={keyword}>{keyword}<button type="button" onClick={() => removeKeyword('avoidKeywords', keyword)}>×</button></span>)}<input onChange={event => setKeywordInput(event.target.value)} onKeyDown={event => handleKeywordKeyDown(event, 'avoidKeywords')} placeholder="Add excluded phrase and press Enter" /></div></div></section>

          <section className="form-panel brief-form-panel"><h2>Target Product</h2><div className="brief-product-grid">{productOptions.map(product => <button className={brief.products.includes(product) ? 'selected' : ''} type="button" key={product} onClick={() => toggleProduct(product)}>{brief.products.includes(product) ? '✓ ' : ''}{product}</button>)}</div></section>
          <section className="form-panel brief-form-panel"><div className="brief-section-heading"><div><h2>AI / Design Prompt Preparation</h2><p>Generate a local text prompt from the current brief.</p></div><button className="primary" type="button" onClick={() => showFeedback('Design prompt generated')}>✦ Generate Design Prompt</button></div><div className="generated-prompt">{generatedPrompt}<button type="button" onClick={copyPrompt}>▣ Copy Prompt</button></div></section>
          <section className="form-panel brief-form-panel"><h2>Brief Notes</h2><textarea value={brief.notes} onChange={event => updateBrief('notes', event.target.value)} placeholder="Creative considerations, reminders, and research observations..." /></section>
        </main><aside className="design-brief-side"><section className="form-panel brief-side-card"><h2>Brief Status</h2><span className="brief-status-badge">{status}</span><p>Save your work regularly as you refine the creative direction.</p><button className="secondary" type="button" onClick={saveDraft}>Save Draft</button></section><section className="form-panel brief-side-card"><h2>Research Reference</h2><p>Source</p><strong className="accent-text">{draft.opportunity.source}</strong><p>Activity</p><strong>{draft.opportunity.activity}</strong><p>Related opportunity</p><strong>{draft.title}</strong></section></aside></div>}
      {feedback && <div className="saved-feedback">{feedback}</div>}
    </section>
  )
}

export default DesignBrief
