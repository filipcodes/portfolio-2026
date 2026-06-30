import { createFileRoute } from '@tanstack/react-router'

import { HeroSection } from '@/routes/-home/components/HeroSection'
import { WorkSection } from '@/routes/-home/components/WorkSection'
import { WritingSection } from '@/routes/-home/components/WritingSection'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className='space-y-48'>
      <HeroSection />
      <WritingSection />
      <WorkSection />
    </div>
  )
}
