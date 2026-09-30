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
      className={`message-composer ${
        isBot ? 'message-composer--bot' : ''
      }`}
      onSubmit={sendMessage}
    >
      <button
        type="button"
        role="switch"
        aria-checked={isBot}
        aria-label="Alternar remetente entre Usuário e Robô"
        className={`sender-toggle ${isBot ? 'sender-toggle--bot' : ''}`}
        onClick={() => onSenderChange(isBot ? 'user' : 'bot')}
      >
        <span aria-hidden="true" className="sender-toggle__mark">
          {isBot ? 'R' : 'U'}
        </span>
        <span>{isBot ? 'Robô' : 'Usuário'}</span>
      </button>
      <textarea
        ref={textareaRef}
        aria-label="Mensagem"
        className="message-input"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Digite uma mensagem..."
        rows={1}
        value={content}
      />
      <button
        type="submit"
        disabled={!content.trim()}
        className="send-button"
      >
        <span>Enviar</span>
        <span aria-hidden="true" className="send-arrow">↗</span>
      </button>
    </form>
  )
}