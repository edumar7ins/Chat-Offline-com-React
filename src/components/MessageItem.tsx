import type { Message } from '../types/message'

type MessageItemProps = {
  message: Message
}

export default function MessageItem({ message }: MessageItemProps) {
  const isUser = message.sender === 'user'

  return (
    <article className={`message-row ${isUser ? 'message-row--user' : 'message-row--bot'}`}>
      <div className="message-bubble">
        <div className="message-meta">
          <span aria-hidden="true" className="message-dot" />
          <p>{isUser ? 'Usuário' : 'Robô'}</p>
        </div>
        <p className="message-content">{message.content}</p>
      </div>
    </article>
  )
}