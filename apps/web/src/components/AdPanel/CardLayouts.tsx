import { getPortalRoot, useMatchBreakpoints } from '@pancakeswap/uikit'
import { createPortal } from 'react-dom'
import { TitleContentAd } from './Variations/TitleContentAd'

/**
 * Renders floating Ad banners on desktop
 */
export const DesktopCard = () => {
  const portalRoot = getPortalRoot()
  const { isDesktop } = useMatchBreakpoints()

  return portalRoot && isDesktop ? createPortal(<TitleContentAd />, portalRoot) : null
}

/**
 * Renders Ad banners on mobile and tablet
 */
export const MobileCard = () => {
  const { isDesktop } = useMatchBreakpoints()
  return !isDesktop ? <TitleContentAd /> : null
}
