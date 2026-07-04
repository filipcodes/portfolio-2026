import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import { MotionConfig } from 'motion/react'

import { NotFoundPage } from '@/routes/-not-found/NotFoundPage'
import { Footer } from '@/shared/components/Footer'
import { Header } from '@/shared/components/Header'
import { MouseFollower } from '@/shared/components/MouseFollower'
import { SITE_TITLE } from '@/shared/constants/site'
import { useCanonicalLink } from '@/shared/hooks/useCanonicalLink'
import { useScrambledDocumentTitle } from '@/shared/hooks/useScrambledDocumentTitle'
import { useTitleWave } from '@/shared/hooks/useTitleWave'

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})

function RootLayout() {
  const documentTitle = useRouterState({
    select: (state) => {
      const routeTitle = [...state.matches]
        .reverse()
        .flatMap((match) => match.meta ?? [])
        .find((tag) => tag?.title)?.title

      return routeTitle ?? SITE_TITLE
    },
  })

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  useCanonicalLink(pathname)
  useScrambledDocumentTitle(documentTitle)
  useTitleWave(documentTitle)

  return (
    <MotionConfig reducedMotion='user'>
      <a
        href='#main'
        className='focus:bg-elevated focus:border-border sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:border focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:tracking-widest focus:uppercase'
      >
        Skip to content
      </a>
      <Header />
      <MouseFollower />
      <main id='main' className='mx-auto min-h-screen max-w-300 px-2 md:px-8'>
        <Outlet />
      </main>
      <Footer />
      <Analytics />
    </MotionConfig>
  )
}
