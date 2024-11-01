import { getPortalRoot, useMatchBreakpoints } from '@pancakeswap/uikit'
import { createPortal } from 'react-dom'
import { TitleAd } from './Variations/TitleAd'

/**
 * Renders floating Ad banners on desktop
 */
export const DesktopCard = () => {
  const portalRoot = getPortalRoot()
  const { isDesktop } = useMatchBreakpoints()

  return portalRoot && isDesktop ? createPortal(<TitleAd />, portalRoot) : null
}

/**
 * Renders Ad banners on mobile and tablet
 */
export const MobileCard = () => {
  const { isDesktop } = useMatchBreakpoints()
  return !isDesktop ? <TitleAd /> : null
}
