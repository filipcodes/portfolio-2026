import {
  differenceInDays,
  endOfYear,
  getDay,
  startOfYear,
  subMonths,
} from 'date-fns'
import { useState } from 'react'

const GITHUB_GRAPH_SCOPE_OPTION = {
  MONTH: 'MONTH',
  YEAR: 'YEAR',
  YTD: 'YTD',
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

export function GithubGraph() {
  const [scope, setScope] = useState<GithubGraphScopeOption>('MONTH')
  const now = new Date()
  const { start, end } = RANGE_BY_SCOPE[scope](now)
  const squareCount = differenceInDays(end, start) + 1
  const padding = getDay(start)
  const todayIndex = differenceInDays(now, start)

  return (
    <>
      <div>
        {scope}

        <div className='flex gap-4'>
          {Object.values(GITHUB_GRAPH_SCOPE_OPTION).map((option) => {
            return (
              <button
                className='rounded-md bg-gray-500 p-1'
                onClick={() => {
                  setScope(option)
                }}
                key={option}
              >
                {option}
              </button>
            )
          })}
        </div>
      </div>

      <div className='w-full overflow-x-scroll'>
        <div className='grid w-min grid-flow-col grid-rows-7 gap-0.5 p-2'>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((name) => {
            return (
              <div className='text-xs' key={name}>
                {name}
              </div>
            )
          })}

          {Array.from({ length: padding }, (_, i) => {
            return <div key={i} />
          })}

          {Array.from({ length: squareCount }, (_, i) => {
            return (
              <button
                onClick={() => {
                  console.error('Hello World!')
                }}
                className={`grid aspect-square h-4 place-items-center rounded-xs bg-gray-500 ${i === todayIndex ? 'ring-1' : 'bg-gray-500'}`}
                key={i}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
