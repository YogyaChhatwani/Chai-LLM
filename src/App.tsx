import { useState } from 'react'
import AddSourceModal from './components/AddSourceModal'
import ChatPanel from './components/chat/ChatPanel'
import Navbar from './components/Navbar'
import type { Source } from './types/source'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sources, setSources] = useState<Source[]>([])

  function openAddSource() {
    setIsModalOpen(true)
  }

  function handleAddSource(source: Source) {
    setSources((prev) => [...prev, source])
    setIsModalOpen(false)
  }

  return (
    <>
      {isModalOpen && (
        <AddSourceModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddSource}
        />
      )}
      <Navbar onAddSource={openAddSource} sources={sources} />

      <ChatPanel/>
    </>
  )
}

export default App
