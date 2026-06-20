export interface Note {
  id: string
  title: string
  body: string
  /** Position on X axis: 0 to 2 */
  x: number
  /** Position on Y axis: 0 to 2 */
  y: number
  /** Position on Z axis: 0 to 2 */
  z: number
  color: string
  createdAt: number
  updatedAt: number
}
export const NOTE_COLORS = [
  '#7c9cff',
  '#ff7c9c',
  '#7cffb8',
  '#ffb87c',
  '#c87cff',
  '#7ce8ff',
  '#ff7ce8',
  '#d4ff7c',
] as const

export function createNote(partial?: Partial<Note>): Note {
  const now = Date.now()
  return {    id: crypto.randomUUID(),
    title: '',
    body: '',
    x: 1,
    y: 1,
    z: 1,
    color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)],
    createdAt: now,
    updatedAt: now,
    ...partial,
  }
}

export const AXIS_MIN = 0
export const AXIS_MAX = 2

export function clampAxis(value: number): number {
  return Math.max(AXIS_MIN, Math.min(AXIS_MAX, value))
}

/** Migrate notes saved with the old -1…1 coordinate system */
export function migrateNoteCoords(note: Note): Note {
  const inOldRange =
    note.x >= -1.01 &&
    note.x <= 1.01 &&
    note.y >= -1.01 &&
    note.y <= 1.01 &&
    note.z >= -1.01 &&
    note.z <= 1.01 &&
    (note.x < 0 || note.y < 0 || note.z < 0)

  if (!inOldRange) {
    return {
      ...note,
      x: clampAxis(note.x),
      y: clampAxis(note.y),
      z: clampAxis(note.z),
    }
  }

  return {
    ...note,
    x: clampAxis(note.x + 1),
    y: clampAxis(note.y + 1),
    z: clampAxis(note.z + 1),
  }
}
