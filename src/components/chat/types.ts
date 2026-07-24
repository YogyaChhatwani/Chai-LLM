export type MessageRole = 'user' | 'assistant'

export type Reference = {
  id: string
  label?: string
  source?: string
  role?: MessageRole
}

export type Chat = {
  id: string
  role: MessageRole
  content: string
  references: Reference[]
}
