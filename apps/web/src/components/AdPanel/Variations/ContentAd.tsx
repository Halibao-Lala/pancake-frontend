import { BodyText } from '../BodyText'
import { AdButton } from '../Button'
import { AdCard } from '../Card'

export const ContentAd = () => {
  return (
    <AdCard imageUrl="/images/adpanel-test/bannerImg2.png">
      <BodyText fontSize="15px">Web3 Notifications Now Live!!</BodyText>

      <AdButton variant="text" isExternal>
        Learn More
      </AdButton>
    </AdCard>
  )
}
