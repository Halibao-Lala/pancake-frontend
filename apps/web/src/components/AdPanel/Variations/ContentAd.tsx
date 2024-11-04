import { AdButton } from '../Button'
import { AdCard } from '../Card'
import { Content } from '../Content'

export const ContentAd = () => {
  return (
    <AdCard imageUrl="/images/adpanel-test/bannerImg2.png">
      <Content>Web3 Notifications Now Live!!</Content>

      <AdButton isExternal>Learn More</AdButton>
    </AdCard>
  )
}
