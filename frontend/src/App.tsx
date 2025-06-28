import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, Bot, Upload, Video, Sparkles, ArrowUpRight, Camera, Play } from 'lucide-react'
import './App.css'

type AppMode = 'landing' | 'buy' | 'sell'

function App() {
  const [mode, setMode] = useState<AppMode>('landing')
  const [editingItem, setEditingItem] = useState<number | null>(null)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' })

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
  const [storefront, setStorefront] = useState<any>(null)
  const [currentStep, setCurrentStep] = useState<'upload' | 'processing' | 'items' | 'listings' | 'storefront'>('upload')
  const [editingItem, setEditingItem] = useState<number | null>(null)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' })

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

  const createStorefront = async () => {
    if (!jobId) return
    
    try {
      const response = await fetch('http://localhost:8000/api/sell/create-storefront', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          job_id: jobId,
          email: loginCredentials.email,
          password: loginCredentials.password
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to post to UseThis')
      }
      
      setStorefront(data)
      setCurrentStep('storefront')
      setShowLoginForm(false)
      
    } catch (error) {
      console.error('Error creating storefront:', error)
      alert(`Error: ${error.message}`)
    }
  }

  const updateItem = (index: number, field: string, value: string | number) => {
    setExtractedItems(prev => prev.map((item: any, i) => 
      i === index ? { ...item, [field]: value } : item
    ))
  }

  const deleteItem = async (index: number) => {
    if (!jobId) return
    
    try {
      const response = await fetch('http://localhost:8000/api/sell/delete-item', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job_id: jobId,
          item_index: index
        }),
      })
      
      if (response.ok) {
        // Remove item from local state
        setExtractedItems(prev => prev.filter((_, i) => i !== index))
      }
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  const saveItemEdit = async (index: number) => {
    if (!jobId) return
    
    const item = extractedItems[index]
    
    try {
      const response = await fetch('http://localhost:8000/api/sell/update-item', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job_id: jobId,
          item_index: index,
          name: item.name,
          estimated_price: item.estimated_price
        }),
      })
      
      if (response.ok) {
        setEditingItem(null)
      }
    } catch (error) {
      console.error('Error updating item:', error)
      setEditingItem(null)
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
                <p className="text-small text-white/40 mt-2">Click on names or prices to edit them</p>
              </div>

              <div className="space-y-6">
                {extractedItems.map((item: any, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-6 rounded-xl relative group"
                  >
                    {/* Delete Button */}
                    <button
                      onClick={() => deleteItem(index)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                      title="Delete item"
                    >
                      ×
                    </button>

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
                        {/* Editable Item Name */}
                        {editingItem === index ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => updateItem(index, 'name', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-lg font-medium"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveItemEdit(index)
                                if (e.key === 'Escape') setEditingItem(null)
                              }}
                              autoFocus
                            />
                            <input
                              type="number"
                              value={item.estimated_price}
                              onChange={(e) => updateItem(index, 'estimated_price', parseFloat(e.target.value) || 0)}
                              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-green-400 font-medium"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveItemEdit(index)
                                if (e.key === 'Escape') setEditingItem(null)
                              }}
                              step="0.01"
                              min="0"
                            />
                            <div className="flex gap-2">
                              <button 
                                onClick={() => saveItemEdit(index)}
                                className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm hover:bg-green-500/30 transition-colors"
                              >
                                Save
                              </button>
                              <button 
                                onClick={() => setEditingItem(null)}
                                className="px-3 py-1 bg-white/10 text-white/60 rounded text-sm hover:bg-white/20 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h3 
                              className="text-heading text-lg font-medium capitalize cursor-pointer hover:text-blue-400 transition-colors"
                              onClick={() => setEditingItem(index)}
                            >
                              {item.name}
                            </h3>
                            <p className="text-small text-white/60 capitalize">{item.category} • {item.condition}</p>
                            <p 
                              className="text-body text-green-400 font-medium cursor-pointer hover:text-green-300 transition-colors"
                              onClick={() => setEditingItem(index)}
                            >
                              ${item.estimated_price}
                            </p>
                            {item.confidence && (
                              <p className="text-small text-white/40">Confidence: {Math.round(item.confidence * 100)}%</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                {!showLoginForm ? (
                  <motion.button
                    onClick={() => setShowLoginForm(true)}
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Post to UseThis
                  </motion.button>
                ) : (
                  <div className="glass-card p-6 rounded-xl max-w-md mx-auto">
                    <h3 className="text-heading text-xl mb-4">Login to UseThis</h3>
                    <div className="space-y-4">
                      <input
                        type="email"
                        placeholder="Your UseThis email"
                        value={loginCredentials.email}
                        onChange={(e) => setLoginCredentials(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                      />
                      <input
                        type="password"
                        placeholder="Password (optional)"
                        value={loginCredentials.password}
                        onChange={(e) => setLoginCredentials(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={createStorefront}
                          className="btn-primary flex-1"
                          disabled={!loginCredentials.email}
                        >
                          Post Items
                        </button>
                        <button
                          onClick={() => setShowLoginForm(false)}
                          className="btn-secondary"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
                          <button className="btn-secondary text-sm">Copy Listing</button>
                          <button className="btn-secondary text-sm">Edit</button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Storefront Step */}
          {currentStep === 'storefront' && storefront && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-display text-4xl font-medium mb-4">🎉 Posted to UseThis!</h2>
                <p className="text-body text-white/60">Your items are now live on the student rental marketplace</p>
                <a 
                  href="https://use-this.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Visit UseThis Platform →
                </a>
              </div>

              {/* Posting Stats */}
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">{storefront.posted_count || 0}</div>
                  <div className="text-small text-white/60">Items Posted</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">${storefront.total_potential_income || 0}</div>
                  <div className="text-small text-white/60">Monthly Potential</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{storefront.failed_count || 0}</div>
                  <div className="text-small text-white/60">Failed Posts</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">Live</div>
                  <div className="text-small text-white/60">Status</div>
                </div>
              </div>

              {/* Platform Info */}
              <div className="glass-card p-6 rounded-xl mb-6">
                <h3 className="text-heading text-xl mb-4">📱 UseThis Student Marketplace</h3>
                <p className="text-body text-white/70 mb-4">
                  Your items are now available for rent by students across 200+ universities. 
                  Students can discover and rent your items for short-term use.
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  <a 
                    href="https://use-this.netlify.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm text-center"
                  >
                    🌐 View Platform
                  </a>
                  <button className="btn-secondary text-sm">📊 Manage Listings</button>
                  <button className="btn-secondary text-sm">💬 Check Messages</button>
                </div>
              </div>

              {/* Posted Listings */}
              <div className="space-y-6">
                <h3 className="text-heading text-xl">Posted Rental Listings</h3>
                {storefront.listings?.map((listing: any, index: number) => (
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
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-heading text-xl font-medium">{listing.title}</h3>
                            <p className="text-body text-green-400 font-medium text-lg">
                              ${listing.rental_price}/day rental
                            </p>
                            <p className="text-small text-white/60">
                              Original value: ${listing.original_price}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-small text-green-400">✅ {listing.status}</div>
                            <div className="text-small text-white/60">UseThis Platform</div>
                          </div>
                        </div>
                        <p className="text-body text-white/70">{listing.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-blue-500/20 rounded-full text-small text-blue-400">
                            Student Rental
                          </span>
                          <span className="px-3 py-1 bg-white/10 rounded-full text-small text-white/60">
                            {listing.category}
                          </span>
                          <span className="px-3 py-1 bg-white/10 rounded-full text-small text-white/60">
                            {listing.condition}
                          </span>
                        </div>
                        <div className="flex gap-3">
                          <a 
                            href="https://use-this.netlify.app" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-secondary text-sm"
                          >
                            🌐 View on UseThis
                          </a>
                          <button className="btn-secondary text-sm">📊 Analytics</button>
                          <button className="btn-secondary text-sm">✏️ Edit Listing</button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Failed Listings */}
              {storefront.failed_listings && storefront.failed_listings.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-heading text-xl text-red-400">Failed to Post</h3>
                  {storefront.failed_listings.map((failed: any, index: number) => (
                    <div key={index} className="glass-card p-4 rounded-xl border border-red-500/20">
                      <div className="flex justify-between items-center">
                        <span className="text-body text-white">{failed.item_name}</span>
                        <span className="text-small text-red-400">{failed.error}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Next Steps */}
              <div className="glass-card p-6 rounded-xl text-center">
                <h3 className="text-heading text-xl mb-2">🚀 What's Next?</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {storefront.next_steps?.map((step: string, index: number) => (
                    <div key={index} className="text-body text-white/70">
                      {index + 1}. {step}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-4">
                  <a 
                    href="https://use-this.netlify.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Manage on UseThis
                  </a>
                  <button 
                    className="btn-secondary"
                    onClick={() => setCurrentStep('upload')}
                  >
                    Add More Items
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </motion.div>
  )
}

export default App
