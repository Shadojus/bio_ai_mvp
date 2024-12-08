// frontend/src/app/states/[state_name]/page.tsx
"use client";

import { useQuery, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { useEffect, useState } from "react";

const StateDetailsPage = () => {
  const { state_name } = useParams();
  const stateName = state_name
    ? decodeURIComponent(state_name as string)
        .replace(/([A-Z])/g, " $1")
        .trim()
    : "Default";

  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Get the initialization mutation
  const initialize = useMutation(api.states.initializeStates);
  // Get state details
  const stateConfig = useQuery(api.states.getStateDetails, { stateName });

  useEffect(() => {
    const initStates = async () => {
      if (!initialized) {
        try {
          const result = await initialize();
          if (result.status === "initialized" || result.status === "exists") {
            setInitialized(true);
          }
        } catch (err) {
          console.error("Initialization error:", err);
          setError("Failed to initialize states");
        }
      }
    };

    initStates();
  }, [initialize, initialized]);

  if (!initialized) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Initializing States...</h1>
        <p>Please wait while we set up the system.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!stateConfig) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">State Not Found</h1>
        <p>The state &quot;{stateName}&quot; could not be found.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">State Details</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="mb-4">
          <strong className="text-gray-700">Name:</strong>{" "}
          <span className="text-gray-900">{stateConfig.title}</span>
        </p>
        <p className="mb-4">
          <strong className="text-gray-700">Content:</strong>{" "}
          <span className="text-gray-900">{stateConfig.content}</span>
        </p>
        <p className="mb-4">
          <strong className="text-gray-700">Author:</strong>{" "}
          <span className="text-gray-900">{stateConfig.authorId}</span>
        </p>
      </div>
    </div>
  );
};

export default StateDetailsPage;
