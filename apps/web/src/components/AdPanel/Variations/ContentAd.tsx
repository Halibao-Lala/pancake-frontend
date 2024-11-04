import { AdButton } from '../Button'
import { AdCard } from '../Card'
import { Content } from '../Content'

export const ContentAd = () => {
  return (
    <AdCard imageUrl="/images/adpanel-test/bannerImg1.png">
      <Content>PancakeSwap Prediction Telegram Bot is now live!</Content>

      <AdButton isExternal>Play Now!</AdButton>
    </AdCard>
  )
}
