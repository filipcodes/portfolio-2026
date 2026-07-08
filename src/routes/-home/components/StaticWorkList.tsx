import { MediaImage } from '@/MediaImage'
import type { Work } from '@/routes/-home/constants/works'
import { UnstyledExternalLink } from '@/shared/components/ExternalLink'

interface StaticWorkListProps {
  works: readonly Work[]
}

export function StaticWorkList({ works }: StaticWorkListProps) {
  return (
    <ul className='border-border divide-border flex flex-col divide-y border-y'>
      {works.map((work) => (
        <li key={work.title} className='flex flex-col gap-6 px-2 py-6'>
          <p className='text-signal font-mono text-xs tracking-widest uppercase'>
            {work.tag}
          </p>

          <h3 className='font-display text-3xl tracking-tight'>
            <UnstyledExternalLink
              href={work.href}
              className='text-gray-100 transition-colors duration-150 hover:text-white active:text-blue-300'
            >
              {work.title}
            </UnstyledExternalLink>
          </h3>

          <p className='text-fg-muted text-sm leading-relaxed'>
            {work.description}
          </p>

          {work.media && <MediaImage {...work.media} />}

          <div className="text-fg-muted flex gap-2 font-mono text-xs tracking-widest uppercase [&>span+span]:before:mr-2 [&>span+span]:before:content-['·']">
            {work.metaTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}
