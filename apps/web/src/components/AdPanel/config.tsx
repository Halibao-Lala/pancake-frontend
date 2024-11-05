import { ContentAd } from './Variations/ContentAd'
import { TitleContentAd } from './Variations/TitleContentAd'

/**
 * @param start Start timestamp in seconds
 * @param end End timestamp in seconds
 * @returns boolean
 */
const shouldRenderByTime = (start: number, end: number) => {
  const now = Date.now()
  return now >= start * 1000 && now <= end * 1000
}

export const useAdConfig = () => {
  const adList = [
    {
      id: 'title-content-ad',
      component: <TitleContentAd />,
      shouldRender: shouldRenderByTime(0, 1731652649),
    },
    {
      id: 'content-ad',
      component: <ContentAd />,
      shouldRender: true,
    },
    {
      id: 'title-content-ad',
      component: <TitleContentAd />,
      shouldRender: shouldRenderByTime(0, 1731652649),
    },
    {
      id: 'content-ad',
      component: <ContentAd />,
      shouldRender: true,
    },
    {
      id: 'title-content-ad',
      component: <TitleContentAd />,
      shouldRender: shouldRenderByTime(0, 1731652649),
    },
    {
      id: 'content-ad',
      component: <ContentAd />,
      shouldRender: true,
    },
  ]

  return adList.filter((ad) => ad.shouldRender)
}
