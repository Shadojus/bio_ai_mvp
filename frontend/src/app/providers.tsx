// /frontend/src/app/providers.tsx

"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import Navbar from "./components/Navbar";

const convexClient = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={convexClient}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </div>
    </ConvexProvider>
  );
}
