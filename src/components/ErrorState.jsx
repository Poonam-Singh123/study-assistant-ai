import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({ error, onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20">
                <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-medium text-slate-50 mb-3">Generation Failed</h3>
            <div className="bg-slate-800/80 rounded-xl p-4 w-full mb-8 border border-slate-700">
                <p className="text-sm text-slate-300 font-mono text-left overflow-hidden text-ellipsis">
                    {error || "An unknown error occurred."}
                </p>
            </div>
            <button
                onClick={onRetry}
                className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700
                   text-slate-50 font-medium flex items-center gap-2 transition-all active:scale-[0.98]"
            >
                <RefreshCw className="w-4 h-4" />
                Try Again
            </button>
        </div>
    );
}
