import { useTranslation } from '@pancakeswap/localization'
import { BodyText } from '../BodyText'
import { AdButton } from '../Button'
import { AdCard } from '../Card'

import { AdPlayerProps } from '../types'
import { getAssetUrl } from '../utils'

const whitepaperLink =
  'https://github.com/pancakeswap/pancake-v4-core/blob/main/docs/whitepaper-en.pdf?utm_source=homepagebanner&utm_medium=banner&utm_campaign=homepagebanner&utm_id=v4whitepaper'
const learnMoreLink =
  'https://developer.pancakeswap.finance/?utm_source=homepagebanner&utm_medium=banner&utm_campaign=homepagebanner&utm_id=Startbuilding'

export const AdV4 = (props: AdPlayerProps) => {
  const { t } = useTranslation()

  return (
    <AdCard imageUrl={getAssetUrl('ad_pcs_v4.png')} {...props}>
      <BodyText mb="0">{t('Introducing PancakeSwap v4')}</BodyText>

      <AdButton variant="text" href={whitepaperLink} isExternal>
        {t('Read Whitepaper')}
      </AdButton>

      <AdButton mt="4px" href={learnMoreLink} isExternal externalIcon>
        {t('Start Building')}
      </AdButton>
    </AdCard>
  )
}
