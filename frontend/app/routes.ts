import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("recommend", "routes/recommend.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig
