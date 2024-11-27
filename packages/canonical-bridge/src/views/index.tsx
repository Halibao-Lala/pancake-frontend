import { useMemo } from 'react'
import { useTheme } from 'styled-components'

import {
  CanonicalBridgeProvider,
  CanonicalBridgeProviderProps,
  ICanonicalBridgeConfig,
  TransferWidget,
} from '@bnb-chain/canonical-bridge-widget'
import { useTranslation } from '@pancakeswap/localization'
import { chains, env } from '../configs'
import { useTransferConfig } from '../hooks/useTransferConfig'
import { locales } from '../modules/i18n/locales'
import { BridgeWalletProvider } from '../modules/wallet/BridgeWalletProvider'
import { breakpoints } from '../theme/breakpoints'
import { dark } from '../theme/dark'
import { light } from '../theme/light'
import GlobalStyle from './GlobalStyle'

export interface CanonicalBridgeProps {
  connectWalletButton: CanonicalBridgeProviderProps['connectWalletButton']
  supportedChainIds: number[]
}

export const CanonicalBridge = (props: CanonicalBridgeProps) => {
  const { connectWalletButton, supportedChainIds } = props

  const theme = useTheme()
  const { currentLanguage } = useTranslation()

  const config = useMemo<ICanonicalBridgeConfig>(
    () => ({
      appName: 'canonical-bridge',
      assetPrefix: env.ASSET_PREFIX,
      appearance: {
        bridgeTitle: 'Bridge',
        colorMode: theme.isDark ? 'dark' : 'light',
        theme: {
          dark,
          light,
          breakpoints,
        },
        locale: currentLanguage.code,
        messages: locales[currentLanguage.code] ?? locales.en,
      },
      http: {
        apiTimeOut: 30 * 1000,
        serverEndpoint: env.SERVER_ENDPOINT,
      },
    }),
    [theme.isDark, currentLanguage.code],
  )

  const supportedChains = useMemo(() => {
    return chains.filter((e) => supportedChainIds.includes(e.id))
  }, [supportedChainIds])

  const transferConfig = useTransferConfig()

  return (
    <BridgeWalletProvider>
      <GlobalStyle isDark={false} />
      <CanonicalBridgeProvider
        config={config}
        transferConfig={transferConfig}
        chains={supportedChains}
        connectWalletButton={connectWalletButton}
        // routeContentBottom={<Box>Hello world</Box>}
      >
        <TransferWidget />
      </CanonicalBridgeProvider>
    </BridgeWalletProvider>
  )
}
