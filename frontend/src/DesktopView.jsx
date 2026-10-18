import Dock from './Dock'
import { CANDIDATE } from './config'

export default function DesktopView({ onOpenChat, onOpenJDMatch }) {
  return (
    <div className="desktop">
      <div className="wallpaper" />

      <div className="menubar">
        <div className="menubar-left">
          <span className="menubar-dot">●</span>
          <span>{CANDIDATE.fullName}</span>
        </div>
        <div className="menubar-right">
          <a
            href={CANDIDATE.runsOnUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="menubar-pill"
            title="Claim your own free subdomain on runs-on.dev"
          >
            <span className="live-dot" />
            <span className="menubar-pill-text">runs-on.dev</span>
            <span className="menubar-arrow">↗</span>
          </a>
        </div>
      </div>

      <div className="greeting">
        <p className="greeting-hi">Hey, I'm {CANDIDATE.name}! welcome to my</p>
        <h1 className="greeting-title">PORTFOLIO</h1>

        <div className="subdomain-badge-wrap">
          <a
            href={CANDIDATE.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="subdomain-pill"
            title="Live on runs-on.dev"
          >
            <span className="pulse-dot-green" />
            <span className="subdomain-text">parthh.runs-on.dev</span>
            <span className="subdomain-tag">live</span>
            <span className="subdomain-arrow">↗</span>
          </a>
        </div>

        <button className="cta-button" onClick={onOpenChat}>
          💬 Ask my AI anything
        </button>
      </div>

      <Dock onOpenChat={onOpenChat} onOpenJDMatch={onOpenJDMatch} />
    </div>
  )
}