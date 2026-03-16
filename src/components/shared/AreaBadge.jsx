// LOBES: Area badge — pill with area color at 15% opacity, 11px, 4px radius

import { cn } from '../../utils/cn'
import { getAreaColorVar } from '../../data/areas'

const styleForArea = (areaId) => {
  const colorVar = getAreaColorVar(areaId)
  return {
    backgroundColor: `color-mix(in srgb, var(${colorVar}) 15%, transparent)`,
    color: `var(${colorVar})`,
  }
}

export function AreaBadge({ areaId, label, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-1.5 py-0.5 font-mono text-[11px] font-medium',
        className
      )}
      style={styleForArea(areaId)}
    >
      {label}
    </span>
  )
}

export default AreaBadge
