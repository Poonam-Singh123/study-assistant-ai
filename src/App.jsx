import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import InputPanel from './components/InputPanel';
import EmptyState from './components/EmptyState';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import FlashcardView from './components/FlashcardView';
import QuizView from './components/QuizView';
import { useGenerateStudySet } from './hooks/useGenerateStudySet';

function App() {
  const { generate, data, loading, error, clearData } = useGenerateStudySet();
  const [activeTab, setActiveTab] = useState('flashcards'); // 'flashcards' | 'quiz'
  const [lastInput, setLastInput] = useState('');

  const handleGenerate = (text) => {
    setLastInput(text);
    generate(text);
  };

  const handleRetry = () => {
    generate(lastInput);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* Advanced Ambient Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <header className="border-b border-slate-800/60 bg-slate-950/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xl shadow-[0_0_20px_rgba(99,102,241,0.5)]">
              <span className="relative z-10">S</span>
              <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Study Assistant
            </h1>
          </div>

          <AnimatePresence>
            {data && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={clearData}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear Session
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 flex flex-col gap-12">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <InputPanel onGenerate={handleGenerate} loading={loading} />
        </motion.div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <LoadingState />
              </motion.div>
            )}

            {!loading && error && (
              <motion.div key="error" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <ErrorState error={error} onRetry={handleRetry} />
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
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-3xl font-bold bg-gradient-to-br from-indigo-100 to-slate-400 bg-clip-text text-transparent">
                    {data.topic}
                  </h2>
                  <div className="flex gap-2 p-1.5 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-inner w-fit">
                    <button
                      onClick={() => setActiveTab('flashcards')}
                      className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'flashcards'
                          ? 'bg-slate-700 text-white shadow-md'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                    >
                      Flashcards
                    </button>
                    <button
                      onClick={() => setActiveTab('quiz')}
                      className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'quiz'
                          ? 'bg-slate-700 text-white shadow-md'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
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
      </main>
    </div>
  );
}

export default App;
