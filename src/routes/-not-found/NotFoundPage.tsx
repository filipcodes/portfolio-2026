import { useLocation } from '@tanstack/react-router'

import { Link } from '@/shared/components/Link'
import { useNumberShuffle } from '@/shared/hooks/useNumberShuffle'

export function NotFoundPage() {
  const pathname = useLocation({ select: (location) => location.pathname })
  const digits = useNumberShuffle('404')

  return (
    <section className='flex min-h-screen flex-col justify-center'>
      <p className='text-fg-muted flex items-center gap-2 font-mono text-xs tracking-widest uppercase'>
        <span className='bg-alert size-1.5 animate-pulse rounded-full' />
        Signal lost
      </p>

      <h1 className='my-6 font-mono text-[clamp(6rem,22vw,15rem)] leading-none font-bold tracking-tighter'>
        {digits}
      </h1>

      <p className='text-fg-subtle font-mono text-xs tracking-widest uppercase'>
        {pathname} — not in index
      </p>

      <div className='mt-12 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs tracking-widest uppercase'>
        <Link to='/'>← Back to &quot;home&quot;</Link>
      </div>
    </section>
  )
}
