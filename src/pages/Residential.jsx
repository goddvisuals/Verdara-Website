import { Link } from 'react-router'
import Arrow from '../components/Arrow.jsx'
import ProjectPhoto from '../components/ProjectPhoto.jsx'
import { projectPhotos } from '../data/projectPhotos.js'
import { residentialServiceGroups } from '../data/residentialServices.js'

export default function Residential() {
  return (
    <>
      <section className="container residential-hero" aria-labelledby="residential-heading">
        <div className="residential-hero-copy">
          <p className="eyebrow">Residential services</p>
          <h1 id="residential-heading">Property Care<br />Built Around Home.</h1>
          <p className="intro-description">From seasonal maintenance and yard care to grading, fencing, exterior projects, and responsive property work, Verdara helps homeowners keep their properties functional, cared for, and ready for every season.</p>
          <div className="hero-actions"><Link to="/get-a-quote" className="button button-primary">Request a Quote <Arrow /></Link></div>
        </div>
        <figure className="residential-hero-photo">
          <ProjectPhoto photo={projectPhotos.residentialHome} priority />
          <figcaption>Exterior care, close to home.</figcaption>
        </figure>
      </section>

      <nav className="container residential-jump-nav" aria-label="Residential service categories">
        {residentialServiceGroups.map((group) => (
          <Link to={`#${group.id}`} key={group.id}>{group.navigationLabel}<span className="service-jump-arrow" aria-hidden="true">↗</span></Link>
        ))}
      </nav>

      <div className="container residential-services">
        {residentialServiceGroups.map((group) => (
          <section id={group.id} tabIndex={-1} className="residential-service" key={group.id} aria-labelledby={`${group.id}-heading`}>
            <div className="residential-service-copy">
              <h2 id={`${group.id}-heading`}>{group.title}</h2>
              <p>{group.description}</p>
              <ul className="service-inclusions">{group.services.map((service) => <li key={service}>{service}</li>)}</ul>
              <Link to="/get-a-quote" className="text-link">{group.cta} <Arrow /></Link>
            </div>
            <figure className={`residential-service-photo${group.portrait ? ' residential-service-photo-portrait' : ''}`}>
              <ProjectPhoto photo={group.photo} />
              <figcaption>{group.caption}</figcaption>
            </figure>
          </section>
        ))}
      </div>

      <section className="cta-section residential-cta" aria-labelledby="residential-cta-heading">
        <div className="container cta-inner">
          <div><p className="eyebrow">Your home. Your next project.</p><h2 id="residential-cta-heading">Let’s take care<br />of your outdoor spaces.</h2></div>
          <div className="cta-copy"><p>Tell us what needs attention, whether it’s seasonal upkeep or an exterior project at home.</p><Link to="/get-a-quote" className="button button-light">Request a Quote <Arrow /></Link></div>
        </div>
      </section>
    </>
  )
}
