import { useState } from 'react'

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}
function startWeekday(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}
function toIsoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function Calendar({
  testId,
  selected,
  onSelect,
  disablePast = false,
}: {
  testId: string
  selected: string | null
  onSelect: (iso: string) => void
  disablePast?: boolean
}) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const totalDays = daysInMonth(viewYear, viewMonth)
  const offset = startWeekday(viewYear, viewMonth)
  const todayIso = toIsoDate(today.getFullYear(), today.getMonth(), today.getDate())

  const years = Array.from({ length: 21 }, (_, i) => today.getFullYear() - 10 + i)

  function goToPrevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }
  function goToNextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  return (
    <div className="calendar" data-testid={testId}>
      <div className="calendar-header">
        <button type="button" className="btn btn-ghost btn-sm" data-testid={`${testId}-prev-month`} onClick={goToPrevMonth}>
          ‹
        </button>
        <select data-testid={`${testId}-month-select`} value={viewMonth} onChange={(e) => setViewMonth(Number(e.target.value))} className="field-input">
          {MONTH_NAMES.map((name, i) => (
            <option key={name} value={i}>
              {name}
            </option>
          ))}
        </select>
        <select data-testid={`${testId}-year-select`} value={viewYear} onChange={(e) => setViewYear(Number(e.target.value))} className="field-input">
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <button type="button" className="btn btn-ghost btn-sm" data-testid={`${testId}-next-month`} onClick={goToNextMonth}>
          ›
        </button>
      </div>
      <div className="calendar-grid" data-testid={`${testId}-grid`}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <span key={d} className="calendar-weekday">
            {d}
          </span>
        ))}
        {Array.from({ length: offset }, (_, i) => (
          <span key={`empty-${i}`} />
        ))}
        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1
          const iso = toIsoDate(viewYear, viewMonth, day)
          const isPast = disablePast && iso < todayIso
          const isToday = iso === todayIso
          const isSelected = iso === selected
          return (
            <button
              key={iso}
              type="button"
              data-testid={`${testId}-day-${iso}`}
              className={`calendar-day ${isToday ? 'calendar-day-today' : ''} ${isSelected ? 'calendar-day-selected' : ''}`}
              disabled={isPast}
              onClick={() => onSelect(iso)}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
