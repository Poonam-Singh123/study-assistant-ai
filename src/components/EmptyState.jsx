import React from 'react';
import { BookOpen } from 'lucide-react';

export default function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-700/50">
                <BookOpen className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-medium text-slate-50 mb-2">Turn Notes into Knowledge</h2>
            <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                Paste your lecture notes, documentation, or any text below. Our AI will instantly craft smart flashcards and a quiz for you.
            </p>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 max-w-md w-full text-left">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Example Input</p>
                <p className="text-sm text-slate-400 italic">
                    "Photosynthesis is the process used by plants, algae and certain bacteria to harness energy from sunlight and turn it into chemical energy."
                </p>
            </div>
        </div>
    );
}
