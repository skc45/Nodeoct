export type RegionId =
  | '000'
  | '100'
  | '010'
  | '110'
  | '001'
  | '101'
  | '011'
  | '111'

export const REGION_IDS: RegionId[] = [
  '000',
  '100',
  '010',
  '110',
  '001',
  '101',
  '011',
  '111',
]

export type RegionLabels = Record<RegionId, string>

export const DEFAULT_REGION_LABELS: RegionLabels = {
  '000': 'Quiet Shallows',
  '100': 'Focused Shallows',
  '010': 'Energetic Shallows',
  '110': 'Bright Shallows',
  '001': 'Quiet Depths',
  '101': 'Focused Depths',
  '011': 'Energetic Depths',
  '111': 'Bright Depths',
}

/** Muted tint per sub-cube for the 3D view */
export const REGION_COLORS: Record<RegionId, string> = {
  '000': '#4a5568',
  '100': '#5c6bc0',
  '010': '#43a047',
  '110': '#7cb342',
  '001': '#00838f',
  '101': '#1e88e5',
  '011': '#8e24aa',
  '111': '#e53935',
}

export function getRegionId(x: number, y: number, z: number): RegionId {
  const xi = x >= 1 ? 1 : 0
  const yi = y >= 1 ? 1 : 0
  const zi = z >= 1 ? 1 : 0
  return `${xi}${yi}${zi}` as RegionId
}

export function getRegionCenter(id: RegionId): [number, number, number] {
  const [xi, yi, zi] = id.split('').map(Number)
  return [0.5 + xi, 0.5 + yi, 0.5 + zi]
}

export function getRegionBounds(id: RegionId): {
  min: [number, number, number]
  max: [number, number, number]
} {
  const [xi, yi, zi] = id.split('').map(Number)
  return {
    min: [xi, yi, zi],
    max: [xi + 1, yi + 1, zi + 1],
  }
}

/** Human-readable axis ranges for a region, e.g. "0–1 · 0–1 · 0–1" */
export function getRegionRangeLabel(id: RegionId): string {
  const { min, max } = getRegionBounds(id)
  return `${min[0]}–${max[0]} · ${min[1]}–${max[1]} · ${min[2]}–${max[2]}`
}

export const CUBE_SIZE = 2
export const CUBE_CENTER: [number, number, number] = [1, 1, 1]
