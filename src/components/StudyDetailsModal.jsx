import React, { useState } from 'react';

export default function StudyDetailsModal({ open, onClose, onSubmit }) {
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');

  if (!open) return null;

  const handleProceed = () => {
    if (!notes.trim()) return;
    onSubmit({ topic: topic.trim(), notes: notes.trim() });
    setTopic('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-3xl rounded-2xl bg-slate-950 p-6 shadow-xl border border-slate-800">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-white">Enter new notes</h3>
            <p className="mt-1 text-sm text-slate-400">Paste the notes you'd like to generate a new study set from.</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">Close</button>
        </div>

        <div className="mt-4 space-y-4">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Optional topic"
            className="w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100"
          />

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={8}
            placeholder="Paste your notes here..."
            className="w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 resize-none"
          />

          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="rounded-2xl px-4 py-2 bg-slate-800 text-slate-200">Cancel</button>
            <button onClick={handleProceed} className="rounded-2xl px-4 py-2 bg-indigo-600 text-white">Generate</button>
          </div>
        </div>
      </div>
    </div>
  );
}
