import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import type { Sender } from '../types/message'

type MessageComposerProps = {
  sender: Sender
  onSenderChange: (sender: Sender) => void
  onSend: (content: string) => void
}

export default function MessageComposer({
  sender,
  onSenderChange,
  onSend,
}: MessageComposerProps) {
  const [content, setContent] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isBot = sender === 'bot'

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedContent = content.trim()

    if (!trimmedContent) {
      return
    }

    onSend(trimmedContent)
    setContent('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const textarea = event.currentTarget
    setContent(textarea.value)
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`
  }

  return (
    <form
      aria-label={`Composição de mensagem como ${isBot ? 'Robô' : 'Usuário'}`}
      className={`flex items-end gap-2 rounded-xl border bg-white p-3 shadow-sm sm:gap-3 ${
        isBot ? 'border-purple-500' : 'border-stone-200'
      }`}
      onSubmit={sendMessage}
    >
      <button
        type="button"
        role="switch"
        aria-checked={isBot}
        aria-label="Alternar remetente entre Usuário e Robô"
        className="shrink-0 rounded-lg border border-stone-300 px-2 py-2 text-xs font-semibold text-stone-700 outline-none hover:bg-stone-100 focus-visible:ring-2 focus-visible:ring-purple-500 sm:px-3 sm:text-sm"
        onClick={() => onSenderChange(isBot ? 'user' : 'bot')}
      >
        {isBot ? 'Robô' : 'Usuário'}
      </button>
      <textarea
        ref={textareaRef}
        aria-label="Mensagem"
        className="max-h-40 min-w-0 flex-1 resize-none overflow-y-auto bg-transparent py-2 text-sm leading-5 text-stone-900 outline-none placeholder:text-stone-500 focus-visible:ring-2 focus-visible:ring-purple-500"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Digite uma mensagem..."
        rows={1}
        value={content}
      />
      <button
        type="submit"
        disabled={!content.trim()}
        className="shrink-0 rounded-lg bg-stone-900 px-3 py-2 text-sm font-semibold text-white outline-none hover:bg-stone-700 focus-visible:ring-2 focus-visible:ring-purple-500 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500 sm:px-4"
      >
        Enviar
      </button>
    </form>
  )
}