"""
Pydantic models for validating candidate_profile.json.
Run `python models.py` to validate the JSON file directly.
"""
from pydantic import BaseModel, EmailStr
from typing import List, Dict, Optional
import json
import os


class Education(BaseModel):
    degree: str
    institution: str
    batch: str
    roll_number: str
    cgpa: Optional[str] = None


class Skills(BaseModel):
    languages: List[str] = []
    frontend: List[str] = []
    backend: List[str] = []
    databases: List[str] = []
    ai_ml: List[str] = []
    dsa_patterns: List[str] = []
    tools: List[str] = []


class Project(BaseModel):
    name: str
    description: str
    tech_stack: List[str] = []
    highlights: List[str] = []


class SocialLinks(BaseModel):
    email: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    leetcode: Optional[str] = None


class CandidateProfile(BaseModel):
    name: str
    headline: str
    education: Education
    target_roles: List[str] = []
    target_locations: List[str] = []
    skills: Skills
    projects: List[Project]
    experience: Optional[str] = None
    achievements: Optional[str] = None
    certifications: Optional[str] = None
    social_links: SocialLinks


def load_profile(path: str = None) -> CandidateProfile:
    """Load and validate candidate_profile.json. Raises if the JSON doesn't match the schema."""
    if path is None:
        path = os.path.join(os.path.dirname(__file__), "..", "data", "candidate_profile.json")
    with open(path, "r", encoding="utf-8") as f:
        raw = json.load(f)
    return CandidateProfile(**raw)


if __name__ == "__main__":
    profile = load_profile()
    print(f"✅ Profile valid for: {profile.name}")
    print(f"   {len(profile.projects)} projects loaded.")
