import { appearAnimation } from '@pancakeswap/uikit'
import { styled } from 'styled-components'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { Swiper } from 'swiper/react'

export const StyledSwiper = styled(Swiper)`
  position: absolute;
  right: 30px;
  bottom: 30px;
  overflow: visible;
  opacity: 0;
  animation: ${appearAnimation} 0.3s ease-in-out 0.7s forwards;
  width: 328px;
  margin: 0;
  .swiper-pagination {
    position: absolute;
    left: 16px;
    display: flex;
    justify-content: center;
    width: 148px;
    bottom: 16px;
  }
  .swiper-pagination-bullet {
    background-color: ${({ theme }) => theme.colors.secondary};
    flex-basis: 148px;
    margin: 0 !important;
    border-radius: 0px;
    gap: 4px;
    border-radius: 4px;
  }
`
