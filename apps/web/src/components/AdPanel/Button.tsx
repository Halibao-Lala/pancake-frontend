import { Button, ButtonProps, OpenNewIcon } from '@pancakeswap/uikit'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'

interface AdButtonProps extends ButtonProps, PropsWithChildren {
  isExternal?: boolean
}

const StyledButton = styled(Button)<{ $variant?: string }>`
  ${({ theme, $variant }) =>
    $variant === 'text' &&
    `
    font-size: 14px;
    padding: 0;
    color: ${theme.colors.primary60};
    `};
`

export const AdButton = ({ children, isExternal, endIcon, ...props }: AdButtonProps) => {
  return (
    <StyledButton
      scale="sm"
      variant="subtle"
      width="fit-content"
      padding="7px 8px 9px 8px"
      endIcon={
        endIcon || isExternal ? (
          <OpenNewIcon color={props.variant === 'text' ? 'primary60' : 'invertedContrast'} />
        ) : null
      }
      $variant={props.variant}
      {...props}
    >
      {children}
    </StyledButton>
  )
}
