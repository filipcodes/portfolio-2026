import { motion } from 'motion/react'
import type { ReactNode } from 'react'

import { fadeUp, viewportOnce } from '@/shared/constants/motion'

interface RevealProps {
  children: ReactNode
  className?: string
}

export function Reveal({ children, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial='hidden'
      whileInView='visible'
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  )
}
