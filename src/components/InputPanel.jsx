import React, { useState, useMemo } from 'react';
import { Sparkles, Send } from 'lucide-react';

export default function InputPanel({ onGenerate, loading }) {
  const [text, setText] = useState('');

  const trimmedText = text.trim();
  const isInputEmpty = !trimmedText;
  const charCount = text.length;

  const helperText = useMemo(() => {
    if (loading) return 'Generating your personalized study set...';
    if (isInputEmpty) return 'Paste lecture notes, articles, or textbook summaries.';
    return `Characters: ${charCount}`;
  }, [loading, isInputEmpty, charCount]);

  const handleGenerate = () => {
    if (!isInputEmpty) {
      onGenerate(trimmedText);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="rounded-[2rem] border border-slate-800/70 bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-indigo-300">Study input</p>
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              Enter the text you want to convert into flashcards and a quiz. The AI will take care of the rest.
            </p>
          </div>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isInputEmpty || loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
            {loading ? 'Generating...' : 'Generate Study Set'}
          </button>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your notes here — the more context, the better the study set." 
          className="mt-6 min-h-[220px] w-full resize-none rounded-[1.75rem] border border-slate-700/80 bg-slate-950/90 px-5 py-5 text-base text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
          disabled={loading}
          aria-label="Study notes input"
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-400">
          <p>{helperText}</p>
          <p className="font-medium text-slate-300">{charCount} characters</p>
        </div>
      </div>
    </div>
  );
}
