import { useEffect, useId, useRef, useState } from 'react'
import './Navbar.css'
import type { Source } from '../types/source'

type NavbarProps = {
  onAddSource: () => void
  sources: Source[]
}

function Navbar({ onAddSource, sources }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuId = useId()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    function handlePointerDown(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handlePointerDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [isOpen])

  function closeMenu() {
    setIsOpen(false)
  }

  function handleAddSourceClick() {
    closeMenu()
    onAddSource()
  }

  return (
    <nav ref={navRef} aria-label="Main navigation" className="navbar">
      <div className="navbar__bar">
        <div className="navbar__start">
          <button
            type="button"
            className={`navbar__toggle${isOpen ? ' is-open' : ''}`}
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="navbar__burger" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>

          <a href="/" className="navbar__logo" onClick={closeMenu}>
            CHAI LLM
          </a>
        </div>

        <div className="navbar__actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddSourceClick}
          >
            Add a source
          </button>
        </div>
      </div>

      <div
        id={menuId}
        className={`navbar__drawer${isOpen ? ' is-open' : ''}`}
        aria-hidden={!isOpen}
      >
        <div className="navbar__drawer-inner">
          <section className="navbar__section" aria-label="Navigation links">
            <ul className="navbar__menu">
              <li>
                <a href="#home" onClick={closeMenu}>
                  Home
                </a>
              </li>
              <li>
                <a href="#features" onClick={closeMenu}>
                  Features
                </a>
              </li>
            </ul>
          </section>

          <section className="navbar__section" aria-label="Sources">
            <div className="navbar__section-header">
              <h2 className="navbar__section-title">
                Sources ({sources.length})
              </h2>
              <button
                type="button"
                className="navbar__link-btn"
                onClick={handleAddSourceClick}
              >
                + Add
              </button>
            </div>

            {sources.length === 0 ? (
              <p className="navbar__empty">
                No sources yet. Add a PDF, text file, or YouTube link to get
                started.
              </p>
            ) : (
              <ul className="navbar__sources">
                {sources.map((source) => (
                  <li key={source.id} className="navbar__source">
                    <span className="navbar__source-type">{source.type}</span>
                    <span className="navbar__source-title" title={source.title}>
                      {source.title}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>

      {isOpen && (
        <button
          type="button"
          className="navbar__backdrop"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}
    </nav>
  )
}

export default Navbar
