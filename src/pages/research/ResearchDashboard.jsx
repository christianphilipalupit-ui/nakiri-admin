import { useMemo, useState } from 'react'

const statistics = [
  { label: 'Total Researches', value: '24', change: '16%', icon: '⌕' },
  { label: 'Designs Found', value: '248', change: '18%', icon: '▧' },
  { label: 'Saved References', value: '56', change: '12%', icon: '♡' },
  { label: 'Opportunities Found', value: '18', change: '10%', icon: '♧' },
]

const researches = [
  { title: 'Coding + Coffee T-Shirt Designs', date: 'May 24, 2026', results: '120 results' },
  { title: 'Minimalist Travel Shirts', date: 'May 23, 2026', results: '98 results' },
  { title: 'Anime Quotes T-Shirts', date: 'May 22, 2026', results: '76 results' },
  { title: 'Gym Motivation Designs', date: 'May 21, 2026', results: '89 results' },
  { title: 'Retro Gaming Shirts', date: 'May 20, 2026', results: '68 results' },
]

const niches = [
  { name: 'Coding + Developer', score: 92 },
  { name: 'Anime & Manga', score: 88 },
  { name: 'Coffee & Beverages', score: 84 },
  { name: 'Minimalist Lifestyle', score: 76 },
  { name: 'Retro Gaming', score: 70 },
]

const opportunities = [
  { title: 'Minimalist Coding + Coffee', level: 'High Potential', icon: '☕', tone: 'high' },
  { title: 'Retro Developer Humor', level: 'Medium Potential', icon: '⌁', tone: 'medium' },
  { title: 'Eco-Friendly Tech Shirts', level: 'High Potential', icon: '♧', tone: 'high' },
]

function ResearchDashboard({ onNewResearch, onOpenSavedResearch, onOpenOpportunities }) {
  const [query, setQuery] = useState('')
  const [range, setRange] = useState('Last 7 days')
  const filteredResearches = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return normalizedQuery ? researches.filter(item => item.title.toLowerCase().includes(normalizedQuery)) : researches
  }, [query])

  return (
    <section className="content research-content">
      <div className="research-heading">
        <div><h1>Research / Trending Dashboard</h1><p>Discover trending opportunities, analyze data, and find ideas for your next project.</p></div>
        <div className="research-heading-actions">
          <div className="research-heading-buttons"><button className="secondary" type="button" onClick={onOpenSavedResearch}>▱ Saved Research</button><button className="primary" type="button" onClick={onNewResearch}>＋ New Research</button></div>
          <label className="range-select"><span className="sr-only">Research time range</span><select value={range} onChange={event => setRange(event.target.value)}><option>Last 7 days</option><option>Last 30 days</option><option>Last 90 days</option></select></label>
        </div>
      </div>

      <div className="research-stats">{statistics.map(stat => <article className="research-stat" key={stat.label}><div><p>{stat.label}</p><strong>{stat.value}</strong><small>▲ {stat.change} vs last 7 days</small></div><span className="research-stat-icon" aria-hidden="true">{stat.icon}</span></article>)}</div>

      <div className="research-panels">
        <section className="panel research-panel"><div className="research-panel-title"><h2>Recent Researches</h2><span>View all</span></div><label className="research-filter"><span aria-hidden="true">⌕</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Filter researches..." aria-label="Filter researches" /></label><div className="research-list">{filteredResearches.length ? filteredResearches.map(item => <div className="research-list-row" key={item.title}><span className="research-row-icon" aria-hidden="true">⌕</span><span className="research-row-copy"><strong>{item.title}</strong><small>{item.date} <em>•</em> {item.results}</small></span><span className="research-arrow" aria-hidden="true">›</span></div>) : <p className="research-empty">No researches match “{query}”.</p>}</div></section>
        <section className="panel research-panel"><div className="research-panel-title"><h2>Top Trending Niches</h2><span>View all</span></div><div className="niche-list">{niches.map(niche => <div className="niche-row" key={niche.name}><span>{niche.name}</span><span className="niche-meter"><i style={{ width: `${niche.score}%` }} /></span><small>{niche.score}</small></div>)}</div></section>
      </div>

      <section className="panel research-panel opportunities-panel"><div className="research-panel-title"><h2>Recent Opportunities</h2><button type="button" onClick={onOpenOpportunities}>View all</button></div><div className="opportunity-list">{opportunities.map(item => <article className="opportunity-card" key={item.title}><span className={`opportunity-icon ${item.tone}`} aria-hidden="true">{item.icon}</span><div><strong>{item.title}</strong><small className={item.tone}>{item.level}</small></div><button type="button" aria-label={`More actions for ${item.title}`}>⋮</button></article>)}</div></section>
    </section>
  )
}

export default ResearchDashboard
