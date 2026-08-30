import { useMemo, useState } from 'react'

const initialOpportunities = [
  { id: 1, title: 'Minimalist Coding + Coffee', niche: 'Coding & Coffee', description: 'A clean intersection of developer culture and coffee lifestyle with strong design potential.', score: 94, competition: 'Low', status: 'Ready for Design', tags: ['coding', 'coffee', 'minimalist'], source: 'Research Results', activity: 'Updated 2 hours ago' },
  { id: 2, title: 'Retro Developer Humor', niche: 'Retro Programming', description: 'Nostalgic developer humor and vintage computer themes continue to attract engaged audiences.', score: 88, competition: 'Medium', status: 'Validated', tags: ['retro', 'developer', 'humor'], source: 'Saved Research', activity: 'Updated yesterday' },
  { id: 3, title: 'Eco-Friendly Tech Shirts', niche: 'Eco Technology', description: 'Sustainable technology messaging creates a timely niche for thoughtful apparel designs.', score: 82, competition: 'Medium', status: 'Evaluating', tags: ['eco', 'technology', 'sustainable'], source: 'Design Detail', activity: 'Updated 2 days ago' },
  { id: 4, title: 'Anime Programmer Lifestyle', niche: 'Anime Developer', description: 'Anime-inspired coding references offer multiple directions for expressive niche designs.', score: 79, competition: 'High', status: 'Discovered', tags: ['anime', 'coding', 'lifestyle'], source: 'Research Results', activity: 'Updated 3 days ago' },
  { id: 5, title: 'Debugging Is My Cardio', niche: 'Developer Humor', description: 'A memorable developer phrase with broad appeal across shirts, mugs, and stickers.', score: 76, competition: 'Medium', status: 'In Progress', tags: ['debugging', 'funny', 'developer'], source: 'Design Detail', activity: 'Updated 4 days ago' },
  { id: 6, title: 'AI & Future Tech', niche: 'AI & Innovation', description: 'Future-focused technology concepts can translate into bold and educational visual themes.', score: 71, competition: 'High', status: 'Archived', tags: ['AI', 'future', 'innovation'], source: 'Saved Research', activity: 'Updated last week' },
]

const statuses = ['All Statuses', 'Discovered', 'Evaluating', 'Validated', 'Ready for Design', 'In Progress', 'Archived']
const potentialFilters = ['All Scores', 'High Potential', 'Medium Potential', 'Low Potential']
const sortOptions = ['Highest Score', 'Recently Updated', 'Title']

function getPotential(score) {
  if (score >= 85) return 'High Potential'
  if (score >= 75) return 'Medium Potential'
  return 'Low Potential'
}

function Opportunities({ onOpenOpportunity }) {
  const [opportunities, setOpportunities] = useState(initialOpportunities)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All Statuses')
  const [potential, setPotential] = useState('All Scores')
  const [sortBy, setSortBy] = useState('Highest Score')
  const [showCreate, setShowCreate] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [form, setForm] = useState({ title: '', niche: '', description: '', status: 'Discovered', score: '75' })

  const filteredOpportunities = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const results = opportunities.filter(opportunity => {
      const searchable = [opportunity.title, opportunity.niche, opportunity.description, ...opportunity.tags].join(' ').toLowerCase()
      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery)
      const matchesStatus = status === 'All Statuses' || opportunity.status === status
      const matchesPotential = potential === 'All Scores' || getPotential(opportunity.score) === potential
      return matchesQuery && matchesStatus && matchesPotential
    })

    return [...results].sort((a, b) => {
      if (sortBy === 'Recently Updated') return a.id - b.id
      if (sortBy === 'Title') return a.title.localeCompare(b.title)
      return b.score - a.score
    })
  }, [opportunities, potential, query, sortBy, status])

  const showFeedback = message => {
    setFeedback(message)
    window.setTimeout(() => setFeedback(''), 2500)
  }

  const openOpportunity = opportunity => {
    sessionStorage.setItem('nakiri-selected-opportunity', JSON.stringify(opportunity))
    if (onOpenOpportunity) {
      onOpenOpportunity(opportunity)
    } else {
      showFeedback(`${opportunity.title} selected for review`)
    }
  }

  const updateForm = (field, value) => {
    setForm(current => ({ ...current, [field]: value }))
  }

  const createOpportunity = event => {
    event.preventDefault()
    if (!form.title.trim() || !form.niche.trim() || !form.description.trim()) return

    const opportunity = {
      id: Date.now(),
      title: form.title.trim(),
      niche: form.niche.trim(),
      description: form.description.trim(),
      score: Number(form.score),
      competition: Number(form.score) >= 85 ? 'Low' : 'Medium',
      status: form.status,
      tags: [form.niche.trim().toLowerCase(), 'new opportunity'],
      source: 'Manually Added',
      activity: 'Created just now',
    }

    setOpportunities(current => [opportunity, ...current])
    setForm({ title: '', niche: '', description: '', status: 'Discovered', score: '75' })
    setShowCreate(false)
    showFeedback('Opportunity created')
  }

  return (
    <section className="content opportunities-content">
      <div className="opportunities-heading">
        <div>
          <div className="opportunities-breadcrumb"><span>Research Tools</span><span>›</span><span>Opportunities</span></div>
          <h1>Opportunities</h1>
          <p>Evaluate research findings and turn promising ideas into your next design.</p>
        </div>
        <button className="primary" type="button" onClick={() => setShowCreate(true)}>＋ New Opportunity</button>
      </div>

      <div className="opportunity-stat-grid">
        {[['Total Opportunities', opportunities.length, '♧'], ['High Potential', opportunities.filter(item => getPotential(item.score) === 'High Potential').length, '↗'], ['In Progress', opportunities.filter(item => item.status === 'In Progress' || item.status === 'Evaluating').length, '◷'], ['Ready for Design', opportunities.filter(item => item.status === 'Ready for Design').length, '✦']].map(([label, value, icon]) => <article className="opportunity-stat-card" key={label}><span>{icon}</span><div><small>{label}</small><strong>{value}</strong><p>From current research</p></div></article>)}
      </div>

      <div className="opportunity-toolbar"><label className="opportunity-search"><span>⌕</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search opportunities..." aria-label="Search opportunities" /></label><select value={status} onChange={event => setStatus(event.target.value)} aria-label="Filter by status">{statuses.map(option => <option key={option}>{option}</option>)}</select><select value={potential} onChange={event => setPotential(event.target.value)} aria-label="Filter by potential">{potentialFilters.map(option => <option key={option}>{option}</option>)}</select><select value={sortBy} onChange={event => setSortBy(event.target.value)} aria-label="Sort opportunities">{sortOptions.map(option => <option key={option}>{option}</option>)}</select></div>

      <div className="opportunities-section-heading"><div><h2>Opportunity Workspace</h2><p>{filteredOpportunities.length} opportunities matching your filters</p></div><span>▦ Board view</span></div>
      <div className="opportunities-grid">{filteredOpportunities.map(opportunity => <article className="opportunity-work-card" key={opportunity.id}><div className="opportunity-card-top"><span className={`opportunity-score ${getPotential(opportunity.score).toLowerCase().replace(' ', '-')}`}>{opportunity.score}</span><span className={`opportunity-status ${opportunity.status.toLowerCase().replaceAll(' ', '-')}`}>{opportunity.status}</span></div><h3>{opportunity.title}</h3><small className="opportunity-niche">{opportunity.niche}</small><p>{opportunity.description}</p><div className="opportunity-tags">{opportunity.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="opportunity-card-footer"><span>{opportunity.source} · {opportunity.activity}</span><button type="button" onClick={() => openOpportunity(opportunity)}>View Details →</button></div><div className="opportunity-card-metrics"><span>Competition <b>{opportunity.competition}</b></span><span>Potential <b>{getPotential(opportunity.score).replace(' Potential', '')}</b></span></div></article>)}</div>
      {!filteredOpportunities.length && <div className="opportunities-empty"><h2>No opportunities found</h2><p>Try changing your filters or create a new opportunity.</p></div>}

      {feedback && <div className="saved-feedback">{feedback}</div>}
      {showCreate && <div className="modal-backdrop" role="presentation" onClick={() => setShowCreate(false)}><form className="form-panel opportunity-modal" onSubmit={createOpportunity} onClick={event => event.stopPropagation()}><div className="modal-heading"><h2>New Opportunity</h2><button type="button" onClick={() => setShowCreate(false)}>×</button></div><label className="form-field"><span>Title</span><input autoFocus required value={form.title} onChange={event => updateForm('title', event.target.value)} placeholder="Opportunity title" /></label><label className="form-field"><span>Niche</span><input required value={form.niche} onChange={event => updateForm('niche', event.target.value)} placeholder="e.g. Developer Humor" /></label><label className="form-field"><span>Description</span><textarea required value={form.description} onChange={event => updateForm('description', event.target.value)} placeholder="Describe the opportunity" /></label><div className="opportunity-form-row"><label className="form-field"><span>Stage</span><select value={form.status} onChange={event => updateForm('status', event.target.value)}>{statuses.slice(1).map(option => <option key={option}>{option}</option>)}</select></label><label className="form-field"><span>Potential Score</span><input type="number" min="0" max="100" value={form.score} onChange={event => updateForm('score', event.target.value)} /></label></div><div className="modal-actions"><button className="secondary" type="button" onClick={() => setShowCreate(false)}>Cancel</button><button className="primary" type="submit">Create Opportunity</button></div></form></div>}
    </section>
  )
}

export default Opportunities
