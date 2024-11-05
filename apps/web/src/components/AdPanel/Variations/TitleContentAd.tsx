import { BodyText } from '../BodyText'
import { AdButton } from '../Button'
import { AdCard } from '../Card'
import { Title } from '../Title'

export const TitleContentAd = () => {
  return (
    <AdCard
      imageUrl="/images/adpanel-test/bannerImg1.png"
      floatingImage={{ url: '/images/adpanel-test/floatingImg1.png' }}
    >
      <Title>Need Help?</Title>
      <BodyText>Quick start now on How to Swap!</BodyText>

      <AdButton isExternal>Quick start</AdButton>
    </AdCard>
  )
}
