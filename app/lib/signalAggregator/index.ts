import { TechnicalIndicator } from '@/app/types';

export function aggregateSignals(indicators: TechnicalIndicator[]): {
  overallSentiment: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
} {
  if (indicators.length === 0) {
    return { overallSentiment: 'neutral', confidence: 0 };
  }

  const signalCounts = {
    bullish: 0,
    bearish: 0,
    neutral: 0,
  };

  indicators.forEach(indicator => {
    signalCounts[indicator.signal]++;
  });

  const total = indicators.length;
  const bullishPercent = signalCounts.bullish / total;
  const bearishPercent = signalCounts.bearish / total;

  let overallSentiment: 'bullish' | 'bearish' | 'neutral';
  let confidence: number;

  if (bullishPercent > 0.6) {
    overallSentiment = 'bullish';
    confidence = bullishPercent;
  } else if (bearishPercent > 0.6) {
    overallSentiment = 'bearish';
    confidence = bearishPercent;
  } else {
    overallSentiment = 'neutral';
    confidence = 1 - Math.abs(bullishPercent - bearishPercent);
  }

  return { overallSentiment, confidence };
}
