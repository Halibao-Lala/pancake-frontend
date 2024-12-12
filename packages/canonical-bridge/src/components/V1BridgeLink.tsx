import { styled } from 'styled-components'
import { ExternalLinkIcon } from './icons/ExternalLinkIcon'

export function V1BridgeLink() {
  return (
    <StyledWrapper>
      <StyledLink href="https://bridge.pancakeswap.finance/" target="_blank" rel="noopener">
        V1 Bridge supports bridging to/from Aptos
        <ExternalLinkIcon />
      </StyledLink>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    text-decoration: underline;
  }
`

const StyledLink = styled.a`
  font-size: 16px;
  line-height: 20px;
  color: ${(props: any) => (props.theme.isDark ? '#B8ADD2' : '#7A6EAA')};
  text-align: center;
  & > svg {
    margin-left: 4px;
    display: inline;
    vertical-align: middle;
  }
`
