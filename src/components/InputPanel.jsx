import React, { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';

export default function InputPanel({ onGenerate, loading }) {
    const [text, setText] = useState('');

    const isInputEmpty = !text.trim();

    const handleGenerate = () => {
        if (!isInputEmpty) {
            onGenerate(text);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-3">
            <div className="relative group">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your notes or topic here..."
                    className="w-full h-40 bg-slate-800 text-slate-50 placeholder-slate-500 rounded-2xl p-5 border border-slate-700/50 
                     focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none resize-none
                     shadow-[0_8px_30px_rgb(0,0,0,0.12)] block"
                    disabled={loading}
                />
                <div className="absolute bottom-4 right-4 text-xs text-slate-500 bg-slate-900/80 px-2 py-1 rounded backdrop-blur-sm pointer-events-none">
                    {text.length} chars
                </div>
            </div>

            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 ml-2">
                    {isInputEmpty && <span className="italic text-slate-500">Hint: Enter some text to begin!</span>}
                </p>
                <button
                    onClick={handleGenerate}
                    disabled={isInputEmpty || loading}
                    className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 disabled:hover:bg-indigo-500 
                     text-white font-medium flex items-center gap-2 transition-all 
                     active:scale-[0.98] disabled:active:scale-100 shadow-lg shadow-indigo-500/20"
                >
                    {loading ? (
                        <>
                            <Sparkles className="w-5 h-5 animate-pulse" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Generate Study Set
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
