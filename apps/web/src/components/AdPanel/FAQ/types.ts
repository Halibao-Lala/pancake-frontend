import type { TranslateFunction } from '@pancakeswap/localization'

export type FAQConfig = (t: TranslateFunction) => {
  imageUrl: string
  title: string
  data: Array<{ title: string; content: React.ReactNode }>

  subtitle?: string
}
export type ConfigType = 'swap' | 'prediction' | 'buyCrypto'
