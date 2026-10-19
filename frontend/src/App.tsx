import { lazy, Suspense, useCallback, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { viewerProfiles, type ProfileId, type Project, type SectionId } from './data/portfolio';
import { SmoothScrollProvider, useSmoothScroll } from './hooks/smoothScroll';
import CustomCursor from './components/CustomCursor';
import OpeningSequence from './components/OpeningSequence';
import ProfileSelector from './components/ProfileSelector';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContinueWatching from './components/ContinueWatching';
import Scene from './components/Scene';
import About from './components/About';
import Seasons from './components/Seasons';
import Originals from './components/Originals';
import TopPicks from './components/TopPicks';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import ResumeSection from './components/ResumeViewer';
import FinalCTA from './components/FinalCTA';
import { EASE } from './components/fx';

// Overlays are only needed on demand — split them out of the first load.
const PlayIntro = lazy(() => import('./components/PlayIntro'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));
const ResumeModal = lazy(() => import('./components/ResumeModal'));
const AskMeModal = lazy(() => import('./components/AskMeModal'));
const RecruiterReelModal = lazy(() => import('./components/RecruiterReelModal'));
const TerminalModal = lazy(() => import('./components/TerminalModal'));

type Stage = 'opening' | 'profiles' | 'home';

const STORAGE_KEY = 'parth-series-profile';

function readStoredProfile(): ProfileId | null {
  try {
    const v = sessionStorage.getItem(STORAGE_KEY);
    return viewerProfiles.some((p) => p.id === v) ? (v as ProfileId) : null;
  } catch {
    return null;
  }
}

export default function App() {
  return (
    <SmoothScrollProvider>
      <Series />
    </SmoothScrollProvider>
  );
}

function Series() {
  const stored = readStoredProfile();
  const [stage, setStage] = useState<Stage>(stored ? 'home' : 'opening');
  const [profileId, setProfileId] = useState<ProfileId>(stored ?? 'parth');
  const [playing, setPlaying] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const { scrollTo, lock, unlock } = useSmoothScroll();

  const order = viewerProfiles.find((p) => p.id === profileId)!.order;

  // Global backtick and Ctrl+K shortcut for Developer Terminal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '`' || (e.ctrlKey && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (stage === 'home') return;
    lock();
    return unlock;
  }, [stage, lock, unlock]);

  const pickProfile = useCallback(
    (id: ProfileId) => {
      setProfileId(id);
      try {
        sessionStorage.setItem(STORAGE_KEY, id);
      } catch {
        /* storage unavailable — profile simply won't persist */
      }
      if (stage !== 'home') {
        window.scrollTo(0, 0);
        setStage('home');
      } else {
        const p = viewerProfiles.find((v) => v.id === id)!;
        setToast(`Now watching as ${p.name} — ${p.blurb.toLowerCase()}`);
        scrollTo(0, { offset: 0 });
      }
      if (id === 'recruiter') {
        setRecruiterOpen(true);
      }
    },
    [stage, scrollTo],
  );

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const closeIntro = useCallback(() => setPlaying(false), []);
  const closeProject = useCallback(() => setProject(null), []);
  const closeResume = useCallback(() => setResumeOpen(false), []);
  const closeAsk = useCallback(() => setAskOpen(false), []);
  const closeRecruiter = useCallback(() => setRecruiterOpen(false), []);
  const closeTerminal = useCallback(() => setTerminalOpen(false), []);

  const sections: Record<SectionId, ReactNode> = {
    about: <About />,
    journey: <Seasons />,
    originals: <Originals onOpen={setProject} />,
    picks: <TopPicks />,
    skills: <Skills />,
    moments: <Achievements />,
    story: <ResumeSection onView={() => setResumeOpen(true)} />,
  };

  return (
    <LayoutGroup>
      <div className="grain" aria-hidden />
      <CustomCursor />

      <AnimatePresence>
        {stage === 'opening' && <OpeningSequence key="opening" onDone={() => setStage('profiles')} />}
        {stage === 'profiles' && <ProfileSelector key="profiles" onPick={pickProfile} />}
      </AnimatePresence>

      {stage === 'home' && (
        <motion.div initial={{ opacity: 0, scale: 1.03, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 1, ease: EASE }}>
          <Navbar
            order={order}
            profileId={profileId}
            onSwitch={pickProfile}
            onAsk={() => setAskOpen(true)}
            onRecruiterReel={() => setRecruiterOpen(true)}
            onTerminal={() => setTerminalOpen(true)}
          />
          <main>
            <Hero
              key={`hero-${profileId}`}
              onPlay={() => setPlaying(true)}
              onResume={() => setResumeOpen(true)}
              onAsk={() => setAskOpen(true)}
              onRecruiterReel={() => setRecruiterOpen(true)}
              profileId={profileId}
            />
            <ContinueWatching order={order} />
            {order.map((id) => (
              <Scene key={id} id={id} className={id === 'originals' ? '!py-0 sm:!py-0' : ''}>
                {sections[id]}
              </Scene>
            ))}
            <FinalCTA onReplay={() => setStage('opening')} />
          </main>

          {/* Quick Floating Terminal Trigger (Left) */}
          <motion.button
            type="button"
            onClick={() => setTerminalOpen(true)}
            aria-label="Open Developer Terminal (`)"
            title="Press ` or Ctrl+K for CLI terminal"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="fixed bottom-6 left-6 z-[80] flex items-center gap-2 rounded-full border border-emerald-500/30 bg-ink-2/95 px-3.5 py-2.5 font-mono text-xs font-bold text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] backdrop-blur-xl transition hover:border-emerald-400 hover:bg-emerald-500/20"
          >
            <span className="text-sm">❯_</span>
            <span className="hidden sm:inline">CLI</span>
          </motion.button>

          {/* Quick Floating Ask AI Trigger (Right) */}
          <motion.button
            type="button"
            onClick={() => setAskOpen(true)}
            aria-label="Ask Parth's AI Representative"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="fixed bottom-6 right-6 z-[80] flex items-center gap-2.5 rounded-full border border-crimson-2/40 bg-ink-2/95 px-4 py-2.5 text-xs font-semibold tracking-wider text-bone shadow-[0_0_25px_rgba(229,19,43,0.35)] backdrop-blur-xl transition hover:border-crimson-2 hover:bg-crimson-2 hover:text-white"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>ASK AI</span>
          </motion.button>
        </motion.div>
      )}

      <Suspense fallback={null}>
        <AnimatePresence>{playing && <PlayIntro key="intro" onClose={closeIntro} />}</AnimatePresence>
        <AnimatePresence>{project && <ProjectModal key="project" project={project} onClose={closeProject} onSwitch={setProject} />}</AnimatePresence>
        <AnimatePresence>{resumeOpen && <ResumeModal key="resume" onClose={closeResume} />}</AnimatePresence>
        <AnimatePresence>{askOpen && <AskMeModal key="askme" onClose={closeAsk} />}</AnimatePresence>
        <AnimatePresence>{recruiterOpen && <RecruiterReelModal key="recruiter" onClose={closeRecruiter} />}</AnimatePresence>
        <AnimatePresence>{terminalOpen && <TerminalModal key="terminal" onClose={closeTerminal} />}</AnimatePresence>
      </Suspense>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            className="glass fixed bottom-6 left-1/2 z-[150] w-[min(92vw,420px)] -translate-x-1/2 rounded-xl px-5 py-3 text-center text-sm text-bone"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
