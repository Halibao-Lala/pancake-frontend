import { ContentAd } from './Variations/ContentAd'
import { ContentCountdown } from './Variations/ContentCountdown'
import { ExpandableAd } from './Variations/ExpandableAd'
import { TitleContentAd } from './Variations/TitleContentAd'
import { shouldRenderByTime } from './renderConditions'

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
      id: 'title-content-ad',
      component: <TitleContentAd />,
    },
    {
      id: 'expandable-ad',
      component: <ExpandableAd />,
      priority: Priority.FIRST_AD,
    },
    {
      id: 'content-ad',
      component: <ContentAd />,
    },
    {
      id: 'content-countdown-ad',
      component: <ContentCountdown />,
      shouldRender: [shouldRenderByTime(0, 1731997322)],
    },
  ]

  return adList
    .map((ad) => ({ ...ad, shouldRender: ad.shouldRender === undefined ? [true] : ad.shouldRender }))
    .filter((ad) => ad.shouldRender.every(Boolean))
    .sort((a, b) => (b.priority || Priority.VERY_LOW) - (a.priority || Priority.VERY_LOW))
}

// Array of strings or regex patterns
const commonLayoutAdBlacklistedPages = [
  '/home',
  '/cake-staking',
  '/liquidity/pools',
  // Route matching: /liquidity/pool/<chainName>/<poolAddress>
  /\/liquidity\/pool\/\w+\/\w+/,
]

/**
 *  On the pages mentioned, the Mobile ads will be placed directly in page instead of in the app layout.
 *  So don't render in the app layout.
 *  Contains strings or regex patterns.
 */
export const layoutMobileAdBlacklistedPages = [...commonLayoutAdBlacklistedPages, '/', '/prediction']

/**
 *  On the pages mentioned, the Desktop ads will be placed directly in page instead of in the app layout.
 *  So don't render in the app layout.
 *  Contains strings or regex patterns.
 */
export const layoutDesktopAdBlacklistedPages = [...commonLayoutAdBlacklistedPages]
