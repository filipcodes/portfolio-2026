import { createRootRoute, Outlet } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { Footer } from '@/shared/components/Footer'
import { Header } from '@/shared/components/Header'
import { MouseFollower } from '@/shared/components/MouseFollower'
import { useScrambledDocumentTitle } from '@/shared/hooks/useScrambledDocumentTitle'
import { useTitleWave } from '@/shared/hooks/useTitleWave'

const SITE_TITLE = 'Filip Sipos · Senior Full-Stack Software Engineer'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  useScrambledDocumentTitle(SITE_TITLE)
  useTitleWave(SITE_TITLE)

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
