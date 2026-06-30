import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface InPageScrollProps {
  direction: 'up' | 'down'
  iconPlacement: 'leading' | 'trailing'
  scrollTo: number
  children: ReactNode
  className?: string
}

interface ScrollArrowProps {
  direction: 'up' | 'down'
}

function ScrollArrow({ direction }: ScrollArrowProps) {
  const offset = direction === 'up' ? -4 : 4
  const arrow = direction === 'up' ? '↑' : '↓'

  return (
    <motion.span
      aria-hidden
      animate={{ y: [0, offset, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {arrow}
    </motion.span>
  )
}

export function InPageScroll({
  direction,
  iconPlacement,
  scrollTo,
  children,
  className,
}: InPageScrollProps) {
  return (
    <button
      type='button'
      onClick={() => {
        window.scrollTo({ top: scrollTo, behavior: 'smooth' })
      }}
      className={`text-fg-muted hover:text-fg flex items-center gap-3 font-mono text-xs tracking-widest uppercase transition-colors ${className ?? ''}`}
    >
      {iconPlacement === 'leading' && <ScrollArrow direction={direction} />}
      {children}
      {iconPlacement === 'trailing' && <ScrollArrow direction={direction} />}
    </button>
  )
}
