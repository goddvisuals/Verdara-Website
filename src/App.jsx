import { useEffect, useRef } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import Residential from './pages/Residential.jsx'
import About from './pages/About.jsx'
import Quote from './pages/Quote.jsx'
import NotFound from './pages/NotFound.jsx'

const pageMetadata = {
  '/': ['Property Services in Edmonton', 'Exterior property solutions for commercial properties and homeowners across Edmonton and surrounding areas.'],
  '/services/commercial': ['Commercial Services', 'Explore commercial grounds maintenance, snow removal, exterior construction, grading, drainage, and responsive property services in Edmonton and surrounding areas.'],
  '/services/residential': ['Residential Services', 'Seasonal yard care, snow removal, grading, drainage, fencing, decks, and responsive exterior property services for homeowners in Edmonton and surrounding areas.'],
  '/about': ['About Verdara', 'A dependable property maintenance partner for property managers, commercial property owners, businesses, and multi-site clients in Edmonton and surrounding areas.'],
  '/get-a-quote': ['Get a Quote', 'Tell Verdara Property Solutions about your commercial property, service requirements, or multi-site maintenance needs.'],
}

function LegacyServicesRedirect() {
  const { search, hash } = useLocation()
  return <Navigate to={{ pathname: '/services/commercial', search, hash }} replace />
}

function RouteEffects() {
  const { pathname, hash } = useLocation()
  const previousPath = useRef(pathname)

  useEffect(() => {
    const path = pathname.replace(/\/$/, '') || '/'
    const [title, description] = pageMetadata[path] || ['Page Not Found', 'Explore commercial property services from Verdara Property Solutions.']
    document.title = `${title} | Verdara Property Solutions`
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    const target = hash ? document.getElementById(hash.slice(1)) : null
    if (target) {
      target.scrollIntoView()
      target.focus({ preventScroll: true })
    } else {
      window.scrollTo(0, 0)
      if (previousPath.current !== pathname) {
        document.getElementById('main-content')?.focus({ preventScroll: true })
      }
    }
    previousPath.current = pathname
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <RouteEffects />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<LegacyServicesRedirect />} />
          <Route path="/services/commercial" element={<Services />} />
          <Route path="/services/residential" element={<Residential />} />
          <Route path="/about" element={<About />} />
          <Route path="/get-a-quote" element={<Quote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  )
}
