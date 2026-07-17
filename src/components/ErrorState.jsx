import React from 'react';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';

export default function ErrorState({ error, onRetry, onBack }) {
  return (
    <div className="mx-auto max-w-xl rounded-[2rem] border border-red-500/20 bg-slate-950/95 p-8 shadow-2xl shadow-red-500/10">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-red-500/10 border border-red-500/20">
          <AlertCircle className="h-8 w-8 text-red-400" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white">Something went wrong</h3>
          <p className="mt-2 text-sm text-slate-400">
            We couldn’t generate your study set right now. You can try again, or go back and edit your notes.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-800/80 bg-slate-900/90 p-4 text-left text-sm text-slate-300">
        <p className="font-medium text-slate-100 mb-2">Error details</p>
        <p className="whitespace-pre-wrap break-words">{error || 'An unknown issue occurred. Please try again.'}</p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700/80 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      </div>
    </div>
  );
}
