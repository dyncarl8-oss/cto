'use client';

import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { TrendingUp, BarChart3, Sparkles, Shield, Zap, CreditCard } from 'lucide-react';

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-blue-50 to-zinc-50 dark:from-black dark:via-blue-950 dark:to-black">
      <div className="container mx-auto px-4 py-16">
        <nav className="mb-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-zinc-900 dark:text-white">
              AI Trading Assistant
            </span>
          </div>
          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="rounded-lg bg-blue-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            Sign In
          </button>
        </nav>

        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
              AI-Powered Crypto Trading
              <span className="block text-blue-500">Analysis & Predictions</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-zinc-600 dark:text-zinc-400">
              Get real-time technical analysis, AI-driven insights, and intelligent
              predictions for cryptocurrency trading powered by Google Gemini Pro.
            </p>
            <button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-blue-600"
            >
              <Sparkles className="h-5 w-5" />
              Get Started Free
            </button>
          </div>

          <div className="mb-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                <BarChart3 className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
                Technical Analysis
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Real-time indicators including RSI, SMA, EMA, MACD, and Bollinger
                Bands for comprehensive market analysis.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                <Sparkles className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
                AI-Powered Insights
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Leverage Google Gemini Pro for intelligent trading predictions and
                market sentiment analysis.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                <Zap className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
                Real-Time Updates
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                WebSocket-powered live market data and instant analysis updates for
                informed decision-making.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-white">
                Supported Trading Pairs
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Analyze the most popular cryptocurrencies
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { symbol: 'BTC', name: 'Bitcoin' },
                { symbol: 'ETH', name: 'Ethereum' },
                { symbol: 'SOL', name: 'Solana' },
                { symbol: 'ADA', name: 'Cardano' },
                { symbol: 'DOT', name: 'Polkadot' },
                { symbol: 'MATIC', name: 'Polygon' },
                { symbol: 'AVAX', name: 'Avalanche' },
                { symbol: 'LINK', name: 'Chainlink' },
              ].map((pair) => (
                <div
                  key={pair.symbol}
                  className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-white">
                      {pair.symbol}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {pair.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                <CreditCard className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="mb-2 text-2xl font-semibold text-zinc-900 dark:text-white">
                Free Tier
              </h3>
              <p className="mb-4 text-4xl font-bold text-zinc-900 dark:text-white">
                10 Credits
              </p>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Basic technical analysis
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  AI predictions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  8 trading pairs
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-blue-500 bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-2xl font-semibold">Pro Tier</h3>
              <p className="mb-4 text-4xl font-bold">Unlimited</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  Unlimited analyses
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  Advanced indicators
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span>
                  Priority support
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">
              Ready to start trading smarter?
            </p>
            <button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-blue-600"
            >
              Sign In with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
