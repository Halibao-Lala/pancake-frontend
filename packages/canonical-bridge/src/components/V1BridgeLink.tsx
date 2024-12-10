import { styled } from 'styled-components'
import { ExternalLinkIcon } from './icons/ExternalLinkIcon'

export function V1BridgeLink() {
  return (
    <StyledWrapper>
      <StyledLink href="https://bridge.pancakeswap.finance/" target="_blank" rel="noopener">
        v1 Bridge <ExternalLinkIcon />
      </StyledLink>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-item: center;
  justify-content: center;
  &:hover {
    text-decoration: underline;
  }
`

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  color: ${(props: any) => (props.isDark ? '#B8ADD2' : '#7A6EAA')};
`
