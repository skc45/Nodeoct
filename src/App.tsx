import { useState } from 'react'
import { CubeScene } from './components/CubeScene'
import { NoteEditor } from './components/NoteEditor'
import { NoteList } from './components/NoteList'
import { RegionLabelsEditor } from './components/RegionLabelsEditor'
import { useNotes } from './hooks/useNotes'
import { useRegionLabels } from './hooks/useRegionLabels'
import './App.css'

export default function App() {
  const {
    notes,
    selectedNote,
    selectedId,
    setSelectedId,
    addNote,
    updateNote,
    deleteNote,
  } = useNotes()

  const { labels, updateLabel, resetLabels } = useRegionLabels()
  const [rotationSpeed, setRotationSpeed] = useState(1)

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">◈</span>
          <div>
            <h1>Nodeoct</h1>
            <p>Notes plotted across 8 labelable sub-cubes (0–2 per axis)</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          <NoteList
            notes={notes}
            selectedId={selectedId}
            regionLabels={labels}
            onSelect={setSelectedId}
            onAdd={addNote}
          />
          <RegionLabelsEditor
            labels={labels}
            onUpdate={updateLabel}
            onReset={resetLabels}
          />
          {selectedNote ? (
            <NoteEditor
              note={selectedNote}
              regionLabels={labels}
              onUpdate={(patch) => updateNote(selectedNote.id, patch)}
              onDelete={() => deleteNote(selectedNote.id)}
            />
          ) : (
            <div className="no-selection">
              <p>Select a note or create a new one.</p>
            </div>
          )}
        </aside>

        <section className="canvas-panel">
          <CubeScene
            notes={notes}
            selectedId={selectedId}
            regionLabels={labels}
            rotationSpeed={rotationSpeed}
            onSelect={setSelectedId}
          />
          <div className="rotation-control">
            <label htmlFor="rotation-speed">
              <span>Rotation speed</span>
              <span className="rotation-value">{rotationSpeed.toFixed(2)}×</span>
            </label>
            <input
              id="rotation-speed"
              type="range"
              min={0}
              max={2}
              step={0.05}
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
            />
          </div>
          <div className="canvas-hint">
            Drag to rotate · Click a sphere to select · 8 regions split at 1 on each axis
          </div>
        </section>
      </main>
    </div>
  )
}
