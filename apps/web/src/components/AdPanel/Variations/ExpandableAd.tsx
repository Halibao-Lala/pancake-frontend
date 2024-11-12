import { useTranslation } from '@pancakeswap/localization'
import { Flex } from '@pancakeswap/uikit'
import { BodyText } from '../BodyText'
import { AdButton } from '../Button'
import { AdCard } from '../Card'
import { ExpandableActions } from '../Expandable/ExpandableActions'
import { ExpandableContent } from '../Expandable/ExpandableContent'
import { ExpandableModal } from '../Expandable/ExpandableModal'
import { useExpandableCard } from '../Expandable/useExpandableCard'
import { FAQ } from '../FAQ'
import { Title } from '../Title'
import { AdPlayerProps } from '../types'
import { getImageUrl } from '../utils'

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
  const actionButton = (
    <AdButton externalIcon isExternal>
      {t('View Details in Docs')}
    </AdButton>
  )

  return (
    <AdCard imageUrl={getImageUrl('bannerImg1.png')} isExpanded={isExpanded} {...props} ref={adCardRef}>
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

        <ExpandableActions
          isExpanded={isExpanded}
          actionPanelRef={actionPanelRef}
          actionButton={actionButton}
          handleDismiss={handleDismiss}
          handleExpand={handleExpand}
          toggleHeight={toggleHeight}
        />
      </Flex>

      {/* On Non-Desktop devices, show expanded content in modal */}
      <ExpandableModal
        title={title}
        isOpen={isOpen}
        onDismiss={handleDismiss}
        expandableContent={<ExpandedContent />}
        actionButton={actionButton}
      />
    </AdCard>
  )
}
