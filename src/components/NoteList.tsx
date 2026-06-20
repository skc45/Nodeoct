import type { Note } from '../types/note'
import { getRegionId, type RegionLabels } from '../types/region'

interface NoteListProps {
  notes: Note[]
  selectedId: string | null
  regionLabels: RegionLabels
  onSelect: (id: string) => void
  onAdd: () => void
}

export function NoteList({ notes, selectedId, regionLabels, onSelect, onAdd }: NoteListProps) {
  return (
    <div className="note-list">
      <div className="note-list-header">
        <h2>Notes</h2>
        <button type="button" className="btn-add" onClick={onAdd}>
          + New
        </button>
      </div>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <button
              type="button"
              className={`note-item${note.id === selectedId ? ' selected' : ''}`}
              onClick={() => onSelect(note.id)}
            >
              <span
                className="note-dot"
                style={{ background: note.color }}
              />
              <span className="note-item-text">
                <span className="note-item-title">
                  {note.title || 'Untitled'}
                </span>
                <span className="note-item-coords">
                  {regionLabels[getRegionId(note.x, note.y, note.z)]} · (
                  {note.x.toFixed(1)}, {note.y.toFixed(1)}, {note.z.toFixed(1)})
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {notes.length === 0 && (
        <p className="empty-state">No notes yet. Create one to get started.</p>
      )}
    </div>
  )
}
