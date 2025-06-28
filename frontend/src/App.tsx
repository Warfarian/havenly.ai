import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, Bot, Upload, Video, Sparkles, ArrowUpRight, Camera, Play } from 'lucide-react'
import './App.css'

type AppMode = 'landing' | 'buy' | 'sell'

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
          <BuyMode key="buy" onBack={() => setMode('landing')} />
        )}
        {mode === 'sell' && (
          <SellMode key="sell" onBack={() => setMode('landing')} />
        )}
      </AnimatePresence>
    </div>
  )
}

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function StickyNavbar({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 100) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 section-padding"
      style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
    >
      {children}
    </motion.nav>
  )
}

function LandingPage({ onModeSelect }: { onModeSelect: (mode: AppMode) => void }) {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, -100])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen"
    >
      {/* Background Elements */}
      <div className="fixed inset-0 grid-pattern opacity-40" style={{ pointerEvents: 'none' }} />
      <motion.div 
        style={{ y: y1, pointerEvents: 'none' }}
        className="fixed top-32 left-32 w-[500px] h-[500px] bg-blue-500/3 rounded-full blur-3xl animate-float"
      />
      <motion.div 
        style={{ y: y2, pointerEvents: 'none' }}
        className="fixed bottom-32 right-32 w-[500px] h-[500px] bg-purple-500/3 rounded-full blur-3xl animate-float-delayed"
      />

      {/* Navigation */}
      <StickyNavbar>
        <div className="container-width flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center micro-interaction"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-5 h-5 text-black" />
            </motion.div>
            <span className="text-2xl font-medium tracking-tight text-heading">Havenly</span>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-12 text-small">
            <motion.a 
              href="#" 
              className="text-white/60 hover:text-white transition-colors duration-300 micro-interaction"
              whileHover={{ y: -2 }}
            >
              Features
            </motion.a>
            <motion.a 
              href="#" 
              className="text-white/60 hover:text-white transition-colors duration-300 micro-interaction"
              whileHover={{ y: -2 }}
            >
              About
            </motion.a>
            <motion.a 
              href="#" 
              className="text-white/60 hover:text-white transition-colors duration-300 micro-interaction"
              whileHover={{ y: -2 }}
            >
              Contact
            </motion.a>
          </div>
        </div>
      </StickyNavbar>

      {/* Hero Section */}
      <section className="scroll-section scroll-highlight">
        <motion.div style={{ opacity }} className="container-width text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <motion.h1 
                className="hero-text text-display text-shadow"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              >
                Your AI-Powered
                <br />
                <motion.span 
                  className="gradient-accent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1 }}
                >
                  Home Concierge
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-body text-white/70 max-w-4xl mx-auto text-xl leading-relaxed stagger-animation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                Transform your space with zero effort. Whether you're decluttering to sell 
                or making your room cozy, Havenly's autonomous agents handle everything.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 relative z-10"
            >
              <motion.button 
                className="btn-primary group relative z-20"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onModeSelect('buy')}
                style={{ pointerEvents: 'auto' }}
              >
                Get Started
              </motion.button>
              <motion.button 
                className="btn-secondary relative z-20"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{ pointerEvents: 'auto' }}
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Mode Selection */}
      <section className="relative section-padding">
        <div className="container-width">
          <ScrollReveal>
            <div className="text-center mb-32">
              <motion.h2 
                className="text-display text-6xl mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                Two ways to transform
              </motion.h2>
              <motion.p 
                className="text-body text-white/50 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                Choose your path to a better space
              </motion.p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Buy Mode */}
            <ScrollReveal delay={0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => onModeSelect('buy')}
                className="group cursor-pointer"
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="glass-card p-10 h-full transition-all duration-300 group-hover:border-white/10">
                  <div className="space-y-6">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Camera className="w-8 h-8 text-white/80" />
                    </motion.div>
                    
                    <div className="space-y-4">
                      <h3 className="text-heading text-2xl">Buy</h3>
                      <p className="text-body text-white/60 leading-relaxed">
                        Upload a photo of your room and get AI-powered suggestions to make it cozy.
                      </p>
                    </div>
                    
                    <motion.div 
                      className="flex items-center text-white/60 group-hover:text-white transition-colors pt-4"
                      whileHover={{ x: 4 }}
                    >
                      <span className="text-small">Make it cozy</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Sell Mode */}
            <ScrollReveal delay={0.2}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => onModeSelect('sell')}
                className="group cursor-pointer"
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="glass-card p-10 h-full transition-all duration-300 group-hover:border-white/10">
                  <div className="space-y-6">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Video className="w-8 h-8 text-white/80" />
                    </motion.div>
                    
                    <div className="space-y-4">
                      <h3 className="text-heading text-2xl">Sell</h3>
                      <p className="text-body text-white/60 leading-relaxed">
                        Upload a video of your space and let AI identify sellable items.
                      </p>
                    </div>
                    
                    <motion.div 
                      className="flex items-center text-white/60 group-hover:text-white transition-colors pt-4"
                      whileHover={{ x: 4 }}
                    >
                      <span className="text-small">Declutter space</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative section-padding border-t border-white/5">
        <div className="container-width text-center">
          <motion.p 
            className="text-white/40 text-small"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            © 2024 Havenly — Powered by AI, designed for you
          </motion.p>
        </div>
      </footer>
    </motion.div>
  )
}

function BuyMode({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState([
    { type: 'bot', content: "Hi! I'm your AI home concierge. Upload a photo of your room and I'll help make it cozy! 🏡✨" }
  ])
  const [isUploading, setIsUploading] = useState(false)
  const [products, setProducts] = useState([])

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploading(true)
      
      try {
        // Create FormData for file upload
        const formData = new FormData()
        formData.append('file', file)
        
        // Add user message
        setMessages(prev => [...prev, 
          { type: 'user', content: `Uploaded: ${file.name}` }
        ])
        
        // Call backend API
        const response = await fetch('http://localhost:8000/api/buy/analyze-room', {
          method: 'POST',
          body: formData,
        })
        
        if (!response.ok) {
          throw new Error('Failed to analyze room')
        }
        
        const data = await response.json()
        
        // Add AI response messages
        setMessages(prev => [...prev,
          { type: 'bot', content: data.message },
          { type: 'bot', content: `I can see this is a ${data.analysis.room_type}. ${data.analysis.overall_assessment}` },
          { type: 'bot', content: "Here are my top recommendations:" }
        ])
        
        // Add suggestion messages
        data.analysis.suggestions.forEach((suggestion: any, index: number) => {
          setTimeout(() => {
            setMessages(prev => [...prev, {
              type: 'bot',
              content: `${index + 1}. **${suggestion.item}** - ${suggestion.description}`
            }])
          }, (index + 1) * 1000)
        })
        
        // Store products for display
        setProducts(data.products)
        
        // Add final message about products
        setTimeout(() => {
          setMessages(prev => [...prev, {
            type: 'bot',
            content: `I found ${data.products.length} products that would be perfect for your space! Check them out below.`
          }])
        }, (data.analysis.suggestions.length + 1) * 1000)
        
      } catch (error) {
        console.error('Error analyzing room:', error)
        setMessages(prev => [...prev, {
          type: 'bot',
          content: "Sorry, I had trouble analyzing your room. Please try again or upload a different image."
        }])
      } finally {
        setIsUploading(false)
      }
    }
  }

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="min-h-screen flex flex-col"
    >
      {/* Header */}
      <header className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <button 
            onClick={onBack} 
            className="flex items-center text-white/60 hover:text-white transition-colors group"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Home</span>
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-sm font-medium">Buy Mode — AI Assistant</span>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <main className="flex-1 flex-col max-w-4xl mx-auto w-full p-6">
        <div className="flex-1 space-y-6 mb-8 overflow-y-auto">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-md px-6 py-4 rounded-2xl ${
                message.type === 'user' 
                  ? 'bg-white text-black' 
                  : 'glass-card text-white'
              }`}>
                <p className="text-body" dangerouslySetInnerHTML={{ 
                  __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                }} />
              </div>
            </motion.div>
          ))}
          
          {isUploading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="glass-card px-6 py-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span className="text-body text-white/80">Analyzing your room...</span>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Product Recommendations */}
          {products.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="text-heading text-xl text-white/80">Recommended Products</h3>
              <div className="grid gap-4">
                {products.map((product: any, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-4 rounded-xl"
                  >
                    <div className="space-y-2">
                      <h4 className="text-body font-medium text-white">{product.title}</h4>
                      <p className="text-small text-white/60">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-small text-blue-400 capitalize">{product.category}</span>
                        <a 
                          href={product.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-small text-white/80 hover:text-white transition-colors"
                        >
                          View Product →
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Upload Area */}
        <div className="glass-card rounded-2xl p-8">
          <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-white/40 transition-colors group">
            <Upload className="w-8 h-8 text-white/40 mb-3 group-hover:text-white/60 transition-colors" />
            <span className="text-body text-white/60 mb-1">Upload a photo of your room</span>
            <span className="text-sm text-white/40">PNG, JPG up to 10MB</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </main>
    </motion.div>
  )
}

function SellMode({ onBack }: { onBack: () => void }) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [jobId, setJobId] = useState<string | null>(null)
  const [extractedItems, setExtractedItems] = useState([])
  const [listings, setListings] = useState([])
  const [currentStep, setCurrentStep] = useState<'upload' | 'processing' | 'items' | 'listings'>('upload')

  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploading(true)
      setUploadProgress(0)
      setCurrentStep('processing')
      
      try {
        // Create FormData for file upload
        const formData = new FormData()
        formData.append('file', file)
        
        // Call backend API
        const response = await fetch('http://localhost:8000/api/sell/upload-video', {
          method: 'POST',
          body: formData,
        })
        
        if (!response.ok) {
          throw new Error('Failed to upload video')
        }
        
        const data = await response.json()
        setJobId(data.job_id)
        
        // Poll for extraction status
        pollExtractionStatus(data.job_id)
        
      } catch (error) {
        console.error('Error uploading video:', error)
        setIsUploading(false)
        setCurrentStep('upload')
      }
    }
  }

  const pollExtractionStatus = async (jobId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/sell/extraction-status/${jobId}`)
        const data = await response.json()
        
        setUploadProgress(data.progress)
        
        if (data.status === 'completed') {
          clearInterval(interval)
          setIsUploading(false)
          setExtractedItems(data.items || [])
          setCurrentStep('items')
        } else if (data.status === 'failed') {
          clearInterval(interval)
          setIsUploading(false)
          setCurrentStep('upload')
          console.error('Extraction failed:', data.error)
        }
      } catch (error) {
        console.error('Error polling status:', error)
      }
    }, 1000)
  }

  const generateListings = async () => {
    if (!jobId) return
    
    try {
      const response = await fetch('http://localhost:8000/api/sell/generate-listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_id: jobId }),
      })
      
      const data = await response.json()
      setListings(data.listings)
      setCurrentStep('listings')
      
    } catch (error) {
      console.error('Error generating listings:', error)
    }
  }

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="min-h-screen flex flex-col"
    >
      {/* Header */}
      <header className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <button 
            onClick={onBack} 
            className="flex items-center text-white/60 hover:text-white transition-colors group"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Home</span>
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Video className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-sm font-medium">Sell Mode — Declutter Assistant</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Upload Step */}
          {currentStep === 'upload' && (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="max-w-2xl w-full space-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center space-y-4"
                >
                  <h2 className="text-display text-5xl font-medium tracking-tight">Declutter Your Space</h2>
                  <p className="text-body text-xl text-white/60 max-w-lg mx-auto">
                    Upload a video of your room and I'll identify sellable items, 
                    create listings, and handle negotiations for you.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card rounded-3xl p-12"
                >
                  <label className="flex flex-col items-center justify-center h-80 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:border-white/40 transition-colors group">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
                      <Video className="w-8 h-8 text-purple-400" />
                    </div>
                    <span className="text-display text-2xl font-medium mb-2">Upload Room Video</span>
                    <span className="text-body text-white/60 mb-4">Record a walkthrough of your space</span>
                    <span className="text-sm text-white/40">MP4, MOV up to 100MB</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </label>
                </motion.div>
              </div>
            </div>
          )}

          {/* Processing Step */}
          {currentStep === 'processing' && (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="max-w-2xl w-full">
                <div className="glass-card rounded-3xl p-12 text-center space-y-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-display text-2xl font-medium">Processing Video...</h3>
                    
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </div>
                    
                    <p className="text-body text-white/60">
                      {uploadProgress < 30 ? 'Extracting frames from video...' : 
                       uploadProgress < 60 ? 'Detecting objects with AI...' : 
                       uploadProgress < 80 ? 'Filtering sellable items...' : 
                       uploadProgress < 100 ? 'Finalizing results...' :
                       'Processing complete!'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Extracted Items Step */}
          {currentStep === 'items' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-display text-4xl font-medium mb-4">Found Sellable Items</h2>
                <p className="text-body text-white/60">I found {extractedItems.length} items that could be sold</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {extractedItems.map((item: any, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-6 rounded-xl"
                  >
                    <div className="space-y-4">
                      <div className="aspect-video bg-white/5 rounded-lg flex items-center justify-center">
                        {item.frame_data ? (
                          <img 
                            src={`data:image/jpeg;base64,${item.frame_data}`} 
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-white/40">Frame @ {item.timestamp}s</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-heading text-lg font-medium capitalize">{item.name}</h3>
                        <p className="text-small text-white/60 capitalize">{item.category} • {item.condition}</p>
                        <p className="text-body text-green-400 font-medium">${item.estimated_price}</p>
                        {item.confidence && (
                          <p className="text-small text-white/40">Confidence: {Math.round(item.confidence * 100)}%</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <motion.button
                  onClick={generateListings}
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Generate Marketplace Listings
                </motion.button>
              </div>
            </div>
          )}

          {/* Generated Listings Step */}
          {currentStep === 'listings' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-display text-4xl font-medium mb-4">Marketplace Listings</h2>
                <p className="text-body text-white/60">Ready to post to Facebook Marketplace, Craigslist, and more</p>
              </div>

              <div className="space-y-6">
                {listings.map((listing: any, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-6 rounded-xl"
                  >
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="aspect-video bg-white/5 rounded-lg flex items-center justify-center">
                        {listing.image_data ? (
                          <img 
                            src={`data:image/jpeg;base64,${listing.image_data}`} 
                            alt={listing.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-white/40">Item Photo</span>
                        )}
                      </div>
                      <div className="md:col-span-2 space-y-4">
                        <div>
                          <h3 className="text-heading text-xl font-medium">{listing.title}</h3>
                          <p className="text-body text-green-400 font-medium text-lg">${listing.price}</p>
                        </div>
                        <p className="text-body text-white/70">{listing.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {listing.keywords?.map((keyword: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-small text-white/60">
                              {keyword}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          <button className="btn-secondary text-sm">Post to Marketplace</button>
                          <button className="btn-secondary text-sm">Start Negotiation</button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </motion.div>
  )
}

export default App
