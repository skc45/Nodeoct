import {
  getRegionRangeLabel,
  REGION_COLORS,
  REGION_IDS,
  type RegionId,
  type RegionLabels,
} from '../types/region'
import { CollapsiblePanel } from './CollapsiblePanel'

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
    <CollapsiblePanel
      title="Sub-cube labels"
      hint="The cube is split into 8 regions (0–1 and 1–2 on each axis). Name each cell below — labels appear inside the 3D view."
      headerActions={
        <button
          type="button"
          className="btn-reset"
          onClick={(e) => {
            e.stopPropagation()
            onReset()
          }}
        >
          Reset
        </button>
      }
    >
      <ul className="label-input-list">
        {REGION_IDS.map((id) => (
          <li key={id}>
            <span
              className="region-swatch"
              style={{ background: REGION_COLORS[id] }}
            />
            <div className="label-input-fields">
              <input
                className="label-input"
                value={labels[id]}
                onChange={(e) => onUpdate(id, e.target.value)}
                placeholder={`Region ${id}`}
              />
              <span className="label-input-meta">{getRegionRangeLabel(id)}</span>
            </div>
          </li>
        ))}
      </ul>
    </CollapsiblePanel>
  )
}
