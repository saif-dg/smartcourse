import { Link } from "react-router"
import {
  Compass,
  GitCompare,
  Clock,
  Bookmark,
  ArrowUpRight,
  Star,
  Cpu,
  Brain,
  Sparkles,
} from "lucide-react"

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

const stats = [
  {
    value: "8,500+",
    label: "Courses Indexed",
    strip: "stat-strip-green",
  },
  {
    value: "2",
    label: "AI Models",
    sublabel: "TF-IDF & Neural",
    strip: "stat-strip-amber",
  },
  {
    value: "50+",
    label: "Universities Covered",
    strip: "stat-strip-navy",
  },
]

const benefits = [
  {
    title: "Semantic Search with Neural AI",
    description:
      "With advanced transformer models, you can find courses by meaning, not just keywords. Discover hidden gems that traditional search misses.",
  },
  {
    title: "Compare Recommendation Engines",
    description:
      "Run both TF-IDF and Neural models side by side to see how different AI approaches rank courses for your query.",
  },
  {
    title: "AI-Driven Course Discovery",
    description:
      "Leverage the power of NLP to transform your learning journey, discovering courses faster and more accurately.",
  },
]

export default function Home() {
  return (
    <div>
      {/* ===== HERO (dark) ===== */}
      <section className="section-dark relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-20 text-center">
          <div className="animate-fade-up flex items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 text-amber">
              <Star className="h-3.5 w-3.5 fill-amber" />
              <Star className="h-3.5 w-3.5 fill-amber" />
              <Star className="h-3.5 w-3.5 fill-amber" />
              <Star className="h-3.5 w-3.5 fill-amber" />
              <Star className="h-3.5 w-3.5 fill-amber" />
            </div>
            <span className="text-sm text-[#8899aa]">
              5.0 from <span className="text-emerald">80+ reviews</span>
            </span>
          </div>

          <h1
            className="animate-fade-up mt-8 font-heading text-[2.75rem] font-bold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            The Future of Learning
            <br />
            with <span className="text-emerald">Smart AI</span>
          </h1>

          <p
            className="animate-fade-up mx-auto mt-6 max-w-lg text-base leading-relaxed text-[#8899aa]"
            style={{ animationDelay: "160ms" }}
          >
            Expert AI to elevate your education. Let us chart the perfect learning path for you.
          </p>

          <div
            className="animate-fade-up mt-8 flex items-center justify-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              to="/recommend"
              className="btn-primary rounded-full px-7 py-3 text-sm font-semibold"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="btn-outline-light rounded-full px-7 py-3 text-sm"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ===== STATS (light cream) ===== */}
      <section className="section-light">
        <div className="mx-auto -mt-1 max-w-6xl px-6 py-16">
          <div className="grid gap-5 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="animate-fade-up card-light flex overflow-hidden rounded-2xl"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`${stat.strip} w-2 shrink-0`} />
                <div className="px-6 py-5">
                  <p className="font-heading text-2xl font-bold text-[#1a1a1a]">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-sm text-[#5a5a52]">{stat.label}</p>
                  {stat.sublabel && (
                    <p className="text-xs text-[#8a8a80]">{stat.sublabel}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES / SERVICES (light cream) ===== */}
      <section className="section-light">
        <div className="mx-auto max-w-6xl px-6 pb-20">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-[#1a1a1a] sm:text-4xl">
              Efficient and Integrated
              <br />
              Course Discovery
            </h2>
            <p className="mt-3 text-[#5a5a52]">
              Simplify your search with our AI-powered, quality-focused services.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="animate-fade-up service-card card-light group cursor-default rounded-2xl p-6"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="icon-box icon-box-light">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div className="arrow-link !bg-[#e8e7e0] !text-[#5a5a52] group-hover:!bg-emerald group-hover:!text-navy">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <h3 className="mt-5 font-heading text-base font-semibold text-[#1a1a1a]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5a5a52]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS (dark) ===== */}
      <section className="section-dark">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left: decorative stat block */}
            <div className="animate-fade-up">
              <div className="card-dark rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <div className="icon-box icon-box-dark">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-heading text-sm font-semibold text-white">
                      Total Courses
                    </p>
                    <p className="text-xs text-[#8899aa]">Indexed & ready</p>
                  </div>
                </div>
                <p className="mt-4 font-heading text-4xl font-bold text-white">
                  8,500+
                </p>
                <p className="mt-1 text-xs text-emerald">
                  Growing every month
                </p>
                <div className="mt-5 flex gap-1">
                  {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-emerald/20"
                      style={{ height: `${h}px` }}
                    >
                      <div
                        className="w-full rounded-sm bg-emerald"
                        style={{ height: `${h * 0.7}px`, marginTop: `${h * 0.3}px` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: text content */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
                Key Benefits of Our System for Your Learning Efficiency
              </h2>
              <p className="mt-3 text-[#8899aa]">
                Our system boosts discovery, cuts search time, and drives learning growth.
              </p>
              <div className="mt-8 space-y-6">
                {benefits.map((b, i) => (
                  <div
                    key={b.title}
                    className="animate-fade-up flex gap-4"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald" />
                    <div>
                      <h4 className="font-heading text-sm font-semibold text-white">
                        {b.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-[#8899aa]">
                        {b.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA (dark, slightly different shade) ===== */}
      <section className="bg-navy-light">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            From Query to Course in Seconds
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[#8899aa]">
            Accelerate your learning with our technology. Reduce search time and discover the perfect course now.
          </p>
          <Link
            to="/recommend"
            className="btn-primary mt-8 inline-block rounded-full px-8 py-3 text-sm font-semibold"
          >
            Start Exploring
          </Link>
        </div>
      </section>

      {/* ===== FOOTER (dark) ===== */}
      <footer className="border-t border-[#1e3a54] bg-navy">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald font-heading text-xs font-bold text-navy">
                SC
              </div>
              <span className="font-heading text-lg font-semibold text-white">
                SmartCourse
              </span>
            </div>
            <p className="text-sm text-[#8899aa]">
              AI-Powered Course Recommendation System
            </p>
          </div>
          <div className="mt-8 border-t border-[#1e3a54] pt-6 text-center text-xs text-[#5a6a7a]">
            Project ID: F25PROJECTBBD65 (BC200401890) &middot; Supervisor: Muhammad Bilal
          </div>
        </div>
      </footer>
    </div>
  )
}
