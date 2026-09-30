import { Link } from 'react-router'
import Brand from './Brand.jsx'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div><Brand compact /><p>Professional property services.<br />Built for your property.</p></div>
          <div className="footer-area"><span className="eyebrow">Our service area</span><p>Edmonton &<br />surrounding areas.</p></div>
          <nav className="footer-navigation" aria-label="Footer navigation">
            <Link to="/">Home</Link>
            <Link to="/#services">Services</Link>
            <div className="footer-service-links"><Link to="/services/commercial">Commercial</Link><Link to="/services/residential">Residential</Link></div>
            <Link to="/about">About</Link><Link to="/get-a-quote">Get a Quote</Link>
          </nav>
        </div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} Verdara Property Solutions</p><p>Year-round property care.</p></div>
      </div>
    </footer>
  )
}
