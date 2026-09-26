import { useState } from 'react'
import DesktopView from './DesktopView'
import ChatView from './ChatView'
import JDMatchView from './JDMatchView'

export default function App() {
  const [chatOpen, setChatOpen] = useState(false)
  const [jdMatchOpen, setJdMatchOpen] = useState(false)

  return (
    <>
      <DesktopView
        onOpenChat={() => setChatOpen(true)}
        onOpenJDMatch={() => setJdMatchOpen(true)}
      />
      {chatOpen && <ChatView onClose={() => setChatOpen(false)} />}
      {jdMatchOpen && <JDMatchView onClose={() => setJdMatchOpen(false)} />}
    </>
  )
}