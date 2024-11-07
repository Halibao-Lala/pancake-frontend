import { Collapse, Text } from '@pancakeswap/uikit'
import { memo, useState } from 'react'
import { styled } from 'styled-components'
import { swapFAQConfig } from './swapFAQConfig'

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
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

export const FAQ: React.FC = memo(() => {
  const [activeIndex, setActiveIndex] = useState(-1)
  return (
    <FAQWrapper>
      {swapFAQConfig.map((faq, index) => (
        <>
          <Collapse
            key={faq.title}
            isOpen={activeIndex === index}
            onToggle={() => {
              setActiveIndex(activeIndex === index ? -1 : index)
            }}
            title={<Text>{faq.title}</Text>}
            content={<Text>{faq.content}</Text>}
          />
          {index !== swapFAQConfig.length - 1 && <Divider />}
        </>
      ))}
    </FAQWrapper>
  )
})
