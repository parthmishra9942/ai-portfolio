import { useState, useRef, useEffect } from 'react'
import { X, Send } from 'lucide-react'
import { CANDIDATE } from './config'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const STARTER_QUESTIONS = [
  'Tell me about your projects',
  'Why should we hire you?',
  "What's your tech stack?",
  'Show me your backend skills',
]

export default function ChatView({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hi! I'm ${CANDIDATE.name}'s AI representative. Ask me about his projects, skills, or background.` },
  ])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  async function sendMessage(overrideText) {
    const text = (overrideText ?? input).trim()
    if (!text || isStreaming) return

    setError(null)
    const userMessage = { role: 'user', content: text }
    const historyToSend = [...messages, userMessage]

    setMessages([...historyToSend, { role: 'assistant', content: '' }])
    setInput('')
    setIsStreaming(true)

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyToSend }),
      })

      if (!res.ok || !res.body) {
        throw new Error(`Server responded with ${res.status}`)
      }

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
      setError(err.message || 'Something went wrong talking to the backend.')
    } finally {
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
                {msg.content || (isStreaming && i === messages.length - 1 ? '…' : '')}
              </div>
            </div>
          ))}
          {error && <div className="error-banner">⚠️ {error}</div>}

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
          <button onClick={sendMessage} disabled={isStreaming || !input.trim()}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
