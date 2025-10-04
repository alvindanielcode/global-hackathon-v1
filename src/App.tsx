import { Home, Lightbulb, Rocket, Search } from "lucide-react"
import { Launchpad } from "@/components/ui/launchpad"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { useState } from "react"

interface Startup {
  id: number
  title: string
  owner: string
  description: string
  investorReturns: string
  copyright: string
  fundsAccumulated: string
}

function App() {
  const navItems = [
    { name: "Home", url: "#home", icon: Home },
    { name: "Explore Startups", url: "#explore", icon: Search },
    { name: "Upload Ideas", url: "#upload", icon: Lightbulb },
    { name: "About", url: "#about", icon: Rocket },
  ]

  const [startups, setStartups] = useState<Startup[]>([
    {
      id: 1,
      title: "EcoTech Solutions",
      owner: "Sarah Chen",
      description: "Revolutionary solar panel technology that increases efficiency by 40% while reducing costs.",
      investorReturns: "15% equity for $500K investment, projected 3x return in 5 years",
      copyright: "© 2024 EcoTech Solutions Inc.",
      fundsAccumulated: "$1.2M"
    },
    {
      id: 2,
      title: "HealthAI",
      owner: "Dr. James Wilson",
      description: "AI-powered diagnostic platform that detects diseases 2 years earlier than traditional methods.",
      investorReturns: "10% equity for $1M investment, projected 5x return in 4 years",
      copyright: "© 2024 HealthAI Corp.",
      fundsAccumulated: "$2.5M"
    },
    {
      id: 3,
      title: "UrbanFarm",
      owner: "Maria Rodriguez",
      description: "Vertical farming system for urban areas, producing 10x more food per square foot.",
      investorReturns: "20% equity for $300K investment, projected 4x return in 3 years",
      copyright: "© 2024 UrbanFarm Technologies",
      fundsAccumulated: "$800K"
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newStartup: Startup = {
      id: startups.length + 1,
      ...formData
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
    // Scroll to explore section
    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative bg-black text-white">
      {/* Navbar at Top */}
      <NavBar items={navItems} className="!top-6 !bottom-auto !mb-0" />

      {/* Fixed Globe Background - Only visible on home section */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <Launchpad className="!relative !max-w-none !w-full !h-full opacity-100" />
      </div>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-4">
        <div className="text-center z-10 relative">
          <h1 className="text-7xl md:text-9xl font-bold tracking-wider mb-6 text-white uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
            Launchpad
          </h1>
          <p className="text-xl md:text-2xl text-white font-light max-w-3xl mx-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Where your ideas meet opportunities
          </p>
        </div>
      </section>

      {/* Explore Section */}
      <section id="explore" className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-7xl w-full z-10 relative">
          <h2 className="text-4xl font-bold tracking-tight mb-12 text-center text-white">
            Explore Startups
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {startups.map((startup) => (
              <div
                key={startup.id}
                className="border border-white/20 rounded-lg p-6 hover:shadow-xl transition-all bg-black/60 backdrop-blur-sm hover:border-orange-400/50"
              >
                <h3 className="text-2xl font-bold mb-2 text-white">{startup.title}</h3>
                <p className="text-orange-400 text-sm mb-4 font-medium">Founded by {startup.owner}</p>
                
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
                
                <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-colors font-medium text-sm">
                  Invest Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload" className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-3xl w-full z-10 relative">
          <h2 className="text-4xl font-bold tracking-tight mb-12 text-center text-white">
            Upload Your Ideas
          </h2>
          <div className="border border-white/20 rounded-lg p-8 bg-black/60 backdrop-blur-sm">
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
                    className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-black/60 text-white placeholder:text-white/50"
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
                    className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-black/60 text-white placeholder:text-white/50"
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
                    className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-black/60 text-white placeholder:text-white/50"
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
                    className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-black/60 text-white placeholder:text-white/50"
                    placeholder="© 2024 Your Company"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 transition-colors font-medium text-lg"
              >
                Submit Startup Idea
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-4xl w-full text-center z-10 relative">
          <h2 className="text-4xl font-bold tracking-tight mb-8 text-white">About Launchpad</h2>
          <p className="text-xl text-white/80 leading-relaxed mb-8">
            Launchpad is a global platform connecting innovative startups with opportunities worldwide.
            We believe in the power of ideas and the potential of entrepreneurs to change the world.
          </p>
          <p className="text-lg text-white/60 leading-relaxed">
            Submit your startup idea, connect with investors, and watch your vision come to life. 
            Every great company started with a single idea—let's make yours the next success story.
          </p>
        </div>
      </section>
    </div>
  )
}

export default App
