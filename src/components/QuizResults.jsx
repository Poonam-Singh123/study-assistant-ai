import React, { useEffect, useMemo } from 'react';
import { Target, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuizResults({ quizList, answers, onRetryWrong, onRetryAll }) {
  const { score, percentage, perfect } = useMemo(() => {
    const total = quizList.length;
    const currentScore = quizList.reduce((acc, q, idx) => acc + (answers[idx] === q.correctIndex ? 1 : 0), 0);
    return {
      score: currentScore,
      percentage: Math.round((currentScore / total) * 100),
      perfect: currentScore === total,
    };
  }, [quizList, answers]);

  useEffect(() => {
    if (!perfect) return;

    const duration = 2700;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#818CF8', '#34D399'],
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#818CF8', '#34D399'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, [perfect]);

  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-slate-800/70 bg-slate-950/95 p-10 shadow-2xl shadow-indigo-500/10">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-slate-900/90 ring-1 ring-slate-700/80 shadow-lg shadow-slate-950/30">
          {perfect ? <Sparkles className="h-12 w-12 text-emerald-400" /> : <Target className="h-12 w-12 text-indigo-400" />}
          <div className="absolute inset-0 rounded-full border border-slate-700/60" />
        </div>

        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.26em] text-indigo-400">Quiz Results</p>
          <h2 className="text-5xl font-semibold text-white">{percentage}%</h2>
          <p className="text-lg text-slate-400">{perfect ? 'A perfect score — well done!' : 'Nice work — keep practicing and refine your recall.'}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-800/70 bg-slate-900/90 p-5 text-center">
          <p className="text-sm text-slate-400">Correct</p>
          <p className="mt-3 text-3xl font-semibold text-white">{score}</p>
        </div>
        <div className="rounded-3xl border border-slate-800/70 bg-slate-900/90 p-5 text-center">
          <p className="text-sm text-slate-400">Total</p>
          <p className="mt-3 text-3xl font-semibold text-white">{quizList.length}</p>
        </div>
        <div className="rounded-3xl border border-slate-800/70 bg-slate-900/90 p-5 text-center">
          <p className="text-sm text-slate-400">Score</p>
          <p className="mt-3 text-3xl font-semibold text-white">{percentage}%</p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {!perfect && (
          <button
            onClick={onRetryWrong}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-4 text-sm font-semibold text-white transition hover:from-indigo-500 hover:to-indigo-400"
          >
            <RotateCcw className="h-4 w-4" />
            Retry wrong answers
          </button>
        )}
        <button
          onClick={onRetryAll}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700/80 bg-slate-900/90 px-6 py-4 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
        >
          <RotateCcw className="h-4 w-4" />
          {perfect ? 'Retake quiz' : 'Try again'}
        </button>
      </div>
    </div>
  );
}
