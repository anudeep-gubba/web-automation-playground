import { useEffect, useRef, useState } from 'react'
import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/constants/routes'

export function WindowsTabsPage() {
  const [popupMessage, setPopupMessage] = useState('NONE')
  const popupRef = useRef<Window | null>(null)

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.source === 'wap-popup') setPopupMessage(e.data.message)
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  function openPopup() {
    popupRef.current = window.open(`${ROUTES.windowsTabs}/popup`, 'wap-popup', 'width=420,height=280')
  }

  return (
    <div data-testid="windows-tabs-page">
      <h1 className="page-title">Windows &amp; Tabs</h1>
      <p className="page-description">Open new tabs, windows and popups, then switch back and verify title/URL.</p>

      <Section title="Open Targets" testId="section-windows-tabs">
        <div className="form-actions">
          <a
            id="open-new-tab-link"
            data-testid="open-new-tab-link"
            className="btn btn-primary"
            href={ROUTES.home}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open New Tab
          </a>
          <Button
            testId="open-new-window-button"
            onClick={() => window.open(ROUTES.home, 'wap-window', 'width=600,height=500')}
          >
            Open New Window
          </Button>
          <a id="open-same-tab-link" data-testid="open-same-tab-link" className="btn btn-secondary" href={ROUTES.dashboard}>
            Open Same Tab
          </a>
          <Button testId="open-popup-button" onClick={openPopup}>
            Open Popup
          </Button>
          <Button
            testId="close-popup-button"
            variant="danger"
            onClick={() => {
              popupRef.current?.close()
              popupRef.current = null
            }}
          >
            Close Popup
          </Button>
        </div>
        <p className="status-panel mt-1" data-testid="popup-message-received">
          Message from popup: {popupMessage}
        </p>
      </Section>
    </div>
  )
}
