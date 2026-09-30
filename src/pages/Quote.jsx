import QuoteForm from '../components/QuoteForm.jsx'

export default function Quote() {
  return (
    <div className="container quote-page">
      <div className="quote-intro">
        <p className="eyebrow">Get a quote</p>
        <h1>Tell us about<br />your property.</h1>
        <p className="intro-description">One project or ongoing maintenance. One property or multiple locations. Let’s start with what you need.</p>
        <div className="quote-aside">
          <div><span className="eyebrow">Commercial property services</span><p>For property managers, commercial owners, businesses, and multi-site clients.</p></div>
          <div><span className="eyebrow">Serving</span><p>Edmonton & surrounding areas.</p></div>
          <div><span className="eyebrow">Ready to work</span><p>Liability insurance & WCB coverage.</p></div>
        </div>
      </div>
      <QuoteForm />
    </div>
  )
}
