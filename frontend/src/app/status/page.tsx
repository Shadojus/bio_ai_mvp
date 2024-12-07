// File: /frontend/src/app/status/page.tsx

"use client";

import { useEffect, useState } from "react";

interface HealthResponse {
  API: string;
  Active_State: string;
  Last_Updated: string;
}

export default function StatusDashboard() {
  const [status, setStatus] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHealth() {
      try {
        const response = await fetch("http://localhost:8000/health");
        const data: HealthResponse = await response.json();
        setStatus(data);
      } catch (error) {
        console.error("Error fetching health status:", error);
        setStatus(null);
      } finally {
        setLoading(false);
      }
    }

    fetchHealth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!status) {
    return <div>Error fetching system status. Please try again later.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">System Status</h1>
      <p className="text-lg">
        <strong>API:</strong> {status.API}
      </p>
      <p className="text-lg">
        <strong>Active State:</strong> {status.Active_State}
      </p>
      <p className="text-lg">
        <strong>Last Updated:</strong> {status.Last_Updated}
      </p>
    </div>
  );
}
