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
