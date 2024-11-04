import { Box, getPortalRoot, useMatchBreakpoints } from '@pancakeswap/uikit'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { TitleContentAd } from './Variations/TitleContentAd'

const FloatingContainer = styled(Box)`
  position: fixed;
  bottom: 30px;
  right: 30px;
`

const MobileContainer = styled(Box)`
  border: 1px solid red;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

/**
 * Renders floating Ad banners on desktop
 */
export const DesktopCard = () => {
  const portalRoot = getPortalRoot()
  const { isDesktop } = useMatchBreakpoints()

  return portalRoot && isDesktop
    ? createPortal(
        <FloatingContainer>
          <TitleContentAd />
        </FloatingContainer>,
        portalRoot,
      )
    : null
}

/**
 * Renders Ad banners on mobile and tablet
 */
export const MobileCard = () => {
  const { isDesktop } = useMatchBreakpoints()
  return !isDesktop ? (
    <MobileContainer>
      <TitleContentAd />
    </MobileContainer>
  ) : null
}
