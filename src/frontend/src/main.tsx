import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import { InternetIdentityProvider } from "./hooks/useInternetIdentity";
import "../index.css";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache backend data for 5 minutes before marking stale — avoids
      // redundant canister calls on navigation and component re-mounts.
      staleTime: 5 * 60 * 1000,
      // Keep unused data in cache for 10 minutes (reduces cold fetches)
      gcTime: 10 * 60 * 1000,
      // Disable automatic retry storms — IC calls can be slow
      retry: 1,
      // Don't re-fetch on window focus (portfolio doesn't need live data)
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <InternetIdentityProvider>
      <App />
    </InternetIdentityProvider>
  </QueryClientProvider>,
);
