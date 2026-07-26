import { useEffect, useState } from 'react'
import './AddSourceModal.css'
import type { Source, SourceType } from '../types/source'

type AddSourceModalProps = {
  onClose: () => void
  onAdd: (source: Source) => void
}

const TABS: { id: SourceType; label: string }[] = [
  { id: 'pdf', label: 'PDF' },
  { id: 'text', label: 'Text file' },
  { id: 'youtube', label: 'YouTube' },
]

function isValidYoutubeUrl(value: string) {
  try {
    const url = new URL(value.trim())
    const host = url.hostname.replace(/^www\./, '')
    return (
      host === 'youtube.com' ||
      host === 'youtu.be' ||
      host === 'm.youtube.com'
    )
  } catch {
    return false
  }
}

function isAllowedFile(file: File, type: SourceType) {
  // This is UX filtering only; a future upload API must validate size, MIME,
  // extension, and file signatures again on the server.
  if (type === 'pdf') {
    return (
      file.type === 'application/pdf' ||
      file.name.toLowerCase().endsWith('.pdf')
    )
  }

  return (
    file.type.startsWith('text/') ||
    /\.(txt|md)$/i.test(file.name)
  )
}

function AddSourceModal({ onClose, onAdd }: AddSourceModalProps) {
  const [activeTab, setActiveTab] = useState<SourceType>('pdf')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [error, setError] = useState<string | null>(null)

  const canSubmit =
    activeTab === 'youtube'
      ? isValidYoutubeUrl(youtubeUrl)
      : selectedFile !== null

  const accept =
    activeTab === 'pdf' ? 'application/pdf,.pdf' : '.txt,.md,text/plain'

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  function handleTabChange(tab: SourceType) {
    setActiveTab(tab)
    setSelectedFile(null)
    setYoutubeUrl('')
    setError(null)
  }

  function handleFileChange(file: File | null) {
    if (!file) {
      setSelectedFile(null)
      return
    }

    if (!isAllowedFile(file, activeTab)) {
      setSelectedFile(null)
      setError(
        activeTab === 'pdf'
          ? 'Please choose a PDF file.'
          : 'Please choose a .txt or .md file.',
      )
      return
    }

    setError(null)
    setSelectedFile(file)
  }

  function handleSubmit() {
    if (!canSubmit) return

    if (activeTab === 'youtube') {
      const url = youtubeUrl.trim()
      onAdd({
        id: crypto.randomUUID(),
        type: 'youtube',
        title: url,
        url,
        createdAt: Date.now(),
      })
      return
    }

    if (!selectedFile) return

    onAdd({
      id: crypto.randomUUID(),
      type: activeTab,
      title: selectedFile.name,
      fileName: selectedFile.name,
      createdAt: Date.now(),
    })
  }

  return (
    <div
      className="add-source-modal"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="add-source-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-source-title"
      >
        <header className="add-source-modal__header">
          <h2 id="add-source-title">Add a source</h2>
          <button
            type="button"
            className="add-source-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </header>

        <div className="add-source-modal__body">
          <div
            className="add-source-modal__tabs"
            role="tablist"
            aria-label="Source type"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`add-source-modal__tab${activeTab === tab.id ? ' is-active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="add-source-modal__panel">
            {activeTab === 'youtube' ? (
              <>
                <label className="add-source-modal__field" htmlFor="youtube-url">
                  <span>YouTube URL</span>
                  <input
                    id="youtube-url"
                    type="url"
                    value={youtubeUrl}
                    onChange={(event) => {
                      setYoutubeUrl(event.target.value)
                      setError(null)
                    }}
                    placeholder="https://www.youtube.com/watch?v=..."
                    inputMode="url"
                    autoComplete="off"
                  />
                </label>
                <p className="add-source-modal__hint">
                  Paste a public YouTube video link
                </p>
              </>
            ) : (
              <>
                <input
                  id="source-file"
                  type="file"
                  accept={accept}
                  hidden
                  onChange={(event) => {
                    handleFileChange(event.target.files?.[0] ?? null)
                    event.target.value = ''
                  }}
                />
                <label htmlFor="source-file" className="add-source-modal__dropzone">
                  <span className="add-source-modal__dropzone-title">
                    {activeTab === 'pdf' ? 'Upload a PDF' : 'Upload a text file'}
                  </span>
                  <span className="add-source-modal__dropzone-hint">
                    Click to browse and pick a file
                  </span>
                  {selectedFile && (
                    <span className="add-source-modal__file-name">
                      Selected: {selectedFile.name}
                    </span>
                  )}
                </label>
              </>
            )}

            {error && (
              <p className="add-source-modal__error" role="alert">
                {error}
              </p>
            )}
          </div>
        </div>

        <footer className="add-source-modal__footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            Add source
          </button>
        </footer>
      </div>
    </div>
  )
}

export default AddSourceModal
