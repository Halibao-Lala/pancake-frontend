import { useTranslation } from '@pancakeswap/localization'
import { useFourYearTotalVeCakeApr } from 'views/CakeStaking/hooks/useAPR'
import { AdButton } from '../Button'
import { AdCard } from '../Card'

import { BodyText } from '../BodyText'
import { AdPlayerProps } from '../types'
import { getAssetUrl } from '../utils'

const actionLink = 'https://docs.pancakeswap.finance/products/vecake'

export const AdCakeStaking = (props: AdPlayerProps) => {
  const { t } = useTranslation()
  const { totalApr } = useFourYearTotalVeCakeApr()

  return (
    <AdCard imageUrl={getAssetUrl('ad_pcs_v4.png')} {...props}>
      <BodyText mb="0">
        {t('Stake CAKE and Earn up to %apr%% APR !', {
          apr: totalApr.toFixed(2),
        })}
      </BodyText>

      <AdButton variant="text" href={actionLink} isExternal>
        {t('Learn More')}
      </AdButton>

      <AdButton mt="4px" href="/cake-staking" chevronRightIcon>
        {t('Stake Cake')}
      </AdButton>
    </AdCard>
  )
}
