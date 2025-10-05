import { useState, useEffect } from "react"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { Home, Lightbulb, Rocket, Sparkles, Upload } from "lucide-react"

interface Startup {
  id: number
  title: string
  owner: string
  description: string
  investorReturns: string
  copyright: string
  fundsAccumulated: string
  totalFunds: number
  feedback: Array<{ name: string; comment: string; date: string }>
}

export default function ExploreStartups() {
  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Why", url: "/#why", icon: Sparkles },
    { name: "How", url: "/#how-it-works", icon: Lightbulb },
    { name: "About", url: "/#about", icon: Rocket },
  ]

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
      feedback: []
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
      feedback: []
    },
    {
      id: 3,
      title: "UrbanFarm",
      owner: "Maria Rodriguez",
      description: "Vertical farming system for urban areas, producing 10x more food per square foot.",
      investorReturns: "20% equity for $300K investment, projected 4x return in 3 years",
      copyright: "© 2024 UrbanFarm Technologies",
      fundsAccumulated: "$800K",
      totalFunds: 800000,
      feedback: []
    }
  ])

  const [formData, setFormData] = useState({
    title: "",
    owner: "",
    description: "",
    investorReturns: "",
    copyright: "",
    fundsAccumulated: ""
  })

  const [showUploadForm, setShowUploadForm] = useState(false)
  const [investModal, setInvestModal] = useState<{ show: boolean; startupId: number | null }>({
    show: false,
    startupId: null
  })
  const [investData, setInvestData] = useState({ name: "", amount: "" })

  const [feedbackModal, setFeedbackModal] = useState<{ show: boolean; startupId: number | null }>({
    show: false,
    startupId: null
  })
  const [feedbackData, setFeedbackData] = useState({ name: "", comment: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fundsValue = formData.fundsAccumulated.replace(/[$,KM]/g, '')
    let totalFunds = parseFloat(fundsValue)
    if (formData.fundsAccumulated.includes('K')) totalFunds *= 1000
    if (formData.fundsAccumulated.includes('M')) totalFunds *= 1000000
    
    const newStartup: Startup = {
      id: startups.length + 1,
      ...formData,
      totalFunds: totalFunds,
      feedback: []
    }
    setStartups([...startups, newStartup])
    setFormData({
      title: "",
      owner: "",
      description: "",
      investorReturns: "",
      copyright: "",
      fundsAccumulated: ""
    })
    setShowUploadForm(false)
  }

  const handleInvest = (startupId: number) => {
    if (!investData.name || !investData.amount) return
    
    const amount = parseFloat(investData.amount)
    setStartups(startups.map(startup => {
      if (startup.id === startupId) {
        const newTotal = startup.totalFunds + amount
        return {
          ...startup,
          totalFunds: newTotal,
          fundsAccumulated: formatFunds(newTotal)
        }
      }
      return startup
    }))
    
    setInvestModal({ show: false, startupId: null })
    setInvestData({ name: "", amount: "" })
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

  return (
    <div className="relative bg-black text-white min-h-screen">
      {/* Navbar at Top */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-screen-xl px-4">
        <NavBar items={navItems} className="!relative !top-0 !left-0 !translate-x-0 !mb-0" />
      </div>

      {/* Upload Your Idea Button - Floating */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
        <button
          onClick={() => setShowUploadForm(true)}
          className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-3 px-6 rounded-full font-medium text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] hover:scale-105 flex items-center gap-2"
        >
          <Upload className="w-5 h-5" />
          Upload Your Idea
        </button>
      </div>

      {/* Upload Form Modal */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-white/20 rounded-lg p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">Upload Your Idea</h2>
              <button
                onClick={() => setShowUploadForm(false)}
                className="text-white/60 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2 text-white">
                    Startup Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/50"
                    placeholder="e.g., EcoTech Solutions"
                  />
                </div>
                
                <div>
                  <label htmlFor="owner" className="block text-sm font-medium mb-2 text-white">
                    Owner/Founder *
                  </label>
                  <input
                    type="text"
                    id="owner"
                    required
                    value={formData.owner}
                    onChange={(e) => setFormData({...formData, owner: e.target.value})}
                    className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/50"
                    placeholder="Your name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2 text-white">
                  Description *
                </label>
                <textarea
                  id="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-black/60 text-white placeholder:text-white/50"
                  placeholder="Describe your innovative idea and how it solves a problem"
                />
              </div>
              
              <div>
                <label htmlFor="investorReturns" className="block text-sm font-medium mb-2 text-white">
                  Investor Returns *
                </label>
                <input
                  type="text"
                  id="investorReturns"
                  required
                  value={formData.investorReturns}
                  onChange={(e) => setFormData({...formData, investorReturns: e.target.value})}
                  className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-black/60 text-white placeholder:text-white/50"
                  placeholder="e.g., 15% equity for $500K, projected 3x return in 5 years"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fundsAccumulated" className="block text-sm font-medium mb-2 text-white">
                    Funds Accumulated *
                  </label>
                  <input
                    type="text"
                    id="fundsAccumulated"
                    required
                    value={formData.fundsAccumulated}
                    onChange={(e) => setFormData({...formData, fundsAccumulated: e.target.value})}
                    className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/50"
                    placeholder="e.g., $1.2M"
                  />
                </div>
                
                <div>
                  <label htmlFor="copyright" className="block text-sm font-medium mb-2 text-white">
                    Copyright *
                  </label>
                  <input
                    type="text"
                    id="copyright"
                    required
                    value={formData.copyright}
                    onChange={(e) => setFormData({...formData, copyright: e.target.value})}
                    className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/50"
                    placeholder="© 2024 Your Company"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white py-3 px-4 rounded-lg font-medium text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] hover:scale-105"
              >
                Submit Startup Idea
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-32 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-12 text-center text-white">
            Explore Startups
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {startups.map((startup) => (
              <div
                key={startup.id}
                className="border border-white/20 rounded-lg p-6 hover:shadow-xl transition-all bg-black/60 backdrop-blur-sm hover:border-blue-500/50"
              >
                <h3 className="text-2xl font-bold mb-2 text-white">{startup.title}</h3>
                <p className="text-blue-500 text-sm mb-4 font-medium">Founded by {startup.owner}</p>
                
                <p className="text-white/80 mb-4 text-sm leading-relaxed">
                  {startup.description}
                </p>
                
                <div className="space-y-3 mb-4">
                  <div className="bg-white/5 rounded p-3">
                    <p className="text-xs text-white/60 mb-1">Investor Returns</p>
                    <p className="text-white text-sm">{startup.investorReturns}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-white/60">Funds Raised</p>
                      <p className="text-green-400 font-bold text-lg">{startup.fundsAccumulated}</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-white/40 mt-4">{startup.copyright}</p>
                
                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={() => setInvestModal({ show: true, startupId: startup.id })}
                    className="flex-1 relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] hover:scale-105"
                  >
                    <span className="relative z-10">Invest Now →</span>
                  </button>
                  
                  <button 
                    onClick={() => setFeedbackModal({ show: true, startupId: startup.id })}
                    className="flex-1 relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] hover:scale-105"
                  >
                    <span className="relative z-10">Feedback ({startup.feedback.length})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      {investModal.show && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-white/20 rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-6">Invest in {startups.find(s => s.id === investModal.startupId)?.title}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Your Name</label>
                <input
                  type="text"
                  value={investData.name}
                  onChange={(e) => setInvestData({...investData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-black/60 text-white placeholder:text-white/50"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Investment Amount ($)</label>
                <input
                  type="number"
                  value={investData.amount}
                  onChange={(e) => setInvestData({...investData, amount: e.target.value})}
                  className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-black/60 text-white placeholder:text-white/50"
                  placeholder="Enter amount"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleInvest(investModal.startupId!)}
                  className="flex-1 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] hover:scale-105"
                >
                  Confirm Investment
                </button>
                <button
                  onClick={() => setInvestModal({ show: false, startupId: null })}
                  className="px-6 py-2 border border-purple-500/50 rounded-lg text-white hover:bg-purple-500/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackModal.show && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 border border-purple-500/30 rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-2">Public Feedback</h3>
            <p className="text-purple-400 mb-6">{startups.find(s => s.id === feedbackModal.startupId)?.title}</p>
            
            {/* Public Comments List */}
            <div className="mb-6 max-h-[300px] overflow-y-auto space-y-3">
              <h4 className="text-sm font-semibold text-white/80 mb-3">All Comments ({startups.find(s => s.id === feedbackModal.startupId)?.feedback.length || 0})</h4>
              {startups.find(s => s.id === feedbackModal.startupId)?.feedback.length === 0 ? (
                <p className="text-white/50 text-sm italic">No comments yet. Be the first to share your thoughts!</p>
              ) : (
                startups.find(s => s.id === feedbackModal.startupId)?.feedback.map((fb, idx) => (
                  <div key={idx} className="p-4 bg-black/40 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-purple-300">{fb.name}</p>
                      <p className="text-xs text-white/40">{fb.date}</p>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">{fb.comment}</p>
                  </div>
                ))
              )}
            </div>
            
            {/* Add New Comment */}
            <div className="border-t border-purple-500/20 pt-6">
              <h4 className="text-sm font-semibold text-white/80 mb-4">Add Your Comment</h4>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={feedbackData.name}
                    onChange={(e) => setFeedbackData({...feedbackData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-black/60 text-white placeholder:text-white/40"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <textarea
                    rows={3}
                    value={feedbackData.comment}
                    onChange={(e) => setFeedbackData({...feedbackData, comment: e.target.value})}
                    className="w-full px-4 py-2 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-black/60 text-white placeholder:text-white/40"
                    placeholder="Share your thoughts..."
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleFeedback(feedbackModal.startupId!)}
                    className="flex-1 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] hover:scale-105"
                  >
                    Post Comment
                  </button>
                  <button
                    onClick={() => {
                      setFeedbackModal({ show: false, startupId: null })
                      setFeedbackData({ name: "", comment: "" })
                    }}
                    className="px-6 py-2 border border-purple-500/50 rounded-lg text-white hover:bg-purple-500/20 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
