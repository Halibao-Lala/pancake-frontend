import { Box, CloseIcon, Flex, IconButton, Image, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { useShowAdPanel } from './useShowAdPanel'

const flyingAnim = keyframes`
  0% {
    transform: translate(0,  0);
  }
  50% {
    transform: translate(-5px, 5px);
  }
  100% {
    transform: translate(0, 0);
  }
`

const BaseCard = styled(Box)<{ $isExpanded?: boolean }>`
  position: relative;
  padding: 16px;
  width: 328px;
  height: 164px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};

  ${({ $isExpanded }) =>
    $isExpanded &&
    `
    height: 453px;
  `}
`

const Content = styled(Flex)`
  position: relative;
  width: 148px;
  height: 110px;

  flex-direction: column;
  justify-content: space-between;

  z-index: 2;
`

const GraphicsContainer = styled(Box)`
  position: absolute;
  bottom: -2px;
  right: -1px;

  width: 207px;
  height: 188px;

  z-index: 1;
`

const FloatingGraphic = styled(Image)`
  position: absolute;
  top: 0;
  right: 160px;

  animation: ${flyingAnim} 2.5s ease-in-out infinite;
`

const CloseButtonContainer = styled(Box)<{ $isMobile?: boolean }>`
  position: absolute;
  border-radius: 100%;
  z-index: 3;

  right: ${({ $isMobile }) => ($isMobile ? '8px' : '0')};
  top: ${({ $isMobile }) => ($isMobile ? '8px' : '-28px')};

  ${({ theme, $isMobile }) => $isMobile && `background-color: ${theme.colors.card};`}
`

const StyledIconButton = styled(IconButton).attrs({ variant: 'text' })`
  height: 12px;
  width: 12px !important;
  padding: 12px;
  transition: all 0.4s;
  color: ${({ theme }) => theme.colors.textSubtle};

  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.colors.textSubtle};
  }
`

interface AdCardProps {
  children?: React.ReactNode
  imageUrl?: string
  alt?: string

  isExpanded?: boolean
}

export const AdCard = ({ children, imageUrl, alt, isExpanded }: AdCardProps) => {
  const imageRef = useRef<HTMLImageElement>(null)

  // Drag handle, Slider and other slots will come here
  const { isDesktop } = useMatchBreakpoints()
  const [, setShowAdPanel] = useShowAdPanel()

  useEffect(() => {
    if (imageRef.current) {
      if (isExpanded)
        imageRef.current.animate([{ opacity: 0 }], {
          duration: 250,
          fill: 'forwards',
        })
      else
        imageRef.current.animate([{ opacity: 1 }], {
          duration: 250,
          fill: 'forwards',
        })
    }
  }, [imageRef, isExpanded])

  return (
    <BaseCard $isExpanded={isExpanded}>
      <Content>{children}</Content>
      <CloseButtonContainer
        $isMobile={!isDesktop}
        onClick={() => setShowAdPanel(false)}
        role="button"
        aria-label="Close Ad Panel"
      >
        <StyledIconButton aria-label="Close the Ad banner">
          <CloseIcon color="inherit" />
        </StyledIconButton>
      </CloseButtonContainer>
      <GraphicsContainer>
        {imageUrl && <img ref={imageRef} src={imageUrl} alt={alt || 'Ad Image'} width={207} height={188} />}
      </GraphicsContainer>
    </BaseCard>
  )
}
