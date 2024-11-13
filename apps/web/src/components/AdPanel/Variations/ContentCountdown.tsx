import { BodyText } from '../BodyText'
import { AdButton } from '../Button'
import { AdCard } from '../Card'
import { Countdown } from '../Countdown'
import { AdPlayerProps } from '../types'
import { getImageUrl } from '../utils'

export const ContentCountdown = (props: AdPlayerProps) => {
  return (
    <AdCard imageUrl={getImageUrl('bannerImg3.png')} {...props}>
      <BodyText mb="8px">PancakeSwap Meetup in Turkey starts in:</BodyText>

      <Countdown
        targetTime={1731997322}
        subtleColor="#F4D2D4"
        background="linear-gradient(180deg, #EC474D 0%, #B42014 100%)"
        color="white"
        mb="8px"
      />

      <AdButton variant="text" isExternalLink>
        Learn More
      </AdButton>
    </AdCard>
  )
}
