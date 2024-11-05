import { Box, getPortalRoot, useMatchBreakpoints } from '@pancakeswap/uikit'
import { memo, RefObject, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { SwiperRef, SwiperSlide } from 'swiper/react'
import { StyledSwiper } from './CarrouselWithSlider'
import { useAdConfig } from './config'

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

  return (
    <StyledSwiper
      modules={[Autoplay, Pagination, EffectFade]}
      spaceBetween={50}
      observer
      slidesPerView={1}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      speed={500}
      autoplay={{ delay: 5000, pauseOnMouseEnter: true, disableOnInteraction: false }}
      loop
      pagination={{ clickable: true }}
      ref={swiperRef}
    >
      {adList.map((ad) => (
        <SwiperSlide
          onMouseOver={pauseAni}
          onMouseOut={resumeAni}
          onTouchStart={pauseAni}
          onTouchEnd={resumeAni}
          key={ad.id}
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

  return portalRoot && isDesktop
    ? createPortal(
        <FloatingContainer>
          <AdSlides />
        </FloatingContainer>,
        portalRoot,
      )
    : null
}

/**
 * Renders Ad banners on mobile and tablet
 */
export const MobileCard = () => {
  const { isDesktop } = useMatchBreakpoints()
  return !isDesktop ? (
    <MobileContainer>
      <AdSlides />
    </MobileContainer>
  ) : null
}
