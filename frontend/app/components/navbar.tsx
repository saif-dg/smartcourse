import { Link, useLocation } from "react-router"
import { Logo } from "~/components/logo"
import { cn } from "~/lib/utils"

const navLinks = [
  { to: "/recommend", label: "Recommendation" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
] as const

export function Navbar() {
  const location = useLocation()

  return (
    <header className="fixed top-0 right-0 left-0 z-50 px-4 pt-4">
      <div className="container mx-auto flex h-14 items-center justify-between rounded-full border border-border/60 bg-background/80 px-4 shadow-sm backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo size={24} />
          <span className="font-heading text-sm font-semibold text-foreground">SmartCourse</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
