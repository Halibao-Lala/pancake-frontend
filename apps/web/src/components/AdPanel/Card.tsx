import { Box, Flex, Image } from '@pancakeswap/uikit'
import styled from 'styled-components'

const BaseCard = styled(Box)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  border: 2px solid red;
  width: 326px;
  height: 188px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.default};
`

const Content = styled(Flex)`
  max-width: 119px;
`

const PositionedImage = styled(Image)`
  position: absolute;
  top: 0;
  right: 0;
`

interface AdCardProps {
  children?: React.ReactNode
  imageUrl?: string
  alt?: string
}

export const AdCard = ({ children, imageUrl, alt }: AdCardProps) => {
  // Drag handle and other slots will come here as well
  return (
    <BaseCard>
      <Content>{children}</Content>
      <PositionedImage src={imageUrl} alt={alt || 'Ad'} width={207} height={188} />
    </BaseCard>
  )
}
