# Verdara Property Solutions

A property services website built with React, Vite, JavaScript, and npm. React Router handles local page navigation.

## Development

```sh
npm install
npm run dev
```

The development URL is `http://127.0.0.1:5174/`. Vite uses a strict port so a conflict is reported instead of silently changing the URL.

## Build

```sh
npm run build
npm run preview
```

The production build is generated in `dist/`. Building does not deploy the site.

## Project files

- `src/App.jsx` — page routes, metadata, and navigation focus handling
- `src/pages/` — Home, Commercial Services, Residential Services, About, Get a Quote, and a not-found page
- `src/data/services.js` — shared service categories and company commitments
- `src/data/residentialServices.js` — homeowner service categories, copy, and photo placement
- `src/index.css` — responsive styles and neutral colour tokens
- `src/components/` — reusable React components
- `public/assets/logos/` — logos
- `public/assets/images/` — images
- `public/assets/clips/` — video clips

Files inside `public/` are served directly, such as `/assets/images/example.jpg`.
The npm cache stays in this project at `.npm-cache/`.

## Pages

- `/` — Home
- `/services/commercial` — preserved commercial service details with section links
- `/services/residential` — homeowner introduction, five service categories, real project photography, and quote CTAs
- `/services` — redirects to Commercial Services, preserving section links and query parameters
- `/about` — commercial positioning, client types, and commitments
- `/get-a-quote` — commercial inquiry form preview

The quote form validates required fields, email format, and selection of at least one service. Submitting displays a preview message. It does not send, log, or store the inquiry. A backend is required before accepting real requests.

The Home page directs visitors to Commercial or Residential Services from a concise two-column section. Desktop Services navigation opens on hover or button activation; Enter/Space, Tab, Arrow Down, and Escape support keyboard use. Mobile navigation shows both service links beneath Services without a second toggle.

## Updating the design

The supplied logos are used by `src/components/Brand.jsx`: `fulllogo.png` in the desktop/tablet header and `mini-logo.png` in the mobile header and footer. The full logo is displayed uncropped with its original aspect ratio, preserving the existing header height. The compact logo retains its existing framing. The supplied `fulllogo.png` is a 100×100 RGB image with an embedded white background; no background styling is added. Warm neutrals and the forest-green accent (`#234536`) are defined as CSS custom properties at the top of `src/index.css`.

Photography uses only the original supplied files; CSS controls cropping without changing the images. Shared image metadata and crop positions live in `src/data/projectPhotos.js`.

## Project photography

- `v1.jpeg` — Home, Work in Action feature image (equipment/surface maintenance).
- `v10.jpeg` — Home, Work in Action; Services, Snow & surface maintenance.
- `v3.jpeg` — Home, Work in Action (exterior construction).
- `v6.jpeg` — Home, Work in Action; Services, Grounds & seasonal care.
- `v2.jpeg` — Home hero, greenhouse and small exterior structures.
- `v9.jpeg` — Commercial Services, Exterior construction & site work.
- `v11.jpeg` — Home, existing “Your property. Our attention.” feature.
- `v8.jpeg` — About, existing property story photograph.
- `v12.jpeg` — Commercial Services, Responsive property support.

Some supplied filenames differ from the brief's descriptions: `v10` shows snow removal, `v11` shows planting, `v8` shows excavation, and `v6` shows finished landscaping. Placement follows the visible subjects. All original assets are preserved.

Residential photography:

- `v5.jpeg` — hero: completed home exterior and front lawn.
- `v6.jpeg` — Ground & seasonal care: finished lawn and planting beds.
- `v10.jpeg` — Snow & winter property care: snow removal equipment in use.
- `v9.jpeg` — Grading & drainage: ground work and a graded residential approach.
- `v3.jpeg` — Fences, decks & exterior projects: timber gazebo and paved patio.
- `v12.jpeg` — Property cleanups & responsive maintenance: storm damage beside a home walkway.

Residential uses a photo-led hero, consistent photo/copy sections, and a homeowner-specific closing CTA. Commercial retains its original copy, categories, photography, and alternating section layout. Shared service names are intentional; descriptive paragraphs are tailored to each audience.

## Checks

```sh
npm run check
npm run build
npm run check:dev
```

The check script renders each route and checks internal links, service coverage, form labels and requirements, image alternatives, and original image checksums. It uses the existing dependencies. Browser interaction and responsive visual checks should also be performed before launch.

Run `check:dev` while the development server is running. It fetches and links the actual browser JavaScript modules, catching missing exports and failed optimized dependency requests. The development server and server-rendered checks use separate caches under `.npm-cache/` so running checks cannot invalidate the browser's React dependencies. To rebuild development dependencies if necessary, restart with `npm run dev -- --force`.

No deployment is configured. A future host must serve `index.html` for page routes such as `/services` so direct visits and refreshes work with client-side routing.
