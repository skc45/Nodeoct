export type AxisKey = 'x' | 'y' | 'z'

export type AxisLabels = Record<AxisKey, string>

export const DEFAULT_AXIS_LABELS: AxisLabels = {
  x: 'Urgency',
  y: 'Priority',
  z: 'Relevance',
}

export const AXIS_COLORS: Record<AxisKey, string> = {
  x: '#ff6b6b',
  y: '#69db7c',
  z: '#74c0fc',
}

export const AXIS_KEYS: AxisKey[] = ['x', 'y', 'z']

export const AXIS_TITLES: Record<AxisKey, string> = {
  x: 'X axis',
  y: 'Y axis',
  z: 'Z axis',
}
