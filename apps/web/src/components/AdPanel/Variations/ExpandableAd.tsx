import { Box, Flex, Modal, ModalV2, Text, useMatchBreakpoints, useModalV2 } from '@pancakeswap/uikit'
import { useLayoutEffect, useMemo, useRef } from 'react'
import { styled } from 'styled-components'
import { BodyText } from '../BodyText'
import { ExpandButton } from '../Button'
import { AdCard } from '../Card'
import { FAQ } from '../FAQ'
import { Title } from '../Title'
import { AdPlayerProps } from '../types'
import { useIsSlideExpanded } from '../useIsSlideExpanded'

export const Divider = styled(Box)`
  width: calc(100% + 32px);
  background-color: ${({ theme }) => theme.colors.cardBorder};
  height: 1px;
  margin-left: -16px;
`

// Unique id for this slide
const adId = 'expandable-ad'
const title = 'Quick Start on How to Swap'

const ExpandedContent = () => {
  return <FAQ />
}

export const ExpandableAd = (props: AdPlayerProps) => {
  const { isOpen, onDismiss, setIsOpen } = useModalV2()
  const { isDesktop } = useMatchBreakpoints()
  const { slideExpanded, toggleSlideExpanded } = useIsSlideExpanded()
  const extendedRef = useRef<HTMLDivElement>(null)
  const adCardRef = useRef<HTMLDivElement>(null)

  const isMobile = useMemo(() => props.forceMobile || !isDesktop, [props.forceMobile, isDesktop])

  const isExpanded = useMemo(() => {
    return !isMobile ? slideExpanded[adId] || false : false
  }, [isMobile, slideExpanded])

  const handleExpand = () => {
    toggleSlideExpanded(adId, true)
    if (isMobile) setIsOpen(true)
  }

  const handleDismiss = () => {
    toggleSlideExpanded(adId, false)
    onDismiss()
  }

  useLayoutEffect(() => {
    if (isExpanded && extendedRef.current && adCardRef.current) {
      const targetCard = adCardRef.current
      targetCard.style.overflow = `hidden`
      const { scrollHeight } = extendedRef.current
      targetCard.style.height = `${scrollHeight + 100}px`
      setTimeout(() => {
        targetCard.style.height = `auto`
      }, 300)
    } else if (!isExpanded && adCardRef.current) {
      const targetCard = adCardRef.current
      targetCard.style.height = `164px`
      targetCard.style.overflow = ``
    }
  }, [isExpanded])

  return (
    <AdCard imageUrl="/images/adpanel-test/bannerImg1.png" isExpanded={isExpanded} {...props} ref={adCardRef}>
      <Flex flexDirection="column" justifyContent="space-between" height="100%">
        {isExpanded ? (
          <Box ref={extendedRef}>
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
        <Modal title={title} onDismiss={handleDismiss} maxWidth={isDesktop ? '438px' : 'unset'}>
          <ExpandedContent />
        </Modal>
      </ModalV2>
    </AdCard>
  )
}
