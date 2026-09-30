import { Link } from 'react-router'
import Arrow from '../components/Arrow.jsx'

export default function NotFound() {
  return <section className="container not-found"><p className="eyebrow">404 — Page not found</p><h1>Let’s get you<br />back on site.</h1><p>The page you’re looking for could not be found.</p><Link to="/" className="button button-dark">Return to Home <Arrow /></Link></section>
}
