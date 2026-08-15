import { useEffect, useRef, useState } from 'react'
import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'

type ConnectionState = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED' | 'ERROR'

function wsUrl(): string {
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
  return `${protocol}://${window.location.hostname}:4000/ws`
}

export function WebSocketPage() {
  const [state, setState] = useState<ConnectionState>('DISCONNECTED')
  const [messages, setMessages] = useState<string[]>([])
  const [draft, setDraft] = useState('')
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => () => socketRef.current?.close(), [])

  function connect() {
    setState('CONNECTING')
    const socket = new WebSocket(wsUrl())
    socketRef.current = socket
    socket.onopen = () => setState('CONNECTED')
    socket.onmessage = (event) => setMessages((prev) => [...prev, event.data as string])
    socket.onerror = () => setState('ERROR')
    socket.onclose = () => setState((prev) => (prev === 'ERROR' ? prev : 'DISCONNECTED'))
  }

  function disconnect() {
    socketRef.current?.close()
    setState('DISCONNECTED')
  }

  function send() {
    if (!draft || socketRef.current?.readyState !== WebSocket.OPEN) return
    socketRef.current.send(draft)
    setDraft('')
  }

  return (
    <div data-testid="websocket-page">
      <h1 className="page-title">WebSocket</h1>
      <p className="page-description">
        Connects to a local echo WebSocket server (<code>npm run server</code>). Fully local — no external service.
      </p>

      {state === 'ERROR' ? (
        <Alert variant="warning" testId="websocket-error">
          Could not connect. Run <code>npm run server</code> in a separate terminal, then retry.
        </Alert>
      ) : null}

      <Section title="Connection" testId="section-websocket">
        <p className="status-panel" data-testid="websocket-connection-status">
          Connection: {state}
        </p>
        <div className="form-actions">
          <Button testId="websocket-connect" onClick={connect} disabled={state === 'CONNECTED' || state === 'CONNECTING'}>
            Connect
          </Button>
          <Button variant="secondary" testId="websocket-disconnect" onClick={disconnect} disabled={state !== 'CONNECTED'}>
            Disconnect
          </Button>
        </div>

        <div className="field mt-2">
          <label className="field-label" htmlFor="websocket-message-input">
            Message
          </label>
          <input
            id="websocket-message-input"
            data-testid="websocket-message-input"
            className="field-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
          />
        </div>
        <Button testId="websocket-send" onClick={send} disabled={state !== 'CONNECTED'}>
          Send Message
        </Button>

        <h3 className="card-title mt-2">Received Messages</h3>
        <ul id="websocket-messages" data-testid="websocket-messages" className="status-panel">
          {messages.length === 0 ? (
            <li data-testid="websocket-messages-empty">No messages yet.</li>
          ) : (
            messages.map((m, i) => (
              <li key={i} data-testid={`websocket-message-${i}`}>
                {m}
              </li>
            ))
          )}
        </ul>
      </Section>
    </div>
  )
}
