import { Text, TextProps } from '@pancakeswap/uikit'
import { PropsWithChildren } from 'react'

interface TitleProps extends TextProps, PropsWithChildren {}

export const Title = ({ children, ...props }: TitleProps) => {
  return (
    <Text fontSize="14px" mb="16px" bold {...props}>
      {children}
    </Text>
  )
}
