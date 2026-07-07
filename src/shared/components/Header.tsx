import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { ExternalLink } from '@/shared/components/ExternalLink'
import { Link } from '@/shared/components/Link'
import { links } from '@/shared/constants/links'

const PHASE_MS = 300

const headerStyles = {
  base: 'group fixed left-1/2 z-80 -translate-x-1/2 border transition-all duration-300 ease-out',
  pill: 'bg-bg top-4 w-6/7 md:w-[min(60%,65rem)] rounded-full px-6 text-sm md:text-base md:px-8 py-2',
  bar: 'top-0 w-full rounded-none px-4 md:px-16 py-4',
  bordered: 'border-border',
  unbordered: 'border-transparent',
}

export function Header() {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [isPill, setIsPill] = useState(false)
  const [isBordered, setIsBordered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(width < 48rem)')
    const update = () => {
      setIsMobile(query.matches)
    }
    update()
    query.addEventListener('change', update)
    return () => {
      query.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const observer = new IntersectionObserver(([entry]) => {
      if (timeoutId !== null) clearTimeout(timeoutId)

      if (entry.isIntersecting) {
        // Scrolled back to top: hide border first, then expand.
        setIsBordered(false)
        timeoutId = setTimeout(() => {
          setIsPill(false)
        }, PHASE_MS)
      } else {
        // Scrolled away from top: shrink first, then show border.
        setIsPill(true)
        timeoutId = setTimeout(() => {
          setIsBordered(true)
        }, PHASE_MS)
      }
    })
    observer.observe(sentinel)

    return () => {
      observer.disconnect()
      if (timeoutId !== null) clearTimeout(timeoutId)
    }
  }, [])

  const showStripped = isMobile && isPill

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden
        className='pointer-events-none absolute top-0 h-24 w-px'
      />
      <header
        data-pill={isPill}
        className={`${headerStyles.base} ${isPill ? headerStyles.pill : headerStyles.bar} ${isBordered ? headerStyles.bordered : headerStyles.unbordered}`}
      >
        <nav className='flex items-center justify-between'>
          <Link to='/'>
            <div className='grid aspect-square w-15 place-items-center transition-all duration-300 ease-out group-data-[pill=true]:w-10'>
              <AnimatePresence initial={false}>
                <motion.img
                  key={showStripped ? 'stripped' : 'classic'}
                  src={showStripped ? '/logo/fs-no-border.png' : '/logo/fs.png'}
                  alt="Filip Sipos' logo depicting 'FS'"
                  className={`col-start-1 row-start-1 ${showStripped ? 'w-4/5' : 'w-full'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </AnimatePresence>
            </div>
          </Link>
          <ul className='flex gap-4'>
            {/* <li>
              <Link to='/writing'>Writing</Link>
            </li> */}

            <li>
              <ExternalLink href={links.github}>GitHub</ExternalLink>
            </li>

            <li>
              <ExternalLink href={links.linkedin}>LinkedIn</ExternalLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}
