import { useCallback, useEffect, useState } from 'react'
import {
  DEFAULT_REGION_LABELS,
  REGION_IDS,
  type RegionId,
  type RegionLabels,
} from '../types/region'

const STORAGE_KEY = 'nodeoct-region-labels'

function loadRegionLabels(): RegionLabels {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_REGION_LABELS }
    const parsed = JSON.parse(raw) as Partial<RegionLabels>
    return { ...DEFAULT_REGION_LABELS, ...parsed }
  } catch {
    return { ...DEFAULT_REGION_LABELS }
  }
}

export function useRegionLabels() {
  const [labels, setLabels] = useState<RegionLabels>(loadRegionLabels)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(labels))
  }, [labels])

  const updateLabel = useCallback((id: RegionId, value: string) => {
    setLabels((prev) => ({ ...prev, [id]: value }))
  }, [])

  const resetLabels = useCallback(() => {
    setLabels({ ...DEFAULT_REGION_LABELS })
  }, [])

  const labelList = REGION_IDS.map((id) => ({ id, label: labels[id] }))

  return { labels, labelList, updateLabel, resetLabels }
}
