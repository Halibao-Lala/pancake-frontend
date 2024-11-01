import { Button, ButtonProps, OpenNewIcon } from '@pancakeswap/uikit'
import { PropsWithChildren } from 'react'

interface AdButtonProps extends ButtonProps, PropsWithChildren {
  isExternal?: boolean
}

export const AdButton = ({ children, isExternal, endIcon, ...props }: AdButtonProps) => {
  return (
    <Button
      scale="sm"
      variant="subtle"
      width="fit-content"
      padding="7px 8px 9px 8px"
      endIcon={isExternal ? <OpenNewIcon color="invertedContrast" /> : endIcon}
      {...props}
    >
      {children}
    </Button>
  )
}
