import { useState, type DragEvent } from 'react'
import { Section } from '@/components/ui/Card'

const ITEMS = ['item-a', 'item-b', 'item-c']
const ITEM_LABELS: Record<string, string> = { 'item-a': 'Item A', 'item-b': 'Item B', 'item-c': 'Item C' }

export function DragDropPage() {
  const [locations, setLocations] = useState<Record<string, string | null>>({
    'item-a': null,
    'item-b': null,
    'item-c': null,
  })
  const [lastEvent, setLastEvent] = useState('NONE')
  const [order, setOrder] = useState(['Alpha', 'Bravo', 'Charlie', 'Delta'])
  const [dragOverZone, setDragOverZone] = useState<string | null>(null)

  function handleDragStart(e: DragEvent, itemId: string) {
    e.dataTransfer.setData('text/plain', itemId)
    e.dataTransfer.effectAllowed = 'move'
  }

  function handleDropZone(e: DragEvent, zoneId: string) {
    e.preventDefault()
    const itemId = e.dataTransfer.getData('text/plain')
    if (!ITEMS.includes(itemId)) return
    setLocations((prev) => ({ ...prev, [itemId]: zoneId }))
    setLastEvent(`DROPPED ${ITEM_LABELS[itemId]} INTO ${zoneId.toUpperCase()}`)
    setDragOverZone(null)
  }

  function handleInvalidDrop(e: DragEvent) {
    e.preventDefault()
    setLastEvent('INVALID DROP REJECTED')
    setDragOverZone(null)
  }

  function itemsIn(zoneId: string) {
    return ITEMS.filter((i) => locations[i] === zoneId)
  }

  function handleReorderDragStart(e: DragEvent, index: number) {
    e.dataTransfer.setData('text/plain', String(index))
  }
  function handleReorderDrop(e: DragEvent, targetIndex: number) {
    e.preventDefault()
    const sourceIndex = Number(e.dataTransfer.getData('text/plain'))
    if (Number.isNaN(sourceIndex) || sourceIndex === targetIndex) return
    setOrder((prev) => {
      const next = [...prev]
      const [moved] = next.splice(sourceIndex, 1)
      next.splice(targetIndex, 0, moved)
      return next
    })
  }

  return (
    <div data-testid="drag-drop-page">
      <h1 className="page-title">Drag &amp; Drop</h1>
      <p className="page-description">HTML5 native drag-and-drop scenarios: single/multiple items, invalid drops, and reordering.</p>

      <Section title="Drag Sources & Drop Zones" testId="section-drag-drop-zones">
        <div className="grid-2">
          <div>
            <h3 className="card-title">Drag Sources</h3>
            <div id="drag-sources" data-testid="drag-sources" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {ITEMS.filter((i) => !locations[i]).map((itemId) => (
                <div
                  key={itemId}
                  id={itemId}
                  data-testid={`drag-source-${itemId}`}
                  className="drag-source"
                  draggable
                  onDragStart={(e) => handleDragStart(e, itemId)}
                >
                  {ITEM_LABELS[itemId]}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="card-title">Drop Zones</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div
                id="drop-zone-a"
                data-testid="drop-zone-a"
                className={`drop-zone ${dragOverZone === 'drop-zone-a' ? 'drop-zone-active' : ''}`}
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragOverZone('drop-zone-a')
                }}
                onDragLeave={() => setDragOverZone(null)}
                onDrop={(e) => handleDropZone(e, 'drop-zone-a')}
              >
                Drop Zone A
                <ul>
                  {itemsIn('drop-zone-a').map((i) => (
                    <li key={i} data-testid={`drop-zone-a-item-${i}`}>
                      {ITEM_LABELS[i]}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                id="drop-zone-b"
                data-testid="drop-zone-b"
                className={`drop-zone ${dragOverZone === 'drop-zone-b' ? 'drop-zone-active' : ''}`}
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragOverZone('drop-zone-b')
                }}
                onDragLeave={() => setDragOverZone(null)}
                onDrop={(e) => handleDropZone(e, 'drop-zone-b')}
              >
                Drop Zone B
                <ul>
                  {itemsIn('drop-zone-b').map((i) => (
                    <li key={i} data-testid={`drop-zone-b-item-${i}`}>
                      {ITEM_LABELS[i]}
                    </li>
                  ))}
                </ul>
              </div>
              <div id="drop-zone-invalid" data-testid="drop-zone-invalid" className="drop-zone drop-zone-invalid" onDragOver={(e) => e.preventDefault()} onDrop={handleInvalidDrop}>
                Invalid Drop Zone (always rejects)
              </div>
            </div>
          </div>
        </div>
        <p className="status-panel mt-2" data-testid="drag-drop-last-event">
          Last Event: {lastEvent}
        </p>
      </Section>

      <Section title="Reordering" testId="section-reordering">
        <ul id="drag-reorder-list" data-testid="drag-reorder-list" style={{ listStyle: 'none', padding: 0 }}>
          {order.map((label, index) => (
            <li
              key={label}
              data-testid={`drag-reorder-item-${label.toLowerCase()}`}
              draggable
              className="drag-source mt-1"
              onDragStart={(e) => handleReorderDragStart(e, index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleReorderDrop(e, index)}
            >
              {index + 1}. {label}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}
