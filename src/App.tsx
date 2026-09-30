import './App.css'
import { useState } from 'react'
import ChatHistory from './components/ChatHistory'
import MessageComposer from './components/MessageComposer'
import type { Message, Sender } from './types/message'

export default function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [sender, setSender] = useState<Sender>('user')

  function addMessage(content: string) {
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: crypto.randomUUID(), content, sender },
    ])
  }

  return (
    <main className="chat-app">
      <section aria-label="Chat" className="chat-layout">
        <header className="chat-header">
          <div className="brand-lockup">
            <span aria-hidden="true" className="brand-mark">c</span>
            <div>
              <p className="brand-eyebrow">ESPAÇO DE CONVERSA</p>
              <h1 className="brand-title">Conversa local</h1>
            </div>
          </div>
          <div aria-label="Local e privado" className="privacy-status">
            <span aria-hidden="true" className="privacy-dot" />
            <span className="privacy-status__text">LOCAL · PRIVADO</span>
          </div>
        </header>
        <ChatHistory messages={messages} />
        <footer className="chat-footer">
          <div className="composer-caption">
            <span>Mensagem nova</span>
            <span className={sender === 'bot' ? 'composer-mode composer-mode--bot' : 'composer-mode'}>
              {sender === 'user' ? 'Enviando como Usuário' : 'Enviando como Robô'}
            </span>
          </div>
          <MessageComposer
            sender={sender}
            onSenderChange={setSender}
            onSend={addMessage}
          />
        </footer>
      </section>
    </main>
  )
}
