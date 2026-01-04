import { TechnicalIndicator } from '@/app/types';
import { calculateRSI, getRSISignal } from '../indicators/rsi';
import { calculateSMA, getSMASignal } from '../indicators/sma';
import { calculateEMA, getEMASignal } from '../indicators/ema';

export function analyzeTechnicals(historicalPrices: number[], currentPrice: number): TechnicalIndicator[] {
  const indicators: TechnicalIndicator[] = [];

  const rsi = calculateRSI(historicalPrices, 14);
  indicators.push({
    name: 'RSI (14)',
    value: rsi,
    signal: getRSISignal(rsi),
  });

  const sma20 = calculateSMA(historicalPrices, 20);
  indicators.push({
    name: 'SMA (20)',
    value: sma20,
    signal: getSMASignal(currentPrice, sma20),
  });

  const sma50 = calculateSMA(historicalPrices, 50);
  indicators.push({
    name: 'SMA (50)',
    value: sma50,
    signal: getSMASignal(currentPrice, sma50),
  });

  const ema12 = calculateEMA(historicalPrices, 12);
  indicators.push({
    name: 'EMA (12)',
    value: ema12,
    signal: getEMASignal(currentPrice, ema12),
  });

  const ema26 = calculateEMA(historicalPrices, 26);
  indicators.push({
    name: 'EMA (26)',
    value: ema26,
    signal: getEMASignal(currentPrice, ema26),
  });

  return indicators;
}

export function generateAnalysisSummary(indicators: TechnicalIndicator[]): string {
  const bullishCount = indicators.filter(i => i.signal === 'bullish').length;
  const bearishCount = indicators.filter(i => i.signal === 'bearish').length;
  const neutralCount = indicators.filter(i => i.signal === 'neutral').length;

  return `Technical Analysis Summary:
- Bullish Indicators: ${bullishCount}
- Bearish Indicators: ${bearishCount}
- Neutral Indicators: ${neutralCount}

Top Signals:
${indicators.map(i => `- ${i.name}: ${i.value.toFixed(2)} (${i.signal})`).join('\n')}`;
}
