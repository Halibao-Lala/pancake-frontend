import { ConfigType, FAQConfig } from '../types'
import { predictionFAQConfig } from './prediction'
import { swapFAQConfig } from './swap'

export const faqConfig: Record<ConfigType, FAQConfig> = {
  swap: swapFAQConfig,
  prediction: predictionFAQConfig,
  buyCrypto: swapFAQConfig,
}
