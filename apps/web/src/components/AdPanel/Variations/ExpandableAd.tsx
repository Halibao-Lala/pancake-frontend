import { Box, Flex, Modal, ModalV2, Text, useMatchBreakpoints, useModalV2 } from '@pancakeswap/uikit'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { styled } from 'styled-components'
import { BodyText } from '../BodyText'
import { ExpandButton } from '../Button'
import { AdCard } from '../Card'
import { FAQ } from '../FAQ'
import { Title } from '../Title'
import { AdPlayerProps } from '../types'
import { useIsSlideExpanded } from '../useIsSlideExpanded'

export const Divider = styled(Box)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.cardBorder};
  height: 1px;
`

const ActionContainer = styled(Flex)<{ $isExpanded?: boolean }>`
  ${({ theme, $isExpanded }) =>
    $isExpanded &&
    `
      
      border-top: 1px solid ${theme.colors.cardBorder};
  `}
`

// Unique id for this expandable slide
const adId = 'expandable-ad'
const title = 'Quick Start on How to Swap'

const ExpandedContent = () => {
  return <FAQ type="swap" />
}

export const ExpandableAd = (props: AdPlayerProps) => {
  const { isOpen, onDismiss, setIsOpen } = useModalV2()
  const { isDesktop } = useMatchBreakpoints()
  const { slideExpanded, setSlideExpanded } = useIsSlideExpanded()
  const extendedRef = useRef<HTMLDivElement>(null)
  const adCardRef = useRef<HTMLDivElement>(null)
  const actionPanelRef = useRef<HTMLDivElement>(null)

  const isMobile = useMemo(() => props.forceMobile || !isDesktop, [props.forceMobile, isDesktop])

  const isExpanded = useMemo(() => {
    return !isMobile ? slideExpanded[adId] || false : false
  }, [isMobile, slideExpanded])

  const handleExpand = () => {
    setSlideExpanded(adId, true)
    if (isMobile) setIsOpen(true)
  }

  const handleDismiss = () => {
    setSlideExpanded(adId, false)
    onDismiss()
  }

  useEffect(() => {
    if (isExpanded && extendedRef.current && adCardRef.current && actionPanelRef.current) {
      const targetCard = adCardRef.current

      const contentPanelHeight = extendedRef.current.scrollHeight - 13
      const actionPanelHeight = actionPanelRef.current.scrollHeight || 64

      targetCard.style.height = `${contentPanelHeight + actionPanelHeight}px`
    } else if (!isExpanded && adCardRef.current) {
      const targetCard = adCardRef.current
      targetCard.style.height = `164px`
    }
  }, [isExpanded])

  const toggleHeight = useCallback((isAuto: boolean, isExpend: boolean) => {
    const targetCard = adCardRef.current
    if (!targetCard || !isExpend) return
    targetCard.style.height = isAuto ? 'auto' : `${targetCard.offsetHeight}px`
  }, [])

  return (
    <AdCard imageUrl="/images/adpanel-test/bannerImg1.png" isExpanded={isExpanded} {...props} ref={adCardRef}>
      <Flex flexDirection="column" justifyContent="space-between" height="100%">
        {isExpanded ? (
          <Box ref={extendedRef} overflow="hidden">
            <Text bold as="h1" textAlign="center" p="16px">
              {title}
            </Text>
            <Divider />
            <Box p="16px">
              <ExpandedContent />
            </Box>
          </Box>
        ) : (
          <>
            <Title>Need Help?</Title>
            <BodyText>Quick start now on How to Swap!</BodyText>
          </>
        )}

        <ActionContainer ref={actionPanelRef} p={isExpanded ? '16px' : '0'} $isExpanded={isExpanded}>
          <ExpandButton
            mb={isExpanded ? '0' : '16px'}
            onClick={isExpanded ? handleDismiss : handleExpand}
            isExpanded={isExpanded}
            onMouseOver={() => toggleHeight(false, isExpanded)}
            onMouseOut={() => toggleHeight(true, isExpanded)}
          />
        </ActionContainer>
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
