import { useState } from 'react'
import { BodyText } from '../BodyText'
import { ExpandButton } from '../Button'
import { AdCard } from '../Card'
import { Title } from '../Title'

const accordianItems = []

export const ExpandableAd = () => {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <AdCard imageUrl="/images/adpanel-test/bannerImg1.png" isExpanded={isExpanded}>
      <Title>Need Help?</Title>
      <BodyText>Quick start now on How to Swap!</BodyText>

      <ExpandButton onClick={() => setIsExpanded(!isExpanded)} isExpanded={isExpanded}>
        Details
      </ExpandButton>
    </AdCard>
  )
}
