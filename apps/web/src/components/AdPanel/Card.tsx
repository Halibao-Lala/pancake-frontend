import { Box, getPortalRoot, useMatchBreakpoints } from '@pancakeswap/uikit'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const BaseCard = styled(Box)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: 2px solid red;
  width: 200px;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.default};
`

interface CardProps {
  children?: React.ReactNode
}

const AdCard = ({ children }: CardProps) => {
  // Drag handle and other slots will come here as well
  return <BaseCard>ADPANEL CARD{children}</BaseCard>
}

export const DesktopCard = () => {
  const portalRoot = getPortalRoot()
  const { isMobile } = useMatchBreakpoints()

  return portalRoot && !isMobile ? createPortal(<AdCard />, portalRoot) : null
}

export const MobileCard = () => {
  const { isMobile } = useMatchBreakpoints()
  return isMobile ? <AdCard /> : null
}
