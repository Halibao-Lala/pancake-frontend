import { Box, BoxProps, getPortalRoot, useMatchBreakpoints } from '@pancakeswap/uikit'
import { memo, RefObject, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { SwiperRef, SwiperSlide } from 'swiper/react'
import { StyledSwiper } from './CarrouselWithSlider'
import { useAdConfig } from './config'
import { useIsSlideExpanded } from './useIsSlideExpanded'
import { useShowAdPanel } from './useShowAdPanel'

const FloatingContainer = styled(Box)`
  position: fixed;
  right: 30px;
  bottom: 30px;
`

const MobileContainer = styled(Box)`
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

const AdSlides: React.FC = memo(() => {
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

        console.log('Paused slides')
      } else {
        swiperRef.current.swiper.autoplay.start()

        // Enable swiping between slides if not expanded
        swiperRef.current.swiper.allowTouchMove = true

        resumeAni()

        console.log('Resumed slides')
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
      $isExpanded={isAnySlideExpanded}
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
          {ad.component}
        </SwiperSlide>
      ))}
    </StyledSwiper>
  )
})

/**
 * Renders floating Ad banners on desktop
 */
export const DesktopCard = () => {
  const portalRoot = getPortalRoot()
  const { isDesktop } = useMatchBreakpoints()
  const [show] = useShowAdPanel()

  return portalRoot && isDesktop && show
    ? createPortal(
        <FloatingContainer>
          <AdSlides />
        </FloatingContainer>,
        portalRoot,
      )
    : null
}

interface MobileCardProps extends BoxProps {
  shouldRender?: boolean
}
/**
 * Renders Ad banners on mobile and tablet
 */
export const MobileCard = ({ shouldRender = true, ...props }: MobileCardProps) => {
  const { isDesktop } = useMatchBreakpoints()
  const [show] = useShowAdPanel()

  return shouldRender && !isDesktop && show ? (
    <MobileContainer {...props}>
      <AdSlides />
    </MobileContainer>
  ) : null
}
