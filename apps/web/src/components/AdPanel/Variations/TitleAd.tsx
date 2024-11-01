import { AdButton } from '../Button'
import { AdCard } from '../Card'
import { Title } from '../Title'

export const TitleAd = () => {
  return (
    <AdCard imageUrl="/images/adpanel-test/bannerImg1.png">
      <Title>Enjoy Gas-Free Transactions on zkSync PancakeSwap</Title>

      <AdButton>Quick start</AdButton>
    </AdCard>
  )
}
