'use client';

import { useSearchParams } from 'next/navigation';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: Record<string, string> = {
    Configuration: 'There is a problem with the server configuration.',
    AccessDenied: 'You do not have permission to sign in.',
    Verification: 'The verification link may have expired.',
    Default: 'An error occurred during authentication.',
  };

  const errorMessage = errorMessages[error || 'Default'] || errorMessages.Default;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 via-blue-50 to-zinc-50 dark:from-black dark:via-blue-950 dark:to-black">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
              Authentication Error
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">{errorMessage}</p>
          </div>

          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}
