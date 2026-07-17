import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import QuizResults from './QuizResults';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuizView({ initialQuiz, onComplete }) {
    const [quizList, setQuizList] = useState(initialQuiz);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState({}); // idx -> selectedOptionIndex
    const [showResults, setShowResults] = useState(false);

    const question = quizList[currentIdx];
    const hasAnsweredCurrent = answers[currentIdx] !== undefined;

    const handleOptionSelect = (optionIndex) => {
        if (hasAnsweredCurrent) return;
        setAnswers(prev => ({
            ...prev,
            [currentIdx]: optionIndex
        }));
    };

    const handleNext = () => {
        if (currentIdx < quizList.length - 1) {
            setCurrentIdx(currentIdx + 1);
        } else {
            if (onComplete) {
                onComplete({ quizList, answers });
            }
            setShowResults(true);
        }
    };

    const handleRetryWrong = () => {
        const wrongQuestions = quizList.filter((q, i) => answers[i] !== q.correctIndex);
        if (wrongQuestions.length === 0) {
            resetQuiz(initialQuiz);
        } else {
            resetQuiz(wrongQuestions);
        }
    };

    const resetQuiz = (newQuizList) => {
        setQuizList(newQuizList);
        setCurrentIdx(0);
        setAnswers({});
        setShowResults(false);
    };

    useEffect(() => {
        setQuizList(initialQuiz);
        resetQuiz(initialQuiz);
    }, [initialQuiz]);

    // Keyboard navigation 1-4 for options and Enter for next
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!showResults && !hasAnsweredCurrent) {
                const num = parseInt(e.key);
                if (num >= 1 && num <= 4) {
                    handleOptionSelect(num - 1);
                }
            } else if (!showResults && hasAnsweredCurrent && e.key === 'Enter') {
                handleNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showResults, hasAnsweredCurrent, currentIdx]);

    if (showResults) {
        return (
            <QuizResults
                quizList={quizList}
                answers={answers}
                onRetryWrong={handleRetryWrong}
                onRetryAll={() => resetQuiz(initialQuiz)}
            />
        );
    }

    return (
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-8">
            {/* Quiz Progress */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                    <span className="text-sm font-semibold tracking-wider uppercase text-indigo-400">
                        Question {currentIdx + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                        {quizList.length} Total
                    </span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex gap-1">
                    {quizList.map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-full flex-1 transition-colors duration-500 rounded-sm",
                                i === currentIdx ? "bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]" :
                                    answers[i] !== undefined
                                        ? (answers[i] === quizList[i].correctIndex ? "bg-emerald-500" : "bg-red-500")
                                        : "bg-slate-700/50"
                            )}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIdx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700/50 p-8 shadow-2xl relative overflow-hidden"
                >
                    {/* Subtle decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full pointer-events-none" />

                    <h3 className="text-2xl font-semibold text-white mb-8 leading-relaxed relative z-10">
                        {question.question}
                    </h3>

                    <div className="flex flex-col gap-4 relative z-10">
                        {question.options.map((opt, i) => {
                            const isSelected = answers[currentIdx] === i;
                            const isCorrect = i === question.correctIndex;
                            const showFeedback = hasAnsweredCurrent;

                            let btnClass = "bg-slate-800/80 border-slate-700 hover:bg-slate-700 hover:border-slate-500 text-slate-200";
                            let iconColor = "text-slate-400";

                            if (showFeedback) {
                                if (isCorrect) {
                                    btnClass = "bg-emerald-500/10 border-emerald-500/50 text-emerald-300 transform scale-[1.02] shadow-lg shadow-emerald-500/5";
                                    iconColor = "text-emerald-400 font-bold";
                                } else if (isSelected && !isCorrect) {
                                    btnClass = "bg-red-500/10 border-red-500/50 text-red-300";
                                    iconColor = "text-red-400";
                                } else {
                                    btnClass = "bg-slate-800/30 border-slate-800/50 text-slate-600";
                                    iconColor = "text-slate-600";
                                }
                            }

                            return (
                                <button
                                    key={i}
                                    disabled={hasAnsweredCurrent}
                                    onClick={() => handleOptionSelect(i)}
                                    className={cn(
                                        "p-5 rounded-2xl border text-left transition-all duration-300",
                                        btnClass
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-sm bg-slate-900/50 shadow-inner",
                                            iconColor
                                        )}>
                                            {i + 1}
                                        </div>
                                        <span className="text-[1.05rem] font-medium">{opt}</span>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="flex justify-end">
                <button
                    onClick={handleNext}
                    disabled={!hasAnsweredCurrent}
                    className="px-8 py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-30 disabled:hover:bg-indigo-500
                     text-white font-medium flex items-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/25"
                >
                    {currentIdx === quizList.length - 1 ? "Finish Quiz" : "Next Question"}
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>

            {!hasAnsweredCurrent && (
                <p className="text-center text-slate-500 text-sm mt-[-10px]">
                    Tip: Use number keys (1-4) to select
                </p>
            )}
        </div>
    );
}
