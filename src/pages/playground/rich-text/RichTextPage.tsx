import { useRef, useState } from 'react'
import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function RichTextPage() {
  const editorRef = useRef<HTMLDivElement>(null)
  const [linkUrl, setLinkUrl] = useState('')
  const [html, setHtml] = useState('')

  function exec(command: string, value?: string) {
    editorRef.current?.focus()
    document.execCommand(command, false, value)
    setHtml(editorRef.current?.innerHTML ?? '')
  }

  return (
    <div data-testid="rich-text-page">
      <h1 className="page-title">Rich Text Editor</h1>
      <p className="page-description">A minimal WYSIWYG editor for exercising toolbar-driven and keyboard-driven text formatting.</p>

      <Section title="Editor" testId="section-rich-text">
        <div id="rich-text-toolbar" data-testid="rich-text-toolbar" className="form-actions mb-0" role="toolbar" aria-label="Formatting">
          <Button size="sm" variant="secondary" testId="rich-text-bold" onClick={() => exec('bold')}>
            <strong>B</strong>
          </Button>
          <Button size="sm" variant="secondary" testId="rich-text-italic" onClick={() => exec('italic')}>
            <em>I</em>
          </Button>
          <Button size="sm" variant="secondary" testId="rich-text-underline" onClick={() => exec('underline')}>
            <u>U</u>
          </Button>
          <Button size="sm" variant="secondary" testId="rich-text-heading" onClick={() => exec('formatBlock', 'H2')}>
            H2
          </Button>
          <Button size="sm" variant="secondary" testId="rich-text-ordered-list" onClick={() => exec('insertOrderedList')}>
            1. List
          </Button>
          <Button size="sm" variant="secondary" testId="rich-text-unordered-list" onClick={() => exec('insertUnorderedList')}>
            • List
          </Button>
          <Button size="sm" variant="secondary" testId="rich-text-align-left" onClick={() => exec('justifyLeft')}>
            ⟸
          </Button>
          <Button size="sm" variant="secondary" testId="rich-text-align-center" onClick={() => exec('justifyCenter')}>
            ⟺
          </Button>
          <Button size="sm" variant="secondary" testId="rich-text-align-right" onClick={() => exec('justifyRight')}>
            ⟹
          </Button>
          <Button size="sm" variant="secondary" testId="rich-text-undo" onClick={() => exec('undo')}>
            Undo
          </Button>
          <Button size="sm" variant="secondary" testId="rich-text-redo" onClick={() => exec('redo')}>
            Redo
          </Button>
          <Button size="sm" variant="secondary" testId="rich-text-clear-formatting" onClick={() => exec('removeFormat')}>
            Clear Formatting
          </Button>
        </div>

        <div className="form-actions mt-1">
          <input
            className="field-input"
            placeholder="https://example.com"
            data-testid="rich-text-link-input"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            style={{ maxWidth: 240 }}
          />
          <Button size="sm" testId="rich-text-insert-link" onClick={() => linkUrl && exec('createLink', linkUrl)}>
            Insert Link
          </Button>
        </div>

        <div
          id="rich-text-editor"
          data-testid="rich-text-editor"
          ref={editorRef}
          className="field-input mt-2"
          contentEditable
          suppressContentEditableWarning
          style={{ minHeight: 180 }}
          onInput={(e) => setHtml(e.currentTarget.innerHTML)}
        >
          <p>Start typing here…</p>
        </div>

        <h3 className="card-title mt-2">HTML Output</h3>
        <pre className="code-block" data-testid="rich-text-html-output">
          {html || '<p>Start typing here…</p>'}
        </pre>
      </Section>
    </div>
  )
}
