// frontend/src/app/status/page.tsx
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHealth() {
      try {
        const response = await fetch("http://localhost:8000/health");
        if (!response.ok) {
          throw new Error("Failed to fetch health status");
        }
        const data: HealthResponse = await response.json();
        setStatus(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching health status:", error);
        setError(
          "Failed to connect to the backend service. Please ensure the backend is running."
        );
        setStatus(null);
      } finally {
        setLoading(false);
      }
    }

    fetchHealth();
    // Set up polling every 30 seconds
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">System Status</h1>
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">System Status</h1>
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">System Status</h1>
        <p>No status information available.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">System Status</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-lg mb-4">
          <strong className="text-gray-700">API Status:</strong>{" "}
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
              status.API === "Healthy"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {status.API}
          </span>
        </p>
        <p className="text-lg mb-4">
          <strong className="text-gray-700">Active State:</strong>{" "}
          <span className="text-gray-900">{status.Active_State}</span>
        </p>
        <p className="text-lg mb-4">
          <strong className="text-gray-700">Last Updated:</strong>{" "}
          <span className="text-gray-900">
            {new Date(status.Last_Updated).toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
}
