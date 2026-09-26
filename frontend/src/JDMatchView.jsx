import { useState } from 'react'
import { X, Sparkles } from 'lucide-react'

function renderInlineBold(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : <span key={i}>{part}</span>
  )
}

function renderFormattedText(text) {
  const lines = text.split('\n')
  const elements = []
  let listBuffer = []

  function flushList(key) {
    if (listBuffer.length) {
      elements.push(
        <ul key={`list-${key}`} className="msg-list">
          {listBuffer.map((item, i) => (
            <li key={i}>{renderInlineBold(item)}</li>
          ))}
        </ul>
      )
      listBuffer = []
    }
  }

  lines.forEach((line, idx) => {
    const trimmed = line.trim()

    if (trimmed.startsWith('### ')) {
      flushList(idx)
      elements.push(<h4 key={idx} className="msg-heading">{renderInlineBold(trimmed.slice(4))}</h4>)
    } else if (trimmed.startsWith('## ')) {
      flushList(idx)
      elements.push(<h3 key={idx} className="msg-heading">{renderInlineBold(trimmed.slice(3))}</h3>)
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      listBuffer.push(trimmed.slice(2))
    } else if (trimmed === '') {
      flushList(idx)
    } else {
      flushList(idx)
      elements.push(<p key={idx} className="msg-paragraph">{renderInlineBold(trimmed)}</p>)
    }
  })

  flushList('end')
  return elements
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function JDMatchView({ onClose }) {
  const [jobDescription, setJobDescription] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleAnalyze() {
    const text = jobDescription.trim()
    if (!text || isLoading) return

    setError(null)
    setAnalysis(null)
    setIsLoading(true)

    try {
      const res = await fetch(`${API_URL}/match-jd`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_description: text }),
      })

      if (res.status === 429) {
        throw new Error('Too many requests — please wait a minute and try again.')
      }
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`)
      }

      const data = await res.json()
      setAnalysis(data.analysis)
    } catch (err) {
      setError(err.message || 'Something went wrong analyzing this job description.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleReset() {
    setJobDescription('')
    setAnalysis(null)
    setError(null)
  }

  return (
    <div className="chat-overlay">
      <div className="chat-window-frame">
        <div className="window-titlebar">
          <div className="traffic-lights">
            <span className="light red" onClick={onClose} />
            <span className="light yellow" />
            <span className="light green" />
          </div>
          <span className="window-title">JD Match — Suitability Check</span>
          <button className="close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="chat-window">
          {!analysis && !isLoading && (
            <div className="jd-intro">
              <p>Paste a job description below and I'll break down how well this candidate fits — strengths, gaps, and a recommendation.</p>
            </div>
          )}

          {isLoading && (
            <div className="jd-loading">
              <Sparkles size={18} className="ask-me-sparkle" />
              <span>Analyzing job description…</span>
            </div>
          )}

          {error && <div className="error-banner">⚠️ {error}</div>}

          {analysis && (
            <div className="message assistant">
              <div className="bubble jd-result">
                {renderFormattedText(analysis)}
              </div>
            </div>
          )}
        </div>

        <div className="input-bar jd-input-bar">
          {!analysis ? (
            <>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                rows={4}
                disabled={isLoading}
              />
              <button onClick={handleAnalyze} disabled={isLoading || !jobDescription.trim()}>
                {isLoading ? '…' : 'Analyze'}
              </button>
            </>
          ) : (
            <button className="jd-reset-btn" onClick={handleReset}>
              Analyze another JD
            </button>
          )}
        </div>
      </div>
    </div>
  )
}