import { Box, CloseIcon, Flex, IconButton, Image } from '@pancakeswap/uikit'
import styled from 'styled-components'

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

const CloseButtonContainer = styled(Box)`
  position: absolute;
  top: -4px;
  right: 0;

  z-index: 3;
`

const StyledIconButton = styled(IconButton).attrs({ variant: 'text' })`
  height: 12px;
  width: 12px !important;
  padding: 12px;
  color: ${({ theme }) => theme.colors.textSubtle};
  transition: all 0.4s;

  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.colors.textSubtle};
  }
`

interface AdCardProps {
  children?: React.ReactNode
  imageUrl?: string
  alt?: string
}

export const AdCard = ({ children, imageUrl, alt }: AdCardProps) => {
  // Drag handle, Slider and other slots will come here
  return (
    <BaseCard>
      <Content>{children}</Content>
      <GraphicsContainer>
        <CloseButtonContainer>
          <StyledIconButton aria-label="Close the Ad banner">
            <CloseIcon color="inherit" />
          </StyledIconButton>
        </CloseButtonContainer>
        <Image src={imageUrl} alt={alt || 'Ad Image'} width={207} height={188} />
      </GraphicsContainer>
    </BaseCard>
  )
}
