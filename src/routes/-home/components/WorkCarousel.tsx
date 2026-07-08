import { motion } from 'motion/react'
import { type CSSProperties, useEffect, useState } from 'react'

import {
  type ColumnState,
  WorkColumn,
} from '@/routes/-home/components/WorkColumn'
import type { Work } from '@/routes/-home/constants/works'
import { Reveal } from '@/shared/components/Reveal'
import { staggerContainer, viewportOnce } from '@/shared/constants/motion'

const AUTO_ADVANCE_MS = 6000

const stepButtonClassName =
  'border-border text-fg-muted hover:border-fg-subtle hover:text-fg active:text-signal flex size-10 cursor-pointer items-center justify-center border font-mono transition-colors duration-150'

function getColumnState(active: number, index: number): ColumnState {
  return active === index ? 'expanded' : 'collapsed'
}

interface WorkCarouselNavigationProps {
  step: (direction: 1 | -1) => void
}

function WorkCarouselNavigation({ step }: WorkCarouselNavigationProps) {
  return (
    <Reveal className='mt-4 flex justify-end gap-2'>
      <button
        type='button'
        aria-label='Previous project'
        className={stepButtonClassName}
        onClick={() => {
          step(-1)
        }}
      >
        ←
      </button>
      <button
        type='button'
        aria-label='Next project'
        className={stepButtonClassName}
        onClick={() => {
          step(1)
        }}
      >
        →
      </button>
    </Reveal>
  )
}

interface WorkCarouselProps {
  works: readonly Work[]
}

export function WorkCarousel({ works }: WorkCarouselProps) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const count = works.length

  const step = (direction: 1 | -1) => {
    setActive((prev) => (prev + direction + count) % count)
  }

  useEffect(() => {
    if (count <= 1 || paused) return

    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % count)
    }, AUTO_ADVANCE_MS)

    return () => {
      clearInterval(id)
    }
  }, [count, paused])

  return (
    <div
      onMouseEnter={() => {
        setPaused(true)
      }}
      onMouseLeave={() => {
        setPaused(false)
      }}
    >
      {/* overflow-anchor:none stops the browser from scrolling the page when a card's text reflows on state change */}
      <motion.ul
        className='border-border divide-border after:inset-shadow-x @container relative flex h-[700px] divide-x border-y [overflow-anchor:none] after:pointer-events-none after:absolute after:inset-0 after:z-10 after:content-[""]'
        style={{ '--cols': count } as CSSProperties}
        variants={staggerContainer}
        initial='hidden'
        whileInView='visible'
        viewport={viewportOnce}
      >
        {works.map((work, index) => (
          <WorkColumn
            key={work.title}
            work={work}
            state={getColumnState(active, index)}
          />
        ))}
      </motion.ul>

      {count > 1 && <WorkCarouselNavigation step={step} />}
    </div>
  )
}
