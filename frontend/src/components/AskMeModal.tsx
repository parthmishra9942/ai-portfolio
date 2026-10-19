import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EASE } from './fx';

const STARTER_QUESTIONS = [
  'Tell me about your VectorDB HNSW project',
  'Why should we hire Parth?',
  "What's your primary tech stack?",
  'Explain your 4-agent autonomous fleet',
  'What are your top credentials & CGPA?',
];

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Built-in intelligent offline-first knowledge responses for Parth Mishra
function getLocalAnswer(query: string): string {
  const q = query.toLowerCase().trim();

  // 1. Email / Gmail / Contact / Phone / Reach
  if (
    q.includes('gmail') ||
    q.includes('email') ||
    q.includes('mail') ||
    q.includes('contact') ||
    q.includes('phone') ||
    q.includes('number') ||
    q.includes('reach') ||
    q.includes('connect') ||
    q.includes('message') ||
    q.includes('inbox') ||
    q.includes('touch') ||
    q.includes('write to')
  ) {
    return `Parth Mishra can be contacted directly via:\n\n- **Email**: **parthmishra9942@gmail.com**\n- **LinkedIn**: [linkedin.com/in/parth-mishra-4b7578242](https://linkedin.com/in/parth-mishra-4b7578242)\n- **GitHub**: [github.com/parthmishra9942](https://github.com/parthmishra9942)\n- **Location**: VIT Bhopal University, MP / Open to immediate relocation across Bengaluru, Hyderabad, Pune, Gurgaon, or global remote.\n\nHe responds to interview inquiries and engineering discussions within a few hours!`;
  }

  // 2. Anything / Surprise / Help / What can you do / Tell me something
  if (
    q === 'anything' ||
    q.includes('anything') ||
    q.includes('surprise') ||
    q.includes('random') ||
    q.includes('what can you do') ||
    q.includes('help') ||
    q.includes('options') ||
    q.includes('tell me something') ||
    q.includes('suggest')
  ) {
    return `Here are the top engineering achievements and systems you can explore about **Parth Mishra**:\n\n1. **VectorDB (HNSW)**: An in-memory vector database built from scratch in Python with Hierarchical Navigable Small World graphs (**sub-15ms retrieval**, 38× faster than linear scan).\n2. **VoiceCart**: A 100% on-device speech shopping assistant with **0ms cloud network latency** and deterministic local NLU.\n3. **Autonomous 4-Agent Fleet**: An automated placement pipeline tracking **140+ verified applications** with zero LinkedIn scraping.\n4. **Verified Certifications**: **Oracle Certified Foundations Associate in Agentic AI** (Sept 2026, ID: \`103546830AAI26OFA\`), **Harvard CS50 AI with Python**, and **UMichigan Applied ML**.\n5. **Academic Standing**: **8.67 CGPA** at VIT Bhopal University + **250+ solved algorithmic problems**.\n\nTry asking me: *"Show me your VectorDB project"*, *"What is your tech stack?"*, *"How to download resume?"*, or *"Why should we hire Parth?"*!`;
  }

  // 3. Resume / CV / PDF / Biodata / Download
  if (q.includes('resume') || q.includes('cv') || q.includes('pdf') || q.includes('biodata') || q.includes('profile sheet')) {
    return `You can view and download Parth's official, verified 1-page engineering resume directly here:\n\n📄 **[Download Parth Mishra's Resume PDF](/assets/Parth_Mishra_Resume.pdf)**\n\n**Quick Resume Highlights**:\n- **B.Tech CSE (AI & ML)** @ VIT Bhopal (2023–2027) with **8.67 CGPA**\n- **Certifications**: Oracle Agentic AI (\`103546830AAI26OFA\`), Harvard CS50 AI, UMichigan ML\n- **Core Stack**: Python (FastAPI, PyTorch, NumPy), TypeScript, React, Docker, Vector Search\n- **Projects**: VectorDB (HNSW), VoiceCart, AIMealTracker, Autonomous Fleet`;
  }

  // 4. College / University / VIT / Bhopal / Degree / Branch / CGPA / GPA / Marks / Education
  if (
    q.includes('college') ||
    q.includes('university') ||
    q.includes('vit') ||
    q.includes('bhopal') ||
    q.includes('degree') ||
    q.includes('branch') ||
    q.includes('cgpa') ||
    q.includes('gpa') ||
    q.includes('grade') ||
    q.includes('marks') ||
    q.includes('education') ||
    q.includes('school') ||
    q.includes('batch') ||
    q.includes('passing year')
  ) {
    return `**Academic Profile & Standing**:\n\n- **University**: **VIT Bhopal University** (Bhopal, Madhya Pradesh, India)\n- **Degree**: Bachelor of Technology (B.Tech) in **Computer Science and Engineering**\n- **Specialization**: **Artificial Intelligence and Machine Learning (AI & ML)**\n- **Current CGPA**: **8.67 / 10.0** (Top percentile academic honor roll)\n- **Batch**: **2023 – 2027**\n- **Key Coursework**: Data Structures & Algorithms, Operating Systems, Database Management Systems, Machine Learning, Deep Learning, Computer Networks, Linear Algebra & Probability.`;
  }

  // 5. Location / Relocation / City / Where do you live / Remote / Hybrid / On-site
  if (
    q.includes('location') ||
    q.includes('city') ||
    q.includes('where') ||
    q.includes('relocat') ||
    q.includes('remote') ||
    q.includes('bengaluru') ||
    q.includes('bangalore') ||
    q.includes('hyderabad') ||
    q.includes('pune') ||
    q.includes('delhi') ||
    q.includes('gurgaon') ||
    q.includes('live') ||
    q.includes('based') ||
    q.includes('address')
  ) {
    return `**Location & Relocation Details**:\n\n- **Current Base**: VIT Bhopal University campus / Madhya Pradesh, India\n- **Relocation Availability**: **100% open and eager to relocate** to top engineering hubs including **Bengaluru**, **Hyderabad**, **Pune**, **Gurgaon**, **Noida**, or **Mumbai**.\n- **Work Modes**: Flexible across **On-site**, **Hybrid**, or **Global Remote** engineering roles.`;
  }

  // 6. Availability / Notice Period / Joining / Immediate / Internship / Full Time / Salary / Stipend
  if (
    q.includes('availab') ||
    q.includes('notice') ||
    q.includes('join') ||
    q.includes('start date') ||
    q.includes('when can you start') ||
    q.includes('internship') ||
    q.includes('intern') ||
    q.includes('full time') ||
    q.includes('job') ||
    q.includes('hire') ||
    q.includes('hiring') ||
    q.includes('why hire') ||
    q.includes('why should') ||
    q.includes('salary') ||
    q.includes('stipend')
  ) {
    return `**Availability & Candidate Value**:\n\n- **Immediate Availability**: Ready to join for **Summer / 6-Month Engineering Internships** immediately, or **Full-Time SDE / AI-ML Engineering** roles.\n- **Why Hire Parth**:\n  1. **First-Principles Builder**: Creates high-performance systems from scratch (VectorDB HNSW graph engine, deterministic client-side NLU) rather than assembling shallow wrappers.\n  2. **Verified Competence**: Holds the industry **Oracle Certified Foundations Associate in Agentic AI** credential, Harvard CS50 AI certificate, and 250+ solved algorithmic problems.\n  3. **Velocity & Execution**: Ships clean, robust full-stack production systems (FastAPI, React, TypeScript, Docker) with automated test suites.\n\nReach out directly at **parthmishra9942@gmail.com** to schedule an interview!`;
  }

  // 7. VectorDB / HNSW / Vector Search / Embeddings
  if (q.includes('vectordb') || q.includes('hnsw') || q.includes('vector search') || q.includes('nearest neighbor') || q.includes('ann') || q.includes('similarity')) {
    return `**VectorDB (HNSW)** is an in-memory vector database built from scratch in Python with Hierarchical Navigable Small World (HNSW) graph indexing.\n\n**Key Highlights**:\n- **Sub-15ms retrieval latency** with a verified **38× speedup** over brute-force linear search\n- Multi-layer graph navigation with configurable distance metrics (Normalized Cosine Similarity, Euclidean Distance, Dot Product)\n- Heuristic graph pruning and zero third-party vector dependencies\n- Standalone REST API in FastAPI\n\nCheck out the full repository: [github.com/parthmishra9942/vectordb-python](https://github.com/parthmishra9942/vectordb-python)`;
  }

  // 8. VoiceCart / Speech / On-device / PWA
  if (q.includes('voicecart') || q.includes('voice') || q.includes('speech') || q.includes('nlu') || q.includes('audio') || q.includes('shopping')) {
    return `**VoiceCart** is a 100% on-device voice shopping assistant running completely client-side in the browser:\n\n**Key Highlights**:\n- Operates with **0ms cloud network latency** and **zero user telemetry sent to servers**\n- Browser-native Web Speech recognition with deterministic rule-based NLU parsing for instant entity/intent extraction\n- Offline-first Progressive Web App (PWA) with IndexedDB persistence\n\nCheck out the full repository: [github.com/parthmishra9942/voicecart](https://github.com/parthmishra9942/voicecart)`;
  }

  // 9. AIMealTracker / Nutrition / Claude Vision / Food
  if (q.includes('meal') || q.includes('aimealtracker') || q.includes('food') || q.includes('nutrition') || q.includes('diet') || q.includes('calorie') || q.includes('macro')) {
    return `**AIMealTracker** is a multi-modal nutrition assistant using Claude 3.5 Sonnet Vision:\n\n**Key Highlights**:\n- Specifically calibrated to parse nuanced colloquial Indian home-cooked meals and regional dishes\n- Structured JSON nutritional extraction with **94% parsing accuracy**\n- Async FastAPI backend caching with sub-800ms response turnaround\n\nCheck out the full repository: [github.com/parthmishra9942/Ai-Meal-Tracker](https://github.com/parthmishra9942/Ai-Meal-Tracker)`;
  }

  // 10. Autonomous Fleet / Agent / Job Search / Antigravity / Forge
  if (q.includes('fleet') || q.includes('agent') || q.includes('job search') || q.includes('antigravity') || q.includes('forge') || q.includes('autopilot') || q.includes('scout')) {
    return `The **Antigravity Job Fleet** is an autonomous 4-agent system built to streamline engineering placement discovery and outreach:\n\n**4 Decoupled Agents**:\n1. **Scout Agent**: Zero-auth multi-stream scraping across Remotive, Arbeitnow, Jobicy, and Internshala with SHA-256 anti-duplicate hashing.\n2. **Job Reader**: DOM parsing & ATS matching against Parth's profile.\n3. **CV Adapter**: Dynamic dual-resume routing (Full-Stack vs AI/ML).\n4. **Dispatcher**: Dispatches cold emails and streams WebSocket telemetry in under 70ms.\n\nScale: Over **140 verified applications** managed with 100% account safety.\nCode: [github.com/parthmishra9942/my-job-search](https://github.com/parthmishra9942/my-job-search)`;
  }

  // 11. Projects / Work / Portfolio / Repositories / GitHub
  if (q.includes('project') || q.includes('work') || q.includes('repo') || q.includes('github') || q.includes('built') || q.includes('code') || q.includes('catalog')) {
    return `Here are Parth's flagship open-source engineering originals:\n\n1. **[VectorDB (HNSW)](https://github.com/parthmishra9942/vectordb-python)**: Pure Python in-memory vector database with HNSW graph indexing (<15ms latency, 38× speedup).\n2. **[VoiceCart](https://github.com/parthmishra9942/voicecart)**: 100% on-device voice shopping assistant with deterministic NLU and 0ms cloud latency.\n3. **[AIMealTracker](https://github.com/parthmishra9942/Ai-Meal-Tracker)**: Multi-modal vision nutrition analyzer using Claude 3.5 Sonnet Vision (94% accuracy).\n4. **[Antigravity Job Fleet](https://github.com/parthmishra9942/my-job-search)**: Decoupled 4-agent autonomous placement & outreach engine.\n\nExplore his full GitHub: [github.com/parthmishra9942](https://github.com/parthmishra9942)`;
  }

  // 12. Certifications / Credentials / Oracle / Harvard / Coursera / LeetCode / HackerRank
  if (q.includes('cert') || q.includes('credential') || q.includes('oracle') || q.includes('harvard') || q.includes('cs50') || q.includes('coursera') || q.includes('umichigan') || q.includes('leetcode') || q.includes('hackerrank') || q.includes('badge')) {
    return `**Verified Certifications & Credentials**:\n\n1. **Oracle**: Certified Foundations Associate in **Agentic AI** (September 2026)\n   - Credential ID: \`103546830AAI26OFA\`\n   - [Download Official eCertificate PDF](/assets/certificates/Oracle_Agentic_AI_Parth_Mishra.pdf)\n2. **Harvard University (CS50)**: Introduction to Artificial Intelligence with Python\n   - [Verify Harvard Credential](https://cs50.harvard.edu/certificates/3e7e245a-5d02-4e80-ac1f-375fd52c3581) (ID: \`3e7e245a-5d02-4e80-ac1f-375fd52c3581\`)\n3. **University of Michigan (Coursera)**: Applied Machine Learning in Python\n   - [Verify Coursera Credential](https://www.coursera.org/verify/G1Q6ZYPKPWP4) (ID: \`G1Q6ZYPKPWP4\`)\n4. **LeetCode**: 250+ Algorithmic Problems Solved\n   - [LeetCode Profile](https://leetcode.com/u/parth213g)\n5. **HackerRank**: Problem Solving & Python Gold Badges\n   - [HackerRank Profile](https://www.hackerrank.com/profile/parthmishra9942)`;
  }

  // 13. Tech Stack / Skills / Languages / Frameworks
  if (q.includes('stack') || q.includes('technolog') || q.includes('skill') || q.includes('language') || q.includes('python') || q.includes('typescript') || q.includes('javascript') || q.includes('react') || q.includes('fastapi') || q.includes('docker') || q.includes('c++') || q.includes('sql')) {
    return `**Primary Technical Stack & Skills**:\n\n- **Languages**: Python (Primary), TypeScript, JavaScript, SQL, C++\n- **AI & ML**: Agentic AI (Oracle Certified), Vector Search (HNSW), RAG Pipelines, Claude 3.5 Sonnet Vision, PyTorch, Ollama\n- **Backend & Systems**: FastAPI, Node.js, Express, Uvicorn, REST APIs, WebSockets, JWT Auth, Rate Limiting\n- **Frontend & Mobile**: React, React Native (Expo), Vite, Tailwind CSS, IndexedDB, Progressive Web Apps (PWA)\n- **Databases & DevOps**: PostgreSQL, Supabase, SQLite, Docker, Git/GitHub, Linux CLI`;
  }

  // 14. Identity / Who is Parth / Bio / About / Intro
  if (q.includes('who is parth') || q.includes('who are you') || q.includes('about') || q.includes('bio') || q.includes('intro') || q.includes('background') || q.includes('tell me about yourself') || q.includes('tell me about parth')) {
    return `**About Parth Mishra**:\n\nParth is a software and AI/ML engineer pursuing his B.Tech in Computer Science & Engineering (Specialization in AI & ML) at **VIT Bhopal University** (Batch 2023–2027) with an **8.67 CGPA**.\n\nHe is passionate about first-principles engineering: building low-latency algorithms, autonomous multi-agent pipelines, and robust full-stack applications from scratch.\n\nHe is **Oracle Certified in Agentic AI**, holds a **Harvard CS50 AI** credential, and has solved **250+ algorithmic problems**.\n\nConnect with him directly at **parthmishra9942@gmail.com** or [LinkedIn](https://linkedin.com/in/parth-mishra-4b7578242).`;
  }

  // 15. Greetings / Small talk
  if (q === 'hi' || q === 'hello' || q === 'hey' || q.startsWith('hi ') || q.startsWith('hello ') || q === 'good morning' || q === 'good evening' || q === 'sup') {
    return `Hello! 👋 I'm **Parth Mishra's AI Representative**.\n\nI can answer questions about:\n- Parth's **projects** (VectorDB HNSW, VoiceCart, Fleet, AIMealTracker)\n- **Tech stack** and system design\n- **Academic standing** (8.67 CGPA @ VIT Bhopal)\n- **Verified credentials** (Oracle, Harvard, Coursera)\n- **Resume download** & **Contact details**\n\nWhat would you like to know?`;
  }

  // 16. Fallback with smart contextual suggestions
  return `Thanks for asking! Parth Mishra is an AI & Systems Engineer with an **8.67 CGPA** at VIT Bhopal.\n\nI can give you detailed answers on:\n- **Contact & Email**: Just ask *"What is Parth's email?"*\n- **Projects**: Ask *"Tell me about VectorDB"* or *"Explain VoiceCart"*\n- **Resume**: Ask *"Download resume"*\n- **Certifications**: Ask *"Show Oracle & Harvard credentials"*\n- **Tech Stack**: Ask *"What technologies does Parth use?"*\n\nYou can also contact Parth directly at **parthmishra9942@gmail.com** or on [LinkedIn](https://linkedin.com/in/parth-mishra-4b7578242).`;
}

export default function AskMeModal({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I'm **Parth's AI Representative**. Ask me anything about his projects, architecture designs, academic standing, or full-stack tech stack.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const sendQuery = async (queryText?: string) => {
    const text = (queryText ?? input).trim();
    if (!text || isTyping) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Attempt backend API (localhost in local dev, same-origin /api rewrite in production)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      const targetUrl = isLocal ? 'http://127.0.0.1:8000/api/portfolio/chat' : '/api/portfolio/chat';
      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
        signal: controller.signal,
      }).catch(() => null);
      clearTimeout(timeoutId);

      if (res && res.ok) {
        const data = await res.json();
        const isGeneric = data.response && data.response.includes('I can answer questions regarding:');
        const reply = (!isGeneric && data.response) ? data.response : getLocalAnswer(text);
        setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      } else {
        // Instantaneous grounded engineering response
        await new Promise((r) => setTimeout(r, 380));
        const localReply = getLocalAnswer(text);
        setMessages((prev) => [...prev, { role: 'assistant', content: localReply }]);
      }
    } catch {
      const localReply = getLocalAnswer(text);
      setMessages((prev) => [...prev, { role: 'assistant', content: localReply }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Ask Parth's AI"
    >
      <motion.div
        className="relative flex h-[85vh] max-h-[720px] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-ink shadow-[0_25px_80px_rgba(0,0,0,0.8)]"
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 20 }}
        transition={{ duration: 0.3, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-ink-2 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-lg tracking-wide text-bone">PARTH&apos;S AI REPRESENTATIVE</span>
                <span className="rounded bg-crimson-2/20 px-1.5 py-0.5 text-[9px] font-bold text-crimson-2">ACTIVE</span>
              </div>
              <p className="text-[11px] text-mist">Grounded on real engineering portfolio, resume, and project code</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Ask AI"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-bone hover:bg-white/20"
          >
            ✕
          </button>
        </div>

        {/* Chat Messages */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5 text-sm">
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-mist">
                {m.role === 'user' ? 'You' : 'Parth AI'}
              </span>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-crimson text-white shadow-lg'
                    : 'border border-white/10 bg-white/5 text-bone/90 backdrop-blur-sm'
                }`}
              >
                <div className="space-y-2 whitespace-pre-wrap">
                  {m.content.split('\n\n').map((para, pIdx) => {
                    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
                    const parts: (string | JSX.Element)[] = [];
                    let lastIndex = 0;
                    let match: RegExpExecArray | null;

                    while ((match = linkRegex.exec(para)) !== null) {
                      if (match.index > lastIndex) {
                        parts.push(para.slice(lastIndex, match.index));
                      }
                      const label = match[1];
                      const url = match[2];
                      parts.push(
                        <a
                          key={match.index}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-crimson-2 underline underline-offset-2 hover:text-white transition-colors"
                        >
                          {label}
                        </a>
                      );
                      lastIndex = match.index + match[0].length;
                    }
                    if (lastIndex < para.length) {
                      parts.push(para.slice(lastIndex));
                    }

                    return (
                      <p key={pIdx}>
                        {parts.map((part, i) => {
                          if (typeof part !== 'string') return part;
                          const boldSplit = part.split('**');
                          return boldSplit.map((chunk, j) =>
                            j % 2 === 1 ? (
                              <strong key={`${i}-${j}`} className="font-semibold text-white">
                                {chunk}
                              </strong>
                            ) : (
                              chunk
                            )
                          );
                        })}
                      </p>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-mist">
              <span className="h-2 w-2 animate-bounce rounded-full bg-crimson-2" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-crimson-2 [animation-delay:0.2s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-crimson-2 [animation-delay:0.4s]" />
              <span className="ml-2 text-xs text-smoke">Synthesizing engineering response...</span>
            </div>
          )}
        </div>

        {/* Quick starter chips */}
        <div className="border-t border-white/10 bg-ink-2/60 px-5 py-2.5">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-smoke">Suggested Topics</p>
          <div className="flex snap-x gap-2 overflow-x-auto pb-1 text-xs">
            {STARTER_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => sendQuery(q)}
                className="whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-3 py-1 font-medium text-bone/90 transition hover:border-crimson-2 hover:text-crimson-2"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendQuery();
          }}
          className="flex items-center gap-2 border-t border-white/10 bg-ink p-4"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about Parth's projects, stack, or experience..."
            className="flex-1 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-bone placeholder-smoke focus:border-crimson-2 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="rounded-lg bg-crimson-2 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-crimson disabled:opacity-40"
          >
            Send ↵
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
