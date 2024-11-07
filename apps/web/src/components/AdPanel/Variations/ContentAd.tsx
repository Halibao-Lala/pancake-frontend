import { BodyText } from '../BodyText'
import { AdButton } from '../Button'
import { AdCard } from '../Card'
import { AdPlayerProps } from '../types'

export const ContentAd = (props: AdPlayerProps) => {
  return (
    <AdCard imageUrl="/images/adpanel-test/bannerImg2.png" {...props}>
      <BodyText fontSize="15px">Web3 Notifications Now Live!!</BodyText>

      <AdButton mt="20px" variant="text" isExternal>
        Learn More
      </AdButton>
    </AdCard>
  )
}
