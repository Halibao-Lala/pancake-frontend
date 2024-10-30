import { getPortalRoot, useMatchBreakpoints } from '@pancakeswap/uikit'
import { createPortal } from 'react-dom'
import { TitleAd } from './Variations/TitleAd'

export const DesktopCard = () => {
  const portalRoot = getPortalRoot()
  const { isMobile } = useMatchBreakpoints()

  return portalRoot && !isMobile ? createPortal(<TitleAd />, portalRoot) : null
}

export const MobileCard = () => {
  const { isMobile } = useMatchBreakpoints()
  return isMobile ? <TitleAd /> : null
}
