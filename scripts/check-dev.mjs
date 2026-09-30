import assert from 'node:assert/strict'
import { SourceTextModule } from 'node:vm'

// Verify the actual browser module graph, including Vite's optimized React
// dependencies. A successful HTML response or production build cannot catch
// stale dependency requests that prevent the development page from mounting.
const origin = new URL(process.argv[2] || 'http://127.0.0.1:5174/').origin
const modules = new Map()

function loadModule(url) {
  assert.equal(new URL(url).origin, origin, 'Only inspect the local development server')
  if (!modules.has(url)) {
    modules.set(url, (async () => {
      const response = await fetch(url, {
        headers: { Accept: 'application/javascript', 'Cache-Control': 'no-cache' },
        signal: AbortSignal.timeout(10000),
      })
      assert.ok(response.ok, `${url}: ${response.status} ${response.statusText}`)
      assert.match(response.headers.get('content-type') || '', /javascript/, `${url}: expected a JavaScript module`)
      return new SourceTextModule(await response.text(), { identifier: url })
    })())
  }
  return modules.get(url)
}

const response = await fetch(origin, { signal: AbortSignal.timeout(10000) })
assert.ok(response.ok, 'Development HTML loads')
const html = await response.text()
assert.ok(html.includes('id="root"'), 'React mount target exists')
const scripts = [...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map((match) => match[1])
assert.ok(scripts.some((src) => new URL(src, origin).pathname === '/src/main.jsx'), 'React entry script is present')

for (const src of scripts) {
  const entry = await loadModule(new URL(src, origin).href)
  if (entry.status === 'unlinked') {
    await entry.link((specifier, parent) => loadModule(new URL(specifier, parent.identifier).href))
  }
}

for (const dependency of ['react.js', 'react-dom_client.js', 'react-router.js', 'react_jsx-dev-runtime.js']) {
  assert.ok([...modules.keys()].some((url) => new URL(url).pathname.endsWith(`/${dependency}`)), `${dependency}: optimized browser dependency loaded`)
}

console.log(`PASS ${modules.size} browser JavaScript modules returned successfully and linked without missing exports.`)
console.log('PASS React, React DOM, React Router, and the JSX runtime are served by the live development server.')
console.log('This checks loading and linking; it does not execute browser DOM interactions.')
