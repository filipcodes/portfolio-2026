import { useInView } from 'motion/react'
import { useRef } from 'react'

import { viewportOnce } from '@/shared/constants/motion'
import { useNumberShuffle } from '@/shared/hooks/useNumberShuffle'

interface NumberShuffleProps {
  number: number
}

function NumberShuffle({ number }: NumberShuffleProps) {
  if (number < 1) {
    console.error('Number passed to NumberShuffle should not be less than 1')
  }

  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, viewportOnce)

  const displayNumber = useNumberShuffle(
    number.toString().padStart(2, '0'),
    inView,
  )

  return <span ref={ref}>[{displayNumber}]</span>
}

interface SectionHeadingProps {
  label: string
  addendum?: string | number
}

export function SectionHeading({ label, addendum }: SectionHeadingProps) {
  return (
    <h2 className='text-fg-muted mb-4 flex items-baseline justify-between font-mono text-sm tracking-widest uppercase'>
      <span>{label}</span>

      {typeof addendum === 'number' && (
        <span className='text-signal'>
          <NumberShuffle number={addendum} />
        </span>
      )}

      {typeof addendum === 'string' && (
        <span className='text-signal'>{addendum}</span>
      )}
    </h2>
  )
}
