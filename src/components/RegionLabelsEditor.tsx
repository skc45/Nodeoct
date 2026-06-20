import {
  getRegionRangeLabel,
  REGION_COLORS,
  REGION_IDS,
  type RegionId,
  type RegionLabels,
} from '../types/region'

interface RegionLabelsEditorProps {
  labels: RegionLabels
  onUpdate: (id: RegionId, value: string) => void
  onReset: () => void
}

export function RegionLabelsEditor({
  labels,
  onUpdate,
  onReset,
}: RegionLabelsEditorProps) {
  return (
    <div className="region-labels">
      <div className="region-labels-header">
        <h2>Sub-cube labels</h2>
        <button type="button" className="btn-reset" onClick={onReset}>
          Reset
        </button>
      </div>
      <p className="region-labels-hint">
        The cube is split into 8 regions (0–1 and 1–2 on each axis). Name each
        cell below — labels appear inside the 3D view.
      </p>
      <ul className="region-label-list">
        {REGION_IDS.map((id) => (
          <li key={id}>
            <span
              className="region-swatch"
              style={{ background: REGION_COLORS[id] }}
            />
            <div className="region-label-fields">
              <input
                className="region-label-input"
                value={labels[id]}
                onChange={(e) => onUpdate(id, e.target.value)}
                placeholder={`Region ${id}`}
              />
              <span className="region-range">{getRegionRangeLabel(id)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
