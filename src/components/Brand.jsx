import { Link } from 'react-router'

export default function Brand({ compact = false }) {
  return (
    <Link className="brand" to="/" aria-label="Verdara Property Solutions — Home">
      {compact ? (
        <span className="brand-art brand-art-compact">
          <img src="/assets/logos/mini-logo.png" alt="Verdara Property Solutions" width="1024" height="1024" loading="lazy" />
        </span>
      ) : (
        <picture className="brand-art brand-art-header">
          <source media="(max-width: 640px)" srcSet="/assets/logos/mini-logo.png" width="1024" height="1024" />
          <img src="/assets/logos/fulllogo.png" alt="Verdara Property Solutions" width="100" height="100" />
        </picture>
      )}
    </Link>
  )
}
