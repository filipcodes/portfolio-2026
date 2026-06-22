import { useNumberShuffle } from '@/shared/hooks/useNumberShuffle'

interface NumberShuffleProps {
  number: number
}

function NumberShuffle({ number }: NumberShuffleProps) {
  if (number < 1) {
    console.error('Number passed to NumberShuffle should not be less than 1')
  }

  const displayNumber = useNumberShuffle(number.toString().padStart(2, '0'))

  return <span>[{displayNumber}]</span>
}

interface SectionHeadingProps {
  label: string
  addendum?: string | number
}

export function SectionHeading({ label, addendum }: SectionHeadingProps) {
  return (
    <h2 className='mt-12 mb-4 flex items-baseline justify-between font-mono text-sm tracking-widest text-fg-muted uppercase'>
      <span>{label}</span>
      {typeof addendum === 'number' && (
        <span className='text-signal'>
          <NumberShuffle number={addendum} />
        </span>
      )}
    </h2>
  )
}
