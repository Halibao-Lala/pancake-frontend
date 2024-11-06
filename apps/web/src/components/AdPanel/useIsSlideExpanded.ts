import { atom, useAtom } from 'jotai'
import { useCallback, useMemo } from 'react'

// Mapping of ad ID to whether the ad is expanded
const slideExpandedAtom = atom<Record<string, boolean>>({})

export const useIsSlideExpanded = () => {
  const [slideExpanded, setSlideExpandedValue] = useAtom(slideExpandedAtom)

  const isAnySlideExpanded = useMemo(
    () => Object.values(slideExpanded).some((isExpanded) => isExpanded),
    [slideExpanded],
  )

  const toggleSlideExpanded = useCallback(
    (id: string, overrideValue?: boolean) => {
      setSlideExpandedValue((prev) => {
        return {
          ...prev,
          [id]: overrideValue || !prev[id],
        }
      })
    },
    [setSlideExpandedValue],
  )

  return { isAnySlideExpanded, slideExpanded, toggleSlideExpanded }
}
