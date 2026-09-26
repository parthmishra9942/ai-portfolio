import { useState } from 'react'
import DesktopView from './DesktopView'
import ChatView from './ChatView'

export default function App() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <>
      <DesktopView onOpenChat={() => setChatOpen(true)} />
      {chatOpen && <ChatView onClose={() => setChatOpen(false)} />}
    </>
  )
}
