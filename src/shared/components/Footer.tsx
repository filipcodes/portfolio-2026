import { ExternalLink } from '@/shared/components/ExternalLink'
import { InPageScroll } from '@/shared/components/InPageScroll'
import { Link } from '@/shared/components/Link'
import { SectionHeading } from '@/shared/components/SectionHeading'
import { links } from '@/shared/constants/links'

export function Footer() {
  return (
    <footer className='mx-auto flex h-[calc(100dvh-72px)] max-h-200 w-full max-w-316 flex-col'>
      <div className='mx-auto w-full max-w-300 px-2 md:px-8'>
        <div className='border-border flex items-baseline justify-between border-b py-6'>
          <InPageScroll target='top' iconPlacement='leading'>
            Back to top
          </InPageScroll>
          <span className='text-fg-muted font-mono text-xs tracking-widest uppercase'>
            Copyright &#9400; 2026 — Issue 01
          </span>
        </div>
      </div>

      <div className='mx-auto w-full max-w-300 px-2 py-16 md:px-8'>
        <div className='grid grid-cols-1 gap-12 md:grid-cols-3'>
          <div>
            <SectionHeading label='Navigate' />
            <ul className='space-y-2'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/writing'>Writing</Link>
              </li>
            </ul>
          </div>

          <div>
            <SectionHeading label='Connect' />
            <ul className='space-y-2'>
              <li>
                <ExternalLink href={`mailto:${links.email}`}>
                  {links.email}
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href={links.github}>GitHub</ExternalLink>
              </li>
              <li>
                <ExternalLink href={links.linkedin}>LinkedIn</ExternalLink>
              </li>
            </ul>
          </div>

          <div>
            <SectionHeading label='Colophon' />
            <p className='text-fg-muted text-sm leading-relaxed'>
              Set in Space Grotesk and Space Mono. Built with React, TanStack
              Router, and Tailwind CSS.
            </p>
            <ul className='mt-2 space-y-2'>
              <li>
                <ExternalLink href='https://github.com/filipcodes/portfolio-2026'>
                  Source
                </ExternalLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='flex-1' />

      <div
        aria-hidden
        className='relative flex items-end gap-[min(1.5vw,1.2rem)] overflow-hidden'
      >
        <img
          src='/fs.png'
          alt=''
          className='aspect-square w-[min(10vw,7.9rem)] shrink-0 md:translate-y-[30.5%]'
        />
        <span className='block font-mono text-[min(12vw,9.5rem)] leading-none font-bold tracking-tighter whitespace-nowrap select-none md:translate-y-[25%]'>
          Filip Sipos.
        </span>
      </div>
    </footer>
  )
}
