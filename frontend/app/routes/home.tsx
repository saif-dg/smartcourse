import { Link } from "react-router"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

const features = [
  {
    title: "AI-Powered Recommendations",
    description:
      "Describe what you want to learn in natural language and get personalized course suggestions.",
  },
  {
    title: "Dual Model Engine",
    description:
      "Compare results from TF-IDF keyword matching and Neural semantic understanding side by side.",
  },
  {
    title: "Search History",
    description:
      "Track all your searches with timestamps and see how different models respond to the same query.",
  },
  {
    title: "Save Favorites",
    description:
      "Bookmark courses you like and manage your saved recommendations from the dashboard.",
  },
]

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          SmartCourse
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          AI-Powered Course Recommendation System. Tell us what you want to
          learn, and we'll find the perfect courses for you using advanced NLP
          and machine learning.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link to="/recommend">Get Started</Link>
        </Button>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
