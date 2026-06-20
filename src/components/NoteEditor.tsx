import type { Note } from '../types/note'
import { AXIS_LABELS, AXIS_MAX, AXIS_MIN, clampAxis, NOTE_COLORS } from '../types/note'
import { getRegionId, type RegionLabels } from '../types/region'

interface NoteEditorProps {
  note: Note
  regionLabels: RegionLabels
  onUpdate: (patch: Partial<Note>) => void
  onDelete: () => void
}

function AxisSlider({
  label,
  color,
  value,
  onChange,
}: {
  label: string
  color: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="axis-slider">
      <div className="axis-slider-header">
        <span className="axis-label" style={{ color }}>
          {label}
        </span>
        <span className="axis-value">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={AXIS_MIN}
        max={AXIS_MAX}
        step={0.01}
        value={value}
        onChange={(e) => onChange(clampAxis(parseFloat(e.target.value)))}
        style={{ accentColor: color }}
      />
    </div>
  )
}

export function NoteEditor({ note, regionLabels, onUpdate, onDelete }: NoteEditorProps) {
  const regionId = getRegionId(note.x, note.y, note.z)
  const regionLabel = regionLabels[regionId]

  return (
    <div className="note-editor">
      <input
        className="note-title"
        value={note.title}
        onChange={(e) => onUpdate({ title: e.target.value })}
        placeholder="Note title"
      />

      <textarea
        className="note-body"
        value={note.body}
        onChange={(e) => onUpdate({ body: e.target.value })}
        placeholder="Write your note…"
        rows={6}
      />

      <div className="axis-section">
        <h3>Position in cube</h3>
        <p className="axis-hint">
          Axes run from 0 to 2. The cube splits into 8 sub-cubes at the midpoint (1)
          on each axis.
        </p>
        <div className="region-badge">
          <span className="region-badge-label">Current region</span>
          <span className="region-badge-value">{regionLabel}</span>
        </div>
        <AxisSlider
          label={AXIS_LABELS.x}
          color="#ff6b6b"
          value={note.x}
          onChange={(x) => onUpdate({ x })}
        />
        <AxisSlider
          label={AXIS_LABELS.y}
          color="#69db7c"
          value={note.y}
          onChange={(y) => onUpdate({ y })}
        />
        <AxisSlider
          label={AXIS_LABELS.z}
          color="#74c0fc"
          value={note.z}
          onChange={(z) => onUpdate({ z })}
        />
      </div>

      <div className="color-section">
        <span className="color-label">Color</span>
        <div className="color-swatches">
          {NOTE_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              className={`color-swatch${note.color === color ? ' active' : ''}`}
              style={{ background: color }}
              onClick={() => onUpdate({ color })}
              aria-label={`Set color ${color}`}
            />
          ))}
        </div>
      </div>

      <button type="button" className="btn-delete" onClick={onDelete}>
        Delete note
      </button>
    </div>
  )
}
