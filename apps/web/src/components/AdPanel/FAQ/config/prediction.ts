import { FAQConfig } from '../types'

export const predictionFAQConfig: FAQConfig = [
  {
    title: 'What is the Prediction Feature?',
    content:
      'The Prediction feature on PancakeSwap is a price-prediction game where users can guess whether the price of an asset, such as BNB, will be higher or lower after a set period. Correct predictions can earn rewards.',
  },
  {
    title: 'How Do I Participate in Prediction?',
    content:
      "To participate, connect your wallet, navigate to the Prediction page, and select 'Bull' (predicting an increase) or 'Bear' (predicting a decrease) for the next round. Then, enter your wager amount and confirm the transaction.",
  },
  {
    title: 'What Are the Risks in Prediction?',
    content:
      "Prediction is a high-risk game, as it depends on price fluctuations that can be volatile. Only use funds you can afford to lose, and remember that there's no guaranteed outcome.",
  },
  {
    title: 'How Are Rewards Calculated in Prediction?',
    content:
      'Rewards are distributed from the pool of all user wagers in the round. Winners share the pool minus a small fee, which is added back to the platform. The reward amount depends on the total pool size and the number of winners.',
  },
  {
    title: 'Can I Cancel My Prediction Bet?',
    content:
      'Once placed, a prediction bet cannot be canceled or altered. Ensure you’re confident about your prediction before confirming, as it’s locked for the duration of the round.',
  },
  {
    title: 'What Happens if No One Wins in a Prediction Round?',
    content:
      'If no one correctly predicts the outcome of a round, the total pool is rolled over to the next round, increasing the prize pool for future predictions.',
  },
]
