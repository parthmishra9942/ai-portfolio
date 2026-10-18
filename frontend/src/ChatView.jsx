import { useState, useRef, useEffect } from 'react'
import { X, Send } from 'lucide-react'
import { CANDIDATE, API_URL, warmupBackend } from './config'

const STARTER_QUESTIONS = [
  'Tell me about your projects',
  'Why should we hire you?',
  "What's your tech stack?",
  'Show me your backend skills',
]

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

export default function ChatView({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hi! I'm ${CANDIDATE.name}'s AI representative. Ask me about his projects, skills, or background.` },
  ])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [isWakingUp, setIsWakingUp] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isWakingUp])

  useEffect(() => {
    inputRef.current?.focus()
    warmupBackend()
  }, [])

  async function sendMessage(overrideText) {
    const text = (overrideText ?? input).trim()
    if (!text || isStreaming) return

    setError(null)
    setIsWakingUp(false)
    const userMessage = { role: 'user', content: text }
    const historyToSend = [...messages, userMessage]

    setMessages([...historyToSend, { role: 'assistant', content: '' }])
    setInput('')
    setIsStreaming(true)

    // Cold-start timer: if response takes >3.2 seconds, notify user that server is waking up
    const wakeTimer = setTimeout(() => {
      setIsWakingUp(true)
    }, 3200)

    try {
      let res
      const fetchPayload = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyToSend }),
      }

      try {
        res = await fetch(`${API_URL}/chat`, fetchPayload)
      } catch (firstErr) {
        // Auto-retry once after 2.5s if Render free-tier cold start caused connection drop
        setIsWakingUp(true)
        await new Promise((r) => setTimeout(r, 2500))
        res = await fetch(`${API_URL}/chat`, fetchPayload)
      }

      if (res.status === 429) {
        throw new Error('Too many requests — please wait a minute and try again.')
      }

      if (!res.ok || !res.body) {
        throw new Error(`Server responded with ${res.status}`)
      }

      clearTimeout(wakeTimer)
      setIsWakingUp(false)

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const parts = buffer.split('\n\n')
        buffer = parts.pop()

        for (const part of parts) {
          const line = part.trim()
          if (!line.startsWith('data: ')) continue
          const payload = line.slice('data: '.length)
          if (payload === '[DONE]') continue

          try {
            const parsed = JSON.parse(payload)
            if (parsed.error) throw new Error(parsed.error)
            if (parsed.content) {
              setMessages((prev) => {
                const updated = [...prev]
                const last = updated[updated.length - 1]
                updated[updated.length - 1] = { ...last, content: last.content + parsed.content }
                return updated
              })
            }
          } catch (e) {
            // partial JSON chunk, ignore
          }
        }
      }
    } catch (err) {
      clearTimeout(wakeTimer)
      setIsWakingUp(false)
      const msg = err.message || 'Unable to connect to AI server.'
      if (msg.includes('Failed to fetch')) {
        setError('Server is spinning up (free-tier cold start). Please wait ~15s and click Retry below.')
      } else {
        setError(msg)
      }
    } finally {
      clearTimeout(wakeTimer)
      setIsWakingUp(false)
      setIsStreaming(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
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
          <span className="window-title">Ask Me — AI Chat</span>
          <button className="close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="chat-window">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              <div className="bubble">
                {msg.content
                  ? renderFormattedText(msg.content)
                  : (isStreaming && i === messages.length - 1 ? '…' : '')}
              </div>
            </div>
          ))}
          {isWakingUp && isStreaming && (
            <div className="waking-up-banner">
              <span className="pulse-dot-amber" />
              <span>Waking up free-tier backend (~15-20s cold start)... Hang tight!</span>
            </div>
          )}
          {error && (
            <div className="error-banner">
              <span>⚠️ {error}</span>
              <button
                type="button"
                className="retry-inline-btn"
                onClick={() => {
                  const lastUserMsg = messages.filter((m) => m.role === 'user').slice(-1)[0]
                  if (lastUserMsg) {
                    setError(null)
                    sendMessage(lastUserMsg.content)
                  }
                }}
              >
                ↻ Retry
              </button>
            </div>
          )}

          {messages.length === 1 && !isStreaming && (
            <div className="starter-questions">
              {STARTER_QUESTIONS.map((q) => (
                <button key={q} className="starter-chip" onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="input-bar">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about my projects, skills, or fit for a role..."
            rows={1}
            disabled={isStreaming}
          />
          <button onClick={() => sendMessage()} disabled={isStreaming || !input.trim()}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}