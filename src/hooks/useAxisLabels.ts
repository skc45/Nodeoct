import { useCallback, useEffect, useState } from 'react'
import {
  DEFAULT_AXIS_LABELS,
  type AxisKey,
  type AxisLabels,
} from '../types/axis'

const STORAGE_KEY = 'nodeoct-axis-labels'

function loadAxisLabels(): AxisLabels {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_AXIS_LABELS }
    const parsed = JSON.parse(raw) as Partial<AxisLabels>
    return { ...DEFAULT_AXIS_LABELS, ...parsed }
  } catch {
    return { ...DEFAULT_AXIS_LABELS }
  }
}

export function useAxisLabels() {
  const [labels, setLabels] = useState<AxisLabels>(loadAxisLabels)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(labels))
  }, [labels])

  const updateLabel = useCallback((key: AxisKey, value: string) => {
    setLabels((prev) => ({ ...prev, [key]: value }))
  }, [])

  const resetLabels = useCallback(() => {
    setLabels({ ...DEFAULT_AXIS_LABELS })
  }, [])

  return { labels, updateLabel, resetLabels }
}
