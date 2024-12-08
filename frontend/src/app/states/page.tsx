// frontend/src/app/states/page.tsx
"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import Link from "next/link";

export default function StatesPage() {
  const states = useQuery(api.states.getAllStates);
  const transition = useMutation(api.states.transitionState);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [transitionReason, setTransitionReason] = useState("");

  const handleTransition = async () => {
    if (!selectedState) return;

    try {
      await transition({
        fromState: "current", // You'll need to track current state in your app
        toState: selectedState,
        reason: transitionReason,
      });

      setSelectedState(null);
      setTransitionReason("");
    } catch (error) {
      console.error("Transition failed:", error);
    }
  };

  if (!states) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Loading States...</h1>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">System States</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {states.map((state) => (
          <div key={state.title} className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">{state.title}</h2>
            <p className="text-gray-600 mb-4">{state.content}</p>

            <div className="flex space-x-2">
              <Link
                href={`/states/${state.title.replace(/\s+/g, "")}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>

              <button
                onClick={() => setSelectedState(state.title)}
                className="text-green-500 hover:underline"
              >
                Transition To
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedState && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Transition to {selectedState}
            </h2>

            <textarea
              className="w-full p-2 border rounded mb-4"
              placeholder="Reason for transition..."
              value={transitionReason}
              onChange={(e) => setTransitionReason(e.target.value)}
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setSelectedState(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleTransition}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
