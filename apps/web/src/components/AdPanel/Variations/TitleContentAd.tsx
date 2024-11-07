import { BodyText } from '../BodyText'
import { AdButton } from '../Button'
import { AdCard } from '../Card'
import { Title } from '../Title'
import { AdPlayerProps } from '../types'

export const TitleContentAd = (props: AdPlayerProps) => {
  return (
    <AdCard imageUrl="/images/adpanel-test/bannerImg1.png" {...props}>
      <Title>Need Help?</Title>
      <BodyText>Quick start now on How to Swap!</BodyText>

      <AdButton isExternal>Quick start</AdButton>
    </AdCard>
  )
}
