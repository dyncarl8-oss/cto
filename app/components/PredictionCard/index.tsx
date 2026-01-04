'use client';

import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';

interface TechnicalIndicator {
  name: string;
  value: number;
  signal: 'bullish' | 'bearish' | 'neutral';
}

interface PredictionCardProps {
  symbol: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  prediction: string;
  technicalSignals: TechnicalIndicator[];
}

export default function PredictionCard({
  symbol,
  sentiment,
  confidence,
  prediction,
  technicalSignals,
}: PredictionCardProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return 'text-green-500';
      case 'bearish':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  const getSentimentBg = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return 'bg-green-500/10 border-green-500/20';
      case 'bearish':
        return 'bg-red-500/10 border-red-500/20';
      default:
        return 'bg-yellow-500/10 border-yellow-500/20';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return <TrendingUp className="h-5 w-5" />;
      case 'bearish':
        return <TrendingDown className="h-5 w-5" />;
      default:
        return <Minus className="h-5 w-5" />;
    }
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'bullish':
        return 'text-green-600 dark:text-green-400';
      case 'bearish':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-yellow-600 dark:text-yellow-400';
    }
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            {symbol} Analysis
          </h3>
        </div>
        <div
          className={`flex items-center gap-2 rounded-full border px-3 py-1 ${getSentimentBg(
            sentiment
          )}`}
        >
          <span className={getSentimentColor(sentiment)}>
            {getSentimentIcon(sentiment)}
          </span>
          <span
            className={`text-sm font-medium capitalize ${getSentimentColor(
              sentiment
            )}`}
          >
            {sentiment}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Confidence
          </span>
          <span className="text-sm font-medium text-zinc-900 dark:text-white">
            {confidence}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div
            className={`h-full rounded-full transition-all ${
              confidence >= 70
                ? 'bg-green-500'
                : confidence >= 40
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

      <div className="mb-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{prediction}</p>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-zinc-900 dark:text-white">
          Technical Indicators
        </h4>
        <div className="space-y-2">
          {technicalSignals.map((indicator, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="text-sm text-zinc-700 dark:text-zinc-300">
                {indicator.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-zinc-900 dark:text-white">
                  {indicator.value.toFixed(2)}
                </span>
                <span
                  className={`text-xs font-medium capitalize ${getSignalColor(
                    indicator.signal
                  )}`}
                >
                  {indicator.signal}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
