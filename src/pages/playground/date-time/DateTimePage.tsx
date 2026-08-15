import { useState } from 'react'
import { Section } from '@/components/ui/Card'
import { Calendar } from '@/components/ui/Calendar'

export function DateTimePage() {
  const [calendarDate, setCalendarDate] = useState<string | null>(null)
  const [futureDate, setFutureDate] = useState<string | null>(null)
  const [rangeStart, setRangeStart] = useState('')
  const [rangeEnd, setRangeEnd] = useState('')

  const rangeError = rangeStart && rangeEnd && rangeStart > rangeEnd ? 'Start date must be before end date.' : null

  return (
    <div data-testid="date-time-page">
      <h1 className="page-title">Date &amp; Time Controls</h1>
      <p className="page-description">Native pickers plus a fully custom calendar widget with month/year navigation and disabled dates.</p>

      <Section title="Native Pickers" testId="section-native-pickers">
        <div className="form-grid">
          <div className="field">
            <label className="field-label" htmlFor="date-time-date">
              Date Picker
            </label>
            <input id="date-time-date" data-testid="date-time-date" type="date" className="field-input" />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="date-time-time">
              Time Picker
            </label>
            <input id="date-time-time" data-testid="date-time-time" type="time" className="field-input" />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="date-time-datetime">
              DateTime Picker
            </label>
            <input id="date-time-datetime" data-testid="date-time-datetime" type="datetime-local" className="field-input" />
          </div>
        </div>
      </Section>

      <Section title="Custom Calendar" testId="section-custom-calendar">
        <Calendar testId="date-time-calendar" selected={calendarDate} onSelect={setCalendarDate} />
        <p className="status-panel mt-1" data-testid="date-time-calendar-selected">
          Selected: {calendarDate ?? 'None'}
        </p>
      </Section>

      <Section title="Calendar with Disabled Past Dates" testId="section-calendar-disabled-past">
        <Calendar testId="date-time-future-calendar" selected={futureDate} onSelect={setFutureDate} disablePast />
        <p className="status-panel mt-1" data-testid="date-time-future-selected">
          Selected: {futureDate ?? 'None'}
        </p>
      </Section>

      <Section title="Date Range Picker" testId="section-date-range">
        <div className="form-grid">
          <div className="field">
            <label className="field-label" htmlFor="date-range-start">
              Start Date
            </label>
            <input id="date-range-start" data-testid="date-range-start" type="date" className="field-input" value={rangeStart} onChange={(e) => setRangeStart(e.target.value)} />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="date-range-end">
              End Date
            </label>
            <input id="date-range-end" data-testid="date-range-end" type="date" className="field-input" value={rangeEnd} onChange={(e) => setRangeEnd(e.target.value)} />
          </div>
        </div>
        {rangeError ? (
          <p className="field-error" data-testid="date-range-error">
            {rangeError}
          </p>
        ) : null}
      </Section>
    </div>
  )
}
