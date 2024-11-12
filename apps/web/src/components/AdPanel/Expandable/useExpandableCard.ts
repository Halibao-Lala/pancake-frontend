import { useMatchBreakpoints, useModalV2 } from '@pancakeswap/uikit'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useIsSlideExpanded } from '../useIsSlideExpanded'

interface UseExpandableCardProps {
  /** Id unique to this expandable card */
  adId: string
  forceMobile?: boolean
}

export const useExpandableCard = ({ adId, forceMobile }: UseExpandableCardProps) => {
  const { slideExpanded, setSlideExpanded } = useIsSlideExpanded()
  const { isDesktop } = useMatchBreakpoints()
  const { isOpen, onDismiss, setIsOpen } = useModalV2()

  const extendedContentRef = useRef<HTMLDivElement>(null)
  const adCardRef = useRef<HTMLDivElement>(null)
  const actionPanelRef = useRef<HTMLDivElement>(null)

  const isMobile = useMemo(() => forceMobile || !isDesktop, [forceMobile, isDesktop])

  const isExpanded = useMemo(() => {
    return !isMobile ? slideExpanded[adId] || false : false
  }, [adId, isMobile, slideExpanded])

  const handleExpand = useCallback(() => {
    setSlideExpanded(adId, true)
    if (isMobile) setIsOpen(true)
  }, [adId, isMobile, setIsOpen, setSlideExpanded])

  const handleDismiss = useCallback(() => {
    setSlideExpanded(adId, false)
    onDismiss()
  }, [adId, onDismiss, setSlideExpanded])

  const toggleHeight = useCallback((isAuto: boolean, isExpend: boolean) => {
    const targetCard = adCardRef.current
    if (!targetCard || !isExpend) return
    targetCard.style.height = isAuto ? 'auto' : `${targetCard.offsetHeight}px`
  }, [])

  useEffect(() => {
    if (isExpanded && extendedContentRef.current && adCardRef.current && actionPanelRef.current) {
      const targetCard = adCardRef.current
      const contentPanelHeight = extendedContentRef.current.scrollHeight - 13
      const actionPanelHeight = actionPanelRef.current.scrollHeight || 64
      targetCard.style.height = `${contentPanelHeight + actionPanelHeight}px`
    } else if (!isExpanded && adCardRef.current) {
      const targetCard = adCardRef.current
      targetCard.style.height = `164px`
    }
  }, [isExpanded])

  return {
    isExpanded,
    isOpen,
    extendedContentRef,
    adCardRef,
    actionPanelRef,
    handleExpand,
    handleDismiss,
    toggleHeight,
  }
}
