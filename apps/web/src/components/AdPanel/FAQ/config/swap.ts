import { getImageUrl } from 'components/AdPanel/utils'
import { FAQConfig } from '../types'

export const swapFAQConfig: FAQConfig = (t) => ({
  title: t('Quick start now on How to Swap!'),
  subtitle: t('Need Help?'),
  imageUrl: getImageUrl('faq_bunny.png'),
  docsUrl: 'https://docs.pancakeswap.finance/products/pancakeswap-exchange',
  data: [
    {
      title: t('What is Swap?'),
      content: t(
        'Swapping allows you to exchange one token for another directly on PancakeSwap. It’s a decentralized way to trade assets on the Binance Smart Chain (BSC) without needing a central authority.',
      ),
    },
    {
      title: t('What is Slippage in Swapping?'),
      content: t(
        'Slippage refers to the difference between the expected price and the actual price of a swap. High volatility may require adjusting slippage tolerance in settings to successfully complete a swap.',
      ),
    },
    {
      title: t('Understanding Swap Fees'),
      content: t(
        'Each swap on PancakeSwap incurs a small transaction fee, a portion of which goes to liquidity providers. This fee helps support the liquidity pool, ensuring there is always enough for token exchanges.',
      ),
    },
    {
      title: t('Swap Safety Tips'),
      content: t(
        'Always double-check the token contract addresses before swapping to avoid scams. Also, ensure your wallet is secure and use trusted sources to verify token information.',
      ),
    },
    {
      title: t('Using Limit Orders for Swaps'),
      content: t(
        'Limit orders allow you to set a specific price at which you want to swap tokens. This can help you avoid slippage and ensure you get the desired rate for your trade.',
      ),
    },
  ],
})
