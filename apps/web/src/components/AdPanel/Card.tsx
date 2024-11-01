import { Box, Flex, Image } from '@pancakeswap/uikit'
import styled from 'styled-components'

const BaseCard = styled(Box)`
  position: fixed;
  bottom: 30px;
  right: 30px;
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
  z-index: 2;
  display: flex;
  flex-direction: column;
`

const PositionedImage = styled(Image)`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
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
      <PositionedImage src={imageUrl} alt={alt || 'Ad'} width={207} height={188} />
    </BaseCard>
  )
}
