# Nodeoct

A notes app that plots each note as a point inside a **3-axis cube** (0–2 on each axis). The cube is divided into **8 labelable sub-cubes** at the midpoint (1) on each axis. Position notes along three dimensions — Focus (X), Energy (Y), and Depth (Z) — and see them rendered in interactive 3D space.

## Features

- Create, edit, and delete notes
- Three axis sliders per note (0 to 2) to position it in the cube
- 8 sub-cubes split at x=1, y=1, z=1 — each with a custom editable label
- Interactive 3D visualization with orbit controls
- Click spheres in the cube to select notes
- Notes persist in localStorage
- Color-coded note markers

## Getting started

Requires [Node.js](https://nodejs.org/) 18+.

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Desktop app (Windows .exe)

Build a portable Windows executable:

```bash
npm install
npm run dist
```

The `.exe` is written to `release/Nodeoct-0.1.0-portable.exe`. Double-click to run — no install required.

For a full installer instead:

```bash
npm run dist:installer
```

Download the latest built `.exe` from [GitHub Releases](https://github.com/skc45/Nodeoct/releases).
## How it works

Each note has `(x, y, z)` coordinates from **0 to 2**, mapping to positions inside a wireframe cube. The cube is split into **8 regions**:

| Region bounds (x · y · z) | Default label |
|---------------------------|---------------|
| 0–1 · 0–1 · 0–1 | Quiet Shallows |
| 1–2 · 0–1 · 0–1 | Focused Shallows |
| 0–1 · 1–2 · 0–1 | Energetic Shallows |
| 1–2 · 1–2 · 0–1 | Bright Shallows |
| 0–1 · 0–1 · 1–2 | Quiet Depths |
| 1–2 · 0–1 · 1–2 | Focused Depths |
| 0–1 · 1–2 · 1–2 | Energetic Depths |
| 1–2 · 1–2 · 1–2 | Bright Depths |

Edit labels in the **Sub-cube labels** panel. Notes saved with the old -1…1 range are migrated automatically on load.

| Axis | Label  | Range |
|------|--------|-------|
| X    | Focus  | 0 ↔ 2 |
| Y    | Energy | 0 ↔ 2 |
| Z    | Depth  | 0 ↔ 2 |

Adjust the sliders while editing a note to move its sphere in real time.
