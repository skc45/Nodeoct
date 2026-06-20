import { useCallback, useEffect, useState } from 'react'
import { createNote, migrateNoteCoords, type Note } from '../types/note'

const STORAGE_KEY = 'nodeoct-notes'

function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return [
        createNote({
          title: 'Welcome',
          body: 'Drag the sliders (0–2 on each axis) to position this note in one of the 8 sub-cubes. Edit sub-cube labels in the panel below.',
          x: 1.3,
          y: 0.4,
          z: 1.6,
        }),
      ]
    }
    return (JSON.parse(raw) as Note[]).map(migrateNoteCoords)
  } catch {
    return []
  }
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(loadNotes)
  const [selectedId, setSelectedId] = useState<string | null>(
    () => loadNotes()[0]?.id ?? null,
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }, [notes])

  const selectedNote = notes.find((n) => n.id === selectedId) ?? null

  const addNote = useCallback(() => {
    const note = createNote({ title: 'New note' })
    setNotes((prev) => [...prev, note])
    setSelectedId(note.id)
  }, [])

  const updateNote = useCallback((id: string, patch: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n,
      ),
    )
  }, [])

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => {
      const next = prev.filter((n) => n.id !== id)
      setSelectedId((current) => {
        if (current !== id) return current
        return next[0]?.id ?? null
      })
      return next
    })
  }, [])

  return {
    notes,
    selectedNote,
    selectedId,
    setSelectedId,
    addNote,
    updateNote,
    deleteNote,
  }
}
