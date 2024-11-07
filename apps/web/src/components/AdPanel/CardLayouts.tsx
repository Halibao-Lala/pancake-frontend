import { Box, BoxProps, getPortalRoot, useMatchBreakpoints } from '@pancakeswap/uikit'
import { cloneElement, memo, RefObject, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { SwiperRef, SwiperSlide } from 'swiper/react'
import { StyledSwiper } from './CarrouselWithSlider'
import { useAdConfig } from './config'
import { AdPlayerProps } from './types'
import { useIsSlideExpanded } from './useIsSlideExpanded'
import { useShowAdPanel } from './useShowAdPanel'

const FloatingContainer = styled(Box)`
  position: fixed;
  right: 30px;
  bottom: 30px;
`

const StaticContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

function getTargetAndToggleAnimation(swiperRef: RefObject<SwiperRef>, pause: boolean = true): void {
  const parent = swiperRef.current as HTMLDivElement | null
  if (!parent) {
    console.warn('swiperRef.current is null or undefined')
    return
  }
  const target = parent.querySelector('.swiper-pagination-bullet-active') as HTMLDivElement | null
  if (!target) {
    console.warn('No active pagination bullet found')
    return
  }
  target.classList.toggle('pause', pause)
}

const AdSlides = memo(({ forceMobile, isDismissible = true }: AdPlayerProps) => {
  const swiperRef = useRef<SwiperRef>(null)
  const pauseAni = useCallback(() => getTargetAndToggleAnimation(swiperRef), [swiperRef])
  const resumeAni = useCallback(() => getTargetAndToggleAnimation(swiperRef, false), [swiperRef])

  const adList = useAdConfig()

  const { isAnySlideExpanded } = useIsSlideExpanded()

  const handlePause = () => {
    pauseAni()
  }

  const handleResume = () => {
    if (!isAnySlideExpanded) resumeAni()
  }

  useEffect(() => {
    if (swiperRef.current) {
      if (isAnySlideExpanded) {
        swiperRef.current.swiper.autoplay.stop()

        // Disable swiping between slides when expanded
        swiperRef.current.swiper.allowTouchMove = false

        pauseAni()
      } else {
        swiperRef.current.swiper.autoplay.start()

        // Enable swiping between slides if not expanded
        swiperRef.current.swiper.allowTouchMove = true

        resumeAni()
      }
    }
  }, [isAnySlideExpanded, pauseAni, resumeAni])

  return (
    <StyledSwiper
      ref={swiperRef}
      effect="fade"
      spaceBetween={50}
      slidesPerView={1}
      speed={500}
      fadeEffect={{ crossFade: true }}
      autoplay={{ delay: 5000, pauseOnMouseEnter: true, disableOnInteraction: false }}
      pagination={{ clickable: true, enabled: !isAnySlideExpanded }}
      modules={[Autoplay, Pagination, EffectFade]}
      $showPagination={!forceMobile && isAnySlideExpanded}
      loop
      observer
    >
      {adList.map((ad) => (
        <SwiperSlide
          key={ad.id}
          onMouseOver={handlePause}
          onMouseOut={handleResume}
          onTouchStart={handlePause}
          onTouchEnd={handleResume}
        >
          {cloneElement(ad.component, { isDismissible, forceMobile })}
        </SwiperSlide>
      ))}
    </StyledSwiper>
  )
})

/**
 * For abstraction and use in pages where we need to
 * directly render the Ads Card purely without any conditions
 */
export const AdPlayer = ({ forceMobile = true, isDismissible = false, ...props }: AdPlayerProps) => {
  return <AdSlides forceMobile={forceMobile} isDismissible={isDismissible} {...props} />
}

interface DesktopCardProps extends AdPlayerProps {
  shouldRender?: boolean
}
/**
 * Renders floating Ad banners on desktop
 */
export const DesktopCard = ({ shouldRender = true, ...props }: DesktopCardProps) => {
  const portalRoot = getPortalRoot()
  const { isDesktop } = useMatchBreakpoints()
  const [show] = useShowAdPanel()

  return portalRoot && shouldRender && isDesktop && show
    ? createPortal(
        <FloatingContainer>
          <AdPlayer {...props} />
        </FloatingContainer>,
        portalRoot,
      )
    : null
}

interface MobileCardProps extends BoxProps, AdPlayerProps {
  shouldRender?: boolean
}
/**
 * Renders Ad banners on mobile and tablet
 */
export const MobileCard = ({ shouldRender = true, isDismissible, forceMobile, ...props }: MobileCardProps) => {
  const { isDesktop } = useMatchBreakpoints()
  const [show] = useShowAdPanel()

  return shouldRender && !isDesktop && show ? (
    <StaticContainer {...props}>
      <AdPlayer isDismissible={isDismissible} forceMobile={forceMobile} />
    </StaticContainer>
  ) : null
}
