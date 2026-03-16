// LOBES: Skeleton loaders — never spinners

import { cn } from '../../utils/cn'

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('lobes-skeleton', className)}
      {...props}
    />
  )
}

export default Skeleton
