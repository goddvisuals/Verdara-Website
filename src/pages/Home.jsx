import { Link } from 'react-router'
import Arrow from '../components/Arrow.jsx'
import CallToAction from '../components/CallToAction.jsx'
import Commitments from '../components/Commitments.jsx'
import Insurance from '../components/Insurance.jsx'
import ProjectPhoto from '../components/ProjectPhoto.jsx'
import WorkInAction from '../components/WorkInAction.jsx'
import { projectPhotos } from '../data/projectPhotos.js'

export default function Home() {
  return (
    <>
      <section className="home-hero container" aria-labelledby="home-heading">
        <div className="hero-content">
          <p className="eyebrow"><span className="eyebrow-line" /> Edmonton & surrounding areas</p>
          <h1 id="home-heading">
            <span>Professional<br />Property Services.</span>
            <span>Reliable Results.</span>
            <span className="muted-heading">Built for Your Property.</span>
          </h1>
          <p className="hero-description">Year-round exterior property solutions for commercial properties and homeowners across Edmonton and surrounding areas.</p>
          <div className="hero-actions">
            <Link to="/get-a-quote" className="button button-primary">Request a Quote <Arrow /></Link>
            <Link to="/#services" className="text-link">Explore our services <Arrow diagonal /></Link>
          </div>
        </div>
        <figure className="hero-photo">
          <ProjectPhoto photo={projectPhotos.exteriorStructures} priority />
          <figcaption><span>Care from the ground up.</span><span>Verdara Property Solutions</span></figcaption>
        </figure>
      </section>

      <section id="services" tabIndex={-1} className="property-paths" aria-labelledby="solutions-heading">
        <div className="container">
          <div className="property-paths-intro">
            <h2 className="eyebrow" id="solutions-heading">Built around your property</h2>
            <p>Exterior property solutions, throughout the year.</p>
          </div>
          <div className="property-paths-grid">
            <div className="property-path">
              <h3><Link to="/services/commercial">Commercial services <Arrow diagonal /></Link></h3>
              <p>For property managers, commercial owners, businesses and multi-site properties.</p>
            </div>
            <div className="property-path">
              <h3><Link to="/services/residential">Residential services <Arrow diagonal /></Link></h3>
              <p>Exterior property care and project-based services for homeowners.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="property-feature" aria-labelledby="feature-heading">
        <div className="container property-feature-inner">
          <figure><ProjectPhoto photo={projectPhotos.planting} /></figure>
          <div className="property-feature-copy">
            <p className="eyebrow">Your property. Our attention.</p>
            <h2 id="feature-heading">The details matter.<br />So does the partner.</h2>
            <p>We work with the people responsible for keeping properties at their best. That means understanding the property, communicating clearly, and taking ownership of the work.</p>
            <Link className="text-link" to="/about">Get to know Verdara <Arrow /></Link>
          </div>
        </div>
      </section>
      <WorkInAction />
      <Commitments />
      <Insurance />
      <CallToAction description="Tell us about your property and the exterior services you need." />
    </>
  )
}
