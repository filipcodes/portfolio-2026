import { motion } from 'motion/react'
import { type CSSProperties, useState } from 'react'

import {
  type ColumnState,
  WorkColumn,
} from '@/routes/-home/components/WorkColumn'
import { works } from '@/routes/-home/constants/works'
import { Reveal } from '@/shared/components/Reveal'
import { SectionHeading } from '@/shared/components/SectionHeading'
import { staggerContainer, viewportOnce } from '@/shared/constants/motion'

const MAX_COLUMNS = 3

interface HoverState {
  active: number | null
  handoff: boolean
}

function getColumnState(
  active: number | null,
  index: number,
  count: number,
): ColumnState {
  if (count === 1) return 'expanded' // Single project stays open so its content shows on load

  if (active === null) return 'idle'

  if (active === index) return 'expanded'

  return 'collapsed'
}

export function WorkSection() {
  const [hover, setHover] = useState<HoverState>({
    active: null,
    handoff: false,
  })

  const activate = (index: number) => {
    setHover((prev) => ({
      active: index,
      handoff: prev.active !== null && prev.active !== index,
    }))
  }

  const reset = () => {
    setHover({ active: null, handoff: false })
  }

  const duration = hover.handoff ? 'handoff' : 'normal'

  const columns = works.slice(0, MAX_COLUMNS)
  const count = columns.length

  return (
    <section>
      <Reveal>
        <SectionHeading label='Featured Work' addendum={count} />
      </Reveal>
      {/* overflow-anchor:none stops the browser from scrolling the page when a card's text reflows on hover */}
      <motion.ul
        className='border-border divide-border flex flex-col divide-y border-y [overflow-anchor:none] md:@container md:h-[520px] md:flex-row md:divide-x md:divide-y-0'
        style={{ '--cols': count } as CSSProperties}
        variants={staggerContainer}
        initial='hidden'
        whileInView='visible'
        viewport={viewportOnce}
        onMouseLeave={reset}
      >
        {columns.map((work, index) => (
          <WorkColumn
            key={work.title}
            work={work}
            state={getColumnState(hover.active, index, count)}
            duration={duration}
            onHover={() => {
              activate(index)
            }}
          />
        ))}
      </motion.ul>
    </section>
  )
}
