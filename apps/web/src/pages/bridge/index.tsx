import { CanonicalBridge } from '@pancakeswap/canonical-bridge'
import { Flex, useMatchBreakpoints } from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { CHAIN_IDS } from 'utils/wagmi'
import Page from 'views/Page'

const BridgePage = () => {
  const { isMobile } = useMatchBreakpoints()

  return (
    <Page removePadding hideFooterOnDesktop={false} showExternalLink={false} showHelpLink={false} noMinHeight>
      <Flex
        width="100%"
        height="100%"
        justifyContent="center"
        position="relative"
        px={isMobile ? '16px' : '24px'}
        pb={isMobile ? '14px' : '48px'}
        pt={isMobile ? '24px' : '64px'}
        alignItems="flex-start"
        max-width="unset"
      >
        <CanonicalBridge connectWalletButton={<ConnectWalletButton width="100%" />} supportedChainIds={CHAIN_IDS} />
      </Flex>
    </Page>
  )
}

BridgePage.chains = CHAIN_IDS
BridgePage.screen = true

export default BridgePage
