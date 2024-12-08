// frontend/src/app/components/MonitoringDashboard.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function MonitoringDashboard() {
  // Only fetch states every 30 seconds since they don't change often
  const states = useQuery(api.states.getAllStates, undefined, {
    refetchInterval: 30000,
  });

  const currentState = useQuery(api.stateTransitions.getCurrentState);

  const [systemHealth, setSystemHealth] = useState({
    cpu: [] as number[],
    memory: [] as number[],
    activeUsers: 0,
    uptime: 0,
  });

  // Optimize data updates to run every 5 seconds instead of every second
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth((prev) => {
        // Only keep last 50 data points to prevent memory bloat
        const newCpu = [...prev.cpu.slice(-50), Math.random() * 100];
        const newMemory = [...prev.memory.slice(-50), Math.random() * 100];

        return {
          cpu: newCpu,
          memory: newMemory,
          activeUsers: Math.floor(Math.random() * 100),
          uptime: prev.uptime + 10, // Increment by 10 since we update every 5 seconds
        };
      });
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Memoize chart data transformation to prevent unnecessary recalculations
  const chartData = React.useMemo(() => {
    return systemHealth.cpu.map((cpu, index) => ({
      name: index,
      cpu,
      memory: systemHealth.memory[index],
    }));
  }, [systemHealth.cpu, systemHealth.memory]);

  // Only render chart if we have data
  const renderChart = useCallback(() => {
    if (chartData.length === 0) return null;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval="preserveStartEnd" // Only show start and end labels
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="cpu"
            stroke="#8884d8"
            name="CPU Usage %"
            dot={false} // Remove dots for better performance
          />
          <Line
            type="monotone"
            dataKey="memory"
            stroke="#82ca9d"
            name="Memory Usage %"
            dot={false} // Remove dots for better performance
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }, [chartData]);

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">
        System Monitoring Dashboard
      </h1>

      {/* System Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-600">Current State</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {currentState?.toState || "Loading..."}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-600">Active Users</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {systemHealth.activeUsers}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-600">System Uptime</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {Math.floor(systemHealth.uptime / 60)}m {systemHealth.uptime % 60}s
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-600">
              State Transitions
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">24</p>
        </div>
      </div>

      {/* System Resource Charts */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          System Resources
        </h3>
        <div className="h-[300px]">{renderChart()}</div>
      </div>
    </div>
  );
}
