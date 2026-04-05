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
    <header className="sticky top-0 z-50 border-b border-[#1e3a54] bg-navy/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald font-heading text-xs font-bold text-navy">
            SC
          </div>
          <span className="font-heading text-lg font-semibold tracking-tight text-white">
            SmartCourse
          </span>
        </Link>
        <div className="flex items-center gap-1">
          <nav className="flex items-center gap-0.5">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  location.pathname === link.to
                    ? "text-white"
                    : "text-[#8899aa] hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/recommend"
            className="btn-primary ml-3 rounded-full px-5 py-2 text-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}
