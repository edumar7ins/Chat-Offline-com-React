export type Sender = 'user' | 'bot'

export type Message = {
  id: string
  content: string
  sender: Sender
}