import { ExternalLink } from '@/shared/components/ExternalLink'
import { InPageScroll } from '@/shared/components/InPageScroll'
import { Link } from '@/shared/components/Link'
import { SectionHeading } from '@/shared/components/SectionHeading'

export function Footer() {
  return (
    <footer className='flex h-[calc(100dvh-72px)] flex-col'>
      <div className='mx-auto w-full max-w-300 px-2 md:px-8'>
        <div className='border-border flex items-baseline justify-between border-b py-6'>
          <InPageScroll direction='up' iconPlacement='leading' scrollTo={0}>
            Back to top
          </InPageScroll>
          <span className='text-fg-muted font-mono text-xs tracking-widest uppercase'>
            2026 — Issue 01
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
                <ExternalLink href='mailto:filip.sipos@onesimplicity.com'>
                  filip.sipos@onesimplicity.com
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href='http://'>GitHub</ExternalLink>
              </li>
              <li>
                <ExternalLink href='http://'>LinkedIn</ExternalLink>
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
        className='relative flex items-end gap-[1.5vw] overflow-hidden'
      >
        <img
          src='/fs.png'
          alt=''
          className='aspect-square w-[10vw] shrink-0 translate-y-[30.5%]'
        />
        <span className='block translate-y-[25%] font-mono text-[12vw] leading-none font-bold tracking-tighter whitespace-nowrap select-none'>
          Filip Sipos.
        </span>
      </div>
    </footer>
  )
}
