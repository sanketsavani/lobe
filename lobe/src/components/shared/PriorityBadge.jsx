// LOBES: Priority badge — text only, uses priority color (no background fill for card)

const PRIORITY_MAP = {
  urgent: { label: 'Urgent', colorVar: '--priority-urgent' },
  high: { label: 'High', colorVar: '--priority-high' },
  medium: { label: 'Medium', colorVar: '--priority-medium' },
  low: { label: 'Low', colorVar: '--priority-low' },
}

export function PriorityBadge({ priority, className }) {
  const p = PRIORITY_MAP[priority] || PRIORITY_MAP.medium
  return (
    <span
      className={className}
      style={{ color: `var(${p.colorVar})` }}
    >
      {p.label}
    </span>
  )
}

export default PriorityBadge
