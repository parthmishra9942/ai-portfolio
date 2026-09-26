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


# Allow the React dev server (and your deployed frontend) to call this API.
# Tighten allow_origins to your real frontend domain before going to production.
allowed_origins_env = os.environ.get("ALLOWED_ORIGINS", "*")
allowed_origins = [o.strip() for o in allowed_origins_env.split(",")] if allowed_origins_env != "*" else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
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