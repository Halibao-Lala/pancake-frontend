import { AdCakeStaking } from './Ads/AdCakeStaking'
import { AdOptionsTrading } from './Ads/AdOptionsTrading'
import { AdQuests } from './Ads/AdQuests'
import { AdRocker } from './Ads/AdRocker'
import { AdV4 } from './Ads/AdV4'
import { ExpandableAd } from './Variations/ExpandableAd'

enum Priority {
  FIRST_AD = 6,
  VERY_HIGH = 5,
  HIGH = 4,
  MEDIUM = 3,
  LOW = 2,
  VERY_LOW = 1,
}

export const useAdConfig = () => {
  const adList: Array<{
    id: string
    component: JSX.Element
    shouldRender?: Array<boolean>
    priority?: number
  }> = [
    {
      id: 'expandable-ad',
      component: <ExpandableAd />,
      priority: Priority.FIRST_AD,
    },
    {
      id: 'pcs-v4',
      component: <AdV4 />,
    },
    {
      id: 'cake-staking',
      component: <AdCakeStaking />,
    },
    {
      id: 'clamm-options-trading',
      component: <AdOptionsTrading />,
    },
    {
      id: 'rocker-meme-career',
      component: <AdRocker />,
    },
    {
      id: 'ad-quest',
      component: <AdQuests />,
    },
  ]

  return adList
    .filter((ad) => ad.shouldRender === undefined || ad.shouldRender.every(Boolean))
    .sort((a, b) => (b.priority || Priority.VERY_LOW) - (a.priority || Priority.VERY_LOW))
}

// Array of strings or regex patterns
const commonLayoutAdIgnoredPages = [
  '/home',
  '/cake-staking',
  // Route matching: /liquidity/pool/<chainName>/<poolAddress>
  /\/liquidity\/pool\/\w+\/\w+/,
]

/**
 *  On the pages mentioned, the Mobile ads will be placed directly in page instead of in the app layout.
 *  So don't render in the app layout.
 *  Contains strings or regex patterns.
 */
export const layoutMobileAdIgnoredPages = [...commonLayoutAdIgnoredPages, '/', '/prediction', '/liquidity/pools']

/**
 *  On the pages mentioned, the Desktop ads will be placed directly in page instead of in the app layout.
 *  So don't render in the app layout.
 *  Contains strings or regex patterns.
 */
export const layoutDesktopAdIgnoredPages = [...commonLayoutAdIgnoredPages]
