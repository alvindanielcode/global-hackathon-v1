import { useState, useEffect } from "react"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { Home, Lightbulb, Rocket, Sparkles, Upload, X, Camera, Video, Mail, Twitter, Linkedin, Globe, MessageSquare, Filter, Shield, Clock, CheckCircle, TrendingUp, Search } from "lucide-react"

interface Startup {
  id: number
  title: string
  owner: string
  description: string
  investorReturns: string
  copyright: string
  fundsAccumulated: string
  totalFunds: number
  genre: string
  image?: string
  email?: string
  socials?: { twitter?: string; linkedin?: string; website?: string }
  feedback: Array<{ name: string; comment: string; date: string }>
  funders: Array<{ name: string; amount: number; date: string }>
  submittedAt: string
  copyrightTimestamp: string
  verified: boolean
}

export default function ExploreStartupsNew() {
  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Why", url: "/#why", icon: Sparkles },
    { name: "How", url: "/#how-it-works", icon: Lightbulb },
    { name: "About", url: "/#about", icon: Rocket },
  ]

  const genres = ["All", "Tech", "Healthcare", "Nature", "Finance", "Crypto", "SaaS", "AI", "Other"]

  const [startups, setStartups] = useState<Startup[]>([
    {
      id: 1,
      title: "EcoTech Solutions",
      owner: "Sarah Chen",
      description: "Revolutionary solar panel technology that increases efficiency by 40% while reducing costs.",
      investorReturns: "15% equity for $500K investment, projected 3x return in 5 years",
      copyright: "© 2024 EcoTech Solutions Inc.",
      fundsAccumulated: "$1.2M",
      totalFunds: 1200000,
      genre: "Nature",
      image: "",
      email: "sarah@ecotech.com",
      socials: { twitter: "@ecotech", linkedin: "ecotech-solutions", website: "ecotech.com" },
      feedback: [],
      funders: [
        { name: "John Smith", amount: 50000, date: "2024-01-15" },
        { name: "Tech Ventures", amount: 200000, date: "2024-02-20" },
        { name: "Green Fund", amount: 150000, date: "2024-03-01" }
      ],
      submittedAt: "2024-01-10T14:30:00Z",
      copyrightTimestamp: "Jan 10, 2024, 02:30 PM UTC",
      verified: true
    },
    {
      id: 2,
      title: "HealthAI",
      owner: "Dr. James Wilson",
      description: "AI-powered diagnostic platform that detects diseases 2 years earlier than traditional methods.",
      investorReturns: "10% equity for $1M investment, projected 5x return in 4 years",
      copyright: "© 2024 HealthAI Corp.",
      fundsAccumulated: "$2.5M",
      totalFunds: 2500000,
      genre: "Healthcare",
      image: "",
      email: "james@healthai.com",
      socials: { twitter: "@healthai", linkedin: "healthai-corp" },
      feedback: [],
      funders: [
        { name: "Medical Fund", amount: 500000, date: "2024-01-10" },
        { name: "AI Investors", amount: 300000, date: "2024-03-05" }
      ],
      submittedAt: "2024-02-15T09:20:00Z",
      copyrightTimestamp: "Feb 15, 2024, 09:20 AM UTC",
      verified: true
    }
  ])

  const [formData, setFormData] = useState({
    title: "",
    owner: "",
    description: "",
    investorReturns: "",
    copyright: "",
    fundsAccumulated: "",
    email: "",
    twitter: "",
    linkedin: "",
    website: "",
    image: "",
    genre: "Tech"
  })

  const [showUploadForm, setShowUploadForm] = useState(false)
  const [investModal, setInvestModal] = useState<{ show: boolean; startupId: number | null }>({
    show: false,
    startupId: null
  })
  const [investData, setInvestData] = useState({ name: "", amount: "" })
  const [showFunders, setShowFunders] = useState<number | null>(null)
  const [feedbackModal, setFeedbackModal] = useState<{ show: boolean; startupId: number | null }>({
    show: false,
    startupId: null
  })
  const [feedbackData, setFeedbackData] = useState({ name: "", comment: "" })
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"recent" | "funded" | "trending">("recent")
  const [showSuccess, setShowSuccess] = useState(false)
  const [isInvesting, setIsInvesting] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('launchpad-startups')
    if (saved) {
      try {
        setStartups(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load saved startups')
      }
    }
  }, [])

  // Save to localStorage whenever startups change
  useEffect(() => {
    localStorage.setItem('launchpad-startups', JSON.stringify(startups))
  }, [startups])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData({...formData, image: e.target?.result as string})
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fundsValue = formData.fundsAccumulated.replace(/[$,KM]/g, '')
    let totalFunds = parseFloat(fundsValue)
    if (formData.fundsAccumulated.includes('K')) totalFunds *= 1000
    if (formData.fundsAccumulated.includes('M')) totalFunds *= 1000000
    
    const now = new Date()
    const timestamp = now.toISOString()
    const readableTimestamp = now.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      timeZoneName: 'short'
    })
    
    const newStartup: Startup = {
      id: startups.length + 1,
      title: formData.title,
      owner: formData.owner,
      description: formData.description,
      investorReturns: formData.investorReturns,
      copyright: formData.copyright,
      fundsAccumulated: formData.fundsAccumulated,
      totalFunds: totalFunds,
      genre: formData.genre,
      image: formData.image,
      email: formData.email,
      socials: {
        twitter: formData.twitter,
        linkedin: formData.linkedin,
        website: formData.website
      },
      feedback: [],
      funders: [],
      submittedAt: timestamp,
      copyrightTimestamp: readableTimestamp,
      verified: true
    }
    setStartups([...startups, newStartup])
    setFormData({
      title: "", owner: "", description: "", investorReturns: "", copyright: "", 
      fundsAccumulated: "", email: "", twitter: "", linkedin: "", website: "", image: "", genre: "Tech"
    })
    setShowUploadForm(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleInvest = (startupId: number) => {
    if (!investData.name || !investData.amount) return
    
    setIsInvesting(true)
    const amount = parseFloat(investData.amount)
    
    setTimeout(() => {
      setStartups(startups.map(startup => {
        if (startup.id === startupId) {
          const newTotal = startup.totalFunds + amount
          return {
            ...startup,
            totalFunds: newTotal,
            fundsAccumulated: formatFunds(newTotal),
            funders: [...startup.funders, {
              name: investData.name,
              amount: amount,
              date: new Date().toLocaleDateString()
            }]
          }
        }
        return startup
      }))
      
      setInvestModal({ show: false, startupId: null })
      setInvestData({ name: "", amount: "" })
      setShowFunders(null)
      setIsInvesting(false)
    }, 800)
  }

  const handleFeedback = (startupId: number) => {
    if (!feedbackData.name || !feedbackData.comment) return
    
    setStartups(startups.map(startup => {
      if (startup.id === startupId) {
        return {
          ...startup,
          feedback: [
            ...startup.feedback,
            {
              name: feedbackData.name,
              comment: feedbackData.comment,
              date: new Date().toLocaleDateString()
            }
          ]
        }
      }
      return startup
    }))
    
    setFeedbackModal({ show: false, startupId: null })
    setFeedbackData({ name: "", comment: "" })
  }

  const formatFunds = (amount: number): string => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`
    return `$${amount}`
  }

  const filteredStartups = startups
    .filter(s => selectedGenre === "All" || s.genre === selectedGenre)
    .filter(s => searchQuery === "" || 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.owner.toLowerCase().includes(searchQuery.toLowerCase())
    )
  
  const sortedStartups = [...filteredStartups].sort((a, b) => {
    if (sortBy === "funded") return b.totalFunds - a.totalFunds
    if (sortBy === "trending") return b.funders.length - a.funders.length
    return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  })

  return (
    <div className="relative bg-black text-white min-h-screen">
      {/* Navbar - Mobile Optimized */}
      <div className="fixed top-0 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-screen-xl px-2 sm:px-4">
        <NavBar items={navItems} className="!relative !top-0 !left-0 !translate-x-0 !mb-0" />
      </div>

      {/* Main Content - Mobile Optimized */}
      <div className="pt-20 sm:pt-24 md:pt-32 px-3 sm:px-4 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-6 sm:mb-8 text-center text-white">
            Explore Startups
          </h1>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search startups by name, description, or founder..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>
          
          {/* Upload Button, Filter, and Sort - Mobile Stacked */}
          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-16 max-w-md sm:max-w-none mx-auto">
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-white text-black py-3 px-6 sm:px-8 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:scale-105 active:scale-95 shadow-[0_0_10px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 w-full sm:w-auto touch-manipulation"
            >
              <Upload className="w-5 h-5" />
              <span className="whitespace-nowrap">Upload Your Idea</span>
            </button>

            {/* Filter Dropdown - Mobile Full Width */}
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="bg-white/10 border border-white/20 text-white py-3 px-6 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto touch-manipulation"
              >
                <Filter className="w-5 h-5" />
                {selectedGenre}
              </button>

              {showFilterDropdown && (
                <>
                  {/* Backdrop for mobile */}
                  <div 
                    className="fixed inset-0 bg-black/50 z-40 sm:hidden"
                    onClick={() => setShowFilterDropdown(false)}
                  />
                  <div className="absolute top-full mt-2 left-0 sm:left-auto sm:right-0 bg-black border border-white/20 rounded-lg shadow-xl overflow-hidden w-full sm:min-w-[200px] z-50 max-h-[60vh] overflow-y-auto">
                    {genres.map((genre) => (
                      <button
                        key={genre}
                        onClick={() => {
                          setSelectedGenre(genre)
                          setShowFilterDropdown(false)
                        }}
                        className={`w-full text-left px-4 py-3.5 sm:py-3 transition-colors touch-manipulation ${
                          selectedGenre === genre 
                            ? 'bg-purple-600 text-white' 
                            : 'text-white/80 hover:bg-white/10 active:bg-white/20'
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Sort Dropdown */}
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white/10 border border-white/20 text-white px-4 sm:px-6 py-3 rounded-full font-semibold text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto touch-manipulation"
            >
              <option value="recent" className="bg-black">Most Recent</option>
              <option value="funded" className="bg-black">Most Funded</option>
              <option value="trending" className="bg-black">Trending</option>
            </select>
          </div>
          
          {/* Startups Grid - Mobile Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12">
            {sortedStartups.map((startup) => (
              <div key={startup.id} className="relative border border-white/20 rounded-lg p-4 sm:p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-black/60 backdrop-blur-sm hover:border-blue-500/50">
                {startup.image && (
                  <img src={startup.image} alt={startup.title} className="w-full h-32 object-cover rounded-lg mb-4" />
                )}
                
                {/* Genre Badge and Trending Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-purple-600/30 text-purple-300 text-xs font-semibold px-3 py-1 rounded-full border border-purple-500/50">
                    {startup.genre}
                  </span>
                  {startup.funders && startup.funders.length > 2 && (
                    <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
                      <TrendingUp className="w-3 h-3" />
                      TRENDING
                    </div>
                  )}
                </div>

                {/* COPYRIGHT TIMESTAMP BADGE - KEY DIFFERENTIATOR! */}
                <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold text-amber-400 uppercase">Protected Idea</span>
                    {startup.verified && <CheckCircle className="w-4 h-4 text-green-400" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-amber-300/70" />
                    <p className="text-xs text-amber-200/80">
                      Timestamped: {startup.copyrightTimestamp}
                    </p>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">{startup.title}</h3>
                <p className="text-blue-500 text-sm mb-3 sm:mb-4 font-medium">Founded by {startup.owner}</p>
                
                <p className="text-white/80 mb-3 sm:mb-4 text-sm leading-relaxed">{startup.description}</p>
                
                {/* Email - Mobile Friendly */}
                {startup.email && (
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-white/70 truncate">{startup.email}</span>
                  </div>
                )}

                {/* Social Links - Larger Touch Targets */}
                {startup.socials && (
                  <div className="flex gap-2 sm:gap-3 mb-4">
                    {startup.socials.twitter && (
                      <a href={`https://twitter.com/${startup.socials.twitter}`} className="text-blue-400 hover:text-blue-300 p-2 hover:bg-white/10 rounded-full transition-colors touch-manipulation" target="_blank" rel="noopener noreferrer">
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {startup.socials.linkedin && (
                      <a href={`https://linkedin.com/in/${startup.socials.linkedin}`} className="text-blue-600 hover:text-blue-500 p-2 hover:bg-white/10 rounded-full transition-colors touch-manipulation" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {startup.socials.website && (
                      <a href={`https://${startup.socials.website}`} className="text-green-400 hover:text-green-300 p-2 hover:bg-white/10 rounded-full transition-colors touch-manipulation" target="_blank" rel="noopener noreferrer">
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                )}
                
                <div className="space-y-3 mb-4">
                  <div className="bg-white/5 rounded p-3">
                    <p className="text-xs text-white/60 mb-1">Investor Returns</p>
                    <p className="text-white text-xs sm:text-sm">{startup.investorReturns}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-white/60">Funds Raised</p>
                      <p className="text-green-400 font-bold text-base sm:text-lg">{startup.fundsAccumulated}</p>
                    </div>
                  </div>
                </div>

                {/* Copyright */}
                <p className="text-xs text-white/40 mb-4">{startup.copyright}</p>
                
                {/* Action Buttons - Mobile Stacked */}
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button 
                    onClick={() => {
                      setInvestModal({ show: true, startupId: startup.id })
                      setShowFunders(startup.id)
                    }}
                    className="flex-1 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white py-3 sm:py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] hover:scale-105 active:scale-95 touch-manipulation"
                  >
                    Invest Now →
                  </button>
                  <button 
                    onClick={() => setFeedbackModal({ show: true, startupId: startup.id })}
                    className="flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-3 sm:py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] hover:scale-105 active:scale-95 flex items-center justify-center gap-1 touch-manipulation"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Feedback ({startup.feedback.length})
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No results message */}
          {sortedStartups.length === 0 && (
            <div className="text-center py-12 sm:py-20">
              <p className="text-white/60 text-base sm:text-lg px-4">No startups found in the {selectedGenre} category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Form Modal - Mobile Full Screen */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-black/90 sm:bg-black/80 backdrop-blur-sm z-50 flex items-start sm:items-center justify-center overflow-y-auto">
          <div className="bg-black border-0 sm:border border-white/20 rounded-none sm:rounded-lg p-4 sm:p-8 w-full sm:max-w-4xl min-h-screen sm:min-h-0 sm:max-h-[95vh] sm:my-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4 sm:mb-6 sticky top-0 bg-black pb-4 z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Upload Your Idea</h2>
              <button onClick={() => setShowUploadForm(false)} className="text-white/60 hover:text-white p-2 touch-manipulation">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <input
                  type="text"
                  placeholder="Startup Title *"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 sm:py-2.5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/50 text-base"
                />
                <input
                  type="text"
                  placeholder="Owner/Founder *"
                  required
                  value={formData.owner}
                  onChange={(e) => setFormData({...formData, owner: e.target.value})}
                  className="w-full px-4 py-3 sm:py-2.5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/50 text-base"
                />
              </div>
              
              <textarea
                placeholder="Description *"
                rows={4}
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 sm:py-2.5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-black/60 text-white placeholder:text-white/50 text-base resize-none"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <input
                  type="text"
                  placeholder="Investor Returns *"
                  required
                  value={formData.investorReturns}
                  onChange={(e) => setFormData({...formData, investorReturns: e.target.value})}
                  className="w-full px-4 py-3 sm:py-2.5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-black/60 text-white placeholder:text-white/50 text-base"
                />
                
                <select
                  value={formData.genre}
                  onChange={(e) => setFormData({...formData, genre: e.target.value})}
                  className="w-full px-4 py-3 sm:py-2.5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white text-base"
                >
                  {genres.filter(g => g !== "All").map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 sm:py-2.5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/50 text-base"
                />
                <input
                  type="text"
                  placeholder="Funds Accumulated *"
                  required
                  value={formData.fundsAccumulated}
                  onChange={(e) => setFormData({...formData, fundsAccumulated: e.target.value})}
                  className="w-full px-4 py-3 sm:py-2.5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/50 text-base"
                />
              </div>

              <input
                type="text"
                placeholder="Copyright *"
                required
                value={formData.copyright}
                onChange={(e) => setFormData({...formData, copyright: e.target.value})}
                className="w-full px-4 py-3 sm:py-2.5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/50 text-base"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder="Twitter Handle"
                  value={formData.twitter}
                  onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                  className="w-full px-4 py-3 sm:py-2.5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/50 text-base"
                />
                <input
                  type="text"
                  placeholder="LinkedIn"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                  className="w-full px-4 py-3 sm:py-2.5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/50 text-base"
                />
                <input
                  type="text"
                  placeholder="Website"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full px-4 py-3 sm:py-2.5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/50 text-base"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-white">Upload Image/Video</label>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <label className="flex items-center gap-2 bg-white/10 hover:bg-white/20 active:bg-white/30 px-4 py-3 rounded-lg cursor-pointer transition-colors justify-center touch-manipulation">
                    <Camera className="w-5 h-5" />
                    <span className="text-sm sm:text-base">Image</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  <label className="flex items-center gap-2 bg-white/10 hover:bg-white/20 active:bg-white/30 px-4 py-3 rounded-lg cursor-pointer transition-colors justify-center touch-manipulation">
                    <Video className="w-5 h-5" />
                    <span className="text-sm sm:text-base">Video</span>
                    <input type="file" accept="video/*" className="hidden" />
                  </label>
                </div>
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="w-full sm:w-32 h-32 object-cover rounded-lg" />
                )}
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white py-4 sm:py-3 px-4 rounded-lg font-medium text-base sm:text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] active:scale-95 touch-manipulation sticky bottom-0 sm:static"
              >
                Submit Startup Idea
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Investment Modal - Mobile Optimized */}
      {investModal.show && (
        <div className="fixed inset-0 bg-black/90 sm:bg-black/80 backdrop-blur-sm z-50 flex items-start sm:items-center justify-center overflow-y-auto">
          <div className="bg-black border-0 sm:border border-white/20 rounded-none sm:rounded-lg p-4 sm:p-8 w-full sm:max-w-4xl min-h-screen sm:min-h-0 sm:max-h-[95vh] sm:my-4 overflow-y-auto">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Invest in {startups.find(s => s.id === investModal.startupId)?.title}</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={investData.name}
                    onChange={(e) => setInvestData({...investData, name: e.target.value})}
                    className="w-full px-4 py-3 sm:py-2.5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-black/60 text-white placeholder:text-white/50 text-base"
                  />
                  <input
                    type="number"
                    placeholder="Investment Amount ($)"
                    value={investData.amount}
                    onChange={(e) => setInvestData({...investData, amount: e.target.value})}
                    className="w-full px-4 py-3 sm:py-2.5 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-black/60 text-white placeholder:text-white/50 text-base"
                  />
                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button
                      onClick={() => handleInvest(investModal.startupId!)}
                      disabled={isInvesting}
                      className="flex-1 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white py-3 sm:py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] active:scale-95 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isInvesting ? "Processing..." : "Confirm Investment"}
                    </button>
                    <button
                      onClick={() => setInvestModal({ show: false, startupId: null })}
                      className="px-6 py-3 sm:py-2 border border-purple-500/50 rounded-lg text-white hover:bg-purple-500/20 active:bg-purple-500/30 transition-colors touch-manipulation"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Funders List */}
              <div className="flex-1 border-t lg:border-t-0 lg:border-l border-white/20 pt-6 lg:pt-0 lg:pl-8">
                <h4 className="text-lg sm:text-xl font-bold text-white mb-4">Current Funders</h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {startups.find(s => s.id === investModal.startupId)?.funders.map((funder, idx) => (
                    <div key={idx} className="bg-white/5 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-purple-300 text-sm sm:text-base">{funder.name}</p>
                        <p className="text-green-400 font-bold text-sm sm:text-base">${funder.amount.toLocaleString()}</p>
                      </div>
                      <p className="text-xs text-white/40">{funder.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal - Mobile Optimized */}
      {feedbackModal.show && (
        <div className="fixed inset-0 bg-black/90 sm:bg-black/80 backdrop-blur-sm z-50 flex items-start sm:items-center justify-center overflow-y-auto">
          <div className="bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 border-0 sm:border border-blue-500/30 rounded-none sm:rounded-lg p-4 sm:p-8 w-full sm:max-w-2xl min-h-screen sm:min-h-0 sm:max-h-[90vh] sm:my-4 overflow-y-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Public Feedback</h3>
            <p className="text-blue-400 mb-6 text-sm sm:text-base">{startups.find(s => s.id === feedbackModal.startupId)?.title}</p>
            
            {/* Public Comments List */}
            <div className="mb-6 max-h-[300px] overflow-y-auto space-y-3">
              <h4 className="text-sm font-semibold text-white/80 mb-3">All Comments ({startups.find(s => s.id === feedbackModal.startupId)?.feedback.length || 0})</h4>
              {startups.find(s => s.id === feedbackModal.startupId)?.feedback.length === 0 ? (
                <p className="text-white/50 text-sm italic">No comments yet. Be the first to share your thoughts!</p>
              ) : (
                startups.find(s => s.id === feedbackModal.startupId)?.feedback.map((fb, idx) => (
                  <div key={idx} className="p-3 sm:p-4 bg-black/40 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-blue-300 text-sm sm:text-base">{fb.name}</p>
                      <p className="text-xs text-white/40">{fb.date}</p>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">{fb.comment}</p>
                  </div>
                ))
              )}
            </div>
            
            {/* Add New Comment */}
            <div className="border-t border-blue-500/20 pt-6">
              <h4 className="text-sm font-semibold text-white/80 mb-4">Add Your Comment</h4>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={feedbackData.name}
                    onChange={(e) => setFeedbackData({...feedbackData, name: e.target.value})}
                    className="w-full px-4 py-3 sm:py-2 border border-blue-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/40 text-base"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <textarea
                    rows={3}
                    value={feedbackData.comment}
                    onChange={(e) => setFeedbackData({...feedbackData, comment: e.target.value})}
                    className="w-full px-4 py-3 sm:py-2 border border-blue-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/40 text-base resize-none"
                    placeholder="Share your thoughts..."
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleFeedback(feedbackModal.startupId!)}
                    className="flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-3 sm:py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] active:scale-95 touch-manipulation"
                  >
                    Post Comment
                  </button>
                  <button
                    onClick={() => {
                      setFeedbackModal({ show: false, startupId: null })
                      setFeedbackData({ name: "", comment: "" })
                    }}
                    className="px-6 py-3 sm:py-2 border border-blue-500/50 rounded-lg text-white hover:bg-blue-500/20 active:bg-blue-500/30 transition-colors touch-manipulation"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Animation Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-8 rounded-2xl text-center animate-bounce shadow-2xl max-w-md">
            <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Idea Protected! 🎉</h3>
            <p className="text-white/90 text-sm sm:text-base mb-4">Your idea is now timestamped and protected with copyright</p>
            <div className="flex items-center justify-center gap-2 text-white/80 text-xs sm:text-sm">
              <Shield className="w-4 h-4" />
              <span>Permanent blockchain-style timestamp created</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
