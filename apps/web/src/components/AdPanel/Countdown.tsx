import { useCountdown } from '@pancakeswap/hooks'
import { useTranslation } from '@pancakeswap/localization'
import { Box, BoxProps } from '@pancakeswap/uikit'
import styled from 'styled-components'

const CountDownWrapper = styled(Box)`
  display: flex;
  font-family: Kanit;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 90%;
  border-radius: 8px;
  gap: 0px;
  flex-direction: column;
  width: max-content;
  padding: 8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    gap: 8px;
    line-height: 110%; /* 22px */
  }
`

interface CountdownProps extends BoxProps {
  targetTime: number

  primaryColor?: string
}

export const Countdown: React.FC<CountdownProps> = ({ targetTime, primaryColor, ...props }) => {
  const { t } = useTranslation()

  const countdown = useCountdown(targetTime)
  if (!countdown) {
    return null
  }
  const hours = countdown?.hours < 10 ? `0${countdown?.hours}` : countdown?.hours
  const minutes = countdown?.minutes < 10 ? `0${countdown?.minutes}` : countdown?.minutes
  const days = countdown?.days < 10 ? `0${countdown?.days}` : countdown?.days

  const SubtleText = styled.span`
    color: ${primaryColor};
  `

  return (
    <CountDownWrapper {...props}>
      <Box>
        {days}
        <SubtleText> {t('d')} : </SubtleText>
        {hours}
        <SubtleText>{t('h')} :</SubtleText>
        {minutes}
        <SubtleText>{t('m')}</SubtleText>
      </Box>
    </CountDownWrapper>
  )
}
