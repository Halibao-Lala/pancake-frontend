import { useTranslation } from '@pancakeswap/localization'
import { Collapse, FlexGap, Text } from '@pancakeswap/uikit'
import { memo, useMemo, useState } from 'react'
import { styled } from 'styled-components'
import { faqConfig } from './config'
import { ConfigType } from './types'

export const Divider = styled.div`
  width: calc(100% + 32px);
  height: 1px;
  background-color: ${({ theme }) => theme.colors.cardBorder};
  margin-left: -16px;
`

export const FAQWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  padding-bottom: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

interface FAQProps {
  type: ConfigType
}

export const FAQ = memo(({ type }: FAQProps) => {
  const [activeIndex, setActiveIndex] = useState(-1)
  const { t } = useTranslation()

  const config = useMemo(() => faqConfig[type], [type])

  return (
    <FAQWrapper>
      {config &&
        config.map((faq, index) => (
          <FlexGap flexDirection="column" key={faq.title}>
            <Collapse
              isOpen={activeIndex === index}
              onToggle={() => {
                setActiveIndex(activeIndex === index ? -1 : index)
              }}
              title={<Text bold>{t(faq.title)}</Text>}
              content={<Text>{t(faq.content)}</Text>}
              mb="16px"
            />
            {index !== config.length - 1 && <Divider />}
          </FlexGap>
        ))}
    </FAQWrapper>
  )
})
