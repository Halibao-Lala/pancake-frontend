import { useTranslation } from '@pancakeswap/localization'
import { Flex } from '@pancakeswap/uikit'
import { useRouter } from 'next/router'
import { BodyText } from '../BodyText'
import { AdButton } from '../Button'
import { AdCard } from '../Card'
import { ExpandableActions } from '../Expandable/ExpandableActions'
import { ExpandableContent } from '../Expandable/ExpandableContent'
import { ExpandableModal } from '../Expandable/ExpandableModal'
import { useExpandableCard } from '../Expandable/useExpandableCard'
import { FAQ } from '../FAQ'
import { faqTypeByPage } from '../FAQ/config'
import { useFaqConfig } from '../FAQ/useFaqConfig'
import { Title } from '../Title'
import { AdPlayerProps } from '../types'

const ExpandedContent: React.FC = () => {
  const router = useRouter()
  return <FAQ type={faqTypeByPage[router.pathname]} />
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

  const { title, subtitle, imageUrl } = useFaqConfig()(t)

  const actionButton = (
    <AdButton externalIcon isExternalLink>
      {t('View Details in Docs')}
    </AdButton>
  )

  return (
    <AdCard imageUrl={imageUrl} isExpanded={isExpanded} {...props} ref={adCardRef}>
      <Flex flexDirection="column" justifyContent="space-between" height="100%">
        <ExpandableContent
          title={title}
          extendedContentRef={extendedContentRef}
          isExpanded={isExpanded}
          expandableContent={<ExpandedContent />}
          defaultContent={
            <>
              <Title>{subtitle}</Title>
              <BodyText>{title}</BodyText>
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
