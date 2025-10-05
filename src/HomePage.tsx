import { Home, Lightbulb, Rocket, Sparkles, Mail, Github, Twitter } from "lucide-react"
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
  const globeTranslateY = -scrollY * 0.5

  return (
    <div className="relative bg-black text-white">
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-screen-xl px-4">
        <NavBar items={navItems} className="!relative !top-0 !left-0 !translate-x-0 !mb-0" />
      </div>

      <div 
        className="fixed inset-0 flex items-center justify-center pointer-events-none -mt-20 transition-all duration-300"
        style={{
          opacity: globeOpacity,
          transform: `translateY(${globeTranslateY}px)`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #3B82F6 0%, #EC4899 40%, #8B5CF6 70%, transparent 100%)',
              filter: 'blur(80px) contrast(1.5)',
              mixBlendMode: 'screen'
            }}
          />
        </div>
        <Launchpad className="!relative !max-w-none !w-full !h-full opacity-80" />
      </div>

      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center z-10 relative -mt-32">
          <h1 className="text-8xl md:text-10xl font-bold tracking-wider mb-6 text-white uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
            Launchpad
          </h1>
          <p className="text-lg md:text-xl text-white font-light max-w-4xl mx-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] text-center px-4 mb-12">
            Where ideas meet opportunities.Launch your startup from any part of the globe.
          </p>
          
          <div className="flex justify-center items-center mt-8">
            <button
              onClick={() => navigate('/explore')}
              className="bg-white text-black py-4 px-12 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Explore Startups
            </button>
          </div>
        </div>
      </section>

      <section id="why" className="relative min-h-screen bg-black flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl w-full border-2 border-white/30 rounded-3xl p-8 md:p-12 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Launchpad?
              </h2>
              <p className="text-base md:text-lg text-white/80 leading-relaxed">
                LaunchPad is built to give founders, creators, and dreamers a real chance to take their ideas forward without needing huge funding or complicated networks.
              </p>
            </div>
            <div className="flex items-center justify-center -mt-16">
              <DisplayCards />
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-7xl w-full border-2 border-white/30 rounded-3xl p-8 md:p-12 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            How It Works?
          </h2>
          <HowItWorksSection />
        </div>
      </section>

      <section id="about" className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
        <WebGLShader />
        <div className="max-w-4xl w-full text-center z-10 relative">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            About Launchpad
          </h2>
          <p className="text-xl text-white/90 leading-relaxed mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Launchpad is a global platform connecting innovative startups with opportunities worldwide.
            We believe in the power of ideas and the potential of entrepreneurs to change the world.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
            Submit your startup idea, connect with investors, and watch your vision come to life. 
            Every great company started with a single idea—let's make yours the next success story.
          </p>
        </div>

        <footer className="relative z-10 w-full max-w-7xl mx-auto mt-20 border-t border-white/20 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Launchpad</h3>
              <p className="text-white/60 text-sm">
                Where ideas meet opportunities. Launch your startup from any part of the globe.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-white/60 hover:text-white transition-colors">Home</a></li>
                <li><a href="#why" className="text-white/60 hover:text-white transition-colors">Why Launchpad</a></li>
                <li><a href="#how-it-works" className="text-white/60 hover:text-white transition-colors">How It Works</a></li>
                <li><button onClick={() => navigate('/explore')} className="text-white/60 hover:text-white transition-colors text-left">Explore Startups</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
              <p className="text-white/60 text-sm mt-4">contact@launchpad.com</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-white/50 text-sm">© 2024 Launchpad. All rights reserved.</p>
          </div>
        </footer>
      </section>
    </div>
  )
}