import { Rocket } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center space-x-2">
          <Rocket className="h-6 w-6 text-orange-500" />
          <span className="hidden font-bold sm:inline-block">
            Startup Launchpad
          </span>
        </div>
        <nav className="flex flex-1 items-center justify-end space-x-6 text-sm font-medium">
          <a
            href="#home"
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            Home
          </a>
          <a
            href="#explore"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Explore Startups
          </a>
          <a
            href="#upload"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Upload Ideas
          </a>
        </nav>
      </div>
    </header>
  )
}
