import { useRef, useState } from 'react'
import Arrow from './Arrow.jsx'
import { serviceGroups } from '../data/services.js'

function Field({ id, label, ...props }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}<span aria-hidden="true"> *</span></label>
      <input id={id} name={id} required {...props} />
    </div>
  )
}

export default function QuoteForm() {
  const [serviceError, setServiceError] = useState(false)
  const [previewComplete, setPreviewComplete] = useState(false)
  const firstServiceRef = useRef(null)
  const statusRef = useRef(null)

  function handleSubmit(event) {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    if (values.getAll('services').length === 0) {
      setServiceError(true)
      firstServiceRef.current?.focus()
      return
    }
    setServiceError(false)
    setPreviewComplete(true)
    // Preview only: do not send, log, or persist personal information.
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  function handleChange(event) {
    setPreviewComplete(false)
    if (event.target.name === 'services') setServiceError(false)
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit} onChange={handleChange} aria-label="Commercial property inquiry" aria-describedby="form-preview-note">
      <div className="form-preview-note" id="form-preview-note"><strong>Quote form preview</strong><p>This form is not connected yet. You can complete the fields, but no request will be sent.</p></div>
      <p className="form-required-note">Fields marked <span aria-hidden="true">*</span><span className="sr-only">with an asterisk</span> are required.</p>

      <fieldset className="form-section">
        <legend>Your contact details</legend>
        <div className="form-grid">
          <Field id="name" label="Name" autoComplete="name" maxLength={120} />
          <Field id="company" label="Company" autoComplete="organization" maxLength={160} />
          <Field id="email" label="Email" type="email" autoComplete="email" maxLength={254} />
          <Field id="phone" label="Phone" type="tel" autoComplete="tel" maxLength={40} />
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>Your property</legend>
        <div className="form-stack">
          <Field id="property-address" label="Property address or service area" placeholder="Street address, neighbourhood, or service area" maxLength={300} />
          <div className="form-field">
            <label htmlFor="property-type">Property type <span aria-hidden="true">*</span></label>
            <select id="property-type" name="property-type" defaultValue="" required>
              <option value="" disabled>Select a property type</option>
              <option>Office / commercial building</option>
              <option>Retail / shopping centre</option>
              <option>Industrial / warehouse</option>
              <option>Mixed-use property</option>
              <option>Managed multi-residential property</option>
              <option>Other commercial property</option>
            </select>
          </div>
          <fieldset className="locations-fieldset">
            <legend>Single property or multiple locations <span aria-hidden="true">*</span></legend>
            <div className="radio-options">
              <label><input type="radio" name="locations" value="single" required defaultChecked /> Single property</label>
              <label><input type="radio" name="locations" value="multiple" required /> Multiple locations</label>
            </div>
            <p className="field-hint">For multiple locations, include the addresses or service areas in your details below.</p>
          </fieldset>
        </div>
      </fieldset>

      <fieldset className="form-section services-fieldset" aria-describedby={`services-hint${serviceError ? ' services-error' : ''}`}>
        <legend>Services required <span aria-hidden="true">*</span></legend>
        <p className="field-hint" id="services-hint">Select all that apply, or choose help with defining your scope.</p>
        <div className="service-checkbox-groups">
          {serviceGroups.map((group, groupIndex) => (
            <fieldset key={group.id} className="service-checkbox-group">
              <legend>{group.title}</legend>
              {group.services.map((service, index) => (
                <label className="checkbox-label" key={service}>
                  <input ref={groupIndex === 0 && index === 0 ? firstServiceRef : undefined} type="checkbox" name="services" value={service} aria-invalid={serviceError || undefined} aria-describedby={serviceError ? 'services-error' : undefined} />
                  {service}
                </label>
              ))}
            </fieldset>
          ))}
        </div>
        <label className="checkbox-label scope-checkbox"><input type="checkbox" name="services" value="Help me define the scope" aria-invalid={serviceError || undefined} aria-describedby={serviceError ? 'services-error' : undefined} />Help me define the scope</label>
        {serviceError && <p id="services-error" className="form-error" role="alert">Please select at least one service or choose help with defining your scope.</p>}
      </fieldset>

      <fieldset className="form-section">
        <legend>The details</legend>
        <div className="form-field">
          <label htmlFor="details">Project / maintenance details <span aria-hidden="true">*</span></label>
          <textarea id="details" name="details" rows={6} required maxLength={6000} aria-describedby="details-hint" placeholder="Tell us about your property, the work required, and your preferred timing." />
          <p className="field-hint" id="details-hint">Include any access considerations, recurring maintenance needs, or priorities.</p>
        </div>
      </fieldset>
      <div className="form-submit"><button type="submit" className="button button-primary">Submit Request <Arrow /></button><p>Preview only. Your details will not be sent or saved.</p></div>
      <div ref={statusRef} className={`form-status ${previewComplete ? 'is-visible' : ''}`} tabIndex={-1} role="status" aria-live="polite">
        {previewComplete && <><strong>Preview complete — no request was sent.</strong><p>The required fields are complete. Online quote requests will be available once this form is connected.</p></>}
      </div>
    </form>
  )
}
