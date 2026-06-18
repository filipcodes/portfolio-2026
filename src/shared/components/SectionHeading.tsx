import { useNumberShuffle } from '@/shared/hooks/useNumberShuffle'

interface NumberShuffleProps {
  number: number
}

function NumberShuffle({ number }: NumberShuffleProps) {
  if (number < 1) {
    console.error('Number passed to NumberShuffle should not be less than 1')
  }

  const displayNumber = useNumberShuffle(number.toString().padStart(2, '0'))

  return <div>[{displayNumber}]</div>
}

interface SectionHeadingProps {
  label: string
  addendum?: string | number
}

export function SectionHeading({ label, addendum }: SectionHeadingProps) {
  return (
    <h2 className='mt-8 text-xl'>
      <div className='flex justify-between'>
        {label}
        {typeof addendum === 'number' && <NumberShuffle number={addendum} />}
      </div>
    </h2>
  )
}
