import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Line, Text } from '@react-three/drei'
import type { Group, Mesh } from 'three'
import type { Note } from '../types/note'
import { AXIS_LABELS } from '../types/note'
import {
  CUBE_CENTER,
  CUBE_SIZE,
  getRegionBounds,
  REGION_IDS,
  REGION_COLORS,
  type RegionId,
  type RegionLabels,
} from '../types/region'

interface CubeSceneProps {
  notes: Note[]
  selectedId: string | null
  regionLabels: RegionLabels
  rotationSpeed: number
  onSelect: (id: string) => void
}

function NoteMarker({
  note,
  selected,
  onSelect,
}: {
  note: Note
  selected: boolean
  onSelect: () => void
}) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (!meshRef.current) return
    const size = selected ? 0.14 : hovered ? 0.11 : 0.08
    meshRef.current.scale.setScalar(size)
  })

  return (
    <group position={[note.x, note.y, note.z]}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'default'
        }}
      >
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial
          color={note.color}
          emissive={note.color}
          emissiveIntensity={selected ? 0.6 : hovered ? 0.4 : 0.15}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      {(selected || hovered) && (
        <Html
          center
          distanceFactor={8}
          style={{
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            transform: 'translateY(-28px)',
          }}
        >
          <div className="marker-label">{note.title || 'Untitled'}</div>
        </Html>
      )}
    </group>
  )
}

function SubCube({ id, label }: { id: RegionId; label: string }) {
  const { min, max } = getRegionBounds(id)
  const center: [number, number, number] = [
    (min[0] + max[0]) / 2,
    (min[1] + max[1]) / 2,
    (min[2] + max[2]) / 2,
  ]
  const size: [number, number, number] = [
    max[0] - min[0],
    max[1] - min[1],
    max[2] - min[2],
  ]

  const edgePairs: [number, number, number][][] = [
    [
      [min[0], min[1], min[2]],
      [max[0], min[1], min[2]],
      [max[0], max[1], min[2]],
      [min[0], max[1], min[2]],
      [min[0], min[1], min[2]],
    ],
    [
      [min[0], min[1], max[2]],
      [max[0], min[1], max[2]],
      [max[0], max[1], max[2]],
      [min[0], max[1], max[2]],
      [min[0], min[1], max[2]],
    ],
    [[min[0], min[1], min[2]], [min[0], min[1], max[2]]],
    [[max[0], min[1], min[2]], [max[0], min[1], max[2]]],
    [[max[0], max[1], min[2]], [max[0], max[1], max[2]]],
    [[min[0], max[1], min[2]], [min[0], max[1], max[2]]],
  ]

  return (
    <group>
      <mesh position={center}>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={REGION_COLORS[id]}
          transparent
          opacity={0.14}
          depthWrite={false}
        />
      </mesh>
      {edgePairs.map((points, i) => (
        <Line
          key={i}
          points={points}
          color={REGION_COLORS[id]}
          lineWidth={1}
          transparent
          opacity={0.55}
        />
      ))}
      <Text
        position={center}
        fontSize={0.09}
        color="#e6edf3"
        anchorX="center"
        anchorY="middle"
        maxWidth={0.85}
        textAlign="center"
      >
        {label}
      </Text>
    </group>
  )
}

function AxisLines() {
  const len = CUBE_SIZE + 0.2

  const dividerLines: [number, number, number][][] = [
    [[1, 0, 0], [1, CUBE_SIZE, 0]],
    [[1, 0, CUBE_SIZE], [1, CUBE_SIZE, CUBE_SIZE]],
    [[0, 1, 0], [CUBE_SIZE, 1, 0]],
    [[0, 1, CUBE_SIZE], [CUBE_SIZE, 1, CUBE_SIZE]],
    [[0, 0, 1], [CUBE_SIZE, 0, 1]],
    [[0, CUBE_SIZE, 1], [CUBE_SIZE, CUBE_SIZE, 1]],
    [[0, 0, 1], [0, CUBE_SIZE, 1]],
    [[CUBE_SIZE, 0, 1], [CUBE_SIZE, CUBE_SIZE, 1]],
    [[1, 0, 0], [1, 0, CUBE_SIZE]],
    [[1, CUBE_SIZE, 0], [1, CUBE_SIZE, CUBE_SIZE]],
    [[0, 1, 0], [0, 1, CUBE_SIZE]],
    [[CUBE_SIZE, 1, 0], [CUBE_SIZE, 1, CUBE_SIZE]],
  ]

  return (
    <>
      <Line points={[[0, 0, 0], [len, 0, 0]]} color="#ff6b6b" lineWidth={1.5} />
      <Line points={[[0, 0, 0], [0, len, 0]]} color="#69db7c" lineWidth={1.5} />
      <Line points={[[0, 0, 0], [0, 0, len]]} color="#74c0fc" lineWidth={1.5} />

      <Text position={[len + 0.12, 0, 0]} fontSize={0.11} color="#ff6b6b" anchorX="left">
        {AXIS_LABELS.x} (0–2)
      </Text>
      <Text position={[0, len + 0.12, 0]} fontSize={0.11} color="#69db7c" anchorX="center">
        {AXIS_LABELS.y} (0–2)
      </Text>
      <Text position={[0, 0, len + 0.12]} fontSize={0.11} color="#74c0fc" anchorX="center">
        {AXIS_LABELS.z} (0–2)
      </Text>

      {dividerLines.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#8892a8"
          lineWidth={1}
          transparent
          opacity={0.35}
        />
      ))}
    </>
  )
}

function RotatingCube({
  notes,
  selectedId,
  regionLabels,
  rotationSpeed,
  onSelect,
}: CubeSceneProps) {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (!groupRef.current || rotationSpeed <= 0) return
    groupRef.current.rotation.y += delta * 0.04 * rotationSpeed
  })

  const s = CUBE_SIZE
  const outerEdges: [number, number, number][][] = [
    [[0, 0, 0], [s, 0, 0], [s, s, 0], [0, s, 0], [0, 0, 0]],
    [[0, 0, s], [s, 0, s], [s, s, s], [0, s, s], [0, 0, s]],
    [[0, 0, 0], [0, 0, s]],
    [[s, 0, 0], [s, 0, s]],
    [[s, s, 0], [s, s, s]],
    [[0, s, 0], [0, s, s]],
  ]

  return (
    <group ref={groupRef} position={CUBE_CENTER}>
      <group position={[-1, -1, -1]}>
        {outerEdges.map((points, i) => (
          <Line
            key={`outer-${i}`}
            points={points}
            color="#c9d1d9"
            lineWidth={1.5}
            transparent
            opacity={0.6}
          />
        ))}
        {REGION_IDS.map((id) => (
          <SubCube key={id} id={id} label={regionLabels[id]} />
        ))}
        <AxisLines />
        {notes.map((note) => (
          <NoteMarker
            key={note.id}
            note={note}
            selected={note.id === selectedId}
            onSelect={() => onSelect(note.id)}
          />
        ))}
      </group>
    </group>
  )
}

export function CubeScene({
  notes,
  selectedId,
  regionLabels,
  rotationSpeed,
  onSelect,
}: CubeSceneProps) {
  return (
    <Canvas
      camera={{ position: [4, 3, 4], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      onPointerMissed={() => {}}
    >
      <color attach="background" args={['#0d1117']} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <directionalLight position={[-3, -2, -4]} intensity={0.3} color="#7c9cff" />

      <RotatingCube
        notes={notes}
        selectedId={selectedId}
        regionLabels={regionLabels}
        rotationSpeed={rotationSpeed}
        onSelect={onSelect}
      />

      <OrbitControls
        target={CUBE_CENTER}
        enablePan={false}
        minDistance={3}
        maxDistance={9}
        autoRotate={notes.length > 0 && rotationSpeed > 0}
        autoRotateSpeed={0.4 * rotationSpeed}
      />
    </Canvas>
  )
}
