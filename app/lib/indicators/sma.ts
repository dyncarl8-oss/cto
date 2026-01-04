export function calculateSMA(prices: number[], period: number): number {
  if (prices.length < period) {
    return prices[prices.length - 1] || 0;
  }

  const recentPrices = prices.slice(-period);
  const sum = recentPrices.reduce((acc, price) => acc + price, 0);
  return sum / period;
}

export function getSMASignal(currentPrice: number, sma: number): 'bullish' | 'bearish' | 'neutral' {
  const difference = ((currentPrice - sma) / sma) * 100;
  
  if (difference > 2) return 'bullish';
  if (difference < -2) return 'bearish';
  return 'neutral';
}
