import { useState } from "react"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { Home, Lightbulb, Rocket, Sparkles, Upload, X, Camera, Mail, Linkedin, Globe, Twitter, Eye } from "lucide-react"

interface Startup {
  id: number
  title: string
  owner: string
  description: string
  investorReturns: string
  fundsAccumulated: string
  totalFunds: number
  image?: string
  email?: string
  socials?: { twitter?: string; linkedin?: string; website?: string }
  funders: Array<{ name: string; amount: number; date: string }>
}

export default function ExploreSimple() {
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
      description: "Revolutionary solar panel technology that increases efficiency by 40% while reducing costs. Our innovative approach uses advanced materials and AI optimization.",
      investorReturns: "15% equity for $500K investment, projected 3x return in 5 years with strong market demand",
      fundsAccumulated: "$1.2M",
      totalFunds: 1200000,
      email: "sarah@ecotech.com",
      socials: { twitter: "@ecotech", linkedin: "ecotech-solutions", website: "ecotech.com" },
      funders: [
        { name: "John Smith", amount: 50000, date: "2024-01-15" },
        { name: "Tech Ventures", amount: 200000, date: "2024-02-20" }
      ]
    },
    {
      id: 2,
      title: "HealthAI",
      owner: "Dr. James Wilson",
      description: "AI-powered diagnostic platform that detects diseases 2 years earlier than traditional methods using machine learning and medical imaging.",
      investorReturns: "10% equity for $1M investment, projected 5x return in 4 years with healthcare market expansion",
      fundsAccumulated: "$2.5M",
      totalFunds: 2500000,
      email: "james@healthai.com",
      socials: { twitter: "@healthai", linkedin: "healthai-corp" },
      funders: [
        { name: "Medical Fund", amount: 500000, date: "2024-01-10" },
        { name: "AI Investors", amount: 300000, date: "2024-03-05" }
      ]
    }
  ])

  const [formData, setFormData] = useState({
    title: "", owner: "", description: "", investorReturns: "", fundsAccumulated: "",
    email: "", twitter: "", linkedin: "", website: "", image: ""
  })

  const [showUploadForm, setShowUploadForm] = useState(false)
  const [viewModal, setViewModal] = useState<{ show: boolean; startupId: number | null }>({ show: false, startupId: null })
  const [investModal, setInvestModal] = useState<{ show: boolean; startupId: number | null }>({ show: false, startupId: null })
  const [investData, setInvestData] = useState({ name: "", amount: "" })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setFormData({...formData, image: e.target?.result as string})
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const totalFunds = parseFloat(formData.fundsAccumulated.replace(/[$,KM]/g, '')) * 
      (formData.fundsAccumulated.includes('K') ? 1000 : formData.fundsAccumulated.includes('M') ? 1000000 : 1)
    
    const newStartup: Startup = {
      id: startups.length + 1,
      title: formData.title,
      owner: formData.owner,
      description: formData.description,
      investorReturns: formData.investorReturns,
      fundsAccumulated: formData.fundsAccumulated,
      totalFunds,
      image: formData.image,
      email: formData.email,
      socials: { twitter: formData.twitter, linkedin: formData.linkedin, website: formData.website },
      funders: []
    }
    setStartups([...startups, newStartup])
    setFormData({ title: "", owner: "", description: "", investorReturns: "", fundsAccumulated: "", email: "", twitter: "", linkedin: "", website: "", image: "" })
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
          fundsAccumulated: newTotal >= 1000000 ? `$${(newTotal / 1000000).toFixed(1)}M` : `$${(newTotal / 1000).toFixed(0)}K`,
          funders: [...startup.funders, { name: investData.name, amount, date: new Date().toLocaleDateString() }]
        }
      }
      return startup
    }))
    
    setInvestModal({ show: false, startupId: null })
    setInvestData({ name: "", amount: "" })
  }

  return (
    <div className="relative bg-black text-white min-h-screen">
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-screen-xl px-4">
        <NavBar items={navItems} className="!relative !top-0 !left-0 !translate-x-0 !mb-0" />
      </div>

      <div className="pt-32 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight mb-8 text-center text-white">
            Explore Startups
          </h1>
          
          <div className="flex justify-center mb-16">
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-white text-black py-3 px-8 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:scale-105 shadow-[0_0_10px_rgba(255,255,255,0.3)] flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload Your Idea
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {startups.map((startup) => (
              <div key={startup.id} className="border border-white/20 rounded-lg p-6 hover:shadow-xl transition-all bg-black/60 backdrop-blur-sm hover:border-blue-500/50">
                {startup.image && <img src={startup.image} alt={startup.title} className="w-full h-32 object-cover rounded-lg mb-4" />}
                
                <h3 className="text-2xl font-bold mb-2 text-white">{startup.title}</h3>
                <p className="text-blue-500 text-sm mb-4 font-medium">Founded by {startup.owner}</p>
                
                <p className="text-white/80 mb-4 text-sm leading-relaxed line-clamp-3">{startup.description}</p>
                
                {startup.email && (
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-white/70">{startup.email}</span>
                  </div>
                )}

                {startup.socials && (
                  <div className="flex gap-3 mb-4">
                    {startup.socials.twitter && (
                      <a href={`https://twitter.com/${startup.socials.twitter}`} className="text-blue-400 hover:text-blue-300">
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {startup.socials.linkedin && (
                      <a href={`https://linkedin.com/in/${startup.socials.linkedin}`} className="text-blue-600 hover:text-blue-500">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {startup.socials.website && (
                      <a href={`https://${startup.socials.website}`} className="text-green-400 hover:text-green-300">
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
                
                <div className="mb-4">
                  <p className="text-xs text-white/60">Funds Raised</p>
                  <p className="text-green-400 font-bold text-lg">{startup.fundsAccumulated}</p>
                </div>
                
                <button 
                  onClick={() => setViewModal({ show: true, startupId: startup.id })}
                  className="w-full bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Form Modal */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-white/20 rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">Upload Your Idea</h2>
              <button onClick={() => setShowUploadForm(false)} className="text-white/60 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Startup Title *" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/50" />
                <input type="text" placeholder="Owner/Founder *" required value={formData.owner} onChange={(e) => setFormData({...formData, owner: e.target.value})} className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/50" />
              </div>
              
              <textarea placeholder="Description *" rows={4} required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-black/60 text-white placeholder:text-white/50" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="email" placeholder="Email *" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/50" />
                <input type="text" placeholder="Funds Accumulated *" required value={formData.fundsAccumulated} onChange={(e) => setFormData({...formData, fundsAccumulated: e.target.value})} className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/50" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" placeholder="Twitter Handle" value={formData.twitter} onChange={(e) => setFormData({...formData, twitter: e.target.value})} className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/50" />
                <input type="text" placeholder="LinkedIn" value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/50" />
                <input type="text" placeholder="Website" value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})} className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/60 text-white placeholder:text-white/50" />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-white">Upload Image</label>
                <label className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg cursor-pointer transition-colors w-fit">
                  <Camera className="w-5 h-5" />
                  <span>Choose Image</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                {formData.image && <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />}
              </div>
              
              <button type="submit" className="w-full bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white py-3 px-4 rounded-lg font-medium text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] hover:scale-105">
                Submit Startup Idea
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModal.show && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-white/20 rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {(() => {
              const startup = startups.find(s => s.id === viewModal.startupId)
              return startup ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-white">{startup.title}</h2>
                    <button onClick={() => setViewModal({ show: false, startupId: null })} className="text-white/60 hover:text-white">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  {startup.image && <img src={startup.image} alt={startup.title} className="w-full h-48 object-cover rounded-lg mb-6" />}
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Description</h3>
                      <p className="text-white/80 leading-relaxed">{startup.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Investor Returns</h3>
                      <p className="text-white/80">{startup.investorReturns}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
                        {startup.email && (
                          <div className="flex items-center gap-2 mb-2">
                            <Mail className="w-4 h-4 text-blue-400" />
                            <span className="text-white/70">{startup.email}</span>
                          </div>
                        )}
                        <div className="flex gap-3 mt-2">
                          {startup.socials?.twitter && <Twitter className="w-4 h-4 text-blue-400" />}
                          {startup.socials?.linkedin && <Linkedin className="w-4 h-4 text-blue-600" />}
                          {startup.socials?.website && <Globe className="w-4 h-4 text-green-400" />}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Funding</h3>
                        <p className="text-green-400 font-bold text-xl">{startup.fundsAccumulated}</p>
                        <p className="text-white/60 text-sm">{startup.funders.length} investors</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 pt-6">
                      <button 
                        onClick={() => {
                          setViewModal({ show: false, startupId: null })
                          setInvestModal({ show: true, startupId: startup.id })
                        }}
                        className="flex-1 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] hover:scale-105"
                      >
                        Invest Now
                      </button>
                      <button className="flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] hover:scale-105">
                        Feedback
                      </button>
                    </div>
                  </div>
                </>
              ) : null
            })()}
          </div>
        </div>
      )}

      {/* Investment Modal */}
      {investModal.show && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-white/20 rounded-lg p-8 max-w-4xl w-full flex gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-6">Invest in {startups.find(s => s.id === investModal.startupId)?.title}</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Your Name" value={investData.name} onChange={(e) => setInvestData({...investData, name: e.target.value})} className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-black/60 text-white placeholder:text-white/50" />
                <input type="number" placeholder="Investment Amount ($)" value={investData.amount} onChange={(e) => setInvestData({...investData, amount: e.target.value})} className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-black/60 text-white placeholder:text-white/50" />
                <div className="flex gap-3 mt-6">
                  <button onClick={() => handleInvest(investModal.startupId!)} className="flex-1 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] hover:scale-105">
                    Confirm Investment
                  </button>
                  <button onClick={() => setInvestModal({ show: false, startupId: null })} className="px-6 py-2 border border-purple-500/50 rounded-lg text-white hover:bg-purple-500/20 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 border-l border-white/20 pl-8">
              <h4 className="text-xl font-bold text-white mb-4">Current Funders</h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {startups.find(s => s.id === investModal.startupId)?.funders.map((funder, idx) => (
                  <div key={idx} className="bg-white/5 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-purple-300">{funder.name}</p>
                      <p className="text-green-400 font-bold">${funder.amount.toLocaleString()}</p>
                    </div>
                    <p className="text-xs text-white/40">{funder.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
