import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export default function FlashcardView({ flashcards }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [knownStatus, setKnownStatus] = useState({}); // card.id -> boolean

    const card = flashcards[currentIndex] || flashcards[0];
    const isKnown = knownStatus[card.id];

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => Math.min(prev + 1, flashcards.length - 1));
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const toggleKnown = (e) => {
        if (e) e.stopPropagation();
        setKnownStatus(prev => ({
            ...prev,
            [card.id]: !prev[card.id]
        }));
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') handleNext();
            else if (e.key === 'ArrowLeft') handlePrev();
            else if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                setIsFlipped(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, flashcards.length]);

    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto">

            {/* 3D Flip Container */}
            <div
                className="w-full aspect-[4/3] sm:aspect-[16/9] perspective-1000 mb-10 cursor-pointer group"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <motion.div
                    className="w-full h-full relative preserve-3d transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-2xl rounded-3xl"
                    initial={false}
                    animate={{ rotateX: isFlipped ? 180 : 0 }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* FRONT */}
                    <div
                        className="absolute inset-0 backface-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700/80 p-10 flex flex-col justify-center items-center text-center shadow-inner"
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        <div className="absolute top-6 right-6 text-xs font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-400/10 px-3 py-1.5 rounded-full">
                            Front
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-semibold text-white group-hover:scale-[1.02] transition-transform duration-500 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                            {card.front}
                        </h3>
                        <div className="absolute bottom-6 flex flex-col items-center gap-2">
                            <span className="text-xs text-slate-500 uppercase tracking-widest opacity-60">
                                Press Space to flip
                            </span>
                        </div>
                    </div>

                    {/* BACK */}
                    <div
                        className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-950/80 to-slate-900 rounded-3xl border border-indigo-500/30 p-10 flex flex-col justify-center items-center text-center shadow-lg shadow-indigo-900/20"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
                    >
                        <div className="absolute top-6 right-6 text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full">
                            Back
                        </div>
                        <div className="overflow-y-auto max-h-full scrollbar-thin w-full px-4">
                            <p className="text-xl sm:text-2xl text-slate-100 leading-relaxed font-light mt-4">
                                {card.back}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Modern Controls */}
            <div className="flex flex-col w-full gap-6">
                {/* Progress Bar */}
                <div className="flex items-center gap-4 w-full">
                    <span className="text-xs font-medium text-slate-500 w-8 text-right">
                        01
                    </span>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
                        {flashcards.map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "h-full flex-1 transition-all duration-300 rounded-sm",
                                    i <= currentIndex ? "bg-indigo-500" : "bg-slate-700/50"
                                )}
                            />
                        ))}
                    </div>
                    <span className="text-xs font-medium text-slate-500 w-8">
                        {String(flashcards.length).padStart(2, '0')}
                    </span>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between w-full">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 disabled:opacity-30 disabled:pointer-events-none transition-all Group"
                    >
                        <ChevronLeft className="w-5 h-5 text-slate-300" />
                        <span className="hidden sm:inline font-medium text-slate-300">Previous</span>
                    </button>

                    <button
                        onClick={toggleKnown}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all shadow-lg active:scale-95",
                            isKnown
                                ? "bg-emerald-500 text-slate-950 shadow-emerald-500/25"
                                : "bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
                        )}
                    >
                        {isKnown ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5 text-slate-400" />}
                        {isKnown ? "Got it" : "Mark as learned"}
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={currentIndex === flashcards.length - 1}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 disabled:opacity-30 disabled:pointer-events-none transition-all Group"
                    >
                        <span className="hidden sm:inline font-medium text-slate-300">Next</span>
                        <ChevronRight className="w-5 h-5 text-slate-300" />
                    </button>
                </div>
            </div>
        </div>
    );
}
