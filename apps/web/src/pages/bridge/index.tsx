import { PCSBridge } from '@pancakeswap/pcs-bridge'
import { Flex, useMatchBreakpoints } from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { CHAIN_IDS } from 'utils/wagmi'
import Page from 'views/Page'

const BridgePage = () => {
  const { isMobile } = useMatchBreakpoints()

  return (
    <Page removePadding hideFooterOnDesktop={false} showExternalLink={false} showHelpLink={false}>
      <Flex
        width="100%"
        height="100%"
        justifyContent="center"
        position="relative"
        mt={isMobile ? '18px' : '42px'}
        p={isMobile ? '16px' : '24px'}
      >
        <PCSBridge connectWalletButton={<ConnectWalletButton width="100%" />} supportedChainIds={CHAIN_IDS} />
      </Flex>
    </Page>
  )
}

BridgePage.chains = CHAIN_IDS
BridgePage.screen = true

export default BridgePage
