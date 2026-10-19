"""
FastAPI backend for the AI Portfolio chatbot.

Run locally:
    pip install fastapi uvicorn groq python-dotenv pydantic slowapi
    uvicorn main:app --reload --port 8000

Endpoints:
    GET  /health        -> simple health check
    POST /chat           -> streams the AI's answer given full conversation history
    POST /match-jd       -> analyzes a pasted job description against the candidate profile
"""
import os
import json
from typing import List, Literal

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from pydantic import BaseModel
from dotenv import load_dotenv
from groq import Groq

from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from models import load_profile
from system_prompt import build_system_prompt

load_dotenv()

GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY is not set. Create a .env file with GROQ_API_KEY=your_key")

client = Groq(api_key=GROQ_API_KEY)
MODEL = "openai/gpt-oss-20b"  # check console.groq.com/docs/models if this ever 404s

# Load + validate candidate data once at startup
profile = load_profile()
SYSTEM_PROMPT = build_system_prompt(profile.model_dump())

# --- Rate limiter setup ---
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="AI Portfolio Backend")
app.state.limiter = limiter
from slowapi.middleware import SlowAPIMiddleware

@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={
            "error": "rate_limited",
            "message": "Too many requests — please slow down and try again shortly."
        },
    )


# CORS setup: explicitly allow official runs-on.dev domain, legacy vercel app, and local dev
default_allowed = [
    "https://parthh.runs-on.dev",
    "https://ai-portfolio-beige-xi.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]

allowed_origins_env = os.environ.get("ALLOWED_ORIGINS", "*")
if allowed_origins_env and allowed_origins_env != "*":
    env_origins = [o.strip() for o in allowed_origins_env.split(",") if o.strip()]
    allowed_origins = list(set(default_allowed + env_origins))
else:
    allowed_origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"^https?://([a-zA-Z0-9-]+\.)?(runs-on\.dev|vercel\.app)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    messages: List[ChatMessage]  # full conversation history, sent by the frontend each time


class JDMatchRequest(BaseModel):
    job_description: str


@app.get("/health")
@app.head("/health")
def health():
    return {"status": "ok", "candidate": profile.name}


@app.post("/chat")
@limiter.limit("20/minute")
def chat(request: Request, req: ChatRequest):
    if not req.messages:
        raise HTTPException(status_code=400, detail="messages cannot be empty")

    groq_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    groq_messages += [{"role": m.role, "content": m.content} for m in req.messages]

    def token_stream():
        try:
            stream = client.chat.completions.create(
                model=MODEL,
                messages=groq_messages,
                stream=True,
            )
            for chunk in stream:
                delta = chunk.choices[0].delta.content
                if delta:
                    # Server-Sent-Events style chunk; frontend parses these
                    yield f"data: {json.dumps({'content': delta})}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(token_stream(), media_type="text/event-stream")


class PortfolioChatRequest(BaseModel):
    message: str


@app.post("/portfolio/chat")
@app.post("/api/portfolio/chat")
def portfolio_chat(req: PortfolioChatRequest):
    """Grounded AI Representative API for Parth Mishra's Portfolio."""
    msg = req.message.lower().strip()

    if any(k in msg for k in ["gmail", "email", "mail", "contact", "phone", "reach", "connect", "inbox"]):
        return {
            "status": "success",
            "response": "Parth Mishra can be contacted directly via:\n\n- **Email**: **parthmishra9942@gmail.com**\n- **LinkedIn**: [linkedin.com/in/parth-mishra-4b7578242](https://linkedin.com/in/parth-mishra-4b7578242)\n- **GitHub**: [github.com/parthmishra9942](https://github.com/parthmishra9942)\n\nHe typically responds to engineering and hiring inquiries within a few hours!"
        }

    if any(k in msg for k in ["why", "hire", "candidate", "value", "strengths"]):
        return {
            "status": "success",
            "response": "Here is why **Parth Mishra** is an exceptional candidate for AI & Full-Stack Engineering roles:\n\n1. **First-Principles Engineering**: Builds low-latency systems from scratch (in-memory VectorDB with HNSW graph indexing, 0ms on-device NLU) rather than assembling shallow wrapper APIs.\n2. **Academic & Algorithmic Grit**: B.Tech CSE (AI & ML) with **8.67 CGPA** at VIT Bhopal, and **250+ solved algorithmic problems** across LeetCode, GFG, and HackerRank.\n3. **Certified Competence**: Holds the industry **Oracle Certified Foundations Associate in Agentic AI** credential (`103546830AAI26OFA`), **Harvard CS50 AI with Python**, and **UMichigan Applied ML**.\n4. **Production Readiness**: Ships robust full-stack production systems (Python, FastAPI, TypeScript, React, Docker) with sub-100ms API response targets.\n\nHe is available immediately for internships and 2027 grad full-time roles. Contact: **parthmishra9942@gmail.com**"
        }

    if any(k in msg for k in ["stack", "tech", "skill", "language", "technolog"]):
        return {
            "status": "success",
            "response": "**Parth's Primary Technical Stack & Skills**:\n\n- **Languages**: Python (Primary), TypeScript, JavaScript, SQL, C++\n- **AI & ML**: Agentic AI (Oracle Certified), Vector Search (HNSW), RAG Pipelines, Claude 3.5 Sonnet Vision, PyTorch, Ollama\n- **Backend & Systems**: FastAPI, Node.js, Express, Uvicorn, REST APIs, WebSockets, JWT Auth, Rate Limiting\n- **Frontend & Mobile**: React, React Native (Expo), Vite, Tailwind CSS, IndexedDB, Progressive Web Apps (PWA)\n- **Databases & DevOps**: PostgreSQL, Supabase, SQLite, Docker, Git/GitHub, Linux CLI"
        }

    if any(k in msg for k in ["fleet", "agent", "autonomous", "job search", "antigravity", "forge"]):
        return {
            "status": "success",
            "response": "The **Antigravity Job Fleet** is an autonomous 4-agent system built to streamline engineering placement discovery and outreach:\n\n- **Scout Agent**: Zero-auth multi-stream scraper across Remotive, Arbeitnow, Jobicy, and Internshala with SHA-256 anti-duplicate hashing.\n- **Job Reader**: DOM parser & ATS matching engine calculating compatibility against Parth's profile.\n- **CV Adapter**: Dynamic dual-resume router (Full-Stack vs AI/ML Specialist).\n- **Dispatcher Agent**: Dispatches cold emails and streams real-time FastAPI WebSocket telemetry in under 70ms.\n\nScale: Over **140 verified applications** managed with 100% account safety and zero LinkedIn scraping.\nRepo: [github.com/parthmishra9942/my-job-search](https://github.com/parthmishra9942/my-job-search)"
        }

    if any(k in msg for k in ["credential", "cgpa", "gpa", "cert", "oracle", "harvard", "cs50", "coursera", "degree", "college", "vit", "bhopal"]):
        return {
            "status": "success",
            "response": "**Academic Standing & Verified Credentials**:\n\n- **Academic Honor Roll**: B.Tech CSE (AI & ML) at **VIT Bhopal University** (Batch 2023–2027) with an **8.67 CGPA**\n- **Oracle Certified**: Foundations Associate in **Agentic AI** (Sept 2026, Credential ID: `103546830AAI26OFA`)\n- **Harvard University**: CS50's Introduction to Artificial Intelligence with Python (Verify ID: `3e7e245a-5d02-4e80-ac1f-375fd52c3581`)\n- **University of Michigan**: Applied Machine Learning in Python (Coursera: `G1Q6ZYPKPWP4`)\n- **Competitive Programming**: 250+ algorithmic problems solved on LeetCode & HackerRank"
        }

    if any(k in msg for k in ["voicecart", "voice", "speech", "nlu", "audio"]):
        return {
            "status": "success",
            "response": "**VoiceCart** is a 100% on-device voice shopping assistant running completely client-side in the browser:\n\n- **0ms Cloud Network Latency**: Operates with zero user telemetry sent to servers\n- **Deterministic Local NLU**: Browser-native Web Speech recognition with rule-based intent & entity parsing\n- **Offline PWA**: IndexedDB storage with optimistic UI reconciliation\n\nCode: [github.com/parthmishra9942/voicecart](https://github.com/parthmishra9942/voicecart)"
        }

    if any(k in msg for k in ["meal", "aimealtracker", "food", "nutrition", "diet"]):
        return {
            "status": "success",
            "response": "**AIMealTracker** is a multi-modal meal nutritional analyzer powered by Claude 3.5 Sonnet Vision:\n\n- Parses nuanced colloquial Indian home-cooked meals with **94% parsing accuracy**\n- Extracts structured JSON macronutrients and micronutrients\n- Sub-800ms parsing turnaround via async FastAPI backend caching\n\nCode: [github.com/parthmishra9942/Ai-Meal-Tracker](https://github.com/parthmishra9942/Ai-Meal-Tracker)"
        }

    if any(k in msg for k in ["project", "work", "repo", "built", "github"]):
        return {
            "status": "success",
            "response": "Here are Parth's flagship open-source engineering originals:\n\n1. **[VectorDB (HNSW)](https://github.com/parthmishra9942/vectordb-python)**: Pure Python in-memory vector database with HNSW graph indexing (<15ms latency, 38× speedup).\n2. **[VoiceCart](https://github.com/parthmishra9942/voicecart)**: 100% on-device voice shopping assistant with deterministic NLU and 0ms cloud latency.\n3. **[AIMealTracker](https://github.com/parthmishra9942/Ai-Meal-Tracker)**: Multi-modal vision nutrition analyzer using Claude 3.5 Sonnet Vision (94% accuracy).\n4. **[Antigravity Job Fleet](https://github.com/parthmishra9942/my-job-search)**: Decoupled 4-agent autonomous placement & outreach engine.\n\nExplore his full GitHub: [github.com/parthmishra9942](https://github.com/parthmishra9942)"
        }

    if any(k in msg for k in ["location", "city", "where", "relocat", "remote", "bengaluru", "hyderabad", "pune", "delhi"]):
        return {
            "status": "success",
            "response": "**Location & Relocation Details**:\n\n- **Current Base**: VIT Bhopal University campus / Madhya Pradesh, India\n- **Relocation Availability**: **100% open to relocate** across Bengaluru, Hyderabad, Pune, Gurgaon, Noida, or Mumbai.\n- **Work Modes**: Flexible for on-site, hybrid, or global remote engineering roles."
        }

    if any(k in msg for k in ["resume", "cv", "pdf"]):
        return {
            "status": "success",
            "response": "You can view and download Parth's official 1-page engineering resume here:\n\n📄 **[Download Parth Mishra's Resume PDF](/assets/Parth_Mishra_Resume.pdf)**\n\nHighlights: 8.67 CGPA @ VIT Bhopal, Oracle Certified Agentic AI, 250+ DSA problems, VectorDB, VoiceCart."
        }

    if any(k in msg for k in ["vectordb", "hnsw", "vector search"]):
        return {
            "status": "success",
            "response": "**VectorDB (HNSW)** is an in-memory vector database built from scratch in Python with Hierarchical Navigable Small World (HNSW) graph indexing.\n\n- **Sub-15ms retrieval latency** with a **38× speedup** over brute-force search\n- Multi-layer graph navigation with Cosine, Euclidean, and Dot Product distance metrics\n- Standalone REST API in FastAPI\n\nCode: [github.com/parthmishra9942/vectordb-python](https://github.com/parthmishra9942/vectordb-python)"
        }

    if any(k in msg for k in ["anything", "surprise", "what can you do", "help", "random", "options"]):
        return {
            "status": "success",
            "response": "Here are the top systems you can explore about **Parth Mishra**:\n\n1. **VectorDB (HNSW)**: In-memory vector database built from scratch in Python (<15ms latency, 38× speedup).\n2. **VoiceCart**: 100% on-device voice shopping assistant with 0ms cloud latency.\n3. **Autonomous 4-Agent Fleet**: Multi-agent pipeline coordinating 140+ applications with zero LinkedIn scraping.\n4. **Verified Certifications**: Oracle Certified in Agentic AI (`103546830AAI26OFA`), Harvard CS50 AI, and UMichigan ML.\n5. **Academic Standing**: 8.67 CGPA at VIT Bhopal.\n\nAsk me about his **projects**, **tech stack**, **resume**, or **how to hire him**!"
        }

    return {
        "status": "success",
        "response": "Parth Mishra is an AI & Systems Engineer with an **8.67 CGPA** at VIT Bhopal.\n\nI can answer questions regarding:\n- **Contact**: Email at **parthmishra9942@gmail.com**\n- **Projects**: VectorDB (HNSW), VoiceCart, Autonomous Fleet, AIMealTracker\n- **Credentials**: Oracle Certified Agentic AI, Harvard CS50 AI, UMichigan ML\n- **Resume**: Download direct PDF sheet\n\nFeel free to ask any specific question!"
    }


@app.post("/match-jd")
@limiter.limit("5/minute")
def match_jd(request: Request, req: JDMatchRequest):
    """Step 8: HR pastes a JD, AI answers suitability/strengths/gaps based ONLY on candidate data."""
    if not req.job_description.strip():
        raise HTTPException(status_code=400, detail="job_description cannot be empty")

    analysis_prompt = f"""A recruiter has pasted the following Job Description. Using ONLY the candidate
data you were given, answer these four things clearly with headers:
1. Is this candidate suitable for this role? (Yes/Partially/No, with reasoning)
2. What skills or requirements from the JD are missing from the candidate's profile?
3. What are the candidate's strongest matching points for this JD?
4. Should the recruiter interview this person? (brief recommendation)

JOB DESCRIPTION:
{req.job_description}
"""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": analysis_prompt},
        ],
    )
    return {"analysis": response.choices[0].message.content}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)