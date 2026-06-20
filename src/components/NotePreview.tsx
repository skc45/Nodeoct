export function NotePreview({
  title,
  body,
  className = '',
}: {
  title: string
  body: string
  className?: string
}) {
  const displayTitle = title || 'Untitled'

  return (
    <div className={`note-preview ${className}`.trim()}>
      <div className="note-preview-title">{displayTitle}</div>
      {body ? (
        <div className="note-preview-body">{body}</div>
      ) : (
        <div className="note-preview-body note-preview-empty">No content</div>
      )}
    </div>
  )
}
