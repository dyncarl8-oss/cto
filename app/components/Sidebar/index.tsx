'use client';

import { TrendingUp, BarChart3, User, CreditCard, LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface TradingPair {
  id: string;
  symbol: string;
  name: string;
}

interface SidebarProps {
  selectedPair: string;
  onSelectPair: (symbol: string) => void;
}

export default function Sidebar({ selectedPair, onSelectPair }: SidebarProps) {
  const { data: session } = useSession();
  const [tradingPairs, setTradingPairs] = useState<TradingPair[]>([]);
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pairsRes, creditsRes] = await Promise.all([
          fetch('/api/trading-pairs'),
          fetch('/api/credits'),
        ]);

        if (pairsRes.ok) {
          const data = await pairsRes.json();
          setTradingPairs(data.pairs || []);
        }

        if (creditsRes.ok) {
          const data = await creditsRes.json();
          setCredits(data.remaining || 0);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      fetchData();
    }
  }, [session]);

  return (
    <div className="flex h-screen w-64 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-blue-500" />
          <h1 className="text-lg font-bold text-zinc-900 dark:text-white">
            AI Trading Assistant
          </h1>
        </div>
      </div>

      {session && (
        <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
              {session.user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <User className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-zinc-900 dark:text-white">
                {session.user?.name || 'User'}
              </p>
              <div className="flex items-center gap-1 text-xs text-zinc-500">
                <CreditCard className="h-3 w-3" />
                <span>{credits} credits</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Trading Pairs
          </h2>
          {loading ? (
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {tradingPairs.map((pair) => (
                <button
                  key={pair.id}
                  onClick={() => onSelectPair(pair.symbol)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                    selectedPair === pair.symbol
                      ? 'bg-blue-500 text-white'
                      : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{pair.symbol}</p>
                    <p className="truncate text-xs opacity-75">{pair.name}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {session && (
        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
