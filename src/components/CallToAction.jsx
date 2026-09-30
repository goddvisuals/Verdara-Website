import { Link } from 'react-router'
import Arrow from './Arrow.jsx'

export default function CallToAction({ description = 'From a single commercial property to a portfolio of locations, Verdara can support your exterior maintenance needs.' }) {
  return (
    <section className="cta-section" aria-labelledby="cta-heading">
      <div className="container cta-inner">
        <div><p className="eyebrow">Let’s take care of your property</p><h2 id="cta-heading">One property.<br />Multiple locations.<br /><span>One dependable partner.</span></h2></div>
        <div className="cta-copy"><p>{description}</p><Link to="/get-a-quote" className="button button-light">Request a Quote <Arrow /></Link></div>
      </div>
    </section>
  )
}
