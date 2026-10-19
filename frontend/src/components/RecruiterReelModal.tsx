import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { EASE } from './fx';

export default function RecruiterReelModal({ onClose }: { onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const downloadAllProofs = () => {
    // Sequentially trigger downloads for the proof documents
    const proofs = [
      { url: '/assets/Parth_Mishra_Resume.pdf', name: 'Parth_Mishra_Resume.pdf' },
      { url: '/assets/certificates/Oracle_Agentic_AI_Parth_Mishra.pdf', name: 'Oracle_Agentic_AI_103546830AAI26OFA.pdf' },
    ];
    proofs.forEach((p, idx) => {
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = p.url;
        a.download = p.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, idx * 400);
    });
  };

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="1-Minute Recruiter Reel"
    >
      <motion.div
        ref={modalRef}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/20 bg-ink p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.9)]"
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 20 }}
        transition={{ duration: 0.3, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-crimson-2/20 px-2 py-0.5 text-[10px] font-bold text-crimson-2">
                EXECUTIVE SUMMARY
              </span>
              <span className="text-xs text-mist">60-Second Speed Pitch</span>
            </div>
            <h2 className="mt-1 font-display text-2xl tracking-wide text-bone sm:text-3xl">
              PARTH MISHRA — RECRUITER DOSSIER
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-bone hover:bg-white/20"
          >
            ✕
          </button>
        </div>

        {/* 4 Core Pillars */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-crimson-2">Academic & Problem Solving</span>
            <p className="mt-1 font-display text-xl text-bone">8.67 CGPA • 250+ Solved</p>
            <p className="mt-1 text-xs text-mist leading-relaxed">
              Top percentile B.Tech CSE (AI & ML) at VIT Bhopal. Algorithmic mastery across Graphs, DP, Trees, and Two Pointers on LeetCode & HackerRank.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Verified Credentials</span>
            <p className="mt-1 font-display text-xl text-bone">Oracle • Harvard • UMichigan</p>
            <p className="mt-1 text-xs text-mist leading-relaxed">
              Oracle Certified Foundations Associate in Agentic AI (Sept 2026), Harvard CS50 AI with Python, and UMichigan Applied Machine Learning.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">First-Principles Systems</span>
            <p className="mt-1 font-display text-xl text-bone">VectorDB • VoiceCart • Fleet</p>
            <p className="mt-1 text-xs text-mist leading-relaxed">
              Engineered sub-15ms HNSW vector database from scratch in Python, 0ms on-device deterministic NLU voice assistant, and 4-agent autonomous pipeline.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#d9b46a]">Logistics & Fit</span>
            <p className="mt-1 font-display text-xl text-bone">Immediate Availability</p>
            <p className="mt-1 text-xs text-mist leading-relaxed">
              Available immediately for Internships & 2027 Full-Time SDE / AI-ML engineering roles. Open to relocation (Bengaluru, Remote, Global).
            </p>
          </div>
        </div>

        {/* Quick Tech Grid */}
        <div className="mt-5 rounded-xl border border-white/10 bg-ink-2/90 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-smoke mb-2">Technical Matrix</p>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {['Python (FastAPI, PyTorch, NumPy)', 'TypeScript / React', 'Vector Search (HNSW)', 'Agentic AI Systems', 'PostgreSQL / Supabase', 'Docker & Linux', 'WebSockets & REST'].map((s) => (
              <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-bone/90">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* One-Click Executive Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
          <button
            type="button"
            onClick={downloadAllProofs}
            className="flex items-center gap-2 rounded-xl bg-bone px-5 py-3 text-sm font-bold text-ink shadow-lg transition hover:bg-white"
          >
            <span>⤓</span> Download Verified Proofs Bundle
          </button>

          <div className="flex items-center gap-2">
            <a
              href="mailto:parthmishra9942@gmail.com?subject=Interview%20Invitation%20for%20Parth%20Mishra&body=Hi%20Parth,%0A%0AWe%20reviewed%20your%20portfolio%20and%20would%20love%20to%20connect%20for%20an%20engineering%20role.%0A%0ABest%20regards,"
              className="flex items-center gap-2 rounded-xl border border-crimson-2/50 bg-crimson-2/20 px-4 py-3 text-sm font-semibold text-bone hover:border-crimson-2 hover:bg-crimson-2 transition-colors"
            >
              ✉ Schedule Quick Chat
            </a>
            <a
              href="https://linkedin.com/in/parth-mishra-4b7578242"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-bone hover:border-white/40 transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
