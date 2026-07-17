import React, { useEffect } from 'react';
import { Target, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuizResults({ quizList, answers, onRetryWrong, onRetryAll }) {
    let score = 0;
    quizList.forEach((q, i) => {
        if (answers[i] === q.correctIndex) {
            score++;
        }
    });

    const percentage = Math.round((score / quizList.length) * 100);
    const perfect = score === quizList.length;

    useEffect(() => {
        if (perfect) {
            const duration = 3 * 1000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#818CF8', '#34D399']
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#818CF8', '#34D399']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };
            frame();
        }
    }, [perfect]);

    return (
        <div className="max-w-lg mx-auto flex flex-col items-center text-center py-12 px-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">

            {perfect && (
                <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/5 mix-blend-screen pointer-events-none" />
            )}

            <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center mb-8 border-4 border-slate-700 relative shadow-inner">
                {perfect ? <Sparkles className="w-12 h-12 text-emerald-400" /> : <Target className="w-12 h-12 text-indigo-400" />}

                {/* SVG Circle for score */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                        cx="60"
                        cy="60"
                        r="58"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-slate-800"
                    />
                    <circle
                        cx="60"
                        cy="60"
                        r="58"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className={perfect ? "text-emerald-500 transition-all duration-1500 ease-out" : "text-indigo-500 transition-all duration-1000 ease-out"}
                        strokeDasharray={`${(percentage / 100) * 364} 364`}
                    />
                </svg>
            </div>

            <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-3">
                {score} / {quizList.length}
            </h3>
            <p className="text-slate-400 mb-12 text-lg">
                {perfect ? "Outstanding! You have mastered this material." : "Great effort. Review the ones you missed and try again."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
                {!perfect && (
                    <button
                        onClick={onRetryWrong}
                        className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400
                       text-white font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Retry Wrong Answers
                    </button>
                )}
                <button
                    onClick={onRetryAll}
                    className="flex-1 px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-slate-500
                     text-slate-200 font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                    {perfect ? <RotateCcw className="w-5 h-5 text-slate-400" /> : null}
                    {perfect ? "Retake Quiz" : "Start Over"}
                </button>
            </div>
        </div>
    );
}
