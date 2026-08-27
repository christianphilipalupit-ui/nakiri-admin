import { useMemo, useState } from 'react'

function readSelectedResult() {
  try {
    const stored = sessionStorage.getItem('nakiri-selected-result')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function DesignDetail({ onBack, onResults }) {
  const [result] = useState(readSelectedResult)
  const [saved, setSaved] = useState(false)
  const [note, setNote] = useState('')
  const [noteSaved, setNoteSaved] = useState(false)

  const toggleSaved = () => {
    setSaved(current => !current)
  }

  const saveNote = () => {
    setNoteSaved(true)
  }

  const relatedTags = useMemo(() => {
    return result
      ? [...result.tags, 'mug', 'caffeine', 'funny', 'tech']
      : []
  }, [result])

  if (!result) {
    return (
      <section className="content detail-empty-page">
        <div className="form-panel">
          <span className="research-empty-icon">▱</span>
          <h1>No design selected</h1>
          <p>Choose a research result to view its detailed insights.</p>
          <button className="primary" type="button" onClick={onResults}>
            ← Back to Results
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="content design-detail-content">
      {/* Page header and navigation */}
      <div className="detail-breadcrumb">
        <button type="button" onClick={onResults}>
          Research Tools
        </button>
        <span>›</span>
        <button type="button" onClick={onResults}>
          Research Results
        </button>
        <span>›</span>
        <span>Design Detail</span>
      </div>

      <div className="detail-heading">
        <div>
          <h1>Design Detail</h1>
          <p>
            View detailed information about this design reference and related insights.
          </p>
        </div>

        <div className="detail-actions">
          <button className="secondary" type="button" onClick={onResults}>
            ← &nbsp; Back to Results
          </button>
          <button className="secondary" type="button">
            ‹ &nbsp; Previous
          </button>
          <button className="secondary" type="button">
            Next &nbsp; ›
          </button>
        </div>
      </div>

      {/* Design preview and metadata */}
      <div className="detail-top-grid">
        <section className="form-panel design-overview">
          <div className="detail-preview">
            <div className={'detail-art ' + result.tone}>
              {result.preview.split('\n').map(line => (
                <span key={line}>{line}</span>
              ))}
            </div>

            <button type="button" aria-label="Open design preview">
              ↗
            </button>
          </div>

          <div className="detail-copy">
            <div className="detail-meta">
              <span>#1 Result</span>
              <span>Score {result.trendScore} / 100</span>
            </div>

            <h2>{result.title}</h2>
            <p>Simple and clean design combining coffee and coding elements.</p>

            <dl>
              <div>
                <dt>Product Type</dt>
                <dd>{result.productType}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>Programming, Coffee</dd>
              </div>
              <div>
                <dt>Style</dt>
                <dd>Minimalist</dd>
              </div>
              <div>
                <dt>Uploaded</dt>
                <dd>May 24, 2026</dd>
              </div>
              <div>
                <dt>Source</dt>
                <dd>{result.source}</dd>
              </div>
              <div>
                <dt>Seller</dt>
                <dd className="accent-text">CodeBrew Studio ↗</dd>
              </div>
            </dl>

            <h3>Description</h3>
            <p>
              A minimalist design for developers and coffee lovers. Perfect for
              everyday wear or as a gift for programmers.
            </p>

            <div className="quick-insights">
              <strong>⌁ &nbsp; Quick Insights</strong>
              <p>✓ &nbsp; High demand in the last 30 days</p>
              <p>✓ &nbsp; Many variants and color options available</p>
              <p>✓ &nbsp; Strong engagement and saves</p>
              <p>
                ✓ &nbsp; Matches your niche “
                {result.title.replace('Coffee Code Repeat', 'Coding + Coffee')}
                ”
              </p>
            </div>
          </div>
        </section>

        {/* Source information, actions, and notes */}
        <aside className="detail-side">
          <section className="form-panel source-information">
            <h2>Source Information</h2>

            <div className="source-detail">
              <span className="source-detail-icon">E</span>
              <div>
                <strong>{result.source}</strong>
                <small>Marketplace</small>
              </div>
              <button className="secondary" type="button">
                View Original ↗
              </button>
            </div>

            <p>Original Link</p>
            <strong className="accent-text">
              https://www.etsy.com/listing/coffee-code-repeat ↗
            </strong>

            <div className="found-row">
              <span>
                Found on
                <br />
                <b>May 24, 2026</b>
              </span>
              <span>
                Last seen
                <br />
                <b>May 26, 2026</b>
              </span>
            </div>

            <h3>Actions</h3>
            <div className="detail-button-row">
              <button className="secondary" type="button" onClick={toggleSaved}>
                {saved ? '▣ Saved' : '▱ Save Reference'}
              </button>
              <button className="secondary" type="button">
                ▱ &nbsp; Add to Collection⌄
              </button>
              <button className="secondary" type="button">
                ♧ &nbsp; Create Opportunity
              </button>
            </div>

            <h3>My Notes</h3>
            <textarea
              value={note}
              onChange={event => setNote(event.target.value)}
              placeholder="Add your notes about this design..."
              maxLength="500"
            />

            <div className="note-footer">
              <span>{note.length} / 500</span>
              <button className="primary" type="button" onClick={saveNote}>
                Save Note
              </button>
            </div>

            {noteSaved && (
              <small className="note-confirmation">
                Note saved temporarily.
              </small>
            )}
          </section>

          {/* Tags and keywords */}
          <section className="form-panel detail-tags">
            <h2>Tags / Keywords</h2>
            <div>
              {relatedTags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {/* Analysis and recommendation */}
      <div className="detail-bottom-grid">
        <section className="form-panel design-analysis">
          <h2>Design Analysis</h2>

          <div className="analysis-columns">
            <div>
              <small>Trend Strength</small>
              <strong className="analysis-score">
                {result.trendScore}
                <i> / 100</i>
              </strong>
              <span className="analysis-meter">
                <i style={{ width: result.trendScore + '%' }} />
              </span>
              <b>Very High</b>
            </div>

            <div>
              <small>Competition</small>
              <strong className="analysis-badge">Medium</strong>
              <p>Moderate number of similar designs found.</p>
            </div>

            <div>
              <small>Market Potential</small>
              <strong className="analysis-badge high">High</strong>
              <p>Consistent sales and strong engagement signals.</p>
            </div>
          </div>
        </section>

        <section className="form-panel detail-tip">
          <strong>♧ &nbsp; Tip</strong>
          <p>
            Use this design as inspiration, not as a copy. Create your own
            unique version that stands out!
          </p>
        </section>
      </div>
    </section>
  )
}

export default DesignDetail

