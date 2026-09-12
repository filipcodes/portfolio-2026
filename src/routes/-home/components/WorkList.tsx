import { motion } from 'motion/react'

import { MediaImage } from '@/MediaImage'
import type { Work } from '@/routes/-home/constants/works'
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
} from '@/shared/constants/motion'

interface WorkListProps {
  works: readonly Work[]
}

export function WorkList({ works }: WorkListProps) {
  return (
    <motion.ul
      className='border-border divide-border flex flex-col divide-y border-y md:flex-row md:divide-x md:divide-y-0'
      variants={staggerContainer}
      initial='hidden'
      whileInView='visible'
      viewport={viewportOnce}
    >
      {works.map((work) => (
        <motion.li
          key={work.title}
          variants={fadeUp}
          className='flex min-w-0 flex-col gap-6 px-2 py-6 md:flex-1 md:p-6'
        >
          <div className=''>
            <p className='text-signal pb-2 font-mono text-xs tracking-widest uppercase'>
              {work.tag}
            </p>

            <h3 className='font-display text-3xl tracking-tight md:text-4xl'>
              {work.title}
            </h3>
          </div>

          <p className='text-fg-muted text-sm leading-relaxed'>
            {work.description}
          </p>

          {work.media && <MediaImage {...work.media} />}

          <div className="text-fg-muted mt-auto flex gap-2 font-mono text-xs tracking-widest uppercase [&>span+span]:before:mr-2 [&>span+span]:before:content-['·']">
            {work.metaTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </motion.li>
      ))}
    </motion.ul>
  )
}
