import { useState } from 'react'

export function CopyButton({ text, testId }: { text: string; testId?: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Clipboard API can be unavailable (e.g. insecure context); fail silently.
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button type="button" className="btn btn-secondary btn-sm" data-testid={testId} onClick={handleCopy}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}
