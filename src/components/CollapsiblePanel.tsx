import type { ReactNode } from 'react'

interface CollapsiblePanelProps {
  title: string
  hint?: string
  defaultOpen?: boolean
  headerActions?: ReactNode
  children: ReactNode
}

export function CollapsiblePanel({
  title,
  hint,
  defaultOpen = true,
  headerActions,
  children,
}: CollapsiblePanelProps) {
  return (
    <details className="labels-panel" open={defaultOpen}>
      <summary className="labels-panel-summary">
        <span className="labels-panel-title">
          <span className="collapse-chevron" aria-hidden />
          {title}
        </span>
        {headerActions && (
          <span
            className="labels-panel-actions"
            onClick={(e) => e.preventDefault()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {headerActions}
          </span>
        )}
      </summary>
      <div className="labels-panel-body">
        {hint && <p className="labels-panel-hint">{hint}</p>}
        {children}
      </div>
    </details>
  )
}
