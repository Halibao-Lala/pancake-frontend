import { useTranslation } from '@pancakeswap/localization'
import { BodyText } from '../BodyText'
import { AdButton } from '../Button'
import { AdCard } from '../Card'

import { AdPlayerProps } from '../types'
import { getAssetUrl } from '../utils'

const actionLink = 'https://four.meme/'

export const AdRocker = (props: AdPlayerProps) => {
  const { t } = useTranslation()

  return (
    <AdCard imageUrl={getAssetUrl('ad_rocker_meme_career.png')} {...props}>
      <BodyText>{t('Rocker launching your meme career')}</BodyText>

      <AdButton mt="20px" href={actionLink} externalIcon isExternal>
        {t('Learn More')}
      </AdButton>
    </AdCard>
  )
}
