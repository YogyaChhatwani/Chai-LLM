import './ChatComposer.css'

type ChatComposerProps = {
  onChange: (value: string) => void
  disabled?: boolean
  isSending?: boolean
  value: string
  onSubmit: () => void
}

function ChatComposer({
  onChange,
  disabled = false,
  isSending = false,
  value,
  onSubmit,
}: ChatComposerProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (disabled || isSending || !value.trim()) return
    onSubmit()
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (disabled || isSending || !value.trim()) return
      onSubmit()
    }
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="chat-input">
        Ask a question about your sources
      </label>
      <textarea
        id="chat-input"
        className="composer__input"
        placeholder="Ask a question about your sources…"
        onChange={(event) => onChange(event.target.value)}
        value={value}
        disabled={disabled || isSending}
        rows={2}
        onKeyDown={handleKeyDown}
      />
      <button
        type="submit"
        className="composer__send"
        disabled={disabled || isSending || !value.trim()}
      >
        {isSending ? 'Thinking…' : 'Send'}
      </button>
    </form>
  )
}

export default ChatComposer
