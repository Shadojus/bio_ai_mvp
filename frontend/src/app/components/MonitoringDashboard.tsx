// /frontend/src/app/components/MonitoringDashboard.tsx

"use client";

import React, { useState, useEffect } from "react";
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
import {
  AlertTriangle,
  Brain,
  Heart,
  BookOpen,
  Users,
  Settings,
  AlertCircle,
} from "lucide-react";

export function MonitoringDashboard() {
  const currentState = useQuery(api.stateTransitions.getCurrentState);
  const biometrics = useQuery(api.biometrics.getLatestBiometrics, {
    userId: "dummy-user-id",
  });

  const [systemHealth, setSystemHealth] = useState({
    cpu: [] as number[],
    memory: [] as number[],
    activeUsers: 0,
    uptime: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth((prev) => ({
        cpu: [...prev.cpu.slice(-50), Math.random() * 100],
        memory: [...prev.memory.slice(-50), Math.random() * 100],
        activeUsers: Math.floor(Math.random() * 100),
        uptime: prev.uptime + 5,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStateIcon = (stateName: string) => {
    switch (stateName) {
      case "Red":
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
      case "Deep Blue":
        return <Brain className="w-6 h-6 text-blue-500" />;
      case "Green":
        return <Heart className="w-6 h-6 text-green-500" />;
      case "Purple":
        return <BookOpen className="w-6 h-6 text-purple-500" />;
      case "Orange":
        return <Users className="w-6 h-6 text-orange-500" />;
      case "Gray":
        return <Settings className="w-6 h-6 text-gray-500" />;
      default:
        return <AlertCircle className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">System Monitoring</h1>
        <div className="flex items-center space-x-2">
          {getStateIcon(currentState?.toState || "Gray")}
          <span className="text-lg font-semibold">
            Current State: {currentState?.toState || "Gray"}
          </span>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 mb-2">CPU Usage</div>
          <div className="text-2xl font-bold">
            {systemHealth.cpu[systemHealth.cpu.length - 1]?.toFixed(1)}%
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 mb-2">Memory Usage</div>
          <div className="text-2xl font-bold">
            {systemHealth.memory[systemHealth.memory.length - 1]?.toFixed(1)}%
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 mb-2">Active Users</div>
          <div className="text-2xl font-bold">{systemHealth.activeUsers}</div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 mb-2">System Uptime</div>
          <div className="text-2xl font-bold">
            {Math.floor(systemHealth.uptime / 60)}m {systemHealth.uptime % 60}s
          </div>
        </div>
      </div>

      {/* Biometric Stats */}
      {biometrics && (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Biometric Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-500">Heart Rate</div>
              <div className="text-xl font-bold">
                {biometrics.heartRate} BPM
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Stress Level</div>
              <div className="text-xl font-bold">{biometrics.stressLevel}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Focus Score</div>
              <div className="text-xl font-bold">{biometrics.focusScore}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Energy Level</div>
              <div className="text-xl font-bold">{biometrics.energyLevel}%</div>
            </div>
          </div>
        </div>
      )}

      {/* System Resource Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">System Resources</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={systemHealth.cpu.map((cpu, i) => ({
                name: i,
                cpu,
                memory: systemHealth.memory[i],
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="cpu"
                stroke="#8884d8"
                name="CPU Usage %"
              />
              <Line
                type="monotone"
                dataKey="memory"
                stroke="#82ca9d"
                name="Memory Usage %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
