# AI Portfolio — Parth Mishra

An interactive portfolio site where recruiters and visitors can **chat with an AI representative** of me, and even **paste a job description to get an instant suitability breakdown** against my actual skills and projects.

**🔗 Live demo:** [your-portfolio.vercel.app](#) &nbsp;·&nbsp; **⚙️ API:** [your-app.onrender.com](#)

> Replace the links above once deployed (see [Deployment](#deployment) below).

---

## ✨ Features

- **💬 Ask Me — AI Chat**
  A streaming chat window where visitors can ask about my projects, skills, and background. Powered by an LLM grounded only in my real candidate data — no hallucinated experience.

- **💼 JD Match — Suitability Check**
  Recruiters can paste a job description and get an instant, structured breakdown:
  1. Suitability verdict (Yes / Partially / No)
  2. Missing skills or requirements
  3. Strongest matching points
  4. Interview recommendation

- **🛡️ Rate limiting**
  Both AI endpoints are protected against abuse (20 req/min on `/chat`, 5 req/min on `/match-jd`) so the API key stays safe even when the URL is public.

- **🖥️ Desktop-style UI**
  A macOS-inspired desktop with a dock, floating "windows" for chat and JD-match, and quick links to email, LinkedIn, GitHub, LeetCode, and résumé.

---

## 🧱 Tech Stack

| Layer      | Tech |
|------------|------|
| Frontend   | React (Vite), plain CSS |
| Backend    | FastAPI (Python) |
| LLM        | [Groq](https://groq.com) — `openai/gpt-oss-20b` |
| Rate limit | [slowapi](https://github.com/laurentS/slowapi) |
| Hosting    | Vercel (frontend) · Render (backend) |

---

## 📂 Project Structure

```
ai-portfolio/
├── backend/
│   ├── main.py            # FastAPI app: /health, /chat, /match-jd
│   ├── models.py           # Candidate profile loading + validation
│   ├── system_prompt.py    # Builds the LLM system prompt from profile data
│   ├── requirements.txt
│   └── .env                # GROQ_API_KEY (not committed)
├── data/                   # Candidate profile data
└── frontend/
    └── src/
        ├── App.jsx          # Root component, view state
        ├── DesktopView.jsx  # Landing "desktop" view
        ├── Dock.jsx         # macOS-style dock with app icons
        ├── ChatView.jsx     # AI chat window
        ├── JDMatchView.jsx  # JD-matching window
        └── config.js        # Candidate contact/profile info
```

---

## 🚀 Running Locally

### Prerequisites
- Python 3.12+
- Node.js 18+
- A free [Groq API key](https://console.groq.com)

### 1. Clone the repo
```bash
git clone https://github.com/parthmishra9942/ai-portfolio.git
cd ai-portfolio
```

### 2. Backend setup
```bash
cd backend
pip install -r requirements.txt
```

Create `backend/.env`:
```
GROQ_API_KEY=your_groq_api_key_here
```

Run it:
```bash
uvicorn main:app --reload --port 8000
```
Visit `http://localhost:8000/health` — you should see `{"status":"ok","candidate":"Parth Mishra"}`.

### 3. Frontend setup
```bash
cd ../frontend
npm install
npm run dev
```
Visit `http://localhost:5173`.

---

## 🌐 Deployment

**Backend → Render**
1. New Web Service → connect this repo → Root Directory: `backend`
2. Build Command: `pip install -r requirements.txt`
3. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variable `GROQ_API_KEY`

**Frontend → Vercel**
1. Add New Project → connect this repo → Root Directory: `frontend`
2. Add environment variable `VITE_API_URL` = your Render URL
3. Deploy

**Lock down CORS**
Once you have your Vercel URL, add `ALLOWED_ORIGINS` on Render pointing to it, so only your real frontend can call the API.

> ⚠️ Render's free tier sleeps after 15 minutes of inactivity — the first request afterward can take 30–50 seconds to wake up. This is expected on free hosting.

---

## 🔒 Security Notes

- `.env` is gitignored — the real Groq key is never committed.
- Both AI endpoints are rate-limited per IP.
- CORS is restricted to the deployed frontend origin in production.

---

## 📬 Contact

- **Email:** parthmishra9942@gmail.com
- **LinkedIn:** [linkedin.com/in/your-profile](#)
- **GitHub:** [github.com/parthmishra9942](https://github.com/parthmishra9942)
- **LeetCode:** [leetcode.com/your-profile](#)

---

## 📸 Screenshots

> Add screenshots or a GIF here once deployed — this is the first thing recruiters see.

```
![Desktop view](./screenshots/desktop.png)
![Chat view](./screenshots/chat.png)
![JD match view](./screenshots/jd-match.png)
```
