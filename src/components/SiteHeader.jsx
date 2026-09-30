import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import Brand from './Brand.jsx'
import Arrow from './Arrow.jsx'

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const toggleRef = useRef(null)
  const servicesRef = useRef(null)
  const servicesToggleRef = useRef(null)
  const firstServiceRef = useRef(null)
  const focusFirstServiceRef = useRef(false)
  const { pathname } = useLocation()

  function closeNavigation() {
    setMenuOpen(false)
    setServicesOpen(false)
  }

  useEffect(() => { closeNavigation() }, [pathname])

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 640px)')
    mobile.addEventListener('change', closeNavigation)
    return () => mobile.removeEventListener('change', closeNavigation)
  }, [])

  useEffect(() => {
    if (!menuOpen && !servicesOpen) return
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        if (servicesOpen) {
          setServicesOpen(false)
          servicesToggleRef.current?.focus()
        } else {
          setMenuOpen(false)
          toggleRef.current?.focus()
        }
      }
    }
    function onPointerDown(event) {
      if (!servicesRef.current?.contains(event.target)) setServicesOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen, servicesOpen])

  useEffect(() => {
    if (servicesOpen && focusFirstServiceRef.current) {
      firstServiceRef.current?.focus()
      focusFirstServiceRef.current = false
    }
  }, [servicesOpen])

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? 'Close' : 'Menu'}
          <span className={`menu-lines ${menuOpen ? 'is-open' : ''}`} aria-hidden="true"><span /><span /></span>
        </button>
        <nav id="primary-navigation" aria-label="Main navigation" className={`primary-navigation ${menuOpen ? 'is-open' : ''}`}>
          <NavLink to="/" end onClick={closeNavigation}>Home</NavLink>
          <div
            ref={servicesRef}
            className={`services-navigation${servicesOpen ? ' is-open' : ''}`}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 641px)').matches) setServicesOpen(true)
            }}
            onPointerLeave={() => {
              if (!servicesRef.current?.contains(document.activeElement)) setServicesOpen(false)
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false)
            }}
          >
            <button
              ref={servicesToggleRef}
              type="button"
              className={`services-toggle${pathname.startsWith('/services/') ? ' active' : ''}`}
              aria-expanded={servicesOpen}
              aria-controls="services-navigation"
              onClick={() => setServicesOpen(!servicesOpen)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault()
                  if (servicesOpen) firstServiceRef.current?.focus()
                  else {
                    focusFirstServiceRef.current = true
                    setServicesOpen(true)
                  }
                }
              }}
            >Services</button>
            <span className="services-mobile-label">Services</span>
            <ul id="services-navigation" className="services-submenu">
              <li><NavLink ref={firstServiceRef} to="/services/commercial" onClick={closeNavigation}>Commercial</NavLink></li>
              <li><NavLink to="/services/residential" onClick={closeNavigation}>Residential</NavLink></li>
            </ul>
          </div>
          <NavLink to="/about" onClick={closeNavigation}>About</NavLink>
          <NavLink className="button button-primary nav-quote" to="/get-a-quote" onClick={closeNavigation}>Get a Quote <Arrow /></NavLink>
        </nav>
      </div>
    </header>
  )
}
