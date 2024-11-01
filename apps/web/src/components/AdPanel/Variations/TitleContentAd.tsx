import { AdButton } from '../Button'
import { AdCard } from '../Card'
import { Content } from '../Content'
import { Title } from '../Title'

export const TitleContentAd = () => {
  return (
    <AdCard imageUrl="/images/adpanel-test/bannerImg1.png">
      <Title>Need Help?</Title>
      <Content>Quick start now on How to Swap!</Content>

      <AdButton isExternal>Quick start</AdButton>
    </AdCard>
  )
}
