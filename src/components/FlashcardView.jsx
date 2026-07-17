import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export default function FlashcardView({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownStatus, setKnownStatus] = useState({});

  const card = useMemo(() => flashcards[currentIndex] || flashcards[0], [flashcards, currentIndex]);
  const isKnown = card ? knownStatus[card.id] : false;
  const progress = useMemo(() => ((currentIndex + 1) / flashcards.length) * 100, [currentIndex, flashcards.length]);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => Math.min(prev + 1, flashcards.length - 1));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const toggleKnown = (e) => {
    e.stopPropagation();
    if (!card) return;
    setKnownStatus((prev) => ({
      ...prev,
      [card.id]: !prev[card.id],
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, flashcards.length]);

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
      <div className="mb-6 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-400">
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/90 px-4 py-3 shadow-inner">
          <span className="font-semibold text-slate-100">Card {currentIndex + 1}</span>
          <span className="ml-2">/ {flashcards.length}</span>
        </div>
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/90 px-4 py-3 shadow-inner">
          <span className="font-medium text-slate-300">{isKnown ? 'Known' : 'Still learning'}</span>
        </div>
      </div>

      <div
        className="w-full aspect-[4/3] sm:aspect-[16/9] perspective-1000 mb-10 cursor-pointer"
        role="button"
        tabIndex={0}
        onClick={() => setIsFlipped((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFlipped((prev) => !prev);
          }
        }}
        aria-label="Flashcard: press enter or space to flip"
      >
        <motion.div
          className="w-full h-full relative preserve-3d rounded-[2rem] shadow-2xl"
          initial={false}
          animate={{ rotateX: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="absolute inset-0 backface-hidden rounded-[2rem] border border-slate-800/70 bg-gradient-to-br from-slate-900 to-slate-950 p-10 flex flex-col justify-between text-center shadow-inner"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex items-center justify-between gap-4 text-left">
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-indigo-300">
                front
              </span>
              <span className="text-xs text-slate-500">Tap or press space</span>
            </div>
            <div className="mt-4 flex grow items-center justify-center">
              <h3 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
                {card.front}
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-500">Flip to reveal the answer.</p>
            </div>
          </div>

          <div
            className="absolute inset-0 backface-hidden rounded-[2rem] border border-indigo-500/20 bg-gradient-to-br from-indigo-950/90 to-slate-900 p-10 flex flex-col justify-between text-center shadow-2xl"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
          >
            <div className="flex items-center justify-between gap-4 text-left">
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-emerald-300">
                back
              </span>
              <span className="text-xs text-slate-500">Press space to flip back</span>
            </div>
            <div className="mt-4 flex grow items-center justify-center overflow-hidden">
              <p className="text-xl leading-8 text-slate-100 sm:text-2xl">{card.back}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-500">Review and mark when mastered.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex-1 rounded-2xl border border-slate-800/70 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-indigo-500/40 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="flex-1 rounded-2xl border border-slate-800/70 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-indigo-500/40 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>

        <button
          onClick={toggleKnown}
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold transition',
            isKnown
              ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
              : 'bg-slate-900 border border-slate-800/70 text-slate-100 hover:bg-slate-800'
          )}
        >
          {isKnown ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4 text-slate-400" />}
          {isKnown ? 'Known' : 'Still learning'}
        </button>
      </div>

      <div className="mt-6 w-full overflow-hidden rounded-full bg-slate-900/90 border border-slate-800/80 shadow-inner">
        <div className="h-2 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
