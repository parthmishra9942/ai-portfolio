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
  resumeUrl: 'https://github.com/parthmishra9942/resume/blob/main/Parth_Mishra_Resume_AI.pdf',
  // runs-on.dev developer domain link
}

// In production on runs-on.dev or vercel.app, use the same-origin /api rewrite proxy.
// This eliminates cross-origin CORS blocks and preflight roundtrips completely.
export const API_URL =
  typeof window !== 'undefined' &&
  window.location.hostname !== 'localhost' &&
  window.location.hostname !== '127.0.0.1'
    ? '/api'
    : (import.meta.env.VITE_API_URL || 'http://localhost:8000')

export function warmupBackend() {
  try {
    fetch(`${API_URL}/health`, { method: 'GET' }).catch(() => {})
  } catch (e) {
    // Ignore warmup errors
  }
}
