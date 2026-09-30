import { Link } from 'react-router'
import Arrow from '../components/Arrow.jsx'
import CallToAction from '../components/CallToAction.jsx'
import Insurance from '../components/Insurance.jsx'
import ProjectPhoto from '../components/ProjectPhoto.jsx'
import { projectPhotos } from '../data/projectPhotos.js'

export default function About() {
  return (
    <>
      <section className="page-intro container">
        <p className="eyebrow">About Verdara</p>
        <div className="page-intro-grid"><h1>More than maintenance.<br />A property partner.</h1><p className="about-intro-statement">Verdara Property Solutions is a professional property maintenance and exterior services company serving Edmonton and surrounding areas.</p></div>
      </section>
      <section className="about-story container" aria-labelledby="story-heading">
        <figure className="about-photo"><ProjectPhoto photo={projectPhotos.excavation} priority /><figcaption>A practical approach to exterior property care.</figcaption></figure>
        <div className="about-story-copy">
          <p className="eyebrow">Built around your responsibilities</p>
          <h2 id="story-heading">An extension of<br />your property team.</h2>
          <p>We partner with property managers, commercial property owners, businesses, and multi-site clients to keep properties safe, presentable, functional, and properly maintained throughout the year.</p>
          <p>Commercial property maintenance requires more than simply completing a task. Verdara focuses on reliability, communication, attention to detail, accountability, and becoming an extension of the client’s property management team.</p>
          <Link className="text-link" to="/services/commercial">See how we can help <Arrow /></Link>
        </div>
      </section>
      <section className="clients-section" aria-labelledby="clients-heading">
        <div className="container split-section">
          <div><p className="eyebrow">Who we work with</p><h2 id="clients-heading">Commercial focus.<br />Practical understanding.</h2></div>
          <div className="client-list">
            <div><h3>Property managers</h3><p>Exterior support that fits into the bigger picture of managing a property.</p></div>
            <div><h3>Commercial property owners</h3><p>Maintenance and improvements that support the condition of your property.</p></div>
            <div><h3>Businesses</h3><p>Presentable, functional surroundings for the people who use your space.</p></div>
            <div><h3>Multi-site clients</h3><p>A consistent approach to maintenance across multiple locations.</p></div>
          </div>
        </div>
      </section>
      <Insurance />
      <CallToAction />
    </>
  )
}
