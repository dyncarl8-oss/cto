'use client';

import { signIn } from 'next-auth/react';
import { TrendingUp, ArrowRight } from 'lucide-react';

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 via-blue-50 to-zinc-50 dark:from-black dark:via-blue-950 dark:to-black">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Sign in to access your AI Trading Assistant
            </p>
          </div>

          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-zinc-200 bg-white px-6 py-3 text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="font-medium">Continue with Google</span>
            <ArrowRight className="h-5 w-5" />
          </button>

          <div className="mt-6 text-center text-xs text-zinc-500">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
}
