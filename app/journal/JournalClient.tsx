 'use client'

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function JournalPage() {
  const [entry, setEntry] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAnalyze = async () => {
    if (!entry.trim()) {
      toast.warning('📝 Please write something first!');
      return;
    }

    setLoading(true);
    setAnalysis('');
    setDisplayedText('');

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: entry })
      });

      const data = await res.json();

      if (!res.ok || !data.message) {
        toast.error('AI response failed. Try again!');
      } else {
        setAnalysis(data.message);
      }
    } catch (err) {
      toast.error('⚠️ Connection to AI failed.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Typing animation — includes first character correctly
  useEffect(() => {
    if (!analysis) return;

    let i = 0;
    setDisplayedText('');

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + analysis[i]);
      i++;

      if (i >= analysis.length) clearInterval(interval);
    }, 15);

    return () => clearInterval(interval);
  }, [analysis]);

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4 py-10 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-12 text-white"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 drop-shadow tracking-tight">
          🧘 Journal Insight
        </h1>

        <textarea
          rows={6}
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write freely... what's on your mind today?"
          className="w-full p-4 sm:p-5 bg-white/10 border border-white/20 rounded-xl placeholder:text-white/60 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none transition-all duration-200 shadow-inner"
        />

        <button
          onClick={handleAnalyze}
          disabled={loading || !entry.trim()}
          className="mt-6 w-full py-3 rounded-xl font-semibold tracking-wide bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
              Analyzing...
            </>
          ) : (
            '🔍 Analyze Mood'
          )}
        </button>

        <AnimatePresence>
          {displayedText && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              className="mt-10 bg-white/20 border border-white/30 rounded-2xl shadow-lg p-6 sm:p-8"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-cyan-100">
                🧠 AI's Perspective:
              </h2>
              <p className="whitespace-pre-line leading-relaxed text-white/90 font-light text-base">
                {displayedText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <ToastContainer position="top-center" theme="dark" />
    </main>
  );
}
