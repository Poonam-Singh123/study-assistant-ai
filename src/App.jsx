import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InputPanel from './components/InputPanel';
import EmptyState from './components/EmptyState';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import FlashcardView from './components/FlashcardView';
import QuizView from './components/QuizView';
import { useGenerateStudySet } from './hooks/useGenerateStudySet';

function App() {
  const { generate, data, loading, error, clearData, setError } = useGenerateStudySet();
  const [activeTab, setActiveTab] = useState('flashcards');
  const [lastInput, setLastInput] = useState('');

  const handleGenerate = (text) => {
    setLastInput(text);
    generate(text);
  };

  const handleRetry = () => {
    if (lastInput.trim()) {
      generate(lastInput);
    }
  };

  const handleReset = () => {
    clearData();
    setError(null);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      <Navbar />

      <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.12),_transparent_30%)] pointer-events-none" />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-16 pt-8 sm:px-8 lg:px-10">
        <HeroSection />

        <section id="study" className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <InputPanel onGenerate={handleGenerate} loading={loading} />
          </motion.div>

          <div className="min-h-[480px]">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <LoadingState />
                </motion.div>
              )}

              {!loading && error && (
                <motion.div key="error" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <ErrorState error={error} onRetry={handleRetry} onBack={handleReset} />
                </motion.div>
              )}

              {!loading && !error && !data && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <EmptyState />
                </motion.div>
              )}

              {!loading && !error && data && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                      <p className="text-sm uppercase tracking-[0.26em] text-indigo-400">Your study set</p>
                      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{data.topic}</h2>
                    </div>
                    <div className="inline-flex rounded-2xl bg-slate-900/80 p-1.5 shadow-inner border border-slate-700/60">
                      <button
                        onClick={() => setActiveTab('flashcards')}
                        className={`px-5 py-2.5 rounded-xl text-sm font-medium transition ${activeTab === 'flashcards'
                          ? 'bg-slate-800 text-white shadow-md shadow-indigo-500/10'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                        }`}
                      >
                        Flashcards
                      </button>
                      <button
                        onClick={() => setActiveTab('quiz')}
                        className={`px-5 py-2.5 rounded-xl text-sm font-medium transition ${activeTab === 'quiz'
                          ? 'bg-slate-800 text-white shadow-md shadow-indigo-500/10'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                        }`}
                      >
                        Practice Quiz
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    {activeTab === 'flashcards' ? (
                      <FlashcardView flashcards={data.flashcards} />
                    ) : (
                      <QuizView initialQuiz={data.quiz} />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
