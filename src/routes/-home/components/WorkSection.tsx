import { StaticWorkList } from '@/routes/-home/components/StaticWorkList'
import { WorkCarousel } from '@/routes/-home/components/WorkCarousel'
import { works } from '@/routes/-home/constants/works'
import { Reveal } from '@/shared/components/Reveal'
import { SectionHeading } from '@/shared/components/SectionHeading'
import { MEDIA_QUERY, useMediaQuery } from '@/shared/hooks/useMediaQuery'

export const WORK_SECTION_ID = 'selected-work'

const MAX_COLUMNS = 3

export function WorkSection() {
  // The carousel and its animations exist only on desktop
  const isDesktop = useMediaQuery(MEDIA_QUERY.DESKTOP)

  const columns = works.slice(0, MAX_COLUMNS)

  return (
    <section id={WORK_SECTION_ID} className='scroll-mt-24'>
      <Reveal>
        <SectionHeading label='Featured Experience' addendum={columns.length} />
      </Reveal>

      {isDesktop ? (
        <WorkCarousel works={columns} />
      ) : (
        <StaticWorkList works={columns} />
      )}
    </section>
  )
}
