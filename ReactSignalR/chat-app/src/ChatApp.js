import React from 'react'
import HomePage from './pages/HomePage'
import { SignalRProvider } from './contexts/SignalRContext'

const ChatApp = () => {
  return (
    <SignalRProvider>
      <HomePage />
    </SignalRProvider>
  )
}

export default ChatApp