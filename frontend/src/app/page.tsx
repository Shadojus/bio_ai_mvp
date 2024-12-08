// frontend/src/app/page.tsx
"use client";

import Link from "next/link";
import InitializeData from "./components/InitializeData";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Bio-AI System Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/monitoring"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">System Monitoring</h2>
          <p className="text-gray-600">
            View real-time system metrics and biometric data
          </p>
        </Link>

        <Link
          href="/states"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Manage States</h2>
          <p className="text-gray-600">View and control system states</p>
        </Link>

        <Link
          href="/status"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">System Status</h2>
          <p className="text-gray-600">
            Check overall system health and status
          </p>
        </Link>
        <InitializeData />
      </div>
    </div>
  );
}
