import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { LandingPage } from './components/LandingPage'
import { BuyMode } from './components/BuyMode'
import { SavedItemsPage } from './components/SavedItemsPage'
import { SellMode } from './components/SellMode'
import './App.css'

type AppMode = 'landing' | 'buy' | 'sell' | 'saved'

function App() {
  const [mode, setMode] = useState<AppMode>('landing')

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden noise">
      <div className="dynamic-bg" />
      <AnimatePresence mode="wait">
        {mode === 'landing' && (
          <LandingPage key="landing" onModeSelect={setMode} />
        )}
        {mode === 'buy' && (
          <BuyMode key="buy" onBack={() => setMode('landing')} onSavedClick={() => setMode('saved')} />
        )}
        {mode === 'sell' && (
          <SellMode key="sell" onBack={() => setMode('landing')} />
        )}
        {mode === 'saved' && (
          <SavedItemsPage key="saved" onBack={() => setMode('buy')} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
