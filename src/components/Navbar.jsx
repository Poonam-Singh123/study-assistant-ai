import { motion } from 'framer-motion';
import { GitBranch } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/15">
            <span className="text-lg font-semibold">S</span>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-300">Study Assistant</p>
            <p className="text-sm text-slate-400">Your AI-powered study workflow</p>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <a
            href="https://github.com/Poonam-Singh123/study-assistant-ai"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-700/80 bg-slate-900/90 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-indigo-500/40 hover:bg-slate-900"
          >
            <GitBranch className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </div>
    </motion.header>
  );
}
