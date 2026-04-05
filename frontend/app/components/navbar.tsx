import { Link, useLocation } from "react-router"
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
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            SC
          </div>
          <span className="font-heading text-lg font-semibold">SmartCourse</span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                location.pathname === link.to
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
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
