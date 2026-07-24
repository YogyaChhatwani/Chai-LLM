import { useState,useEffect } from 'react'
import './Navbar.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
 useEffect(()=>{
    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
          setIsOpen(false)
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    
 },[isOpen])
  return (
    <nav aria-label="Main navigation" className="navbar">
      <div className="navbar__start">
        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Menu'}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="navbar__burger" aria-hidden="true" />
        </button>

        <a href="/" className="logo">
          CHAI LLM
        </a>
      </div>

      <ul className="nav-links">
        <li>
          <a href="#home" onClick={() => setIsOpen(false)}>
            Home
          </a>
        </li>
        <li>
          <a href="#features" onClick={() => setIsOpen(false)}>
            Features
          </a>
        </li>
      </ul>

      <button type="button" className="btn btn-primary">
        Add a source
      </button>

      <div
        id="mobile-menu"
        className={`navbar__panel${isOpen ? ' is-open' : ''}`}
        aria-hidden={!isOpen}
      >
        <ul>
          <li>
            <a href="#home" onClick={() => setIsOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#features" onClick={() => setIsOpen(false)}>
              Features
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="btn btn-primary navbar__panel-btn"
          onClick={() => setIsOpen(false)}
        >
          Add a source
        </button>
      </div>
    </nav>
  )
}

export default Navbar
