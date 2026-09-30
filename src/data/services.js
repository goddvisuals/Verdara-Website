import { projectPhotos } from './projectPhotos.js'

export const serviceGroups = [
  {
    id: 'grounds-seasonal-care',
    title: 'Grounds & seasonal care',
    shortDescription: 'A well-kept property, through every season.',
    description: 'Keep your exterior spaces presentable and prepared for the season ahead. From routine grounds care to seasonal preparation, we help maintain the details that shape a property’s first impression.',
    services: [
      'Commercial landscaping and grounds maintenance',
      'Lawn mowing, trimming, and seasonal cleanup',
      'Seasonal property preparation',
    ],
    photo: projectPhotos.maintenance,
    caption: 'Ground preparation & exterior spaces',
  },
  {
    id: 'snow-surface-maintenance',
    title: 'Snow & surface maintenance',
    shortDescription: 'Care for the spaces that keep your property moving.',
    description: 'Support access to your property through changing Edmonton conditions. We help care for parking areas, sidewalks, and the exterior surfaces your tenants, employees, and visitors use every day.',
    services: [
      'Snow removal',
      'Parking lot and sidewalk maintenance',
      'Sanding',
    ],
    note: 'For the routes people rely on.',
    noteDescription: 'Parking areas. Sidewalks. Property access.',
    photo: projectPhotos.winter,
  },
  {
    id: 'construction-site-work',
    title: 'Exterior construction & site work',
    shortDescription: 'Practical improvements. Careful execution.',
    description: 'Address the function and condition of your property with focused exterior work. We help with site improvements, repairs, and construction needs that keep your outdoor spaces working as they should.',
    services: [
      'Grading and drainage solutions',
      'Fence installation, repairs, and removal',
      'Decks and exterior construction',
    ],
    photo: projectPhotos.grading,
    caption: 'Site preparation & exterior improvements',
  },
  {
    id: 'responsive-property-support',
    title: 'Responsive property support',
    shortDescription: 'For planned upkeep and the unexpected.',
    description: 'Property needs do not always follow a schedule. From overdue cleanups to unexpected maintenance issues, we help address exterior concerns and plan the work your property needs next.',
    services: [
      'Yard and property cleanups',
      'General exterior property maintenance',
      'Emergency and responsive maintenance services',
    ],
    image: '/assets/images/v12.jpeg',
    imageOrientation: 'portrait',
    imageAlt: 'Storm damage with a fallen tree across an exterior walkway, showing a property in need of cleanup.',
    caption: 'Unexpected conditions. Practical property support.',
  },
]

export const commitments = [
  { title: 'Reliable Service', description: 'A consistent approach to the work your property depends on.' },
  { title: 'Clear Communication', description: 'Straightforward conversations about scope, scheduling, and progress.' },
  { title: 'Quality Workmanship', description: 'Careful work and attention to the details that make a difference.' },
  { title: 'Professional Accountability', description: 'Ownership of the work, with respect for your property and expectations.' },
  { title: 'Year-Round Support', description: 'A property maintenance partner through every change of season.' },
]
