import { ITransferConfig } from '@bnb-chain/canonical-bridge-widget'
import { useEffect, useState } from 'react'

import cBridgeConfig from '../token-config/mainnet/cBridge/config.json'
import layerZeroConfig from '../token-config/mainnet/layerZero/config.json'
import mesonConfig from '../token-config/mainnet/meson/config.json'
import stargateConfig from '../token-config/mainnet/stargate/config.json'

export function useTransferConfig() {
  const [transferConfig, setTransferConfig] = useState<ITransferConfig>()

  useEffect(() => {
    const initConfig = async () => {
      // const [cBridgeRes, deBridgeRes] = await Promise.all([
      //   axios.get<{ data: ICBridgeTransferConfig }>(`${env.SERVER_ENDPOINT}/api/bridge/cbridge`),
      //   axios.get<{ data: IDeBridgeTransferConfig }>(`${env.SERVER_ENDPOINT}/api/bridge/debridge`),
      // ])

      // const cBridgeConfig = cBridgeRes.data.data
      // const deBridgeConfig = handleDeBridgeConfig(deBridgeRes.data.data)

      const tokenConfig: ITransferConfig = {
        defaultSelectedInfo: {
          fromChainId: 1,
          toChainId: 56,
          tokenSymbol: 'USDT', // USDT
          amount: '',
        },
        order: {
          chains: [56, 204, 1, 42161, 8453, 728126428, 7565164, 137, 43114, 81457, 59144, 10],
          tokens: [],
        },
        displayTokenSymbols: {
          10: {
            '0x7F5c764cBc14f9669B88837ca1490cCa17c31607': 'USDC.e',
          },
          56: {
            '0x2170Ed0880ac9A755fd29B2688956BD959F933F8': 'ETH',
          },
          137: {
            '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174': 'USDC.e',
          },
          42161: {
            '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8': 'USDC.e',
          },
          43114: {
            '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664': 'USDC.e',
            '0xc7198437980c041c805A1EDcbA50c1Ce5db95118': 'USDT.e',
            '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB': 'WETH.e',
          },
        },
        cBridge: {
          config: cBridgeConfig,
          exclude: {
            chains: [],
            tokens: {
              56: ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'],
              42161: ['0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8'], // ['USDT', 'USDC.e']
            },
          },
          bridgedTokenGroups: [],
        },
        // deBridge: {
        //   config: deBridgeConfig,
        //   exclude: {
        //     chains: [],
        //     tokens: {
        //     },
        //   },
        //   bridgedTokenGroups: [],
        // },
        stargate: {
          config: stargateConfig,
          exclude: {
            chains: [],
            tokens: {},
          },
          bridgedTokenGroups: [
            ['ETH', 'mETH'],
            ['USDT', 'm.USDT'],
            ['USDC', 'USDC.e'],
          ],
        },
        layerZero: {
          config: layerZeroConfig,
          exclude: {
            chains: [],
            tokens: {},
          },
          bridgedTokenGroups: [],
        },
        meson: {
          config: mesonConfig.result as any,
          exclude: {
            chains: [],
            tokens: { 42161: ['SOL'] },
          },
          bridgedTokenGroups: [],
        },
      }

      setTransferConfig(tokenConfig)
    }

    initConfig()
  }, [])

  return transferConfig
}

// function handleDeBridgeConfig(rawConfig: IDeBridgeTransferConfig) {
//   const deBridgeConfig = {
//     ...rawConfig,
//   }

//   const extraConfigs: Record<number, any[]> = {
//     1: [
//       {
//         action: 'replace',
//         target: '0xebd9d99a3982d547c5bb4db7e3b1f9f14b67eb83',
//         data: {
//           address: '0x2dfF88A56767223A5529eA5960Da7A3F5f766406',
//           symbol: 'ID',
//           decimals: 18,
//           name: 'SPACE ID',
//           logoURI: '',
//           eip2612: false,
//           tags: ['tokens'],
//         },
//       },
//       {
//         action: 'append',
//         data: {
//           address: '0x152649eA73beAb28c5b49B26eb48f7EAD6d4c898',
//           symbol: 'Cake',
//           decimals: 18,
//           name: 'PancakeSwap Token',
//           logoURI: '',
//           eip2612: false,
//           tags: ['tokens'],
//         },
//       },
//     ],
//   }

//   Object.entries(deBridgeConfig.tokens).forEach(([key, value]) => {
//     const chainId = Number(key)
//     const extraConfig = extraConfigs[chainId]

//     if (extraConfig) {
//       extraConfig.forEach((network) => {
//         const { action, target, data } = network
//         if (!value[data.address]) {
//           if (action === 'replace') {
//             const index = value.findIndex((item) => item.address === target)
//             if (index > -1) {
//               value[index] = data
//             }
//           } else if (action === 'append') {
//             ;(value as any).push(data)
//           }
//         }
//       })
//     }
//   })

//   return deBridgeConfig
// }
