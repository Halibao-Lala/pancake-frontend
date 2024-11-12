import type { TranslateFunction } from '@pancakeswap/localization'

export type FAQConfig = (t: TranslateFunction) => Array<{ title: string; content: React.ReactNode }>
export type ConfigType = 'swap' | 'prediction' | 'buyCrypto'
