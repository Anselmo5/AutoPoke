import React, { useState, useEffect } from 'react'
import '../page/Home/Home.css'
import { Link } from 'react-router-dom'
function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'bg-header' : ''}`} id="header">
      <nav className="nav">
        <a href="#" className="nav-logo">AutoPoke</a>
        <div className={`nav-menu ${menuOpen ? 'show-menu' : ''}`} id="nav-menu">
          <ul className="nav-list">
            <li className="nav-item"><Link to="" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/About" className="nav-link">About</Link></li>
            <li className="nav-item"><Link to="/Ranking" className="nav-link">Ranking</Link></li>
            <li className="nav-item"><Link to="/Conquiste" className="nav-link">Conquistes</Link></li>
            <li className="nav-item"><Link to="/Contact" className="nav-link">Contact</Link></li>
          </ul>
          <div className="nav-close" id="nav-close" onClick={() => setMenuOpen(false)}>
            <i className="ri-close-line"></i>
          </div>
        </div>
        <div className="nav-actions">
          <a href="/Login"><i className="ri-user-line"></i></a>
          <i className="ri-shopping-cart-line"></i>
          <div className="nav-toggle" id="nav-toggle" onClick={() => setMenuOpen(true)}>
            <i className="ri-menu-line"></i>
          </div>
        </div>
      </nav>
    </header> 
  )
}


export default Header
