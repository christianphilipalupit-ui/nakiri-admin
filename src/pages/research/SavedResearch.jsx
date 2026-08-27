import { useMemo, useState } from 'react'

const initialCollections = [
  { id: 1, name: 'Coding & Coffee', description: 'Minimalist and creative designs for developers who love coffee.', references: 128, opportunities: 18, briefs: 12, updated: 'May 25, 2026', potential: 'High Potential', tone: 'dark', starred: true },
  { id: 2, name: 'Retro Programming', description: 'Vintage, retro and 80s/90s programming aesthetics and pixel vibes.', references: 96, opportunities: 14, briefs: 7, updated: 'May 23, 2026', potential: 'High Potential', tone: 'navy', starred: false },
  { id: 3, name: 'Developer Quotes', description: 'Funny, motivational and relatable quotes for developers.', references: 142, opportunities: 21, briefs: 15, updated: 'May 20, 2026', potential: 'Medium Potential', tone: 'black', starred: true },
  { id: 4, name: 'Minimalist Coffee', description: 'Clean, simple and minimal coffee themed designs.', references: 84, opportunities: 9, briefs: 6, updated: 'May 18, 2026', potential: 'Medium Potential', tone: 'cream', starred: false },
  { id: 5, name: 'Programming Lifestyle', description: 'Lifestyle designs for coders, programmers and tech people.', references: 110, opportunities: 16, briefs: 10, updated: 'May 15, 2026', potential: 'High Potential', tone: 'black', starred: false },
  { id: 6, name: 'Anime Developer', description: 'Anime style designs for developers, coders and tech lovers.', references: 76, opportunities: 8, briefs: 5, updated: 'May 12, 2026', potential: 'Low Potential', tone: 'cream', starred: false },
  { id: 7, name: 'Funny Tech Humor', description: 'Humorous tech jokes, bugs, debugging and coding humor.', references: 68, opportunities: 7, briefs: 4, updated: 'May 10, 2026', potential: 'Under Review', tone: 'navy', starred: true },
  { id: 8, name: 'AI & Future Tech', description: 'Artificial intelligence, futuristic tech and innovation designs.', references: 52, opportunities: 6, briefs: 3, updated: 'May 8, 2026', potential: 'Medium Potential', tone: 'forest', starred: false },
]

const references = [
  { id: 1, source: 'Etsy', title: 'Coffee Code Repeat', saved: '2 hours ago', tone: 'dark' },
  { id: 2, source: 'Redbubble', title: 'Debugging is my Cardio', saved: '5 hours ago', tone: 'cream' },
  { id: 3, source: 'Etsy', title: 'But First Coffee Then Code', saved: '1 day ago', tone: 'cream' },
  { id: 4, source: 'TeePublic', title: 'Life Happens Code Helps', saved: '1 day ago', tone: 'light' },
  { id: 5, source: 'Redbubble', title: 'I Paused My Game', saved: '2 days ago', tone: 'black' },
  { id: 6, source: 'Etsy', title: 'Caffeine Commit Repeat', saved: '2 days ago', tone: 'navy' },
]

const filterOptions = ['All Collections', 'High Potential', 'Medium Potential', 'Low Potential', 'Under Review']

function CollectionPreview({ tone, title }) {
  return <div className={`collection-preview ${tone}`}><strong>{title.split(' ')[0]}</strong><span>{title.split(' ').slice(1).join(' ')}</span></div>
}

function SavedResearch({ onBackToResearch }) {
  const [activeTab, setActiveTab] = useState('My Collections')
  const [collections, setCollections] = useState(initialCollections)
  const [deletedCollections, setDeletedCollections] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('All Collections')
  const [sortOption, setSortOption] = useState('Recently Updated')
  const [viewMode, setViewMode] = useState('grid')
  const [showCreateCollection, setShowCreateCollection] = useState(false)
  const [newCollection, setNewCollection] = useState({ name: '', description: '', potential: 'High Potential' })
  const [feedback, setFeedback] = useState('')

  const visibleCollections = useMemo(() => {
    let items = activeTab === 'Starred' ? collections.filter(item => item.starred) : activeTab === 'Trash' ? deletedCollections : collections
    if (selectedFilter !== 'All Collections' && activeTab !== 'Trash') items = items.filter(item => item.potential === selectedFilter)
    return [...items].sort((a, b) => sortOption === 'Name' ? a.name.localeCompare(b.name) : sortOption === 'Most References' ? b.references - a.references : sortOption === 'Recently Created' ? b.id - a.id : b.updated.localeCompare(a.updated))
  }, [activeTab, collections, deletedCollections, selectedFilter, sortOption])

  const showFeedback = message => {
    setFeedback(message)
    window.setTimeout(() => setFeedback(''), 2500)
  }

  const createCollection = event => {
    event.preventDefault()
    if (!newCollection.name.trim()) return
    setCollections(current => [{ id: Date.now(), name: newCollection.name.trim(), description: newCollection.description.trim() || 'A new research collection.', references: 0, opportunities: 0, briefs: 0, updated: 'Just now', potential: newCollection.potential, tone: 'forest', starred: false }, ...current])
    setNewCollection({ name: '', description: '', potential: 'High Potential' })
    setShowCreateCollection(false)
    showFeedback('Collection created')
  }

  const toggleStar = id => setCollections(current => current.map(item => item.id === id ? { ...item, starred: !item.starred } : item))
  const deleteCollection = id => { const item = collections.find(collection => collection.id === id); setCollections(current => current.filter(collection => collection.id !== id)); setDeletedCollections(current => [...current, item]) }
  const restoreCollection = id => { const item = deletedCollections.find(collection => collection.id === id); setDeletedCollections(current => current.filter(collection => collection.id !== id)); setCollections(current => [item, ...current]) }

  return (
    <section className="content saved-research-content">
      <div className="saved-heading"><div><div className="saved-breadcrumb"><button type="button" onClick={onBackToResearch}>Research Tools</button><span>›</span><span>Saved Research</span></div><h1>Saved Research / Collections</h1><p>Organize and manage your saved research references, inspiration, and related opportunities.</p></div><div className="saved-heading-actions"><button className="secondary" type="button" onClick={() => showFeedback('Collection export prepared')}>⇩ &nbsp; Export Collections</button><button className="primary" type="button" onClick={() => setShowCreateCollection(true)}>＋ New Collection</button></div></div>

      <div className="saved-layout"><main className="saved-main"><div className="saved-toolbar"><nav className="saved-tabs" aria-label="Saved research views">{['My Collections', 'All References', 'Starred', 'Trash'].map(tab => <button className={activeTab === tab ? 'active' : ''} type="button" key={tab} onClick={() => setActiveTab(tab)}>{tab}</button>)}</nav>{activeTab === 'My Collections' || activeTab === 'Starred' ? <div className="saved-controls"><label>Sort by: <select value={sortOption} onChange={event => setSortOption(event.target.value)}><option>Recently Updated</option><option>Recently Created</option><option>Name</option><option>Most References</option></select></label><button className={viewMode === 'grid' ? 'selected' : ''} type="button" onClick={() => setViewMode('grid')}>▦</button><button className={viewMode === 'list' ? 'selected' : ''} type="button" onClick={() => setViewMode('list')}>☷</button></div> : null}</div>

        {activeTab === 'All References' ? <div className="reference-grid">{references.map(reference => <article className="saved-reference" key={reference.id}><div className={`reference-preview ${reference.tone}`}>✦</div><small>{reference.source}</small><strong>{reference.title}</strong><span>{reference.saved} <b>▱</b></span></article>)}</div> : activeTab === 'Trash' ? <div className="collection-grid trash-grid">{visibleCollections.length ? visibleCollections.map(collection => <article className="collection-card" key={collection.id}><CollectionPreview tone={collection.tone} title={collection.name} /><div className="collection-card-copy"><strong>{collection.name}</strong><p>{collection.description}</p><small>Deleted collection</small><div className="trash-actions"><button type="button" onClick={() => restoreCollection(collection.id)}>Restore</button><button type="button" onClick={() => { setDeletedCollections(current => current.filter(item => item.id !== collection.id)); showFeedback('Collection permanently deleted') }}>Delete permanently</button></div></div></article>) : <p className="saved-empty">Trash is empty.</p>}</div> : <div className={`collection-grid ${viewMode === 'list' ? 'list-view' : ''}`}>{visibleCollections.map(collection => <article className="collection-card" key={collection.id} onClick={() => showFeedback(`${collection.name} selected`)}><CollectionPreview tone={collection.tone} title={collection.name} /><div className="collection-card-copy"><div className="collection-card-title"><strong>{collection.name}</strong><button type="button" onClick={event => { event.stopPropagation(); toggleStar(collection.id) }}>{collection.starred ? '★' : '☆'}</button><button type="button" onClick={event => { event.stopPropagation(); deleteCollection(collection.id) }}>⋮</button></div><p>{collection.description}</p><div className="collection-stats"><span><b>{collection.references}</b> References</span><span><b>{collection.opportunities}</b> Opportunities</span><span><b>{collection.briefs}</b> Design Briefs</span></div><small>Updated {collection.updated}</small></div></article>)}</div>}

        {activeTab !== 'Trash' && activeTab !== 'All References' && <div className="recent-references"><div className="saved-section-title"><h2>Recently Added References</h2><span>View all references →</span></div><div className="recent-reference-row">{references.slice(0, 6).map(reference => <div className={`recent-reference ${reference.tone}`} key={reference.id}><strong>{reference.title}</strong><small>{reference.source} · {reference.saved}</small></div>)}</div></div>}</main>

        <aside className="saved-sidebar"><section className="saved-side-panel overview-panel"><h2>Collections Overview</h2><div className="donut-chart"><span>8<small>Collections</small></span></div>{['High Potential', 'Medium Potential', 'Low Potential', 'Under Review'].map((label, index) => <p key={label}><i className={`legend-dot dot-${index}`} />{label}<b>({collections.filter(item => item.potential === label).length})</b></p>)}</section><section className="saved-side-panel"><h2>Quick Filters</h2>{filterOptions.map(option => <button className={selectedFilter === option ? 'quick-filter active' : 'quick-filter'} type="button" key={option} onClick={() => { setSelectedFilter(option); setActiveTab('My Collections') }}>{option}<b>{option === 'All Collections' ? collections.length : collections.filter(item => item.potential === option).length}</b></button>)}</section><section className="saved-side-panel collection-stat-panel"><h2>Collection Stats</h2><p>▧ <span>Total References</span><b>756</b></p><p>♧ <span>Total Opportunities</span><b>99</b></p><p>▣ <span>Total Design Briefs</span><b>62</b></p><p>☆ <span>Starred Collections</span><b>{collections.filter(item => item.starred).length}</b></p></section><section className="saved-tips"><strong>♧ &nbsp; Tips</strong><p>Organize your research by themes and niches. Well-organized collections help you find the best ideas faster and create better designs.</p><button type="button">▤ &nbsp; Learn How Collections Work</button></section></aside></div>

      {feedback && <div className="saved-feedback">{feedback}</div>}
      {showCreateCollection && <div className="modal-backdrop" role="presentation" onClick={() => setShowCreateCollection(false)}><form className="create-collection-modal form-panel" onSubmit={createCollection} onClick={event => event.stopPropagation()}><div className="modal-heading"><h2>New Collection</h2><button type="button" onClick={() => setShowCreateCollection(false)}>×</button></div><label className="form-field"><span>Collection Name</span><input autoFocus value={newCollection.name} onChange={event => setNewCollection(current => ({ ...current, name: event.target.value }))} placeholder="e.g. Summer Design Ideas" required /></label><label className="form-field"><span>Description</span><textarea value={newCollection.description} onChange={event => setNewCollection(current => ({ ...current, description: event.target.value }))} placeholder="What will this collection contain?" /></label><label className="form-field"><span>Potential Level</span><select value={newCollection.potential} onChange={event => setNewCollection(current => ({ ...current, potential: event.target.value }))}>{filterOptions.slice(1).map(option => <option key={option}>{option}</option>)}</select></label><div className="modal-actions"><button className="secondary" type="button" onClick={() => setShowCreateCollection(false)}>Cancel</button><button className="primary" type="submit">Create Collection</button></div></form></div>}
    </section>
  )
}

export default SavedResearch
