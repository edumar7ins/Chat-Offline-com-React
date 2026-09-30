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
      className="min-h-0 flex-1 overflow-y-auto px-4"
      role="log"
    >
      {messages.length === 0 ? (
        <p className="flex h-full items-center justify-center text-sm text-stone-600">
          Nenhuma mensagem ainda
        </p>
      ) : (
        <div className="flex flex-col gap-3 py-4">
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  )
}