// LOBES: Framer Motion — subtle spring, no bouncy

export const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
}

export const spring = { type: 'spring', stiffness: 300, damping: 30 }

export const stagger = {
  animate: { transition: { staggerChildren: 0.05 } },
}
