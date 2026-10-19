// Browser Web Audio API sound synthesizer - zero external audio assets
let audioCtx: AudioContext | null = null;
let muted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      audioCtx = new AudioCtx();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isAudioMuted(): boolean {
  return muted;
}

export function setAudioMuted(m: boolean) {
  muted = m;
}

/**
 * Iconic cinematic low-frequency synth boom ("Ta-Dum")
 */
export function playCinematicBoom() {
  if (muted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Master Gain
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.7, now);
    master.gain.exponentialRampToValueAtTime(0.001, now + 2.8);
    master.connect(ctx.destination);

    // Sub-bass oscillator (drop from 95Hz to 28Hz)
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(95, now);
    subOsc.frequency.exponentialRampToValueAtTime(32, now + 1.2);
    subOsc.frequency.exponentialRampToValueAtTime(22, now + 2.6);

    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.9, now);
    subGain.gain.exponentialRampToValueAtTime(0.01, now + 2.4);

    // Low-pass filter for warmth
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, now);
    filter.frequency.exponentialRampToValueAtTime(55, now + 1.8);

    subOsc.connect(subGain);
    subGain.connect(filter);
    filter.connect(master);

    subOsc.start(now);
    subOsc.stop(now + 2.8);

    // High shimmer / strike layer (gives the crisp cinematic edge)
    const strikeOsc = ctx.createOscillator();
    strikeOsc.type = 'triangle';
    strikeOsc.frequency.setValueAtTime(130, now);
    strikeOsc.frequency.exponentialRampToValueAtTime(50, now + 0.5);

    const strikeGain = ctx.createGain();
    strikeGain.gain.setValueAtTime(0.4, now);
    strikeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    strikeOsc.connect(strikeGain);
    strikeGain.connect(master);

    strikeOsc.start(now);
    strikeOsc.stop(now + 0.7);

    // Warm chord layer (overtone resonance)
    const chordFreqs = [65.41, 98.0, 130.81]; // C2, G2, C3
    chordFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + 0.05);

      const chordFilter = ctx.createBiquadFilter();
      chordFilter.type = 'lowpass';
      chordFilter.frequency.setValueAtTime(140, now);
      chordFilter.frequency.exponentialRampToValueAtTime(40, now + 2.0);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12 / (idx + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

      osc.connect(chordFilter);
      chordFilter.connect(gain);
      gain.connect(master);

      osc.start(now + 0.05);
      osc.stop(now + 2.3);
    });
  } catch (err) {
    console.debug('Web Audio not allowed before gesture:', err);
  }
}

/**
 * Subtle tactile UI click
 */
export function playUiClick() {
  if (muted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch {}
}

/**
 * Terminal CRT command beep
 */
export function playTerminalBeep(freq = 680) {
  if (muted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch {}
}
