// Path: C:\Users\dariu\OneDrive\00 The Game\BioAi\BioAi_MVP\frontend\src\app\states\[state_name]\page.tsx

"use client";

import { useEffect, useState } from "react";

const StateDetailsPage = () => {
  const [stateConfig, setStateConfig] = useState<any>(null); // Replace `any` with the expected type
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStateDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/state/Purple`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setStateConfig(data);
      } catch (err: any) {
        console.error("Error fetching state details:", err);
        setError(err.message);
      }
    };

    fetchStateDetails();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!stateConfig) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>State Details</h1>
      <p>
        <strong>Priority Tasks:</strong>
      </p>
      <ul className="list-disc list-inside mt-2">
        {stateConfig.priority_tasks?.length > 0 ? (
          stateConfig.priority_tasks.map((task: string, index: number) => (
            <li key={index}>{task}</li>
          ))
        ) : (
          <li>No priority tasks available</li>
        )}
      </ul>
    </div>
  );
};

export default StateDetailsPage;
