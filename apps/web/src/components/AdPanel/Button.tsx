import { Button, ButtonProps } from '@pancakeswap/uikit'
import { PropsWithChildren } from 'react'

interface AdButtonProps extends ButtonProps, PropsWithChildren {}

export const AdButton = ({ children }: AdButtonProps) => {
  return (
    <Button scale="sm" variant="subtle" padding="3px 4px 5px 4px" height="unset">
      {children}
    </Button>
  )
}
