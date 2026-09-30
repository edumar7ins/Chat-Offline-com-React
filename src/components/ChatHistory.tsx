import { useEffect, useRef } from 'react'
import type { Message } from '../types/message'
import MessageItem from './MessageItem'

type ChatHistoryProps = {
  messages: Message[]
}

export default function ChatHistory({ messages }: ChatHistoryProps) {
  const historyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const history = historyRef.current

    if (history) {
      history.scrollTop = history.scrollHeight
    }
  }, [messages])

  return (
    <div
      ref={historyRef}
      aria-label={`Histórico de mensagens (${messages.length})`}
      className="chat-history"
      role="log"
    >
      <div aria-hidden="true" className="history-caption">
        <span>Histórico</span>
        <span className="history-count">
          {String(messages.length).padStart(2, '0')} {messages.length === 1 ? 'mensagem' : 'mensagens'}
        </span>
      </div>
      {messages.length === 0 ? (
        <div className="empty-state">
          <span aria-hidden="true" className="empty-mark">
            <span />
            <span />
            <span />
          </span>
          <p className="empty-title">Tudo começa por aqui.</p>
          <p className="empty-note">Ainda não há mensagens nesta conversa.</p>
        </div>
      ) : (
        <div className="message-list">
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  )
}