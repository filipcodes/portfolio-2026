import {
  addDays,
  differenceInDays,
  endOfYear,
  format,
  getDay,
  startOfYear,
  subMonths,
} from 'date-fns'
import { useState } from 'react'

import { Button } from '@/shared/components/Button'

const GITHUB_GRAPH_SCOPE_OPTION = {
  YEAR: 'YEAR',
  YTD: 'YTD',
  MONTH: 'MONTH',
} as const

type GithubGraphScopeOption =
  (typeof GITHUB_GRAPH_SCOPE_OPTION)[keyof typeof GITHUB_GRAPH_SCOPE_OPTION]

const RANGE_BY_SCOPE = {
  MONTH: (now: Date) => ({ start: subMonths(now, 1), end: now }),
  YEAR: (now: Date) => ({ start: startOfYear(now), end: endOfYear(now) }),
  YTD: (now: Date) => ({ start: startOfYear(now), end: now }),
} as const satisfies Record<
  GithubGraphScopeOption,
  (now: Date) => { start: Date; end: Date }
>

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const CELL_SIZE = 'h-3 w-3'
const COL_STAGGER_MS = 18

interface GithubGraphNodeProps {
  isToday: boolean
  col: number
}

function GithubGraphNode({ isToday, col }: GithubGraphNodeProps) {
  return (
    <div
      style={{ animationDelay: `${(col * COL_STAGGER_MS).toString()}ms` }}
      className={`${CELL_SIZE} animate-cell-in bg-elevated hover:bg-signal-dim rounded-xs ${
        isToday ? 'ring-signal ring-1 ring-inset' : ''
      }`}
    />
  )
}

export function GithubGraph() {
  const [scope, setScope] = useState<GithubGraphScopeOption>('YTD')

  // We keep one date per instance of this component to reduce "weird" edge-cases like a mismatch in IDs of the nodes if they were to compute their own Date
  const now = new Date()

  const { start, end } = RANGE_BY_SCOPE[scope](now)
  const padding = getDay(start)
  const dates = Array.from(
    { length: differenceInDays(end, start) + 1 },
    (_, i) => addDays(start, i),
  )
  const todayKey = format(now, 'yyyy-MM-dd')

  return (
    <div>
      <div className='flex gap-2 overflow-x-auto'>
        <div className='grid shrink-0 grid-rows-7 gap-1 pr-1'>
          {DAY_NAMES.map((name, idx) => (
            <div
              key={name}
              className='text-fg-subtle flex h-3 items-center justify-end font-mono text-[10px] leading-none'
            >
              {idx % 2 === 1 ? name : ''}
            </div>
          ))}
        </div>

        {/* Padding - Front - accounts for the days before a certain period */}
        <div key={scope} className='grid w-min grid-flow-col grid-rows-7 gap-1'>
          {Array.from({ length: padding }, (_, i) => (
            <div className={CELL_SIZE} key={i} />
          ))}

          {dates.map((date, i) => {
            const formattedDate = format(date, 'yyyy-MM-dd')

            return (
              <GithubGraphNode
                key={formattedDate}
                isToday={formattedDate === todayKey}
                col={Math.floor((i + padding) / 7)}
              />
            )
          })}
        </div>
      </div>

      <div className='mt-4 flex justify-center gap-3'>
        {Object.values(GITHUB_GRAPH_SCOPE_OPTION).map((option) => (
          <Button
            key={option}
            aria-pressed={option === scope}
            onClick={() => {
              setScope(option)
            }}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  )
}
