import { Mail, FileText, Github, Code2, Sparkles, Briefcase } from 'lucide-react'
import { CANDIDATE } from './config'

function SquareIcon({ className, icon, label, onClick }) {
  return (
    <button className={`dock-square ${className}`} onClick={onClick} title={label}>
      {icon}
      <span className="dock-label">{label}</span>
    </button>
  )
}

export default function Dock({ onOpenChat, onOpenJDMatch }) {
  return (
    <div className="dock">
      <SquareIcon
        className="icon-mail"
        icon={<Mail size={22} strokeWidth={2.2} />}
        label="Email"
        onClick={() => window.open(`mailto:${CANDIDATE.email}`, '_blank')}
      />

      <SquareIcon
        className="icon-linkedin"
        icon={<span className="brand-text">in</span>}
        label="LinkedIn"
        onClick={() => window.open(CANDIDATE.linkedin, '_blank')}
      />

      <SquareIcon
        className="icon-github"
        icon={<Github size={22} strokeWidth={2} />}
        label="GitHub"
        onClick={() => window.open(CANDIDATE.github, '_blank')}
      />

      <SquareIcon
        className="icon-leetcode"
        icon={<Code2 size={22} strokeWidth={2.2} />}
        label="LeetCode"
        onClick={() => window.open(CANDIDATE.leetcode, '_blank')}
      />

      <SquareIcon
        className="icon-resume"
        icon={<FileText size={22} strokeWidth={2.2} />}
        label="Resume"
        onClick={() => {
          if (CANDIDATE.resumeUrl) {
            window.open(CANDIDATE.resumeUrl, '_blank')
          } else {
            alert('Add your resume link in src/config.js (resumeUrl) to enable this.')
          }
        }}
      />
      <SquareIcon
        className="icon-jd-match"
        icon={<Briefcase size={22} strokeWidth={2.2} />}
        label="Match a JD"
        onClick={onOpenJDMatch}
      />

      <button className="ask-me-pill" onClick={onOpenChat}>
        <Sparkles size={18} className="ask-me-sparkle" />
        <span>Ask Me</span>
      </button>
    </div>
  )
}
