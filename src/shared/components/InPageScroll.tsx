import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type ScrollTarget = 'top' | `#${string}`

type ScrollDirection = 'up' | 'down'

function scrollToTarget(target: ScrollTarget) {
  if (target === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
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
  const direction: ScrollDirection = target === 'top' ? 'up' : 'down'

  return (
    <button
      type='button'
      onClick={() => {
        scrollToTarget(target)
      }}
      className={`text-fg-muted hover:text-fg flex items-center gap-3 font-mono text-xs tracking-widest uppercase transition-colors ${className ?? ''}`}
    >
      {iconPlacement === 'leading' && <ScrollArrow direction={direction} />}
      {children}
      {iconPlacement === 'trailing' && <ScrollArrow direction={direction} />}
    </button>
  )
}
