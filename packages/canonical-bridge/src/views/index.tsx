import { useMemo } from 'react'

import {
  BridgeRoutes,
  BridgeTransfer,
  CanonicalBridgeProvider,
  CanonicalBridgeProviderProps,
  ICanonicalBridgeConfig,
} from '@bnb-chain/canonical-bridge-widget'
import { BridgeWrapper } from '../components/BridgeWrapper'
import { RefreshingIcon } from '../components/RefreshingIcon'
import { V1BridgeLink } from '../components/V1BridgeLink'
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
  colorMode?: 'light' | 'dark'
  locale?: string
  onError?: CanonicalBridgeProviderProps['onError']
}

export const CanonicalBridge = (props: CanonicalBridgeProps) => {
  const { colorMode = 'light', locale = 'en', connectWalletButton, supportedChainIds, onError } = props

  const config = useMemo<ICanonicalBridgeConfig>(
    () => ({
      appName: 'canonical-bridge',
      assetPrefix: env.ASSET_PREFIX,
      appearance: {
        bridgeTitle: 'Bridge',
        colorMode,
        theme: {
          dark,
          light,
          breakpoints,
        },
        locale,
        messages: locales[locale] ?? locales.en,
      },
      http: {
        apiTimeOut: 30 * 1000,
        serverEndpoint: env.SERVER_ENDPOINT,
      },
    }),
    [colorMode, locale],
  )

  const supportedChains = useMemo(() => {
    return chains.filter((e) => supportedChainIds.includes(e.id))
  }, [supportedChainIds])

  const transferConfig = useTransferConfig()

  return (
    <BridgeWalletProvider>
      <GlobalStyle />
      <CanonicalBridgeProvider
        config={config}
        transferConfig={transferConfig}
        chains={supportedChains}
        connectWalletButton={connectWalletButton}
        refreshingIcon={<RefreshingIcon />}
        onError={onError}
      >
        <BridgeWrapper>
          <BridgeTransfer />
          <V1BridgeLink />
        </BridgeWrapper>
        <BridgeRoutes />
      </CanonicalBridgeProvider>
    </BridgeWalletProvider>
  )
}
