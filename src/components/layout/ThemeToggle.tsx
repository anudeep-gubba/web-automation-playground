import { useTheme } from '@/hooks/useTheme'
import type { ThemeMode } from '@/types'

const OPTIONS: { mode: ThemeMode; label: string }[] = [
  { mode: 'light', label: 'Light' },
  { mode: 'dark', label: 'Dark' },
  { mode: 'system', label: 'System' },
]

export function ThemeToggle() {
  const { mode, setMode } = useTheme()
  return (
    <div className="theme-toggle" role="group" aria-label="Theme" data-testid="theme-toggle">
      {OPTIONS.map((opt) => (
        <button
          key={opt.mode}
          type="button"
          className={`theme-toggle-btn ${mode === opt.mode ? 'theme-toggle-btn-active' : ''}`}
          onClick={() => setMode(opt.mode)}
          aria-pressed={mode === opt.mode}
          data-testid={`theme-toggle-${opt.mode}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
