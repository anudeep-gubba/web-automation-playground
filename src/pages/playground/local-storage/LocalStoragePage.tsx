import { StoragePanel } from '@/components/storage/StoragePanel'
import { localStore } from '@/services/storageService'

export function LocalStoragePage() {
  return (
    <div data-testid="local-storage-page">
      <h1 className="page-title">Local Storage</h1>
      <p className="page-description">Persists across reloads and browser restarts until explicitly cleared.</p>
      <StoragePanel backend={localStore} prefix="local-storage" />
    </div>
  )
}
