import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  const [showTimeoutText, setShowTimeoutText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimeoutText(true);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-800/70 bg-slate-950/95 p-10 shadow-2xl shadow-indigo-500/10">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/10 shadow-inner shadow-indigo-500/10">
          <Loader2 className="h-12 w-12 text-indigo-300 animate-spin" />
        </div>
        <div>
          <p className="text-xl font-semibold text-white">Generating your personalized study set...</p>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            We’re turning your notes into flashcards and quiz questions. This should only take a few seconds.
          </p>
        </div>
      </div>

      <div className="mt-10 space-y-4">
        <div className="rounded-3xl border border-slate-800/70 bg-slate-900/90 p-5">
          <div className="h-3.5 w-full rounded-full bg-slate-800">
            <div className="h-3.5 w-3/4 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 animate-pulse" />
          </div>
          <p className="mt-3 text-sm text-slate-400">Preparing structured flashcards and quiz prompts.</p>
        </div>
        <div className="rounded-3xl border border-slate-800/70 bg-slate-900/90 p-5">
          <p className="text-sm text-slate-400">{showTimeoutText ? 'Still working through your content — thanks for your patience.' : 'Almost there…'}</p>
        </div>
      </div>
    </div>
  );
}
