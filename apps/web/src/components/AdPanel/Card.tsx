import { Box, CloseIcon, Flex, IconButton, Image, useMatchBreakpoints } from '@pancakeswap/uikit'
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

const BaseCard = styled(Box)`
  position: relative;
  padding: 16px;
  width: 328px;
  height: 164px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

const Content = styled(Flex)`
  position: relative;
  width: 148px;
  height: 110px;
  display: flex;
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
  top: ${({ $isMobile }) => ($isMobile ? '30px' : '-4px')};

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

  floatingImage?: {
    url: string
    width?: number
    height?: number
  }
}

export const AdCard = ({ children, imageUrl, floatingImage, alt }: AdCardProps) => {
  // Drag handle, Slider and other slots will come here
  const { isDesktop } = useMatchBreakpoints()
  const [, setShowAdPanel] = useShowAdPanel()

  return (
    <BaseCard>
      <Content>{children}</Content>
      <GraphicsContainer>
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

        {imageUrl && <Image src={imageUrl} alt={alt || 'Ad Image'} width={207} height={188} />}
        {floatingImage && (
          <FloatingGraphic
            src={floatingImage.url}
            width={floatingImage.width || 40}
            height={floatingImage.height || 40}
          />
        )}
      </GraphicsContainer>
    </BaseCard>
  )
}
