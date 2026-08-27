import { useMemo, useState } from 'react'

const mockResults = [
  {
    id: 1,
    title: 'Coffee Code Repeat',
    source: 'Etsy',
    productType: 'T-Shirt',
    tags: ['coding', 'coffee', 'minimalist'],
    trendScore: 92,
    preview: 'COFFEE\n</>\nCODE',
    tone: 'dark',
  },
  {
    id: 2,
    title: 'Caffeine Fuels My Code',
    source: 'TeePublic',
    productType: 'T-Shirt',
    tags: ['developer', 'coffee', 'funny'],
    trendScore: 90,
    preview: 'CAFFEINE\nFUELS\nMY CODE',
    tone: 'cream',
  },
  { id: 3, title: 'Debugging Powered by Coffee', source: 'Redbubble', productType: 'T-Shirt', tags: ['debugging', 'coffee', 'developer'], trendScore: 88, preview: 'DEBUGGING\nPOWERED BY\nCOFFEE', tone: 'navy' },
  { id: 4, title: 'I Turn Coffee Into Code', source: 'Etsy', productType: 'T-Shirt', tags: ['coding', 'coffee', 'programmer'], trendScore: 86, preview: 'I TURN\nCOFFEE INTO\nCODE', tone: 'black' },
  { id: 5, title: 'Espresso Yourself', source: 'TeePublic', productType: 'T-Shirt', tags: ['funny', 'coffee', 'developer'], trendScore: 84, preview: 'ESPRESSO\nYOURSELF', tone: 'navy' },
  { id: 6, title: 'Code Now Coffee Later', source: 'Redbubble', productType: 'T-Shirt', tags: ['coding', 'coffee', 'humor'], trendScore: 82, preview: 'CODE NOW\nCOFFEE\nLATER', tone: 'black' },
  { id: 7, title: 'Life Happens Code Helps', source: 'Etsy', productType: 'T-Shirt', tags: ['programmer', 'motivation', 'coffee'], trendScore: 80, preview: 'LIFE HAPPENS\nCODE HELPS', tone: 'light' },
  { id: 8, title: 'Coding Is My Therapy', source: 'TeePublic', productType: 'T-Shirt', tags: ['coding', 'retro', 'developer'], trendScore: 78, preview: 'CODING IS MY\nTHERAPY', tone: 'sunset' },
]

const productTypes = ['T-Shirt', 'Hoodies', 'Stickers', 'Mugs', 'Posters']
const sources = ['Etsy', 'TeePublic', 'Redbubble', 'Pinterest', 'Amazon']

function readResearchConfig() {
  try {
    const stored = sessionStorage.getItem('nakiri-research-config')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function ResearchResults({ onNewResearch, onBack, onOpenResult }) {
  const [config] = useState(readResearchConfig)
  const [query, setQuery] = useState('')
  const [selectedSources, setSelectedSources] = useState([])
  const [selectedProducts, setSelectedProducts] = useState(['T-Shirt'])
  const [minScore, setMinScore] = useState(50)
  const [sortBy, setSortBy] = useState('Relevance')
  const [savedIds, setSavedIds] = useState([])

  const toggle = (value, setter) => {
    setter(current => current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value])
  }

  const filteredResults = useMemo(() => {
    const search = query.trim().toLowerCase()
    const results = mockResults.filter(result => {
      const searchableText = [result.title, result.source, ...result.tags].join(' ').toLowerCase()
      const matchesSearch = !search || searchableText.includes(search)
      const matchesSource = !selectedSources.length || selectedSources.includes(result.source)
      const matchesProduct = !selectedProducts.length || selectedProducts.includes(result.productType)
      const meetsTrendScore = result.trendScore >= minScore

      return matchesSearch && matchesSource && matchesProduct && meetsTrendScore
    })

    return [...results].sort((a, b) => {
      if (sortBy === 'Highest trend score') return b.trendScore - a.trendScore
      if (sortBy === 'Newest first') return b.id - a.id
      return a.id - b.id
    })
  }, [minScore, query, selectedProducts, selectedSources, sortBy])

  const toggleSaved = id => {
    setSavedIds(current => current.includes(id)
      ? current.filter(savedId => savedId !== id)
      : [...current, id])
  }

  const clearFilters = () => {
    setSelectedSources([])
    setSelectedProducts(['T-Shirt'])
    setMinScore(50)
    setQuery('')
  }

  const openResult = result => {
    sessionStorage.setItem('nakiri-selected-result', JSON.stringify(result))
    onOpenResult(result)
  }

  if (!config) {
    return (
      <section className="content research-empty-page">
        <div className="form-panel">
          <span className="research-empty-icon">⌕</span>
          <h1>No active research session</h1>
          <p>Start a new niche and trend search to see research results here.</p>
          <button className="primary" type="button" onClick={onNewResearch}>
            ＋ Start New Research
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="content research-results-content">
      <div className="results-breadcrumb">
        <button type="button" onClick={onBack}>Research Tools</button>
        <span>›</span>
        <button type="button" onClick={onBack}>Niche &amp; Trend Search</button>
        <span>›</span>
        <span>Research Results</span>
      </div>

      <div className="results-heading">
        <div>
          <h1>Research Results</h1>
          <p>Found {filteredResults.length ? 125 : 0} trending designs for “{config.topic}”</p>
        </div>
        <div className="results-actions">
          <button className="secondary" type="button" onClick={onBack}>↩ &nbsp; New Search</button>
          <button className="secondary" type="button">⇩ &nbsp; Export Results</button>
          <button className="primary" type="button" onClick={onNewResearch}>＋ New Research</button>
        </div>
      </div>

      <div className="results-context">
        <span><b>{config.sources?.length || 0}</b> sources</span>
        <span><b>{config.keywords?.length || 0}</b> keywords</span>
        <span><b>{config.timeRange}</b></span>
        <span><b>{config.minTrendScore}/100</b> minimum score</span>
      </div>

      <div className="results-tabs">
        <button className="active" type="button">All Results (125)</button>
        <button type="button">T-Shirts (84)</button>
        <button type="button">Hoodies (18)</button>
        <button type="button">Stickers (12)</button>
        <button type="button">Mugs (8)</button>
        <label>
          Sort by:
          <select value={sortBy} onChange={event => setSortBy(event.target.value)}>
            <option>Relevance</option>
            <option>Newest first</option>
            <option>Highest trend score</option>
          </select>
        </label>
      </div>
      <div className="results-layout">
        <main className="results-main"><label className="results-search"><span>⌕</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search within results..." aria-label="Search within results" /></label><div className="result-grid">{filteredResults.map((result, index) => <article className="result-card" key={result.id} onClick={() => openResult(result)}><div className={`result-preview ${result.tone}`}>{result.preview.split('\n').map(line => <span key={line}>{line}</span>)}<b>#{index + 1}</b><em>{result.trendScore}</em></div><div className="result-card-body"><div className="result-card-title"><strong>{result.title}</strong><button type="button" onClick={event => { event.stopPropagation(); toggleSaved(result.id) }} aria-label={`${savedIds.includes(result.id) ? 'Unsave' : 'Save'} ${result.title}`}>{savedIds.includes(result.id) ? '▣' : '▱'}</button></div><small>{result.source} &nbsp;•&nbsp; {result.productType}</small><div className="result-tags">{result.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>{!filteredResults.length && <div className="results-no-match"><h2>No matching results</h2><p>Try widening your filters or lowering the minimum trend score.</p></div>}<p className="results-count">Showing {filteredResults.length} of 125 results <span>‹ &nbsp; <b>1</b> &nbsp; 2 &nbsp; 3 &nbsp; 4 &nbsp; 5 &nbsp; … &nbsp; 11 &nbsp; ›</span></p></main>
        <aside className="results-filters form-panel"><div className="filter-heading"><h2>Filters</h2><button type="button" onClick={() => { setSelectedSources([]); setSelectedProducts(['T-Shirt']); setMinScore(50); setQuery('') }}>Clear all</button></div><fieldset><legend>Source / Platform</legend><label><input type="checkbox" checked={!selectedSources.length} onChange={() => setSelectedSources([])} />All Sources <small>125</small></label>{sources.map(source => <label key={source}><input type="checkbox" checked={selectedSources.includes(source)} onChange={() => toggle(source, setSelectedSources)} />{source}<small>{source === 'Etsy' ? 52 : source === 'TeePublic' ? 38 : source === 'Redbubble' ? 21 : source === 'Pinterest' ? 10 : 4}</small></label>)}</fieldset><fieldset><legend>Time Range</legend><select value={config.timeRange || 'Last 30 days'} disabled><option>{config.timeRange || 'Last 30 days'}</option></select></fieldset><fieldset><legend>Min Trend Score <b>{minScore}+</b></legend><input className="filter-range" type="range" min="0" max="100" value={minScore} onChange={event => setMinScore(Number(event.target.value))} /><div className="range-labels"><span>0</span><span>100</span></div></fieldset><fieldset><legend>Product Type</legend>{productTypes.map(product => <label key={product}><input type="checkbox" checked={selectedProducts.includes(product)} onChange={() => toggle(product, setSelectedProducts)} />{product}<small>{product === 'T-Shirt' ? 84 : product === 'Hoodies' ? 18 : product === 'Stickers' ? 12 : product === 'Mugs' ? 8 : 3}</small></label>)}</fieldset><div className="results-about"><strong>♧ &nbsp; About these results</strong><p>We analyze multiple sources and show the most relevant and trending designs based on your niche and keywords.</p></div></aside>
      </div>
    </section>
  )
}

export default ResearchResults
