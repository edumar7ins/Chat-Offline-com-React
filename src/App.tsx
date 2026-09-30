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
    <main className="h-dvh overflow-hidden bg-amber-100 text-stone-900">
      <section
        aria-label="Chat"
        className="mx-auto flex h-full w-full max-w-2xl flex-col"
      >
        <ChatHistory messages={messages} />
        <footer className="shrink-0 px-4 pb-4 pt-3">
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
