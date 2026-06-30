import type { Variants } from 'motion/react'

export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
}

// Children inherit this state via `variants={fadeUp}`, offset by the stagger.
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
}

export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const

// Enter/exit motion for content that fades in alongside an expanded column
export const reveal = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.5, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.3, ease: easeOutExpo },
  },
}
