import { Section } from '@/components/ui/Card'

const CROSS_ORIGIN_SRC_DOC = `<!doctype html>
<html><body style="font-family: system-ui, sans-serif; padding: 1rem;">
<h3 data-testid="iframe-cross-origin-heading">Simulated Cross-Origin Frame</h3>
<p>Rendered via a sandboxed srcdoc document to keep the app fully offline.</p>
<button id="cross-origin-button" data-testid="cross-origin-button" onclick="document.getElementById('cross-origin-status').textContent='Clicked'">Click me</button>
<p id="cross-origin-status" data-testid="cross-origin-status">Not clicked</p>
</body></html>`

export function IframesPage() {
  return (
    <div data-testid="iframes-page">
      <h1 className="page-title">Iframes</h1>
      <p className="page-description">Same-origin, nested and simulated cross-origin iframe scenarios with stable identifiers inside each frame.</p>

      <Section title="Same-Origin Iframe" testId="section-same-origin-iframe">
        <iframe
          id="iframe-container"
          data-testid="iframe-container"
          title="Same-origin iframe"
          src="/iframe-content/basic"
          style={{ width: '100%', height: 260, border: '1px solid var(--color-border)', borderRadius: 8 }}
        />
      </Section>

      <Section title="Nested Iframe" testId="section-nested-iframe">
        <iframe
          id="iframe-nested-container"
          data-testid="iframe-nested-container"
          title="Nested iframe A"
          src="/iframe-content/nested"
          style={{ width: '100%', height: 340, border: '1px solid var(--color-border)', borderRadius: 8 }}
        />
      </Section>

      <Section title="Cross-Origin Iframe (Simulated)" testId="section-cross-origin-iframe">
        <p className="text-muted">
          True cross-origin framing requires a second origin, which would break offline/local execution. This sandboxed
          <code>srcdoc</code> document approximates an isolated frame while remaining fully local.
        </p>
        <iframe
          id="iframe-cross-origin"
          data-testid="iframe-cross-origin"
          title="Simulated cross-origin iframe"
          srcDoc={CROSS_ORIGIN_SRC_DOC}
          sandbox="allow-scripts"
          style={{ width: '100%', height: 180, border: '1px solid var(--color-border)', borderRadius: 8 }}
        />
      </Section>
    </div>
  )
}
