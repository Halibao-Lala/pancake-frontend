import { Box, Flex, Modal, ModalV2, Text, useMatchBreakpoints, useModalV2 } from '@pancakeswap/uikit'
import { styled } from 'styled-components'
import { BodyText } from '../BodyText'
import { ExpandButton } from '../Button'
import { AdCard } from '../Card'
import { FAQ } from '../FAQ'
import { Title } from '../Title'
import { useIsSlideExpanded } from '../useIsSlideExpanded'

export const Divider = styled(Box)`
  width: calc(100% + 32px);
  background-color: ${({ theme }) => theme.colors.cardBorder};
  height: 1px;
  margin-left: -16px;
`

const accordianItems = []

// Unique id for this slide
const adId = 'expandable-ad'
const title = 'Quick Start on How to Swap'

const ExpandedContent = () => {
  return <FAQ />
}

export const ExpandableAd = () => {
  const { isOpen, onDismiss, setIsOpen } = useModalV2()
  const { isDesktop } = useMatchBreakpoints()
  const { slideExpanded, toggleSlideExpanded } = useIsSlideExpanded()

  const isExpanded = isDesktop ? slideExpanded[adId] || false : false

  const handleExpand = () => {
    toggleSlideExpanded(adId, true)
    if (!isDesktop) setIsOpen(true)
  }

  const handleDismiss = () => {
    toggleSlideExpanded(adId, false)
    onDismiss()
  }

  return (
    <AdCard imageUrl="/images/adpanel-test/bannerImg1.png" isExpanded={isExpanded}>
      <Flex flexDirection="column" justifyContent="space-between" height="100%">
        {isExpanded ? (
          <Box>
            <Text bold as="h1" textAlign="center">
              {title}
            </Text>
            <Divider mt="16px" mb="16px" />
            <ExpandedContent />
          </Box>
        ) : (
          <>
            <Title>Need Help?</Title>
            <BodyText>Quick start now on How to Swap!</BodyText>
          </>
        )}
        {isExpanded && <Divider mt="16px" mb="16px" />}
        <ExpandButton
          mb={isExpanded ? '0' : '16px'}
          onClick={isExpanded ? handleDismiss : handleExpand}
          isExpanded={isExpanded}
        />
      </Flex>

      {/* On Non-Desktop devices, show expanded content in modal */}
      <ModalV2 isOpen={isOpen} onDismiss={handleDismiss} closeOnOverlayClick>
        <Modal title={title} onDismiss={handleDismiss}>
          <ExpandedContent />
        </Modal>
      </ModalV2>
    </AdCard>
  )
}
