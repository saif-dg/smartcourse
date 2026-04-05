import { Link, useLocation } from "react-router"
import { Button } from "~/components/ui/button"
import { Logo } from "~/components/logo"
import { cn } from "~/lib/utils"

const links = [
  { to: "/", label: "Home" },
  { to: "/recommend", label: "Recommend" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
]

export function Navbar() {
  const location = useLocation()

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo size={32} />
          <span className="font-heading text-lg font-semibold text-foreground">SmartCourse</span>
        </Link>
        <div className="flex items-center gap-1">
          <nav className="flex items-center">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  location.pathname === link.to
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button asChild className="ml-3 h-10 rounded-full px-6 text-sm">
            <Link to="/recommend">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
