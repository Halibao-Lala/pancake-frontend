import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useTheme } from 'styled-components'

import { CanonicalBridgeProvider, ICanonicalBridgeConfig, TransferWidget } from '@bnb-chain/canonical-bridge-widget'
import { useTranslation } from '@pancakeswap/localization'
import { chains, env } from '../configs'
import { useTransferConfig } from '../hooks/useTransferConfig'
import { locales } from '../modules/i18n/locales'
import { dark } from '../theme/dark'
import { light } from '../theme/light'
import { PSCBridge } from './PCSBridge'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
})

function BridgeWidget({ children }: React.PropsWithChildren) {
  const theme = useTheme()
  const { currentLanguage } = useTranslation()

  const config = useMemo<ICanonicalBridgeConfig>(
    () => ({
      appName: 'pcs-bridge',
      assetPrefix: '',
      appearance: {
        bridgeTitle: 'Bridge',
        mode: theme.isDark ? 'dark' : 'light',
        theme: {
          dark,
          light,
        },
        locale: currentLanguage.code,
        messages: locales[currentLanguage.code] ?? locales.en,
      },
      wallet: {
        walletConnectProjectId: env.WALLET_CONNECT_PROJECT_ID,
      },
      http: {
        apiTimeOut: 10 * 1000, // 30s
        serverEndpoint: env.WIDGET_SERVER_ENDPOINT,
      },
    }),
    [theme.isDark, currentLanguage.code],
  )
  const transferConfig = useTransferConfig()

  return (
    <CanonicalBridgeProvider
      config={config}
      transferConfig={transferConfig}
      chains={chains}
      // routeContentBottom={<Box>Hello world</Box>}
    >
      {children}
    </CanonicalBridgeProvider>
  )
}

export const BnbChainBridge = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PSCBridge>
        <BridgeWidget>
          <TransferWidget />
        </BridgeWidget>
      </PSCBridge>
    </QueryClientProvider>
  )
}
