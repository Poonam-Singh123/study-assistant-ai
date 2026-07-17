import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-800/70 bg-slate-950/90 px-6 py-12 shadow-[0_40px_120px_rgba(15,23,42,0.4)] sm:px-10 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.2),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.15),_transparent_25%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-200 ring-1 ring-indigo-500/20">
              <Sparkles className="h-4 w-4 text-indigo-300" />
              Learn smarter with AI
            </div>
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl xl:text-6xl">
                Learn Smarter with AI.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-400">
                Paste your notes, generate flashcards, and practice with a quiz tailored to the exact content you just studied.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#study"
                className="inline-flex items-center justify-center rounded-2xl bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400"
              >
                Get Started
              </a>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-700/70 bg-slate-900/90 px-5 py-3 text-sm text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Gemini API-powered generation
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-[2rem] border border-slate-800/80 bg-slate-900/95 p-7 shadow-2xl shadow-slate-950/40">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-950/90 p-6 ring-1 ring-white/5">
                  <p className="text-sm uppercase tracking-[0.24em] text-indigo-300 mb-4">Study Set Preview</p>
                  <div className="space-y-4">
                    <div className="rounded-3xl bg-slate-900 p-4 text-left">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500 mb-2">Flashcard</p>
                      <p className="text-sm font-medium text-slate-100">What is photosynthesis?</p>
                    </div>
                    <div className="rounded-3xl bg-slate-900 p-4 text-left">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500 mb-2">Flashcard</p>
                      <p className="text-sm font-medium text-slate-100">What is photosynthesis?</p>
                    </div>
                    <div className="rounded-3xl bg-slate-900 p-4 text-left">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500 mb-2">Quiz</p>
                      <p className="text-sm font-medium text-slate-100">What is the main energy source for plants?</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl bg-gradient-to-br from-indigo-600/10 to-slate-900/80 p-6 ring-1 ring-indigo-500/10">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400 mb-3">Live progress</p>
                  <div className="grid gap-3">
                    <div className="rounded-3xl bg-slate-950/90 p-4 border border-slate-700/60">
                      <p className="text-sm text-slate-400">Flashcards generated</p>
                      <p className="text-2xl font-semibold text-white">8</p>
                    </div>
                    <div className="rounded-3xl bg-slate-950/90 p-4 border border-slate-700/60">
                      <p className="text-sm text-slate-400">Quiz questions</p>
                      <p className="text-2xl font-semibold text-white">6</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
