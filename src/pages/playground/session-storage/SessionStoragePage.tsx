import { StoragePanel } from '@/components/storage/StoragePanel'
import { sessionStore } from '@/services/storageService'

export function SessionStoragePage() {
  return (
    <div data-testid="session-storage-page">
      <h1 className="page-title">Session Storage</h1>
      <p className="page-description">Scoped to this tab only. Cleared when the tab closes; a new tab starts empty.</p>
      <StoragePanel backend={sessionStore} prefix="session-storage" />
    </div>
  )
}
