import { useTranslation } from '@pancakeswap/localization'
import { Flex } from '@pancakeswap/uikit'
import { BodyText } from '../BodyText'
import { ExpandButton } from '../Button'
import { AdCard } from '../Card'
import { ExpandableContent } from '../Expandable/ExpandableContent'
import { ExpandableModal } from '../Expandable/ExpandableModal'
import { ActionContainer } from '../Expandable/styles'
import { useExpandableCard } from '../Expandable/useExpandableCard'
import { FAQ } from '../FAQ'
import { Title } from '../Title'
import { AdPlayerProps } from '../types'

const ExpandedContent = () => {
  return <FAQ type="swap" />
}

export const ExpandableAd = (props: AdPlayerProps) => {
  const { t } = useTranslation()
  const {
    actionPanelRef,
    adCardRef,
    extendedContentRef,
    handleDismiss,
    handleExpand,
    isOpen,
    isExpanded,
    toggleHeight,
  } = useExpandableCard({
    adId: 'expandable-ad',
    forceMobile: props.forceMobile,
  })

  const title = t('Quick Start on How to Swap')

  return (
    <AdCard imageUrl="/images/adpanel-test/bannerImg1.png" isExpanded={isExpanded} {...props} ref={adCardRef}>
      <Flex flexDirection="column" justifyContent="space-between" height="100%">
        <ExpandableContent
          title={title}
          extendedContentRef={extendedContentRef}
          isExpanded={isExpanded}
          expandableContent={<ExpandedContent />}
          defaultContent={
            <>
              <Title>{t('Need Help?')}</Title>
              <BodyText>{t('Quick start now on How to Swap!')}</BodyText>
            </>
          }
        />

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
      <ExpandableModal
        title={title}
        isOpen={isOpen}
        onDismiss={handleDismiss}
        expandableContent={<ExpandedContent />}
      />
    </AdCard>
  )
}
