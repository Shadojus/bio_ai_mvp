"use client";

// frontend\src\app\states\page.tsx

import Link from "next/link";

export default function StatesPage() {
  const states = ["Deep Blue", "Green", "Purple"]; // Extend with other states as needed.

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Explore States</h1>
      <ul className="list-disc list-inside mt-4">
        {states.map((state, index) => (
          <li key={index}>
            <Link
              href={`/states/${state}`}
              className="text-blue-500 hover:underline"
            >
              {state}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
