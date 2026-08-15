// "Iframe A" content: rendered bare, and itself embeds "Iframe B" (the basic
// child page) to create a Main Page -> Iframe A -> Iframe B chain.
export function IframeNestedChildPage() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '1rem' }} data-testid="iframe-nested-root">
      <h2 data-testid="iframe-nested-heading">Iframe A</h2>
      <p>This frame contains a nested Iframe B.</p>
      <iframe id="iframe-b" data-testid="iframe-b" title="Iframe B" src="/iframe-content/basic" style={{ width: '100%', height: 260, border: '1px solid #ccc' }} />
    </div>
  )
}
