import { useRef, useState } from 'react'
import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { DOWNLOAD_FILES } from '@/constants/testData'

const MAX_SIZE_BYTES = 2 * 1024 * 1024 // 2 MB
const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.pdf', '.csv', '.json', '.txt']

function validateFiles(files: FileList): string | null {
  for (const file of Array.from(files)) {
    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
    if (!ALLOWED_EXTENSIONS.includes(ext)) return `Invalid extension for "${file.name}". Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`
    if (file.size > MAX_SIZE_BYTES) return `"${file.name}" exceeds the 2 MB size limit.`
  }
  return null
}

export function UploadDownloadPage() {
  const [singleFile, setSingleFile] = useState<File | null>(null)
  const [multipleFiles, setMultipleFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const [uploaded, setUploaded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSingleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUploaded(false)
    const files = e.target.files
    if (!files || files.length === 0) {
      setSingleFile(null)
      return
    }
    const validationError = validateFiles(files)
    setError(validationError)
    setSingleFile(validationError ? null : files[0])
  }

  function handleMultipleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUploaded(false)
    const files = e.target.files
    if (!files || files.length === 0) {
      setMultipleFiles([])
      return
    }
    const validationError = validateFiles(files)
    setError(validationError)
    setMultipleFiles(validationError ? [] : Array.from(files))
  }

  function handleUpload() {
    if (!singleFile && multipleFiles.length === 0) {
      setError('Please choose at least one file first.')
      return
    }
    setUploaded(true)
  }

  return (
    <div data-testid="upload-download-page">
      <h1 className="page-title">Upload &amp; Download</h1>
      <p className="page-description">Client-side file validation (type, size, count) and deterministic static downloads.</p>

      <Section title="Single File Upload" testId="section-single-upload">
        <input id="upload-input" data-testid="upload-input" ref={inputRef} type="file" onChange={handleSingleChange} />
        {singleFile ? (
          <p className="status-panel mt-1" data-testid="upload-selected-file">
            Selected File: {singleFile.name} ({Math.round(singleFile.size / 1024)} KB)
          </p>
        ) : null}
      </Section>

      <Section title="Multiple File Upload" testId="section-multiple-upload">
        <input id="upload-input-multiple" data-testid="upload-input-multiple" type="file" multiple onChange={handleMultipleChange} />
        {multipleFiles.length > 0 ? (
          <ul className="mt-1" data-testid="upload-multiple-list">
            {multipleFiles.map((f, i) => (
              <li key={i} data-testid={`upload-multiple-item-${i}`}>
                {f.name} ({Math.round(f.size / 1024)} KB)
              </li>
            ))}
          </ul>
        ) : null}
      </Section>

      {error ? (
        <Alert variant="error" testId="upload-error">
          {error}
        </Alert>
      ) : null}
      {uploaded ? (
        <Alert variant="success" testId="upload-success">
          Upload complete.
        </Alert>
      ) : null}

      <div className="form-actions">
        <Button testId="upload-submit" onClick={handleUpload}>
          Upload
        </Button>
      </div>

      <Section title="Downloads" testId="section-downloads">
        <div className="form-actions">
          {DOWNLOAD_FILES.map((f) => (
            <a key={f.testId} id={f.testId} data-testid={f.testId} className="btn btn-secondary" href={f.href} download={f.filename}>
              {f.label}
            </a>
          ))}
        </div>
      </Section>
    </div>
  )
}
