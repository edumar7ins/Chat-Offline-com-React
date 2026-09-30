import { useState } from 'react'
import type { Message, Sender } from './types/message'

export default function App() {
  const [messages] = useState<Message[]>([])
  const [sender] = useState<Sender>('user')

  return (
    <main className="h-dvh overflow-hidden bg-amber-100 text-stone-900">
      <section
        aria-label="Chat"
        className="mx-auto flex h-full w-full max-w-2xl flex-col"
      >
        <div
          aria-label={`Histórico de mensagens (${messages.length})`}
          className="min-h-0 flex-1 overflow-y-auto px-4"
          role="log"
        >
          {messages.length === 0 && (
            <p className="flex h-full items-center justify-center text-sm text-stone-600">
              Nenhuma mensagem ainda
            </p>
          )}
        </div>
        <footer className="shrink-0 px-4 pb-4 pt-3">
          <div
            aria-label={`Área de composição como ${sender === 'user' ? 'Usuário' : 'Robô'}`}
            className="min-h-16 rounded-xl border border-stone-200 bg-white p-3 shadow-sm"
            role="group"
          />
        </footer>
      </section>
    </main>
  )
}
