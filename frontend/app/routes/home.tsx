import { Link } from "react-router"
import {
  Compass,
  GitCompare,
  Clock,
  Bookmark,
  ArrowUpRight,
  Cpu,
  Brain,
  CircleCheckBig,
  TrendingUp,
} from "lucide-react"
import { Button } from "~/components/ui/button"
import { Logo } from "~/components/logo"

const features = [
  {
    icon: Compass,
    title: "AI-Powered Recommendations",
    description:
      "Describe what you want to learn in natural language and get personalized course suggestions.",
  },
  {
    icon: GitCompare,
    title: "Dual Model Engine",
    description:
      "Compare results from TF-IDF keyword matching and Neural semantic understanding side by side.",
  },
  {
    icon: Clock,
    title: "Search History",
    description:
      "Track all your searches with timestamps and see how different models respond to the same query.",
  },
  {
    icon: Bookmark,
    title: "Save Favorites",
    description:
      "Bookmark courses you like and manage your saved recommendations from the dashboard.",
  },
  {
    icon: Brain,
    title: "Neural Understanding",
    description:
      "Our neural model captures semantic meaning, finding relevant courses even without exact keyword matches.",
  },
  {
    icon: Cpu,
    title: "Smart Processing",
    description:
      "Advanced NLP pipeline with spaCy tokenization, stopword removal, and lemmatization for precise results.",
  },
]

const benefits = [
  {
    title: "Semantic Search with Neural AI",
    description:
      "With advanced transformer models, you can find courses by meaning, not just keywords. Discover how we can enhance your learning.",
  },
  {
    title: "Compare Recommendation Engines",
    description:
      "Run both TF-IDF and Neural models side by side to see how different AI approaches rank courses for your query.",
  },
  {
    title: "AI-Driven Course Discovery",
    description:
      "Leverage the power of NLP to transform your learning journey, discovering courses faster and more effectively.",
  },
]

export default function Home() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pb-10">
        <div className="container mx-auto px-4 text-center">

          <h1
            className="animate-fade-up font-heading text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "0ms" }}
          >
            The Future of Learning
            <br />
            with <span className="text-primary">Smart AI</span>
          </h1>

          <p
            className="animate-fade-up mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground"
            style={{ animationDelay: "80ms" }}
          >
            Expert AI to elevate your education. Let us chart the perfect
            learning path for you.
          </p>

          <div
            className="animate-fade-up mt-8 flex items-center justify-center gap-3"
            style={{ animationDelay: "160ms" }}
          >
            <Button asChild size="lg" className="h-12 rounded-full px-10 text-base">
              <Link to="/recommend">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-10 text-base">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>

        </div>

        {/* Stats row */}
        <div
          className="animate-fade-up container mx-auto mt-16 grid gap-5 px-4 sm:grid-cols-3"
          style={{ animationDelay: "240ms" }}
        >
          <div className="rounded-2xl bg-primary p-8 text-primary-foreground">
            <p className="font-heading text-4xl font-bold">8,500+</p>
            <p className="mt-2 text-sm opacity-70">Courses Indexed</p>
          </div>
          <div className="rounded-2xl bg-primary p-8 text-primary-foreground">
            <p className="font-heading text-4xl font-bold">2</p>
            <p className="mt-2 text-sm opacity-70">AI Models — TF-IDF & Neural</p>
          </div>
          <div className="rounded-2xl bg-primary p-8 text-primary-foreground">
            <p className="font-heading text-4xl font-bold">50+</p>
            <p className="mt-2 text-sm opacity-70">Universities Covered</p>
          </div>
        </div>
      </section>

      {/* ── Features (dark) ── */}
      <section className="flex min-h-screen flex-col justify-center bg-[#142F32] py-20">
        <div className="container mx-auto px-4">
          <div className="mb-14 text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Efficient and Integrated
              <br />
              Course Discovery
            </h2>
            <p className="mt-3 text-[#8a9a92]">
              Simplify your search with our AI-powered, quality-focused services.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="animate-fade-up group cursor-default rounded-2xl border border-[#254a4e] bg-[#1a3a3e] p-8 transition-all duration-300 hover:border-[#E3FFCC]/25"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="flex items-start justify-between">
                  <feature.icon className="h-8 w-8 text-[#8a9a92]" strokeWidth={1.2} />
                  <ArrowUpRight className="h-5 w-5 text-[#4a5a52] transition-colors group-hover:text-[#E3FFCC]" />
                </div>
                <h3 className="mt-10 font-heading text-lg font-bold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8a9a92]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="flex min-h-screen flex-col justify-center py-20">
        <div className="container mx-auto grid items-center gap-14 px-4 lg:grid-cols-2">
          {/* Left: dashboard-style cards */}
          <div className="animate-fade-up relative pb-10">
            {/* Top card: stats overview */}
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10">
              <p className="text-base text-muted-foreground">Total Courses</p>
              <div className="mt-2 flex items-center gap-3">
                <p className="font-heading text-5xl font-bold text-foreground">8,500+</p>
                <span className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
                  <TrendingUp className="h-3.5 w-3.5" /> 34%
                </span>
              </div>

              {/* Progress bars */}
              <div className="mt-8 space-y-5">
                {[
                  { label: "Beginner", pct: 45, color: "bg-primary" },
                  { label: "Intermediate", pct: 35, color: "bg-emerald-500" },
                  { label: "Advanced", pct: 20, color: "bg-accent" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-4">
                    <span className="w-28 text-sm text-muted-foreground">{row.label}</span>
                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className="w-10 text-right text-sm font-semibold text-foreground">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overlapping small card */}
            <div className="absolute -bottom-2 right-2 rounded-2xl border border-border bg-card p-6 shadow-xl sm:right-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">AI Models</span>
                    <span className="flex items-center gap-0.5 text-sm text-emerald-600">
                      <TrendingUp className="h-3.5 w-3.5" /> 2
                    </span>
                  </div>
                  <p className="font-heading text-2xl font-bold text-foreground">Neural & TF-IDF</p>
                  <p className="text-sm text-muted-foreground">Dual engine comparison</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: text with checkmarks */}
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Key Benefits of Our System for Your Learning Efficiency
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our systems boost discovery, cut search time, and drive learning growth.
            </p>
            <div className="mt-10 space-y-8">
              {benefits.map((b, i) => (
                <div
                  key={b.title}
                  className="animate-fade-up flex gap-4"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <CircleCheckBig className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-foreground">{b.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {b.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA (dark) ── */}
      <section className="bg-[#142F32] py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            From Query to Course in Seconds
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[#8a9a92]">
            Accelerate your learning with our technology. Reduce search time and
            discover the perfect course now.
          </p>
          <Button asChild variant="outline" size="lg" className="mt-8 rounded-full border-[#E3FFCC] px-8 text-[#E3FFCC] hover:bg-[#E3FFCC] hover:text-[#142F32]">
            <Link to="/recommend">Start Exploring</Link>
          </Button>
        </div>
      </section>

      {/* ── Footer (dark) ── */}
      <footer className="border-t border-[#254a4e] bg-[#142F32]">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <Logo size={32} />
              <span className="font-heading text-lg font-semibold text-white">SmartCourse</span>
            </div>
            <p className="text-sm text-[#8a9a92]">
              AI-Powered Course Recommendation System
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
