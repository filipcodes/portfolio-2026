import { createRootRoute, Outlet } from '@tanstack/react-router'

import { Footer } from '@/shared/components/Footer'
import { Header } from '@/shared/components/Header'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <>
      <Header />
      <main className='mx-auto max-w-300 px-2 md:px-8'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
