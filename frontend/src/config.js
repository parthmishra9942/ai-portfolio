// Central place for the links the dock icons open.
// Keep this in sync with data/candidate_profile.json.
export const CANDIDATE = {
  name: 'Parth',
  fullName: 'Parth Mishra',
  email: 'parthmishra9942@gmail.com',
  linkedin: 'https://linkedin.com/in/parth-mishra-4b7578242',
  github: 'https://github.com/parthmishra9942',
  leetcode: 'https://leetcode.com/u/parth213g',
  portfolioUrl: 'https://parthh.runs-on.dev',
  // Resume PDF — opens when the "Resume" dock icon is clicked
  resumeUrl: 'https://github.com/parthmishra9942/resume/blob/main/ParthMishra_Resume%20(1).pdf',
  // runs-on.dev developer domain link
}

export const API_URL = import.meta.env.VITE_API_URL || 'https://ai-portfolio-backend-255o.onrender.com'

export function warmupBackend() {
  try {
    fetch(`${API_URL}/health`, { method: 'GET' }).catch(() => {})
  } catch (e) {
    // Ignore warmup errors
  }
}
