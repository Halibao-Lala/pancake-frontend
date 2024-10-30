import { Text, TextProps } from '@pancakeswap/uikit'

interface TitleProps extends TextProps {}

export const Title = (props: TitleProps) => {
  return (
    <Text color="textSubtle" {...props}>
      AdPanel
    </Text>
  )
}
