export default function ProjectPhoto({ photo, priority = false }) {
  return (
    <img
      className="project-photo"
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      style={{
        '--photo-position': photo.position || 'center',
        '--photo-position-mobile': photo.mobilePosition || photo.position || 'center',
      }}
    />
  )
}
