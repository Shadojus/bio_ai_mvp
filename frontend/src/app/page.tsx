// File: frontend/src/app/layout.tsx
"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Bio-AI Dashboard</h1>
      <p className="mb-4">
        Welcome to the Bio-AI system! Choose a section to explore:
      </p>
      <ul className="space-y-4">
        <li>
          <Link
            href="/status"
            className="text-blue-500 hover:underline text-lg"
          >
            System Status
          </Link>
        </li>
        <li>
          <Link
            href="/states"
            className="text-blue-500 hover:underline text-lg"
          >
            Manage States
          </Link>
        </li>
      </ul>
    </div>
  );
}
