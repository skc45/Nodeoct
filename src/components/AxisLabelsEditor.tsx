import {
  AXIS_COLORS,
  AXIS_KEYS,
  AXIS_TITLES,
  type AxisKey,
  type AxisLabels,
} from '../types/axis'
import { CollapsiblePanel } from './CollapsiblePanel'

interface AxisLabelsEditorProps {
  labels: AxisLabels
  onUpdate: (key: AxisKey, value: string) => void
  onReset: () => void
}

export function AxisLabelsEditor({
  labels,
  onUpdate,
  onReset,
}: AxisLabelsEditorProps) {
  return (
    <CollapsiblePanel
      title="Axis names"
      hint="Rename the three cube axes. Labels appear on the 3D view and note sliders."
      defaultOpen
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
        {AXIS_KEYS.map((key) => (
          <li key={key}>
            <span
              className="axis-swatch"
              style={{ background: AXIS_COLORS[key] }}
            />
            <div className="label-input-fields">
              <span className="label-input-title">{AXIS_TITLES[key]}</span>
              <input
                className="label-input"
                value={labels[key]}
                onChange={(e) => onUpdate(key, e.target.value)}
                placeholder={key.toUpperCase()}
              />
            </div>
          </li>
        ))}
      </ul>
    </CollapsiblePanel>
  )
}
