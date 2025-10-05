import { Home, Lightbulb, Rocket, Sparkles, Mail, Github, Twitter, Shield } from "lucide-react"
import { Launchpad } from "@/components/ui/launchpad"
import { NavBar } from "@/components/ui/tubelight-navbar"
import DisplayCards from "@/components/ui/display-cards"
import { HowItWorksSection } from "@/components/ui/how-it-works-section"
import { WebGLShader } from "@/components/ui/web-gl-shader"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate()
  
  const navItems = [
    { name: "Home", url: "#home", icon: Home },
    { name: "Why", url: "#why", icon: Sparkles },
    { name: "How", url: "#how-it-works", icon: Lightbulb },
    { name: "Explore", url: "/explore", icon: Rocket },
    { name: "About", url: "#about", icon: Rocket },
  ]

  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const globeOpacity = Math.max(0, 1 - scrollY / 800)
  const scrollTranslateY = -scrollY * 0.5

  return (
    <div className="relative bg-black text-white">
      {/* Mobile-Friendly Navbar */}
      <div className="fixed top-0 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-screen-xl px-2 sm:px-4">
        <NavBar items={navItems} className="!relative !top-0 !left-0 !translate-x-0 !mb-0" />
      </div>

      {/* Globe Background - Hidden on small screens for performance */}
      <div 
        className="fixed inset-0 hidden sm:flex items-center justify-center pointer-events-none -mt-20 transition-all duration-300"
        style={{
          opacity: globeOpacity,
          transform: `translateY(${scrollTranslateY}px)`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="absolute w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #3B82F6 0%, #EC4899 40%, #8B5CF6 70%, transparent 100%)',
              filter: 'blur(80px) contrast(1.5)',
              mixBlendMode: 'screen'
            }}
          />
        </div>
        <Launchpad className="!relative !max-w-none !w-full !h-full opacity-80" />
      </div>

      {/* Hero Section - Mobile Optimized with Sync Scroll */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 py-20">
        <div 
          className="text-center z-10 relative -mt-16 sm:-mt-32"
          style={{
            transform: `translateY(${scrollTranslateY}px)`
          }}
        >
          <h1 
            className="text-4xl sm:text-6xl md:text-8xl lg:text-10xl tracking-wider mb-4 sm:mb-6 text-white uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            style={{ fontFamily: 'Inter', fontWeight: 900 }}
          >
            Launchpad
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-light max-w-4xl mx-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] text-center px-4 mb-8 sm:mb-12">
            Protect your idea with automatic copyright timestamps. Get feedback, find supporters, and launch with confidence.
          </p>
          
          <div className="flex justify-center items-center mt-6 sm:mt-8">
            <button
              onClick={() => navigate('/explore')}
              className="bg-white text-black py-3 sm:py-4 px-8 sm:px-12 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Explore Startups
            </button>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="relative min-h-[60vh] bg-black flex items-center justify-center px-3 sm:px-4 py-12 sm:py-20">
        <div className="max-w-5xl w-full border-2 border-white/30 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
          <div className="space-y-8 sm:space-y-12">
            {/* Problem Statement */}
            <div className="text-center">
              <div className="inline-block mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-semibold text-purple-600 uppercase tracking-wider bg-purple-600/10 px-4 py-1.5 rounded-full border border-purple-600/30">
                  The Problem
                </span>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-relaxed">
                Good ideas often fail because people don't have an easy way to{" "}
                <span className="text-purple-600 underline decoration-purple-600/50 decoration-2 underline-offset-4">
                  share, get feedback, or find support
                </span>
                .
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center">
              <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            {/* Solution */}
            <div className="text-center">
              <div className="inline-block mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-semibold text-blue-500 uppercase tracking-wider bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/30">
                  The Solution
                </span>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-relaxed">
                LaunchPad helps ideas get{" "}
                <span className="text-blue-500 underline decoration-blue-500/50 decoration-2 underline-offset-4">
                  noticed, supported, and launched
                </span>
                {" "}with{" "}
                <span className="relative inline-block">
                  <span className="text-blue-500 font-black">automatic copyright protection</span>
                  <Shield className="inline w-5 h-5 sm:w-6 sm:h-6 ml-2 text-blue-500 animate-pulse" />
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section - Mobile Optimized */}
      <section id="why" className="relative min-h-screen bg-black flex items-center justify-center px-3 sm:px-4 py-12 sm:py-20">
        <div className="max-w-7xl w-full border-2 border-white/30 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                Why Launchpad?
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
                LaunchPad is a digital platform where innovators can present their startup ideas, protect them with an automatic copyright timestamp, and gain early support from the public. It acts as a bridge between idea-stage founders and supporters by allowing micro-funding, feedback, and visibility. Each idea listed on LaunchPad has a verified submission record, giving creators proof of originality while also showcasing their vision to potential backers. In short, LaunchPad is a public launch space for ideas to gain recognition, protection, and early traction.
              </p>
            </div>
            <div className="flex items-center justify-center -mt-8 sm:-mt-16">
              <DisplayCards />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Mobile Optimized */}
      <section id="how-it-works" className="relative min-h-screen bg-black flex flex-col items-center justify-center px-3 sm:px-4 py-12 sm:py-20">
        <div className="max-w-7xl w-full border-2 border-white/30 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-12 text-center">
            How It Works?
          </h2>
          <HowItWorksSection />
        </div>
      </section>

      {/* About Section - Mobile Optimized */}
      <section id="about" className="relative min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 py-12 sm:py-20 overflow-hidden">
        <WebGLShader />
        <div className="max-w-4xl w-full text-center z-10 relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 sm:mb-8 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            About Launchpad
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed mb-6 sm:mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Launchpad is a global platform connecting innovative startups with opportunities worldwide.
            We believe in the power of ideas and the potential of entrepreneurs to change the world.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed mb-8 sm:mb-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
            Submit your startup idea, connect with investors, and watch your vision come to life. 
            Every great company started with a single idea—let's make yours the next success story.
          </p>
        </div>

        {/* Footer - Mobile Optimized */}
        <footer className="relative z-10 w-full max-w-7xl mx-auto mt-12 sm:mt-20 border-t border-white/20 pt-8 sm:pt-12 pb-6 sm:pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 px-3 sm:px-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Launchpad</h3>
              <p className="text-white/60 text-xs sm:text-sm">
                Where ideas meet opportunities. Launch your startup from any part of the globe.
              </p>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-white/60 hover:text-white transition-colors text-sm">Home</a></li>
                <li><a href="#why" className="text-white/60 hover:text-white transition-colors text-sm">Why Launchpad</a></li>
                <li><a href="#how-it-works" className="text-white/60 hover:text-white transition-colors text-sm">How It Works</a></li>
                <li><button onClick={() => navigate('/explore')} className="text-white/60 hover:text-white transition-colors text-left text-sm">Explore Startups</button></li>
              </ul>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href="#" className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                  <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href="#" className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                  <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>
              <p className="text-white/60 text-xs sm:text-sm mt-3 sm:mt-4">contact@launchpad.com</p>
            </div>
          </div>
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 text-center">
            <p className="text-white/50 text-xs sm:text-sm">© 2024 Launchpad. All rights reserved.</p>
          </div>
        </footer>
      </section>
    </div>
  )
}