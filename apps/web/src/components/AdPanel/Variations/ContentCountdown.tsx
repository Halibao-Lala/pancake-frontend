import { BodyText } from '../BodyText'
import { AdButton } from '../Button'
import { AdCard } from '../Card'
import { Countdown } from '../Countdown'

export const ContentCountdown = () => {
  return (
    <AdCard imageUrl="/images/adpanel-test/bannerImg3.png">
      <BodyText mb="8px">PancakeSwap Meetup in Turkey starts in:</BodyText>

      <Countdown
        targetTime={1730974493}
        primaryColor="#F4D2D4"
        background="linear-gradient(to bottom, #71151A, #C23D46)"
        color="white"
        mb="6px"
      />

      <AdButton variant="text" isExternal>
        Learn More
      </AdButton>
    </AdCard>
  )
}
