import { Button, ButtonProps, ChevronsCollapseIcon, ChevronsExpandIcon, OpenNewIcon } from '@pancakeswap/uikit'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'

const StyledButton = styled(Button)<{ $variant?: string }>`
  transition: all 0.2s ease-in-out;
  ${({ theme, $variant }) =>
    $variant === 'text' &&
    `
    font-size: 14px;
    padding: 0;
    color: ${theme.colors.primary60};
    `};
`

interface AdButtonProps extends ButtonProps, PropsWithChildren {
  isExternal?: boolean
}

export const AdButton = ({ children, endIcon, isExternal, ...props }: AdButtonProps) => {
  return (
    <StyledButton
      scale="sm"
      variant="subtle"
      width="fit-content"
      padding="7px 8px 9px 8px"
      endIcon={
        endIcon ||
        (isExternal ? <OpenNewIcon color={props.variant === 'text' ? 'primary60' : 'invertedContrast'} /> : null)
      }
      $variant={props.variant}
      {...props}
    >
      {children}
    </StyledButton>
  )
}

interface ExpandButtonProps extends AdButtonProps {
  isExpanded?: boolean
}
export const ExpandButton = ({ isExpanded, ...props }: ExpandButtonProps) => {
  return (
    <AdButton
      variant={isExpanded ? 'text' : 'subtle'}
      endIcon={
        isExpanded ? (
          <ChevronsCollapseIcon color="primary60" />
        ) : isExpanded === false ? (
          <ChevronsExpandIcon color="invertedContrast" />
        ) : null
      }
      {...props}
    >
      {isExpanded ? 'Hide' : 'Details'}
    </AdButton>
  )
}
