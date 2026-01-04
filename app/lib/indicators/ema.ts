export function calculateEMA(prices: number[], period: number): number {
  if (prices.length === 0) return 0;
  if (prices.length < period) {
    return prices[prices.length - 1];
  }

  const multiplier = 2 / (period + 1);
  
  let ema = prices.slice(0, period).reduce((sum, price) => sum + price, 0) / period;

  for (let i = period; i < prices.length; i++) {
    ema = (prices[i] - ema) * multiplier + ema;
  }

  return ema;
}

export function getEMASignal(currentPrice: number, ema: number): 'bullish' | 'bearish' | 'neutral' {
  const difference = ((currentPrice - ema) / ema) * 100;
  
  if (difference > 1.5) return 'bullish';
  if (difference < -1.5) return 'bearish';
  return 'neutral';
}
