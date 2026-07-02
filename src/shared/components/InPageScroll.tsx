import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type ScrollTarget = 'top' | 'next-viewport'

type ScrollDirection = 'up' | 'down'

const SCROLL_TOP_BY_TARGET: Record<ScrollTarget, () => number> = {
  top: () => 0,
  'next-viewport': () => window.innerHeight,
}

const DIRECTION_BY_TARGET: Record<ScrollTarget, ScrollDirection> = {
  top: 'up',
  'next-viewport': 'down',
}

interface InPageScrollProps {
  target: ScrollTarget
  iconPlacement: 'leading' | 'trailing'
  children: ReactNode
  className?: string
}

interface ScrollArrowProps {
  direction: ScrollDirection
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
  target,
  iconPlacement,
  children,
  className,
}: InPageScrollProps) {
  const direction = DIRECTION_BY_TARGET[target]

  return (
    <button
      type='button'
      onClick={() => {
        window.scrollTo({
          top: SCROLL_TOP_BY_TARGET[target](),
          behavior: 'smooth',
        })
      }}
      className={`text-fg-muted hover:text-fg flex items-center gap-3 font-mono text-xs tracking-widest uppercase transition-colors ${className ?? ''}`}
    >
      {iconPlacement === 'leading' && <ScrollArrow direction={direction} />}
      {children}
      {iconPlacement === 'trailing' && <ScrollArrow direction={direction} />}
    </button>
  )
}
