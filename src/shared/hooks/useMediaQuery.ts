import { useSyncExternalStore } from 'react'

export const MEDIA_QUERY = {
  DESKTOP: '(min-width: 48rem)',
} as const

export function useMediaQuery(query: string) {
  const subscribe = (onStoreChange: () => void) => {
    const mediaQueryList = window.matchMedia(query)
    mediaQueryList.addEventListener('change', onStoreChange)

    return () => {
      mediaQueryList.removeEventListener('change', onStoreChange)
    }
  }

  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches)
}
