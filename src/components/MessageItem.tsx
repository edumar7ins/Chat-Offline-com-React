import type { Message } from '../types/message'

type MessageItemProps = {
  message: Message
}

export default function MessageItem({ message }: MessageItemProps) {
  const isUser = message.sender === 'user'

  return (
    <article className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-xl px-4 py-2 ${
          isUser ? 'bg-amber-800 text-white' : 'border border-stone-200 bg-white text-stone-900'
        }`}
      >
        <p className="mb-1 text-xs font-semibold">
          {isUser ? 'Usuário' : 'Robô'}
        </p>
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </article>
  )
}