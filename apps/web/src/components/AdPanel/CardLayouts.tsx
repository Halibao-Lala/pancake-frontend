import { Box, getPortalRoot, useMatchBreakpoints } from '@pancakeswap/uikit'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { SwiperSlide } from 'swiper/react'
import { StyledSwiper } from './CarrouselWithSlider'
import { AdList } from './config'

const FloatingContainer = styled(Box)`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
  height: 100vh;
`

const MobileContainer = styled(Box)`
  border: 1px solid red;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AdSlides = () => {
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
    >
      {AdList.map((ad) => (
        <SwiperSlide key={ad.id}>{ad.component}</SwiperSlide>
      ))}
    </StyledSwiper>
  )
}

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
