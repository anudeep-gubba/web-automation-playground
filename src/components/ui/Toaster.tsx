import { useToast } from '@/hooks/useToast'

export function Toaster() {
  const { toasts, dismissToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="toast-viewport" data-testid="toast-viewport" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.variant}`} data-testid={`toast-${toast.variant}`} role="status">
          <div>
            <p className="toast-title">{toast.title}</p>
            {toast.description ? <p className="toast-description">{toast.description}</p> : null}
          </div>
          <button
            type="button"
            className="toast-close"
            aria-label="Dismiss notification"
            data-testid={`toast-close-${toast.id}`}
            onClick={() => dismissToast(toast.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
