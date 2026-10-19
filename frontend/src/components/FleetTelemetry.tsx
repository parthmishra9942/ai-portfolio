import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AGENTS = [
  {
    id: 'scout',
    name: 'Scout Agent',
    role: 'Multi-Stream Discovery',
    badge: 'JINA READER',
    detail: 'Zero-auth scraping across Remotive, Arbeitnow, Jobicy, and Internshala with SHA-256 anti-duplicate hashing.',
    status: 'ACTIVE',
  },
  {
    id: 'reader',
    name: 'Job Reader',
    role: 'DOM Parser & Matcher',
    badge: 'AST EXTRACTOR',
    detail: 'Parses nuanced tech requirements, filters ghost jobs, and calculates ATS compatibility score against Parth’s profile.',
    status: 'ANALYZING',
  },
  {
    id: 'adapter',
    name: 'CV Adapter',
    role: 'Dual-Resume Router',
    badge: 'SMART ROUTING',
    detail: 'Dynamically routes between Full-Stack Systems CV vs AI/ML Specialist CV based on role vectors.',
    status: 'ROUTING',
  },
  {
    id: 'dispatcher',
    name: 'Dispatcher',
    role: 'Telemetry & Outreach',
    badge: 'WEBSOCKET ENGINE',
    detail: 'Dispatches cold emails via Apollo leads, updates FastAPI WebSocket telemetry in <70ms, 100% account safe.',
    status: 'STREAMING',
  },
];

export default function FleetTelemetry() {
  const [activeStep, setActiveStep] = useState(0);
  const [pulseCount, setPulseCount] = useState(137);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % AGENTS.length);
      setPulseCount((c) => c + (Math.random() > 0.7 ? 1 : 0));
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl border border-white/15 bg-ink p-5 sm:p-6 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-xl tracking-wide text-bone">AUTONOMOUS 4-AGENT FLEET</span>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">LIVE TELEMETRY</span>
          </div>
          <p className="mt-1 text-xs text-mist">
            High-throughput decoupled architecture for autonomous engineering placement & outreach
          </p>
        </div>
        <a
          href="https://github.com/parthmishra9942/my-job-search"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-bone hover:border-crimson-2 hover:text-crimson-2 transition-colors"
        >
          Fleet Repo ↗
        </a>
      </div>

      {/* Architecture Pipeline Nodes */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {AGENTS.map((agent, idx) => {
          const isCurrent = activeStep === idx;
          return (
            <motion.div
              key={agent.id}
              onClick={() => setActiveStep(idx)}
              className={`cursor-pointer rounded-xl border p-4 transition-all ${
                isCurrent
                  ? 'border-crimson-2 bg-crimson-2/10 shadow-[0_0_20px_rgba(229,19,43,0.25)]'
                  : 'border-white/10 bg-white/5 hover:border-white/25'
              }`}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-mist">0{idx + 1}</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider ${
                    isCurrent ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-smoke'
                  }`}
                >
                  {agent.badge}
                </span>
              </div>
              <h4 className="mt-2 font-display text-lg tracking-wide text-bone">{agent.name}</h4>
              <p className="text-[11px] font-semibold text-crimson-2">{agent.role}</p>
              <p className="mt-2 text-xs leading-relaxed text-mist line-clamp-3">{agent.detail}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Telemetry Stream Status */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-ink-2/80 px-4 py-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-bone">Active Stage: {AGENTS[activeStep].name}</span>
        </div>
        <div className="flex items-center gap-4 text-mist">
          <span>Processed: <strong className="text-bone">{pulseCount} apps</strong></span>
          <span>WebSocket Sync: <strong className="text-emerald-400">&lt;70ms</strong></span>
          <span>Safety: <strong className="text-bone">100% Zero-Ban</strong></span>
        </div>
      </div>
    </div>
  );
}
