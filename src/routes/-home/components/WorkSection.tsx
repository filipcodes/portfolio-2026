import { WorkList } from '@/routes/-home/components/WorkList'
import { works } from '@/routes/-home/constants/works'
import { Reveal } from '@/shared/components/Reveal'
import { SectionHeading } from '@/shared/components/SectionHeading'

export const WORK_SECTION_ID = 'selected-work'

const MAX_WORKS = 3

export function WorkSection() {
  const featured = works.slice(0, MAX_WORKS)

  return (
    <section id={WORK_SECTION_ID} className='scroll-mt-24'>
      <Reveal>
        <SectionHeading label='Featured' addendum={featured.length} />
      </Reveal>

      <WorkList works={featured} />
    </section>
  )
}
