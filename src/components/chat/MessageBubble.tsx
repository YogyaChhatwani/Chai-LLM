import type { Chat } from './types'

type MessageBubbleProps = {
  message: Chat
  onReferenceClick?: (referenceId: string) => void
}

function MessageBubble({ message, onReferenceClick }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <article
      className={`message ${isUser ? 'message--user' : 'message--assistant'}`}
      aria-label={isUser ? 'Your message' : 'Assistant message'}
    >
      <p className="message__role">{isUser ? 'You' : 'Chai LLM'}</p>
      <div className="message__content">{message.content}</div>

      {!isUser && message.references.length > 0 && (
        <ul className="message__references" aria-label="Citations">
          {message.references.map((reference) => (
            <li key={reference.id}>
              <button
                type="button"
                className="reference-chip"
                title={reference.source}
                onClick={() => onReferenceClick?.(reference.id)}
              >
                [{reference.label}] {reference.source}
              </button>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default MessageBubble
