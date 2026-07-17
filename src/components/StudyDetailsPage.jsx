import React, { useState } from 'react';

export default function StudyDetailsPage({ onProceed }) {
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (!notes.trim()) return;
    onProceed({ topic: topic.trim(), notes: notes.trim() });
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-[2rem] border border-slate-800/70 bg-slate-950/95 p-8 shadow-2xl shadow-indigo-500/10">
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.28em] text-indigo-400">Study details</p>
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Tell us what you're studying.
          </h2>
          <p className="max-w-2xl text-slate-400">
            Provide a topic and paste your notes so the app can generate flashcards and quiz questions tailored to your content.
          </p>
        </div>

        <div className="grid gap-6">
          <label className="space-y-2 text-sm text-slate-300">
            <span className="font-medium">Topic (optional)</span>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. React state management"
              className="w-full rounded-2xl border border-slate-800/70 bg-slate-900/90 px-5 py-4 text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-300">
            <span className="font-medium">Paste your notes</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={10}
              placeholder="Paste lecture notes, articles, textbook excerpts, or study summaries here..."
              className="w-full rounded-[1.75rem] border border-slate-800/70 bg-slate-900/90 px-5 py-5 text-base text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 resize-none"
            />
          </label>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">Once you continue, we’ll generate your personalized study set based on the notes provided.</p>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!notes.trim()}
              className="inline-flex items-center justify-center rounded-2xl bg-indigo-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
