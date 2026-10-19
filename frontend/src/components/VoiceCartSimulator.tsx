import { useState } from 'react';

type VoiceSample = {
  text: string;
  intent: string;
  entity: string;
  qty: string;
};

const SAMPLE_COMMANDS: VoiceSample[] = [
  { text: 'Add 2 organic honey apples to cart', intent: 'ADD_ITEM', entity: 'organic honey apples', qty: '2' },
  { text: 'Remove oat milk from my basket', intent: 'REMOVE_ITEM', entity: 'oat milk', qty: '1' },
  { text: 'Find gluten-free sourdough bread', intent: 'SEARCH_PRODUCT', entity: 'gluten-free sourdough bread', qty: '—' },
  { text: 'Checkout with instant UPI delivery', intent: 'CHECKOUT', entity: 'cart_total', qty: 'ALL' },
];

export default function VoiceCartSimulator() {
  const [activeCommand, setActiveCommand] = useState<VoiceSample>(SAMPLE_COMMANDS[0]);
  const [listening, setListening] = useState(false);

  const triggerVoice = (cmd: VoiceSample) => {
    setActiveCommand(cmd);
    setListening(true);
    setTimeout(() => {
      setListening(false);
    }, 700);
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-ink p-5 sm:p-6 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-xl tracking-wide text-bone">ON-DEVICE NLU VOICE SIMULATOR</span>
            <span className="rounded bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold text-sky-400">0MS CLOUD LATENCY</span>
          </div>
          <p className="mt-1 text-xs text-mist">
            Test deterministic speech parsing and local entity extraction with zero user telemetry
          </p>
        </div>
        <a
          href="https://github.com/parthmishra9942/voicecart"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-bone hover:border-crimson-2 hover:text-crimson-2 transition-colors"
        >
          voicecart Repo ↗
        </a>
      </div>

      {/* Suggested Voice Commands */}
      <div className="mt-5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-smoke block mb-2">
          Click A Voice Command To Simulate
        </label>
        <div className="grid gap-2 sm:grid-cols-2">
          {SAMPLE_COMMANDS.map((cmd) => (
            <button
              key={cmd.text}
              type="button"
              onClick={() => triggerVoice(cmd)}
              className={`flex items-center gap-2.5 rounded-xl border p-3 text-left text-xs font-medium transition-all ${
                activeCommand.text === cmd.text
                  ? 'border-sky-500/60 bg-sky-500/10 text-white shadow-[0_0_20px_rgba(14,165,233,0.2)]'
                  : 'border-white/10 bg-white/5 text-mist hover:border-white/25 hover:text-bone'
              }`}
            >
              <span className="text-sm">🎙️</span>
              <span className="truncate">&quot;{cmd.text}&quot;</span>
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Parser Output */}
      <div className="mt-5 rounded-xl border border-white/10 bg-ink-2/80 p-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
          <span className="text-smoke uppercase tracking-wider text-[10px]">Deterministic NLU Output</span>
          <span className="text-emerald-400 font-bold">Latency: 0ms (Client-Side)</span>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-lg bg-white/5 p-2.5">
            <span className="text-[10px] text-mist uppercase block mb-1">Detected Intent</span>
            <span className="font-bold text-sky-400">{listening ? 'Parsing...' : activeCommand.intent}</span>
          </div>
          <div className="rounded-lg bg-white/5 p-2.5">
            <span className="text-[10px] text-mist uppercase block mb-1">Extracted Entity</span>
            <span className="font-bold text-bone truncate block">{listening ? 'Extracting...' : activeCommand.entity}</span>
          </div>
          <div className="rounded-lg bg-white/5 p-2.5">
            <span className="text-[10px] text-mist uppercase block mb-1">Quantity / Flag</span>
            <span className="font-bold text-emerald-400">{listening ? 'Computing...' : activeCommand.qty}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-mist">
          <span>Storage Engine: <strong>IndexedDB (Offline PWA)</strong></span>
          <span>Telemetry Sent: <strong className="text-bone">0 bytes</strong></span>
        </div>
      </div>
    </div>
  );
}
