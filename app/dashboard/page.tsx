'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Terminal from '@/app/components/Terminal';
import Chat from '@/app/components/Chat';
import PredictionCard from '@/app/components/PredictionCard';
import { Loader2 } from 'lucide-react';

interface AnalysisResult {
  symbol: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  prediction: string;
  technicalSignals: Array<{
    name: string;
    value: number;
    signal: 'bullish' | 'bearish' | 'neutral';
  }>;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedPair, setSelectedPair] = useState('BTC');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchLatestAnalysis() {
      if (!session) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/analysis?symbol=${selectedPair}`);
        if (response.ok) {
          const data = await response.json();
          if (data.analyses && data.analyses.length > 0) {
            const latest = data.analyses[0];
            setAnalysisResult({
              symbol: latest.symbol,
              sentiment: latest.sentiment || 'neutral',
              confidence: latest.confidence || 0,
              prediction: latest.prediction || 'No prediction available',
              technicalSignals: latest.technicalSignals || [],
            });
          }
        }
      } catch (error) {
        console.error('Error fetching analysis:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestAnalysis();
  }, [selectedPair, session]);

  const handleAnalysisComplete = (data: {
    symbol?: string;
    sentiment?: string;
    confidence?: number;
    prediction?: string;
    technicalSignals?: Array<{
      name: string;
      value: number;
      signal: 'bullish' | 'bearish' | 'neutral';
    }>;
  }) => {
    setAnalysisResult({
      symbol: data.symbol || selectedPair,
      sentiment: (data.sentiment as 'bullish' | 'bearish' | 'neutral') || 'neutral',
      confidence: data.confidence || 0,
      prediction: data.prediction || 'Analysis complete',
      technicalSignals: data.technicalSignals || [],
    });
  };

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-500" />
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-black">
      <Sidebar selectedPair={selectedPair} onSelectPair={setSelectedPair} />
      
      <div className="flex-1 overflow-hidden">
        <div className="grid h-screen grid-cols-1 gap-4 p-4 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="h-1/2">
              <Terminal
                symbol={selectedPair}
                onAnalysisComplete={handleAnalysisComplete}
              />
            </div>
            <div className="h-1/2">
              <Chat symbol={selectedPair} />
            </div>
          </div>

          <div className="overflow-y-auto">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : analysisResult ? (
              <PredictionCard
                symbol={analysisResult.symbol}
                sentiment={analysisResult.sentiment}
                confidence={analysisResult.confidence}
                prediction={analysisResult.prediction}
                technicalSignals={analysisResult.technicalSignals}
              />
            ) : (
              <div className="flex h-full items-center justify-center rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <div className="text-center">
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Run an analysis to see predictions
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
