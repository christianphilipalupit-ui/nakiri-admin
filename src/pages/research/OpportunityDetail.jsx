import { useState } from 'react'

const stages = ['Discovered', 'Evaluating', 'Validated', 'Ready for Design', 'Archived']

const analysisItems = [
  { label: 'Why this is an opportunity', text: 'The theme combines a clear audience with a memorable visual idea and several product formats.' },
  { label: 'Trend signals', text: 'Related coding, coffee, and developer terms are appearing consistently across the current research sample.' },
  { label: 'Market potential', text: 'The concept can extend naturally into apparel, mugs, stickers, and other giftable products.' },
  { label: 'Risks and considerations', text: 'Keep the final direction original and avoid relying on overly common phrases or copied references.' },
]

function readSelectedOpportunity() {
  try {
    const stored = sessionStorage.getItem('nakiri-selected-opportunity')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function OpportunityDetail({ onBack, onCreateBrief }) {
  const [opportunity] = useState(readSelectedOpportunity)
  const [status, setStatus] = useState(opportunity?.status || 'Discovered')
  const [note, setNote] = useState('')
  const [feedback, setFeedback] = useState('')

  const showFeedback = message => {
    setFeedback(message)
    window.setTimeout(() => setFeedback(''), 2500)
  }

  const changeStatus = event => {
    const nextStatus = event.target.value
    setStatus(nextStatus)
    showFeedback(`Opportunity moved to ${nextStatus}`)
  }

  const saveNote = () => {
    showFeedback('Opportunity note saved temporarily')
  }

  const prepareDesignBrief = () => {
    sessionStorage.setItem('nakiri-design-brief-draft', JSON.stringify({
      opportunity,
      title: opportunity.title,
      niche: opportunity.niche,
      description: opportunity.description,
      tags: opportunity.tags,
    }))
    showFeedback('Opportunity prepared for Design Brief creation')
    if (onCreateBrief) onCreateBrief()
  }

  if (!opportunity) {
    return (
      <section className="content opportunity-empty-page">
        <div className="form-panel">
          <span className="research-empty-icon">♧</span>
          <h1>No opportunity selected</h1>
          <p>Choose an opportunity from the workspace to view its details.</p>
          <button className="primary" type="button" onClick={onBack}>← Back to Opportunities</button>
        </div>
      </section>
    )
  }

  const potential = opportunity.score >= 85 ? 'High' : opportunity.score >= 75 ? 'Medium' : 'Low'

  return (
    <section className="content opportunity-detail-content">
      <div className="opportunity-detail-breadcrumb"><button type="button" onClick={onBack}>Research Tools</button><span>›</span><button type="button" onClick={onBack}>Opportunities</button><span>›</span><span>Opportunity Detail</span></div>
      <div className="opportunity-detail-heading"><div><h1>{opportunity.title}</h1><p>{opportunity.niche} · Opportunity workspace</p></div><div className="opportunity-detail-actions"><button className="secondary" type="button" onClick={onBack}>← &nbsp; Back to Opportunities</button><button className="primary" type="button" onClick={prepareDesignBrief}>✦ &nbsp; Create Design Brief</button></div></div>

      <div className="opportunity-detail-grid"><main className="opportunity-detail-main"><section className="form-panel opportunity-overview-panel"><div className="opportunity-overview-top"><div><span className={`opportunity-status ${status.toLowerCase().replaceAll(' ', '-')}`}>{status}</span><h2>Opportunity Overview</h2><p>{opportunity.description}</p></div><div className="large-opportunity-score"><span>{opportunity.score}</span><small>Opportunity Score</small></div></div><div className="opportunity-overview-meta"><div><small>Niche / Category</small><strong>{opportunity.niche}</strong></div><div><small>Competition</small><strong>{opportunity.competition}</strong></div><div><small>Source</small><strong>{opportunity.source}</strong></div><div><small>Activity</small><strong>{opportunity.activity}</strong></div></div></section>

        <section className="form-panel opportunity-analysis-panel"><div className="detail-section-heading"><div><h2>Opportunity Analysis</h2><p>Static research interpretation for planning purposes.</p></div><span>Mock insight</span></div><div className="opportunity-analysis-list">{analysisItems.map(item => <div key={item.label}><span>✓</span><div><strong>{item.label}</strong><p>{item.text}</p></div></div>)}</div></section>

        <section className="form-panel opportunity-metrics-panel"><h2>Scores &amp; Indicators</h2><div className="opportunity-metrics"><div><div><small>Opportunity Score</small><b>{opportunity.score}/100</b></div><span><i style={{ width: `${opportunity.score}%` }} /></span></div><div><div><small>Trend Potential</small><b>{potential}</b></div><span><i style={{ width: `${Math.min(opportunity.score + 2, 100)}%` }} /></span></div><div><div><small>Design Potential</small><b>{opportunity.score >= 80 ? 'High' : 'Medium'}</b></div><span><i style={{ width: `${Math.min(opportunity.score - 3, 100)}%` }} /></span></div></div></section>

        <section className="form-panel opportunity-notes-panel"><h2>Notes</h2><textarea value={note} onChange={event => setNote(event.target.value)} placeholder="Add your evaluation notes about this opportunity..." maxLength="500" /><div className="opportunity-note-footer"><span>{note.length} / 500</span><button className="primary" type="button" onClick={saveNote}>Save Note</button></div></section></main>

        <aside className="opportunity-detail-side"><section className="form-panel status-panel"><h2>Opportunity Status</h2><label><span>Current stage</span><select value={status} onChange={changeStatus}>{stages.map(stage => <option key={stage}>{stage}</option>)}</select></label><p>Move this opportunity through the research-to-design workflow as it is evaluated.</p></section><section className="form-panel detail-source-panel"><h2>Source &amp; Reference</h2><p>Originated from</p><strong className="accent-text">{opportunity.source}</strong><p>Related niche</p><strong>{opportunity.niche}</strong><div className="detail-source-box">⌕ &nbsp; Research reference<br /><small>Selected from your research workspace</small></div></section><section className="form-panel opportunity-tags-panel"><h2>Tags &amp; Keywords</h2><div>{opportunity.tags.map(tag => <span key={tag}>{tag}</span>)}</div></section><section className="form-panel recommended-panel"><strong>✦ &nbsp; Recommended direction</strong><p>Turn the strongest trend signal into an original design concept, then validate the first draft against this opportunity.</p></section></aside></div>
      {feedback && <div className="saved-feedback">{feedback}</div>}
    </section>
  )
}

export default OpportunityDetail
