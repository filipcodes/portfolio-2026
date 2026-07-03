import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
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
      <Header />
      <MouseFollower />
      <main className='mx-auto min-h-screen max-w-300 px-2 md:px-8'>
        <Outlet />
      </main>
      <Footer />
    </MotionConfig>
  )
}
