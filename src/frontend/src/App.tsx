import { Toaster } from "@/components/ui/sonner";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
// HomePage is above-the-fold — load eagerly
import HomePage from "./pages/HomePage";
// Non-critical routes: code-split and lazy-loaded
const BlogPage = lazy(() => import("./pages/BlogPage"));
const MediaPage = lazy(() => import("./pages/MediaPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

// Minimal fallback shown while a lazy page chunk loads
function PageLoader() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#060b18" }}
    >
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{
          borderColor: "rgba(0,212,255,0.6)",
          borderTopColor: "transparent",
        }}
        aria-label="Loading page"
      />
    </div>
  );
}

// Layout component wrapping all pages
function RootLayout() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#060b18", color: "#e8f4f8" }}
    >
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Toaster theme="dark" />
    </div>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const mediaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/media",
  component: MediaPage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: BlogPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  mediaRoute,
  blogRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

export { Link, useNavigate };
