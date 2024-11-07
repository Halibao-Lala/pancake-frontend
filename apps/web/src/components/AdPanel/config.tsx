import { ContentAd } from './Variations/ContentAd'
import { ContentCountdown } from './Variations/ContentCountdown'
import { ExpandableAd } from './Variations/ExpandableAd'
import { TitleContentAd } from './Variations/TitleContentAd'
import { shouldRenderByTime } from './renderConditions'

export const useAdConfig = () => {
  const adList: Array<{
    id: string
    component: JSX.Element
    shouldRender?: boolean
    priority?: Array<number> // summed up when calculating the list order
  }> = [
    {
      id: 'expandable-ad',
      component: <ExpandableAd />,
    },
    {
      id: 'title-content-ad',
      component: <TitleContentAd />,
    },
    {
      id: 'content-ad',
      component: <ContentAd />,
    },
    {
      id: 'content-countdown-ad',
      component: <ContentCountdown />,
      shouldRender: shouldRenderByTime(0, 1731047835),
    },
  ]

  return adList
    .map((ad) => ({ ...ad, shouldRender: ad.shouldRender === undefined ? true : ad.shouldRender }))
    .filter((ad) => ad.shouldRender)
}

/**
 *  On the pages mentioned, the Mobile ads will be placed directly in page instead of in the app layout.
 *  So don't render in the app layout.
 */
export const layoutMobileAdBlacklistedPages = ['/', '/home', '/cake-staking']

/**
 *  On the pages mentioned, the Desktop ads will be placed directly in page instead of in the app layout.
 *  So don't render in the app layout.
 */
export const layoutDesktopAdBlacklistedPages = ['/home', '/cake-staking']
