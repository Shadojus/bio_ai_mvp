"use client";

import { useEffect, useState } from "react";

interface HealthResponse {
  API: string;
  Database: string;
  AI_Modules: string;
}

export default function StatusDashboard() {
  const [status, setStatus] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHealth() {
      try {
        const response = await fetch("http://localhost:8000/health");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
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
      <div className="space-y-4">
        <p className="text-lg">
          <strong>API:</strong> {status.API}
        </p>
        <p className="text-lg">
          <strong>Database:</strong> {status.Database}
        </p>
        <p className="text-lg">
          <strong>AI Modules:</strong> {status.AI_Modules}
        </p>
      </div>
    </div>
  );
}
