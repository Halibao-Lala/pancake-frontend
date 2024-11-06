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
      id: 'title-content-ad',
      component: <TitleContentAd />,
      shouldRender: shouldRenderByTime(0, 1730974493),
    },
    {
      id: 'content-ad',
      component: <ContentAd />,
    },
    {
      id: 'content-countdown-ad',
      component: <ContentCountdown />,
      shouldRender: shouldRenderByTime(0, 1730974493),
    },
    {
      id: 'expandable-ad',
      component: <ExpandableAd />,
    },
  ]

  return adList
    .map((ad) => ({ ...ad, shouldRender: ad.shouldRender === undefined ? true : ad.shouldRender }))
    .filter((ad) => ad.shouldRender)
}
