import type { Chat } from './types'
import MessageBubble from './MessageBubble'

type MessageListProps = {
  messages: Chat[]
  onReferenceClick?: (referenceId: string) => void
}

function MessageList({ messages, onReferenceClick }: MessageListProps) {
  return (
    <div className="message-list" role="log" aria-live="polite">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          onReferenceClick={onReferenceClick}
        />
      ))}
    </div>
  )
}

export default MessageList
