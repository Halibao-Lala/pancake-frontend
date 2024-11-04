import { appearAnimation } from '@pancakeswap/uikit'
import { keyframes, styled } from 'styled-components'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { Swiper } from 'swiper/react'

const progress = keyframes`
  from {transform: scaleX(0.05);}
  to { transform: scaleX(1);}
`

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
    gap: 4px;
  }
  .swiper-pagination-bullet {
    position: relative;
    background-color: ${({ theme }) => theme.colors.inputSecondary};
    margin: 0 !important;
    flex-grow: 1;
    border-radius: 4px;
    height: 4px;
    overflow: hidden;
    opacity: 1;
    &.swiper-pagination-bullet-active {
      &::before {
        content: '';
        border-radius: 4px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${({ theme }) => theme.colors.secondary};
        animation: ${progress} 5s linear forwards;
        transform-origin: left center;
      }
    }
  }
`
