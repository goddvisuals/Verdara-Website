import { Link } from 'react-router'
import Arrow from '../components/Arrow.jsx'
import CallToAction from '../components/CallToAction.jsx'
import ProjectPhoto from '../components/ProjectPhoto.jsx'
import { serviceGroups } from '../data/services.js'

export default function Services() {
  return (
    <>
      <section className="page-intro container commercial-intro">
        <p className="eyebrow">Commercial services</p>
        <div className="page-intro-grid">
          <h1>Every season.<br />Every exterior detail.</h1>
          <div><p className="intro-description">Commercial property services built around the needs of your site, your tenants, and your business.</p><p>From ongoing maintenance to focused exterior projects, Verdara serves commercial properties across Edmonton and surrounding areas.</p></div>
        </div>
      </section>
      <nav className="service-jump-nav commercial-service-nav" aria-label="Service categories">
        <div className="container">
          {serviceGroups.map((group) => <Link to={`#${group.id}`} key={group.id}>{group.title}<span className="service-jump-arrow" aria-hidden="true">↗</span></Link>)}
        </div>
      </nav>
      <div className="container service-details">
        {serviceGroups.map((group) => (
          <section id={group.id} tabIndex={-1} className="service-detail" key={group.id} aria-labelledby={`${group.id}-heading`}>
            <div className="service-detail-copy">
              <p className="eyebrow">Service</p>
              <h2 id={`${group.id}-heading`}>{group.title}</h2>
              <p>{group.description}</p>
              <ul className="service-inclusions">{group.services.map((service) => <li key={service}>{service}</li>)}</ul>
              <Link to="/get-a-quote" className="button commercial-secondary-cta">Discuss your property <Arrow /></Link>
            </div>
            {group.photo ? (
              <figure className={`service-detail-photo${group.note ? ' service-winter-photo' : ''}`}>
                <ProjectPhoto photo={group.photo} />
                {group.note ? (
                  <figcaption className="service-photo-note">
                    <span className="eyebrow">Edmonton. All seasons.</span>
                    <span>{group.note}</span>
                    <span>{group.noteDescription}</span>
                  </figcaption>
                ) : <figcaption>{group.caption}</figcaption>}
              </figure>
            ) : group.image ? (
              <figure className={`service-detail-photo ${group.imageOrientation === 'portrait' ? 'storm-photo' : ''}`}>
                <img src={group.image} alt={group.imageAlt} width={group.imageOrientation === 'portrait' ? 480 : 640} height={group.imageOrientation === 'portrait' ? 640 : 480} loading="lazy" />
                <figcaption>{group.caption}</figcaption>
              </figure>
            ) : (
              <div className="service-note"><span className="eyebrow">Edmonton. All seasons.</span><p>{group.note}</p><div className="service-note-rule" /><span>{group.noteDescription}</span></div>
            )}
          </section>
        ))}
      </div>
      <section className="scope-note">
        <div className="container"><h2>Not sure where your project fits?</h2><p>Tell us what your property needs. We can discuss the scope, priorities, and services that make sense for your site.</p><Link to="/get-a-quote" className="text-link">Start a conversation <Arrow /></Link></div>
      </section>
      <CallToAction />
    </>
  )
}
