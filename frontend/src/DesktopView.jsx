import Dock from './Dock'
import { CANDIDATE } from './config'

export default function DesktopView({ onOpenChat }) {
  return (
    <div className="desktop">
      <div className="wallpaper" />

      <div className="menubar">
        <span className="menubar-dot">●</span>
        <span>{CANDIDATE.fullName}</span>
      </div>

      <div className="greeting">
        <p className="greeting-hi">Hey, I'm {CANDIDATE.name}! welcome to my</p>
        <h1 className="greeting-title">PORTFOLIO</h1>
        <button className="cta-button" onClick={onOpenChat}>
          💬 Ask my AI anything
        </button>
      </div>

      <Dock onOpenChat={onOpenChat} />
    </div>
  )
}
