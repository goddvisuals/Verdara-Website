import { commitments } from '../data/services.js'
import { projectPhotos } from '../data/projectPhotos.js'
import ProjectPhoto from './ProjectPhoto.jsx'

export default function Commitments() {
  return (
    <section className="section commitments-section" aria-labelledby="commitments-heading">
      <div className="container split-section">
        <div className="section-intro">
          <p className="eyebrow">The Verdara approach</p>
          <h2 id="commitments-heading">A Partner You<br />Can Rely On.</h2>
          <p>Good property maintenance is about more than the work itself. It is about knowing who you can count on.</p>
          <figure className="commitment-photo"><ProjectPhoto photo={projectPhotos.maintenance} /></figure>
        </div>
        <ul className="commitment-list">
          {commitments.map((item) => <li key={item.title}><div><h3>{item.title}</h3><p>{item.description}</p></div></li>)}
        </ul>
      </div>
    </section>
  )
}
