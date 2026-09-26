"""
Quick standalone test: confirms the Groq API key works and the model
answers using the candidate data. Run this before building the full API.

    pip install groq python-dotenv --break-system-packages
    python test_groq_connection.py
"""
import os
from dotenv import load_dotenv
from groq import Groq

from models import load_profile
from system_prompt import build_system_prompt

load_dotenv()

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

profile = load_profile()
system_prompt = build_system_prompt(profile.model_dump())

# Free, fast Groq model good for this use case (current as of testing — check
# console.groq.com/docs/models if this ever 404s again, as Groq's free catalog changes)
MODEL = "openai/gpt-oss-20b"

response = client.chat.completions.create(
    model=MODEL,
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "Tell me about this candidate in 3 sentences."},
    ],
)

print("=== AI Response ===")
print(response.choices[0].message.content)
