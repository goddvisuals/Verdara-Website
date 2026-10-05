import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router'
import { createServer } from 'vite'

// Render the actual route components without a browser or extra test packages.
const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false, watch: null },
  // Never let this second Vite instance invalidate the live browser modules.
  cacheDir: '.npm-cache/site-check-vite',
  appType: 'custom',
})

const expectedImages = {
  'v14.jpeg': 'e5c1e7d367187a6f4e5e32db0af9c31e3cb4f1489a2e176fc57e7c66b17fca8b',
  'v13.jpeg': '7c749a0dba88ee9ca71752131c1ca3e28cbdc0ac9fae68c910405a3f6b8a2d01',
  'v12.jpeg': '278c8a74e819ba735d5b43473363d04dd62ee3e0023319e786bf153dfbdd2394',
}

try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const { serviceGroups, commitments } = await server.ssrLoadModule('/src/data/services.js')
  const { residentialServiceGroups } = await server.ssrLoadModule('/src/data/residentialServices.js')
  const routes = {
    '/': 'Professional',
    '/services/commercial': 'Every season.',
    '/services/residential': 'Property Care',
    '/about': 'More than maintenance.',
    '/get-a-quote': 'Tell us about',
    '/unknown-page': 'Let’s get you',
  }
  const rendered = new Map()

  for (const [path, heading] of Object.entries(routes)) {
    const html = renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [path] }, createElement(App)))
    rendered.set(path, html)
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${path}: exactly one main heading`)
    assert.ok(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1].includes(heading), `${path}: correct page`)
    assert.ok(html.includes('id="main-content" tabindex="-1"'), `${path}: accessible route focus target`)
    assert.ok(html.includes('href="#main-content"'), `${path}: skip link`)
    if (path !== '/unknown-page') {
      assert.match(html, /aria-current="page"/, `${path}: active navigation`)
    }
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1])
    assert.equal(new Set(ids).size, ids.length, `${path}: no duplicate element IDs`)
    for (const match of html.matchAll(/<img\b[^>]*>/g)) {
      const src = match[0].match(/\bsrc="([^"]+)"/)?.[1]
      assert.ok(src?.startsWith('/assets/images/') || ['/assets/logos/fulllogo.png', '/assets/logos/mini-logo.png'].includes(src), `${path}: supplied photography and logos only`)
      assert.ok(existsSync(`public${src}`), `${path}: image exists`)
      assert.match(match[0], /\balt="[^"]+"/, `${path}: descriptive image alternative`)
    }
    for (const match of html.matchAll(/<source\b[^>]*\bsrcSet="([^"]+)"/gi)) {
      assert.ok(existsSync(`public${match[1]}`), `${path}: responsive logo source exists`)
    }
    console.log(`PASS ${path}: route, heading, navigation, accessibility structure, images`)
  }

  for (const [path, html] of rendered) {
    for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"?#]+)?(?:\?[^"#]*)?(?:#([^"]*))?"/g)) {
      const destination = match[1] || path
      const hash = match[2]
      assert.ok(rendered.has(destination), `${path}: valid internal link ${destination}`)
      if (hash) assert.ok(rendered.get(destination).includes(`id="${hash}"`), `${path}: valid section link #${hash}`)
    }
  }

  for (const group of serviceGroups) {
    for (const service of group.services) {
      assert.ok(!rendered.get('/').includes(service), `Home: detailed service removed: ${service}`)
      for (const path of ['/services/commercial', '/get-a-quote']) {
        assert.ok(rendered.get(path).includes(service), `${path}: service included: ${service}`)
      }
    }
    assert.ok(rendered.get('/services/commercial').includes(`id="${group.id}"`), `Commercial: ${group.id} section preserved`)
  }
  const homeMain = rendered.get('/').match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1]
  for (const audience of ['commercial', 'residential']) {
    assert.ok(homeMain.includes(`href="/services/${audience}"`), `Home: clear ${audience} path`)
  }
  const residentialMain = rendered.get('/services/residential').match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1]
  assert.equal(residentialServiceGroups.length, 5, 'Residential: all five service categories')
  for (const group of residentialServiceGroups) {
    assert.ok(residentialMain.includes(`id="${group.id}"`), `Residential: ${group.id} section exists`)
    assert.ok(residentialMain.includes(group.description), `Residential: ${group.id} description exists`)
    assert.ok(residentialMain.includes(`src="${group.photo.src}"`), `Residential: ${group.id} project photo exists`)
    for (const service of group.services) {
      assert.ok(residentialMain.includes(`<li>${service}</li>`), `Residential: ${service} included`)
    }
  }
  assert.ok(residentialMain.includes('From seasonal maintenance and yard care to grading, fencing, exterior projects, and responsive property work, Verdara helps homeowners keep their properties functional, cared for, and ready for every season.'), 'Residential: supplied homeowner introduction')
  assert.doesNotMatch(residentialMain, /property managers|tenants|multi-site|business operations|commercial landscaping/i, 'Residential: no commercial-only language')
  const commercialMain = rendered.get('/services/commercial').match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1]
  const commercialParagraphs = [...commercialMain.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map((match) => match[1]).filter((text) => text.length > 80)
  for (const paragraph of commercialParagraphs) {
    assert.ok(!residentialMain.includes(paragraph), 'Residential: audience-specific paragraphs')
  }
  assert.match(residentialMain, /href="\/get-a-quote"[^>]*>Request a Quote/, 'Residential: quote CTA')
  for (const item of commitments) {
    assert.ok(rendered.get('/').includes(item.title), `Home: ${item.title}`)
  }

  const form = rendered.get('/get-a-quote')
  for (const name of ['name', 'company', 'email', 'phone', 'property-address', 'property-type', 'details']) {
    assert.ok(form.includes(`for="${name}"`), `Form: ${name} has a label`)
    assert.match(form, new RegExp(`<(?:input|select|textarea)\\b[^>]*id="${name}"[^>]*required=""`), `Form: ${name} is required`)
  }
  assert.match(form, /type="email"/, 'Email uses native validation')
  assert.match(form, /type="tel"/, 'Phone uses the appropriate mobile keyboard')
  assert.equal([...form.matchAll(/type="checkbox"/g)].length, 13, 'All 12 services plus scope assistance')
  assert.equal([...form.matchAll(/type="radio"/g)].length, 2, 'Single and multiple location choices')
  assert.doesNotMatch(form, /Quote form preview|This form is not connected yet|Preview only|Preview complete|no request will be sent/i, 'Form contains no preview-only wording')
  assert.match(form, /aria-describedby="form-note"/, 'Form references its live request instructions')
  assert.match(form, /id="form-note"[^>]*><strong>Request a quote<\/strong>/, 'Form introduces live quote requests')
  assert.match(form, /<button\b[^>]*type="submit"[^>]*aria-busy="false"/, 'Form starts ready to submit')

  for (const [file, hash] of Object.entries(expectedImages)) {
    const actual = createHash('sha256').update(readFileSync(`public/assets/images/${file}`)).digest('hex')
    assert.equal(actual, hash, `${file}: original image unchanged`)
  }
  console.log('PASS internal links, service coverage, form semantics, and original image integrity')
  console.log('These checks render HTML; they do not replace visual browser or interactive form testing.')
} finally {
  await server.close()
}
