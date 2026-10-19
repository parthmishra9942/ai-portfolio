import { useState } from 'react';
import { motion } from 'framer-motion';

type DatasetSize = 1000 | 10000 | 50000 | 100000;
type Metric = 'Cosine' | 'Euclidean L2' | 'Dot Product';

export default function VectorDbBenchmark() {
  const [size, setSize] = useState<DatasetSize>(10000);
  const [metric, setMetric] = useState<Metric>('Cosine');
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Computed synthetic metrics based on size
  const hnswTime = (11.4 * Math.log10(size) / Math.log10(10000)).toFixed(1);
  const bruteTime = (435 * (size / 10000)).toFixed(0);
  const speedup = (Number(bruteTime) / Number(hnswTime)).toFixed(1);

  const runBenchmark = () => {
    if (running) return;
    setRunning(true);
    setCompleted(false);

    setTimeout(() => {
      setRunning(false);
      setCompleted(true);
    }, 1200);
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-ink p-5 sm:p-6 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-xl tracking-wide text-bone">LIVE VECTOR BENCHMARK SIMULATOR</span>
            <span className="rounded bg-crimson-2/20 px-2 py-0.5 text-[10px] font-bold text-crimson-2">HNSW VS BRUTE FORCE</span>
          </div>
          <p className="mt-1 text-xs text-mist">
            Simulate high-dimensional search latency and algorithmic graph speedup in real time
          </p>
        </div>
        <a
          href="https://github.com/parthmishra9942/vectordb-python"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-bone hover:border-crimson-2 hover:text-crimson-2 transition-colors"
        >
          vectordb-python Repo ↗
        </a>
      </div>

      {/* Controls */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-smoke block mb-2">
            Vector Dataset Size (N)
          </label>
          <div className="grid grid-cols-4 gap-2">
            {([1000, 10000, 50000, 100000] as DatasetSize[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSize(s);
                  setCompleted(false);
                }}
                className={`rounded-lg border px-2 py-2 text-xs font-bold transition-all ${
                  size === s
                    ? 'border-crimson-2 bg-crimson-2/20 text-white shadow-[0_0_15px_rgba(229,19,43,0.3)]'
                    : 'border-white/10 bg-white/5 text-mist hover:border-white/30 hover:text-bone'
                }`}
              >
                {s >= 1000 ? `${s / 1000}k` : s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-smoke block mb-2">
            Distance Metric
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['Cosine', 'Euclidean L2', 'Dot Product'] as Metric[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMetric(m);
                  setCompleted(false);
                }}
                className={`rounded-lg border px-2 py-2 text-xs font-bold transition-all ${
                  metric === m
                    ? 'border-crimson-2 bg-crimson-2/20 text-white shadow-[0_0_15px_rgba(229,19,43,0.3)]'
                    : 'border-white/10 bg-white/5 text-mist hover:border-white/30 hover:text-bone'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trigger Button */}
      <div className="mt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={runBenchmark}
          disabled={running}
          className="flex items-center gap-2 rounded-lg bg-crimson-2 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-crimson disabled:opacity-60"
        >
          {running ? (
            <>
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Running Traversal...</span>
            </>
          ) : (
            <>
              <span>⚡</span> Run Benchmark Simulation
            </>
          )}
        </button>

        <span className="text-xs font-mono text-mist">
          Config: {size.toLocaleString()} vectors @ 384 dims • {metric}
        </span>
      </div>

      {/* Benchmark Results */}
      <div className="mt-6 space-y-4 rounded-xl border border-white/10 bg-ink-2/80 p-4">
        {/* HNSW Row */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-bone flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              HNSW Graph Search (Hierarchical Index)
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400">O(log N)</span>
            </span>
            <span className="font-mono font-bold text-emerald-400">
              {running ? 'Traversing graph...' : completed ? `${hnswTime} ms` : `~${hnswTime} ms`}
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300"
              initial={{ width: '4%' }}
              animate={{ width: running ? ['4%', '100%', '8%'] : completed ? '8%' : '8%' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </div>
        </div>

        {/* Brute Force Row */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-bone flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              Brute-Force Linear Scan (Exhaustive)
              <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-[9px] font-bold text-rose-400">O(N)</span>
            </span>
            <span className="font-mono font-bold text-rose-400">
              {running ? 'Scanning memory buffers...' : completed ? `${bruteTime} ms` : `~${bruteTime} ms`}
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-600 to-rose-400"
              initial={{ width: '10%' }}
              animate={{ width: running ? ['10%', '95%'] : completed ? '95%' : '90%' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </div>
        </div>

        {/* Performance Metric Cards */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10 text-center">
          <div className="rounded-lg bg-white/5 p-2.5">
            <p className="font-display text-2xl text-crimson-2 sm:text-3xl">{speedup}×</p>
            <p className="text-[10px] uppercase tracking-wider text-mist">Speedup Factor</p>
          </div>
          <div className="rounded-lg bg-white/5 p-2.5">
            <p className="font-display text-2xl text-bone sm:text-3xl">98.7%</p>
            <p className="text-[10px] uppercase tracking-wider text-mist">Recall @ K=10</p>
          </div>
          <div className="rounded-lg bg-white/5 p-2.5">
            <p className="font-display text-2xl text-emerald-400 sm:text-3xl">0 MB</p>
            <p className="text-[10px] uppercase tracking-wider text-mist">External DB Deps</p>
          </div>
        </div>
      </div>
    </div>
  );
}
