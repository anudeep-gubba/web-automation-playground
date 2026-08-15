import { useRef, useState } from 'react'
import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function JavaScriptPage() {
  const [text, setText] = useState('Original Text')
  const [attrValue, setAttrValue] = useState('original-value')
  const [enabled, setEnabled] = useState(true)
  const [visible, setVisible] = useState(true)
  const [createdElements, setCreatedElements] = useState<number[]>([])
  const nextId = useRef(1)
  const scrollTargetRef = useRef<HTMLDivElement>(null)

  return (
    <div data-testid="javascript-page">
      <h1 className="page-title">JavaScript</h1>
      <p className="page-description">Controlled DOM mutations with a visible state panel for every change.</p>

      <Section title="Text & Attribute Mutation" testId="section-js-mutation">
        <p id="js-text-target" data-testid="js-text-target" className="status-panel">
          {text}
        </p>
        <Button size="sm" testId="js-change-text" onClick={() => setText(`Text changed at ${new Date().toLocaleTimeString()}`)}>
          Change Text
        </Button>

        <p id="js-attr-target" data-testid="js-attr-target" data-dynamic-attr={attrValue} className="status-panel mt-1">
          Element with dynamic attribute: {attrValue}
        </p>
        <Button size="sm" testId="js-change-attribute" onClick={() => setAttrValue(`updated-${Date.now()}`)}>
          Change Attribute
        </Button>
      </Section>

      <Section title="Enable / Disable" testId="section-js-enable-disable">
        <button id="js-toggle-target" data-testid="js-toggle-target" className="btn btn-primary" disabled={!enabled}>
          {enabled ? 'Enabled Button' : 'Disabled Button'}
        </button>
        <div className="form-actions">
          <Button size="sm" testId="js-enable-button" onClick={() => setEnabled(true)}>
            Enable Element
          </Button>
          <Button size="sm" variant="secondary" testId="js-disable-button" onClick={() => setEnabled(false)}>
            Disable Element
          </Button>
        </div>
      </Section>

      <Section title="Show / Hide" testId="section-js-show-hide">
        {visible ? (
          <p id="js-visibility-target" data-testid="js-visibility-target" className="status-panel">
            You can see me!
          </p>
        ) : (
          <p id="js-visibility-target" data-testid="js-visibility-target" hidden>
            You can see me!
          </p>
        )}
        <div className="form-actions">
          <Button size="sm" testId="js-show-button" onClick={() => setVisible(true)}>
            Show Element
          </Button>
          <Button size="sm" variant="secondary" testId="js-hide-button" onClick={() => setVisible(false)}>
            Hide Element
          </Button>
        </div>
      </Section>

      <Section title="Scroll Element Into View" testId="section-js-scroll">
        <div style={{ height: 120, overflowY: 'auto', border: '1px solid var(--color-border)', borderRadius: 8 }}>
          <div style={{ height: 300, padding: '0.75rem' }}>Scroll down inside this box, or use the button.</div>
          <div ref={scrollTargetRef} id="js-scroll-target" data-testid="js-scroll-target" className="status-panel" style={{ margin: '0.75rem' }}>
            Scroll Target
          </div>
        </div>
        <Button size="sm" className="mt-1" testId="js-scroll-into-view" onClick={() => scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
          Scroll Into View
        </Button>
      </Section>

      <Section title="Create / Remove Elements" testId="section-js-create-remove">
        <div id="js-created-container" data-testid="js-created-container">
          {createdElements.map((id) => (
            <p key={id} data-testid={`js-created-element-${id}`} className="status-panel mt-1">
              Dynamically created element #{id}
            </p>
          ))}
        </div>
        <div className="form-actions">
          <Button
            size="sm"
            testId="js-create-element"
            onClick={() => {
              setCreatedElements((prev) => [...prev, nextId.current])
              nextId.current += 1
            }}
          >
            Create Element
          </Button>
          <Button size="sm" variant="danger" testId="js-remove-element" onClick={() => setCreatedElements((prev) => prev.slice(0, -1))} disabled={createdElements.length === 0}>
            Remove Element
          </Button>
        </div>
      </Section>
    </div>
  )
}
