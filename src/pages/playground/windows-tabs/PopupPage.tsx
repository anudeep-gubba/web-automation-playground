import { useEffect } from 'react'

export function PopupPage() {
  useEffect(() => {
    document.title = 'WAP Popup Window'
  }, [])

  function notifyOpener() {
    if (window.opener) {
      window.opener.postMessage({ source: 'wap-popup', message: 'Hello from popup' }, window.location.origin)
    }
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', textAlign: 'center' }} data-testid="popup-page-root">
      <h1 data-testid="popup-title">Popup Window</h1>
      <p data-testid="popup-url">{window.location.href}</p>
      <button id="popup-notify-opener" data-testid="popup-notify-opener" onClick={notifyOpener} type="button">
        Notify Opener
      </button>
      <button id="popup-close-button" data-testid="popup-close-button" onClick={() => window.close()} type="button" style={{ marginLeft: '0.75rem' }}>
        Close Window
      </button>
    </div>
  )
}
