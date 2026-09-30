import ProjectPhoto from './ProjectPhoto.jsx'
import { projectPhotos } from '../data/projectPhotos.js'

export default function WorkInAction() {
  return (
    <section className="section work-section" aria-labelledby="work-heading">
      <div className="container">
        <div className="work-heading">
          <p className="eyebrow">Work in Action</p>
          <h2 id="work-heading">Property care through every season.</h2>
        </div>
        <div className="work-grid">
          <figure className="work-photo work-photo-feature"><ProjectPhoto photo={projectPhotos.responsiveCare} /></figure>
          <figure className="work-photo work-photo-winter"><ProjectPhoto photo={projectPhotos.winter} /></figure>
          <figure className="work-photo work-photo-construction"><ProjectPhoto photo={projectPhotos.construction} /></figure>
          <figure className="work-photo work-photo-grounds"><ProjectPhoto photo={projectPhotos.grounds} /></figure>
        </div>
      </div>
    </section>
  )
}
