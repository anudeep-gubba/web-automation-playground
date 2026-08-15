import { useRef, useState, type UIEvent } from 'react'
import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function ScrollingPage() {
  const verticalRef = useRef<HTMLDivElement>(null)
  const [infiniteItems, setInfiniteItems] = useState(20)
  const infiniteLoading = useRef(false)

  function scrollToTop() {
    verticalRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }
  function scrollToBottom() {
    const el = verticalRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }

  function handleInfiniteScroll(e: UIEvent<HTMLDivElement>) {
    const el = e.currentTarget
    if (infiniteLoading.current) return
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) {
      infiniteLoading.current = true
      window.setTimeout(() => {
        setInfiniteItems((n) => Math.min(n + 20, 200))
        infiniteLoading.current = false
      }, 300)
    }
  }

  return (
    <div data-testid="scrolling-page">
      <h1 className="page-title">Scrolling</h1>
      <p className="page-description">Vertical, horizontal, nested, infinite and sticky scrolling scenarios.</p>

      <Section title="Scroll Container (Vertical)" testId="section-scroll-container">
        <div className="form-actions mb-0">
          <Button size="sm" variant="secondary" testId="scroll-to-top-button" onClick={scrollToTop}>
            Scroll to Top
          </Button>
          <Button size="sm" variant="secondary" testId="scroll-to-bottom-button" onClick={scrollToBottom}>
            Scroll to Bottom
          </Button>
        </div>
        <div
          id="scroll-container-vertical"
          data-testid="scroll-container-vertical"
          ref={verticalRef}
          className="status-panel mt-1"
          style={{ height: 260, overflowY: 'auto' }}
        >
          <p id="scroll-top-marker" data-testid="scroll-top-marker">
            — Top marker —
          </p>
          {Array.from({ length: 40 }, (_, i) => (
            <p key={i} data-testid={`scroll-line-${i}`}>
              Scrollable line {i + 1}
            </p>
          ))}
          <p id="scroll-bottom-marker" data-testid="scroll-bottom-marker">
            — Bottom marker —
          </p>
        </div>
      </Section>

      <Section title="Horizontal Scrolling" testId="section-horizontal-scroll">
        <div id="scroll-container-horizontal" data-testid="scroll-container-horizontal" style={{ overflowX: 'auto', whiteSpace: 'nowrap', border: '1px solid var(--color-border)', borderRadius: 8, padding: '0.75rem' }}>
          {Array.from({ length: 20 }, (_, i) => (
            <span
              key={i}
              data-testid={`horizontal-block-${i}`}
              className="badge"
              style={{ display: 'inline-block', marginRight: '0.5rem', padding: '1rem 1.5rem' }}
            >
              Block {i + 1}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Nested Scrolling" testId="section-nested-scroll">
        <div id="scroll-outer" data-testid="scroll-outer" style={{ height: 220, overflowY: 'auto', border: '1px solid var(--color-border)', borderRadius: 8, padding: '0.75rem' }}>
          <p>Outer scroll container content above.</p>
          <div id="scroll-inner" data-testid="scroll-inner" style={{ height: 120, overflowY: 'auto', border: '1px dashed var(--color-border)', borderRadius: 6, padding: '0.5rem' }}>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} data-testid={`nested-inner-line-${i}`}>
                Inner line {i + 1}
              </p>
            ))}
          </div>
          {Array.from({ length: 10 }, (_, i) => (
            <p key={i} data-testid={`nested-outer-line-${i}`}>
              Outer line {i + 1}
            </p>
          ))}
        </div>
      </Section>

      <Section title="Infinite Scrolling" testId="section-infinite-scroll">
        <div
          id="scroll-infinite"
          data-testid="scroll-infinite"
          onScroll={handleInfiniteScroll}
          style={{ height: 260, overflowY: 'auto', border: '1px solid var(--color-border)', borderRadius: 8, padding: '0.75rem' }}
        >
          {Array.from({ length: infiniteItems }, (_, i) => (
            <p key={i} data-testid={`infinite-item-${i}`}>
              Infinite item {i + 1}
            </p>
          ))}
          <p className="text-muted" data-testid="infinite-loaded-count">
            Loaded: {infiniteItems} / 200
          </p>
        </div>
      </Section>

      <Section title="Sticky Elements" testId="section-sticky">
        <div style={{ height: 260, overflowY: 'auto', border: '1px solid var(--color-border)', borderRadius: 8 }}>
          <div id="sticky-header" data-testid="sticky-header" className="status-panel" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
            Sticky Header
          </div>
          <div style={{ display: 'flex' }}>
            <div id="sticky-sidebar" data-testid="sticky-sidebar" className="status-panel" style={{ position: 'sticky', top: 40, alignSelf: 'flex-start', width: 120 }}>
              Sticky Sidebar
            </div>
            <div style={{ padding: '0.75rem', flex: 1 }}>
              {Array.from({ length: 20 }, (_, i) => (
                <p key={i}>Content line {i + 1}</p>
              ))}
            </div>
          </div>
          <div id="sticky-footer" data-testid="sticky-footer" className="status-panel" style={{ position: 'sticky', bottom: 0 }}>
            Sticky Footer
          </div>
        </div>
      </Section>
    </div>
  )
}
