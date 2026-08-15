import { useState } from 'react'
import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

function DeeplyNested({ depth }: { depth: number }) {
  if (depth === 0) {
    return (
      <span id="deep-nested-target" data-testid="deep-nested-target">
        Deepest element
      </span>
    )
  }
  return (
    <div data-testid={`deep-nested-level-${depth}`} style={{ paddingLeft: 4, borderLeft: '1px dotted var(--color-border)' }}>
      <DeeplyNested depth={depth - 1} />
    </div>
  )
}

export function AdvancedDomPage() {
  const [detached, setDetached] = useState(true)

  return (
    <div data-testid="advanced-dom-page">
      <h1 className="page-title">Advanced DOM</h1>
      <p className="page-description">
        Every scenario on this page is an <strong>intentional automation challenge</strong>: duplicate identifiers, hidden
        content, overlapping elements and more, clearly labeled for negative-path locator testing.
      </p>

      <Section title="Deeply Nested DOM (20 levels)" testId="section-deep-nesting">
        <DeeplyNested depth={20} />
      </Section>

      <Section title="Duplicate IDs (intentional, invalid HTML)" testId="section-duplicate-ids">
        <p className="text-muted">Both elements below intentionally share the id "duplicate-id-target".</p>
        <div id="duplicate-id-target" data-testid="duplicate-id-first">
          First element with duplicate id
        </div>
        <div id="duplicate-id-target" data-testid="duplicate-id-second">
          Second element with duplicate id
        </div>
      </Section>

      <Section title="Duplicate Text" testId="section-duplicate-text">
        <p data-testid="duplicate-text-1">Submit</p>
        <p data-testid="duplicate-text-2">Submit</p>
        <p data-testid="duplicate-text-3">Submit</p>
      </Section>

      <Section title="Hidden / Visually Hidden Elements" testId="section-hidden-elements">
        <p data-testid="hidden-element-css" style={{ display: 'none' }}>
          Hidden via display:none
        </p>
        <p data-testid="hidden-element-visibility" style={{ visibility: 'hidden' }}>
          Hidden via visibility:hidden
        </p>
        <p data-testid="hidden-element-attribute" hidden>
          Hidden via the hidden attribute
        </p>
        <p data-testid="visually-hidden-element" className="visually-hidden-demo">
          Visually hidden but present for screen readers
        </p>
      </Section>

      <Section title="Disabled & Read-only Fields" testId="section-disabled-readonly">
        <input data-testid="disabled-field" className="field-input" disabled defaultValue="Disabled field" />
        <input data-testid="readonly-field" className="field-input mt-1" readOnly defaultValue="Read-only field" />
      </Section>

      <Section title="Off-screen Elements" testId="section-off-screen">
        <div style={{ position: 'relative', height: 40, overflow: 'hidden' }}>
          <p data-testid="off-screen-element" className="off-screen-demo">
            Positioned off-screen at x: -9999px
          </p>
          <p>Container clipping the off-screen sibling above.</p>
        </div>
      </Section>

      <Section title="Overlapping, Covered & Transparent Elements" testId="section-overlap">
        <div className="overlap-demo">
          <span data-testid="overlap-bottom" style={{ background: 'var(--color-danger)', color: '#fff' }}>
            Bottom (covered) element
          </span>
          <span data-testid="overlap-top" style={{ background: 'var(--color-accent)', color: '#fff', left: 40, top: 20 }}>
            Top (covering) element
          </span>
        </div>
        <p data-testid="transparent-element" style={{ opacity: 0 }} className="mt-1">
          Fully transparent but present in the DOM
        </p>
      </Section>

      <Section title="Detached / Re-attached Elements" testId="section-detached">
        {detached ? (
          <p id="detachable-element" data-testid="detachable-element" className="status-panel">
            I am currently attached to the DOM.
          </p>
        ) : (
          <p className="text-muted" data-testid="detached-notice">
            Element detached.
          </p>
        )}
        <Button size="sm" className="mt-1" testId="detach-toggle-button" onClick={() => setDetached((v) => !v)}>
          {detached ? 'Detach Element' : 'Re-attach Element'}
        </Button>
      </Section>
    </div>
  )
}
