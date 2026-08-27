import { useMemo, useState } from 'react'

const sourceOptions = [
  { name: 'Etsy', description: 'Marketplace', icon: 'E' },
  { name: 'TeePublic', description: 'Print on Demand', icon: '◉' },
  { name: 'Redbubble', description: 'Print on Demand', icon: '▣' },
  { name: 'Pinterest', description: 'Inspiration', icon: 'P' },
  { name: 'Amazon', description: 'Marketplace', icon: 'a' },
]

const timeRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'All time']
const sortOptions = ['Relevance', 'Newest first', 'Highest trend score']

function NicheTrendSearch({ onBack, onStartResearch }) {
  const [topic, setTopic] = useState('Coding + Coffee')
  const [keywordInput, setKeywordInput] = useState('coding, coffee, developer, programming, caffeine, code, humor')
  const [excludedInput, setExcludedInput] = useState('')
  const [sources, setSources] = useState(sourceOptions.map(source => source.name))
  const [timeRange, setTimeRange] = useState('Last 30 days')
  const [sortBy, setSortBy] = useState('Relevance')
  const [minTrendScore, setMinTrendScore] = useState(50)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const keywords = useMemo(() => keywordInput.split(',').map(item => item.trim()).filter(Boolean), [keywordInput])
  const excludedKeywords = useMemo(() => excludedInput.split(',').map(item => item.trim()).filter(Boolean), [excludedInput])

  const toggleSource = sourceName => {
    setSources(current => current.includes(sourceName) ? current.filter(source => source !== sourceName) : [...current, sourceName])
    setError('')
  }

  const removeKeyword = keyword => setKeywordInput(current => current.split(',').map(item => item.trim()).filter(item => item && item !== keyword).join(', '))
  const removeExcludedKeyword = keyword => setExcludedInput(current => current.split(',').map(item => item.trim()).filter(item => item && item !== keyword).join(', '))

  const handleStartResearch = event => {
    event.preventDefault()
    if (!topic.trim()) {
      setError('Enter a niche or topic before starting your research.')
      setNotice('')
      return
    }
    if (!keywords.length) {
      setError('Add at least one keyword to make the research more specific.')
      setNotice('')
      return
    }
    if (!sources.length) {
      setError('Select at least one research source.')
      setNotice('')
      return
    }

    const configuration = { topic: topic.trim(), keywords, excludedKeywords, sources, timeRange, sortBy, minTrendScore }
    sessionStorage.setItem('nakiri-research-config', JSON.stringify(configuration))
    setError('')
    setNotice('Research configuration saved. Results will be available in the next Research page.')
    if (onStartResearch) onStartResearch()
  }

  return (
    <section className="content research-search-content">
      <div className="research-search-heading">
        <div className="research-breadcrumb"><button type="button" onClick={onBack}>Research Tools</button><span>›</span><span>Niche &amp; Trend Search</span></div>
        <div className="research-search-title"><div><h1>Niche &amp; Trend Search</h1><p>Find trending designs, topics, and opportunities across the internet.</p></div><div className="research-search-actions"><button className="secondary" type="button" onClick={onBack}>← &nbsp; View Research Dashboard</button><button className="primary" type="submit" form="niche-search-form">▷ &nbsp; Start Research</button></div></div>
      </div>

      {notice && <p className="research-notice success">{notice}</p>}
      {error && <p className="research-notice error" role="alert">{error}</p>}

      <form id="niche-search-form" onSubmit={handleStartResearch}>
        <div className="research-search-grid">
          <div className="research-search-main">
            <section className="form-panel research-form-panel"><h2>Search &amp; Keywords</h2><label className="form-field"><span>Primary Niche / Topic</span><div className="research-input-wrap"><i>◇</i><input value={topic} onChange={event => { setTopic(event.target.value); setError('') }} placeholder="e.g. coding + coffee" /></div></label><label className="form-field"><span>Keywords (separate with comma)</span><div className="research-input-wrap keyword-wrap"><i>✿</i><input value={keywordInput} onChange={event => { setKeywordInput(event.target.value); setError('') }} placeholder="coding, coffee, developer" /><b>{keywords.length} / 20</b></div></label>{keywords.length > 0 && <div className="keyword-chips">{keywords.map(keyword => <span className="keyword-chip" key={keyword}>{keyword}<button type="button" onClick={() => removeKeyword(keyword)} aria-label={`Remove ${keyword}`}>×</button></span>)}</div>}<label className="form-field"><span>Exclude Keywords (optional)</span><div className="research-input-wrap"><i>⊖</i><input value={excludedInput} onChange={event => setExcludedInput(event.target.value)} placeholder="e.g. politics, religion" /></div></label>{excludedKeywords.length > 0 && <div className="keyword-chips">{excludedKeywords.map(keyword => <span className="keyword-chip excluded" key={keyword}>{keyword}<button type="button" onClick={() => removeExcludedKeyword(keyword)} aria-label={`Remove excluded ${keyword}`}>×</button></span>)}</div>}</section>

            <section className="form-panel research-form-panel"><h2>Sources / Platforms</h2><p className="research-section-note">Select where we should look for trends</p><div className="source-grid">{sourceOptions.map(source => <button className={`source-card ${sources.includes(source.name) ? 'selected' : ''}`} type="button" key={source.name} onClick={() => toggleSource(source.name)}><span className="source-icon">{source.icon}</span><span><strong>{source.name}</strong><small>{source.description}</small></span><b>{sources.includes(source.name) ? '✓' : ''}</b></button>)}<button className="source-card disabled" type="button" disabled><span className="source-icon">◎</span><span><strong>More Sources</strong><small>Coming soon</small></span></button></div></section>

            <section className="form-panel research-form-panel"><h2>Filters</h2><p className="research-section-note">Refine your search results</p><div className="research-filter-grid"><label className="form-field"><span>Time Range</span><select value={timeRange} onChange={event => setTimeRange(event.target.value)}>{timeRanges.map(range => <option key={range}>{range}</option>)}</select></label><label className="form-field"><span>Sort By</span><select value={sortBy} onChange={event => setSortBy(event.target.value)}>{sortOptions.map(option => <option key={option}>{option}</option>)}</select></label><label className="form-field trend-slider"><span>Min Trend Score <b>{minTrendScore} / 100</b></span><input type="range" min="0" max="100" value={minTrendScore} onChange={event => setMinTrendScore(Number(event.target.value))} /><small><span>0</span><span>100</span></small></label></div></section>
          </div>

          <aside className="research-search-side"><section className="form-panel research-summary"><h2>Research Summary</h2><div className="summary-topic"><small>Niche</small><strong>{topic || 'Not specified'}</strong><em>{topic ? 'Custom Niche' : 'Required'}</em></div><div className="summary-list"><p><span>◇</span>Keywords <b>{keywords.length}</b></p><p><span>♙</span>Sources <b>{sources.length}</b></p><p><span>◷</span>Time Range <b>{timeRange}</b></p><p><span>◷</span>Min Trend Score <b>{minTrendScore} / 100</b></p></div><div className="what-we-do"><strong>♧ &nbsp; What will we do?</strong><p>We'll analyze multiple sources and collect trending designs, patterns, and insights related to your niche and keywords.</p></div></section><section className="form-panel search-tips"><h2>♧ &nbsp; Search Tips</h2>{['Use specific niches for better results.', 'Add related keywords to discover more trending variations.', 'Try different time ranges to see what’s currently hot.', 'Higher trend score means higher popularity.'].map(tip => <p key={tip}><span>✓</span>{tip}</p>)}</section></aside>
        </div>
      </form>
    </section>
  )
}

export default NicheTrendSearch
