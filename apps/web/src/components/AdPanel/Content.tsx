import { Text, TextProps } from '@pancakeswap/uikit'
import { PropsWithChildren } from 'react'

interface ContentProps extends TextProps, PropsWithChildren {}

export const Content = ({ children, ...props }: ContentProps) => {
  return (
    <Text fontSize="14px" mb="16px" bold {...props}>
      {children}
    </Text>
  )
}
