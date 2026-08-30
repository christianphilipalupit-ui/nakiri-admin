import { useMemo, useState } from 'react'

const mockupFiles = import.meta.glob('../../assets/mockups/**/*.{png,svg}', { eager: true, import: 'default', query: '?url' })
const products = ['All Products', 'T-Shirt', 'Hoodie', 'Mug', 'Tote Bag', 'Sticker']
const statuses = ['All Statuses', 'Draft', 'Ready', 'Final']
const staticMockups = [
  { id: 'coffee-front', title: 'Coffee Code Front', design: 'Coffee Code Repeat', product: 'T-Shirt', color: 'White', view: 'Front', related: 'Coffee & Coding Brief', created: 'May 27, 2026', updated: 'May 28, 2026', status: 'Ready', tags: ['Minimal', 'Developer'], asset: 'tshirt/tshirt-white-front.png' },
  { id: 'debug-hoodie', title: 'Debugging Hoodie', design: 'Debugging is my Cardio', product: 'Hoodie', color: 'Navy', view: 'Front', related: 'Developer Lifestyle', created: 'May 24, 2026', updated: 'May 26, 2026', status: 'Draft', tags: ['Humor', 'Hoodie'] },
  { id: 'commit-mug', title: 'Commit Repeat Mug', design: 'Caffeine Commit Repeat', product: 'Mug', color: 'Black', view: 'Front', related: 'Programming Lifestyle', created: 'May 20, 2026', updated: 'May 24, 2026', status: 'Final', tags: ['Coffee', 'Gift'] },
  { id: 'code-tote', title: 'Code Helps Tote', design: 'Life Happens Code Helps', product: 'Tote Bag', color: 'Cream', view: 'Flat Lay', related: 'Developer Quotes', created: 'May 19, 2026', updated: 'May 22, 2026', status: 'Ready', tags: ['Typography', 'Lifestyle'] },
  { id: 'paused-sticker', title: 'Paused My Game Sticker', design: 'I Paused My Game', product: 'Sticker', color: 'White', view: 'Front', related: 'Funny Tech Humor', created: 'May 16, 2026', updated: 'May 18, 2026', status: 'Draft', tags: ['Tech Humor'] },
]

function readSessionMockups() {
  try {
    const stored = JSON.parse(sessionStorage.getItem('nakiri-mockup-library') || '[]')
    return Array.isArray(stored) ? stored : []
  } catch {
    return []
  }
}

function assetFor(mockup) {
  const match = Object.entries(mockupFiles).find(([path]) => path.endsWith(`/mockups/${mockup.asset || ''}`))
  return match?.[1] || null
}

function MockupPreview({ mockup }) {
  const asset = assetFor(mockup)
  return <div className={`library-preview ${mockup.product.toLowerCase().replaceAll(' ', '-')} ${mockup.color.toLowerCase()}`}>{asset ? <img src={asset} alt={`${mockup.product} mockup`} /> : <><span>{mockup.product === 'Mug' ? '▢' : mockup.product === 'Sticker' ? '◇' : '♧'}</span><strong>{mockup.design.split(' ').slice(0, 2).join(' ')}</strong></>}</div>
}

function MockupLibrary({ onBack, onOpenStudio, onNewMockup }) {
  const [sessionItems, setSessionItems] = useState(readSessionMockups)
  const [query, setQuery] = useState('')
  const [productFilter, setProductFilter] = useState('All Products')
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [sortBy, setSortBy] = useState('Recently Updated')
  const [viewMode, setViewMode] = useState('grid')
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState('')

  const mockups = useMemo(() => {
    const current = sessionItems.map(item => ({ ...item, updated: 'Just now', created: 'Just now', related: item.context?.opportunity?.title || item.design }))
    return [...current, ...staticMockups]
  }, [sessionItems])

  const visibleMockups = useMemo(() => {
    const filtered = mockups.filter(item => {
      const text = `${item.title} ${item.design} ${item.product} ${item.color} ${item.related}`.toLowerCase()
      return text.includes(query.toLowerCase()) && (productFilter === 'All Products' || item.product === productFilter) && (statusFilter === 'All Statuses' || item.status === statusFilter)
    })
    return [...filtered].sort((a, b) => sortBy === 'Name A–Z' ? a.title.localeCompare(b.title) : sortBy === 'Status' ? a.status.localeCompare(b.status) : b.id.localeCompare(a.id))
  }, [mockups, productFilter, query, sortBy, statusFilter])

  const showFeedback = message => {
    setFeedback(message)
    window.setTimeout(() => setFeedback(''), 2500)
  }

  const openMockup = mockup => {
    const context = mockup.context || {
      title: mockup.design,
      niche: mockup.related,
      description: `Saved mockup for ${mockup.design}.`,
      tags: mockup.tags || [],
      opportunity: {
        title: mockup.related,
        niche: mockup.related,
        description: `Saved mockup for ${mockup.design}.`,
        score: 80,
        competition: 'Medium',
        source: 'Mockup Library',
        activity: 'Saved mockup context',
        tags: mockup.tags || [],
      },
    }
    sessionStorage.setItem('nakiri-design-brief-draft', JSON.stringify(context))
    sessionStorage.setItem('nakiri-mockup-config', JSON.stringify({ ...mockup, context }))
    onOpenStudio()
  }

  const duplicateMockup = mockup => {
    const copy = { ...mockup, id: `mockup-${Date.now()}`, title: `${mockup.title} Copy`, updated: new Date().toISOString(), created: new Date().toISOString(), status: 'Draft' }
    const next = [copy, ...sessionItems]
    setSessionItems(next)
    sessionStorage.setItem('nakiri-mockup-library', JSON.stringify(next))
    showFeedback('Mockup duplicated')
  }

  const deleteMockup = mockup => {
    if (!window.confirm(`Delete “${mockup.title}”?`)) return
    const next = sessionItems.filter(item => item.id !== mockup.id)
    setSessionItems(next)
    sessionStorage.setItem('nakiri-mockup-library', JSON.stringify(next))
    setSelected(null)
    showFeedback('Mockup deleted')
  }

  const counts = { total: mockups.length, draft: mockups.filter(item => item.status === 'Draft').length, ready: mockups.filter(item => item.status === 'Ready').length, final: mockups.filter(item => item.status === 'Final').length }

  return (
    <section className="content mockup-library-content">
      <div className="library-breadcrumb"><button type="button" onClick={onBack}>Research Tools</button><span>›</span><span>Mockup Library</span></div>
      <div className="library-heading"><div><h1>Mockup Library</h1><p>Organize, review, and manage your saved product mockups.</p></div><div className="library-heading-actions"><button className="secondary" type="button" onClick={onBack}>← Research</button><button className="primary" type="button" onClick={onNewMockup}>＋ New Mockup</button></div></div>
      <div className="library-stat-grid">{[['Total Mockups', counts.total, '▦'], ['Drafts', counts.draft, '◷'], ['Ready', counts.ready, '✓'], ['Final', counts.final, '✦']].map(([label, value, icon]) => <article className="library-stat-card" key={label}><span>{icon}</span><div><small>{label}</small><strong>{value}</strong><p>Current workspace</p></div></article>)}</div>
      <div className="library-toolbar"><label className="library-search"><span>⌕</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search mockups..." aria-label="Search mockups" /></label><select value={productFilter} onChange={event => setProductFilter(event.target.value)} aria-label="Filter by product">{products.map(option => <option key={option}>{option}</option>)}</select><select value={statusFilter} onChange={event => setStatusFilter(event.target.value)} aria-label="Filter by status">{statuses.map(option => <option key={option}>{option}</option>)}</select><select value={sortBy} onChange={event => setSortBy(event.target.value)} aria-label="Sort mockups"><option>Recently Updated</option><option>Recently Created</option><option>Name A–Z</option><option>Status</option></select><button className={viewMode === 'grid' ? 'selected' : ''} type="button" onClick={() => setViewMode('grid')}>▦</button><button className={viewMode === 'list' ? 'selected' : ''} type="button" onClick={() => setViewMode('list')}>☷</button></div>
      <div className={`mockup-library-grid ${viewMode === 'list' ? 'list-view' : ''}`}>{visibleMockups.map(mockup => <article className="mockup-library-card" key={mockup.id} onClick={() => setSelected(mockup)}><MockupPreview mockup={mockup} /><div className="library-card-copy"><div className="library-card-title"><h2>{mockup.title}</h2><span className={`mockup-status ${mockup.status.toLowerCase()}`}>{mockup.status}</span></div><p>{mockup.product} · {mockup.color} · {mockup.view}</p><small>{mockup.design}</small><small>{mockup.related}</small><div className="library-tags">{mockup.tags?.map(tag => <span key={tag}>{tag}</span>)}</div><div className="library-card-footer"><span>Updated {mockup.updated}</span><div><button type="button" onClick={event => { event.stopPropagation(); openMockup(mockup) }}>Open</button><button type="button" onClick={event => { event.stopPropagation(); duplicateMockup(mockup) }}>Duplicate</button><button type="button" onClick={event => { event.stopPropagation(); deleteMockup(mockup) }}>Delete</button></div></div></div></article>)}</div>
      {!visibleMockups.length && <div className="mockup-library-empty"><span>▦</span><h2>{mockups.length ? 'No mockups found' : 'Your mockup library is empty'}</h2><p>{mockups.length ? 'Try adjusting your search or filters.' : 'Save a mockup from Mockup Studio to see it here.'}</p><button className="primary" type="button" onClick={onNewMockup}>＋ Create Mockup</button></div>}
      {selected && <div className="library-detail-panel"><div><h2>{selected.title}</h2><p>{selected.design}</p></div><button type="button" onClick={() => setSelected(null)}>×</button><dl><dt>Product</dt><dd>{selected.product}</dd><dt>Color</dt><dd>{selected.color}</dd><dt>View</dt><dd>{selected.view}</dd><dt>Related</dt><dd>{selected.related}</dd><dt>Created</dt><dd>{selected.created}</dd><dt>Last Updated</dt><dd>{selected.updated}</dd></dl><button className="primary" type="button" onClick={() => openMockup(selected)}>Open / Edit →</button></div>}
      {feedback && <div className="saved-feedback">{feedback}</div>}
    </section>
  )
}

export default MockupLibrary
