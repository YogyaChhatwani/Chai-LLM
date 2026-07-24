import { useEffect, useRef, useState } from 'react'
import ChatComposer from './ChatComposer'
import './ChatPanel.css'
import HelperPrompts from './HelperPrompts'
import MessageList from './MessageList'
import type { Chat } from './types'

const prompts = [
  'What are the key takeaways from my sources?',
  "Explain this topic like I'm a beginner.",
  'Create a short FAQ from the sources.',
]

function ChatPanel() {
  const [messageInput, setMessageInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [messages, setMessages] = useState<Chat[]>([])

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isSending])

  function handleReferenceClick(referenceId: string) {
    console.log('Citation clicked:', referenceId)
  }

  function handleSendMessage(rawText: string) {
    const content = rawText.trim()
    if (!content || isSending) return

    const userMessage: Chat = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      references: [],
    }

    setMessages((prev) => [...prev, userMessage])
    setMessageInput('')
    setIsSending(true)

    window.setTimeout(() => {
      const assistantMessage: Chat = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content:
          `Here's a grounded-style demo answer to: “${content}”.\n\n` +
          "This is placeholder text. Later we'll replace it with a real model response.",
        references: [
          {
            id: 'src-1',
            label: '1',
            source: 'Sample Source A',
            role: 'assistant',
          },
          {
            id: 'src-2',
            label: '2',
            source: 'Sample Source B',
            role: 'assistant',
          },
        ],
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsSending(false)
    }, 600)
  }

  function handleClearChat() {
    setMessages([])
    setMessageInput('')
    setIsSending(false)
  }

  return (
    <main className="chat-panel" aria-label="Notebook chat">
      <header className="chat-panel__header">
        <div className="chat-panel__header-text">
          <h1 className="chat-panel__title">Chat</h1>
          <p className="chat-panel__subtitle">
            Ask me anything about the documents you've added
          </p>
        </div>
        {messages.length > 0 && (
          <button
            type="button"
            className="chat-panel__clear"
            onClick={handleClearChat}
          >
            Clear chat
          </button>
        )}
      </header>

      <div className="chat-panel__body">
        {messages.length === 0 ? (
          <HelperPrompts prompts={prompts} onPromptClick={handleSendMessage} />
        ) : (
          <>
            <MessageList
              messages={messages}
              onReferenceClick={handleReferenceClick}
            />
            {isSending && (
              <p className="chat-panel__thinking" aria-live="polite">
                Thinking…
              </p>
            )}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      <footer className="chat-panel__footer">
        <ChatComposer
          value={messageInput}
          onChange={setMessageInput}
          onSubmit={() => handleSendMessage(messageInput)}
          disabled={false}
          isSending={isSending}
        />
      </footer>
    </main>
  )
}

export default ChatPanel
