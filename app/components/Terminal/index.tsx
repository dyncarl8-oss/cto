'use client';

import { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error' | 'success';
  content: string;
  timestamp: Date;
}

interface AnalysisData {
  symbol?: string;
  sentiment?: string;
  confidence?: number;
  technicalSignals?: Array<{
    name: string;
    value: number;
    signal: 'bullish' | 'bearish' | 'neutral';
  }>;
}

interface TerminalProps {
  symbol: string;
  onAnalysisComplete?: (data: AnalysisData) => void;
}

export default function Terminal({ symbol, onAnalysisComplete }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '1',
      type: 'success',
      content: `AI Trading Assistant v1.0 - Connected`,
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'output',
      content: `Ready to analyze ${symbol}. Click "Run Analysis" to begin.`,
      timestamp: new Date(),
    },
  ]);
  const [analyzing, setAnalyzing] = useState(false);

  const addLine = (type: TerminalLine['type'], content: string) => {
    setLines((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type,
        content,
        timestamp: new Date(),
      },
    ]);
  };

  const runAnalysis = async () => {
    if (analyzing) return;

    setAnalyzing(true);
    addLine('command', `$ analyze ${symbol} --timeframe 24h`);
    addLine('output', 'Initializing analysis...');

    try {
      addLine('output', 'Fetching market data...');
      await new Promise((resolve) => setTimeout(resolve, 500));

      addLine('output', 'Calculating technical indicators...');
      await new Promise((resolve) => setTimeout(resolve, 500));

      addLine('output', 'Running AI analysis with Gemini Pro...');

      const response = await fetch('/api/analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol,
          timeframe: '24h',
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();

      addLine('success', `✓ Analysis complete for ${symbol}`);
      addLine('output', `Sentiment: ${data.sentiment || 'neutral'}`);
      addLine('output', `Confidence: ${data.confidence || 0}%`);
      addLine('success', 'Results updated in prediction card.');

      if (onAnalysisComplete) {
        onAnalysisComplete(data);
      }
    } catch (error) {
      addLine('error', `✗ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      addLine('output', 'Please try again or check your API keys.');
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    addLine('output', `Switched to ${symbol}`);
  }, [symbol]);

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command':
        return 'text-blue-400';
      case 'error':
        return 'text-red-400';
      case 'success':
        return 'text-green-400';
      default:
        return 'text-zinc-300';
    }
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-zinc-950 dark:border-zinc-800">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-3">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-4 w-4 text-green-400" />
          <span className="text-sm font-medium text-zinc-300">Terminal</span>
        </div>
        <button
          onClick={runAnalysis}
          disabled={analyzing}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className={`h-4 w-4 ${analyzing ? 'animate-pulse' : ''}`} />
          {analyzing ? 'Analyzing...' : 'Run Analysis'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
        {lines.map((line) => (
          <div key={line.id} className="mb-1 flex gap-2">
            <span className="text-zinc-600">
              {line.timestamp.toLocaleTimeString()}
            </span>
            <span className={getLineColor(line.type)}>{line.content}</span>
          </div>
        ))}
        {analyzing && (
          <div className="flex items-center gap-2 text-yellow-400">
            <span className="animate-pulse">●</span>
            <span>Processing...</span>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-800 bg-zinc-900 px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span>Ready</span>
          <span>•</span>
          <span>{symbol}</span>
        </div>
      </div>
    </div>
  );
}
