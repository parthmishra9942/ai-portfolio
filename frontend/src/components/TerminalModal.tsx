import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playTerminalBeep } from '../utils/sound';

type HistoryEntry = {
  cmd: string;
  output: string | JSX.Element;
};

const WELCOME_BANNER = `
  ____             _   _       ____                 _           
 |  _ \\ __ _ _ __| |_| |__   / ___|  ___ _ __ (_) ___ ___     
 | |_) / _\` | '__| __| '_ \\  \\___ \\ / _ \\ '__|| |/ _ \\/ __|    
 |  __/ (_| | |  | |_| | | |  ___) |  __/ | _ | |  __/\\__ \\    
 |_|   \\__,_|_|   \\__|_| |_| |____/ \\___|_|(_)/_|\\___||___/    
-----------------------------------------------------------------
Parth Mishra [OS v2.6.0] - Interactive Engineering Terminal
Type 'help' to view available system commands.
`;

export default function TerminalModal({ onClose }: { onClose: () => void }) {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { cmd: 'init', output: <pre className="font-mono text-xs text-emerald-400 whitespace-pre">{WELCOME_BANNER}</pre> },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    playTerminalBeep(750);

    if (!cmd) return;

    if (cmd === 'clear' || cmd === 'cls') {
      setHistory([]);
      setInput('');
      return;
    }

    if (cmd === 'exit' || cmd === 'quit') {
      onClose();
      return;
    }

    let out: string | JSX.Element = '';

    switch (cmd) {
      case 'help':
        out = (
          <div className="space-y-1 text-xs font-mono text-mist">
            <p className="text-bone font-bold">AVAILABLE COMMANDS:</p>
            <p><span className="text-emerald-400 font-bold">stack</span>       - Print core technical stack & architectural competencies</p>
            <p><span className="text-emerald-400 font-bold">bench</span>       - Print VectorDB HNSW algorithmic benchmark metrics</p>
            <p><span className="text-emerald-400 font-bold">certs</span>       - Display verified credential IDs (Oracle, Harvard, UMichigan)</p>
            <p><span className="text-emerald-400 font-bold">projects</span>    - List engineering originals & direct repository links</p>
            <p><span className="text-emerald-400 font-bold">contact</span>     - View direct channels (Email, LinkedIn, GitHub)</p>
            <p><span className="text-emerald-400 font-bold">resume</span>      - Trigger PDF resume download</p>
            <p><span className="text-emerald-400 font-bold">clear</span>       - Clear terminal window</p>
            <p><span className="text-emerald-400 font-bold">exit</span>        - Close terminal shell</p>
          </div>
        );
        break;

      case 'stack':
        out = (
          <div className="space-y-1 text-xs font-mono text-mist">
            <p className="text-cyan-400 font-bold">[ENGINEERING TECH MATRIX]</p>
            <p>• Languages: Python (Primary), TypeScript, JavaScript, SQL, C++</p>
            <p>• AI / ML: Agentic AI (Oracle Certified), Vector Search (HNSW), RAG, PyTorch, Ollama</p>
            <p>• Backend: FastAPI, Node.js, REST APIs, WebSockets, Uvicorn, JWT Auth</p>
            <p>• Frontend: React, Vite, Tailwind CSS, IndexedDB, Progressive Web Apps</p>
            <p>• Systems & DevOps: Docker, Linux CLI, PostgreSQL, Supabase, Git/GitHub</p>
          </div>
        );
        break;

      case 'bench':
        out = (
          <div className="space-y-1 text-xs font-mono text-mist">
            <p className="text-emerald-400 font-bold">[VECTORDB HNSW BENCHMARK REPORT]</p>
            <p>• Speedup: <strong className="text-white">38.2× faster</strong> than brute-force linear scan</p>
            <p>• Query Latency: <strong className="text-white">&lt;15ms</strong> retrieval on 10,000+ vector spaces</p>
            <p>• Recall Accuracy: <strong className="text-white">98.7% @ K=10</strong></p>
            <p>• Index Structure: Hierarchical Navigable Small World (HNSW) graph in pure Python</p>
            <p>• Repo: https://github.com/parthmishra9942/vectordb-python</p>
          </div>
        );
        break;

      case 'certs':
        out = (
          <div className="space-y-1 text-xs font-mono text-mist">
            <p className="text-amber-400 font-bold">[OFFICIAL VERIFIED CREDENTIALS]</p>
            <p>1. Oracle Certified Foundations Associate – Agentic AI (ID: 103546830AAI26OFA)</p>
            <p>2. Harvard CS50: AI with Python (ID: 3e7e245a-5d02-4e80-ac1f-375fd52c3581)</p>
            <p>3. UMichigan: Applied Machine Learning in Python (Verify: G1Q6ZYPKPWP4)</p>
            <p>4. LeetCode: 250+ Algorithmic Solved (leetcode.com/u/parth213g)</p>
          </div>
        );
        break;

      case 'projects':
        out = (
          <div className="space-y-1 text-xs font-mono text-mist">
            <p className="text-rose-400 font-bold">[ENGINEERING ORIGINALS]</p>
            <p>• VectorDB (HNSW): https://github.com/parthmishra9942/vectordb-python</p>
            <p>• VoiceCart: https://github.com/parthmishra9942/voicecart</p>
            <p>• AIMealTracker: https://github.com/parthmishra9942/Ai-Meal-Tracker</p>
            <p>• Autonomous Fleet: https://github.com/parthmishra9942/my-job-search</p>
          </div>
        );
        break;

      case 'contact':
        out = (
          <div className="space-y-1 text-xs font-mono text-mist">
            <p className="text-sky-400 font-bold">[DIRECT CHANNELS]</p>
            <p>• Email: parthmishra9942@gmail.com</p>
            <p>• Live Portfolio: https://parthh.runs-on.dev</p>
            <p>• Vercel Mirror: https://ai-portfolio-beige-xi.vercel.app</p>
            <p>• LinkedIn: https://linkedin.com/in/parth-mishra-4b7578242</p>
            <p>• GitHub: https://github.com/parthmishra9942</p>
            <p>• Location: VIT Bhopal University / Bengaluru / Open to Relocation</p>
          </div>
        );
        break;

      case 'resume':
        {
          const a = document.createElement('a');
          a.href = '/assets/Parth_Mishra_Resume.pdf';
          a.download = 'Parth_Mishra_Resume.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          out = <p className="text-emerald-400 text-xs font-mono">Initiated download: Parth_Mishra_Resume.pdf</p>;
        }
        break;

      default:
        out = <p className="text-rose-400 text-xs font-mono">Command not recognized: &apos;{cmd}&apos;. Type &apos;help&apos; for list.</p>;
        break;
    }

    setHistory((prev) => [...prev, { cmd: raw, output: out }]);
    setInput('');
  };

  return (
    <motion.div
      className="fixed inset-0 z-[160] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-label="Developer Terminal"
    >
      <motion.div
        className="relative flex h-[80vh] max-h-[640px] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-emerald-500/30 bg-[#070d0a] shadow-[0_0_50px_rgba(16,185,129,0.15)]"
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CRT Scanline Effect */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40 z-10" />

        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 bg-[#0a1410] px-4 py-2.5 z-20">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-xs font-bold text-emerald-400">parth@parth-series-os: ~</span>
          </div>
          <span className="font-mono text-[10px] text-emerald-500/60">Press ESC or type &apos;exit&apos;</span>
        </div>

        {/* Console stream */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-bone z-20 space-y-3">
          {history.map((h, i) => (
            <div key={i} className="space-y-1">
              {h.cmd !== 'init' && (
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <span>❯</span>
                  <span>{h.cmd}</span>
                </div>
              )}
              <div>{h.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command line input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(input);
          }}
          className="flex items-center gap-2 border-t border-emerald-500/20 bg-[#0a1410] px-4 py-3 z-20"
        >
          <span className="font-mono font-bold text-emerald-400">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help', 'stack', 'bench', 'certs', 'resume'..."
            className="flex-1 bg-transparent font-mono text-xs text-emerald-300 placeholder-emerald-800 focus:outline-none"
          />
        </form>
      </motion.div>
    </motion.div>
  );
}
